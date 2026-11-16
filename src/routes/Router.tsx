import { createMemo, createSignal, onMount, type ParentComponent } from "solid-js";
import { parseRoute } from "@/lib/paths";
import { RouterContext } from "./router-context";

export interface PageRouterProps {
  initialPath: string;
  initialSearch?: string;
}

export const PageRouter: ParentComponent<PageRouterProps> = (props) => {
  const [pathname, setPathname] = createSignal(props.initialPath);
  const [search, setSearch] = createSignal(props.initialSearch ?? "");

  onMount(() => {
    if (typeof window !== "undefined") {
      setPathname(window.location.pathname);
      setSearch(window.location.search);
    }
  });

  const route = createMemo(() => parseRoute(pathname(), search()));

  const navigate = (to: string) => {
    if (typeof window !== "undefined") {
      window.location.assign(to);
    }
  };

  return (
    <RouterContext.Provider value={{ pathname, search, route, navigate }}>
      {props.children}
    </RouterContext.Provider>
  );
};
