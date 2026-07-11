import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, MapPin, Phone, Send, Linkedin, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useLang } from "@/context/language-core";
import SectionHeader from "@/components/SectionHeader";

const PHONE_INTL = "573242924705";

interface ContactCardProps {
  icon: React.ElementType;
  label: string;
  value: string;
  href: string;
  ariaLabel: string;
}

function ContactCard({ icon: Icon, label, value, href, ariaLabel }: ContactCardProps) {
  return (
    <a
      href={href}
      aria-label={ariaLabel}
      className="group relative flex items-center gap-4 overflow-hidden rounded-2xl border border-border/60 bg-card/40 p-4 backdrop-blur-sm transition-all duration-300 hover:border-primary/40 hover:bg-card/60 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-0.5"
    >
      <div className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground transition-transform duration-300 group-hover:scale-105">
        <Icon className="h-5 w-5" />
      </div>

      <div className="min-w-0 flex-1">
        <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
          {label}
        </p>
        <p className="mt-0.5 truncate text-sm font-medium text-foreground transition-colors group-hover:text-primary">
          {value}
        </p>
      </div>

      <div className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-border/60 text-muted-foreground transition-all duration-300 group-hover:border-primary/40 group-hover:text-primary group-hover:bg-primary/10">
        <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
      </div>
    </a>
  );
}

export default function ContactSection() {
  const { t, lang } = useLang();
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const email = t<string>("contact.email");
  const phone = t<string>("contact.phone");
  const location = t<string>("contact.location");
  const linkedin = t<string>("contact.linkedin");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const header =
      lang === "es"
        ? "📬 Nuevo mensaje desde el portafolio web"
        : "📬 New message from web portfolio";
    const nameLabel = lang === "es" ? "Nombre" : "Name";
    const emailLabel = lang === "es" ? "Correo" : "Email";
    const messageLabel = lang === "es" ? "Mensaje" : "Message";

    const whatsappMessage = `${header}

*${nameLabel}:* ${formData.name}
*${emailLabel}:* ${formData.email}
*${messageLabel}:* ${formData.message}`;

    const url = `https://wa.me/${PHONE_INTL}?text=${encodeURIComponent(whatsappMessage)}`;
    window.open(url, "_blank");
    setFormData({ name: "", email: "", message: "" });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const inputCls =
    "bg-card/60 border-border/70 focus-visible:border-primary focus-visible:ring-primary/40";

  const contactCards: ContactCardProps[] = [
    {
      icon: MapPin,
      label: t<string>("contact.labels.location"),
      value: location,
      href: "https://maps.google.com/?q=Medellin,Colombia",
      ariaLabel: `${t<string>("contact.labels.location")}: ${location}`,
    },
    {
      icon: Phone,
      label: t<string>("contact.labels.phone"),
      value: phone,
      href: `tel:+${PHONE_INTL}`,
      ariaLabel: `${t<string>("contact.labels.phone")}: ${phone}`,
    },
    {
      icon: Mail,
      label: t<string>("contact.labels.email"),
      value: email,
      href: `mailto:${email}`,
      ariaLabel: `${t<string>("contact.labels.email")}: ${email}`,
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      value: `@${linkedin}`,
      href: `https://www.linkedin.com/in/${linkedin}/`,
      ariaLabel: `LinkedIn: ${linkedin}`,
    },
  ];

  return (
    <section id="contact" className="border-t border-border/60 scroll-mt-32">
      <div className="mx-auto max-w-6xl px-6 py-24">
        <SectionHeader
          kicker={t<string>("contact.kicker")}
          title={t<string>("contact.title")}
        />

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          className="mt-14 grid gap-12 md:grid-cols-2"
        >
          {/* Contact info */}
          <div className="flex flex-col gap-6">
            <div>
              <h3 className="font-display text-2xl text-foreground">
                {t<string>("contact.connect")}
              </h3>
              <p className="mt-3 text-muted-foreground leading-relaxed">
                {t<string>("contact.description")}
              </p>
            </div>

            <div className="flex flex-col gap-4">
              {contactCards.map((card) => (
                <ContactCard key={card.label} {...card} />
              ))}
            </div>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="space-y-5 rounded-2xl border border-border/70 bg-card/40 p-6 backdrop-blur-sm md:p-8"
          >
            <div>
              <label
                htmlFor="name"
                className="mb-2 block text-xs uppercase tracking-widest text-muted-foreground"
              >
                {t<string>("contact.form.fullName")}
              </label>
              <Input
                id="name"
                name="name"
                type="text"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder={t<string>("contact.form.placeholder.name")}
                className={inputCls}
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-xs uppercase tracking-widest text-muted-foreground"
              >
                {t<string>("contact.form.email")}
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder={t<string>("contact.form.placeholder.email")}
                className={inputCls}
              />
            </div>

            <div>
              <label
                htmlFor="message"
                className="mb-2 block text-xs uppercase tracking-widest text-muted-foreground"
              >
                {t<string>("contact.form.message")}
              </label>
              <Textarea
                id="message"
                name="message"
                required
                rows={5}
                value={formData.message}
                onChange={handleChange}
                placeholder={t<string>("contact.form.placeholder.message")}
                className={`${inputCls} resize-none`}
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-primary py-6 font-semibold text-primary-foreground transition-all duration-300 hover:bg-primary/90"
            >
              <Send className="mr-2 h-4 w-4" />
              {t<string>("contact.form.send")}
            </Button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
