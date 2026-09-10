import { eugene } from "@/data/eugene";
import { jokes } from "@/data/jokes";

export function Footer() {
  const footerJoke = jokes.find((j) => j.location === "footer");

  return (
    <footer className="border-t border-border py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-4 text-center sm:px-6 lg:px-8">
        <p className="font-mono text-xs text-muted-foreground">
          © {new Date().getFullYear()} {eugene.name} · Built with Next.js
        </p>
        {footerJoke && (
          <p className="max-w-md font-mono text-xs text-muted-foreground/50">{footerJoke.text}</p>
        )}
        <p className="font-mono text-xs text-muted-foreground/40">
          Press <kbd className="rounded border border-border px-1.5 py-0.5">⌘K</kbd> for commands ·{" "}
          <kbd className="rounded border border-border px-1.5 py-0.5">/</kbd> also works
        </p>
      </div>
    </footer>
  );
}
