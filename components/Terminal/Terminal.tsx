"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  bootSequence,
  findCommand,
  getCommandSuggestions,
} from "@/data/terminal-commands";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "framer-motion";

interface TerminalLine {
  type: "input" | "output" | "system";
  content: string;
}

function getInitialBootState(): { lines: TerminalLine[]; complete: boolean } {
  if (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  ) {
    return {
      lines: bootSequence.map((content) => ({ type: "system" as const, content })),
      complete: true,
    };
  }
  return { lines: [], complete: false };
}

export function Terminal() {
  const initialBoot = getInitialBootState();
  const [lines, setLines] = useState<TerminalLine[]>(initialBoot.lines);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [bootComplete, setBootComplete] = useState(initialBoot.complete);
  const outputRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion || bootComplete) return;

    let i = 0;
    const interval = setInterval(() => {
      if (i < bootSequence.length) {
        setLines((prev) => [...prev, { type: "system", content: bootSequence[i] }]);
        i++;
      } else {
        clearInterval(interval);
        setBootComplete(true);
      }
    }, 80);

    return () => clearInterval(interval);
  }, [prefersReducedMotion, bootComplete]);

  useEffect(() => {
    outputRef.current?.scrollTo({ top: outputRef.current.scrollHeight, behavior: "smooth" });
  }, [lines]);

  const executeCommand = useCallback(
    (cmd: string) => {
      const trimmed = cmd.trim();
      if (!trimmed) return;

      setLines((prev) => [...prev, { type: "input", content: `eugene@portfolio:~$ ${trimmed}` }]);
      setHistory((prev) => [...prev, trimmed]);
      setHistoryIndex(-1);

      const command = findCommand(trimmed);
      if (command) {
        const response = Array.isArray(command.response) ? command.response : [command.response];
        if (command.animated && !prefersReducedMotion) {
          let j = 0;
          const animInterval = setInterval(() => {
            if (j < response.length) {
              setLines((prev) => [...prev, { type: "output", content: response[j] }]);
              j++;
            } else {
              clearInterval(animInterval);
            }
          }, 120);
        } else {
          response.forEach((line) => {
            setLines((prev) => [...prev, { type: "output", content: line }]);
          });
        }
      } else {
        setLines((prev) => [
          ...prev,
          { type: "output", content: `Command not found: ${trimmed}` },
          { type: "output", content: 'Type "help" for available commands.' },
        ]);
      }
    },
    [prefersReducedMotion]
  );

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      executeCommand(input);
      setInput("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (history.length === 0) return;
      const newIndex = historyIndex === -1 ? history.length - 1 : Math.max(0, historyIndex - 1);
      setHistoryIndex(newIndex);
      setInput(history[newIndex]);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex === -1) return;
      const newIndex = historyIndex + 1;
      if (newIndex >= history.length) {
        setHistoryIndex(-1);
        setInput("");
      } else {
        setHistoryIndex(newIndex);
        setInput(history[newIndex]);
      }
    } else if (e.key === "Tab") {
      e.preventDefault();
      const suggestions = getCommandSuggestions(input.trim().toLowerCase());
      if (suggestions.length === 1) {
        setInput(suggestions[0]);
      }
    }
  }

  return (
    <div
      className="glass flex h-[320px] flex-col overflow-hidden rounded-xl md:h-[380px]"
      onClick={() => inputRef.current?.focus()}
      role="region"
      aria-label="Interactive terminal"
    >
      <div className="flex items-center gap-2 border-b border-border px-4 py-3">
        <span className="h-3 w-3 rounded-full bg-red-500/80" aria-hidden="true" />
        <span className="h-3 w-3 rounded-full bg-amber-500/80" aria-hidden="true" />
        <span className="h-3 w-3 rounded-full bg-emerald-500/80" aria-hidden="true" />
        <span className="ml-2 font-mono text-xs text-muted-foreground">eugene@portfolio</span>
      </div>

      <div
        ref={outputRef}
        className="flex-1 overflow-y-auto p-4 font-mono text-sm leading-relaxed"
        role="log"
        aria-live="polite"
        aria-relevant="additions"
      >
        {lines.map((line, i) => (
          <div
            key={i}
            className={cn(
              line.type === "input" && "text-brand",
              line.type === "output" && "text-muted-foreground",
              line.type === "system" && "text-foreground"
            )}
          >
            {line.content || "\u00A0"}
          </div>
        ))}
        {bootComplete && (
          <div className="mt-1 flex items-center gap-2">
            <span className="text-brand">eugene@portfolio:~$</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 bg-transparent outline-none"
              aria-label="Terminal command input"
              autoComplete="off"
              spellCheck={false}
            />
            <span className="animate-pulse text-brand" aria-hidden="true">
              ▋
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
