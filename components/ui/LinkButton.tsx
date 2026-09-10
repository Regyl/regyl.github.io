import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { VariantProps } from "class-variance-authority";

type LinkButtonProps = React.ComponentProps<"a"> &
  VariantProps<typeof buttonVariants> & {
    href: string;
    external?: boolean;
  };

export function LinkButton({
  className,
  variant,
  size,
  href,
  external,
  children,
  ...props
}: LinkButtonProps) {
  const classes = cn(buttonVariants({ variant, size, className }));

  if (external || href.startsWith("http") || href.startsWith("mailto:")) {
    return (
      <a
        href={href}
        className={classes}
        target={external || href.startsWith("http") ? "_blank" : undefined}
        rel={external || href.startsWith("http") ? "noopener noreferrer" : undefined}
        {...props}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} {...props}>
      {children}
    </Link>
  );
}
