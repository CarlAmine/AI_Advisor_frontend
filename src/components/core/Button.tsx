import { ButtonHTMLAttributes, forwardRef, ReactNode } from "react";
import clsx from "clsx";

type ButtonVariant = "primary" | "secondary" | "ghost" | "outline" | "danger";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  icon?: ReactNode;
  children: ReactNode;
}

const baseClasses = clsx(
  "inline-flex items-center justify-center rounded-xl font-medium",
  "transition-all duration-quick ease-snappy",
  "focus-visible:outline-none active:scale-[0.98]",
  "disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none"
);

const variantClasses: Record<ButtonVariant, string> = {
  primary: clsx("bg-primary-500 text-white hover:bg-primary-400 active:bg-primary-600","shadow-elevation-mid","hover:shadow-elevation-high hover:scale-[1.01]","active:scale-[0.98] active:shadow-elevation-mid"),
  secondary: clsx("bg-surface-elevated text-slate-100 hover:bg-slate-700/90","border border-slate-700/60 hover:border-slate-600/80","shadow-elevation-low hover:shadow-elevation-mid"),
  ghost: clsx("bg-transparent text-slate-300 hover:bg-surface-elevated hover:text-slate-100","active:scale-[0.98]"),
  outline: clsx("bg-transparent text-slate-200 border border-slate-700/60","hover:bg-surface-elevated hover:border-slate-600/80"),
  danger: clsx("bg-danger-500 text-white hover:bg-danger-400 active:bg-danger-600","shadow-elevation-mid hover:shadow-elevation-high hover:scale-[1.01]"),
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "px-3 py-2 text-xs gap-2",
  md: "px-4 py-2.5 text-sm gap-2",
  lg: "px-6 py-3 text-base gap-2.5",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", size = "md", loading, icon, children, className, ...props }, ref) => (
    <button ref={ref} className={clsx(baseClasses, variantClasses[variant], sizeClasses[size], className)} disabled={loading || props.disabled} {...props}>
      {loading ? <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" /> : icon ? <span className="inline-flex">{icon}</span> : null}
      {children}
    </button>
  )
);
Button.displayName = "Button";
