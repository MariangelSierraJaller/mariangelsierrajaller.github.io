import { createMemo, type Component } from "solid-js";
import { Dynamic } from "solid-js/web";
import type { SectionId } from "@/types/content";
import type { IslandProps } from "./parts";
import { registerPart, registeredPart, type IslandComponent } from "./registry";
import { IslandShell } from "./shell";

async function loadPartModule(part: IslandProps["part"]): Promise<IslandComponent> {
  const cached = registeredPart(part);
  if (cached) return cached;

  let loaded: IslandComponent;
  if (part.startsWith("section:")) {
    const id = part.slice("section:".length) as SectionId;
    const mod = await import("@/components/sections/section-loaders");
    loaded = await mod.SECTION_LOADERS[id]();
  } else {
    switch (part) {
      case "boot":
        loaded = (await import("./parts/boot")).BootIsland;
        break;
      case "skip":
        loaded = (await import("@/components/layout/SkipLink")).SkipLink;
        break;
      case "header":
        loaded = (await import("@/components/layout/SiteHeader")).SiteHeader;
        break;
      case "hero":
        loaded = (await import("@/components/sections/HeroSection")).HeroSection;
        break;
      case "highlights":
        loaded = (await import("@/components/sections/HighlightsStrip")).HighlightsStrip;
        break;
      case "footer":
        loaded = (await import("@/components/layout/SiteFooter")).SiteFooter;
        break;
      case "whatsapp":
        loaded = (await import("@/components/layout/WhatsAppButton")).WhatsAppButton;
        break;
      case "assistant":
        loaded = (await import("@/components/assistant/AssistantLauncher")).AssistantLauncher;
        break;
      case "projectsIndex":
      case "projectDetail":
        loaded = (await import("./parts/project-body")).ProjectBodyPart;
        break;
      case "detailIndex":
      case "detailItem":
        loaded = (await import("./parts/detail-body")).DetailBodyPart;
        break;
      case "notFound":
      default:
        loaded = (await import("@/views/NotFoundPage")).NotFoundPage;
        break;
    }
  }

  registerPart(part, loaded);
  return loaded;
}

if (import.meta.env.SSR) {
  const srv = await import("./server");
  srv.registerServerParts();
}

export interface PageIslandComponent extends Component<IslandProps> {
  preload?: (props: IslandProps) => Promise<void>;
}

export const PageIsland: PageIslandComponent = (props) => {
  const Resolved = createMemo(() => registeredPart(props.part));

  return (
    <IslandShell
      part={props.part}
      lang={props.lang}
      role={props.role}
      pathname={props.pathname}
    >
      <Dynamic
        component={Resolved()}
        projectId={props.projectId}
        collection={props.collection}
        slug={props.slug}
      />
    </IslandShell>
  );
};

PageIsland.preload = async (island: IslandProps) => {
  await loadPartModule(island.part);
};
