import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shell } from '../components/Shell';
import { JourneyProgress } from '../components/JourneyProgress';
import { StepNav } from '../components/StepNav';
import { InputChip } from '../components/InputChip';
import { SuggestionCard } from '../components/SuggestionCard';
import { EvidencePanel } from '../components/EvidencePanel';
import { ConfidenceModule } from '../components/ConfidenceModule';
import { MissingDataModule } from '../components/MissingDataModule';
import { RuledOutModule } from '../components/RuledOutModule';
import { OpportunityCard } from '../components/OpportunityCard';
import { DemoBanner } from '../components/ProvenanceTag';
import { useSession } from '../state/session';
import type { BusinessType, ChannelType } from '../types';

const BUSINESS_TYPES: { key: BusinessType; label: string }[] = [
  { key: 'restaurant', label: 'مطعم / توصيل' },
  { key: 'marketplace_seller', label: 'بائع في سوق إلكتروني' },
  { key: 'ecommerce_store', label: 'متجر إلكتروني' },
  { key: 'retail', label: 'تجزئة' },
  { key: 'social_commerce', label: 'تجارة عبر التواصل' },
];

const CHANNELS: { key: ChannelType; label: string }[] = [
  { key: 'marketplace', label: 'سوق إلكتروني' },
  { key: 'store', label: 'متجر' },
  { key: 'delivery', label: 'تطبيق توصيل' },
  { key: 'social', label: 'تواصل اجتماعي' },
  { key: 'whatsapp', label: 'واتساب' },
];

const PROBLEMS: { key: string; label: string }[] = [
  { key: 'flat_sales', label: 'مبيعاتي لا تنمو' },
  { key: 'busy_no_profit', label: 'أبيع كثيرًا لكن بلا ربح' },
  { key: 'competitor_winning', label: 'منافس يتقدّم عليّ' },
  { key: 'traffic_no_orders', label: 'زيارات بلا طلبات' },
];

/** `/diagnose` — one progressive flow: input → reasoning → result → opportunity. */
export function DiagnosePage() {
  const navigate = useNavigate();
  const { session, goTo, setInput, runDiagnostic } = useSession();
  const state = session.state;
  const si = session.structuredInput;

  // Guard: if landed here cold, start at input.
  useEffect(() => {
    if (!['input', 'reasoning', 'result', 'opportunity'].includes(state)) {
      goTo('input');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggleChannel = (c: ChannelType, label: string) => {
    const exists = si.channels.some((ch) => ch.type === c);
    const channels = exists
      ? si.channels.filter((ch) => ch.type !== c)
      : [...si.channels, { id: `ch_${c}`, type: c, label }];
    setInput({ channels });
  };

  const coverage =
    (si.businessType ? 1 : 0) + (si.channels.length > 0 ? 1 : 0) + (si.mainProblem ? 1 : 0);
  const canDiagnose = coverage >= 2; // business type + channel + problem are ideal; ≥2 unlocks

  return (
    <Shell>
      <div className="container">
        <JourneyProgress current={state} />

        {/* ---------- INPUT ---------- */}
        {state === 'input' && (
          <section>
            <h1 className="hero__title" style={{ fontSize: 'var(--fs-h1)' }}>علّمنا عن نشاطك</h1>
            <p className="muted">كلّ خطوة تزيد دقّة التشخيص. كلّها اختيارية — لا حقول إلزامية.</p>

            <div className="panel">
              <h3 className="panel__title">نوع النشاط</h3>
              <div className="chips">
                {BUSINESS_TYPES.map((b) => (
                  <InputChip
                    key={b.key}
                    label={b.label}
                    selected={si.businessType === b.key}
                    onToggle={() => setInput({ businessType: b.key })}
                  />
                ))}
              </div>
            </div>

            <div className="panel">
              <h3 className="panel__title">قنوات البيع</h3>
              <div className="chips">
                {CHANNELS.map((c) => (
                  <InputChip
                    key={c.key}
                    label={c.label}
                    selected={si.channels.some((ch) => ch.type === c.key)}
                    onToggle={() => toggleChannel(c.key, c.label)}
                  />
                ))}
              </div>
            </div>

            <div className="panel">
              <h3 className="panel__title">ما المشكلة الأساسية؟</h3>
              <div className="chips">
                {PROBLEMS.map((p) => (
                  <InputChip
                    key={p.key}
                    label={p.label}
                    selected={si.mainProblem === p.key}
                    onToggle={() => setInput({ mainProblem: p.key })}
                  />
                ))}
              </div>
            </div>

            <SuggestionCard
              title="منافسون محتملون (اقتراح)"
              suggestion="استنتجنا منافسين محتملين من فئتك — اقبلهم أو عدّلهم أو ارفضهم. (اقتراح تجريبي)"
              provenance="demo"
            />

            <div className="panel">
              <h3 className="panel__title">أي شيء تريد إضافته؟ (اختياري)</h3>
              <div className="field">
                <textarea
                  rows={3}
                  placeholder="اكتب بإيجاز ما يقلقك في المبيعات…"
                  value={si.freeText ?? ''}
                  onChange={(e) => setInput({ freeText: e.target.value })}
                />
              </div>
            </div>

            <StepNav
              hint={`التغطية: ${coverage}/3 — كلّما أضفت أكثر ارتفعت الثقة`}
              onBack={() => navigate('/')}
              backLabel="→ الرئيسية"
              onNext={() => void runDiagnostic()}
              nextLabel="شخّص الآن ←"
              nextDisabled={!canDiagnose}
            />
          </section>
        )}

        {/* ---------- REASONING (transient working state) ---------- */}
        {state === 'reasoning' && (
          <section className="reasoning-working" aria-live="polite">
            <h2 className="hero__title" style={{ fontSize: 'var(--fs-h2)' }}>جارٍ التحليل…</h2>
            <p className="reasoning-working__line">فحص الطلب مقابل العرض…</p>
            <p className="reasoning-working__line">الفصل بين الإيرادات والربح…</p>
            <p className="reasoning-working__line">مطابقة الأنماط واستبعاد البدائل…</p>
            <p className="hint">استدلال حقيقي قيد العرض — وليس مؤشّر انتظار شكلي.</p>
          </section>
        )}

        {/* ---------- RESULT ---------- */}
        {state === 'result' && session.finding && (
          <section>
            <DemoBanner />
            <p className="section-label">ما الذي نراه</p>
            <h1 className="finding__title">{session.finding.title}</h1>
            {session.finding.systemNarrative && <p className="muted">{session.finding.systemNarrative}</p>}

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
              <p className="hint" style={{ marginTop: 'var(--space-2)' }}>
                النمط المطابق: {session.finding.patternMatch.name}
              </p>
            </section>

            <EvidencePanel items={session.finding.evidence} />
            <ConfidenceModule explanation={session.finding.confidence} />
            <MissingDataModule items={session.finding.missingData} />
            <RuledOutModule items={session.finding.ruledOut} />

            {session.finding.recommendedVerification && (
              <p className="hint">خطوة التحقّق المقترحة: {session.finding.recommendedVerification}</p>
            )}

            <StepNav onBack={() => goTo('input')} onNext={() => goTo('opportunity')} nextLabel="الفرصة ذات الأولوية ←" />
          </section>
        )}

        {/* ---------- OPPORTUNITY ---------- */}
        {state === 'opportunity' && session.opportunity && (
          <section>
            <p className="section-label">الفرصة ذات الأولوية</p>
            <OpportunityCard opportunity={session.opportunity} />
            <StepNav
              onBack={() => goTo('result')}
              onNext={() => {
                goTo('lead');
                navigate('/handoff');
              }}
              nextLabel="تابع ←"
              hint="بعد أن رأيت القيمة — تابع لتسلّمها"
            />
          </section>
        )}
      </div>
    </Shell>
  );
}
