"use client";

import { useState } from "react";
import { projects } from "@/data/projects";
import { Section } from "@/components/ui/Section";
import { GlowCard } from "@/components/ui/GlowCard";
import { Badge } from "@/components/ui/badge";
import { LinkButton } from "@/components/ui/LinkButton";
import { Code2, ChevronDown, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";

function ArchitectureDiagram({
  nodes,
  edges,
}: {
  nodes: { id: string; label: string; x: number; y: number }[];
  edges: { from: string; to: string }[];
}) {
  const nodeMap = Object.fromEntries(nodes.map((n) => [n.id, n]));

  return (
    <svg viewBox="0 0 300 200" className="w-full max-w-sm" aria-hidden="true">
      {edges.map((edge, i) => {
        const from = nodeMap[edge.from];
        const to = nodeMap[edge.to];
        if (!from || !to) return null;
        return (
          <line
            key={i}
            x1={from.x}
            y1={from.y + 20}
            x2={to.x}
            y2={to.y}
            stroke="rgba(59,130,246,0.4)"
            strokeWidth="1.5"
            markerEnd="url(#arrow)"
          />
        );
      })}
      <defs>
        <marker id="arrow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6" fill="rgba(59,130,246,0.6)" />
        </marker>
      </defs>
      {nodes.map((node) => (
        <g key={node.id}>
          <rect
            x={node.x - 40}
            y={node.y}
            width="80"
            height="28"
            rx="4"
            fill="#111113"
            stroke="rgba(255,255,255,0.12)"
          />
          <text
            x={node.x}
            y={node.y + 18}
            textAnchor="middle"
            fill="#fafafa"
            fontSize="10"
            fontFamily="monospace"
          >
            {node.label}
          </text>
        </g>
      ))}
    </svg>
  );
}

export function ProjectGrid() {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <Section
      id="projects"
      title="Projects"
      subtitle="Real engineering problems. Placeholder content where details are pending."
    >
      <div className="flex flex-col gap-6">
        {projects.map((project) => {
          const isExpanded = expanded === project.id;
          return (
            <GlowCard key={project.id} className="overflow-hidden p-0">
              <button
                type="button"
                className="flex w-full flex-col gap-4 p-6 text-left md:flex-row md:items-start md:justify-between"
                onClick={() => setExpanded(isExpanded ? null : project.id)}
                aria-expanded={isExpanded}
              >
                <div className="flex-1">
                  <div className="mb-2 flex flex-wrap items-center gap-2">
                    <h3 className="text-xl font-semibold">{project.title}</h3>
                    {project.isPlaceholder && (
                      <span className="placeholder-badge">PLACEHOLDER</span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">{project.description}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <Badge key={tech} variant="secondary" className="font-mono text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
                <ChevronDown
                  className={cn(
                    "h-5 w-5 shrink-0 text-muted-foreground transition-transform",
                    isExpanded && "rotate-180"
                  )}
                  aria-hidden="true"
                />
              </button>

              {isExpanded && (
                <div className="border-t border-border px-6 pb-6">
                  <div className="grid gap-6 pt-6 md:grid-cols-2">
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-mono text-xs uppercase text-brand">Problem</h4>
                        <p className="mt-1 text-sm text-muted-foreground">{project.problem}</p>
                      </div>
                      <div>
                        <h4 className="font-mono text-xs uppercase text-brand">Architecture</h4>
                        <p className="mt-1 text-sm text-muted-foreground">{project.architecture}</p>
                      </div>
                      <div>
                        <h4 className="font-mono text-xs uppercase text-brand">
                          Engineering Challenge
                        </h4>
                        <p className="mt-1 text-sm text-muted-foreground">
                          {project.engineeringChallenge}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <LinkButton href={project.github} size="sm" variant="outline" external>
                          <Code2 className="mr-2 h-4 w-4" aria-hidden="true" />
                          GitHub
                        </LinkButton>
                        {project.demo && (
                          <LinkButton href={project.demo} size="sm" variant="outline" external>
                            <ExternalLink className="mr-2 h-4 w-4" aria-hidden="true" />
                            Demo
                          </LinkButton>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center justify-center rounded-lg border border-border bg-background/50 p-4">
                      <ArchitectureDiagram
                        nodes={project.architectureNodes}
                        edges={project.architectureEdges}
                      />
                    </div>
                  </div>
                </div>
              )}
            </GlowCard>
          );
        })}
      </div>
    </Section>
  );
}
