import { AnimatePresence, motion } from "framer-motion";
import { MapPin } from "lucide-react";
import { useLang } from "@/context/LanguageContext";
import { useProfile } from "@/context/ProfileContext";
import SectionHeader from "@/components/SectionHeader";

interface Item {
  role: string;
  company: string;
  period: string;
  location: string;
  admin: string[];
  tech: string[];
  adminTags: string[];
  techTags: string[];
}

export default function ExperienceSection() {
  const { t } = useLang();
  const { profile } = useProfile();
  const items = t<Item[]>("experience.items");

  return (
    <section id="experience" className="border-t border-border/60 bg-background scroll-mt-32">
      <div className="mx-auto max-w-5xl px-6 py-24">
        <SectionHeader kicker={t<string>("experience.kicker")} title={t<string>("experience.title")} />

        <div className="relative mt-14">
          <div className="absolute left-4 top-2 bottom-2 w-px bg-gradient-to-b from-primary/60 via-border to-transparent md:left-6" />
          <ol className="space-y-10">
            {items.map((item, idx) => {
              const bullets = item[profile];
              const tags = profile === "admin" ? item.adminTags : item.techTags;
              return (
                <motion.li
                  key={item.role + item.period}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.5, delay: idx * 0.05 }}
                  className="relative pl-12 md:pl-16"
                >
                  <span className="absolute left-2.5 top-2 grid h-4 w-4 place-items-center rounded-full border border-primary bg-background md:left-4.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                  </span>

                  <div className="rounded-2xl border border-border bg-card/60 p-6 transition-all hover:border-primary/40">
                    <p className="font-mono text-xs uppercase tracking-widest text-primary">
                      {item.period}
                    </p>
                    <h3 className="mt-2 font-display text-2xl text-foreground">{item.role}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{item.company}</p>
                    <p className="mt-1 inline-flex items-center gap-1 text-xs text-muted-foreground">
                      <MapPin size={11} /> {item.location}
                    </p>

                    <AnimatePresence mode="wait">
                      <motion.div
                        key={profile}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -4 }}
                        transition={{ duration: 0.3 }}
                      >
                        <ul className="mt-5 space-y-2.5 text-sm leading-relaxed text-foreground/85">
                          {bullets.map((b, i) => (
                            <li key={i} className="flex gap-2">
                              <span className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-primary" />
                              <span>{b}</span>
                            </li>
                          ))}
                        </ul>

                        <div className="mt-5 flex flex-wrap gap-2">
                          {tags.map((tag) => (
                            <span key={tag} className="tech-badge">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </motion.li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
