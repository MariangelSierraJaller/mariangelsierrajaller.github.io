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
}

export default function ExperienceSection() {
  const { t } = useLang();
  const { profile } = useProfile();
  const items = t<Item[]>("experience.items");

  return (
    <section id="experience" className="border-t border-border/60 bg-background scroll-mt-32">
      <div className="mx-auto max-w-6xl px-6 py-24">
        <SectionHeader kicker={t<string>("experience.kicker")} title={t<string>("experience.title")} />

        <div className="relative mt-14">
          <div className="absolute left-3 top-2 bottom-2 w-px bg-border md:left-1/2 md:-ml-px" />
          <ol className="space-y-10">
            {items.map((item, idx) => {
              const bullets = item[profile];
              return (
                <motion.li
                  key={item.role + item.period}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.5, delay: idx * 0.05 }}
                  className="relative pl-10 md:grid md:grid-cols-2 md:gap-10 md:pl-0"
                >
                  <span className="absolute left-1.5 top-2 grid h-4 w-4 place-items-center rounded-full border border-primary bg-background md:left-1/2 md:-ml-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                  </span>

                  <div className={idx % 2 === 0 ? "md:pr-12 md:text-right" : "md:col-start-2 md:pl-12"}>
                    <p className="text-xs uppercase tracking-widest text-primary">{item.period}</p>
                    <h3 className="mt-2 font-display text-xl text-foreground">{item.role}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{item.company}</p>
                    <p className="mt-1 inline-flex items-center gap-1 text-xs text-muted-foreground">
                      <MapPin size={11} /> {item.location}
                    </p>
                  </div>

                  <div className={idx % 2 === 0 ? "mt-4 md:col-start-2 md:mt-0 md:pl-12" : "mt-4 md:col-start-1 md:row-start-1 md:mt-0 md:pr-12"}>
                    <div className="rounded-2xl border border-border bg-card/60 p-5">
                      <AnimatePresence mode="wait">
                        <motion.ul
                          key={profile}
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -4 }}
                          transition={{ duration: 0.3 }}
                          className="space-y-2.5 text-sm leading-relaxed text-foreground/85"
                        >
                          {bullets.map((b, i) => (
                            <li key={i} className="flex gap-2">
                              <span className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-primary" />
                              <span>{b}</span>
                            </li>
                          ))}
                        </motion.ul>
                      </AnimatePresence>
                    </div>
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
