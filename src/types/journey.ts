export type JourneyLineId =
  | "education"
  | "admin"
  | "finance"
  | "data"
  | "erp"
  | "biomedical";

export type JourneyTabId = "map" | "evolution" | "focus" | "horizon";

export interface JourneyNode {
  id: string;
  year: number;
  label: string;
  line: JourneyLineId;
  station: string;
  detail: string;
  link?: {
    kind: "project" | "detail";
    collection?: "experience" | "education" | "certifications";
    slug: string;
  };
}

export interface CapabilityAxis {
  id: "operations" | "finance" | "analytics" | "automation" | "engineering" | "biomedical";
  label: string;
}

export interface CapabilityEpoch {
  year: string;
  title: string;
  scores: Record<CapabilityAxis["id"], number>;
}

export interface FocusAxisComparison {
  axis: string;
  admin: number;
  tech: number;
  hybrid: number;
}

export interface HorizonMilestone {
  period: string;
  title: string;
  focus: "admin" | "tech" | "hybrid";
  description: string;
  outcomes: readonly string[];
}

export interface JourneyCopy {
  eyebrow: string;
  title: string;
  subtitle: string;
  tabs: Record<JourneyTabId, { label: string; description: string }>;
  lines: Record<JourneyLineId, { label: string; color: string }>;
  nodes: readonly JourneyNode[];
  capabilityAxes: readonly CapabilityAxis[];
  epochs: readonly CapabilityEpoch[];
  focusTitle: string;
  focusSubtitle: string;
  focusLegend: {
    admin: string;
    tech: string;
    hybrid: string;
  };
  focusAxes: readonly FocusAxisComparison[];
  horizonMilestones: readonly HorizonMilestone[];
}
