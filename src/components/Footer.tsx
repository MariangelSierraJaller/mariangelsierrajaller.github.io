import { Code, Linkedin, Mail, Phone } from "lucide-react";
import { useLang } from "@/context/language-core";

const PHONE_INTL = "573242924705";

const socialLinks = [
  {
    icon: Linkedin,
    href: "https://www.linkedin.com/in/mariangelsierrajaller/",
    label: "LinkedIn",
  },
  {
    icon: Phone,
    href: `tel:+${PHONE_INTL}`,
    label: "Phone",
  },
  {
    icon: Mail,
    href: "mailto:marijohansierra@gmail.com",
    label: "Email",
  },
];

export default function Footer() {
  const { t } = useLang();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border/60 bg-card/40 py-12">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <p className="text-center text-sm text-muted-foreground md:text-left">
            © {year} My Portfolio by{" "}
            <span className="font-semibold text-primary">
              Mariangel Sierra Jaller
            </span>
            . {t<string>("footer.rights")}
          </p>

          <div className="flex items-center gap-3">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target={
                  social.href.startsWith("tel:") ||
                  social.href.startsWith("mailto:")
                    ? "_self"
                    : "_blank"
                }
                rel="noopener noreferrer"
                aria-label={social.label}
                className="rounded-lg p-2 text-muted-foreground transition-all duration-300 hover:bg-primary/10 hover:text-primary"
              >
                <social.icon className="h-5 w-5" />
              </a>
            ))}
          </div>
        </div>

        <div className="mt-8 flex justify-center">
          <div className="h-0.5 w-24 bg-gradient-to-r from-transparent via-primary to-transparent" />
        </div>

        <p className="mt-4 flex items-center justify-center gap-1 text-center font-mono text-xs text-muted-foreground">
          <Code className="h-3 w-3" />
          <span>/</span>
          {t<string>("footer.builtWith")}
        </p>
      </div>
    </footer>
  );
}
