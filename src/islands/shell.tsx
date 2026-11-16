import { onMount, type ParentComponent } from "solid-js";
import type { Lang, RoleId } from "@/types/content";
import { LanguageProvider } from "@/context/LanguageProvider";
import { RoleProvider } from "@/context/RoleProvider";
import { PageRouter } from "@/routes/Router";
import { markIslandReady } from "@/lib/ready";

export interface IslandShellProps {
  part: string;
  lang: Lang;
  role: RoleId;
  pathname: string;
}

export const IslandShell: ParentComponent<IslandShellProps> = (props) => {
  onMount(() => {
    markIslandReady(props.part);
  });

  return (
    <PageRouter initialPath={props.pathname}>
      <LanguageProvider lang={props.lang}>
        <RoleProvider role={props.role}>{props.children}</RoleProvider>
      </LanguageProvider>
    </PageRouter>
  );
};
