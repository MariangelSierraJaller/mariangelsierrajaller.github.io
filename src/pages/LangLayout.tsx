import { Outlet } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import HeadUpdater from "@/components/HeadUpdater";

export default function LangLayout() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <HeadUpdater />
      <Navigation />
      <main>
        <Outlet />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}

