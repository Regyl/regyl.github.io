"use client";

import { MotionConfig } from "framer-motion";
import { TooltipProvider } from "@/components/ui/tooltip";
import { RecruiterModeProvider } from "@/lib/hooks/useRecruiterMode";
import { CommandPaletteProvider } from "@/lib/hooks/useCommandPalette";
import { ThemeProvider } from "@/lib/hooks/useTheme";
import { EasterEggProvider } from "@/components/EasterEggs/EasterEggProvider";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      <ThemeProvider>
        <TooltipProvider>
          <RecruiterModeProvider>
            <CommandPaletteProvider>
              <EasterEggProvider>{children}</EasterEggProvider>
            </CommandPaletteProvider>
          </RecruiterModeProvider>
        </TooltipProvider>
      </ThemeProvider>
    </MotionConfig>
  );
}
