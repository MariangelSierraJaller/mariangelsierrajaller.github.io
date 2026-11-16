declare const __SITE_URL__: string | undefined;
declare const __BUILD_DATE__: string | undefined;
declare const __APP_VERSION__: string | undefined;

export const SITE_URL: string = (
  typeof __SITE_URL__ !== "undefined"
    ? __SITE_URL__
    : "https://mariangelsierrajaller.github.io"
).replace(/\/+$/, "");

export const BUILD_DATE: string =
  typeof __BUILD_DATE__ !== "undefined"
    ? __BUILD_DATE__
    : new Date().toISOString().slice(0, 10);

export const APP_VERSION: string =
  typeof __APP_VERSION__ !== "undefined" ? __APP_VERSION__ : "2.0.0";

const rawBase =
  typeof import.meta !== "undefined" && import.meta.env && import.meta.env.BASE_URL
    ? import.meta.env.BASE_URL
    : "/";

export const BASE_PATH: string = rawBase.endsWith("/") ? rawBase : `${rawBase}/`;

export function withBase(path: string): string {
  if (!path) return BASE_PATH === "/" ? "/" : BASE_PATH.slice(0, -1);
  if (/^(https?:|mailto:|tel:|#)/.test(path)) return path;
  const clean = path.startsWith("/") ? path.slice(1) : path;
  if (BASE_PATH === "/") {
    return clean ? `/${clean}` : "/";
  }
  return clean ? `${BASE_PATH}${clean}` : BASE_PATH.slice(0, -1);
}

export function stripBase(pathname: string): string {
  const clean = pathname || "/";
  if (BASE_PATH !== "/" && clean.startsWith(BASE_PATH.slice(0, -1))) {
    const rest = clean.slice(BASE_PATH.length - 1);
    return rest || "/";
  }
  return clean;
}

export function absoluteUrl(path: string): string {
  if (/^https?:\/\//.test(path)) return path;
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${normalized === "/" ? "/" : normalized.replace(/\/+$/, "")}`;
}
