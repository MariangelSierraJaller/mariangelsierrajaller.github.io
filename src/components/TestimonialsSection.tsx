import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { useLang } from "@/context/LanguageContext";
import SectionHeader from "@/components/SectionHeader";

interface Item {
  quote: string;
  name: string;
  role: string;
}

export default function TestimonialsSection() {
  const { t } = useLang();
  const items = t<Item[]>("testimonials.items");

  return (
    <section id="testimonials" className="border-t border-border/60 scroll-mt-32">
      <div className="mx-auto max-w-5xl px-6 py-24">
        <SectionHeader kicker={t<string>("testimonials.kicker")} title={t<string>("testimonials.title")} />
        <div className="mt-12 grid gap-6 md:grid-cols-1">
          {items.map((it, i) => (
            <motion.figure
              key={it.name + i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="relative overflow-hidden rounded-2xl border border-border bg-card/60 p-8"
            >
              <Quote className="absolute right-6 top-6 text-primary/25" size={56} />
              <blockquote className="relative font-display text-lg leading-relaxed text-foreground/90 sm:text-xl">
                “{it.quote}”
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-full bg-primary/15 font-display text-sm text-primary">
                  {it.name.split(" ").map((n) => n[0]).slice(0, 2).join("")}
                </span>
                <div>
                  <div className="text-sm font-medium text-foreground">{it.name}</div>
                  <div className="text-xs text-muted-foreground">{it.role}</div>
                </div>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
