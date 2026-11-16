import type { ResumeSharedVariant, ResumeVariantId } from "@/types/content";

export const RESUME_VARIANTS: Record<ResumeVariantId, ResumeSharedVariant> = {
  admin: {
    id: "admin",
    pdfPath: "/cv/cv-mariangel-sierra-admin.pdf",
    previewPath: "/cv/previews/cv-mariangel-sierra-es-admin.webp",
    driveUrl: "https://drive.google.com/file/d/1rggK0scQvTxG71sDdzbv2ie9blgrIVgG/view",
    fileName: "cv-mariangel-sierra-admin.pdf",
  },
  tech: {
    id: "tech",
    pdfPath: "/cv/cv-mariangel-sierra-tech.pdf",
    previewPath: "/cv/previews/cv-mariangel-sierra-es-tech.webp",
    driveUrl: "https://drive.google.com/file/d/1OWA93tgQtcabkJYC8LISy9qShLIDgNk8/view",
    fileName: "cv-mariangel-sierra-tech.pdf",
  },
  ats: {
    id: "ats",
    pdfPath: "/cv/cv-mariangel-sierra-ats.pdf",
    previewPath: "/cv/previews/cv-mariangel-sierra-es-ats.webp",
    driveUrl: "https://drive.google.com/file/d/1bFPpW88swSBc-_rvbQDT7pS0a7f8yMe9/view",
    fileName: "cv-mariangel-sierra-ats.pdf",
  },
};

export function getResumeVariant(
  lang: "es" | "en",
  variant: ResumeVariantId,
): ResumeSharedVariant {
  const driveUrls: Record<"es" | "en", Record<ResumeVariantId, string>> = {
    es: {
      admin: "https://drive.google.com/file/d/1rggK0scQvTxG71sDdzbv2ie9blgrIVgG/view",
      tech: "https://drive.google.com/file/d/1OWA93tgQtcabkJYC8LISy9qShLIDgNk8/view",
      ats: "https://drive.google.com/file/d/1bFPpW88swSBc-_rvbQDT7pS0a7f8yMe9/view",
    },
    en: {
      admin: "https://drive.google.com/file/d/1qNzMq0GRtqNNOV--PGlnUBZ2hgbjerwh/view",
      tech: "https://drive.google.com/file/d/1CRGbx5PLlylBZ4iRKHlGb05ZCu6g-6Um/view",
      ats: "https://drive.google.com/file/d/1bFPpW88swSBc-_rvbQDT7pS0a7f8yMe9/view",
    },
  };

  return {
    id: variant,
    pdfPath: `/cv/cv-mariangel-sierra-${lang}-${variant}.pdf`,
    previewPath: `/cv/previews/cv-mariangel-sierra-${lang}-${variant}.webp`,
    driveUrl: driveUrls[lang][variant],
    fileName: `cv-mariangel-sierra-${lang}-${variant}.pdf`,
  };
}
