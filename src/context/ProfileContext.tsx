import { type ReactNode, useCallback, useEffect, useMemo } from "react";
import { useLocation, useNavigate, useParams, useSearchParams } from "react-router-dom";
import { type Profile, ProfileCtx } from "@/context/profile-core";

const KEY = "msj.profile";

function storedProfile(): Profile {
  if (typeof window === "undefined") return "tech";
  const v = window.localStorage.getItem(KEY);
  return v === "admin" || v === "tech" ? v : "tech";
}

function isProfile(v: unknown): v is Profile {
  return v === "admin" || v === "tech";
}

export function ProfileProvider({ children }: { children: ReactNode }) {
  const { lang, profile: profileParam } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();

  const langSeg = lang === "en" ? "en" : "es";
  const profile: Profile = isProfile(profileParam) ? profileParam : storedProfile();
  const locked = searchParams.get("locked") === "true";

  // Canonicalize URL: always include the profile segment so the route is shareable.
  useEffect(() => {
    if (!isProfile(profileParam)) {
      navigate(
        `/${langSeg}/${profile}${location.search}${location.hash}`,
        { replace: true },
      );
    }
  }, [profileParam, profile, langSeg, location.search, location.hash, navigate]);

  // Persist the last chosen profile so `/lang` alone can default to it.
  useEffect(() => {
    try {
      window.localStorage.setItem(KEY, profile);
    } catch {
      /* ignore */
    }
  }, [profile]);

  const setProfile = useCallback(
    (next: Profile) => {
      if (next === profile && isProfile(profileParam)) return;
      navigate(
        `/${langSeg}/${next}${location.search}${location.hash}`,
        { replace: false },
      );
    },
    [profile, profileParam, langSeg, location.search, location.hash, navigate],
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

  return <ProfileCtx.Provider value={value}>{children}</ProfileCtx.Provider>;
}
