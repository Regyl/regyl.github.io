"use client";

import { achievements } from "@/data/achievements";
import { Section } from "@/components/ui/Section";
import { cn } from "@/lib/utils";

export function AchievementTimeline() {
  return (
    <Section
      id="achievements"
      title="Achievements"
      subtitle="Known milestones and room for more."
    >
      <div className="relative ml-4 border-l border-border pl-8 md:ml-8">
        {achievements.map((achievement, i) => (
          <div key={i} className="relative pb-12 last:pb-0">
            <span
              className={cn(
                "absolute -left-[calc(2rem+5px)] top-1 h-2.5 w-2.5 rounded-full md:-left-[calc(2rem+5px)]",
                achievement.isPlaceholder
                  ? "border border-dashed border-muted-foreground bg-transparent"
                  : "bg-brand shadow-[0_0_8px_var(--brand-glow)]"
              )}
              aria-hidden="true"
            />
            {achievement.year > 0 && (
              <span className="font-mono text-sm text-brand">{achievement.year}</span>
            )}
            <h3
              className={cn(
                "mt-1 text-lg font-semibold",
                achievement.isPlaceholder && "text-muted-foreground"
              )}
            >
              {achievement.title}
            </h3>
            <ul className="mt-2 space-y-1">
              {achievement.items.map((item, j) => (
                <li key={j} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span className="text-brand" aria-hidden="true">
                    ├─
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}
