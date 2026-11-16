import { describe, expect, it } from "vitest";
import { getAllLanguageCopy } from "./index";
import { getAssistantKb } from "./assistant";
import { getProjectCopy, getProjectSummary } from "./project-copy";
import { getDetailCollectionIndexCopy, getDetailItemsForCollection } from "./detail-copy";
import { getJourneyCopy } from "./journey";
import { PROJECT_ORDER, PROJECTS_SHARED } from "./shared/projects";
import { EXPERIENCE_ORDER } from "./shared/experience";
import { EDUCATION_ORDER } from "./shared/education";
import { CERTIFICATION_ORDER } from "./shared/certifications";
import {
  DETAIL_COLLECTIONS,
  METRIC_GROUP_IDS,
  RESUME_VARIANT_IDS,
  ROLE_IDS,
  SERVICE_IDS,
  SKILL_GROUP_IDS,
  TESTIMONIAL_IDS,
} from "@/types/content";

describe("content bilingual parity and authenticity", () => {
  it("exports complete ES and EN language bundles with structural parity", () => {
    const all = getAllLanguageCopy();
    expect(Object.keys(all).sort()).toEqual(["en", "es"]);

    for (const role of ROLE_IDS) {
      expect(all.es.hero[role].headline.length).toBeGreaterThan(10);
      expect(all.en.hero[role].headline.length).toBeGreaterThan(10);
      expect(all.es.highlights[role].length).toBe(all.en.highlights[role].length);
      expect(all.es.highlights[role].length).toBeGreaterThan(0);
    }

    expect(Object.keys(all.es.education)).toEqual([...EDUCATION_ORDER]);
    expect(Object.keys(all.en.education)).toEqual([...EDUCATION_ORDER]);

    expect(Object.keys(all.es.experience.items)).toEqual([...EXPERIENCE_ORDER]);
    expect(Object.keys(all.en.experience.items)).toEqual([...EXPERIENCE_ORDER]);

    expect(Object.keys(all.es.certifications.items)).toEqual([...CERTIFICATION_ORDER]);
    expect(Object.keys(all.en.certifications.items)).toEqual([...CERTIFICATION_ORDER]);

    expect(Object.keys(all.es.skills.groups)).toEqual([...SKILL_GROUP_IDS]);
    expect(Object.keys(all.en.skills.groups)).toEqual([...SKILL_GROUP_IDS]);
    expect(Object.keys(all.es.skills.spokenLanguages).sort()).toEqual(["en", "es", "fr", "ko"]);
    expect(Object.keys(all.en.skills.spokenLanguages).sort()).toEqual(["en", "es", "fr", "ko"]);

    expect(Object.keys(all.es.services.items)).toEqual([...SERVICE_IDS]);
    expect(Object.keys(all.en.services.items)).toEqual([...SERVICE_IDS]);

    expect(Object.keys(all.es.testimonials.items)).toEqual([...TESTIMONIAL_IDS]);
    expect(Object.keys(all.en.testimonials.items)).toEqual([...TESTIMONIAL_IDS]);

    expect(Object.keys(all.es.resume.variants)).toEqual([...RESUME_VARIANT_IDS]);
    expect(Object.keys(all.en.resume.variants)).toEqual([...RESUME_VARIANT_IDS]);

    expect(Object.keys(all.es.metrics.groups)).toEqual([...METRIC_GROUP_IDS]);
    expect(Object.keys(all.en.metrics.groups)).toEqual([...METRIC_GROUP_IDS]);
  });

  it("provides bilingual project summaries and full detail/case study pages for all 6 projects", () => {
    expect(PROJECT_ORDER.length).toBe(6);

    for (const id of PROJECT_ORDER) {
      const esSummary = getProjectSummary("es", id);
      const enSummary = getProjectSummary("en", id);
      expect(esSummary.title.length).toBeGreaterThan(5);
      expect(enSummary.title.length).toBeGreaterThan(5);
      expect(esSummary.tags.length).toBe(enSummary.tags.length);

      const esDetail = getProjectCopy("es", id);
      const enDetail = getProjectCopy("en", id);
      expect(esDetail.id).toBe(id);
      expect(enDetail.id).toBe(id);
      expect(PROJECTS_SHARED[id].kind).toMatch(/case-study|project-page/);
    }
  });

  it("provides bilingual detail collections matching expected counts", () => {
    expect(EXPERIENCE_ORDER.length).toBe(2);
    expect(EDUCATION_ORDER.length).toBe(6);
    expect(CERTIFICATION_ORDER.length).toBe(6);

    for (const collection of DETAIL_COLLECTIONS) {
      const esIndex = getDetailCollectionIndexCopy("es", collection);
      const enIndex = getDetailCollectionIndexCopy("en", collection);
      expect(esIndex.title.length).toBeGreaterThan(3);
      expect(enIndex.title.length).toBeGreaterThan(3);

      const esItems = getDetailItemsForCollection("es", collection);
      const enItems = getDetailItemsForCollection("en", collection);
      expect(esItems.length).toBe(enItems.length);
      expect(esItems.map((i) => i.slug)).toEqual(enItems.map((i) => i.slug));
    }
  });

  it("provides 10 bilingual assistant topics and journey copy", () => {
    const esKb = getAssistantKb("es");
    const enKb = getAssistantKb("en");
    expect(esKb.topics.length).toBe(10);
    expect(enKb.topics.length).toBe(10);

    const esJourney = getJourneyCopy("es");
    const enJourney = getJourneyCopy("en");
    expect(esJourney.nodes.length).toBe(enJourney.nodes.length);
    expect(esJourney.horizonMilestones.length).toBe(enJourney.horizonMilestones.length);
    expect(esJourney.horizonMilestones.length).toBeGreaterThanOrEqual(4);
  });

  it("contains zero placeholder Lorem ipsum or legacy santino-essence domain references", () => {
    const all = getAllLanguageCopy();
    const corpus = JSON.stringify({
      all,
      esKb: getAssistantKb("es"),
      enKb: getAssistantKb("en"),
      esJourney: getJourneyCopy("es"),
      enJourney: getJourneyCopy("en"),
      projectsEs: PROJECT_ORDER.map((id) => getProjectCopy("es", id)),
      projectsEn: PROJECT_ORDER.map((id) => getProjectCopy("en", id)),
      detailsEs: DETAIL_COLLECTIONS.map((c) => getDetailItemsForCollection("es", c)),
      detailsEn: DETAIL_COLLECTIONS.map((c) => getDetailItemsForCollection("en", c)),
    });

    expect(corpus.toLowerCase()).not.toContain("lorem ipsum");
    expect(corpus.toLowerCase()).not.toContain("santino-essence");
  });
});
