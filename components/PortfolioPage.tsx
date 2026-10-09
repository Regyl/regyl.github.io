"use client";

import { useRecruiterMode } from "@/lib/hooks/useRecruiterMode";
import { Nav } from "@/components/Nav/Nav";
import { Hero } from "@/components/Hero/Hero";
import { DeveloperProfile } from "@/components/About/DeveloperProfile";
import { EngineeringPhilosophy } from "@/components/Philosophy/EngineeringPhilosophy";
import { AchievementTimeline } from "@/components/Achievements/AchievementTimeline";
import { ResumeViewer } from "@/components/Resume/ResumeViewer";
import { OpenToOpportunities } from "@/components/Contact/OpenToOpportunities";
import { RecruiterView } from "@/components/RecruiterMode/RecruiterView";
import { CommandPalette } from "@/components/CommandPalette/CommandPalette";
import { Footer } from "@/components/Footer/Footer";

export function PortfolioPage() {
  const { isRecruiterMode } = useRecruiterMode();

  if (isRecruiterMode) {
    return (
      <>
        <Nav />
        <RecruiterView />
        <Footer />
        <CommandPalette />
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
        <EngineeringPhilosophy />
        <AchievementTimeline />
        <ResumeViewer />
        <OpenToOpportunities />
      </main>
      <Footer />
      <CommandPalette />
    </>
  );
}
