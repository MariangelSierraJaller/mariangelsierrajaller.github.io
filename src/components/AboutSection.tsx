import { AnimatePresence, motion } from "framer-motion";
import { useLang } from "@/context/LanguageContext";
import { useProfile } from "@/context/ProfileContext";
import SectionHeader from "@/components/SectionHeader";

interface Stat {
  value: string;
  label: string;
}

export default function AboutSection() {
  const { t } = useLang();
  const { profile } = useProfile();
  const body = t<string>(`about.${profile}`);
  const stats = t<Stat[]>("about.stats");

  return (
    <section id="about" className="mx-auto max-w-6xl scroll-mt-32 px-6 py-24">
      <SectionHeader kicker={t<string>("about.kicker")} title={t<string>("about.title")} />

      <div className="mt-12 grid gap-10 md:grid-cols-5">
        <div className="md:col-span-3">
          <AnimatePresence mode="wait">
            <motion.p
              key={profile}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35 }}
              className="text-lg leading-relaxed text-foreground/90 text-balance"
            >
              {body}
            </motion.p>
          </AnimatePresence>
        </div>

        <div className="md:col-span-2">
          <div className="grid gap-3">
            {stats.map((s) => (
              <div
                key={s.label}
                className="rounded-2xl border border-border bg-card/60 p-5"
              >
                <div className="font-display text-3xl text-primary">{s.value}</div>
                <div className="mt-1 text-sm text-muted-foreground">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
