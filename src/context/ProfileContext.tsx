import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

export type Profile = "admin" | "tech";

interface ProfileCtx {
  profile: Profile;
  setProfile: (p: Profile) => void;
  toggle: () => void;
}

const Ctx = createContext<ProfileCtx | null>(null);
const KEY = "msj.profile";

function initial(): Profile {
  if (typeof window === "undefined") return "tech";
  const stored = window.localStorage.getItem(KEY);
  return stored === "admin" || stored === "tech" ? stored : "tech";
}

export function ProfileProvider({ children }: { children: ReactNode }) {
  const [profile, setProfile] = useState<Profile>(initial);

  useEffect(() => {
    try {
      window.localStorage.setItem(KEY, profile);
    } catch {
      /* ignore */
    }
  }, [profile]);

  const value = useMemo<ProfileCtx>(
    () => ({
      profile,
      setProfile,
      toggle: () => setProfile((p) => (p === "admin" ? "tech" : "admin")),
    }),
    [profile],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useProfile() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useProfile must be used within ProfileProvider");
  return ctx;
}
