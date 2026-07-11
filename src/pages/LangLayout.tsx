import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { useLang } from "@/context/LanguageContext";

export default function LangLayout() {
  const { lang, t } = useLang();

  useEffect(() => {
    document.documentElement.lang = lang;
    document.title = t<string>("meta.title");
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", t<string>("meta.description"));
  }, [lang, t]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
