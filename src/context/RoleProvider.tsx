import { createMemo, createSignal, onMount, type ParentComponent } from "solid-js";
import type { RoleId } from "@/types/content";
import { getRoleConfig } from "@/content/roles";
import { isLockedSearch } from "@/lib/lock";
import { RoleContext } from "./role";

export interface RoleProviderProps {
  role: RoleId;
}

export const RoleProvider: ParentComponent<RoleProviderProps> = (props) => {
  const [locked, setLocked] = createSignal(false);

  onMount(() => {
    if (typeof window !== "undefined") {
      setLocked(isLockedSearch(window.location.search));
    }
  });

  const role = () => props.role;
  const config = createMemo(() => getRoleConfig(props.role));

  return (
    <RoleContext.Provider value={{ role, config, locked }}>
      {props.children}
    </RoleContext.Provider>
  );
};
