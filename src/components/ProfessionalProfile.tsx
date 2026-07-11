import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import {
  BarChart3,
  Boxes,
  Brain,
  Briefcase,
  Check,
  Database,
  FileSpreadsheet,
  Network,
  ShieldCheck,
  ShoppingCart,
  Wallet,
  Workflow,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useLang } from "@/context/LanguageContext";
import { useProfile } from "@/context/ProfileContext";
import SectionHeader from "@/components/SectionHeader";
import Subheading from "@/components/Subheading";
import portrait from "@/assets/portrait.jpg";

interface ServiceItem {
  title: string;
  desc: string;
  tags: string[];
}
interface Why {
  title: string;
  desc: string;
}

const iconsByProfile: Record<"admin" | "tech", LucideIcon[]> = {
  admin: [ShoppingCart, Wallet, ShieldCheck, Workflow, FileSpreadsheet],
  tech: [Database, BarChart3, Boxes, Network, Brain],
};

function Typewriter({ words }: { words: string[] }) {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    setText("");
    setDeleting(false);
    setIndex(0);
  }, [words]);

  useEffect(() => {
    const current = words[index % words.length] ?? "";
    let delay = deleting ? 45 : 90;
    if (!deleting && text === current) delay = 1400;
    if (deleting && text === "") delay = 300;

    const timer = setTimeout(() => {
      if (!deleting && text === current) {
        setDeleting(true);
      } else if (deleting && text === "") {
        setDeleting(false);
        setIndex((i) => (i + 1) % words.length);
      } else if (deleting) {
        setText(current.slice(0, text.length - 1));
      } else {
        setText(current.slice(0, text.length + 1));
      }
    }, delay);

    return () => clearTimeout(timer);
  }, [text, deleting, index, words]);

  return (
    <span className="inline-flex items-baseline text-primary">
      <span>{text}</span>
      <span className="ml-0.5 inline-block h-[1em] w-[2px] translate-y-[2px] animate-pulse bg-primary" />
    </span>
  );
}

export default function ProfessionalProfile() {
  const { t } = useLang();
  const { profile } = useProfile();

  const paragraph = t<string>(`professional.${profile}.paragraph`);
  const typewriterWords = t<string[]>(`professional.${profile}.typewriter`);
  const roles = t<string[]>(`professional.${profile}.roles`);
  const services = t<ServiceItem[]>(`services.${profile}.items`).slice(0, 4);
  const whyList = t<Why[]>("about.why");
  const icons = iconsByProfile[profile];

  return (
    <section
      id="professional"
      className="relative scroll-mt-32 border-t border-white/5 bg-card/30"
    >
      <div className="mx-auto max-w-6xl px-6 py-24">
        <div className="text-center">
          <SectionHeader
            kicker={t<string>("professional.kicker")}
            title={t<string>("professional.title")}
          />
        </div>

        {/* Centered subtitle under title */}
        <AnimatePresence mode="wait">
          <motion.p
            key={`sub-${profile}`}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.35 }}
            className="mx-auto mt-6 max-w-3xl text-center text-sm text-muted-foreground md:text-base"
          >
            {typewriterWords.join(" | ")}
          </motion.p>
        </AnimatePresence>

        {/* A. Portrait + paragraph card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`card-${profile}`}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.4 }}
            className="mx-auto mt-10 max-w-5xl"
          >
            <div className="relative overflow-hidden rounded-3xl border border-border bg-card/70 p-6 backdrop-blur-sm md:p-8 hover-glow">
              <div className="pointer-events-none absolute -left-24 -top-24 h-64 w-64 rounded-full bg-primary/15 blur-3xl" />
              <div className="relative flex flex-col items-center gap-8 md:flex-row md:items-start md:gap-10">
                {/* Round-framed portrait */}
                <div className="relative shrink-0 self-center">
                  <div className="absolute inset-0 rounded-full bg-primary/30 blur-2xl" />
                  <div className="relative h-40 w-40 overflow-hidden rounded-full border-2 border-primary/60 shadow-[0_0_40px_-8px_hsl(var(--primary)/0.6)] md:h-44 md:w-44">
                    <img
                      src={portrait}
                      alt={t<string>("hero.name")}
                      className="h-full w-full object-cover"
                    />
                  </div>
                </div>
                {/* Text */}
                <div className="flex-1 text-center md:text-left">
                  <h3 className="font-display text-2xl text-foreground md:text-3xl">
                    {t<string>("hero.name")}
                  </h3>
                  <p className="mt-2 text-sm font-semibold leading-snug text-primary md:text-base">
                    {typewriterWords.join(" | ")}
                  </p>
                  <p className="mt-4 text-[15px] leading-relaxed text-foreground/85 text-balance">
                    {paragraph}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* B. Roles + Typewriter */}
        <div className="mt-20 text-center">
          <Subheading
            title={t<string>("professional.rolesTitle")}
            subtitle={t<string>("professional.rolesSubtitle")}
            icon={<Briefcase size={18} />}
          />
          <div className="mt-6 min-h-[2.5rem] font-mono text-2xl text-primary md:text-3xl">
            <Typewriter key={profile} words={typewriterWords} />
          </div>
          <AnimatePresence mode="wait">
            <motion.div
              key={`roles-${profile}`}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.3 }}
              className="mt-6 flex flex-wrap justify-center gap-2"
            >
              {roles.map((r) => (
                <span key={r} className="tech-badge">
                  {r}
                </span>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* C. Services */}
        <div className="mt-24">
          <Subheading
            title={t<string>("professional.servicesTitle")}
            subtitle={t<string>("professional.servicesSubtitle")}
          />
          <AnimatePresence mode="wait">
            <motion.div
              key={`svc-${profile}`}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35 }}
              className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
            >
              {services.map((s, i) => {
                const Icon = icons[i % icons.length];
                return (
                  <motion.article
                    key={s.title}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, delay: i * 0.06 }}
                    className="group relative overflow-hidden rounded-2xl border border-border bg-background/60 p-5 transition-colors hover:border-primary/40 hover-glow"
                  >
                    <span className="grid h-10 w-10 place-items-center rounded-xl bg-primary/15 text-primary">
                      <Icon size={18} />
                    </span>
                    <h4 className="mt-4 font-display text-base leading-tight text-foreground">
                      {s.title}
                    </h4>
                    <p className="mt-2 text-[13px] leading-relaxed text-muted-foreground">
                      {s.desc}
                    </p>
                  </motion.article>
                );
              })}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* D. Why hire me */}
        <div className="mt-24">
          <Subheading
            title={t<string>("professional.whyTitle")}
            subtitle={t<string>("professional.whySubtitle")}
          />
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
      </div>
    </section>
  );
}
