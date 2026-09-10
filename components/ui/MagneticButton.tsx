"use client";

import { useRef, useState } from "react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "framer-motion";
import type { VariantProps } from "class-variance-authority";

interface MagneticButtonProps
  extends React.ComponentProps<"a">,
    VariantProps<typeof buttonVariants> {
  magneticStrength?: number;
}

export function MagneticButton({
  children,
  className,
  variant,
  size,
  magneticStrength = 0.15,
  ...props
}: MagneticButtonProps) {
  const ref = useRef<HTMLAnchorElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const prefersReducedMotion = useReducedMotion();

  function handleMouseMove(e: React.MouseEvent) {
    if (prefersReducedMotion || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * magneticStrength;
    const y = (e.clientY - rect.top - rect.height / 2) * magneticStrength;
    setOffset({ x, y });
  }

  function handleMouseLeave() {
    setOffset({ x: 0, y: 0 });
  }

  return (
    <a
      ref={ref}
      className={cn(buttonVariants({ variant, size, className }), "transition-transform duration-200")}
      style={{ transform: `translate(${offset.x}px, ${offset.y}px)` }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      {children}
    </a>
  );
}
