"use client";

import { useState, useCallback } from "react";
import { interviewCategories, getRandomQuestion } from "@/lib/interview";
import type { InterviewCategory, InterviewQuestion } from "@/data/interview-questions";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "framer-motion";

interface InterviewModeProps {
  initialQuestion?: string;
}

export function InterviewMode({ initialQuestion }: InterviewModeProps) {
  const [category, setCategory] = useState<InterviewCategory | undefined>();
  const [current, setCurrent] = useState<InterviewQuestion | null>(null);
  const [revealed, setRevealed] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  const loadQuestion = useCallback((cat?: InterviewCategory) => {
    const q = getRandomQuestion(cat);
    setCurrent(q);
    setRevealed(false);
    setCategory(cat ?? q.category);
  }, []);

  const externalQuestion: InterviewQuestion | null = initialQuestion
    ? {
        id: "external",
        category: "System Design",
        question: initialQuestion,
        approach:
          "Think through requirements, constraints, and tradeoffs before jumping to a solution.",
      }
    : null;

  const activeQuestion = externalQuestion ?? current;

  return (
    <Section
      id="interview"
      title="Interview me"
      subtitle="Pick a category. I'll give you a question. Think first — then reveal my approach."
    >
      <div className="glass rounded-xl p-6">
        <div className="mb-6 flex flex-wrap gap-2">
          {interviewCategories.map((cat) => (
            <Button
              key={cat}
              variant={category === cat ? "default" : "outline"}
              size="sm"
              onClick={() => loadQuestion(cat)}
            >
              {cat}
            </Button>
          ))}
        </div>

        <div className="mb-4 flex flex-wrap gap-3">
          <Button onClick={() => loadQuestion(category)}>New question</Button>
          <Button variant="outline" onClick={() => loadQuestion("System Design")}>
            Ask me a system design question
          </Button>
        </div>

        {activeQuestion ? (
          <div className="space-y-4">
            <Badge variant="secondary" className="font-mono">
              {activeQuestion.category.toUpperCase()}
            </Badge>
            <p className="text-lg font-medium">{activeQuestion.question}</p>

            {!revealed ? (
              <Button variant="outline" onClick={() => setRevealed(true)}>
                Reveal Eugene&apos;s approach
              </Button>
            ) : (
              <div
                className={cn(
                  "rounded-lg border border-border bg-background/50 p-4",
                  !prefersReducedMotion && "animate-in fade-in duration-300"
                )}
              >
                <p className="font-mono text-xs uppercase text-brand">Approach</p>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {activeQuestion.approach}
                </p>
              </div>
            )}
          </div>
        ) : (
          <p className="text-muted-foreground">
            Select a category or click &ldquo;Ask me a system design question&rdquo; to begin.
          </p>
        )}
      </div>
    </Section>
  );
}
