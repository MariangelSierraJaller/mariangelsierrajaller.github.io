import { AnimatePresence, motion } from "framer-motion";
import { Check } from "lucide-react";
import { useLang } from "@/context/LanguageContext";
import { useProfile } from "@/context/ProfileContext";
import SectionHeader from "@/components/SectionHeader";
import portrait from "@/assets/portrait.jpg";

interface Stat {
  value: string;
  label: string;
}
interface Why {
  title: string;
  desc: string;
}

export default function AboutSection() {
  const { t } = useLang();
  const { profile } = useProfile();
  const body = t<string>(`about.${profile}`);
  const stats = t<Stat[]>("about.stats");
  const roles = t<string[]>(`about.roles.${profile}`);
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

        {/* Copy + stats */}
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

          <div className="mt-8 grid grid-cols-3 gap-3">
            {stats.map((s) => (
              <div key={s.label} className="rounded-2xl border border-border bg-card/60 p-4 hover-glow">
                <div className="font-display text-2xl text-primary">{s.value}</div>
                <div className="mt-1 text-[11px] uppercase tracking-wider text-muted-foreground">
                  {s.label}
                </div>
              </div>
            ))}
          </div>

          {/* Roles */}
          <div className="mt-10">
            <h3 className="font-mono text-xs uppercase tracking-widest text-primary">
              {t<string>("about.rolesTitle")}
            </h3>
            <div className="mt-4 flex flex-wrap gap-2">
              <AnimatePresence mode="wait">
                <motion.div
                  key={profile}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-wrap gap-2"
                >
                  {roles.map((r) => (
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
          </div>
        </div>
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
