"use client";

import { eugene } from "@/data/eugene";
import { Terminal } from "@/components/Terminal/Terminal";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { LinkButton } from "@/components/ui/LinkButton";
import { Code2, Link, FileText, Mail, BookOpen } from "lucide-react";

export function Hero() {
  return (
    <section
      id="home"
      className="relative scroll-mt-20 overflow-hidden pt-28 pb-16 md:pt-36 md:pb-24"
      aria-labelledby="hero-heading"
    >
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-brand/5 via-transparent to-transparent" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <p className="font-mono text-sm text-brand">$ whoami</p>
              <h1 id="hero-heading" className="text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
                {eugene.name}
              </h1>
              <p className="font-mono text-base text-muted-foreground md:text-lg">{eugene.role}</p>
            </div>

            <p className="text-xl font-medium leading-snug text-gradient md:text-2xl">
              {eugene.headline}
            </p>
            <p className="text-muted-foreground">{eugene.subheadline}</p>

            <div className="flex flex-wrap gap-3">
              <MagneticButton href={eugene.links.github} target="_blank" rel="noopener noreferrer">
                <Code2 className="mr-2 h-4 w-4" aria-hidden="true" />
                GitHub
              </MagneticButton>
              <LinkButton href={eugene.links.linkedin} variant="outline" external>
                <Link className="mr-2 h-4 w-4" aria-hidden="true" />
                LinkedIn
              </LinkButton>
              <LinkButton href={eugene.resumePath} variant="outline" download>
                <FileText className="mr-2 h-4 w-4" aria-hidden="true" />
                Resume
              </LinkButton>
              <LinkButton href="#contact" variant="outline">
                <Mail className="mr-2 h-4 w-4" aria-hidden="true" />
                Contact
              </LinkButton>
            </div>

            <div className="flex flex-wrap gap-4 pt-2">
              <a
                href={eugene.links.medium}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                <BookOpen className="h-4 w-4" aria-hidden="true" />
                Medium
              </a>
              <a
                href={eugene.links.leetcode}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                <Code2 className="h-4 w-4" aria-hidden="true" />
                LeetCode
              </a>
            </div>
          </div>

          <Terminal />
        </div>
      </div>
    </section>
  );
}
