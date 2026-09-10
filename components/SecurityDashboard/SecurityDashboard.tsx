"use client";

import { useState } from "react";
import { socStatusItems } from "@/data/soc-status";
import { Section } from "@/components/ui/Section";
import { StatusDot } from "@/components/ui/StatusDot";
import { cn } from "@/lib/utils";

export function SecurityDashboard() {
  const [selected, setSelected] = useState<string | null>(null);

  const selectedItem = socStatusItems.find((item) => item.id === selected);

  return (
    <Section
      id="security"
      title="Security Operations Center"
      subtitle="Click a status row. Humor is subtle. Concerns are real."
    >
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="glass rounded-xl font-mono text-sm">
          <div className="border-b border-border px-4 py-3 text-xs uppercase tracking-widest text-muted-foreground">
            Security Status
          </div>
          <div aria-label="System status indicators">
            {socStatusItems.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setSelected(item.id)}
                className={cn(
                  "flex w-full items-center justify-between border-b border-border px-4 py-3 text-left transition-colors last:border-0",
                  "hover:bg-muted/50 focus-visible:bg-muted/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-brand",
                  selected === item.id && "bg-muted/30"
                )}
                aria-pressed={selected === item.id}
              >
                <span className="flex items-center gap-3">
                  <StatusDot status={item.status} pulse={item.status !== "stable"} />
                  <span>{item.label}</span>
                </span>
                <span className="text-xs text-muted-foreground">{item.statusLabel}</span>
              </button>
            ))}
          </div>
        </div>

        <div
          className="glass flex min-h-[200px] flex-col justify-center rounded-xl p-6"
          aria-live="polite"
        >
          {selectedItem ? (
            <>
              <p className="font-mono text-xs uppercase text-brand">{selectedItem.label}</p>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {selectedItem.message}
              </p>
            </>
          ) : (
            <p className="text-sm text-muted-foreground">
              Select a system to view status details.
            </p>
          )}
        </div>
      </div>
    </Section>
  );
}
