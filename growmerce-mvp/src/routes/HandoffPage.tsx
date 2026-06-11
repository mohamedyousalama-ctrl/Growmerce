import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shell } from '../components/Shell';
import { JourneyProgress } from '../components/JourneyProgress';
import { LeadForm } from '../components/LeadForm';
import { HandoffSummary } from '../components/HandoffSummary';
import { StepNav } from '../components/StepNav';
import { useSession } from '../state/session';
import { buildWhatsAppLink } from '../lib/whatsapp';
import type { HandoffSummary as HandoffSummaryType, Lead } from '../types';

/** `/handoff` — lead capture (after value) → WhatsApp / Growth Operations handoff. */
export function HandoffPage() {
  const navigate = useNavigate();
  const { session, goTo, setLead, setHandoff } = useSession();
  const state = session.state;

  // Guard: if landed here cold, start at lead.
  useEffect(() => {
    if (!['lead', 'handoff'].includes(state)) goTo('lead');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onLeadSubmit = (lead: Lead) => {
    const finding = session.finding;
    const opp = session.opportunity;
    const withContext: Lead = {
      ...lead,
      businessType: session.structuredInput.businessType,
      mainChannel: session.structuredInput.channels[0]?.type,
      internalContext: finding ? `finding:${finding.id};pattern:${finding.patternKey}` : undefined,
    };
    setLead(withContext);

    const summary: HandoffSummaryType = {
      findingTitle: finding?.title ?? 'تشخيص تجريبي',
      patternKey: finding?.patternKey ?? 'demo',
      opportunityTitle: opp?.title ?? 'فرصة تجريبية',
      confidenceBand: finding?.confidence.band ?? 'medium',
      contextDigest: 'ملخّص سياق تجريبي يُمرَّر إلى عمليات النمو.',
      whatGrowmerceCanExecute: [
        'إعادة هيكلة القائمة وإبراز الأصناف البطلة',
        'معالجة فجوات التوفّر على أصناف الذروة',
        'قياس الأثر على الطلبات والربح',
      ],
    };
    setHandoff(summary);
    goTo('handoff');
  };

  const waMessage = session.handoff
    ? `مرحبًا جرومرس، شخّصت نشاطي. التشخيص: ${session.handoff.findingTitle} — والفرصة: ${session.handoff.opportunityTitle}. أودّ مراجعتها على أرقامي الحقيقية. (تجربة تجريبية)`
    : 'مرحبًا جرومرس، أودّ متابعة تشخيص نشاطي. (تجربة تجريبية)';

  return (
    <Shell>
      <div className="container container--narrow">
        <JourneyProgress current={state} />

        {state === 'lead' && (
          <section>
            <h1 className="hero__title" style={{ fontSize: 'var(--fs-h1)' }}>تابع معنا</h1>
            <p className="muted">رأيت التشخيص والفرصة — أرسل بياناتك لنكمل ونضغط النتائج على أرقامك الحقيقية.</p>
            <div style={{ marginTop: 'var(--space-5)' }}>
              <LeadForm onSubmit={onLeadSubmit} />
            </div>
            <StepNav onBack={() => navigate('/diagnose')} backLabel="→ رجوع للنتيجة" />
          </section>
        )}

        {state === 'handoff' && session.handoff && (
          <section className="handoff">
            <p className="section-label">التسليم — من البصيرة إلى التنفيذ</p>
            <h1 className="hero__title" style={{ fontSize: 'var(--fs-h1)' }}>لا نكتفي بالتشخيص — نشغّل الإصلاح.</h1>

            <HandoffSummary summary={session.handoff} />

            <div className="handoff__ctas">
              <a className="btn btn--primary btn--lg" href={buildWhatsAppLink(waMessage)} target="_blank" rel="noreferrer">
                تابع على واتساب ←
              </a>
              <button type="button" className="btn btn--lg" onClick={() => { /* Sprint 4: consultation booking */ }}>
                احجز جلسة تدقيق
              </button>
            </div>

            <p className="hint">
              عمليات نمو المبيعات: نراجع النتائج على أرقامك الحقيقية، ثم نشغّل أعلى الإصلاحات أثرًا ونقيس النتيجة.
            </p>

            <StepNav onBack={() => goTo('lead')} backLabel="→ رجوع" />
          </section>
        )}
      </div>
    </Shell>
  );
}
