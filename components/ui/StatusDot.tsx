"use client";

import { cn } from "@/lib/utils";
import type { StatusLevel } from "@/data/soc-status";

const statusColors: Record<StatusLevel, string> = {
  operational: "bg-emerald-500",
  stable: "bg-blue-500",
  suspicious: "bg-amber-500",
  watching: "bg-red-500",
};

interface StatusDotProps {
  status: StatusLevel;
  className?: string;
  pulse?: boolean;
}

export function StatusDot({ status, className, pulse = true }: StatusDotProps) {
  return (
    <span className={cn("relative inline-flex h-2.5 w-2.5", className)} aria-hidden="true">
      {pulse && status !== "stable" && (
        <span
          className={cn(
            "absolute inline-flex h-full w-full animate-ping rounded-full opacity-40",
            statusColors[status]
          )}
        />
      )}
      <span className={cn("relative inline-flex h-2.5 w-2.5 rounded-full", statusColors[status])} />
    </span>
  );
}
