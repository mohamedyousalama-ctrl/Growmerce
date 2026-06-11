import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shell } from '../components/Shell';
import { JourneyProgress } from '../components/JourneyProgress';
import { StepNav } from '../components/StepNav';
import { StructuredInputFlow } from '../components/StructuredInputFlow';
import { PatternMatchPanel } from '../components/PatternMatchPanel';
import { EvidencePanel } from '../components/EvidencePanel';
import { ConfidenceModule } from '../components/ConfidenceModule';
import { MissingDataModule } from '../components/MissingDataModule';
import { RuledOutModule } from '../components/RuledOutModule';
import { VerificationPanel } from '../components/VerificationPanel';
import { OpportunityCard } from '../components/OpportunityCard';
import { OpportunityBridge } from '../components/OpportunityBridge';
import { DemoBanner } from '../components/ProvenanceTag';
import { useSession } from '../state/session';
import { track } from '../lib/analytics';

/** `/diagnose` — one progressive flow: input → reasoning → result → opportunity. */
export function DiagnosePage() {
  const navigate = useNavigate();
  const { session, goTo } = useSession();
  const state = session.state;

  // Guard: if landed here cold, start at input.
  useEffect(() => {
    if (!['input', 'reasoning', 'result', 'opportunity'].includes(state)) {
      goTo('input');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // funnel events on entering result / opportunity
  useEffect(() => {
    if (state === 'result') track('diagnostic_result_viewed', { pattern: session.finding?.patternKey });
    if (state === 'opportunity') track('opportunity_viewed', { pattern: session.finding?.patternKey });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  return (
    <Shell>
      <div className="container">
        <JourneyProgress current={state} />

        {/* ---------- INPUT (Sprint 2 structured input experience) ---------- */}
        {state === 'input' && <StructuredInputFlow onBackHome={() => navigate('/')} />}

        {/* ---------- REASONING (transient working state — final logic in Sprint 3) ---------- */}
        {state === 'reasoning' && (
          <section className="reasoning-working" aria-live="polite">
            <h2 className="hero__title" style={{ fontSize: 'var(--fs-h2)' }}>جارٍ التحليل…</h2>
            <p className="reasoning-working__line">فحص الطلب مقابل العرض…</p>
            <p className="reasoning-working__line">الفصل بين الإيرادات والربح…</p>
            <p className="reasoning-working__line">مطابقة الأنماط واستبعاد البدائل…</p>
            <p className="hint">استدلال حقيقي قيد العرض — وليس مؤشّر انتظار شكلي.</p>
          </section>
        )}

        {/* ---------- RESULT (executive intelligence brief; A→I) ---------- */}
        {state === 'result' && session.finding && (
          <section>
            <DemoBanner />

            {/* A — Finding summary */}
            <p className="section-label">ما الذي نراه</p>
            <h1 className="finding__title">{session.finding.title}</h1>
            {session.finding.systemNarrative && <p className="muted">{session.finding.systemNarrative}</p>}

            {/* B — Reasoning trace */}
            <section className="panel" aria-label="مسار الاستدلال">
              <h3 className="panel__title">كيف وصلنا إلى ذلك</h3>
              <ol className="trace">
                {session.finding.reasoningTrace.map((step, i) => (
                  <li key={i}>
                    <span className="trace__idx num">{i + 1}.</span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </section>

            {/* C — Pattern match */}
            <PatternMatchPanel match={session.finding.patternMatch} />

            {/* D — Evidence */}
            <EvidencePanel items={session.finding.evidence} />

            {/* E — Confidence explanation */}
            <ConfidenceModule explanation={session.finding.confidence} />

            {/* F — Missing data */}
            <MissingDataModule items={session.finding.missingData} />

            {/* G — Ruled-out hypotheses */}
            <RuledOutModule items={session.finding.ruledOut} />

            {/* H — Recommended verification */}
            <VerificationPanel steps={session.finding.verificationSteps ?? []} />

            {/* I — Continue to opportunity */}
            <StepNav onBack={() => goTo('input')} onNext={() => goTo('opportunity')} nextLabel="الفرصة ذات الأولوية ←" />
          </section>
        )}

        {/* ---------- OPPORTUNITY + bridge to action ---------- */}
        {state === 'opportunity' && session.opportunity && (
          <section>
            <p className="section-label">الفرصة ذات الأولوية</p>
            <OpportunityCard
              opportunity={session.opportunity}
              basedOn={
                session.finding
                  ? {
                      findingTitle: session.finding.title,
                      confidenceBand: session.finding.confidence.band,
                      confidenceScore: session.finding.confidence.score,
                      evidenceCount: session.finding.evidence.length,
                    }
                  : undefined
              }
            />

            <OpportunityBridge
              verificationSteps={session.finding?.verificationSteps ?? []}
              onContinue={() => {
                goTo('lead');
                navigate('/handoff');
              }}
            />

            <StepNav onBack={() => goTo('result')} backLabel="→ رجوع للنتيجة" />
          </section>
        )}
      </div>
    </Shell>
  );
}
