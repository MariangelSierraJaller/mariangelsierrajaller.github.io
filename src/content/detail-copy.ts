import type { DetailCollection, Lang } from "@/types/content";
import type {
  DetailCollectionIndexCopy,
  DetailPageCopy,
  DetailUiCopy,
} from "@/types/detail";
import { DETAIL_LINKS } from "./shared/detail-links";
import {
  ES_DETAIL_INDEXES,
  ES_DETAIL_ITEMS,
  ES_DETAIL_UI,
} from "./detail-pages/es";
import {
  EN_DETAIL_INDEXES,
  EN_DETAIL_ITEMS,
  EN_DETAIL_UI,
} from "./detail-pages/en";

export function getDetailCollectionIndexCopy(
  lang: Lang,
  collection: DetailCollection,
): DetailCollectionIndexCopy {
  const indexes = lang === "es" ? ES_DETAIL_INDEXES : EN_DETAIL_INDEXES;
  return indexes[collection];
}

export function getDetailItemsForCollection(
  lang: Lang,
  collection: DetailCollection,
): readonly DetailPageCopy[] {
  const items = lang === "es" ? ES_DETAIL_ITEMS : EN_DETAIL_ITEMS;
  const links = DETAIL_LINKS[collection] ?? [];
  return links
    .map((link) => items[link.slug])
    .filter((item): item is DetailPageCopy => Boolean(item));
}

export function getDetailItemCopy(
  lang: Lang,
  collection: DetailCollection,
  slug: string,
): DetailPageCopy {
  const items = lang === "es" ? ES_DETAIL_ITEMS : EN_DETAIL_ITEMS;
  const item = items[slug];
  if (!item || item.collection !== collection) {
    const fallback = Object.values(items).find(
      (it) => it.collection === collection && it.slug === slug,
    );
    if (fallback) return fallback;
    throw new Error(
      `Detail page item not found for collection "${collection}", slug "${slug}", lang "${lang}".`,
    );
  }
  return item;
}

export function getDetailUiCopy(lang: Lang): DetailUiCopy {
  return lang === "es" ? ES_DETAIL_UI : EN_DETAIL_UI;
}
