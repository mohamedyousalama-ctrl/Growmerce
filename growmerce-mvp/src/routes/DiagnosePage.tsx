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
import { arabicDigits } from '../lib/format';
import type { ConfidenceBand } from '../types';

const BAND_AR: Record<ConfidenceBand, string> = { low: 'منخفضة', medium: 'متوسّطة', high: 'عالية', very_high: 'عالية جدًا' };

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

        {/* ---------- RESULT — Board Intelligence Dossier (Commerce Intelligence OS v4) ---------- */}
        {state === 'result' && session.finding && (
          <section className="dossier" aria-label="موجز الذكاء التجاري">
            {/* mono/meta header — honest, not fake board authority */}
            <div className="dossier__top">
              <span className="dossier__restricted">عرض تجريبي · توضيحي</span>
              <span className="dossier__ref">REF GM-CI-DEMO · 1 / 1</span>
            </div>

            <DemoBanner />

            <div className="dossier__brandline">
              <span className="dossier__glyph" aria-hidden>◴</span>
              <span className="dossier__brandname">جرومرس · ذكاء تجاري<br />موجز قرار — تجريبي</span>
            </div>

            {/* A — Finding headline (editorial) */}
            <p className="dossier__kicker">ما الذي نراه</p>
            <h1 className="dossier__headline">{session.finding.title}</h1>
            <div className="dossier__subrow">
              <span>أُعدّ لصاحب النشاط</span>
              <span className="dot">·</span>
              <span className="mono">الثقة: {BAND_AR[session.finding.confidence.band]} · {arabicDigits(session.finding.confidence.score)}٪</span>
              <span className="dot">·</span>
              <span>{arabicDigits(session.finding.evidence.length)} إشارة مؤيِّدة</span>
            </div>

            {/* Bottom Line Up Front — executive verdict */}
            {session.finding.systemNarrative && (
              <div className="bluf">
                <span className="bluf__label">الخلاصة أوّلًا</span>
                <p className="bluf__text">{session.finding.systemNarrative}</p>
              </div>
            )}

            {/* B — Reasoning trace */}
            <section className="dossier__section" aria-label="مسار الاستدلال">
              <span className="os-label">كيف وصلنا إلى ذلك</span>
              <ol className="trace">
                {session.finding.reasoningTrace.map((step, i) => (
                  <li key={i}>
                    <span className="trace__idx num">{arabicDigits(i + 1)}.</span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </section>

            {/* C — Pattern match */}
            <PatternMatchPanel match={session.finding.patternMatch} />

            {/* D — Evidence */}
            <EvidencePanel items={session.finding.evidence} />

            {/* E — Confidence instrument */}
            <ConfidenceModule explanation={session.finding.confidence} />

            {/* F — Missing data */}
            <MissingDataModule items={session.finding.missingData} />

            {/* G — Ruled-out hypotheses */}
            <RuledOutModule items={session.finding.ruledOut} />

            {/* H — Recommended verification */}
            <VerificationPanel steps={session.finding.verificationSteps ?? []} />

            {/* methodology / honesty footer */}
            <p className="dossier__foot">
              المنهجية · {arabicDigits(session.finding.evidence.length)} إشارة مؤيِّدة، {arabicDigits(session.finding.ruledOut.length)} بديل مُستبعَد، نمط واحد ·
              أعدّه ذكاء جرومرس — قراءة محفوظة تجريبية، تُؤكَّد على بياناتك الحقيقية. بلا وعودٍ مضمونة.
            </p>

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
