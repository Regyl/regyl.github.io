"use client";

import { useCallback, useState } from "react";
import { Command as CommandPrimitive } from "cmdk";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { useCommandPalette } from "@/lib/hooks/useCommandPalette";
import { useRecruiterMode } from "@/lib/hooks/useRecruiterMode";
import { useTheme } from "@/lib/hooks/useTheme";
import { eugene } from "@/data/eugene";
import {
  Code2,
  Link,
  FileText,
  Trophy,
  ToggleLeft,
  SunMoon,
} from "lucide-react";

export function CommandPalette() {
  const { isOpen, close } = useCommandPalette();
  const { toggleRecruiterMode } = useRecruiterMode();
  const { toggleTheme } = useTheme();
  const [search, setSearch] = useState("");

  const navigate = useCallback(
    (href: string) => {
      close();
      const el = document.querySelector(href);
      el?.scrollIntoView({ behavior: "smooth" });
    },
    [close]
  );

  const openExternal = useCallback(
    (url: string) => {
      close();
      window.open(url, "_blank", "noopener,noreferrer");
    },
    [close]
  );

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(nextOpen) => {
        if (!nextOpen) {
          setSearch("");
          close();
        }
      }}
    >
      <DialogContent className="overflow-hidden p-0 sm:max-w-lg" showCloseButton={false}>
        <DialogTitle className="sr-only">Command palette</DialogTitle>
        <CommandPrimitive className="flex flex-col" label="Command palette">
          <div className="border-b border-border px-4 py-3">
            <CommandPrimitive.Input
              value={search}
              onValueChange={setSearch}
              placeholder="Type a command or search..."
              className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
              aria-label="Search commands"
            />
          </div>
          <CommandPrimitive.List className="max-h-80 overflow-y-auto p-2">
            <CommandPrimitive.Empty className="py-6 text-center text-sm text-muted-foreground">
              No results found.
            </CommandPrimitive.Empty>

            <CommandPrimitive.Group heading="Navigate" className="px-2 py-1.5 text-xs text-muted-foreground">
              <CommandItem icon={Trophy} onSelect={() => navigate("#achievements")}>
                Go to Achievements
              </CommandItem>
            </CommandPrimitive.Group>

            <CommandPrimitive.Group heading="Links" className="px-2 py-1.5 text-xs text-muted-foreground">
              <CommandItem icon={Code2} onSelect={() => openExternal(eugene.links.github)}>
                Open GitHub
              </CommandItem>
              <CommandItem icon={Link} onSelect={() => openExternal(eugene.links.linkedin)}>
                Open LinkedIn
              </CommandItem>
              <CommandItem icon={FileText} onSelect={() => openExternal(eugene.resumePath)}>
                Open Resume
              </CommandItem>
            </CommandPrimitive.Group>

            <CommandPrimitive.Group heading="Actions" className="px-2 py-1.5 text-xs text-muted-foreground">
              <CommandItem icon={ToggleLeft} onSelect={() => { toggleRecruiterMode(); close(); }}>
                Toggle Recruiter Mode
              </CommandItem>
              <CommandItem
                icon={SunMoon}
                onSelect={() => {
                  toggleTheme();
                  close();
                }}
              >
                <span className="dark:hidden">Switch to dark theme</span>
                <span className="hidden dark:inline">Switch to light theme</span>
              </CommandItem>
            </CommandPrimitive.Group>
          </CommandPrimitive.List>
        </CommandPrimitive>
      </DialogContent>
    </Dialog>
  );
}

function CommandItem({
  children,
  onSelect,
  icon: Icon,
}: {
  children: React.ReactNode;
  onSelect: () => void;
  icon: React.ComponentType<{ className?: string }>;
}) {
  return (
    <CommandPrimitive.Item
      onSelect={onSelect}
      className="flex cursor-pointer items-center gap-3 rounded-md px-3 py-2.5 text-sm aria-selected:bg-muted"
    >
      <Icon className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
      {children}
    </CommandPrimitive.Item>
  );
}
