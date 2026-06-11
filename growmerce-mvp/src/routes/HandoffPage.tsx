import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shell } from '../components/Shell';
import { JourneyProgress } from '../components/JourneyProgress';
import { LeadForm } from '../components/LeadForm';
import { HandoffSummary } from '../components/HandoffSummary';
import { EmptyState } from '../components/EmptyState';
import { StepNav } from '../components/StepNav';
import { useSession } from '../state/session';
import { saveLead } from '../lib/leadStore';
import { buildWhatsAppLink, buildDiagnosticMessage, WHATSAPP_CONFIGURED } from '../lib/whatsapp';
import { track } from '../lib/analytics';
import { getGrowthOpsExamples } from '../mock/growthOps';
import { problemLabel, businessTypeOption, MARKETS } from '../mock/catalog';
import type { HandoffSummary as HandoffSummaryType, Lead, LeadContext } from '../types';

/** `/handoff` — lead capture (after value) → WhatsApp / Growth Operations handoff. */
export function HandoffPage() {
  const navigate = useNavigate();
  const { session, goTo, setLead, setHandoff } = useSession();
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

  const onLeadSubmit = (lead: Lead) => {
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
    saveLead(withContext); // thin localStorage persistence (demo — not a CRM)
    track('lead_submitted', { pattern: finding.patternKey });

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
            <h1 className="hero__title" style={{ fontSize: 'var(--fs-h1)' }}>اختبر هذا التشخيص على بياناتك الحقيقية</h1>
            <p className="muted">
              رأيت التشخيص والأدلّة والثقة والفرصة. تابع لنراجعها مع فريق جرومرس على أرقامك، ونتّفق على أوّل إصلاح نشغّله.
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
            <p className="section-label">التسليم — من البصيرة إلى التنفيذ</p>
            <h1 className="hero__title" style={{ fontSize: 'var(--fs-h1)' }}>لا نكتفي بالتشخيص — نشغّل الإصلاح.</h1>

            <HandoffSummary summary={session.handoff} />

            {/* Growth Operations framing (scenario-aware) */}
            <section className="panel growthops" aria-label="ما الذي يمكن أن نساعد في تشغيله">
              <h3 className="panel__title">ما الذي يمكن أن نساعد في تشغيله؟</h3>
              <p className="hint">أمثلة تنفيذ مرتبطة بحالتك — وليست نتائج مضمونة.</p>
              <ul className="growthops__list">
                {growthOps.map((g, i) => <li key={i}>{g}</li>)}
              </ul>
            </section>

            <div className="handoff__ctas">
              <a
                className="btn btn--primary btn--lg"
                href={buildWhatsAppLink(waMessage)}
                target="_blank"
                rel="noreferrer"
                onClick={() => track('whatsapp_clicked', { from: 'handoff' })}
              >
                أرسل السياق عبر واتساب ←
              </a>
              <button type="button" className="btn btn--lg" disabled aria-disabled="true">
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
            <p className="hint demo-note">بياناتك محفوظة محليًا في هذه التجربة فقط — بلا نظام إدارة علاقات (CRM)، وواتساب رابط مباشر لا تكامل.</p>

            <StepNav onBack={() => goTo('lead')} backLabel="→ رجوع" />
          </section>
        )}
      </div>
    </Shell>
  );
}
