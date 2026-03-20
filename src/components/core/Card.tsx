import { forwardRef, HTMLAttributes, ReactNode } from "react";
import clsx from "clsx";

type CardVariant = "default" | "elevated" | "inset" | "interactive" | "glass";
type CardPadding = "none" | "sm" | "md" | "lg";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant;
  padding?: CardPadding;
  children: ReactNode;
}

const variantClasses: Record<CardVariant, string> = {
  default: clsx("bg-surface-base border border-slate-800/60","rounded-2xl shadow-elevation-low backdrop-blur-xl"),
  elevated: clsx("bg-surface-elevated border border-slate-700/70","rounded-2xl shadow-elevation-mid backdrop-blur-xl"),
  inset: clsx("bg-surface-background border border-slate-800/40","rounded-2xl shadow-inner"),
  interactive: clsx("bg-surface-base border border-slate-800/60","rounded-2xl shadow-elevation-low backdrop-blur-xl cursor-pointer","hover:bg-surface-elevated hover:border-slate-700/80 hover:shadow-elevation-mid hover:-translate-y-1"),
  glass: clsx("bg-slate-900/30 border border-slate-800/50","rounded-2xl backdrop-blur-xl"),
};

const paddingClasses: Record<CardPadding, string> = { none: "p-0", sm: "p-4", md: "p-6", lg: "p-8" };

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ variant = "default", padding = "md", className, children, ...props }, ref) => (
    <div ref={ref} className={clsx(variantClasses[variant], paddingClasses[padding], className)} {...props}>{children}</div>
  )
);
Card.displayName = "Card";
