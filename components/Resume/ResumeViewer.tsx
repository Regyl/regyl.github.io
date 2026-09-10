"use client";

import { eugene } from "@/data/eugene";
import { achievements } from "@/data/achievements";
import { researchTopics } from "@/data/research";
import { Section } from "@/components/ui/Section";
import { LinkButton } from "@/components/ui/LinkButton";
import { FileText, Download } from "lucide-react";

export function ResumeViewer() {
  return (
    <Section
      id="resume"
      title="Resume"
      subtitle="Interactive preview. Replace placeholders with real content."
    >
      <div className="grid gap-6 lg:grid-cols-[1fr_auto]">
        <div className="glass rounded-xl p-6 font-mono text-sm">
          <header className="border-b border-border pb-4">
            <h3 className="text-xl font-bold tracking-wide">{eugene.name.toUpperCase()}</h3>
            <p className="mt-1 text-muted-foreground">{eugene.role}</p>
          </header>

          <ResumeSection title="Experience">
            <p>~{eugene.experienceYears} years in software engineering</p>
            <p className="mt-2 placeholder-badge inline-block">[PLACEHOLDER] Work history</p>
            <p className="mt-2 text-xs text-muted-foreground">
              Add employers, roles, and dates here.
            </p>
          </ResumeSection>

          <ResumeSection title="Skills">
            <div className="flex flex-wrap gap-2">
              {eugene.primaryTechnologies.map((tech) => (
                <span
                  key={tech}
                  className="rounded border border-border px-2 py-0.5 text-xs"
                >
                  {tech}
                </span>
              ))}
            </div>
          </ResumeSection>

          <ResumeSection title="Achievements">
            {achievements
              .filter((a) => !a.isPlaceholder)
              .map((a) => (
                <div key={a.year} className="mb-2">
                  <span className="text-brand">{a.year}</span> — {a.title}: {a.items.join(", ")}
                </div>
              ))}
          </ResumeSection>

          <ResumeSection title="Research Interests">
            <ul className="space-y-1 text-muted-foreground">
              {researchTopics.slice(0, 4).map((t) => (
                <li key={t.id}>• {t.title}</li>
              ))}
            </ul>
          </ResumeSection>
        </div>

        <div className="flex flex-col gap-3">
          <LinkButton href={eugene.resumePath} download>
            <Download className="mr-2 h-4 w-4" aria-hidden="true" />
            Download PDF
          </LinkButton>
          <p className="max-w-[200px] text-xs text-muted-foreground">
            <FileText className="mb-1 inline h-3 w-3" aria-hidden="true" /> Placeholder at{" "}
            <code className="text-brand">{eugene.resumePath}</code>
          </p>
        </div>
      </div>
    </Section>
  );
}

function ResumeSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-6">
      <h4 className="text-xs uppercase tracking-widest text-brand">{title}</h4>
      <div className="mt-1 h-px w-full bg-border" aria-hidden="true" />
      <div className="mt-3">{children}</div>
    </section>
  );
}
