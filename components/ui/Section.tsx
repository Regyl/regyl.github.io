import { cn } from "@/lib/utils";

interface SectionProps {
  id: string;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
  badge?: React.ReactNode;
}

export function Section({ id, title, subtitle, children, className, badge }: SectionProps) {
  return (
    <section id={id} className={cn("scroll-mt-20 py-20 md:py-28", className)} aria-labelledby={`${id}-heading`}>
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 flex flex-col gap-3 md:mb-16">
          <div className="flex flex-wrap items-center gap-3">
            <h2
              id={`${id}-heading`}
              className="font-mono text-sm uppercase tracking-widest text-brand"
            >
              {title}
            </h2>
            {badge}
          </div>
          {subtitle && (
            <p className="max-w-2xl text-lg text-muted-foreground md:text-xl">{subtitle}</p>
          )}
        </div>
        {children}
      </div>
    </section>
  );
}
