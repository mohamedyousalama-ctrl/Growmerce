import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { buildWhatsAppLink, DEFAULT_WA_MESSAGE } from '../lib/whatsapp';
import { track } from '../lib/analytics';

/** App shell: topbar (wordmark + clear audit CTA + WhatsApp) + content + mobile sticky CTA + footer. */
export function Shell({ children }: { children: ReactNode }) {
  const waLink = buildWhatsAppLink(DEFAULT_WA_MESSAGE);
  return (
    <div className="app-shell">
      <header className="topbar">
        <Link to="/" className="brand" aria-label="جرومرس — الرئيسية" style={{ textDecoration: 'none' }}>
          <span className="brand__mark">جرومرس</span>
          <span className="brand__desc">تشخيص وتشغيل نمو المبيعات على المنصات</span>
        </Link>
        <nav className="topbar__nav" aria-label="أقسام الصفحة">
          <a href="#pains">المشكلة</a>
          <a href="#proof">مثال التقرير</a>
          <a href="#platforms">المنصات</a>
          <a href="#process">كيف نعمل</a>
          <a href="#pricing">الباقات</a>
        </nav>
        <div className="topbar__actions">
          <Link
            to="/diagnose"
            className="btn btn--primary btn--sm"
            onClick={() => track('diagnostic_started', { from: 'topbar' })}
          >
            ابدأ التدقيق
          </Link>
          <a
            className="wa-action"
            href={waLink}
            target="_blank"
            rel="noreferrer"
            aria-label="ناقش عبر واتساب"
            onClick={() => track('whatsapp_clicked', { from: 'topbar' })}
          >
            <span className="wa-action__dot" aria-hidden />
            واتساب
          </a>
        </div>
      </header>

      <main className="main">{children}</main>

      {/* mobile sticky CTA — easy audit action + WhatsApp */}
      <nav className="mobile-cta" aria-label="إجراءات سريعة">
        <Link
          to="/diagnose"
          className="btn btn--primary"
          onClick={() => track('diagnostic_started', { from: 'mobile_sticky' })}
        >
          ابدأ التدقيق
        </Link>
        <a
          className="btn btn--whatsapp"
          href={waLink}
          target="_blank"
          rel="noreferrer"
          aria-label="ناقش عبر واتساب"
          onClick={() => track('whatsapp_clicked', { from: 'mobile_sticky' })}
        >
          واتساب
        </a>
      </nav>

      <footer className="footer">
        <p>جرومرس — تشغيل نمو المبيعات عبر المنصات</p>
        <p className="footer__tagline">نجد التسرّب ← نثبّته ← نشغّل الإصلاح</p>
        <p className="footer__demo">
          نسخة تجريبية (MVP): الذكاء هنا محاكى لإثبات التجربة، والروابط والبيانات للعرض فقط — وليست تكاملات أو بيانات حقيقية.
        </p>
      </footer>
    </div>
  );
}
