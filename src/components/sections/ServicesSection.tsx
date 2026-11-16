import { For, type Component } from "solid-js";
import { SERVICE_IDS, type ServiceId } from "@/types/content";
import { useLanguage } from "@/context/language";
import { Section } from "@/components/layout/Section";
import { TechList } from "@/components/ui/TechList";
import {
  ArrowRightIcon,
  BarChartIcon,
  CheckIcon,
  CpuIcon,
  DatabaseIcon,
  ShieldCheckIcon,
} from "@/components/ui/icons";

const SERVICE_ICONS: Record<ServiceId, Component<{ size?: number }>> = {
  erpOperations: DatabaseIcon,
  financialControl: ShieldCheckIcon,
  biDashboards: BarChartIcon,
  processAutomation: CpuIcon,
};

export const ServicesSection: Component = () => {
  const { lang, copy } = useLanguage();
  const svcCopy = () => copy().services;

  const workflowSteps = () =>
    lang() === "es"
      ? [
          { step: "01", title: "Diagnóstico & Auditoría", detail: "Mapeo de flujos ERP, compras y control documental." },
          { step: "02", title: "Estandarización NetSuite", detail: "Catálogos maestros, trazabilidad y conciliaciones." },
          { step: "03", title: "Automatización ETL", detail: "Limpieza XML/JSON con Python, Pandas y SQL." },
          { step: "04", title: "Tableros Power BI", detail: "Modelo estrella DAX y KPIs financieros en tiempo real." },
        ]
      : [
          { step: "01", title: "Discovery & Audit", detail: "Mapping ERP workflows, procurement and document controls." },
          { step: "02", title: "NetSuite Standardization", detail: "Master catalogs, audit trail and reconciliations." },
          { step: "03", title: "ETL Automation", detail: "XML/JSON cleansing with Python, Pandas and SQL." },
          { step: "04", title: "Power BI Dashboards", detail: "DAX star schema and executive KPIs." },
        ];

  return (
    <Section
      id="services"
      eyebrow={svcCopy().eyebrow}
      title={svcCopy().title}
      subtitle={svcCopy().subtitle}
      surface="alt"
    >
      <div class="mb-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <For each={workflowSteps()}>
          {(wf) => (
            <div class="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
              <span class="font-mono text-xs font-semibold text-[var(--color-primary)]">
                {wf.step}
              </span>
              <h3 class="mt-1 font-display text-lg text-[var(--color-fg)]">{wf.title}</h3>
              <p class="mt-1 text-xs leading-relaxed text-[var(--color-fg-muted)]">{wf.detail}</p>
            </div>
          )}
        </For>
      </div>

      <div class="grid gap-6 md:grid-cols-2">
        <For each={SERVICE_IDS}>
          {(svcId) => {
            const item = () => svcCopy().items[svcId];
            const Icon = SERVICE_ICONS[svcId];
            return (
              <article class="flex flex-col justify-between rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg)]/90 p-6 hover-glow">
                <div>
                  <div class="flex items-start justify-between gap-4">
                    <span class="grid h-11 w-11 place-items-center rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-primary)]">
                      <Icon size={20} />
                    </span>
                    <span class="font-mono text-xs text-[var(--color-accent)]">
                      {item().tagline}
                    </span>
                  </div>

                  <h3 class="mt-5 font-display text-2xl text-[var(--color-fg)]">
                    {item().title}
                  </h3>
                  <p class="mt-2.5 text-sm leading-relaxed text-[var(--color-fg-muted)]">
                    {item().description}
                  </p>

                  <div class="mt-5 border-t border-[var(--color-border)] pt-4">
                    <p class="font-mono text-xs uppercase tracking-wider text-[var(--color-accent)]">
                      {svcCopy().deliverablesLabel}
                    </p>
                    <ul class="mt-2.5 space-y-1.5 text-sm text-[var(--color-fg-muted)]">
                      <For each={item().deliverables}>
                        {(del) => (
                          <li class="flex items-start gap-2">
                            <CheckIcon size={15} class="mt-1 shrink-0 text-[var(--color-success)]" />
                            <span>{del}</span>
                          </li>
                        )}
                      </For>
                    </ul>
                  </div>

                  <div class="mt-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-3.5">
                    <span class="font-mono text-[11px] uppercase tracking-wider text-[var(--color-accent)]">
                      {svcCopy().impactLabel}:{" "}
                    </span>
                    <span class="text-xs font-medium text-[var(--color-fg)]">
                      {item().impact}
                    </span>
                  </div>
                </div>

                <div class="mt-5 space-y-4">
                  <TechList items={item().tags} />
                  <a
                    href="#contact"
                    class="inline-flex items-center gap-1.5 font-mono text-xs font-medium text-[var(--color-primary)] hover:text-[var(--color-primary-hover)]"
                  >
                    <span>{svcCopy().ctaLabel}</span>
                    <ArrowRightIcon size={13} />
                  </a>
                </div>
              </article>
            );
          }}
        </For>
      </div>
    </Section>
  );
};
