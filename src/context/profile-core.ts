import { createContext, useContext } from "react";

export type Profile = "admin" | "tech";

export interface ProfileCtx {
  profile: Profile;
  setProfile: (p: Profile) => void;
  toggle: () => void;
  /** True when `?locked=true` is present in the URL. Hides the switcher UI. */
  locked: boolean;
}

export const ProfileCtx = createContext<ProfileCtx | null>(null);

export function useProfile() {
  const ctx = useContext(ProfileCtx);
  if (!ctx) throw new Error("useProfile must be used within ProfileProvider");
  return ctx;
}