/** Stage 8 — what happens after the audit: find → prove → operate → monitor. */
const STEPS = [
  { n: '١', title: 'نجد التسرّب', body: 'نحدّد أين يضيع الإيراد أو الربح عبر منصاتك.' },
  { n: '٢', title: 'نثبت السبب بالأدلّة المتاحة', body: 'نقرأ الإشارات، ونوضّح ما نعرفه وما نحتاجه قبل رفع الثقة.' },
  { n: '٣', title: 'ننفّذ أول إصلاح تشغيلي', body: 'تعديل قائمة، ضبط حملة، مراقبة مخزون، تحسين ظهور، أو تجهيز منصة جديدة.' },
  { n: '٤', title: 'نراقب النتيجة', body: 'نقيس الأثر على أرقامك ونضبط التشغيل تباعًا.' },
];

export function GrowthOpsProcess() {
  return (
    <section className="growthops-process">
      <p className="section-label">ماذا يحدث بعد التدقيق؟</p>
      <h2 className="growthops-process__title">ماذا يحدث بعد التدقيق؟</h2>
      <p className="muted growthops-process__sub">
        جرومرس لا يكتفي بتقرير — نربط التشخيص بعملية تشغيل واضحة، ثم نقيس أثرها.
      </p>

      <ol className="process-timeline">
        {STEPS.map((s) => (
          <li key={s.n} className="process-step">
            <span className="process-step__num num-ar">{s.n}</span>
            <div>
              <h3 className="process-step__title">{s.title}</h3>
              <p className="muted">{s.body}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
