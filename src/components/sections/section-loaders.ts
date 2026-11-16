import type { Component } from "solid-js";
import type { SectionId } from "@/types/content";

export const SECTION_LOADERS: Record<SectionId, () => Promise<Component>> = {
  about: () => import("./AboutSection").then((m) => m.AboutSection),
  experience: () => import("./ExperienceSection").then((m) => m.ExperienceSection),
  projects: () => import("./ProjectsSection").then((m) => m.ProjectsSection),
  journey: () => import("./JourneySection").then((m) => m.JourneySection),
  skills: () => import("./SkillsSection").then((m) => m.SkillsSection),
  services: () => import("./ServicesSection").then((m) => m.ServicesSection),
  certifications: () => import("./CertificationsSection").then((m) => m.CertificationsSection),
  testimonials: () => import("./TestimonialsSection").then((m) => m.TestimonialsSection),
  resume: () => import("./ResumeSection").then((m) => m.ResumeSection),
  metrics: () => import("./MetricsSection").then((m) => m.MetricsSection),
  contact: () => import("./ContactSection").then((m) => m.ContactSection),
};
