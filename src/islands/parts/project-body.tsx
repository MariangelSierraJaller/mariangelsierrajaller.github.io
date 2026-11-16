import { Show, type Component } from "solid-js";
import type { ProjectId } from "@/types/content";
import { ProjectDetailView, ProjectsIndexView } from "@/views/ProjectPages";

export const ProjectBodyPart: Component<{ projectId?: ProjectId }> = (props) => (
  <Show when={props.projectId} fallback={<ProjectsIndexView />}>
    {(id) => <ProjectDetailView projectId={id()} />}
  </Show>
);
