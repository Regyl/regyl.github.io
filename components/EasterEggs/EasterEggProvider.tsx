"use client";

import { useCallback, useState } from "react";
import { useKonamiCode } from "@/lib/hooks/useKonamiCode";
import { cn } from "@/lib/utils";

export function EasterEggProvider({ children }: { children: React.ReactNode }) {
  const [konamiActive, setKonamiActive] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const showToast = useCallback((message: string) => {
    setToast(message);
    setTimeout(() => setToast(null), 4000);
  }, []);

  useKonamiCode(
    useCallback(() => {
      setKonamiActive(true);
      showToast("Achievement unlocked: Senior Engineer");
      setTimeout(() => setKonamiActive(false), 2000);
    }, [showToast])
  );

  return (
    <>
      <div
        className={cn(
          "pointer-events-none fixed inset-0 z-[100] transition-opacity duration-500",
          konamiActive ? "opacity-100" : "opacity-0"
        )}
        aria-hidden="true"
      >
        <div className="absolute inset-0 bg-brand/10" />
        <div className="absolute inset-0 shadow-[inset_0_0_100px_rgba(59,130,246,0.3)]" />
      </div>

      {toast && (
        <div
          role="status"
          className="fixed bottom-6 left-1/2 z-[101] -translate-x-1/2 rounded-lg border border-brand/30 bg-card px-4 py-3 font-mono text-sm shadow-lg"
        >
          {toast}
        </div>
      )}

      {children}
    </>
  );
}
