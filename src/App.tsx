import { BrowserRouter, Navigate, Route, Routes, useParams } from "react-router-dom";
import { LanguageProvider } from "@/context/LanguageContext";
import { ProfileProvider } from "@/context/ProfileContext";
import LangLayout from "@/pages/LangLayout";
import Home from "@/pages/Home";
import NotFound from "@/pages/NotFound";
import { type ReactNode } from "react";

function LangGuard({ children }: { children: ReactNode }) {
  const { lang, profile } = useParams();
  if (lang !== "es" && lang !== "en") return <Navigate to="/es" replace />;
  if (profile !== undefined && profile !== "admin" && profile !== "tech") {
    return <Navigate to={`/${lang}`} replace />;
  }
  return <>{children}</>;
}

function LangRoutes() {
  return (
    <LangGuard>
      <LanguageProvider>
        <ProfileProvider>
          <LangLayout />
        </ProfileProvider>
      </LanguageProvider>
    </LangGuard>
  );
}

export default function App() {
  return (
    <div className="dark">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/es" replace />} />
          <Route path="/:lang" element={<LangRoutes />}>
            <Route index element={<Home />} />
            <Route path=":profile" element={<Home />} />
            <Route path="*" element={<NotFound />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
