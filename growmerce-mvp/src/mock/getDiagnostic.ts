/*
  Mock diagnostic interface — the single seam between the UI and (future) real intelligence.

  Sprint 3: delegates to the deterministic mock reasoning engine (scenarios.ts), which
  branches on the captured StructuredInput to produce an input-specific DiagnosticFinding.
  Still NOT real AI / NOT real data / NOT benchmarks — every output is provenance: 'demo'.
  When the real engine (20/22/24/25) is built, ONLY this module + scenarios.ts change; the
  UI contract stays identical.
*/
import type { DiagnosticFinding, StructuredInput } from '../types';
import { buildFinding } from './scenarios';

export interface GetDiagnosticInput {
  structuredInput: StructuredInput;
}

/** Deterministic mock diagnostic. Branches on input via the reasoning engine. */
export async function getDiagnostic(input: GetDiagnosticInput): Promise<DiagnosticFinding> {
  // small delay so the "reasoning" state is perceptible in the skeleton
  await new Promise((r) => setTimeout(r, 650));
  return buildFinding(input.structuredInput);
}
