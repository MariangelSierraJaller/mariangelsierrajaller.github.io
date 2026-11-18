import type { Lang, TestimonialId, TestimonialShared } from "@/types/content";

export const TESTIMONIAL_ORDER: readonly TestimonialId[] = [
  "sebastianLopez",
  "aspaenProcurement",
  "aspaenTreasury",
  "sanJoseEngineering",
  "itmBioengineering",
];

export const TESTIMONIALS_SHARED: Record<TestimonialId, TestimonialShared> = {
  sebastianLopez: {
    id: "sebastianLopez",
    name: "Sebastián López Osorno",
    date: "2025",
    source: "linkedin",
    kind: "teammate",
  },
  aspaenProcurement: {
    id: "aspaenProcurement",
    name: "Gestión de Compras y Abastecimiento — ASPAEN",
    nameByLang: {
      es: "Gestión de Compras y Abastecimiento — ASPAEN",
      en: "Procurement & Supply Management — ASPAEN",
    },
    date: "2024",
    source: "collaboration",
    kind: "supervisor",
  },
  aspaenTreasury: {
    id: "aspaenTreasury",
    name: "Área Administrativa y Tesorería — ASPAEN",
    nameByLang: {
      es: "Área Administrativa y Tesorería — ASPAEN",
      en: "Administration & Treasury Division — ASPAEN",
    },
    date: "2024",
    source: "collaboration",
    kind: "supervisor",
  },
  sanJoseEngineering: {
    id: "sanJoseEngineering",
    name: "Núcleo de Ingeniería y Analítica — Universidad San José",
    nameByLang: {
      es: "Núcleo de Ingeniería y Analítica — Universidad San José",
      en: "Engineering & Analytics Committee — San José University",
    },
    date: "2025",
    source: "academic",
    kind: "academic",
  },
  itmBioengineering: {
    id: "itmBioengineering",
    name: "Línea de Bioingeniería y Software Clínico — ITM",
    nameByLang: {
      es: "Línea de Bioingeniería y Software Clínico — ITM",
      en: "Bioengineering & Clinical Software Track — ITM",
    },
    date: "2025",
    source: "academic",
    kind: "academic",
  },
};

export function getTestimonialName(id: TestimonialId, lang: Lang): string {
  const item = TESTIMONIALS_SHARED[id];
  return item.nameByLang?.[lang] ?? item.name;
}
