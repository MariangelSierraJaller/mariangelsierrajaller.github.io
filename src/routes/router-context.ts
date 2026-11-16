import { createContext, useContext, type Accessor } from "solid-js";
import type { ParsedRoute } from "@/lib/paths";

export interface RouterContextValue {
  pathname: Accessor<string>;
  search: Accessor<string>;
  route: Accessor<ParsedRoute>;
  navigate: (to: string) => void;
}

export const RouterContext = createContext<RouterContextValue>();

export function useRouter(): RouterContextValue {
  const ctx = useContext(RouterContext);
  if (!ctx) {
    throw new Error("useRouter must be used within PageRouter");
  }
  return ctx;
}
