import { ReactNode, ElementType } from "react";
import clsx from "clsx";

type HeadingLevel = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

interface HeadingProps {
  level?: HeadingLevel;
  styleAs?: HeadingLevel;
  children: ReactNode;
  className?: string;
}

export const Heading = ({ level = "h2", styleAs, children, className }: HeadingProps) => {
  const Component = level as ElementType;
  const visualLevel = styleAs || level;
  const styles: Record<HeadingLevel, string> = {
    h1: "text-h1-mobile md:text-h1-tablet lg:text-h1-desktop font-semibold tracking-tight text-slate-50",
    h2: "text-h2-mobile md:text-h2-tablet lg:text-h2-desktop font-semibold tracking-tight text-slate-50",
    h3: "text-h3-mobile md:text-h3-tablet lg:text-h3-desktop font-semibold tracking-tight text-slate-100",
    h4: "text-h4-mobile md:text-h4-tablet lg:text-h4-desktop font-semibold tracking-tight text-slate-100",
    h5: "text-lg lg:text-xl font-semibold text-slate-100",
    h6: "text-base lg:text-lg font-semibold text-slate-200",
  };
  return (
    <Component className={clsx(styles[visualLevel], "font-display", className)}>
      {children}
    </Component>
  );
};

interface TextProps {
  variant?: "body" | "small" | "subtitle" | "caption";
  color?: "primary" | "secondary" | "muted" | "disabled";
  as?: "p" | "span" | "div" | "label";
  children: ReactNode;
  className?: string;
}

export const Text = ({ variant = "body", color = "primary", as: Component = "p", children, className }: TextProps) => {
  const variantStyles = {
    subtitle: "text-subtitle-mobile md:text-subtitle-tablet lg:text-subtitle-desktop leading-relaxed",
    body: "text-sm md:text-base leading-relaxed",
    small: "text-xs md:text-sm leading-normal",
    caption: "text-xs leading-normal",
  };
  const colorStyles = {
    primary: "text-slate-50",
    secondary: "text-slate-200",
    muted: "text-slate-400",
    disabled: "text-slate-500",
  };
  return (
    <Component className={clsx(variantStyles[variant], colorStyles[color], className)}>
      {children}
    </Component>
  );
};

interface OverlineProps { children: ReactNode; className?: string; }

export const Overline = ({ children, className }: OverlineProps) => (
  <span className={clsx("text-overline font-semibold uppercase tracking-wide text-slate-400", className)}>
    {children}
  </span>
);
