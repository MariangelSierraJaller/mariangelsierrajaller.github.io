import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Linkedin, ArrowUpRight } from "lucide-react";
import { useLang } from "@/context/LanguageContext";
import SectionHeader from "@/components/SectionHeader";

export default function ContactSection() {
  const { t } = useLang();
  const email = t<string>("contact.email");
  const phone = t<string>("contact.phone");
  const location = t<string>("contact.location");
  const linkedin = t<string>("contact.linkedin");

  return (
    <section id="contact" className="border-t border-border/60 scroll-mt-32">
      <div className="mx-auto max-w-6xl px-6 py-24">
        <SectionHeader kicker={t<string>("contact.kicker")} title={t<string>("contact.title")} />

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          className="mt-12 grid gap-8 md:grid-cols-2"
        >
          <p className="max-w-md text-lg text-muted-foreground text-balance">
            {t<string>("contact.lead")}
          </p>

          <div className="grid gap-3">
            <a
              href={`mailto:${email}`}
              className="group flex items-center justify-between rounded-2xl border border-border bg-card/60 p-5 transition-colors hover:border-primary/60"
            >
              <span className="flex items-center gap-3">
                <span className="grid h-9 w-9 place-items-center rounded-full bg-primary text-primary-foreground">
                  <Mail size={14} />
                </span>
                <span>
                  <span className="block text-xs uppercase tracking-widest text-muted-foreground">Email</span>
                  <span className="block text-sm text-foreground">{email}</span>
                </span>
              </span>
              <ArrowUpRight size={16} className="text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" />
            </a>

            <a
              href={`tel:${phone.replace(/\s+/g, "")}`}
              className="group flex items-center justify-between rounded-2xl border border-border bg-card/60 p-5 transition-colors hover:border-primary/60"
            >
              <span className="flex items-center gap-3">
                <span className="grid h-9 w-9 place-items-center rounded-full border border-border bg-secondary/70 text-primary">
                  <Phone size={14} />
                </span>
                <span>
                  <span className="block text-xs uppercase tracking-widest text-muted-foreground">Phone</span>
                  <span className="block text-sm text-foreground">{phone}</span>
                </span>
              </span>
              <ArrowUpRight size={16} className="text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" />
            </a>

            <a
              href={`https://www.linkedin.com/in/${linkedin}/`}
              target="_blank"
              rel="noreferrer"
              className="group flex items-center justify-between rounded-2xl border border-border bg-card/60 p-5 transition-colors hover:border-primary/60"
            >
              <span className="flex items-center gap-3">
                <span className="grid h-9 w-9 place-items-center rounded-full border border-border bg-secondary/70 text-primary">
                  <Linkedin size={14} />
                </span>
                <span>
                  <span className="block text-xs uppercase tracking-widest text-muted-foreground">LinkedIn</span>
                  <span className="block text-sm text-foreground">@{linkedin}</span>
                </span>
              </span>
              <ArrowUpRight size={16} className="text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" />
            </a>

            <div className="flex items-center gap-3 rounded-2xl border border-border bg-card/40 p-5">
              <span className="grid h-9 w-9 place-items-center rounded-full border border-border bg-secondary/70 text-primary">
                <MapPin size={14} />
              </span>
              <span>
                <span className="block text-xs uppercase tracking-widest text-muted-foreground">Location</span>
                <span className="block text-sm text-foreground">{location}</span>
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
