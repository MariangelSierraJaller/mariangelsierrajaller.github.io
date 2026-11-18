import { cleanup, fireEvent, render } from "@solidjs/testing-library";
import { afterEach, describe, expect, it } from "vitest";
import { IslandShell } from "@/islands/shell";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { HeroSection } from "@/components/sections/HeroSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { ExperienceSection } from "@/components/sections/ExperienceSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { JourneySection } from "@/components/sections/JourneySection";
import { SkillsSection } from "@/components/sections/SkillsSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { CertificationsSection } from "@/components/sections/CertificationsSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { ResumeSection } from "@/components/sections/ResumeSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { AssistantLauncher } from "@/components/assistant/AssistantLauncher";
import { ProjectDetailView } from "@/views/ProjectPages";
import type { Lang, RoleId } from "@/types/content";

afterEach(() => {
  cleanup();
});

const SPANISH_LEAK_WORDS = [
  "Presente",
  "Excel Avanzado",
  "Tesorería",
  "Facturación Electrónica",
  "Ruta de Analítica",
  "Especialización BI",
  "Operación & Integración",
  "Automatización de Datos",
  "Control Financiero & Modelado",
  "Metodologías Ágiles",
  "Gestión de Compras",
  "Área Administrativa y Tesorería",
  "Núcleo de Ingeniería",
  "Línea de Bioingeniería",
  "Arquitectura de Datos",
];

describe("UX/UI visual layout, overlap, menu, and language integrity", () => {
  it("renders single-line nav items without wrapping and switches languages cleanly across roles", () => {
    const roles: readonly RoleId[] = ["general", "admin", "tech"];
    const langs: readonly Lang[] = ["es", "en"];

    for (const lang of langs) {
      for (const role of roles) {
        const pathname = role === "general" ? `/${lang}` : `/${lang}/${role}`;
        window.history.replaceState(null, "", pathname);
        const { container, unmount } = render(() => (
          <IslandShell part="header" lang={lang} role={role} pathname={pathname}>
            <SiteHeader />
          </IslandShell>
        ));

        const navLinks = container.querySelectorAll("header nav a");
        expect(navLinks.length).toBeGreaterThanOrEqual(6);
        for (const link of navLinks) {
          expect(link.className).toContain("whitespace-nowrap");
        }

        const brand = container.querySelector("header a");
        expect(brand?.className).toContain("whitespace-nowrap");

        if (lang === "es") {
          expect(container.textContent).not.toContain("Línea de tiempo");
        }

        const switchTarget = lang === "es" ? "en" : "es";
        const expectedHref =
          role === "general" ? `/${switchTarget}` : `/${switchTarget}/${role}`;
        const langAnchor = container.querySelector(
          `a[href="${expectedHref}"]`,
        ) as HTMLAnchorElement | null;
        expect(langAnchor).not.toBeNull();

        unmount();
      }
    }

    // Also verify subpage language switching preserves ?from= and ?locked=true
    window.history.replaceState(
      null,
      "",
      "/es/projects/pipeline-etl-oracle-netsuite-bi?from=tech&locked=true",
    );
    const { container: subContainer, unmount: subUnmount } = render(() => (
      <IslandShell
        part="header"
        lang="es"
        role="tech"
        pathname="/es/projects/pipeline-etl-oracle-netsuite-bi"
      >
        <SiteHeader />
      </IslandShell>
    ));
    const subEnAnchor = subContainer.querySelector(
      'a[href="/en/projects/pipeline-etl-oracle-netsuite-bi?from=tech&locked=true"]',
    );
    expect(subEnAnchor).not.toBeNull();
    subUnmount();
    window.history.replaceState(null, "", "/");
  });

  it("opens mobile menu and closes on Escape while restoring focus to the toggle button", () => {
    const { getByRole, container } = render(() => (
      <IslandShell part="header" lang="es" role="general" pathname="/es">
        <SiteHeader />
      </IslandShell>
    ));

    const toggle = getByRole("button", { name: /abrir menú/i });
    fireEvent.click(toggle);
    expect(container.querySelector("#mobile-nav-drawer")).not.toBeNull();

    fireEvent.keyDown(window, { key: "Escape" });
    expect(container.querySelector("#mobile-nav-drawer")).toBeNull();
    expect(document.activeElement).toBe(toggle);
  });

  it("aligns Hero CTA labels with their hash destinations and localizes stack pills", () => {
    for (const role of ["general", "admin", "tech"] as const) {
      const { container, unmount } = render(() => (
        <IslandShell
          part="hero"
          lang="es"
          role={role}
          pathname={role === "general" ? "/es" : `/es/${role}`}
        >
          <HeroSection />
        </IslandShell>
      ));

      const projectsCta = container.querySelector('a[href="#projects"]');
      const resumeCta = container.querySelector('a[href="#resume"]');
      const contactCta = container.querySelector('a[href="#contact"]');

      expect(projectsCta?.textContent?.toLowerCase()).not.toContain("contáctame");
      expect(projectsCta?.textContent?.toLowerCase()).not.toContain("conversación");
      expect(resumeCta?.textContent?.toLowerCase()).toMatch(/currículum|cv/);
      expect(contactCta?.textContent?.toLowerCase()).toMatch(/contáctame|conversación/);
      expect(container.querySelector(".hex-frame")).not.toBeNull();
      // Credential pills should not be absolutely positioned over the portrait ring
      expect(container.querySelectorAll('[class*="-top-2"][class*="right-0"]').length).toBe(0);
      unmount();
    }

    for (const role of ["general", "admin", "tech"] as const) {
      const { container, unmount } = render(() => (
        <IslandShell
          part="hero"
          lang="en"
          role={role}
          pathname={role === "general" ? "/en" : `/en/${role}`}
        >
          <HeroSection />
        </IslandShell>
      ));

      const text = container.textContent ?? "";
      for (const word of SPANISH_LEAK_WORDS) {
        expect(text).not.toContain(word);
      }
      unmount();
    }
  });

  it("positions all 25 Journey transit stations at unique coordinates without overlapping labels", () => {
    for (const lang of ["es", "en"] as const) {
      const { container, getByRole, unmount } = render(() => (
        <IslandShell part="section:journey" lang={lang} role="general" pathname={`/${lang}`}>
          <JourneySection />
        </IslandShell>
      ));

      const stationButtons = Array.from(
        container.querySelectorAll('svg g[role="button"]'),
      );
      expect(stationButtons.length).toBe(25);

      const coords = stationButtons.map((g) => {
        const hitCircle = g.querySelector('circle[fill="transparent"]');
        const cx = hitCircle?.getAttribute("cx");
        const cy = hitCircle?.getAttribute("cy");
        return `${cx},${cy}`;
      });
      expect(new Set(coords).size).toBe(25);

      // Only 1 callout pill rect should be rendered in the transit SVG (no 25 overlapping labels)
      const mapSvg = container.querySelector('#journey-panel-map svg');
      expect(mapSvg?.querySelectorAll("rect").length).toBe(1);

      // Keyboard selection on station node updates the detail card
      const secondStation = stationButtons[1];
      fireEvent.keyDown(secondStation, { key: "Enter" });
      expect(secondStation.getAttribute("aria-pressed")).toBe("true");

      // Keyboard navigation across tabs switches to Focus radar cleanly
      const mapTab = getByRole("tab", { name: lang === "es" ? /tránsito/i : /transit/i });
      fireEvent.keyDown(mapTab, { key: "ArrowRight" });
      fireEvent.keyDown(document.activeElement as HTMLElement, { key: "ArrowRight" });

      const focusPanel = container.querySelector("#journey-panel-focus");
      expect(focusPanel).not.toBeNull();
      const radarSvg = focusPanel?.querySelector("svg");
      expect(radarSvg?.getAttribute("viewBox")).toBe("0 0 480 370");

      unmount();
    }
  });

  it("renders zero Spanish leakage on English sections and avoids duplicate testimonial numbers", () => {
    const { container } = render(() => (
      <IslandShell part="section:projects" lang="en" role="general" pathname="/en">
        <AboutSection />
        <ExperienceSection />
        <ProjectsSection />
        <SkillsSection />
        <ServicesSection />
        <CertificationsSection />
        <TestimonialsSection />
        <ResumeSection />
        <ProjectDetailView projectId="treasuryAuditAutomation" />
      </IslandShell>
    ));

    const text = container.textContent ?? "";
    for (const word of SPANISH_LEAK_WORDS) {
      expect(text).not.toContain(word);
    }

    expect(text).not.toContain("5 Verified Endorsements");
    expect(text).not.toContain("3 Professional & Operational");
    expect(text).not.toContain("2 Academic & Engineering");
    expect(container.querySelector("#education")?.className).toContain("scroll-mt-24");

    // Verify Education filter toggles render 7 -> 4 -> 3 cards with balanced column spans
    const eduSection = container.querySelector("#education")!;
    expect(eduSection.querySelectorAll("article").length).toBe(7);
    const engBtn = Array.from(eduSection.querySelectorAll("button")).find((b) =>
      b.textContent?.includes("Engineering & Tech"),
    )!;
    fireEvent.click(engBtn);
    expect(eduSection.querySelectorAll("article").length).toBe(4);
    const techBtn = Array.from(eduSection.querySelectorAll("button")).find((b) =>
      b.textContent?.includes("Technical Foundations"),
    )!;
    fireEvent.click(techBtn);
    expect(eduSection.querySelectorAll("article").length).toBe(3);

    // Verify Testimonials Carousel switches to page 2 (2 items, 2-col layout without 3-col orphan)
    const testSection = container.querySelector("#testimonials")!;
    const nextBtn = testSection.querySelector('button[aria-label*="Next"]')!;
    fireEvent.click(nextBtn);
    expect(testSection.querySelectorAll("figure").length).toBe(2);
    const carouselGrid = testSection.querySelector("figure")?.parentElement;
    expect(carouselGrid?.className).not.toContain("lg:grid-cols-3");
  });

  it("resolves Assistant links without double language prefixes and restores focus on Escape", () => {
    const { getByRole, container } = render(() => (
      <IslandShell part="assistant" lang="es" role="general" pathname="/es">
        <AssistantLauncher />
      </IslandShell>
    ));

    const launcher = getByRole("button", { name: /asistente/i });
    fireEvent.click(launcher);

    const dialog = getByRole("dialog");
    expect(dialog).toHaveAttribute("aria-modal", "true");

    const input = container.querySelector("aside input") as HTMLInputElement | null;
    expect(input?.className).toContain("text-base");

    const adminTopic = getByRole("button", { name: /administrativo y financiero/i });
    fireEvent.click(adminTopic);

    const links = Array.from(dialog.querySelectorAll("a[href]")).map((a) =>
      a.getAttribute("href"),
    );
    expect(links).toContain("/es/admin");
    expect(links).toContain("/es/projects/control-compras-inventarios-erp");
    for (const href of links) {
      expect(href).not.toContain("/es/es/");
      expect(href).not.toContain("/en/en/");
    }

    fireEvent.keyDown(window, { key: "Escape" });
    expect(container.querySelector('[role="dialog"]')).toBeNull();
    expect(document.activeElement).toBe(launcher);
  });

  it("ensures Contact inputs use >=16px mobile text, visible focus outlines, and Footer reserves bottom clearance", () => {
    const { container } = render(() => (
      <IslandShell part="section:contact" lang="en" role="general" pathname="/en">
        <ContactSection />
        <SiteFooter />
      </IslandShell>
    ));

    const inputs = container.querySelectorAll("form input, form textarea");
    expect(inputs.length).toBe(4);
    for (const field of inputs) {
      expect(field.className).toContain("text-base");
      expect(field.className).not.toContain("focus:outline-none");
    }

    const footer = container.querySelector("footer");
    expect(footer?.className).toContain("pb-24");
  });
});
