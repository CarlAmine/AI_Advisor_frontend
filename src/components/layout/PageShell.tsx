import { ReactNode } from "react";
import clsx from "clsx";

interface PageShellProps { children: ReactNode; narrow?: boolean; className?: string; }

export const PageShell = ({ children, narrow, className }: PageShellProps) => (
  <div className={clsx("mx-auto w-full px-4 py-6 sm:px-5 md:px-6 md:py-7 lg:px-8 lg:py-8 xl:px-12", narrow ? "max-w-3xl md:max-w-4xl" : "max-w-5xl lg:max-w-6xl xl:max-w-7xl", className)}>
    {children}
  </div>
);

interface PageSectionProps { children: ReactNode; className?: string; }

export const PageSection = ({ children, className }: PageSectionProps) => (
  <div className={clsx("space-y-6 md:space-y-7 lg:space-y-8", className)}>{children}</div>
);
