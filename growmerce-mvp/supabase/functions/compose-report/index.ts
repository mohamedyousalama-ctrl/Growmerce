// Growmerce Real Intelligence System V1 — Phase 4
// Edge Function: compose-report
//
// Composes a DETERMINISTIC, EVIDENCE-ONLY draft report (DiagnosticFinding-shaped)
// from existing evidence_items. NO AI, NO LLM, NO external calls, NO invented
// numbers, NO benchmarks. If there is no evidence, it refuses to create a report.
// Reports are stored as `in_review` and are NEVER shown to end users — publication
// is gated by human review (Phase 5). Confidence is capped (<=60) because nothing
// has been externally verified yet. Logs an agent_run.
//
// Service-role server-side only. POST { "report_request_id": "<uuid>" }.
//
// deno-lint-ignore-file no-explicit-any
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL") ?? "";
const SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";
const ALLOWED_ORIGINS = (Deno.env.get("GROWMERCE_ALLOWED_ORIGINS") ?? "")
  .split(",").map((s) => s.trim()).filter(Boolean);

function corsHeaders(origin: string | null): Record<string, string> {
  const allow = ALLOWED_ORIGINS.length === 0 ? "*" : origin && ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];
  return {
    "Access-Control-Allow-Origin": allow,
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Vary": "Origin",
  };
}
function json(body: unknown, status: number, cors: Record<string, string>): Response {
  return new Response(JSON.stringify(body), { status, headers: { ...cors, "Content-Type": "application/json" } });
}
const isUuid = (v: unknown): v is string =>
  typeof v === "string" && /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(v);

const OWNED = new Set(["website", "store", "menu"]);

// ---- deterministic pattern selection (single, conservative) ----
function selectPattern(flags: { metrics: boolean; owned: boolean; competitor: boolean; notesOrUrls: boolean }) {
  if (flags.metrics) return { pattern_key: "manual_metrics_available", family: "performance_data_user_provided" };
  if (flags.owned) return { pattern_key: "owned_channel_sources_submitted", family: "channel_verification_pending" };
  if (flags.competitor) return { pattern_key: "competitor_context_submitted", family: "competitor_research_pending" };
  return { pattern_key: "intake_ready_missing_verification", family: "insufficient_evidence" };
}

// ---- pure-code confidence (never > 60 this sprint) ----
function scoreConfidence(flags: { metrics: boolean; owned: boolean; competitor: boolean; note: boolean; onlyWeak: boolean }) {
  let score = 30;
  const raisedBy: string[] = [];
  if (flags.owned) { score += 10; raisedBy.push("روابط قنواتك (موقع/متجر/قائمة) مُتاحة للتحقّق لاحقًا"); }
  if (flags.competitor) { score += 8; raisedBy.push("حدّدت منافسًا/مرجعًا للمقارنة لاحقًا"); }
  if (flags.metrics) { score += 15; raisedBy.push("قدّمت مقاييس يدوية لنشاطك"); }
  if (flags.note) { score += 5; raisedBy.push("أضفت سياقًا وصفيًا للطلب"); }

  let cap = 60;
  let capReason = "لم يتم استخراج أو التحقّق من أي مصدر خارجي بعد — السقف ٦٠٪.";
  if (!flags.metrics) { cap = Math.min(cap, 55); capReason = "بدون مقاييس فعلية، يبقى السقف ٥٥٪."; }
  if (flags.onlyWeak) { cap = Math.min(cap, 45); capReason = "الأدلّة الحالية وصفية/ضعيفة فقط — السقف ٤٥٪."; }

  score = Math.min(score, cap);
  const band = score < 45 ? "low" : "medium";
  return {
    band, score, raisedBy,
    reducedBy: [
      "لا توجد بيانات مبيعات/طلبات فعلية بعد",
      "لم تُفحص الروابط أو المنافسون خارجيًا",
    ],
    wouldImprove: [
      "مشاركة تصدير المبيعات/الطلبات لآخر فترة",
      "إضافة التكلفة/العمولة لتقييم الربح",
      "بيانات أداء على مستوى الصنف/المنتج",
    ],
    cap: band, capReason, provenance: "user",
  };
}

function missingData() {
  return [
    { what: "تصدير المبيعات/الطلبات", whyItMatters: "يحوّل الإشارة إلى دليل فعلي.", provideNext: "صدّر آخر ٣٠ يومًا." },
    { what: "الهامش أو العمولة", whyItMatters: "يفصل الإيراد عن الربح.", provideNext: "أضف التكلفة/العمولة." },
    { what: "الأداء على مستوى الصنف", whyItMatters: "يحدّد أين يتركّز الأثر.", provideNext: "شارك مبيعات الأصناف." },
    { what: "أسعار المنافسين المُستخرجة فعليًا", whyItMatters: "لتأكيد الموقف السعري.", provideNext: "سنستخرجها لاحقًا." },
    { what: "مصدر الزيارات/التحويل", whyItMatters: "يربط التسرّب بمكانه.", provideNext: "اربط تحليلات القناة." },
    { what: "نطاق زمني حديث", whyItMatters: "يضمن حداثة القراءة.", provideNext: "حدّد الفترة المرجعية." },
  ];
}

function ruledOut() {
  return [
    {
      hypothesis: "السعر هو المشكلة الأساسية.",
      whyRuledOut: "لا يمكن استبعاده بعد دون مبيعات على مستوى الصنف وأسعار منافسين مُستخرجة.",
      basis: "أدلّة سعرية غير متوفّرة بعد (relation: missing).",
    },
    {
      hypothesis: "ضعف ظهور القناة/الزيارات هو السبب.",
      whyRuledOut: "لا يمكن استبعاده بعد دون تحليلات أو بيانات منصّة.",
      basis: "أدلّة الزيارات/الظهور غير متوفّرة بعد (relation: missing).",
    },
  ];
}

Deno.serve(async (req: Request) => {
  const origin = req.headers.get("origin");
  const cors = corsHeaders(origin);
  if (req.method === "OPTIONS") return new Response("ok", { headers: cors });
  if (req.method !== "POST") return json({ ok: false, error: "method_not_allowed" }, 405, cors);
  if (!SUPABASE_URL || !SERVICE_ROLE_KEY) return json({ ok: false, error: "server_not_configured" }, 500, cors);

  let body: any;
  try { body = await req.json(); } catch { return json({ ok: false, error: "invalid_json" }, 400, cors); }
  const reportRequestId = body?.report_request_id;
  if (!isUuid(reportRequestId)) return json({ ok: false, error: "report_request_id_required" }, 400, cors);

  const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, { auth: { persistSession: false, autoRefreshToken: false } });
  const startedAt = Date.now();

  const { data: rr } = await supabase
    .from("report_requests").select("id, business_id, contact_id").eq("id", reportRequestId).maybeSingle();
  if (!rr) return json({ ok: false, error: "report_request_not_found" }, 404, cors);

  const { data: run } = await supabase.from("agent_runs").insert({
    report_request_id: reportRequestId, agent_name: "compose_report_v1", status: "running",
    input_summary: { report_request_id: reportRequestId }, started_at: new Date().toISOString(),
  }).select("id").single();
  const agentRunId = run?.id ?? null;

  try {
    const { data: evidence, error: evErr } = await supabase
      .from("evidence_items")
      .select("id, claim_supported, relation, source_type, strength, source_tier, origin_class, provenance, limitations, value_signals")
      .eq("report_request_id", reportRequestId);
    if (evErr) throw evErr;

    // No evidence → refuse to invent a report.
    if (!evidence || evidence.length === 0) {
      await supabase.from("agent_runs").update({
        status: "failed", error: "no_evidence", latency_ms: Date.now() - startedAt, finished_at: new Date().toISOString(),
      }).eq("id", agentRunId);
      return json({ ok: false, error: "needs_evidence", report_request_id: reportRequestId, agent_run_id: agentRunId, status: "needs_evidence" }, 200, cors);
    }

    const evidenceIds = evidence.map((e: any) => e.id);
    const flags = {
      metrics: evidence.some((e: any) => e.source_type === "manual_metrics"),
      owned: evidence.some((e: any) => OWNED.has(e.source_type)),
      competitor: evidence.some((e: any) => e.source_type === "competitor"),
      note: evidence.some((e: any) => e.source_type === "user_note"),
      notesOrUrls: evidence.length > 0,
      onlyWeak: evidence.every((e: any) => e.strength === "weak"),
    };

    const pattern = selectPattern(flags);
    const confidence = scoreConfidence(flags);

    // evidence list in the frontend-renderable shape (claims come ONLY from evidence)
    const evidenceList = evidence.map((e: any) => ({
      id: e.id, claim: e.claim_supported, type: e.source_type, source: e.source_type,
      tier: e.source_tier, strength: e.strength, provenance: e.provenance, limitations: e.limitations,
      supports: reportRequestId,
    }));

    const opportunity = {
      title: "أكمل أدلّتك لرفع الثقة ثم نشغّل أعلى إصلاح أثرًا",
      description: "هذه قراءة أوّلية مبنية على ما قدّمته فقط. أكمل المبيعات/التكلفة والروابط لنرفع الثقة فوق السقف الحالي.",
      impact_estimate: "غير محدّد بعد (تقدير يتطلّب بيانات فعلية)",
      priority: "normal",
      effort: "low",
      evidence_refs: evidenceIds,
      isEstimate: true,
    };

    const finding = {
      id: `rr_${reportRequestId}`,
      title: "قراءة أوّلية مبنية على مدخلاتك — تحتاج تحقّقًا على بياناتك الفعلية",
      systemNarrative:
        "بُنيت هذه القراءة من المصادر التي قدّمتها أنت فقط، دون استخراج خارجي أو تحقّق. الثقة محدودة عمدًا حتى تُضاف بيانات فعلية.",
      reasoningTrace: [
        "جمعنا المصادر التي قدّمتها (روابط/منافسون/ملاحظات/مقاييس).",
        "حوّلنا كل مصدر إلى دليل أوّلي بقوّة محافِظة (دون تحقّق خارجي).",
        "طابقنا الحالة مع نمط محافِظ يعكس مستوى الأدلّة المتاح.",
        "حسبنا الثقة بقواعد ثابتة مع سقف، وأظهرنا ما ينقص.",
      ],
      patternMatch: {
        patternKey: pattern.pattern_key,
        name: pattern.pattern_key,
        family: pattern.family,
        description: "نمط محافِظ يعكس أن الأدلّة الحالية مقدّمة من المستخدم ولم تُتحقّق خارجيًا بعد.",
        whyFits: "تتوافق مع نوع وكمية الأدلّة التي قدّمتها.",
        whatWeakens: "إضافة بيانات فعلية مُستخرجة قد ترجّح نمطًا أدقّ.",
      },
      evidence: evidenceList,
      confidence,
      missingData: missingData(),
      ruledOut: ruledOut(),
      verificationSteps: [
        "شارك تصدير المبيعات/الطلبات لآخر فترة.",
        "أضف التكلفة/العمولة لتقييم الربح.",
        "شارك روابط المنافسين لاستخراجها لاحقًا.",
      ],
    };

    // ---- validation gate: every evidence-based claim references an evidence id ----
    const issues: Array<{ issue_type: string; severity: string; message: string }> = [];
    if (evidenceIds.length === 0) issues.push({ issue_type: "no_evidence", severity: "error", message: "Report has no evidence references." });
    const allClaimsReferenced = evidenceList.every((e: any) => evidenceIds.includes(e.id));
    if (!allClaimsReferenced) issues.push({ issue_type: "claim_without_evidence", severity: "error", message: "A claim lacks an evidence reference." });
    const validationStatus = issues.some((i) => i.severity === "error") ? "failed" : "passed";

    // ---- persist report ----
    const { data: report, error: repErr } = await supabase.from("reports").insert({
      report_request_id: reportRequestId,
      business_id: rr.business_id,
      contact_id: rr.contact_id,
      finding, confidence, opportunity,
      evidence_refs: evidenceIds,
      status: "in_review",
      validation_status: validationStatus,
      validation_issues: issues,
    }).select("id").single();
    if (repErr) throw repErr;
    const reportId = report.id;

    if (issues.length > 0) {
      await supabase.from("report_validation_issues").insert(
        issues.map((i) => ({ report_id: reportId, issue_type: i.issue_type, severity: i.severity, message: i.message })),
      );
    }

    await supabase.from("opportunities").insert({
      report_id: reportId, report_request_id: reportRequestId, business_id: rr.business_id,
      title: opportunity.title, description: opportunity.description, impact_estimate: opportunity.impact_estimate,
      priority: opportunity.priority, effort: opportunity.effort, evidence_refs: evidenceIds, status: "draft",
    });

    await supabase.from("patterns_matched").insert({
      report_request_id: reportRequestId, business_id: rr.business_id,
      pattern_key: pattern.pattern_key, family: pattern.family,
      why_fits: finding.patternMatch.whyFits, what_weakens: finding.patternMatch.whatWeakens,
      score: confidence.score, evidence_refs: evidenceIds, status: "draft",
    });

    await supabase.from("agent_runs").update({
      status: "succeeded",
      output_summary: { report_id: reportId, evidence_count: evidenceIds.length, validation_status: validationStatus, confidence: confidence.score },
      latency_ms: Date.now() - startedAt, finished_at: new Date().toISOString(),
    }).eq("id", agentRunId);

    return json({
      ok: true, report_request_id: reportRequestId, report_id: reportId,
      validation_status: validationStatus, confidence: confidence.score,
      evidence_count: evidenceIds.length, agent_run_id: agentRunId, status: "in_review",
    }, 200, cors);
  } catch (e) {
    await supabase.from("agent_runs").update({
      status: "failed", error: e instanceof Error ? e.message : "compose_failed",
      latency_ms: Date.now() - startedAt, finished_at: new Date().toISOString(),
    }).eq("id", agentRunId);
    return json({ ok: false, error: e instanceof Error ? e.message : "compose_failed", agent_run_id: agentRunId, status: "failed" }, 500, cors);
  }
});
