import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { buildWhatsAppLink, DEFAULT_WA_MESSAGE } from '../lib/whatsapp';

/** App shell: calm topbar (bilingual wordmark + persistent WhatsApp) + content + quiet footer. */
export function Shell({ children }: { children: ReactNode }) {
  return (
    <div className="app-shell">
      <header className="topbar">
        <Link to="/" className="brand" aria-label="جرومرس — الرئيسية" style={{ textDecoration: 'none' }}>
          <span className="brand__mark">جرومرس</span>
          <span className="brand__desc">نظام ذكاء تجاري</span>
        </Link>
        <a className="wa-action" href={buildWhatsAppLink(DEFAULT_WA_MESSAGE)} target="_blank" rel="noreferrer">
          <span className="wa-action__dot" aria-hidden />
          تواصل عبر واتساب
        </a>
      </header>

      <main className="main">{children}</main>

      <footer className="footer">
        جرومرس — تشغيل نمو المبيعات أونلاين، مدفوعًا بالذكاء التجاري · <span dir="ltr">MVP Vertical Slice V1 — Sprint 1 (skeleton)</span>
      </footer>
    </div>
  );
}
