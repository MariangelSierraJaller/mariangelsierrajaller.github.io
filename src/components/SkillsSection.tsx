import { AnimatePresence, motion } from "framer-motion";
import { useLang } from "@/context/LanguageContext";
import { useProfile } from "@/context/ProfileContext";
import SectionHeader from "@/components/SectionHeader";

export default function SkillsSection() {
  const { t } = useLang();
  const { profile } = useProfile();
  const hard = t<string[]>(`skills.${profile}.hard`);
  const soft = t<string[]>("skills.soft");
  const langs = t<{ name: string; level: string }[]>("skills.languages.items");

  return (
    <section id="skills" className="border-t border-border/60 scroll-mt-32">
      <div className="mx-auto max-w-6xl px-6 py-24">
        <SectionHeader kicker={t<string>("skills.kicker")} title={t<string>("skills.title")} />

        <div className="mt-12 grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2 rounded-2xl border border-border bg-card/60 p-6">
            <h3 className="font-display text-lg text-foreground">{t<string>("skills.hardTitle")}</h3>
            <AnimatePresence mode="wait">
              <motion.ul
                key={profile}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.3 }}
                className="mt-5 flex flex-wrap gap-2"
              >
                {hard.map((s) => (
                  <li
                    key={s}
                    className="rounded-full border border-primary/30 bg-primary/5 px-3 py-1.5 text-xs text-foreground/90 transition-colors hover:border-primary hover:bg-primary/15"
                  >
                    {s}
                  </li>
                ))}
              </motion.ul>
            </AnimatePresence>
          </div>

          <div className="rounded-2xl border border-border bg-card/60 p-6">
            <h3 className="font-display text-lg text-foreground">{t<string>("skills.softTitle")}</h3>
            <ul className="mt-5 flex flex-wrap gap-2">
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
              <h4 className="text-xs uppercase tracking-widest text-primary">
                {t<string>("skills.languages.title")}
              </h4>
              <ul className="mt-3 space-y-2">
                {langs.map((l) => (
                  <li key={l.name} className="flex items-center justify-between text-sm">
                    <span className="text-foreground/90">{l.name}</span>
                    <span className="text-muted-foreground">{l.level}</span>
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
