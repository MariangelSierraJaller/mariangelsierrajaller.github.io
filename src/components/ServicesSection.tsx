import { motion } from "framer-motion";
import { Briefcase, Cog, BarChart3, Workflow } from "lucide-react";
import { useLang } from "@/context/LanguageContext";
import SectionHeader from "@/components/SectionHeader";

interface Item {
  title: string;
  desc: string;
  tags: string[];
}

const icons = [Briefcase, Cog, BarChart3, Workflow];

export default function ServicesSection() {
  const { t } = useLang();
  const items = t<Item[]>("services.items");

  return (
    <section id="services" className="border-t border-border/60 scroll-mt-32">
      <div className="mx-auto max-w-6xl px-6 py-24">
        <SectionHeader kicker={t<string>("services.kicker")} title={t<string>("services.title")} />
        <p className="mt-4 max-w-2xl text-sm text-muted-foreground sm:text-base">
          {t<string>("services.lead")}
        </p>

        <div className="mt-12 grid gap-5 sm:grid-cols-2">
          {items.map((it, i) => {
            const Icon = icons[i % icons.length];
            return (
              <motion.article
                key={it.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.45, delay: i * 0.05 }}
                className="group relative overflow-hidden rounded-2xl border border-border bg-card/60 p-6 transition-colors hover:border-primary/40"
              >
                <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-primary/10 blur-3xl transition-opacity group-hover:bg-primary/20" />
                <span className="grid h-11 w-11 place-items-center rounded-2xl border border-border bg-secondary/60 text-primary">
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
        </div>
      </div>
    </section>
  );
}
