import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { buildWhatsAppLink, DEFAULT_WA_MESSAGE } from '../lib/whatsapp';
import { track } from '../lib/analytics';

/** App shell: calm topbar (bilingual wordmark + persistent WhatsApp) + content + quiet footer. */
export function Shell({ children }: { children: ReactNode }) {
  return (
    <div className="app-shell">
      <header className="topbar">
        <Link to="/" className="brand" aria-label="جرومرس — الرئيسية" style={{ textDecoration: 'none' }}>
          <span className="brand__mark">جرومرس</span>
          <span className="brand__desc">نظام ذكاء تجاري</span>
        </Link>
        <a
          className="wa-action"
          href={buildWhatsAppLink(DEFAULT_WA_MESSAGE)}
          target="_blank"
          rel="noreferrer"
          aria-label="ناقش عبر واتساب"
          onClick={() => track('whatsapp_clicked', { from: 'topbar' })}
        >
          <span className="wa-action__dot" aria-hidden />
          ناقش عبر واتساب
        </a>
      </header>

      <main className="main">{children}</main>

      <footer className="footer">
        <p>جرومرس — تشغيل نمو المبيعات أونلاين، مدفوعًا بالذكاء التجاري</p>
        <p className="footer__tagline">Find the leak → Prove it → Operate the fix</p>
        <p className="footer__demo">
          نسخة تجريبية (MVP): الذكاء هنا محاكى لإثبات التجربة، والروابط والبيانات للعرض فقط — وليست تكاملات أو بيانات حقيقية.
        </p>
      </footer>
    </div>
  );
}
