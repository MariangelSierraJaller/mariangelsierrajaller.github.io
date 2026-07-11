import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, MapPin, Phone, Send, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useLang } from "@/context/LanguageContext";
import SectionHeader from "@/components/SectionHeader";

const PHONE_INTL = "573242924705";

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
          <div className="space-y-8">
            <div>
              <h3 className="font-display text-2xl text-foreground">
                {t<string>("contact.connect")}
              </h3>
              <p className="mt-3 text-muted-foreground leading-relaxed">
                {t<string>("contact.description")}
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="grid h-11 w-11 place-items-center rounded-xl bg-primary/10 text-primary">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest text-muted-foreground">
                    {t<string>("contact.labels.location")}
                  </p>
                  <p className="text-sm text-foreground">{location}</p>
                </div>
              </div>

              <a
                href={`tel:+${PHONE_INTL}`}
                className="group flex items-center gap-4 transition-transform hover:translate-x-1"
                aria-label={`${t<string>("contact.labels.phone")}: ${phone}`}
              >
                <div className="grid h-11 w-11 place-items-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary/20">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest text-muted-foreground">
                    {t<string>("contact.labels.phone")}
                  </p>
                  <p className="text-sm text-primary group-hover:underline">{phone}</p>
                </div>
              </a>

              <a
                href={`mailto:${email}`}
                className="group flex items-center gap-4 transition-transform hover:translate-x-1"
                aria-label={`${t<string>("contact.labels.email")}: ${email}`}
              >
                <div className="grid h-11 w-11 place-items-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary/20">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest text-muted-foreground">
                    {t<string>("contact.labels.email")}
                  </p>
                  <p className="text-sm text-primary group-hover:underline break-all">
                    {email}
                  </p>
                </div>
              </a>

              <a
                href={`https://www.linkedin.com/in/${linkedin}/`}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 transition-transform hover:translate-x-1"
                aria-label={`LinkedIn: ${linkedin}`}
              >
                <div className="grid h-11 w-11 place-items-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary/20">
                  <Linkedin className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest text-muted-foreground">
                    LinkedIn
                  </p>
                  <p className="text-sm text-primary group-hover:underline">
                    @{linkedin}
                  </p>
                </div>
              </a>
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
