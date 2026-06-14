/*
  Growmerce MVP — Core V1 data model (Sprint 1).

  Source of truth: 24-intelligence-object-architecture (object discipline),
  20 (confidence model), 22 (source tiers / provenance), and the approved blueprint.

  Discipline mirrored from Workstream 24 (kept Sprint-1-simple):
  - `provenance` is present on objects that can be user-provided, inferred, benchmark-based, or DEMO/mocked.
  - `confidence` is a first-class value object (band + score), never a bare number, where appropriate.
  - Source tier (1..5) caps trust (22). Revenue and profit are kept distinct (H1).
  These types are intentionally lean for the skeleton; richer fields (versioning, edges,
  full provenance DAG) arrive when the real engine replaces the mock.
*/

/* ---------- Shared value types ---------- */

/** Where a piece of information came from. `demo` = mocked/placeholder, shown honestly. */
export type Provenance = 'user' | 'inferred' | 'benchmark' | 'demo';

/** Source-hierarchy tier (22): 1 = direct verified business data … 5 = AI/intuition. Caps influence. */
export type SourceTier = 1 | 2 | 3 | 4 | 5;

/** Calibrated confidence band (20). NOT a success/failure status. */
export type ConfidenceBand = 'low' | 'medium' | 'high' | 'very_high';

/** Confidence as a value object (band + computed score), with provenance. */
export interface Confidence {
  band: ConfidenceBand;
  /** 0..100 */
  score: number;
  provenance: Provenance;
}

/* ---------- Commerce entities (09 of 24, simplified) ---------- */

export type BusinessType =
  | 'restaurant'
  | 'marketplace_seller'
  | 'ecommerce_store'
  | 'retail'
  | 'social_commerce';

export type ChannelType = 'marketplace' | 'store' | 'delivery' | 'social' | 'whatsapp';

export interface Channel {
  id: string;
  type: ChannelType;
  label: string;
  platformName?: string;
}

export type ProductKind = 'sku' | 'meal' | 'category';

export interface ProductOrMenuItem {
  id: string;
  name: string;
  kind: ProductKind;
  role?: 'hero' | 'core' | 'tail';
  priceHint?: string;
}

export interface Competitor {
  id: string;
  name: string;
  /** how this competitor entered the picture */
  source: 'user' | 'inferred';
  channel?: string;
}

export type LocationType = 'branch' | 'zone' | 'region';

export interface Location {
  id: string;
  type: LocationType;
  label: string;
  geo?: string;
}

/** Market context the operator sells into. */
export type MarketKey = 'SA' | 'UAE' | 'EG' | 'GCC';

export interface MarketContext {
  region?: MarketKey;
  country?: string;
  city?: string;
  district?: string;
}

/**
 * Optional context links the operator can provide. Captured for a FUTURE sprint —
 * NOT analyzed in V1 (no integrations / no file processing).
 */
export interface ContextLinks {
  websiteUrl?: string;
  storeUrl?: string;
  menuUrl?: string;
}

/* ---------- Input layer (04 / 22 / 24) ---------- */

/** Raw, reusable capture from the structured-input experience. */
export interface StructuredInput {
  businessType?: BusinessType;
  channels: Channel[];
  /** id of the channel marked primary (references a Channel.id in `channels`) */
  primaryChannelId?: string;
  products: ProductOrMenuItem[];
  competitors: Competitor[];
  location?: Location;
  /** country / city / district / region context */
  market?: MarketContext;
  /** optional URLs captured for a future sprint — not analyzed in V1 */
  links?: ContextLinks;
  /** the felt problem the operator selected (a problem key) */
  mainProblem?: string;
  freeText?: string;
  /** chosen platform vertical for the audit (Stage 4 verticalization) */
  platformVertical?: PlatformVertical;
  /** flexible, optional platform-specific audit metrics (backward compatible) */
  platformMetrics?: Record<string, string>;
  provenance: Provenance;
}

/** Platform vertical the operator wants audited (maps loosely onto BusinessType). */
export type PlatformVertical = 'ecommerce' | 'food_delivery' | 'qcommerce' | 'mixed';

/** The saved, reusable business picture. */
export interface CommerceProfile {
  id: string;
  businessType?: BusinessType;
  channels: Channel[];
  brandName?: string;
  markets?: string[];
  goals?: string[];
  provenance: Provenance;
}

/** Resolved context the reasoning operates on. */
export interface BusinessContext {
  businessType?: BusinessType;
  primaryChannel?: ChannelType;
  problemKey?: string;
  marketRegion?: string;
}

/* ---------- Recognition (19) ---------- */

export interface PatternRecognition {
  key: string;
  /** the pattern stated in the operator's felt language */
  statement: string;
  vertical: BusinessType | 'all';
  whyLine?: string;
  /** the main-problem key this recognition maps to (seeds the input step) */
  problemKey?: string;
  provenance: Provenance;
}

/* ---------- Diagnostic objects (19 / 20 / 22) ---------- */

export interface PatternMatch {
  patternKey: string;
  name: string;
  description: string;
  causes?: string[];
  /** the pattern family this belongs to (trust without revealing full doctrine) */
  family?: string;
  /** why this pattern fits the user's context */
  whyFits?: string;
  /** what evidence would weaken this pattern match */
  whatWeakens?: string;
}

export interface EvidenceItem {
  id: string;
  /** interpreted claim */
  claim: string;
  /** signal type, e.g. "menu_visibility" */
  type: string;
  /** where it came from, human-readable */
  source: string;
  tier: SourceTier;
  strength: 'weak' | 'moderate' | 'strong';
  /** id of the finding this supports */
  supports: string;
  provenance: Provenance;
}

export interface ConfidenceExplanation {
  band: ConfidenceBand;
  score: number;
  raisedBy: string[];
  reducedBy: string[];
  wouldImprove: string[];
  /** the ceiling if key data is missing */
  cap?: ConfidenceBand;
  capReason?: string;
  provenance: Provenance;
}

export interface MissingDataItem {
  id: string;
  what: string;
  whyItMatters: string;
  confidenceImpact: string;
  provideNext: string;
}

export interface RuledOutHypothesis {
  id: string;
  hypothesis: string;
  whyRuledOut: string;
  basis: string;
}

/* ---------- Opportunity / recommendation (20 / 24) ---------- */

export type Priority = 'now' | 'next' | 'plan';
export type Effort = 'low' | 'medium' | 'high';

export interface ImpactEstimate {
  /** qualitative impact statement (revenue and/or profit) */
  qualitative: string;
  /** optional range, e.g. "٥٪–١٢٪" */
  range?: string;
  /** ALWAYS true in V1 — impact is an estimate, flagged honestly */
  isEstimate: boolean;
}

export interface OpportunityRecommendation {
  id: string;
  title: string;
  impact: ImpactEstimate;
  priority: Priority;
  effort: Effort;
  confidence: Confidence;
  whyItMatters: string;
  /** the recommended first action */
  firstAction: string;
  /** ids of evidence this links back to */
  evidenceRefs: string[];
  provenance: Provenance;
}

/** The full diagnosis — the Brain-shaped output (20). */
export interface DiagnosticFinding {
  id: string;
  patternKey: string;
  title: string;
  systemNarrative?: string;
  reasoningTrace: string[];
  patternMatch: PatternMatch;
  evidence: EvidenceItem[];
  confidence: ConfidenceExplanation;
  missingData: MissingDataItem[];
  ruledOut: RuledOutHypothesis[];
  recommendedVerification?: string;
  /** concrete steps to validate the finding on real data */
  verificationSteps?: string[];
  opportunity: OpportunityRecommendation;
  /** 'demo' in V1 */
  provenance: Provenance;
}

/* ---------- Conversion / action ---------- */

/** Diagnostic context attached to a captured lead (carried into the handoff). */
export interface LeadContext {
  businessType?: BusinessType;
  channels: string[]; // channel labels
  mainProblem?: string; // problem label
  findingTitle?: string;
  patternKey?: string;
  confidenceBand?: ConfidenceBand;
  confidenceScore?: number;
  opportunityTitle?: string;
  verificationSteps?: string[];
  missingSummary?: string[];
  provenance: Provenance; // 'demo' in V1
}

export interface Lead {
  name: string;
  businessName: string;
  whatsapp: string;
  country: string;
  businessType?: BusinessType;
  mainChannel?: ChannelType;
  contactPermission: boolean;
  // optional
  email?: string;
  role?: string;
  websiteUrl?: string;
  note?: string;
  // internal
  internalContext?: string;
  context?: LeadContext;
}

export interface HandoffSummary {
  findingTitle: string;
  patternKey: string;
  opportunityTitle: string;
  confidenceBand: ConfidenceBand;
  confidenceScore?: number;
  businessContext?: string;
  contextDigest: string;
  verificationSteps?: string[];
  missingSummary?: string[];
  whatGrowmerceCanExecute?: string[];
}

/* ---------- Journey ---------- */

export type JourneyState =
  | 'recognition'
  | 'input'
  | 'reasoning'
  | 'result'
  | 'opportunity'
  | 'lead'
  | 'handoff';

/** Ties the whole vertical-slice journey together. */
export interface DiagnosticSession {
  id: string;
  state: JourneyState;
  structuredInput: StructuredInput;
  finding?: DiagnosticFinding;
  opportunity?: OpportunityRecommendation;
  lead?: Lead;
  handoff?: HandoffSummary;
}
