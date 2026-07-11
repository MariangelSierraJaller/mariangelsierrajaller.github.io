import { motion } from "framer-motion";
import { Briefcase, Code2 } from "lucide-react";
import { useProfile } from "@/context/ProfileContext";
import { useLang } from "@/context/LanguageContext";
import { cn } from "@/lib/utils";

export default function ProfileSwitch() {
  const { profile, setProfile } = useProfile();
  const { t } = useLang();

  return (
    <div className="sticky top-16 z-40 flex justify-center border-y border-border/60 glass py-3">
      <div className="flex items-center gap-3">
        <span className="hidden text-xs uppercase tracking-widest text-muted-foreground sm:block">
          {t<string>("profileSwitch.label")}
        </span>
        <div className="relative flex items-center rounded-full border border-border bg-secondary/40 p-1">
          {(["admin", "tech"] as const).map((p) => {
            const active = profile === p;
            const Icon = p === "admin" ? Briefcase : Code2;
            return (
              <button
                key={p}
                onClick={() => setProfile(p)}
                aria-pressed={active}
                className={cn(
                  "relative z-10 flex items-center gap-2 rounded-full px-4 py-2 text-xs font-medium transition-colors sm:text-sm",
                  active ? "text-primary-foreground" : "text-muted-foreground hover:text-foreground",
                )}
              >
                {active && (
                  <motion.span
                    layoutId="profile-pill"
                    className="absolute inset-0 -z-10 rounded-full bg-primary santino-glow"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <Icon size={14} />
                {t<string>(`profileSwitch.${p}`)}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
