import { BrowserRouter, Navigate, Route, Routes, useParams } from "react-router-dom";
import { LanguageProvider } from "@/context/LanguageContext";
import { ProfileProvider } from "@/context/ProfileContext";
import LangLayout from "@/pages/LangLayout";
import Home from "@/pages/Home";
import NotFound from "@/pages/NotFound";
import { type ReactNode } from "react";

function LangGuard({ children }: { children: ReactNode }) {
  const { lang } = useParams();
  if (lang !== "es" && lang !== "en") return <Navigate to="/es" replace />;
  return <>{children}</>;
}

export default function App() {
  return (
    <div className="dark">
      <BrowserRouter>
        <ProfileProvider>
          <Routes>
            <Route path="/" element={<Navigate to="/es" replace />} />
            <Route
              path="/:lang"
              element={
                <LangGuard>
                  <LanguageProvider>
                    <LangLayout />
                  </LanguageProvider>
                </LangGuard>
              }
            >
              <Route index element={<Home />} />
              <Route path="*" element={<NotFound />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </ProfileProvider>
      </BrowserRouter>
    </div>
  );
}
