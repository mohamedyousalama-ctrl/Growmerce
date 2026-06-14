# Real Intelligence System V1 — Supabase Setup & Smoke Test Runbook

Operator guide for **Mohamed** to configure Supabase and smoke-test the backend chain
end-to-end. This is **backend only**. It does **not** change the live MVP, which keeps serving the
deterministic/demo diagnostic (`getDiagnostic`) regardless of Supabase being configured.

> **Chain under test:**
> `submit-report-request → build-evidence → compose-report → review-report → run-daily-snapshot → (optional) run-real-intelligence-pipeline`

Everything here is **internal**: no external website fetching, no AI/LLM, no scraping, no customer
notifications. Evidence is rule-derived from user-provided inputs only; reports are deterministic,
confidence-capped (≤ 60), and **never shown to end users** (publication is human-review gated).

---

## 0. Prerequisites

- A Supabase project (create at https://supabase.com if you don't have one).
- [Supabase CLI](https://supabase.com/docs/guides/cli) installed and authenticated.
- `curl` and `jq` (for the smoke test / parsing JSON).
- Run all CLI commands from `growmerce-mvp/` (where `supabase/` lives).

---

## 1. Required env vars & secrets

### Client (Vercel build env / `.env.local`) — public, RLS-guarded
| Var | Value | Notes |
| --- | --- | --- |
| `VITE_SUPABASE_URL` | `https://<project-ref>.supabase.co` | public project URL |
| `VITE_SUPABASE_ANON_KEY` | `<anon-key>` | public anon key (RLS still applies) |
| `VITE_REAL_INTELLIGENCE` | `false` | **keep false** until the smoke test passes |

### Server (Supabase **function secrets**) — never in the frontend
| Secret | Value | Notes |
| --- | --- | --- |
| `SUPABASE_SERVICE_ROLE_KEY` | `<service-role-key>` | full access; **never** a `VITE_` var or in the bundle |
| `GROWMERCE_ALLOWED_ORIGINS` | `https://your-app.vercel.app` | comma-separated; empty = reflect any (demo only) |

> `SUPABASE_URL` is injected into Edge Functions automatically — you don't set it as a secret.

---

## 2. Apply migrations

```bash
cd growmerce-mvp
supabase login                       # opens browser; paste access token
supabase link --project-ref <PROJECT_REF>
supabase db push                     # applies migrations 0001–0008 in order
```

This creates: `contacts, businesses, consent_records, report_requests, agent_runs, data_sources,
uploaded_files, raw_observations, evidence_items, patterns_matched, reports, opportunities,
report_validation_issues, report_reviews, daily_snapshots, alerts, growth_ops_actions,
scheduled_jobs` — all with **RLS enabled, deny-by-default** — plus the private `report-uploads`
storage bucket.

---

## 3. Deploy Edge Functions

```bash
cd growmerce-mvp
supabase functions deploy submit-report-request
supabase functions deploy build-evidence
supabase functions deploy compose-report
supabase functions deploy review-report
supabase functions deploy run-daily-snapshot
supabase functions deploy run-real-intelligence-pipeline
```

`config.toml` already sets `verify_jwt = false` for these (public/internal endpoints that do their
own validation and write with the service role). Then set the secrets:

```bash
supabase secrets set SUPABASE_SERVICE_ROLE_KEY=<SERVICE_ROLE_KEY>
supabase secrets set GROWMERCE_ALLOWED_ORIGINS=https://your-app.vercel.app
```

---

## 4. Configure Vercel (only when ready)

In the Vercel project → Settings → Environment Variables, set `VITE_SUPABASE_URL`,
`VITE_SUPABASE_ANON_KEY`, and keep `VITE_REAL_INTELLIGENCE=false`. **Redeploy** so the build picks
them up. With these set, the live lead form will start persisting to Supabase (Phase 1 Sprint 2);
the user-facing report is **still the demo finding**.

---

## 5. Smoke test the full chain (curl)

Set placeholders once in your shell:

```bash
export SUPABASE_URL="<SUPABASE_PROJECT_URL>"        # https://<ref>.supabase.co
export SUPABASE_ANON_KEY="<SUPABASE_ANON_KEY>"
H_AUTH="-H \"Authorization: Bearer $SUPABASE_ANON_KEY\" -H \"apikey: $SUPABASE_ANON_KEY\" -H \"Content-Type: application/json\""
```

### A. submit-report-request
```bash
curl -s -X POST "$SUPABASE_URL/functions/v1/submit-report-request" \
  -H "Authorization: Bearer $SUPABASE_ANON_KEY" -H "apikey: $SUPABASE_ANON_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "source": "smoke_test",
    "submittedAt": "2026-06-14T00:00:00Z",
    "pageUrl": "https://your-app.vercel.app/handoff",
    "demoDiagnostic": true,
    "consent": { "granted": true, "scope": "contact_about_diagnosis", "textShown": "Smoke test consent." },
    "lead": {
      "name": "تجربة دخان",
      "businessName": "متجر التجربة",
      "whatsapp": "966500000000",
      "country": "SA",
      "email": "smoke@example.com",
      "businessType": "ecommerce_store",
      "mainChannel": "store",
      "contactPermission": true
    },
    "context": { "channels": ["متجري الإلكتروني"], "mainProblem": "weak_conversion", "provenance": "demo" },
    "structuredInput": { "businessType": "ecommerce_store" },
    "currentDemoFinding": { "title": "demo finding snapshot" },
    "dataSources": [
      { "kind": "website", "ownerClass": "own", "label": "الموقع", "url": "https://example.com", "observationType": "url_submitted" },
      { "kind": "competitor", "ownerClass": "competitor", "label": "منافس أ", "observationType": "user_note", "payload": { "name": "منافس أ" } },
      { "kind": "other", "ownerClass": "unknown", "label": "ملاحظة", "observationType": "user_note", "payload": { "note": "المبيعات ثابتة رغم الزيارات" } }
    ]
  }'
# → { ok, contact_id, business_id, report_request_id, status, sources_stored }
```
Capture `report_request_id` and `business_id` for the next steps.

### B. build-evidence
```bash
curl -s -X POST "$SUPABASE_URL/functions/v1/build-evidence" \
  -H "Authorization: Bearer $SUPABASE_ANON_KEY" -H "apikey: $SUPABASE_ANON_KEY" \
  -H "Content-Type: application/json" \
  -d '{ "report_request_id": "<REPORT_REQUEST_ID>" }'
# → { ok, evidence_created, evidence_skipped, agent_run_id, status }
```

### C. compose-report
```bash
curl -s -X POST "$SUPABASE_URL/functions/v1/compose-report" \
  -H "Authorization: Bearer $SUPABASE_ANON_KEY" -H "apikey: $SUPABASE_ANON_KEY" \
  -H "Content-Type: application/json" \
  -d '{ "report_request_id": "<REPORT_REQUEST_ID>" }'
# → { ok, report_id, validation_status, confidence, evidence_count, status:"in_review" }
```
Capture `report_id`.

### D. review-report (approve, then optionally publish)
```bash
curl -s -X POST "$SUPABASE_URL/functions/v1/review-report" \
  -H "Authorization: Bearer $SUPABASE_ANON_KEY" -H "apikey: $SUPABASE_ANON_KEY" \
  -H "Content-Type: application/json" \
  -d '{ "report_id": "<REPORT_ID>", "action": "approve", "notes": "Smoke test approval" }'

# publish only succeeds if validation_status = passed:
curl -s -X POST "$SUPABASE_URL/functions/v1/review-report" \
  -H "Authorization: Bearer $SUPABASE_ANON_KEY" -H "apikey: $SUPABASE_ANON_KEY" \
  -H "Content-Type: application/json" \
  -d '{ "report_id": "<REPORT_ID>", "action": "publish", "notes": "Smoke test publish" }'
# → { ok, report_id, action, status, review_id }
```

### E. run-daily-snapshot
```bash
curl -s -X POST "$SUPABASE_URL/functions/v1/run-daily-snapshot" \
  -H "Authorization: Bearer $SUPABASE_ANON_KEY" -H "apikey: $SUPABASE_ANON_KEY" \
  -H "Content-Type: application/json" \
  -d '{ "business_id": "<BUSINESS_ID>", "report_request_id": "<REPORT_REQUEST_ID>" }'
# → { ok, snapshot_id, payload, diff, alerts_created, status }
```

### F. run-real-intelligence-pipeline (optional — does B+C+E in order; does NOT publish)
```bash
curl -s -X POST "$SUPABASE_URL/functions/v1/run-real-intelligence-pipeline" \
  -H "Authorization: Bearer $SUPABASE_ANON_KEY" -H "apikey: $SUPABASE_ANON_KEY" \
  -H "Content-Type: application/json" \
  -d '{ "report_request_id": "<REPORT_REQUEST_ID>" }'
# → { ok, steps:{evidence,report,snapshot}, summary, published:false }
```

> Or run `scripts/smoke-real-intelligence.sh` (see §9) which chains A→E automatically.

---

## 6. Expected database rows after each step

Inspect via Supabase Studio → Table Editor (or SQL editor). All reads here are done as the
project owner / service role; the anon role cannot read these (deny-by-default RLS).

| After | New / changed rows |
| --- | --- |
| **submit-report-request** | `contacts`, `businesses`, `consent_records`, `report_requests` (status `queued`), `data_sources` (×N), `raw_observations` (×N) |
| **build-evidence** | `agent_runs` (`evidence_builder_v1`, succeeded), `evidence_items` (draft, ×N) |
| **compose-report** | `agent_runs` (`compose_report_v1`), `patterns_matched` (×1), `reports` (×1, status `in_review`), `opportunities` (×1); `report_validation_issues` only if validation fails |
| **review-report** | `report_reviews` (×1); `reports.status` → `approved`/`published`/`returned_for_more_data`/`rejected` (publish sets `published_at`) |
| **run-daily-snapshot** | `daily_snapshots` (×1); `alerts` (status `new`) when state changed |

Quick SQL spot-checks:
```sql
select id, status from report_requests order by created_at desc limit 1;
select count(*) from evidence_items where report_request_id = '<REPORT_REQUEST_ID>';
select id, status, validation_status from reports where report_request_id = '<REPORT_REQUEST_ID>';
select action, created_at from report_reviews where report_id = '<REPORT_ID>' order by created_at;
select rule, severity, status from alerts where business_id = '<BUSINESS_ID>' order by created_at desc;
```

---

## 7. Troubleshooting

| Symptom | Likely cause / fix |
| --- | --- |
| **CORS blocked** (browser) | Set `GROWMERCE_ALLOWED_ORIGINS` to your exact origin and redeploy; curl is unaffected by CORS. |
| **404 / function not found** | Function not deployed — re-run `supabase functions deploy <name>`. |
| **`server_not_configured`** | `SUPABASE_SERVICE_ROLE_KEY` secret not set — `supabase secrets set ...`. |
| **401 / gateway rejects** | Missing `Authorization`/`apikey` header — include the anon key as shown. |
| **Writes silently fail / nothing inserted** | RLS — confirm the function uses the service role (secret set). Do **not** add broad anon policies. |
| **`report_request_id_required` / `..._not_found`** | Bad/empty UUID — copy the exact id from the submit response. |
| **`needs_evidence` from compose-report** | No `evidence_items` — run `build-evidence` first; ensure the submit included `dataSources`. |
| **build-evidence created 0** | No `raw_observations` — the submit had no `dataSources`/notes. |
| **`validation_not_passed` on publish** | `reports.validation_status` ≠ `passed`; inspect `report_validation_issues`. |
| **Lead form not persisting on the site** | Vercel `VITE_SUPABASE_URL`/`VITE_SUPABASE_ANON_KEY` missing — set and redeploy. |
| **Nothing "real" shows to users** | Expected — `VITE_REAL_INTELLIGENCE=false` and reports are review-gated; the user UI is still the demo. |

---

## 8. Safety

- **Keep `VITE_REAL_INTELLIGENCE=false`** until the backend smoke test passes end-to-end.
- **Never** expose `SUPABASE_SERVICE_ROLE_KEY` in the frontend / a `VITE_` var / the bundle.
- **Do not** open broad public RLS policies — all writes go through service-role Edge Functions.
- **Do not** enable customer-facing real reports before the review workflow is verified.
- **Do not** connect external APIs (search/extraction/OCR/LLM) until the internal chain passes.
- Reports are **drafts** until a human `publish` on a `passed` report; alerts are **internal only**.

---

## 9. Helper script (optional)

`scripts/smoke-real-intelligence.sh` chains A→E using **only** `SUPABASE_URL` + `SUPABASE_ANON_KEY`
that **you export** — it contains **no secrets**. It requires `curl` and `jq`.

```bash
export SUPABASE_URL="https://<ref>.supabase.co"
export SUPABASE_ANON_KEY="<anon-key>"
bash scripts/smoke-real-intelligence.sh
```

It prints the `report_request_id`, `business_id`, evidence count, `report_id`, validation status,
review status, and snapshot/alerts. It does **not** publish unless validation passed (and even then
only with `--publish`). Safe to run repeatedly (evidence build is idempotent).

---

## 10. Rollback / disable real intelligence

- **Frontend:** set `VITE_REAL_INTELLIGENCE=false` (default) and redeploy → the app behaves exactly
  as the demo MVP. Removing `VITE_SUPABASE_*` reverts lead capture to the form-endpoint/localStorage
  fallbacks.
- **Functions:** `supabase functions delete <name>` to remove an endpoint.
- **Data:** rows are additive; truncate test rows in Studio if needed. Migrations are forward-only —
  do not write destructive down-migrations against shared data.
- **Branch:** this work lives on `real-intelligence/phase-1-schema` and is **not merged to main**;
  nothing is deployed to production until you decide to merge.
