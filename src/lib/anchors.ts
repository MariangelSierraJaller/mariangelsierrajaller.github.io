export function scrollToAnchor(id: string): void {
  if (typeof document === "undefined") return;
  const cleanId = id.replace(/^#/, "");
  const target = document.getElementById(cleanId);
  if (target) {
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}
