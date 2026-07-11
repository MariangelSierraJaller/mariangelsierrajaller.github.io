import { AnimatePresence, motion } from "framer-motion";
import { useLang } from "@/context/LanguageContext";
import { useProfile } from "@/context/ProfileContext";
import SectionHeader from "@/components/SectionHeader";

interface HardSkill {
  name: string;
  level: number;
}

export default function SkillsSection() {
  const { t } = useLang();
  const { profile } = useProfile();
  const hard = t<HardSkill[]>(`skills.${profile}.hard`);
  const tools = t<string[]>(`skills.${profile}.tools`);
  const soft = t<string[]>("skills.soft");
  const langs = t<{ name: string; level: string }[]>("skills.languages.items");

  return (
    <section id="skills" className="border-t border-border/60 scroll-mt-32">
      <div className="mx-auto max-w-6xl px-6 py-24">
        <SectionHeader kicker={t<string>("skills.kicker")} title={t<string>("skills.title")} />

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {/* Hard skills with progress bars */}
          <div className="rounded-2xl border border-border bg-card/60 p-6 lg:col-span-2 hover-glow">
            <h3 className="font-display text-2xl text-foreground">{t<string>("skills.hardTitle")}</h3>
            <AnimatePresence mode="wait">
              <motion.ul
                key={profile}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.3 }}
                className="mt-6 space-y-4"
              >
                {hard.map((s, i) => (
                  <li key={s.name}>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-foreground/90">{s.name}</span>
                      <span className="font-mono text-xs text-muted-foreground">{s.level}%</span>
                    </div>
                    <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-secondary/60">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${s.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.9, delay: i * 0.05, ease: "easeOut" }}
                        className="h-full rounded-full bg-gradient-to-r from-primary to-[var(--color-primary-hover)]"
                      />
                    </div>
                  </li>
                ))}
              </motion.ul>
            </AnimatePresence>

            {/* Tools */}
            <div className="mt-8">
              <h4 className="font-mono text-xs uppercase tracking-widest text-primary">
                {t<string>("skills.toolsTitle")}
              </h4>
              <AnimatePresence mode="wait">
                <motion.ul
                  key={profile + "-tools"}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.3 }}
                  className="mt-3 flex flex-wrap gap-2"
                >
                  {tools.map((tool) => (
                    <li key={tool} className="tech-badge">
                      {tool}
                    </li>
                  ))}
                </motion.ul>
              </AnimatePresence>
            </div>
          </div>

          {/* Soft skills + languages */}
          <div className="rounded-2xl border border-border bg-card/60 p-6 hover-glow">
            <h3 className="font-display text-2xl text-foreground">{t<string>("skills.softTitle")}</h3>
            <ul className="mt-6 flex flex-wrap gap-2">
              {soft.map((s) => (
                <li
                  key={s}
                  className="rounded-full border border-border bg-secondary/50 px-3 py-1.5 text-xs text-muted-foreground"
                >
                  {s}
                </li>
              ))}
            </ul>

            <div className="mt-8">
              <h4 className="font-mono text-xs uppercase tracking-widest text-primary">
                {t<string>("skills.languages.title")}
              </h4>
              <ul className="mt-4 space-y-3">
                {langs.map((l) => (
                  <li key={l.name} className="flex items-center justify-between border-b border-border/60 pb-2 text-sm">
                    <span className="text-foreground/90">{l.name}</span>
                    <span className="rounded-full border border-primary/40 bg-primary/10 px-2 py-0.5 text-xs text-foreground">
                      {l.level}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
