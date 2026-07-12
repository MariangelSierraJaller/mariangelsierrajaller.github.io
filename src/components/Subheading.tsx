import { motion } from "framer-motion";
import { type ReactNode } from "react";

export default function Subheading({
                                     title,
                                     subtitle,
                                     icon,
                                     align = "center",
                                   }: {
  title: string;
  subtitle?: string;
  icon?: ReactNode;
  align?: "center" | "left";
}) {
  const alignCls = align === "center" ? "text-center items-center" : "text-left items-start";
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.4 }}
      className={`flex flex-col ${alignCls}`}
    >
      <div className={`inline-flex items-center gap-3 ${align === "center" ? "justify-center" : ""}`}>
        {icon ? (
          <span
            className="grid h-9 w-9 place-items-center rounded-full border border-primary/40 bg-primary/10 text-primary">
            {icon}
          </span>
        ) : null}
        <h3 className="font-display text-3xl font-bold text-primary md:text-4xl">
          {title}
        </h3>
      </div>
      {subtitle ? (
        <p className="mt-3 max-w-2xl text-sm text-muted-foreground md:text-base">
          {subtitle}
        </p>
      ) : null}
    </motion.div>
  );
}
