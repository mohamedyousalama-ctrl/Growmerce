/*
  Diagnostic session state machine (Sprint 1).

  Models the vertical-slice journey as explicit states (20/04):
    recognition → input → reasoning → result → opportunity → lead → handoff

  Holds the StructuredInput, the DiagnosticFinding (from the mock seam), the Lead, and
  the HandoffSummary. Provides linear next()/back(), goTo(), and an async runDiagnostic()
  that calls getDiagnostic() and advances to 'result'. Persisted across routes via context.
*/
import { createContext, useContext, useMemo, useReducer, type ReactNode } from 'react';
import type {
  DiagnosticFinding,
  DiagnosticSession,
  HandoffSummary,
  JourneyState,
  Lead,
  StructuredInput,
} from '../types';
import { getDiagnostic } from '../mock/getDiagnostic';

export const JOURNEY_ORDER: JourneyState[] = [
  'recognition',
  'input',
  'reasoning',
  'result',
  'opportunity',
  'lead',
  'handoff',
];

export const JOURNEY_LABELS_AR: Record<JourneyState, string> = {
  recognition: 'التعرّف',
  input: 'الإدخال',
  reasoning: 'الاستدلال',
  result: 'النتيجة',
  opportunity: 'الفرصة',
  lead: 'التواصل',
  handoff: 'التسليم',
};

function emptyInput(): StructuredInput {
  return { channels: [], products: [], competitors: [], provenance: 'user' };
}

function initialSession(): DiagnosticSession {
  return {
    id: `session_${Date.now()}`,
    state: 'recognition',
    structuredInput: emptyInput(),
  };
}

type Action =
  | { type: 'GOTO'; state: JourneyState }
  | { type: 'SET_INPUT'; patch: Partial<StructuredInput> }
  | { type: 'SET_FINDING'; finding: DiagnosticFinding }
  | { type: 'SET_LEAD'; lead: Lead }
  | { type: 'SET_HANDOFF'; handoff: HandoffSummary }
  | { type: 'RESET' };

function reducer(session: DiagnosticSession, action: Action): DiagnosticSession {
  switch (action.type) {
    case 'GOTO':
      return { ...session, state: action.state };
    case 'SET_INPUT':
      return { ...session, structuredInput: { ...session.structuredInput, ...action.patch } };
    case 'SET_FINDING':
      return { ...session, finding: action.finding, opportunity: action.finding.opportunity };
    case 'SET_LEAD':
      return { ...session, lead: action.lead };
    case 'SET_HANDOFF':
      return { ...session, handoff: action.handoff };
    case 'RESET':
      return initialSession();
    default:
      return session;
  }
}

interface SessionApi {
  session: DiagnosticSession;
  goTo: (state: JourneyState) => void;
  next: () => void;
  back: () => void;
  setInput: (patch: Partial<StructuredInput>) => void;
  setLead: (lead: Lead) => void;
  setHandoff: (handoff: HandoffSummary) => void;
  runDiagnostic: () => Promise<void>;
  reset: () => void;
}

const SessionContext = createContext<SessionApi | null>(null);

export function SessionProvider({ children }: { children: ReactNode }) {
  const [session, dispatch] = useReducer(reducer, undefined, initialSession);

  const api = useMemo<SessionApi>(() => {
    const goTo = (state: JourneyState) => dispatch({ type: 'GOTO', state });

    const next = () => {
      const i = JOURNEY_ORDER.indexOf(session.state);
      if (i >= 0 && i < JOURNEY_ORDER.length - 1) goTo(JOURNEY_ORDER[i + 1]);
    };

    const back = () => {
      const i = JOURNEY_ORDER.indexOf(session.state);
      if (i > 0) goTo(JOURNEY_ORDER[i - 1]);
    };

    const runDiagnostic = async () => {
      goTo('reasoning');
      const finding = await getDiagnostic({ structuredInput: session.structuredInput });
      dispatch({ type: 'SET_FINDING', finding });
      goTo('result');
    };

    return {
      session,
      goTo,
      next,
      back,
      setInput: (patch) => dispatch({ type: 'SET_INPUT', patch }),
      setLead: (lead) => dispatch({ type: 'SET_LEAD', lead }),
      setHandoff: (handoff) => dispatch({ type: 'SET_HANDOFF', handoff }),
      runDiagnostic,
      reset: () => dispatch({ type: 'RESET' }),
    };
  }, [session]);

  return <SessionContext.Provider value={api}>{children}</SessionContext.Provider>;
}

export function useSession(): SessionApi {
  const ctx = useContext(SessionContext);
  if (!ctx) throw new Error('useSession must be used within <SessionProvider>');
  return ctx;
}
