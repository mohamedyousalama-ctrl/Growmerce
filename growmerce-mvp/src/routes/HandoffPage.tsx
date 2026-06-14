import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shell } from '../components/Shell';
import { JourneyProgress } from '../components/JourneyProgress';
import { LeadForm } from '../components/LeadForm';
import { HandoffSummary } from '../components/HandoffSummary';
import { EmptyState } from '../components/EmptyState';
import { StepNav } from '../components/StepNav';
import { useSession } from '../state/session';
import { submitLead, LEAD_SINK_CONFIGURED, type LeadSubmitResult } from '../lib/leadSink';
import { buildWhatsAppLink, buildDiagnosticMessage, WHATSAPP_CONFIGURED } from '../lib/whatsapp';
import { track } from '../lib/analytics';
import { getGrowthOpsExamples } from '../mock/growthOps';
import { problemLabel, businessTypeOption, MARKETS } from '../mock/catalog';
import type { HandoffSummary as HandoffSummaryType, Lead, LeadContext } from '../types';

/** `/handoff` — lead capture (after value) → WhatsApp / Growth Operations handoff. */
export function HandoffPage() {
  const navigate = useNavigate();
  const { session, goTo, setLead, setHandoff } = useSession();
  const [submitResult, setSubmitResult] = useState<LeadSubmitResult | null>(null);
  const state = session.state;
  const finding = session.finding;
  const si = session.structuredInput;

  // Guard: a coherent handoff needs a completed diagnosis. If absent (e.g. direct visit), empty state.
  useEffect(() => {
    if (finding && !['lead', 'handoff'].includes(state)) goTo('lead');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ---- derived context ----
  const businessTypeLabel = businessTypeOption(si.businessType)?.label;
  const channelsLabels = si.channels.map((c) => c.label);
  const primaryChannel =
    si.channels.find((c) => c.id === si.primaryChannelId) ?? si.channels[0];
  const problemLbl = problemLabel(si.mainProblem);
  const regionLabel = MARKETS.find((m) => m.key === si.market?.region)?.label;
  const businessContext = [businessTypeLabel, channelsLabels.join('، '), regionLabel]
    .filter(Boolean)
    .join(' · ');
  const growthOps = finding ? getGrowthOpsExamples(finding.patternKey, si.businessType) : [];
  const missingSummary = finding ? finding.missingData.map((m) => m.what) : [];
  const verificationSteps = finding?.verificationSteps ?? [];

  // ---- direct-visit empty state ----
  if (!finding) {
    return (
      <Shell>
        <div className="container container--narrow">
          <EmptyState
            title="لا يوجد تشخيص بعد"
            body="نُسلّم الفرصة بعد التشخيص. ابدأ بتعليم جرومرس عن نشاطك لنشخّص أين تتسرّب مبيعاتك، ثم نتابع من هنا."
            actionLabel="ابدأ التشخيص ←"
            onAction={() => {
              goTo('input');
              navigate('/diagnose');
            }}
          />
        </div>
      </Shell>
    );
  }

  const onLeadSubmit = async (lead: Lead) => {
    const context: LeadContext = {
      businessType: si.businessType,
      channels: channelsLabels,
      mainProblem: problemLbl,
      findingTitle: finding.title,
      patternKey: finding.patternKey,
      confidenceBand: finding.confidence.band,
      confidenceScore: finding.confidence.score,
      opportunityTitle: session.opportunity?.title,
      verificationSteps,
      missingSummary,
      provenance: 'demo',
    };
    const withContext: Lead = {
      ...lead,
      internalContext: `finding:${finding.id};pattern:${finding.patternKey}`,
      context,
    };
    setLead(withContext);

    // Submit to the highest-priority configured sink (Supabase → endpoint → localStorage).
    const result = await submitLead(withContext, { structuredInput: si, currentDemoFinding: finding });
    setSubmitResult(result);
    // Total failure (not even local storage) → surface the error on the form, stay put.
    if (!result.ok) throw new Error('lead_submit_failed');
    track('lead_submitted', { pattern: finding.patternKey, sentRemote: result.sentRemote });

    const summary: HandoffSummaryType = {
      findingTitle: finding.title,
      patternKey: finding.patternKey,
      opportunityTitle: session.opportunity?.title ?? '—',
      confidenceBand: finding.confidence.band,
      confidenceScore: finding.confidence.score,
      businessContext,
      contextDigest: 'ملخّص يُمرَّر إلى عمليات النمو — تجربة تجريبية، والأرقام تُؤكَّد على بياناتك.',
      verificationSteps,
      missingSummary,
      whatGrowmerceCanExecute: growthOps,
    };
    setHandoff(summary);
    goTo('handoff');
  };

  const waMessage = buildDiagnosticMessage({
    businessName: session.lead?.businessName,
    businessTypeLabel,
    channelLabel: primaryChannel?.label,
    platforms: si.platformMetrics?.platforms,
    problemLabel: problemLbl,
    findingTitle: finding.title,
    opportunityTitle: session.opportunity?.title,
    confidenceBand: finding.confidence.band,
  });

  return (
    <Shell>
      <div className="container container--narrow">
        <JourneyProgress current={state} />

        {/* ---------- LEAD (after value) ---------- */}
        {state === 'lead' && (
          <section>
            <p className="section-label">تسليم تدقيق المنصات · Platform Audit Handoff</p>
            <h1 className="hero__title" style={{ fontSize: 'var(--fs-h1)' }}>راجع تدقيق منصاتك مع فريق جرومرس</h1>
            <p className="muted">
              سنراجع حساباتك ومنصاتك على أرقامك الحقيقية، ونحدّد أوّل إصلاح تشغيلي يمكن تنفيذه — أين يتسرّب الإيراد،
              ما الأدلّة المتاحة، درجة الثقة، البيانات الناقصة، وأوّل إصلاح تشغيلي مقترح.
            </p>
            <div style={{ marginTop: 'var(--space-5)' }}>
              <LeadForm
                initial={{ businessType: si.businessType, mainChannel: primaryChannel?.type }}
                onSubmit={onLeadSubmit}
              />
            </div>
            <StepNav onBack={() => navigate('/diagnose')} backLabel="→ رجوع للفرصة" />
          </section>
        )}

        {/* ---------- HANDOFF (summary + Growth Operations + WhatsApp) ---------- */}
        {state === 'handoff' && session.handoff && (
          <section className="handoff">
            <p className="section-label">تسليم تدقيق المنصات · Platform Audit Handoff</p>
            <h1 className="hero__title" style={{ fontSize: 'var(--fs-h1)' }}>لا نكتفي بالتشخيص — نشغّل الإصلاح.</h1>

            <HandoffSummary summary={session.handoff} />

            {/* Lead submission status (success / fallback / partial failure) */}
            {submitResult?.sentRemote && (
              <p className="status-note status-note--ok" role="status">
                تم استلام بياناتك بنجاح — سيتواصل معك فريق جرومرس بخصوص هذا التشخيص.
              </p>
            )}
            {submitResult && submitResult.configured && !submitResult.sentRemote && (
              <p className="status-note status-note--warn" role="status">
                حُفظت بياناتك محليًا، لكن تعذّر إرسالها للخادم الآن. أسرع طريقة للمتابعة: راسلنا عبر واتساب أدناه.
              </p>
            )}
            {submitResult && !submitResult.configured && (
              <p className="hint demo-note" role="status">
                وضع تجريبي: لم يُضبط مستقبِل بيانات خارجي بعد — حُفظت بياناتك محليًا في هذا المتصفّح فقط. تابع عبر واتساب أدناه.
              </p>
            )}

            {/* Growth Operations framing (scenario-aware) — dark intelligence panel */}
            <section className="insight-panel growthops" aria-label="ما الذي يمكن أن نساعد في تشغيله">
              <span className="insight-panel__label">عمليات نمو المبيعات</span>
              <h3 className="insight-panel__title">ما الذي يمكن أن نساعد في تشغيله؟</h3>
              <p className="os-tagline">Find the leak → Prove it → Operate the fix</p>
              <ul className="growthops__list" style={{ marginTop: 'var(--space-3)' }}>
                {growthOps.map((g, i) => <li key={i}>{g}</li>)}
              </ul>
            </section>

            <div className="handoff__ctas">
              <a
                className="btn btn--whatsapp btn--lg"
                href={buildWhatsAppLink(waMessage)}
                target="_blank"
                rel="noreferrer"
                onClick={() => track('whatsapp_clicked', { from: 'handoff' })}
              >
                أرسل السياق عبر واتساب ←
              </a>
              <button type="button" className="btn btn--dark btn--lg" disabled aria-disabled="true">
                ناقش الفرصة مع فريق جرومرس <span className="soon-tag">قريبًا</span>
              </button>
            </div>

            {!WHATSAPP_CONFIGURED && (
              <p className="hint demo-note">
                وضع تجريبي: لم يُضبط رقم واتساب بعد — سيفتح الرابط واتساب لاختيار المستلم. (رابط مباشر، بلا تكامل API)
              </p>
            )}

            <p className="hint">
              عمليات نمو المبيعات: نراجع النتائج على أرقامك الحقيقية، ثم نشغّل أعلى الإصلاحات أثرًا ونقيس النتيجة — بدون وعودٍ مضمونة.
            </p>
            <p className="hint demo-note">
              {LEAD_SINK_CONFIGURED
                ? 'بياناتك تُرسَل إلى مستقبِل جرومرس للمتابعة (مع نسخة محلية احتياطية) — بلا نظام إدارة علاقات (CRM) بعد، وواتساب رابط مباشر لا تكامل.'
                : 'بياناتك محفوظة محليًا في هذه التجربة فقط — بلا نظام إدارة علاقات (CRM)، وواتساب رابط مباشر لا تكامل.'}
            </p>

            <StepNav onBack={() => goTo('lead')} backLabel="→ رجوع" />
          </section>
        )}
      </div>
    </Shell>
  );
}
