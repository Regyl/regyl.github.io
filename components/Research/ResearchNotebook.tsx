"use client";

import { useState } from "react";
import { researchTopics } from "@/data/research";
import { Section } from "@/components/ui/Section";
import { GlowCard } from "@/components/ui/GlowCard";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import type { ResearchTopic } from "@/data/research";

export function ResearchNotebook() {
  const [selected, setSelected] = useState<ResearchTopic | null>(null);

  return (
    <Section
      id="research"
      title="Things I want to investigate"
      subtitle="Research interests — not published work."
      badge={
        <Badge variant="outline" className="font-mono text-xs">
          Research interests — not published work
        </Badge>
      }
    >
      <div
        className="rounded-xl border border-border p-6"
        style={{
          backgroundImage:
            "repeating-linear-gradient(transparent, transparent 27px, rgba(255,255,255,0.03) 27px, rgba(255,255,255,0.03) 28px)",
        }}
      >
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {researchTopics.map((topic) => (
            <GlowCard
              key={topic.id}
              as="button"
              onClick={() => setSelected(topic)}
              className="text-left"
            >
              <span className="font-mono text-xs text-brand">Research note #{topic.id.slice(0, 4)}</span>
              <h3 className="mt-2 text-base font-semibold">{topic.title}</h3>
              <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{topic.problem}</p>
            </GlowCard>
          ))}
        </div>
      </div>

      <Dialog open={!!selected} onOpenChange={(open) => !open && setSelected(null)}>
        <DialogContent className="max-h-[85vh] overflow-y-auto sm:max-w-lg">
          {selected && (
            <>
              <DialogHeader>
                <DialogTitle>{selected.title}</DialogTitle>
                <DialogDescription>Research interest — exploratory notes</DialogDescription>
              </DialogHeader>
              <div className="space-y-4 pt-2">
                <ResearchField label="Problem" content={selected.problem} />
                <ResearchField label="Why it matters" content={selected.whyItMatters} />
                <ResearchField label="Potential approach" content={selected.potentialApproach} />
                <div>
                  <h4 className="font-mono text-xs uppercase text-brand">Open questions</h4>
                  <ul className="mt-2 space-y-1">
                    {selected.openQuestions.map((q, i) => (
                      <li key={i} className="text-sm text-muted-foreground">
                        • {q}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </Section>
  );
}

function ResearchField({ label, content }: { label: string; content: string }) {
  return (
    <div>
      <h4 className="font-mono text-xs uppercase text-brand">{label}</h4>
      <p className="mt-1 text-sm text-muted-foreground">{content}</p>
    </div>
  );
}
