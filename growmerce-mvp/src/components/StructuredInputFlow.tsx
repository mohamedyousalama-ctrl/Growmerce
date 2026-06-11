import { useMemo, useState } from 'react';
import { useSession } from '../state/session';
import { computeCoverage, meetsMinimum } from '../lib/coverage';
import {
  BUSINESS_TYPES,
  CHANNEL_OPTIONS,
  MARKETS,
  PROBLEMS,
  businessTypeOption,
  channelOptionByKey,
} from '../mock/catalog';
import { getSuggestions } from '../mock/suggestions';
import { CoverageMeter } from './CoverageMeter';
import { InputChip } from './InputChip';
import { AddChipInput } from './AddChipInput';
import { CompetitorSuggestions } from './CompetitorSuggestions';
import { StepNav } from './StepNav';
import type { BusinessType, Channel, Competitor, MarketKey, ProductOrMenuItem } from '../types';

/** A small "suggested" chip with add + dismiss (accept/reject for single entities). */
function SuggestedChip({ label, onAdd, onDismiss }: { label: string; onAdd: () => void; onDismiss: () => void }) {
  return (
    <span className="chip chip--suggested">
      <button type="button" className="chip__add" onClick={onAdd} aria-label={`إضافة ${label}`}>
        ＋ {label}
      </button>
      <button type="button" className="chip__remove" onClick={onDismiss} aria-label={`تجاهل ${label}`}>
        ✕
      </button>
    </span>
  );
}

/**
 * Structured Input experience (Sprint 2).
 * "علّم جرومرس كيف يعمل نشاطك أونلاين" — teaching, not a form.
 * Captures into DiagnosticSession; enforces minimum input; feeds Sprint 3's getDiagnostic().
 */
export function StructuredInputFlow({ onBackHome }: { onBackHome: () => void }) {
  const { session, setInput, runDiagnostic } = useSession();
  const si = session.structuredInput;

  const [dismissedItems, setDismissedItems] = useState<Set<string>>(new Set());
  const [dismissedChannels, setDismissedChannels] = useState<Set<string>>(new Set());
  const [dismissedCompetitors, setDismissedCompetitors] = useState<Set<string>>(new Set());

  const suggestions = useMemo(() => getSuggestions(si.businessType), [si.businessType]);
  const coverage = useMemo(() => computeCoverage(si), [si]);
  const canDiagnose = meetsMinimum(si);
  const btOption = businessTypeOption(si.businessType);

  /* ---------- business type ---------- */
  const setBusinessType = (key: BusinessType) => setInput({ businessType: key });

  /* ---------- channels ---------- */
  const isChannelOn = (key: string) => si.channels.some((c) => c.id === key);

  const toggleChannel = (key: string) => {
    const opt = channelOptionByKey(key);
    if (!opt) return;
    const exists = isChannelOn(key);
    const channels: Channel[] = exists
      ? si.channels.filter((c) => c.id !== key)
      : [...si.channels, { id: opt.key, type: opt.type, label: opt.label, platformName: opt.platformName }];

    let primaryChannelId = si.primaryChannelId;
    if (exists && primaryChannelId === key) primaryChannelId = channels[0]?.id;
    if (!exists && !primaryChannelId) primaryChannelId = key;
    setInput({ channels, primaryChannelId });
  };

  const setPrimary = (id: string) => setInput({ primaryChannelId: id });

  /* ---------- products / items ---------- */
  const addProduct = (name: string) => {
    const exists = si.products.some((p) => p.name.trim() === name.trim());
    if (exists) return;
    const item: ProductOrMenuItem = {
      id: `p_${Date.now()}_${si.products.length}`,
      name: name.trim(),
      kind: btOption?.itemKind ?? 'sku',
    };
    setInput({ products: [...si.products, item] });
  };
  const removeProduct = (id: string) => setInput({ products: si.products.filter((p) => p.id !== id) });

  /* ---------- competitors ---------- */
  const addCompetitor = (name: string, source: Competitor['source']) => {
    const exists = si.competitors.some((c) => c.name.trim() === name.trim());
    if (exists) return;
    const c: Competitor = { id: `c_${Date.now()}_${si.competitors.length}`, name: name.trim(), source };
    setInput({ competitors: [...si.competitors, c] });
  };
  const removeCompetitor = (id: string) => setInput({ competitors: si.competitors.filter((c) => c.id !== id) });

  /* ---------- market ---------- */
  const setMarket = (patch: Partial<NonNullable<typeof si.market>>) =>
    setInput({ market: { ...si.market, ...patch } });

  /* ---------- links ---------- */
  const setLinks = (patch: Partial<NonNullable<typeof si.links>>) =>
    setInput({ links: { ...si.links, ...patch } });

  /* ---------- derived suggestion lists ---------- */
  const suggestedItems = suggestions.items.filter(
    (n) => !si.products.some((p) => p.name === n) && !dismissedItems.has(n),
  );
  const suggestedChannels = suggestions.channelKeys.filter((k) => !isChannelOn(k) && !dismissedChannels.has(k));
  const suggestedCompetitors = suggestions.competitors.filter(
    (n) => !si.competitors.some((c) => c.name === n) && !dismissedCompetitors.has(n),
  );

  return (
    <section className="input-flow">
      <header>
        <h1 className="hero__title" style={{ fontSize: 'var(--fs-h1)' }}>علّم جرومرس كيف يعمل نشاطك أونلاين</h1>
        <p className="muted">كل معلومة تضيفها تجعل التشخيص أوضح. يمكنك تخطّي أي جزء الآن — لا حقول إلزامية.</p>
      </header>

      <CoverageMeter coverage={coverage} />

      {/* ---------- Business type ---------- */}
      <div className="panel subsection">
        <h3 className="panel__title">نوع النشاط</h3>
        <div className="chips">
          {BUSINESS_TYPES.map((b) => (
            <InputChip key={b.key} label={b.label} selected={si.businessType === b.key} onToggle={() => setBusinessType(b.key)} />
          ))}
        </div>
      </div>

      {/* ---------- Channels ---------- */}
      <div className="panel subsection">
        <h3 className="panel__title">قنوات البيع</h3>
        <div className="chips">
          {CHANNEL_OPTIONS.map((c) => (
            <InputChip key={c.key} label={c.label} selected={isChannelOn(c.key)} onToggle={() => toggleChannel(c.key)} />
          ))}
        </div>

        {suggestedChannels.length > 0 && (
          <div className="suggest-row">
            <span className="hint">مقترحة لنوع نشاطك:</span>
            <div className="chips">
              {suggestedChannels.map((k) => {
                const opt = channelOptionByKey(k);
                if (!opt) return null;
                return (
                  <SuggestedChip
                    key={k}
                    label={opt.label}
                    onAdd={() => toggleChannel(k)}
                    onDismiss={() => setDismissedChannels((s) => new Set(s).add(k))}
                  />
                );
              })}
            </div>
          </div>
        )}

        {si.channels.length > 1 && (
          <div className="primary-select">
            <span className="hint">القناة الأساسية:</span>
            <div className="chips">
              {si.channels.map((c) => (
                <InputChip key={c.id} label={c.label} selected={si.primaryChannelId === c.id} onToggle={() => setPrimary(c.id)} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ---------- Products / items ---------- */}
      <div className="panel subsection">
        <h3 className="panel__title">{btOption?.itemNoun ?? 'منتجات / أصناف'} <span className="hint">— اختياري</span></h3>
        <AddChipInput placeholder="أضف صنفًا أو منتجًا…" onAdd={addProduct} />

        {suggestedItems.length > 0 && (
          <div className="suggest-row">
            <span className="hint">اقتراحات لتنظيم السياق:</span>
            <div className="chips">
              {suggestedItems.map((n) => (
                <SuggestedChip
                  key={n}
                  label={n}
                  onAdd={() => addProduct(n)}
                  onDismiss={() => setDismissedItems((s) => new Set(s).add(n))}
                />
              ))}
            </div>
          </div>
        )}

        {si.products.length > 0 && (
          <div className="chips" style={{ marginTop: 'var(--space-3)' }}>
            {si.products.map((p) => (
              <InputChip key={p.id} label={p.name} selected removable onRemove={() => removeProduct(p.id)} />
            ))}
          </div>
        )}
      </div>

      {/* ---------- Competitors ---------- */}
      <div className="panel subsection">
        <h3 className="panel__title">المنافسون <span className="hint">— اختياري</span></h3>
        <AddChipInput placeholder="أضف اسم منافس…" onAdd={(n) => addCompetitor(n, 'user')} />

        <CompetitorSuggestions
          names={suggestedCompetitors}
          onAccept={(n) => addCompetitor(n, 'inferred')}
          onReject={(n) => setDismissedCompetitors((s) => new Set(s).add(n))}
        />

        {si.competitors.length > 0 && (
          <div className="chips" style={{ marginTop: 'var(--space-3)' }}>
            {si.competitors.map((c) => (
              <InputChip key={c.id} label={c.name} selected removable onRemove={() => removeCompetitor(c.id)} />
            ))}
          </div>
        )}
      </div>

      {/* ---------- Location / market ---------- */}
      <div className="panel subsection">
        <h3 className="panel__title">الموقع والسوق <span className="hint">— اختياري</span></h3>
        <div className="chips">
          {MARKETS.map((m) => (
            <InputChip
              key={m.key}
              label={m.label}
              selected={si.market?.region === m.key}
              onToggle={() => setMarket({ region: m.key as MarketKey })}
            />
          ))}
        </div>
        <div className="market-grid">
          <div className="field">
            <label htmlFor="mk-country">الدولة</label>
            <input id="mk-country" value={si.market?.country ?? ''} onChange={(e) => setMarket({ country: e.target.value })} />
          </div>
          <div className="field">
            <label htmlFor="mk-city">المدينة</label>
            <input id="mk-city" value={si.market?.city ?? ''} onChange={(e) => setMarket({ city: e.target.value })} />
          </div>
          <div className="field">
            <label htmlFor="mk-district">الحي / المنطقة</label>
            <input id="mk-district" value={si.market?.district ?? ''} onChange={(e) => setMarket({ district: e.target.value })} />
          </div>
        </div>
      </div>

      {/* ---------- Main problem ---------- */}
      <div className="panel subsection">
        <h3 className="panel__title">ما المشكلة الأساسية في مبيعاتك؟</h3>
        <div className="chips">
          {PROBLEMS.map((p) => {
            const isSuggested = suggestions.problemKeys.includes(p.key);
            return (
              <span key={p.key} className="problem-chip-wrap">
                <InputChip label={p.label} selected={si.mainProblem === p.key} onToggle={() => setInput({ mainProblem: p.key })} />
                {isSuggested && si.mainProblem !== p.key && <span className="suggested-tag">مقترح</span>}
              </span>
            );
          })}
        </div>
      </div>

      {/* ---------- Optional context (shells — NOT analyzed in V1) ---------- */}
      <div className="panel subsection optional-shells">
        <h3 className="panel__title">سياق إضافي <span className="hint">— اختياري، لن نحلّله الآن</span></h3>
        <p className="hint">يمكنك إضافة روابط الآن لنستخدمها لاحقًا عند التسليم. لا تتم معالجة أي ملفات في هذه التجربة.</p>
        <div className="market-grid">
          <div className="field">
            <label htmlFor="ln-web">رابط الموقع</label>
            <input id="ln-web" inputMode="url" placeholder="https://" value={si.links?.websiteUrl ?? ''} onChange={(e) => setLinks({ websiteUrl: e.target.value })} />
          </div>
          <div className="field">
            <label htmlFor="ln-store">رابط المتجر / السوق</label>
            <input id="ln-store" inputMode="url" placeholder="https://" value={si.links?.storeUrl ?? ''} onChange={(e) => setLinks({ storeUrl: e.target.value })} />
          </div>
          <div className="field">
            <label htmlFor="ln-menu">رابط القائمة</label>
            <input id="ln-menu" inputMode="url" placeholder="https://" value={si.links?.menuUrl ?? ''} onChange={(e) => setLinks({ menuUrl: e.target.value })} />
          </div>
        </div>
        <div className="upload-shells">
          <button type="button" className="btn upload-shell" disabled>
            رفع لقطة شاشة <span className="soon-tag">قريبًا</span>
          </button>
          <button type="button" className="btn upload-shell" disabled>
            رفع ملف Excel/CSV <span className="soon-tag">قريبًا</span>
          </button>
        </div>
      </div>

      {/* ---------- Free text ---------- */}
      <div className="panel subsection">
        <h3 className="panel__title">أي شيء آخر تريد إخبارنا به؟ <span className="hint">— اختياري</span></h3>
        <div className="field">
          <textarea rows={3} placeholder="اكتب بإيجاز ما يقلقك في مبيعاتك…" value={si.freeText ?? ''} onChange={(e) => setInput({ freeText: e.target.value })} />
        </div>
      </div>

      <StepNav
        hint={canDiagnose ? `وضوح السياق: ${coverage.score}٪` : 'للمتابعة: نوع النشاط + قناة واحدة + المشكلة الأساسية'}
        onBack={onBackHome}
        backLabel="→ الرئيسية"
        onNext={() => void runDiagnostic()}
        nextLabel="شخّص الآن ←"
        nextDisabled={!canDiagnose}
      />
    </section>
  );
}
