import { eugene } from "@/data/eugene";
import { Section } from "@/components/ui/Section";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { LinkButton } from "@/components/ui/LinkButton";
import { Code2, Link, Mail, FileText } from "lucide-react";

export function OpenToOpportunities() {
  return (
    <Section id="contact" title="Open to opportunities" className="pb-32">
      <div className="glass relative overflow-hidden rounded-2xl p-8 md:p-12">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-brand/10 via-transparent to-transparent" />

        <div className="relative max-w-2xl">
          <h3 className="text-2xl font-bold md:text-3xl">
            Looking for my next difficult problem.
          </h3>
          <p className="mt-4 font-mono text-brand">
            {eugene.location.openTo.join(" • ")}
          </p>
          <p className="mt-4 text-lg text-muted-foreground">
            If you&apos;re building something technically interesting, let&apos;s talk.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <MagneticButton href={eugene.links.github} target="_blank" rel="noopener noreferrer">
              <Code2 className="mr-2 h-4 w-4" aria-hidden="true" />
              GitHub
            </MagneticButton>
            <LinkButton href={eugene.links.linkedin} variant="outline" external>
              <Link className="mr-2 h-4 w-4" aria-hidden="true" />
              LinkedIn
            </LinkButton>
            <LinkButton href={`mailto:${eugene.email}`} variant="outline">
              <Mail className="mr-2 h-4 w-4" aria-hidden="true" />
              Email
            </LinkButton>
            <LinkButton href={eugene.resumePath} variant="outline" download>
              <FileText className="mr-2 h-4 w-4" aria-hidden="true" />
              Download Resume
            </LinkButton>
          </div>

          <p className="mt-6 font-mono text-xs text-muted-foreground">
            Email: <span className="placeholder-badge">{eugene.email}</span>
          </p>
        </div>
      </div>
    </Section>
  );
}
