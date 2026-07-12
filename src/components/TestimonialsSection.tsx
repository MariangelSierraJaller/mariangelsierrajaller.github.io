import { Briefcase, ChevronLeft, ChevronRight, GraduationCap, Quote, Users } from "lucide-react";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useLang } from "@/context/language-core";
import SectionHeader from "@/components/SectionHeader";

interface Testimonial {
  quote: string;
  name: string;
  role: string;
  company: string;
  relationship: string;
  date: string;
  highlight: string;
}

const getRelationshipIcon = (relationship: string) => {
  const r = relationship.toLowerCase();
  if (r.includes("supervisor") || r.includes("cargo") || r.includes("manager")) return Briefcase;
  if (r.includes("estudios") || r.includes("student") || r.includes("study")) return GraduationCap;
  return Users;
};

export default function TestimonialsSection() {
  const { t } = useLang();
  const testimonials = t<Testimonial[]>("testimonials.items") ?? [];
  const testimonialsPerPage = 3;
  const totalPages = Math.max(1, Math.ceil(testimonials.length / testimonialsPerPage));
  const [currentPage, setCurrentPage] = useState(0);

  const nextPage = () => setCurrentPage((p) => (p + 1) % totalPages);
  const prevPage = () => setCurrentPage((p) => (p - 1 + totalPages) % totalPages);

  const currentTestimonials = testimonials.slice(
    currentPage * testimonialsPerPage,
    (currentPage + 1) * testimonialsPerPage,
  );

  const supervisors = testimonials.filter((x) =>
    x.relationship.toLowerCase().includes("supervisor") || x.relationship.toLowerCase().includes("cargo"),
  ).length;
  const teammates = testimonials.filter((x) =>
    x.relationship.toLowerCase().includes("equipo") || x.relationship.toLowerCase().includes("team"),
  ).length;

  return (
    <section id="testimonials" className="border-t border-border/60 scroll-mt-32 bg-card/30">
      <div className="mx-auto max-w-6xl px-6 py-24">
        <SectionHeader kicker={t<string>("testimonials.kicker")} title={t<string>("testimonials.title")} />
        <p className="mt-3 text-center text-sm text-muted-foreground">
          {testimonials.length} {t<string>("testimonials.subtitle")}
        </p>

        {totalPages > 1 && (
          <div className="mt-8 flex justify-center items-center gap-4">
            <Button
              variant="outline"
              size="icon"
              onClick={prevPage}
              className="border-border hover:border-primary/50 hover:bg-primary/10"
              aria-label={t<string>("testimonials.prev")}
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <div className="flex gap-2" role="tablist" aria-label="Testimonial pages">
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i)}
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    i === currentPage ? "w-8 bg-primary" : "w-2.5 bg-muted-foreground/30 hover:bg-primary/50"
                  }`}
                  role="tab"
                  aria-selected={i === currentPage}
                  aria-label={`Page ${i + 1}`}
                />
              ))}
            </div>
            <Button
              variant="outline"
              size="icon"
              onClick={nextPage}
              className="border-border hover:border-primary/50 hover:bg-primary/10"
              aria-label={t<string>("testimonials.next")}
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        )}

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="wait">
            {currentTestimonials.map((it, i) => {
              const RelIcon = getRelationshipIcon(it.relationship);
              return (
                <motion.figure
                  key={`${it.name}-${currentPage}-${i}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="relative flex flex-col rounded-2xl border border-border bg-background/70 p-6 transition-all duration-300 hover:border-primary/50 hover:shadow-[0_0_30px_-10px_hsl(var(--primary)/0.5)]"
                >
                  <div
                    className="absolute -top-3 left-6 rounded-full bg-primary/20 p-2 text-primary ring-1 ring-primary/30">
                    <Quote className="h-4 w-4" />
                  </div>

                  <div className="mb-3 flex items-center justify-between pt-3">
                    <span
                      className="inline-block rounded-full border border-primary/30 bg-primary/10 px-2 py-1 font-mono text-xs font-semibold text-primary">
                      {it.highlight}
                    </span>
                    <span className="font-mono text-xs text-muted-foreground">{it.date}</span>
                  </div>

                  <blockquote className="mb-4 flex-grow text-sm italic leading-relaxed text-muted-foreground">
                    “{it.quote}”
                  </blockquote>

                  <figcaption className="mt-auto border-t border-border pt-4">
                    <p className="font-display text-sm font-bold text-foreground">{it.name}</p>
                    <p className="text-xs text-primary">{it.role}</p>
                    <p className="text-xs text-muted-foreground">{it.company}</p>
                    <div className="mt-2 flex items-center gap-1 text-xs text-muted-foreground">
                      <RelIcon className="h-3 w-3" />
                      <span>{it.relationship}</span>
                    </div>
                  </figcaption>
                </motion.figure>
              );
            })}
          </AnimatePresence>
        </div>

        <div className="mt-12 flex flex-wrap justify-center gap-8">
          <div className="text-center">
            <p className="font-display text-3xl font-bold text-primary">{testimonials.length}</p>
            <p className="text-sm text-muted-foreground">{t<string>("testimonials.recommendations")}</p>
          </div>
          {supervisors > 0 && (
            <div className="text-center">
              <p className="font-display text-3xl font-bold text-primary">{supervisors}</p>
              <p className="text-sm text-muted-foreground">{t<string>("testimonials.fromSupervisors")}</p>
            </div>
          )}
          {teammates > 0 && (
            <div className="text-center">
              <p className="font-display text-3xl font-bold text-primary">{teammates}</p>
              <p className="text-sm text-muted-foreground">{t<string>("testimonials.fromTeammates")}</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
