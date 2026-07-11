import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";
import { useLang } from "@/context/LanguageContext";
import SectionHeader from "@/components/SectionHeader";

interface EduItem {
  degree: string;
  institution: string;
  period: string;
  inProgress: boolean;
  profile: "admin" | "tech" | "both";
}

export default function EducationSection() {
  const { t } = useLang();
  const items = t<EduItem[]>("education.items");
  const inProgressLabel = t<string>("education.inProgress");

  return (
    <section id="education" className="mx-auto max-w-6xl scroll-mt-32 px-6 py-24">
      <SectionHeader kicker={t<string>("education.kicker")} title={t<string>("education.title")} />

      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item, i) => (
          <motion.article
            key={item.degree}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.4, delay: i * 0.04 }}
            className="group relative overflow-hidden rounded-2xl border border-border bg-card/60 p-6 transition-colors hover:border-primary/40"
          >
            <div className="flex items-start justify-between gap-3">
              <span className="grid h-9 w-9 place-items-center rounded-full border border-border bg-secondary/60 text-primary">
                <GraduationCap size={16} />
              </span>
              {item.inProgress && (
                <span className="rounded-full border border-primary/40 bg-primary/10 px-2 py-0.5 text-[10px] uppercase tracking-widest text-primary">
                  {inProgressLabel}
                </span>
              )}
            </div>
            <h3 className="mt-5 font-display text-lg leading-tight text-foreground">
              {item.degree}
            </h3>
            <p className="mt-1.5 text-sm text-muted-foreground">{item.institution}</p>
            <p className="mt-3 text-xs uppercase tracking-widest text-primary/80">{item.period}</p>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
