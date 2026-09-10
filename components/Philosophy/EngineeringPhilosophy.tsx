"use client";

import { philosophyPrinciples } from "@/data/philosophy";
import { jokes } from "@/data/jokes";
import { Section } from "@/components/ui/Section";
import { motion, useReducedMotion } from "framer-motion";

export function EngineeringPhilosophy() {
  const prefersReducedMotion = useReducedMotion();
  const philosophyJoke = jokes.find((j) => j.location === "philosophy");

  return (
    <Section
      id="philosophy"
      title="Engineering Philosophy"
      subtitle="Principles, not motivational posters."
    >
      <div className="grid gap-4 md:grid-cols-2">
        {philosophyPrinciples.map((principle, i) => (
          <motion.blockquote
            key={principle.id}
            initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.3, delay: i * 0.05 }}
            className="glass relative rounded-xl border-l-2 border-l-brand p-6"
          >
            <p className="text-base leading-relaxed md:text-lg">&ldquo;{principle.text}&rdquo;</p>
          </motion.blockquote>
        ))}
      </div>

      {philosophyJoke && (
        <p className="mt-8 text-center font-mono text-xs text-muted-foreground/60">
          {philosophyJoke.text}
        </p>
      )}
    </Section>
  );
}
