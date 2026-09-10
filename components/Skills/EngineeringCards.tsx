"use client";

import { useState } from "react";
import { engineeringTopics } from "@/data/engineering-topics";
import { Section } from "@/components/ui/Section";
import { GlowCard } from "@/components/ui/GlowCard";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export function EngineeringCards() {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <Section
      id="engineering"
      title="Things I like breaking"
      subtitle="Engineering maturity through concepts, not percentage bars."
    >
      <div className="grid gap-4 sm:grid-cols-2">
        {engineeringTopics.map((topic) => {
          const isExpanded = expanded === topic.id;
          return (
            <GlowCard
              key={topic.id}
              as="button"
              expanded={isExpanded}
              onClick={() => setExpanded(isExpanded ? null : topic.id)}
              className="w-full"
              aria-expanded={isExpanded}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="text-left">
                  <h3 className="font-mono text-sm uppercase tracking-wide text-brand">
                    {topic.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">{topic.summary}</p>
                </div>
                <ChevronDown
                  className={cn(
                    "h-5 w-5 shrink-0 text-muted-foreground transition-transform",
                    isExpanded && "rotate-180"
                  )}
                  aria-hidden="true"
                />
              </div>

              {isExpanded && (
                <div className="mt-4 border-t border-border pt-4 text-left">
                  <p className="mb-3 text-sm font-medium">
                    I enjoy thinking about the uncomfortable questions:
                  </p>
                  <ul className="space-y-2">
                    {topic.questions.map((q, i) => (
                      <li key={i} className="font-mono text-xs text-muted-foreground">
                        → {q}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </GlowCard>
          );
        })}
      </div>
    </Section>
  );
}
