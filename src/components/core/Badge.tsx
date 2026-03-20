import { ReactNode } from "react";
import clsx from "clsx";

type BadgeVariant = "default" | "primary" | "success" | "warning" | "danger" | "accent" | "info";
type BadgeSize = "sm" | "md";

interface BadgeProps {
  variant?: BadgeVariant;
  size?: BadgeSize;
  pill?: boolean;
  children: ReactNode;
  className?: string;
}

const variantClasses: Record<BadgeVariant, string> = {
  default: "bg-slate-800/40 text-slate-300 border-slate-700/60",
  primary: "bg-primary-500/15 text-primary-300 border-primary-500/30",
  success: "bg-secondary-500/15 text-secondary-300 border-secondary-500/30",
  warning: "bg-warning-500/15 text-warning-300 border-warning-500/30",
  danger: "bg-danger-500/15 text-danger-300 border-danger-500/30",
  accent: "bg-accent-500/15 text-accent-300 border-accent-500/30",
  info: "bg-primary-500/15 text-primary-300 border-primary-500/30",
};

const sizeClasses: Record<BadgeSize, string> = { sm: "px-2 py-0.5 text-[10px] leading-tight", md: "px-2.5 py-1 text-xs leading-snug" };

export const Badge = ({ variant = "default", size = "sm", pill, children, className }: BadgeProps) => (
  <span className={clsx("inline-flex items-center border font-medium uppercase tracking-wide", pill ? "rounded-full" : "rounded-lg", variantClasses[variant], sizeClasses[size], className)}>{children}</span>
);

export const Chip = ({ onRemove, children, className }: { onRemove?: () => void; children: ReactNode; className?: string }) => (
  <span className={clsx("inline-flex items-center gap-1.5 rounded-full border border-slate-700/60 bg-surface-elevated px-3 py-1.5 text-xs font-medium text-slate-200", className)}>
    {children}
    {onRemove && <button type="button" onClick={onRemove} className="inline-flex h-4 w-4 items-center justify-center rounded-full hover:bg-slate-700/60">✕</button>}
  </span>
);
