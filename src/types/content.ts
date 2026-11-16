export const SUPPORTED_LANGS = ["es", "en"] as const;
export type Lang = (typeof SUPPORTED_LANGS)[number];
export const DEFAULT_LANG: Lang = "es";

export const ROLE_IDS = ["general", "admin", "tech"] as const;
export type RoleId = (typeof ROLE_IDS)[number];
export const DEFAULT_ROLE: RoleId = "general";

export const SECTION_IDS = [
  "about",
  "experience",
  "projects",
  "journey",
  "skills",
  "services",
  "certifications",
  "testimonials",
  "resume",
  "metrics",
  "contact",
] as const;
export type SectionId = (typeof SECTION_IDS)[number];

export const DETAIL_COLLECTIONS = ["experience", "education", "certifications"] as const;
export type DetailCollection = (typeof DETAIL_COLLECTIONS)[number];

export const EXPERIENCE_IDS = ["aspaen", "aspaenInternship"] as const;
export type ExperienceId = (typeof EXPERIENCE_IDS)[number];

export const EDUCATION_IDS = [
  "sanJoseSystems",
  "sanJoseIndustrial",
  "itmBiomedical",
  "itmAccountingTech",
  "senaSoftware",
  "inemComputerScience",
] as const;
export type EducationId = (typeof EDUCATION_IDS)[number];

export const CASE_STUDY_IDS = [
  "netsuiteEtlPipeline",
  "financialBiSuite",
  "procurementInventoryControl",
  "treasuryAuditAutomation",
] as const;
export type CaseStudyId = (typeof CASE_STUDY_IDS)[number];

export const PROJECT_PAGE_IDS = [
  "clinicalBioengineering",
  "academicEngineeringSuite",
] as const;
export type ProjectPageId = (typeof PROJECT_PAGE_IDS)[number];

export const PROJECT_IDS = [...CASE_STUDY_IDS, ...PROJECT_PAGE_IDS] as const;
export type ProjectId = (typeof PROJECT_IDS)[number];

export const CERTIFICATION_IDS = [
  "googleDataAnalytics",
  "scrumFoundations",
  "excelFinancialModeling",
  "powerBiAnalytics",
  "netsuiteErpOperations",
  "pythonDataScience",
] as const;
export type CertificationId = (typeof CERTIFICATION_IDS)[number];

export const SKILL_GROUP_IDS = [
  "management",
  "finance",
  "analytics",
  "automation",
  "engineering",
  "biomedical",
] as const;
export type SkillGroupId = (typeof SKILL_GROUP_IDS)[number];

export const SERVICE_IDS = [
  "erpOperations",
  "financialControl",
  "biDashboards",
  "processAutomation",
] as const;
export type ServiceId = (typeof SERVICE_IDS)[number];

export const TESTIMONIAL_IDS = [
  "sebastianLopez",
  "aspaenProcurement",
  "aspaenTreasury",
  "sanJoseEngineering",
  "itmBioengineering",
] as const;
export type TestimonialId = (typeof TESTIMONIAL_IDS)[number];

export const RESUME_VARIANT_IDS = ["admin", "tech", "ats"] as const;
export type ResumeVariantId = (typeof RESUME_VARIANT_IDS)[number];

export const METRIC_GROUP_IDS = [
  "operations",
  "finance",
  "automation",
  "academic",
] as const;
export type MetricGroupId = (typeof METRIC_GROUP_IDS)[number];

export interface RoleConfig {
  id: RoleId;
  sectionOrder: readonly SectionId[];
  skillGroupOrder: readonly SkillGroupId[];
  topStack: readonly string[];
  featuredProject: ProjectId;
  focusTech: readonly string[];
}

export interface SiteConfig {
  siteUrl: string;
  basePath: string;
  email: string;
  phoneDisplay: string;
  whatsappNumber: string;
  linkedinHandle: string;
  linkedinUrl: string;
  githubHandle: string;
  githubUrl: string;
  mapsUrl: string;
}

export interface SpokenLanguageFact {
  id: "es" | "en" | "fr" | "ko";
  levelCode: string;
}

export interface ProfileFacts {
  fullName: string;
  shortName: string;
  givenName: string;
  familyName: string;
  email: string;
  phone: string;
  whatsappNumber: string;
  careerStart: string;
  location: {
    city: string;
    region: string;
    country: string;
    countryCode: string;
  };
  spokenLanguages: readonly SpokenLanguageFact[];
  socials: {
    linkedin: string;
    linkedinHandle: string;
    github: string;
    githubHandle: string;
  };
}

export interface HeroRoleCopy {
  badge: string;
  headline: string;
  accentWord: string;
  titleLine: string;
  subtitle: string;
  primaryCta: string;
  secondaryCta: string;
  tertiaryCta: string;
}

export interface HighlightCard {
  id: string;
  value: string;
  label: string;
  hint: string;
}

export interface PillarCopy {
  title: string;
  description: string;
}

export interface AboutCopy {
  eyebrow: string;
  title: string;
  subtitle: string;
  terminalCaption: string;
  roleNarratives: Record<
    RoleId,
    {
      heading: string;
      subheading: string;
      paragraphs: readonly string[];
      targetRoles: readonly string[];
      stats: readonly { label: string; value: string }[];
    }
  >;
  pillarsTitle: string;
  pillars: readonly PillarCopy[];
  educationTitle: string;
  educationSubtitle: string;
  inProgressLabel: string;
  viewDetailsLabel: string;
  viewAllEducationLabel: string;
}

export interface EducationShared {
  id: EducationId;
  slug: string;
  institution: string;
  period: string;
  startYear: number;
  endYear: number | null;
  inProgress: boolean;
  focus: "admin" | "tech" | "both";
}

export interface EducationCopyItem {
  id: EducationId;
  degree: string;
  summary: string;
  badges: readonly string[];
}

export interface ExperienceShared {
  id: ExperienceId;
  slug: string;
  company: string;
  start: string;
  end: string | null;
  current: boolean;
  location: string;
  modality: "on-site" | "hybrid" | "remote";
  stack: readonly string[];
}

export interface ExperienceRoleView {
  roleTitle: string;
  summary: string;
  highlights: readonly string[];
}

export interface ExperienceCopyItem {
  id: ExperienceId;
  byRole: Record<RoleId, ExperienceRoleView>;
}

export interface ExperienceSectionCopy {
  eyebrow: string;
  title: string;
  subtitle: string;
  currentBadge: string;
  presentLabel: string;
  responsibilitiesLabel: string;
  showMoreLabel: string;
  showLessLabel: string;
  viewDetailLabel: string;
  viewAllLabel: string;
  items: Record<ExperienceId, ExperienceCopyItem>;
}

export interface ProjectsSectionCopy {
  eyebrow: string;
  title: string;
  subtitle: string;
  featuredLabel: string;
  caseStudyBadge: string;
  projectPageBadge: string;
  viewCaseLabel: string;
  viewAllLabel: string;
  filterAllLabel: string;
  filterAdminLabel: string;
  filterTechLabel: string;
}

export interface SkillItemCopy {
  name: string;
  level: number;
  context: string;
}

export interface SkillGroupCopy {
  id: SkillGroupId;
  title: string;
  tagline: string;
  items: readonly SkillItemCopy[];
}

export interface SkillsSectionCopy {
  eyebrow: string;
  title: string;
  subtitle: string;
  languagesTitle: string;
  softSkillsTitle: string;
  softSkills: readonly string[];
  spokenLanguages: Record<"es" | "en" | "fr" | "ko", { name: string; level: string }>;
  groups: Record<SkillGroupId, SkillGroupCopy>;
}

export interface ServiceCopyItem {
  id: ServiceId;
  title: string;
  tagline: string;
  description: string;
  deliverables: readonly string[];
  impact: string;
  tags: readonly string[];
}

export interface ServicesSectionCopy {
  eyebrow: string;
  title: string;
  subtitle: string;
  deliverablesLabel: string;
  impactLabel: string;
  ctaLabel: string;
  items: Record<ServiceId, ServiceCopyItem>;
}

export interface CertificationShared {
  id: CertificationId;
  slug: string;
  issuer: string;
  year: string;
  focus: "admin" | "tech" | "both";
  credentialId?: string;
}

export interface CertificationCopyItem {
  id: CertificationId;
  title: string;
  summary: string;
  competencies: readonly string[];
}

export interface CertificationsSectionCopy {
  eyebrow: string;
  title: string;
  subtitle: string;
  issuerLabel: string;
  yearLabel: string;
  viewDetailLabel: string;
  viewAllLabel: string;
  items: Record<CertificationId, CertificationCopyItem>;
}

export interface TestimonialShared {
  id: TestimonialId;
  name: string;
  date: string;
  source: "linkedin" | "collaboration" | "academic";
  kind: "supervisor" | "teammate" | "academic";
}

export interface TestimonialCopyItem {
  id: TestimonialId;
  role: string;
  organization: string;
  relationship: string;
  highlight: string;
  quote: string;
}

export interface TestimonialsSectionCopy {
  eyebrow: string;
  title: string;
  subtitle: string;
  prevLabel: string;
  nextLabel: string;
  statsLabels: {
    total: string;
    collaboration: string;
    academic: string;
  };
  items: Record<TestimonialId, TestimonialCopyItem>;
}

export interface ResumeSharedVariant {
  id: ResumeVariantId;
  pdfPath: string;
  previewPath: string;
  driveUrl: string;
  fileName: string;
}

export interface ResumeVariantCopy {
  id: ResumeVariantId;
  label: string;
  badge: string;
  description: string;
  highlights: readonly string[];
  previewAlt: string;
}

export interface ResumeSectionCopy {
  eyebrow: string;
  title: string;
  subtitle: string;
  downloadLocalCta: string;
  viewDriveCta: string;
  recommendedLabel: string;
  variants: Record<ResumeVariantId, ResumeVariantCopy>;
}

export interface MetricItemCopy {
  label: string;
  value: string;
  detail: string;
}

export interface MetricGroupCopy {
  id: MetricGroupId;
  title: string;
  subtitle: string;
  items: readonly MetricItemCopy[];
}

export interface MetricsSectionCopy {
  eyebrow: string;
  title: string;
  subtitle: string;
  groups: Record<MetricGroupId, MetricGroupCopy>;
}

export interface ContactSectionCopy {
  eyebrow: string;
  title: string;
  subtitle: string;
  connectTitle: string;
  connectDescription: string;
  cards: {
    locationLabel: string;
    locationValue: string;
    phoneLabel: string;
    emailLabel: string;
    linkedinLabel: string;
    githubLabel: string;
  };
  form: {
    nameLabel: string;
    namePlaceholder: string;
    emailLabel: string;
    emailPlaceholder: string;
    subjectLabel: string;
    subjectPlaceholder: string;
    messageLabel: string;
    messagePlaceholder: string;
    sendWhatsapp: string;
    sendEmail: string;
    clear: string;
    validationError: string;
    readyNotice: string;
  };
}

export interface UiCopy {
  skipToContent: string;
  navAriaLabel: string;
  brandTitle: string;
  roleSwitcherLabel: string;
  languageSwitcherLabel: string;
  lockedNotice: string;
  navItems: Record<SectionId, string>;
  roleLabels: Record<RoleId, { short: string; full: string; description: string }>;
  footer: {
    tagline: string;
    navigationTitle: string;
    rolesTitle: string;
    resourcesTitle: string;
    projectsIndexLabel: string;
    experienceIndexLabel: string;
    educationIndexLabel: string;
    certificationsIndexLabel: string;
    rights: string;
    builtWith: string;
    updatedLabel: string;
  };
  whatsappFloatLabel: string;
  backToTopLabel: string;
  mobileMenuOpen: string;
  mobileMenuClose: string;
}

export interface SeoRouteCopy {
  title: string;
  description: string;
  ogTitle: string;
  ogDescription: string;
  keywords: readonly string[];
}

export interface SeoCopy {
  personJobTitle: readonly string[];
  personDescription: string;
  siteName: string;
  home: Record<RoleId, SeoRouteCopy>;
  projectsIndex: SeoRouteCopy;
}

export interface LanguageCopy {
  lang: Lang;
  htmlLang: string;
  locale: string;
  ui: UiCopy;
  seo: SeoCopy;
  hero: Record<RoleId, HeroRoleCopy>;
  highlights: Record<RoleId, readonly HighlightCard[]>;
  about: AboutCopy;
  education: Record<EducationId, EducationCopyItem>;
  experience: ExperienceSectionCopy;
  projects: ProjectsSectionCopy;
  skills: SkillsSectionCopy;
  services: ServicesSectionCopy;
  certifications: CertificationsSectionCopy;
  testimonials: TestimonialsSectionCopy;
  resume: ResumeSectionCopy;
  metrics: MetricsSectionCopy;
  contact: ContactSectionCopy;
}
