export function buildPageDatesJson(routes: readonly string[], buildDate: string): string {
  const map: Record<string, string> = {
    "/": buildDate,
  };
  for (const r of routes) {
    map[`/${r}`] = buildDate;
  }
  return JSON.stringify(map, null, 2);
}
