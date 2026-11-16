import type { SectionId } from "@/types/content";
import { registerPart, registerParts, type IslandComponent } from "./registry";
import { BootIsland } from "./parts/boot";
import { SkipLink } from "@/components/layout/SkipLink";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import { HeroSection } from "@/components/sections/HeroSection";
import { HighlightsStrip } from "@/components/sections/HighlightsStrip";
import { AboutSection } from "@/components/sections/AboutSection";
import { ExperienceSection } from "@/components/sections/ExperienceSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { JourneySection } from "@/components/sections/JourneySection";
import { SkillsSection } from "@/components/sections/SkillsSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { CertificationsSection } from "@/components/sections/CertificationsSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { ResumeSection } from "@/components/sections/ResumeSection";
import { MetricsSection } from "@/components/sections/MetricsSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { AssistantLauncher } from "@/components/assistant/AssistantLauncher";
import { ProjectBodyPart } from "./parts/project-body";
import { DetailBodyPart } from "./parts/detail-body";
import { NotFoundPage } from "@/views/NotFoundPage";

const SERVER_SECTIONS: Record<SectionId, IslandComponent> = {
  about: AboutSection,
  experience: ExperienceSection,
  projects: ProjectsSection,
  journey: JourneySection,
  skills: SkillsSection,
  services: ServicesSection,
  certifications: CertificationsSection,
  testimonials: TestimonialsSection,
  resume: ResumeSection,
  metrics: MetricsSection,
  contact: ContactSection,
};

let serverRegistered = false;

export function registerServerParts(): void {
  if (serverRegistered) return;
  serverRegistered = true;

  registerParts({
    boot: BootIsland,
    skip: SkipLink,
    header: SiteHeader,
    hero: HeroSection,
    highlights: HighlightsStrip,
    footer: SiteFooter,
    whatsapp: WhatsAppButton,
    assistant: AssistantLauncher,
    projectsIndex: ProjectBodyPart,
    projectDetail: ProjectBodyPart,
    detailIndex: DetailBodyPart,
    detailItem: DetailBodyPart,
    notFound: NotFoundPage,
  });

  for (const [id, comp] of Object.entries(SERVER_SECTIONS)) {
    registerPart(`section:${id}`, comp);
  }
}
