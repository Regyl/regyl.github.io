"use client";

import { createContext, useContext, useEffect, useState, useCallback } from "react";

interface RecruiterModeContextValue {
  isRecruiterMode: boolean;
  toggleRecruiterMode: () => void;
  setRecruiterMode: (value: boolean) => void;
}

const RecruiterModeContext = createContext<RecruiterModeContextValue | null>(null);

const STORAGE_KEY = "eugene-portfolio-recruiter-mode";

export function RecruiterModeProvider({ children }: { children: React.ReactNode }) {
  const [isRecruiterMode, setIsRecruiterMode] = useState(() => {
    if (typeof window === "undefined") return false;
    return localStorage.getItem(STORAGE_KEY) === "true";
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, String(isRecruiterMode));
  }, [isRecruiterMode]);

  const toggleRecruiterMode = useCallback(() => {
    setIsRecruiterMode((prev) => !prev);
  }, []);

  const setRecruiterMode = useCallback((value: boolean) => {
    setIsRecruiterMode(value);
  }, []);

  return (
    <RecruiterModeContext.Provider
      value={{ isRecruiterMode, toggleRecruiterMode, setRecruiterMode }}
    >
      {children}
    </RecruiterModeContext.Provider>
  );
}

export function useRecruiterMode() {
  const context = useContext(RecruiterModeContext);
  if (!context) {
    throw new Error("useRecruiterMode must be used within RecruiterModeProvider");
  }
  return context;
}
