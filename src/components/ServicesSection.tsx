import { AnimatePresence, motion } from "framer-motion";
import {
  BarChart3,
  Boxes,
  Brain,
  Briefcase,
  Cog,
  Database,
  FileSpreadsheet,
  Network,
  ShieldCheck,
  ShoppingCart,
  Wallet,
  Workflow,
} from "lucide-react";
import { useLang } from "@/context/language-core";
import { useProfile } from "@/context/profile-core";
import SectionHeader from "@/components/SectionHeader";

interface Item {
  title: string;
  desc: string;
  tags: string[];
}

const iconsByProfile = {
  admin: [ShoppingCart, Wallet, ShieldCheck, Workflow, FileSpreadsheet],
  tech: [Database, BarChart3, Boxes, Network, Brain],
} as const;

export default function ServicesSection() {
  const { t } = useLang();
  const { profile } = useProfile();
  const items = t<Item[]>(`services.${profile}.items`);
  const label = t<string>(`services.${profile}.label`);
  const icons = iconsByProfile[profile] ?? [Briefcase, Cog, BarChart3, Workflow];

  return (
    <section id="services" className="border-t border-border/60 scroll-mt-32">
      <div className="mx-auto max-w-6xl px-6 py-24">
        <SectionHeader kicker={t<string>("services.kicker")} title={t<string>("services.title")} />
        <p className="mt-4 max-w-2xl text-sm text-muted-foreground sm:text-base">
          {t<string>("services.lead")}
        </p>

        <div
          className="mt-6 inline-flex items-center gap-2 rounded-full border border-border bg-secondary/40 px-3 py-1.5 text-xs uppercase tracking-[0.2em] text-muted-foreground">
          <span className="h-1.5 w-1.5 rounded-full bg-primary" />
          {label}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={profile}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35 }}
            className="mt-8 grid gap-5 sm:grid-cols-2"
          >
            {items.map((it, i) => {
              const Icon = icons[i % icons.length];
              return (
                <motion.article
                  key={it.title}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  className="group relative overflow-hidden rounded-2xl border border-border bg-card/60 p-6 transition-colors hover:border-primary/40"
                >
                  <div
                    className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-primary/10 blur-3xl transition-opacity group-hover:bg-primary/20" />
                  <span
                    className="grid h-11 w-11 place-items-center rounded-2xl border border-border bg-secondary/60 text-primary">
                    <Icon size={18} />
                  </span>
                  <h3 className="mt-5 font-display text-xl text-foreground">{it.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{it.desc}</p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {it.tags.map((tg) => (
                      <span key={tg} className="tech-badge">{tg}</span>
                    ))}
                  </div>
                </motion.article>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
