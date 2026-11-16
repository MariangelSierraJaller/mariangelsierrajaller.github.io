import { Show, type Component } from "solid-js";
import type { DetailCollection } from "@/types/content";
import { DetailIndexView, DetailItemView } from "@/views/DetailPages";

export const DetailBodyPart: Component<{
  collection?: DetailCollection;
  slug?: string;
}> = (props) => (
  <Show
    when={props.slug}
    fallback={<DetailIndexView collection={props.collection ?? "experience"} />}
  >
    {(slug) => (
      <DetailItemView collection={props.collection ?? "experience"} slug={slug()} />
    )}
  </Show>
);
