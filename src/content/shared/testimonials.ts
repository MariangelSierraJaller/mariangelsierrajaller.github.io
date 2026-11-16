import type { TestimonialId, TestimonialShared } from "@/types/content";

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
    date: "2024",
    source: "collaboration",
    kind: "supervisor",
  },
  aspaenTreasury: {
    id: "aspaenTreasury",
    name: "Área Administrativa y Tesorería — ASPAEN",
    date: "2024",
    source: "collaboration",
    kind: "supervisor",
  },
  sanJoseEngineering: {
    id: "sanJoseEngineering",
    name: "Núcleo de Ingeniería y Analítica — Universidad San José",
    date: "2025",
    source: "academic",
    kind: "academic",
  },
  itmBioengineering: {
    id: "itmBioengineering",
    name: "Línea de Bioingeniería y Software Clínico — ITM",
    date: "2025",
    source: "academic",
    kind: "academic",
  },
};
