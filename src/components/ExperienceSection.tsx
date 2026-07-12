import { AnimatePresence, motion } from "framer-motion";
import { Briefcase, ChevronDown, MapPin } from "lucide-react";
import { useState } from "react";
import { useLang } from "@/context/language-core";
import { useProfile } from "@/context/profile-core";
import SectionHeader from "@/components/SectionHeader";
import { cn } from "@/lib/utils";

interface ProfileEntry {
  role: string;
  description: string;
  bullets: string[];
  tags: string[];
}

interface Item {
  period: string;
  location: string;
  company: string;
  current?: boolean;
  admin: ProfileEntry;
  tech: ProfileEntry;
}

function TimelineCard({
                        item,
                        side,
                        idx,
                      }: {
  item: Item;
  side: "left" | "right";
  idx: number;
}) {
  const { t } = useLang();
  const { profile } = useProfile();
  const [open, setOpen] = useState(false);
  const entry = item[profile];
  const collapsedTags = entry.tags.slice(0, 5);
  const extraTagCount = entry.tags.length - collapsedTags.length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: idx * 0.05 }}
      className={cn(
        "relative md:w-1/2",
        side === "left" ? "md:pr-12 md:self-start" : "md:pl-12 md:ml-auto md:self-end",
      )}
    >
      {/* Node on the central rail */}
      <span
        className={cn(
          "absolute top-6 hidden h-3 w-3 rounded-full border-2 border-primary bg-background shadow-[0_0_0_4px_hsl(var(--primary)/0.15)] md:block",
          side === "left" ? "right-[-6px]" : "left-[-6px]",
        )}
      />
      {/* Mobile rail dot */}
      <span
        className="absolute left-[-26px] top-6 h-3 w-3 rounded-full border-2 border-primary bg-background md:hidden" />

      <div
        className="rounded-2xl border border-border bg-card/70 p-6 backdrop-blur-sm transition-all hover:border-primary/50 hover-glow">
        <div className="flex flex-wrap items-center gap-2 font-mono text-xs uppercase tracking-widest text-primary">
          <Briefcase size={12} />
          <span>{item.period}</span>
          {item.current && (
            <span
              className="rounded-full border border-primary/40 bg-primary/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-primary">
              {t<string>("experience.currentLabel")}
            </span>
          )}
        </div>

        <h3 className="mt-3 font-display text-xl leading-tight text-foreground">
          {item.company}
        </h3>

        <AnimatePresence mode="wait">
          <motion.div
            key={profile}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.3 }}
          >
            <p className="mt-1 text-sm font-semibold text-primary/90">{entry.role}</p>
            <p className="mt-2 inline-flex items-center gap-1 text-xs text-muted-foreground">
              <MapPin size={11} /> {item.location}
            </p>

            <p className="mt-4 text-sm leading-relaxed text-foreground/85">
              {entry.description}
            </p>

            <AnimatePresence initial={false}>
              {open && (
                <motion.div
                  key="expand"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="mt-5 border-t border-border/60 pt-4">
                    <p className="text-center font-display text-sm font-semibold text-foreground">
                      {t<string>("experience.responsibilitiesLabel")}:
                    </p>
                    <ul className="mt-3 space-y-2.5 text-sm leading-relaxed text-foreground/85">
                      {entry.bullets.map((b, i) => (
                        <li key={i} className="flex gap-2">
                          <span className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-primary" />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="mt-5 flex flex-wrap justify-center gap-2">
              {(open ? entry.tags : collapsedTags).map((tag) => (
                <span key={tag} className="tech-badge">
                  {tag}
                </span>
              ))}
              {!open && extraTagCount > 0 && (
                <span className="tech-badge opacity-70">+{extraTagCount}</span>
              )}
            </div>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              className="mt-4 inline-flex w-full items-center justify-center gap-1 text-xs font-medium text-primary transition-colors hover:text-primary/80"
              aria-expanded={open}
            >
              {open ? t<string>("experience.showLess") : t<string>("experience.showMore")}
              <ChevronDown
                size={14}
                className={cn("transition-transform", open && "rotate-180")}
              />
            </button>
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

export default function ExperienceSection() {
  const { t } = useLang();
  const items = t<Item[]>("experience.items");

  return (
    <section
      id="experience"
      className="scroll-mt-32 border-t border-border/60 bg-background"
    >
      <div className="mx-auto max-w-6xl px-6 py-24">
        <SectionHeader
          kicker={t<string>("experience.kicker")}
          title={t<string>("experience.title")}
        />

        <div className="relative mt-16">
          {/* Central rail (desktop) */}
          <div
            className="absolute left-1/2 top-0 bottom-0 hidden w-px -translate-x-1/2 bg-gradient-to-b from-primary/60 via-border to-transparent md:block" />
          {/* Left rail (mobile) */}
          <div
            className="absolute left-[-14px] top-0 bottom-0 w-px bg-gradient-to-b from-primary/60 via-border to-transparent md:hidden" />

          <div className="flex flex-col gap-12 pl-4 md:gap-16 md:pl-0">
            {items.map((item, idx) => (
              <TimelineCard
                key={item.period + item.company}
                item={item}
                side={idx % 2 === 0 ? "left" : "right"}
                idx={idx}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
