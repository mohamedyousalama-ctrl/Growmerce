#!/usr/bin/env bash
#
# Growmerce Real Intelligence System V1 — backend smoke test.
# Chains: submit-report-request -> build-evidence -> compose-report
#         -> review-report(approve[, publish]) -> run-daily-snapshot
#
# SAFE: contains NO secrets. Uses only env vars YOU export:
#   SUPABASE_URL       e.g. https://<ref>.supabase.co
#   SUPABASE_ANON_KEY  public anon key
# Requires: curl, jq. Internal only — no external sites, no AI, no scraping.
# Does NOT publish unless validation passed AND you pass --publish.
#
# Usage:
#   export SUPABASE_URL="https://<ref>.supabase.co"
#   export SUPABASE_ANON_KEY="<anon-key>"
#   bash scripts/smoke-real-intelligence.sh [--publish]
set -euo pipefail

PUBLISH="no"
[ "${1:-}" = "--publish" ] && PUBLISH="yes"

: "${SUPABASE_URL:?Set SUPABASE_URL (https://<ref>.supabase.co)}"
: "${SUPABASE_ANON_KEY:?Set SUPABASE_ANON_KEY (public anon key)}"
command -v curl >/dev/null || { echo "curl is required"; exit 1; }
command -v jq   >/dev/null || { echo "jq is required";   exit 1; }

BASE="${SUPABASE_URL%/}/functions/v1"

call() { # call <function> <json>
  curl -s -X POST "$BASE/$1" \
    -H "Authorization: Bearer $SUPABASE_ANON_KEY" \
    -H "apikey: $SUPABASE_ANON_KEY" \
    -H "Content-Type: application/json" \
    -d "$2"
}

echo "==> [1/5] submit-report-request"
SUBMIT=$(call submit-report-request '{
  "source": "smoke_test",
  "submittedAt": "2026-06-14T00:00:00Z",
  "pageUrl": "https://example.com/handoff",
  "demoDiagnostic": true,
  "consent": { "granted": true, "scope": "contact_about_diagnosis", "textShown": "Smoke test consent." },
  "lead": {
    "name": "تجربة دخان", "businessName": "متجر التجربة", "whatsapp": "966500000000",
    "country": "SA", "email": "smoke@example.com",
    "businessType": "ecommerce_store", "mainChannel": "store", "contactPermission": true
  },
  "context": { "channels": ["متجري الإلكتروني"], "mainProblem": "weak_conversion", "provenance": "demo" },
  "structuredInput": { "businessType": "ecommerce_store" },
  "currentDemoFinding": { "title": "demo finding snapshot" },
  "dataSources": [
    { "kind": "website", "ownerClass": "own", "label": "الموقع", "url": "https://example.com", "observationType": "url_submitted" },
    { "kind": "competitor", "ownerClass": "competitor", "label": "منافس أ", "observationType": "user_note", "payload": { "name": "منافس أ" } },
    { "kind": "other", "ownerClass": "unknown", "label": "ملاحظة", "observationType": "user_note", "payload": { "note": "المبيعات ثابتة رغم الزيارات" } }
  ]
}')
echo "$SUBMIT" | jq .
RRID=$(echo "$SUBMIT" | jq -r '.report_request_id // empty')
BID=$(echo "$SUBMIT"  | jq -r '.business_id // empty')
[ -n "$RRID" ] || { echo "FAILED: no report_request_id"; exit 1; }
echo "    report_request_id=$RRID  business_id=$BID"

echo "==> [2/5] build-evidence"
call build-evidence "{\"report_request_id\":\"$RRID\"}" | jq '{ok,evidence_created,evidence_skipped,status}'

echo "==> [3/5] compose-report"
COMPOSE=$(call compose-report "{\"report_request_id\":\"$RRID\"}")
echo "$COMPOSE" | jq '{ok,report_id,validation_status,confidence,evidence_count,status}'
REPID=$(echo "$COMPOSE" | jq -r '.report_id // empty')
VALID=$(echo "$COMPOSE" | jq -r '.validation_status // empty')
[ -n "$REPID" ] || { echo "FAILED: no report_id (needs_evidence?)"; exit 1; }
echo "    report_id=$REPID  validation_status=$VALID"

echo "==> [4/5] review-report (approve)"
call review-report "{\"report_id\":\"$REPID\",\"action\":\"approve\",\"notes\":\"Smoke test approval\"}" | jq '{ok,action,status}'

if [ "$PUBLISH" = "yes" ] && [ "$VALID" = "passed" ]; then
  echo "==> review-report (publish)"
  call review-report "{\"report_id\":\"$REPID\",\"action\":\"publish\",\"notes\":\"Smoke test publish\"}" | jq '{ok,action,status}'
elif [ "$PUBLISH" = "yes" ]; then
  echo "    (skipping publish: validation_status=$VALID, must be 'passed')"
fi

echo "==> [5/5] run-daily-snapshot"
call run-daily-snapshot "{\"business_id\":\"$BID\",\"report_request_id\":\"$RRID\"}" | jq '{ok,snapshot_id,diff,alerts_created,status}'

echo "==> done. report_request_id=$RRID report_id=$REPID"
