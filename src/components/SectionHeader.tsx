import { motion } from "framer-motion";

export default function SectionHeader({
                                        kicker,
                                        title,
                                      }: {
  kicker: string;
  title: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5 }}
    >
      <p className="text-xs uppercase tracking-[0.24em] text-primary">{kicker}</p>
      <h2 className="mt-3 font-display text-4xl text-foreground sm:text-5xl">{title}</h2>
      <div className="mt-4 h-px w-16 bg-primary" />
    </motion.div>
  );
}
