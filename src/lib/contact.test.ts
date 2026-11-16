import { describe, expect, it } from "vitest";
import { buildMailtoHref, buildWhatsappHref, validateContact } from "./contact";
import { SITE } from "@/content/shared/site";

describe("contact form helpers", () => {
  it("validates required name, email, and message length", () => {
    expect(
      validateContact({
        name: "Ana",
        email: "ana@empresa.co",
        subject: "Entrevista",
        message: "Hola Mariangel, nos gustaría conversar sobre una vacante.",
      }),
    ).toBe(true);

    expect(
      validateContact({
        name: "A",
        email: "ana@empresa.co",
        subject: "",
        message: "Mensaje largo suficiente",
      }),
    ).toBe(false);

    expect(
      validateContact({
        name: "Ana",
        email: "correo-invalido",
        subject: "",
        message: "Mensaje largo suficiente",
      }),
    ).toBe(false);

    expect(
      validateContact({
        name: "Ana",
        email: "ana@empresa.co",
        subject: "",
        message: "Corto",
      }),
    ).toBe(false);
  });

  it("builds mailto and WhatsApp links targeting Mariangel's real contact channels", () => {
    const payload = {
      name: "Carlos Pérez",
      email: "carlos@org.co",
      subject: "Analista de Datos",
      message: "Te compartimos los detalles de la posición en Medellín.",
    };

    const mailto = buildMailtoHref(payload, "es");
    expect(mailto.startsWith(`mailto:${SITE.email}?subject=`)).toBe(true);
    expect(decodeURIComponent(mailto)).toContain("Carlos Pérez");
    expect(decodeURIComponent(mailto)).toContain("Analista de Datos");

    const wa = buildWhatsappHref(payload, "en");
    expect(wa.startsWith(`https://wa.me/${SITE.whatsappNumber}?text=`)).toBe(true);
    expect(decodeURIComponent(wa)).toContain("New message from your web portfolio");
    expect(decodeURIComponent(wa)).toContain("carlos@org.co");
  });
});
