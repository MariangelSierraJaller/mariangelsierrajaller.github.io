import type { DetailCollection } from "@/types/content";
import type { DetailLinkItem } from "@/types/detail";
import { EXPERIENCE_ORDER, EXPERIENCE_SHARED } from "./experience";
import { EDUCATION_ORDER, EDUCATION_SHARED } from "./education";
import { CERTIFICATION_ORDER, CERTIFICATIONS_SHARED } from "./certifications";

export const DETAIL_LINKS: Record<DetailCollection, readonly DetailLinkItem[]> = {
  experience: EXPERIENCE_ORDER.map((id) => ({
    collection: "experience" as const,
    slug: EXPERIENCE_SHARED[id].slug,
    id,
  })),
  education: EDUCATION_ORDER.map((id) => ({
    collection: "education" as const,
    slug: EDUCATION_SHARED[id].slug,
    id,
  })),
  certifications: CERTIFICATION_ORDER.map((id) => ({
    collection: "certifications" as const,
    slug: CERTIFICATIONS_SHARED[id].slug,
    id,
  })),
};

export function findDetailLink(
  collection: DetailCollection,
  slug: string,
): DetailLinkItem | undefined {
  return DETAIL_LINKS[collection].find((item) => item.slug === slug);
}
