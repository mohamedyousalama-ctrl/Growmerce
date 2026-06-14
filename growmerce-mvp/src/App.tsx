import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { SessionProvider } from './state/session';
import { RecognitionPage } from './routes/RecognitionPage';
import { AuditIntakePage } from './routes/AuditIntakePage';
import { DiagnosePage } from './routes/DiagnosePage';
import { HandoffPage } from './routes/HandoffPage';

/**
 * Routes:
 *   /         Recognition entry
 *   /diagnose Progressive diagnostic flow (input → reasoning → result → opportunity)
 *   /handoff  Lead capture → WhatsApp / Growth Operations handoff
 * The DiagnosticSession state machine (SessionProvider) persists across routes.
 */
export default function App() {
  return (
    <SessionProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<RecognitionPage />} />
          <Route path="/audit" element={<AuditIntakePage />} />
          <Route path="/diagnose" element={<DiagnosePage />} />
          <Route path="/handoff" element={<HandoffPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </SessionProvider>
  );
}
