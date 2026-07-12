import { useEffect } from "react";
import { useLang } from "@/context/language-core";
import { useProfile } from "@/context/profile-core";

const BASE = "https://santino-essence.lovable.app";

const COPY = {
  es: {
    base: {
      title: "Mariangel Sierra Jaller — Ingeniera Industrial & Analista de Datos",
      desc: "Portafolio bilingüe de Mariangel Sierra Jaller: ingeniera industrial, analista de datos y coordinadora administrativa. Experiencia dual en operaciones y tecnología.",
    },
    admin: {
      title: "Mariangel Sierra Jaller — Perfil Administrativo & Operaciones",
      desc: "Coordinadora administrativa con experiencia en gestión operativa, control de procesos y liderazgo de equipos.",
    },
    tech: {
      title: "Mariangel Sierra Jaller — Perfil Técnico: Data & Automatización",
      desc: "Analista de datos e ingeniera industrial: Power BI, Python, Pandas y automatización de procesos.",
    },
  },
  en: {
    base: {
      title: "Mariangel Sierra Jaller — Industrial Engineer & Data Analyst",
      desc: "Bilingual portfolio of Mariangel Sierra Jaller: industrial engineer, data analyst and administrative coordinator with dual expertise in operations and technology.",
    },
    admin: {
      title: "Mariangel Sierra Jaller — Administrative & Operations Profile",
      desc: "Administrative coordinator with experience in operations management, process control and team leadership.",
    },
    tech: {
      title: "Mariangel Sierra Jaller — Tech Profile: Data & Automation",
      desc: "Data analyst and industrial engineer: Power BI, Python, Pandas and process automation.",
    },
  },
} as const;

function setMeta(selector: string, attr: "content", value: string) {
  const el = document.head.querySelector<HTMLMetaElement>(selector);
  if (el) el.setAttribute(attr, value);
}

function setLink(rel: string, href: string) {
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

export default function HeadUpdater() {
  const { lang } = useLang();
  const { profile } = useProfile();

  useEffect(() => {
    const key = (profile ?? "base") as "base" | "admin" | "tech";
    const c = COPY[lang][key] ?? COPY[lang].base;
    const url = `${BASE}/${lang}${profile ? `/${profile}` : ""}`;

    document.documentElement.setAttribute("lang", lang);
    document.title = c.title;

    setMeta("meta[name=\"description\"]", "content", c.desc);
    setMeta("meta[property=\"og:title\"]", "content", c.title);
    setMeta("meta[property=\"og:description\"]", "content", c.desc);
    setMeta("meta[property=\"og:url\"]", "content", url);
    setMeta("meta[name=\"twitter:title\"]", "content", c.title);
    setMeta("meta[name=\"twitter:description\"]", "content", c.desc);

    setLink("canonical", url);
  }, [lang, profile]);

  return null;
}
