"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { Toggle } from "@/components/ui/toggle";
import { useRecruiterMode } from "@/lib/hooks/useRecruiterMode";
import { useCommandPalette } from "@/lib/hooks/useCommandPalette";
import { Menu, Command } from "lucide-react";

const navLinks = [
  { href: "#home", label: "Home" },
  { href: "#engineering", label: "Engineering" },
  { href: "#projects", label: "Projects" },
  { href: "#research", label: "Research" },
  { href: "#achievements", label: "Achievements" },
  { href: "#playground", label: "Playground" },
  { href: "#contact", label: "Contact" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { isRecruiterMode, setRecruiterMode } = useRecruiterMode();
  const { open: openPalette } = useCommandPalette();

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 20);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const visibleLinks = isRecruiterMode
    ? navLinks.filter((l) => ["Home", "Projects", "Contact"].includes(l.label))
    : navLinks;

  return (
    <header
      className={cn(
        "fixed top-0 z-50 w-full transition-all duration-300",
        scrolled ? "glass border-b shadow-sm" : "bg-transparent"
      )}
    >
      <nav
        className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8"
        aria-label="Main navigation"
      >
        <Link
          href="#home"
          className="font-mono text-sm font-medium text-foreground transition-colors hover:text-brand"
        >
          EN
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {visibleLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:ring-2 focus-visible:ring-brand"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={openPalette}
            className="hidden font-mono text-xs text-muted-foreground sm:flex"
            aria-label="Open command palette"
          >
            <Command className="mr-1.5 h-3.5 w-3.5" aria-hidden="true" />
            ⌘K
          </Button>

          <Toggle
            pressed={isRecruiterMode}
            onPressedChange={setRecruiterMode}
            size="sm"
            aria-label="Toggle recruiter mode"
            className="hidden text-xs md:flex"
          >
            Recruiter mode
          </Toggle>

          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger
              className="md:hidden"
              render={
                <Button variant="ghost" size="icon" aria-label="Open menu">
                  <Menu className="h-5 w-5" />
                </Button>
              }
            />
            <SheetContent side="right" className="w-72">
              <SheetTitle className="font-mono text-sm">Navigation</SheetTitle>
              <div className="mt-6 flex flex-col gap-2">
                {visibleLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="rounded-md px-3 py-3 text-base hover:bg-muted"
                  >
                    {link.label}
                  </Link>
                ))}
                <Toggle
                  pressed={isRecruiterMode}
                  onPressedChange={setRecruiterMode}
                  className="mt-4 justify-start"
                >
                  Recruiter mode
                </Toggle>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}
