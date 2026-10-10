"use client";

import { eugene } from "@/data/eugene";
import { achievements } from "@/data/achievements";
import { LinkButton } from "@/components/ui/LinkButton";
import { Code2, Link, FileText, MapPin } from "lucide-react";

export function RecruiterView() {
  const realAchievements = achievements.filter((a) => !a.isPlaceholder);

  return (
    <div className="mx-auto max-w-2xl px-4 py-24 sm:px-6 lg:px-8">
      <div className="glass rounded-2xl p-8">
        <p className="font-mono text-xs uppercase text-brand">Recruiter mode</p>
        <h1 className="mt-2 text-3xl font-bold">{eugene.name}</h1>
        <p className="mt-1 text-lg text-muted-foreground">{eugene.role}</p>

        <dl className="mt-8 space-y-6">
          <div>
            <dt className="font-mono text-xs uppercase text-muted-foreground">Experience</dt>
            <dd className="mt-1 text-lg">~{eugene.experienceYears} years</dd>
          </div>

          <div>
            <dt className="font-mono text-xs uppercase text-muted-foreground">
              Primary technologies
            </dt>
            <dd className="mt-2 flex flex-wrap gap-2">
              {eugene.primaryTechnologies.map((tech) => (
                <span
                  key={tech}
                  className="rounded border border-border px-2 py-1 font-mono text-xs"
                >
                  {tech}
                </span>
              ))}
            </dd>
          </div>

          <div>
            <dt className="font-mono text-xs uppercase text-muted-foreground">Achievements</dt>
            <dd className="mt-2 space-y-2">
              {realAchievements.map((a) => (
                <div key={a.year} className="text-sm">
                  <span className="text-brand">{a.year}</span> — {a.title}: {a.items.join(", ")}
                </div>
              ))}
            </dd>
          </div>

          <div>
            <dt className="font-mono text-xs uppercase text-muted-foreground">Relocation</dt>
            <dd className="mt-1 flex items-center gap-2 text-sm">
              <MapPin className="h-4 w-4 text-brand" aria-hidden="true" />
              Open to {eugene.location.openTo.join(", ")} · Origin: {eugene.location.origin}
            </dd>
          </div>
        </dl>

        <div className="mt-8 flex flex-wrap gap-3">
          <LinkButton href={eugene.links.github} external>
            <Code2 className="mr-2 h-4 w-4" aria-hidden="true" />
            GitHub
          </LinkButton>
          <LinkButton href={eugene.links.linkedin} variant="outline" external>
            <Link className="mr-2 h-4 w-4" aria-hidden="true" />
            LinkedIn
          </LinkButton>
          <LinkButton href={eugene.resumePath} variant="outline" download>
            <FileText className="mr-2 h-4 w-4" aria-hidden="true" />
            Resume
          </LinkButton>
        </div>
      </div>
    </div>
  );
}
