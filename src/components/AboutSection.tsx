import { AnimatePresence, motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { BarChart3, Briefcase, Cpu, GraduationCap, Languages, Sparkles } from "lucide-react";
import { useLang } from "@/context/language-core";
import { useProfile } from "@/context/profile-core";
import SectionHeader from "@/components/SectionHeader";

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

const ICONS: Record<string, LucideIcon> = {
  Briefcase,
  GraduationCap,
  Languages,
  BarChart3,
  Cpu,
  Sparkles,
};

const asciiArt = [
  "         _,,,_",
  "       .'     `'.",
  "      /     ____ \\",
  "     |    .'_  _\\/",
  "     /    ) a  a|         .----.",
  "    /    (    > |        /|     '--.",
  "   (      ) ._  /        ||    ]|   `-.",
  "   )    _/-.__.'`\\       ||    ]|    ::|",
  "  (  .-'`-.   \\__ )      ||    ]|    ::|",
  "   `/      `-./  `.      ||    ]|    ::|",
  "  _ |    \\      \\  \\     \\|    ]|   .-'",
  " / \\|     \\   \\  \\  \\     L.__  .--'(",
  "|   |\\     `. /  /   \\  ,---|_      \\---------,",
  "|   `\\'.     '. /`\\   \\/ .--._|=-    |_      /|",
  "|     \\ '.     '._ './`\\/ .-'          '.   / |",
  "|     |   `'.     `;-:-;`)|             |-./  |",
  "|    /_      `'--./_  ` )/'-------------')/)  |",
  "\\   | `\"\"\"\"----\"`\\//`\"\"`/,===..'`````````/ (  |",
  " |  |            / `---` `==='          /   ) |",
  " /  \\           /                      /   (  |",
  "|    '------.  |'--------------------'|     ) |",
  " \\           `-|                      |    /  |",
  "  `--...,______|                      |   (   |",
  "         | |   |                      |    ) ,|",
  "         | |   |                      |   ( /||",
  "         | |   |                      |   )/ `\"",
  "        /   \\  |                      |  (/",
  "  jgs .' /I\\ '.|                      |  /)",
  "   .-'_.'/ \\'. |                      | /",
  "   ```  `\"\"\"` `| .-------------------.||",
  "               `\"`                   `\"`",
].join("\n");

export default function AboutSection() {
  const { t } = useLang();
  const { profile } = useProfile();
  const copy = t<ProfileCopy>(`about.${profile}`);

  return (
    <section id="about" className="mx-auto max-w-6xl scroll-mt-32 px-6 pt-24 pb-12">
      <SectionHeader kicker={t<string>("about.kicker")} title={t<string>("about.title")} />

      {/* Per-profile heading */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`head-${profile}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.35 }}
          className="mt-10 text-center"
        >
          <h3 className="font-display text-3xl leading-tight text-foreground md:text-4xl">
            {copy.heading}
          </h3>
          <p className="mt-2 font-mono text-xs uppercase tracking-widest text-primary">
            {copy.subheading}
          </p>
        </motion.div>
      </AnimatePresence>

      {/* Main two-column grid */}
      <div className="mt-12 grid gap-12 lg:grid-cols-2">
        {/* Left: ASCII art */}
        <div className="relative">
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5 blur-3xl" />
          <div
            className="relative overflow-hidden rounded-3xl border border-border bg-background/80 p-6 backdrop-blur-sm">
            <pre
              className="font-mono text-[10px] sm:text-xs md:text-[13px] text-primary overflow-x-auto whitespace-pre leading-tight">
              {asciiArt}
            </pre>
            <p className="mt-4 text-center text-xs italic text-muted-foreground">
              {t<string>("about.asciiCaption")}
            </p>
          </div>
        </div>

        {/* Right: paragraphs + metric cards */}
        <div>
          <AnimatePresence mode="wait">
            <motion.div
              key={`body-${profile}`}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35 }}
              className="space-y-6"
            >
              {copy.paragraphs.map((p, i) => (
                <p
                  key={i}
                  className="text-[15px] leading-relaxed text-foreground/85 text-balance"
                >
                  {p}
                </p>
              ))}
            </motion.div>
          </AnimatePresence>

          <AnimatePresence mode="wait">
            <motion.div
              key={`stats-${profile}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.35 }}
              className="mt-8 grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
            >
              {copy.stats.map((s) => {
                const Icon = ICONS[s.icon] ?? Sparkles;
                return (
                  <div
                    key={s.label}
                    className="flex flex-col items-center gap-3 rounded-2xl border border-border bg-card/60 p-5 text-center hover-glow min-h-[140px]"
                  >
                    <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-primary/15 text-primary">
                      <Icon size={20} />
                    </div>
                    <div className="flex min-w-0 flex-1 flex-col items-center justify-center">
                      <div
                        className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground break-words">
                        {s.label}
                      </div>
                      <div className="mt-1.5 font-display text-lg text-foreground leading-tight break-words">
                        {s.value}
                      </div>
                    </div>
                  </div>
                );
              })}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

    </section>
  );
}
