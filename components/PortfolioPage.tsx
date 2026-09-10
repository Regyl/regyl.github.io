"use client";

import dynamic from "next/dynamic";
import { useRecruiterMode } from "@/lib/hooks/useRecruiterMode";
import { Nav } from "@/components/Nav/Nav";
import { Hero } from "@/components/Hero/Hero";
import { DeveloperProfile } from "@/components/About/DeveloperProfile";
import { EngineeringCards } from "@/components/Skills/EngineeringCards";
import { ProjectGrid } from "@/components/Projects/ProjectGrid";
import { SecurityDashboard } from "@/components/SecurityDashboard/SecurityDashboard";
import { EngineeringPhilosophy } from "@/components/Philosophy/EngineeringPhilosophy";
import { ResearchNotebook } from "@/components/Research/ResearchNotebook";
import { AchievementTimeline } from "@/components/Achievements/AchievementTimeline";
import { ResumeViewer } from "@/components/Resume/ResumeViewer";
import { OpenToOpportunities } from "@/components/Contact/OpenToOpportunities";
import { RecruiterView } from "@/components/RecruiterMode/RecruiterView";
import { CommandPalette } from "@/components/CommandPalette/CommandPalette";
import { Footer } from "@/components/Footer/Footer";
import { useState } from "react";

const DistributedPlayground = dynamic(
  () =>
    import("@/components/Playground/DistributedPlayground").then(
      (m) => m.DistributedPlayground
    ),
  { ssr: false, loading: () => <SectionSkeleton title="Distributed System Playground" /> }
);

const InterviewMode = dynamic(
  () => import("@/components/Interview/InterviewMode").then((m) => m.InterviewMode),
  { ssr: false, loading: () => <SectionSkeleton title="Interview me" /> }
);

function SectionSkeleton({ title }: { title: string }) {
  return (
    <div className="py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <p className="font-mono text-sm uppercase tracking-widest text-brand">{title}</p>
        <div className="mt-8 h-48 animate-pulse rounded-xl bg-muted/30" />
      </div>
    </div>
  );
}

export function PortfolioPage() {
  const { isRecruiterMode } = useRecruiterMode();
  const [interviewQuestion, setInterviewQuestion] = useState<string | undefined>();

  if (isRecruiterMode) {
    return (
      <>
        <Nav />
        <RecruiterView />
        <Footer />
        <CommandPalette onInterviewQuestion={setInterviewQuestion} />
      </>
    );
  }

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[200] focus:rounded-md focus:bg-brand focus:px-4 focus:py-2 focus:text-white"
      >
        Skip to content
      </a>
      <Nav />
      <main id="main-content">
        <Hero />
        <DeveloperProfile />
        <EngineeringCards />
        <ProjectGrid />
        <SecurityDashboard />
        <EngineeringPhilosophy />
        <ResearchNotebook />
        <AchievementTimeline />
        <DistributedPlayground />
        <InterviewMode initialQuestion={interviewQuestion} />
        <ResumeViewer />
        <OpenToOpportunities />
      </main>
      <Footer />
      <CommandPalette onInterviewQuestion={setInterviewQuestion} />
    </>
  );
}
