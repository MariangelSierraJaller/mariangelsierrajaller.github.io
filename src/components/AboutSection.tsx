import { AnimatePresence, motion } from "framer-motion";
import { BarChart3, Briefcase, Check, Cpu, GraduationCap, Languages, Sparkles } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useLang } from "@/context/LanguageContext";
import { useProfile } from "@/context/ProfileContext";
import SectionHeader from "@/components/SectionHeader";
import portrait from "@/assets/portrait.jpg";

interface Stat {
  icon: string;
  label: string;
  value: string;
}
interface ProfileCopy {
  heading: string;
  subheading: string;
  paragraphs: string[];
  stats: Stat[];
  roles: string[];
}
interface Why {
  title: string;
  desc: string;
}

const ICONS: Record<string, LucideIcon> = {
  Briefcase,
  GraduationCap,
  Languages,
  BarChart3,
  Cpu,
  Sparkles,
};

export default function AboutSection() {
  const { t } = useLang();
  const { profile } = useProfile();
  const copy = t<ProfileCopy>(`about.${profile}`);
  const whyList = t<Why[]>("about.why");

  return (
    <section id="about" className="mx-auto max-w-6xl scroll-mt-32 px-6 py-24">
      <SectionHeader kicker={t<string>("about.kicker")} title={t<string>("about.title")} />

      <div className="mt-14 grid gap-12 md:grid-cols-5">
        {/* Portrait */}
        <div className="md:col-span-2">
          <div className="group relative overflow-hidden rounded-3xl border border-border bg-card">
            <img
              src={portrait}
              alt="Mariangel Sierra Jaller"
              className="h-full w-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
            <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-primary/10" />
          </div>
        </div>

        {/* Copy */}
        <div className="md:col-span-3">
          <AnimatePresence mode="wait">
            <motion.div
              key={profile}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35 }}
            >
              <h3 className="font-display text-3xl leading-tight text-foreground md:text-4xl">
                {copy.heading}
              </h3>
              <p className="mt-2 font-mono text-xs uppercase tracking-widest text-primary">
                {copy.subheading}
              </p>
              <div className="mt-6 space-y-4">
                {copy.paragraphs.map((p, i) => (
                  <p
                    key={i}
                    className="text-[15px] leading-relaxed text-foreground/85 text-balance"
                  >
                    {p}
                  </p>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Metric cards */}
      <div className="mt-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={profile}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.35 }}
            className="grid gap-4 md:grid-cols-3"
          >
            {copy.stats.map((s) => {
              const Icon = ICONS[s.icon] ?? Sparkles;
              return (
                <div
                  key={s.label}
                  className="flex items-center gap-4 rounded-2xl border border-border bg-card/60 p-5 hover-glow"
                >
                  <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-primary/15 text-primary">
                    <Icon size={20} />
                  </div>
                  <div className="min-w-0">
                    <div className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
                      {s.label}
                    </div>
                    <div className="mt-1 font-display text-lg text-foreground truncate">
                      {s.value}
                    </div>
                  </div>
                </div>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Roles */}
      <div className="mt-12">
        <h3 className="font-mono text-xs uppercase tracking-widest text-primary">
          {t<string>("about.rolesTitle")}
        </h3>
        <AnimatePresence mode="wait">
          <motion.div
            key={profile}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.3 }}
            className="mt-4 flex flex-wrap gap-2"
          >
            {copy.roles.map((r) => (
              <span
                key={r}
                className="rounded-full border border-primary/40 bg-primary/10 px-3 py-1.5 text-sm text-foreground"
              >
                {r}
              </span>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Why hire me */}
      <div className="mt-16">
        <h3 className="font-mono text-xs uppercase tracking-widest text-primary">
          {t<string>("about.whyTitle")}
        </h3>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {whyList.map((w, i) => (
            <motion.div
              key={w.title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="rounded-2xl border border-border bg-card/60 p-6 hover-glow"
            >
              <div className="grid h-10 w-10 place-items-center rounded-full bg-primary/15 text-primary">
                <Check size={18} />
              </div>
              <h4 className="mt-4 font-display text-xl text-foreground">{w.title}</h4>
              <p className="mt-2 text-sm text-muted-foreground">{w.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
