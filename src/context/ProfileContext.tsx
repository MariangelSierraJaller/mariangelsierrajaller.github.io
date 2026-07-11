import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

export type Profile = "admin" | "tech";

interface ProfileCtx {
  profile: Profile;
  setProfile: (p: Profile) => void;
  toggle: () => void;
  /** True when the profile is fixed via URL (`/:lang/:profile`). Switcher UI should be hidden. */
  locked: boolean;
}

const Ctx = createContext<ProfileCtx | null>(null);
const KEY = "msj.profile";

function stored(): Profile {
  if (typeof window === "undefined") return "tech";
  const v = window.localStorage.getItem(KEY);
  return v === "admin" || v === "tech" ? v : "tech";
}

export function ProfileProvider({ children }: { children: ReactNode }) {
  const { lang, profile: profileParam } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const urlProfile: Profile | null =
    profileParam === "admin" || profileParam === "tech" ? profileParam : null;
  const locked = urlProfile !== null;

  const [freeProfile, setFreeProfile] = useState<Profile>(stored);
  const profile: Profile = urlProfile ?? freeProfile;

  useEffect(() => {
    if (!locked) {
      try {
        window.localStorage.setItem(KEY, freeProfile);
      } catch {
        /* ignore */
      }
    }
  }, [freeProfile, locked]);

  const setProfile = useCallback(
    (next: Profile) => {
      if (locked) {
        // Navigate to the equivalent locked route for the new profile.
        navigate(`/${lang ?? "es"}/${next}${location.hash}`, { replace: true });
        return;
      }
      setFreeProfile(next);
    },
    [lang, locked, location.hash, navigate],
  );

  const value = useMemo<ProfileCtx>(
    () => ({
      profile,
      setProfile,
      toggle: () => setProfile(profile === "admin" ? "tech" : "admin"),
      locked,
    }),
    [profile, setProfile, locked],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useProfile() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useProfile must be used within ProfileProvider");
  return ctx;
}
