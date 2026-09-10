"use client";

import { profilePillars } from "@/data/profile-pillars";
import { Section } from "@/components/ui/Section";
import { GlowCard } from "@/components/ui/GlowCard";

export function DeveloperProfile() {
  return (
    <Section
      id="profile"
      title="Why should you care?"
      subtitle="A developer profile, not an About Me paragraph."
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {profilePillars.map((pillar) => {
          const Icon = pillar.icon;
          return (
            <GlowCard key={pillar.id} className="flex flex-col gap-4">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-semibold">{pillar.title}</h3>
                  <p className="font-mono text-xs text-brand">{pillar.subtitle}</p>
                </div>
                <Icon
                  className="h-5 w-5 text-muted-foreground transition-colors group-hover:text-brand"
                  aria-hidden="true"
                />
              </div>
              <p className="text-sm leading-relaxed text-muted-foreground">{pillar.description}</p>
            </GlowCard>
          );
        })}
      </div>
    </Section>
  );
}
