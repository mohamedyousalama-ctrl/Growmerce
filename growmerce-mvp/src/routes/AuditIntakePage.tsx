import { useMemo, useRef, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Shell } from '../components/Shell';
import { track } from '../lib/analytics';
import { submitAudit, buildAuditWhatsAppLink, type AuditDraft, type AuditSubmitResult } from '../lib/audit';
import { platformById, type Vertical } from '../knowledge';

/* ---------- static config ---------- */
const VERTICAL_CHOICES: Array<{ key: string; label: string }> = [
  { key: 'food_delivery', label: 'مطاعم وتطبيقات توصيل' },
  { key: 'ecommerce', label: 'متاجر Amazon / Noon / Jumia' },
  { key: 'qcommerce', label: 'علامات FMCG و Q-Commerce' },
  { key: 'direct', label: 'واتساب / Instagram / TikTok / الطلبات المباشرة' },
  { key: 'mixed', label: 'أكثر من نوع' },
];
const PLATFORM_GROUPS: Array<{ title: string; items: string[] }> = [
  { title: 'تجارة إلكترونية', items: ['Amazon', 'Noon', 'Jumia'] },
  { title: 'توصيل طعام', items: ['Talabat', 'HungerStation', 'Jahez', 'Keeta'] },
  { title: 'تجارة سريعة', items: ['Talabat Mart', 'InstaShop', 'Noon Minutes', 'Keemart'] },
  { title: 'مباشر / تواصل', items: ['WhatsApp', 'Instagram', 'TikTok', 'Website / Shopify / Salla'] },
];
const GENERAL_METRICS = [
  { key: 'monthlyGmv', label: 'المبيعات الشهرية التقريبية (GMV)' },
  { key: 'commissionRate', label: 'نسبة العمولة ٪' },
  { key: 'adSpend', label: 'الإنفاق الإعلاني الشهري' },
];
const VERTICAL_METRICS: Record<string, Array<{ key: string; label: string }>> = {
  food_delivery: [
    { key: 'failRate', label: 'معدل الفشل ٪' },
    { key: 'acceptanceRate', label: 'نسبة قبول الطلبات ٪' },
    { key: 'prepTime', label: 'وقت التحضير (دقيقة)' },
    { key: 'rating', label: 'التقييم' },
  ],
  ecommerce: [
    { key: 'acos', label: 'ACOS ٪' },
    { key: 'tacos', label: 'TACOS ٪' },
    { key: 'buyBoxIssue', label: 'مشكلة Buy Box؟ (نعم/لا/لا أعرف)' },
    { key: 'accountHealthIssue', label: 'مشكلة صحة الحساب؟ (نعم/لا/لا أعرف)' },
    { key: 'inventoryDays', label: 'أيام تغطية المخزون' },
  ],
  qcommerce: [
    { key: 'fillRate', label: 'Fill rate ٪' },
    { key: 'availabilityScore', label: 'درجة التوفّر' },
    { key: 'oosRate', label: 'OOS rate ٪' },
    { key: 'stockCoverageDays', label: 'أيام تغطية المخزون' },
  ],
};

const ALLOWED_EXT = ['pdf', 'png', 'jpg', 'jpeg', 'csv', 'xls', 'xlsx', 'doc', 'docx'];
const MAX_FILES = 5;
const MAX_BYTES = 10 * 1024 * 1024;
const STEPS = ['نوع المنصة', 'الحسابات والروابط', 'مؤشرات التشغيل', 'الملفات والمستندات', 'بيانات التواصل'];

const emptyDraft = (): AuditDraft => ({
  verticals: [], platforms: [], links: [''], competitorLinks: [''], metrics: {}, mainProblem: '',
  name: '', whatsapp: '', email: '', businessName: '', country: '', city: '', consent: false,
});

function fmtSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}

export function AuditIntakePage() {
  const navigate = useNavigate();
  const [params] = useSearchParams();

  const [step, setStep] = useState(0);
  const [verticalKeys, setVerticalKeys] = useState<string[]>(() => {
    const v = params.get('v');
    return v && VERTICAL_CHOICES.some((c) => c.key === v) ? [v] : [];
  });
  const [draft, setDraft] = useState<AuditDraft>(() => {
    const d = emptyDraft();
    const p = params.get('p');
    if (p) d.platforms = [p];
    const l = params.get('l');
    if (l) d.links = [l, ''];
    return d;
  });
  const [files, setFiles] = useState<File[]>([]);
  const [fileError, setFileError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<AuditSubmitResult | null>(null);
  const dropRef = useRef<HTMLInputElement>(null);

  const verticalLabels = useMemo(
    () => verticalKeys.map((k) => VERTICAL_CHOICES.find((c) => c.key === k)?.label ?? k),
    [verticalKeys],
  );
  const activeMetricVerticals = verticalKeys.filter((k) => VERTICAL_METRICS[k]);

  const set = (patch: Partial<AuditDraft>) => setDraft((d) => ({ ...d, ...patch }));
  const setMetric = (k: string, v: string) => setDraft((d) => ({ ...d, metrics: { ...d.metrics, [k]: v } }));
  const toggleVertical = (k: string) =>
    setVerticalKeys((s) => (s.includes(k) ? s.filter((x) => x !== k) : [...s, k]));
  const togglePlatform = (name: string) =>
    set({ platforms: draft.platforms.includes(name) ? draft.platforms.filter((p) => p !== name) : [...draft.platforms, name] });

  /* ---------- files ---------- */
  const addFiles = (incoming: FileList | File[]) => {
    setFileError(null);
    const arr = Array.from(incoming);
    let next = [...files];
    for (const f of arr) {
      const ext = f.name.split('.').pop()?.toLowerCase() ?? '';
      if (!ALLOWED_EXT.includes(ext)) { setFileError(`نوع غير مدعوم: ${f.name}`); continue; }
      if (f.size > MAX_BYTES) { setFileError(`الملف أكبر من ١٠ ميجابايت: ${f.name}`); continue; }
      if (next.length >= MAX_FILES) { setFileError('الحد الأقصى ٥ ملفات.'); break; }
      if (!next.some((x) => x.name === f.name && x.size === f.size)) next.push(f);
    }
    setFiles(next);
  };
  const removeFile = (i: number) => setFiles((s) => s.filter((_, idx) => idx !== i));

  /* ---------- gamification meters ---------- */
  const linkCount = draft.links.filter((l) => l.trim()).length + draft.competitorLinks.filter((l) => l.trim()).length;
  const metricCount = Object.values(draft.metrics).filter((v) => v.trim()).length;
  const qualityScore =
    (verticalKeys.length ? 1 : 0) + (draft.platforms.length ? 1 : 0) +
    Math.min(linkCount, 3) + Math.min(metricCount, 4) + Math.min(files.length, 2);
  const quality = qualityScore <= 2 ? 'low' : qualityScore <= 5 ? 'medium' : 'high';
  const qualityLabel =
    quality === 'low' ? 'بيانات قليلة — سنحتاج أسئلة متابعة'
      : quality === 'medium' ? 'بيانات كافية لتدقيق أولي' : 'بيانات قوية لتقرير أدق';

  const contactValid = draft.name.trim() && draft.whatsapp.replace(/\D/g, '').length >= 8 && draft.businessName.trim() && draft.consent;
  const completion = Math.min(100, Math.round(
    ((verticalKeys.length ? 20 : 0) + (draft.platforms.length || linkCount ? 20 : 0) +
      (metricCount ? 20 : 0) + (files.length ? 15 : 0) + (contactValid ? 25 : 0)),
  ));

  /* ---------- submit ---------- */
  const onSubmit = async () => {
    if (!contactValid || submitting) return;
    setSubmitting(true);
    track('lead_submitted', { from: 'audit_intake', quality });
    const payloadDraft: AuditDraft = { ...draft, verticals: verticalLabels };
    const r = await submitAudit(payloadDraft, files);
    setResult(r);
    setSubmitting(false);
  };

  /* ---------- confirmation ---------- */
  if (result) {
    const waLink = buildAuditWhatsAppLink({ ...draft, verticals: verticalLabels }, result.reportRequestId, files.length);
    return (
      <Shell>
        <div className="container container--narrow">
          <section className="audit-confirm">
            <p className="section-label os-label--brand">تم استلام طلب التدقيق</p>
            <h1 className="audit-confirm__title">تم استلام طلب التدقيق ✅</h1>
            <p className="muted">سنراجع بياناتك وروابطك وملفاتك، ونرسل لك تقرير تدقيق أولي خلال يومي عمل.</p>

            <div className="audit-confirm__facts">
              {result.reportRequestId && <span className="metric-tag">رقم الطلب: {result.reportRequestId.slice(0, 8)}</span>}
              {verticalLabels.length > 0 && <span className="metric-tag">{verticalLabels.join('، ')}</span>}
              {draft.platforms.length > 0 && <span className="metric-tag">المنصّات: {draft.platforms.length}</span>}
              <span className="metric-tag">ملفات: {files.length}</span>
              <span className="metric-tag">{draft.whatsapp || draft.email}</span>
            </div>

            {result.sink === 'local' && (
              <p className="status-note status-note--warn" role="status">
                حُفظ طلبك على هذا الجهاز. لضمان وصوله الآن، تابِع عبر واتساب أدناه.
              </p>
            )}
            {result.sink === 'supabase' && result.filesTotal > 0 && result.filesUploaded < result.filesTotal && (
              <p className="status-note status-note--warn" role="status">
                استُلمت بياناتك. تعذّر رفع بعض الملفات تلقائيًا — يمكنك إرسالها عبر واتساب.
              </p>
            )}

            <div className="panel">
              <h3 className="panel__title">الخطوات التالية</h3>
              <ol className="trace">
                {['نراجع الروابط والملفات', 'نحدّد مواضع تسرّب الإيراد أو الربح', 'نجهّز تقرير التدقيق', 'نرسله لك خلال يومي عمل'].map((s, i) => (
                  <li key={i}><span className="trace__idx num">{i + 1}.</span><span>{s}</span></li>
                ))}
              </ol>
            </div>

            <div className="panel">
              <h3 className="panel__title">ماذا يتضمّن التقرير؟</h3>
              <ul className="growthops__list">
                {['مواضع تسرّب المبيعات أو الربح', 'الأدلّة والملاحظات من البيانات المرسلة', 'البيانات الناقصة قبل رفع الثقة', 'أول إصلاحات تشغيلية مقترحة', 'المسار المناسب: تدقيق فقط / تشغيل يومي / توسّع منصات'].map((s, i) => (
                  <li key={i}>{s}</li>
                ))}
              </ul>
            </div>

            <div className="handoff__ctas">
              <a className="btn btn--whatsapp btn--lg" href={waLink} target="_blank" rel="noreferrer" onClick={() => track('whatsapp_clicked', { from: 'audit_confirm' })}>
                ناقش الطلب عبر واتساب ←
              </a>
              <button type="button" className="btn btn--lg" onClick={() => { setResult(null); setStep(0); }}>
                إرسال بيانات إضافية
              </button>
            </div>
            <p className="hint demo-note">المرفقات تُراجَع يدويًا ضمن التدقيق — لا يتم تحليلها آليًا. التقرير ليس فوريًا؛ يصل خلال يومي عمل.</p>
            <p className="hint">
              تريد أن ترى طريقة قراءة التقرير؟{' '}
              <a href="/diagnose" onClick={(e) => { e.preventDefault(); navigate('/diagnose'); }} style={{ color: 'var(--color-brand-strong)' }}>
                شاهد مثالًا توضيحيًا (ليس التقرير النهائي)
              </a>
            </p>
          </section>
        </div>
      </Shell>
    );
  }

  /* ---------- wizard ---------- */
  return (
    <Shell>
      <div className="container audit-intake">
        <header className="audit-intake__head">
          <p className="section-label os-label--brand">احصل على تدقيق مجاني لحساباتك على المنصات خلال يومي عمل</p>
          <h1 className="audit-intake__title">أرسل بيانات حسابك على المنصات</h1>
          <p className="muted">أضف روابط حساباتك أو ملفات الأداء، وسنراجع أين يتسرّب الإيراد أو الربح، وما أول إصلاح تشغيلي يمكن البدء به. نراجعها يدويًا ونرسل التقرير خلال يومي عمل.</p>
        </header>

        <div className="audit-grid">
          <div className="audit-main">
            {/* progress */}
            <div className="audit-progress">
              <span className="os-label">خطوة {['١', '٢', '٣', '٤', '٥'][step]} من ٥ — {STEPS[step]}</span>
              <div className="audit-progress__pills">
                {STEPS.map((_, i) => <span key={i} className={`audit-pill${i === step ? ' is-active' : i < step ? ' is-done' : ''}`} />)}
              </div>
            </div>

            {/* STEP 1 */}
            {step === 0 && (
              <section className="audit-step">
                <h2 className="audit-step__title">ما نوع المنصة التي تريد تدقيقها؟</h2>
                <div className="chips">
                  {VERTICAL_CHOICES.map((c) => (
                    <button key={c.key} type="button" className={`chip${verticalKeys.includes(c.key) ? ' chip--selected' : ''}`} onClick={() => toggleVertical(c.key)}>
                      {c.label}
                    </button>
                  ))}
                </div>
                {verticalKeys.length > 0 && <p className="hint audit-helper">ممتاز — اخترت المنصات الأساسية.</p>}
              </section>
            )}

            {/* STEP 2 */}
            {step === 1 && (
              <section className="audit-step">
                <h2 className="audit-step__title">حساباتك وروابطك</h2>
                {PLATFORM_GROUPS.map((g) => (
                  <div key={g.title} className="audit-pgroup">
                    <span className="os-label">{g.title}</span>
                    <div className="chips">
                      {g.items.map((name) => (
                        <button key={name} type="button" className={`platform-chip platform-chip--btn${draft.platforms.includes(name) ? ' platform-chip--on' : ''}`} onClick={() => togglePlatform(name)}>
                          {name}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
                <p className="hint audit-helper">الصق أي رابط يساعدنا نفهم الحساب: متجر، صفحة منتج، قائمة مطعم، حساب منصة، أو منافس.</p>
                {draft.links.map((l, i) => (
                  <input key={i} className="audit-input" dir="auto" inputMode="url" placeholder="رابط الحساب / المتجر / القائمة / المنتج" value={l}
                    onChange={(e) => { const links = [...draft.links]; links[i] = e.target.value; if (i === links.length - 1 && e.target.value.trim()) links.push(''); set({ links }); }} />
                ))}
                <p className="hint">روابط المنافسين (اختياري):</p>
                {draft.competitorLinks.map((l, i) => (
                  <input key={i} className="audit-input" dir="auto" inputMode="url" placeholder="رابط منافس" value={l}
                    onChange={(e) => { const c = [...draft.competitorLinks]; c[i] = e.target.value; if (i === c.length - 1 && e.target.value.trim()) c.push(''); set({ competitorLinks: c }); }} />
                ))}
                <p className="hint audit-helper">كل رابط إضافي يساعدنا نراجع الحساب بدقة أعلى.</p>
              </section>
            )}

            {/* STEP 3 */}
            {step === 2 && (
              <section className="audit-step">
                <h2 className="audit-step__title">مؤشرات التشغيل <span className="hint">— كلها اختيارية</span></h2>
                <p className="hint audit-helper">لا تعرف الرقم؟ اتركه فارغًا. كل رقم إضافي يساعدنا نرفع جودة التقرير.</p>
                <div className="field field--full">
                  <label htmlFor="m-problem">المشكلة الأساسية</label>
                  <input id="m-problem" className="audit-input" placeholder="مثال: الطلبات تزيد لكن الربح لا يتحسّن" value={draft.mainProblem} onChange={(e) => set({ mainProblem: e.target.value })} />
                </div>
                <div className="audit-metrics">
                  {GENERAL_METRICS.map((f) => (
                    <div className="field" key={f.key}><label htmlFor={`m-${f.key}`}>{f.label}</label>
                      <input id={`m-${f.key}`} className="audit-input" value={draft.metrics[f.key] ?? ''} onChange={(e) => setMetric(f.key, e.target.value)} /></div>
                  ))}
                  {activeMetricVerticals.flatMap((v) => VERTICAL_METRICS[v]).map((f) => (
                    <div className="field" key={f.key}><label htmlFor={`m-${f.key}`}>{f.label} <span className="hint">— إن وُجد</span></label>
                      <input id={`m-${f.key}`} className="audit-input" value={draft.metrics[f.key] ?? ''} onChange={(e) => setMetric(f.key, e.target.value)} /></div>
                  ))}
                </div>
              </section>
            )}

            {/* STEP 4 */}
            {step === 3 && (
              <section className="audit-step">
                <h2 className="audit-step__title">الملفات والمستندات <span className="hint">— اختيارية</span></h2>
                <p className="hint audit-helper">ارفع أي ملف يساعدنا نفهم الحساب: تقرير مبيعات، لقطة شاشة، قائمة، كتالوج، تقرير إعلانات، تقرير مخزون، أو كشف تسوية.</p>
                <div className="dropzone" onClick={() => dropRef.current?.click()}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => { e.preventDefault(); if (e.dataTransfer.files) addFiles(e.dataTransfer.files); }}>
                  <p className="dropzone__title">اسحب الملفات هنا أو اضغط للاختيار</p>
                  <p className="hint">PDF · PNG · JPG · CSV · XLS · XLSX · DOC · DOCX — حتى ٥ ملفات، ١٠ ميجابايت لكل ملف</p>
                  <input ref={dropRef} type="file" multiple hidden accept=".pdf,.png,.jpg,.jpeg,.csv,.xls,.xlsx,.doc,.docx"
                    onChange={(e) => { if (e.target.files) addFiles(e.target.files); e.target.value = ''; }} />
                </div>
                {fileError && <p className="status-note status-note--error">{fileError}</p>}
                {files.length > 0 && (
                  <ul className="filelist">
                    {files.map((f, i) => (
                      <li key={i} className="filelist__item">
                        <span className="filelist__name">{f.name}</span>
                        <span className="filelist__size num">{fmtSize(f.size)}</span>
                        <button type="button" className="filelist__remove" aria-label={`حذف ${f.name}`} onClick={() => removeFile(i)}>✕</button>
                      </li>
                    ))}
                  </ul>
                )}
                <p className="hint demo-note">سنراجع الملفات ضمن التدقيق — لا يتم تحليلها آليًا.</p>
              </section>
            )}

            {/* STEP 5 */}
            {step === 4 && (
              <section className="audit-step">
                <h2 className="audit-step__title">بيانات التواصل</h2>
                <div className="audit-metrics">
                  <div className="field"><label htmlFor="c-name">الاسم *</label><input id="c-name" className="audit-input" value={draft.name} onChange={(e) => set({ name: e.target.value })} /></div>
                  <div className="field"><label htmlFor="c-wa">واتساب *</label><input id="c-wa" className="audit-input" dir="auto" inputMode="tel" value={draft.whatsapp} onChange={(e) => set({ whatsapp: e.target.value })} /></div>
                  <div className="field"><label htmlFor="c-biz">اسم النشاط *</label><input id="c-biz" className="audit-input" value={draft.businessName} onChange={(e) => set({ businessName: e.target.value })} /></div>
                  <div className="field"><label htmlFor="c-email">البريد الإلكتروني</label><input id="c-email" className="audit-input" dir="auto" type="email" value={draft.email} onChange={(e) => set({ email: e.target.value })} /></div>
                  <div className="field"><label htmlFor="c-country">الدولة</label><input id="c-country" className="audit-input" value={draft.country} onChange={(e) => set({ country: e.target.value })} /></div>
                  <div className="field"><label htmlFor="c-city">المدينة</label><input id="c-city" className="audit-input" value={draft.city} onChange={(e) => set({ city: e.target.value })} /></div>
                </div>
                <label className="permission field--full">
                  <input type="checkbox" checked={draft.consent} onChange={(e) => set({ consent: e.target.checked })} />
                  <span>أوافق على أن تستخدم جرومرس البيانات والملفات المرسلة لمراجعة طلب التدقيق والتواصل معي بخصوص التقرير.</span>
                </label>
                {!contactValid && <p className="hint">الاسم وواتساب واسم النشاط والموافقة مطلوبة لإرسال الطلب.</p>}
              </section>
            )}

            {/* nav */}
            <div className="step-nav">
              <button type="button" className="btn" disabled={step === 0} onClick={() => setStep((s) => Math.max(0, s - 1))}>→ السابق</button>
              {step < 4 ? (
                <button type="button" className="btn btn--primary" onClick={() => setStep((s) => Math.min(4, s + 1))}>التالي ←</button>
              ) : (
                <button type="button" className="btn btn--primary btn--lg" disabled={!contactValid || submitting} onClick={onSubmit}>
                  {submitting ? 'جارٍ الإرسال…' : 'إرسال طلب التدقيق'}
                </button>
              )}
            </div>
          </div>

          {/* summary sidebar */}
          <aside className="audit-summary">
            <span className="os-label os-label--brand">ملخّص الطلب</span>
            <div className="audit-summary__row"><span>النوع</span><b>{verticalLabels.length ? verticalLabels.length : '—'}</b></div>
            <div className="audit-summary__row"><span>المنصّات</span><b className="num">{draft.platforms.length}</b></div>
            <div className="audit-summary__row"><span>الروابط</span><b className="num">{linkCount}</b></div>
            <div className="audit-summary__row"><span>الملفات</span><b className="num">{files.length}</b></div>

            <div className="audit-meter">
              <div className="audit-meter__head"><span>اكتمال البيانات</span><span className="num">{completion}٪</span></div>
              <div className="audit-meter__track"><span style={{ inlineSize: `${completion}%` }} /></div>
            </div>
            <div className={`audit-quality audit-quality--${quality}`}>
              <span className="os-label">جودة التدقيق</span>
              <p>{qualityLabel}</p>
            </div>
            <p className="audit-summary__promise">التسليم: <b>خلال يومي عمل</b></p>
            <p className="hint">الملفات اختيارية، لكنها تجعل التقرير أقوى.</p>
          </aside>
        </div>
      </div>
    </Shell>
  );
}
