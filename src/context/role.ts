import { createContext, useContext, type Accessor } from "solid-js";
import type { RoleConfig, RoleId } from "@/types/content";

export interface RoleContextValue {
  role: Accessor<RoleId>;
  config: Accessor<RoleConfig>;
  locked: Accessor<boolean>;
}

export const RoleContext = createContext<RoleContextValue>();

export function useRole(): RoleContextValue {
  const ctx = useContext(RoleContext);
  if (!ctx) {
    throw new Error("useRole must be used within RoleProvider");
  }
  return ctx;
}
