"use client";

import { cn } from "@/lib/utils";
import { motion, useReducedMotion } from "framer-motion";

interface GlowCardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  as?: "div" | "button";
  expanded?: boolean;
}

export function GlowCard({
  children,
  className,
  onClick,
  as = "div",
  expanded,
}: GlowCardProps) {
  const prefersReducedMotion = useReducedMotion();
  const Component = as === "button" ? motion.button : motion.div;

  return (
    <Component
      type={as === "button" ? "button" : undefined}
      onClick={onClick}
      className={cn(
        "glass group relative rounded-xl p-6 text-left transition-colors",
        "hover:border-brand/30 hover:shadow-[0_0_20px_var(--brand-glow)]",
        "focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        expanded && "border-brand/30 shadow-[0_0_20px_var(--brand-glow)]",
        className
      )}
      whileHover={prefersReducedMotion ? undefined : { y: -2 }}
      transition={{ duration: 0.2 }}
    >
      {children}
    </Component>
  );
}
