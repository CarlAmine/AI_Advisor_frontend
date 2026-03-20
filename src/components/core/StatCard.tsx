import { ReactNode } from "react";
import clsx from "clsx";

interface StatCardProps {
  label: string;
  value: string | number;
  icon?: ReactNode;
  trend?: "up" | "down" | "neutral";
  trendValue?: string;
  className?: string;
}

const trendColors = { up: "text-success-400", down: "text-danger-400", neutral: "text-slate-400" };

export const StatCard = ({ label, value, icon, trend, trendValue, className }: StatCardProps) => (
  <div className={clsx("flex flex-col gap-3 rounded-2xl border border-slate-800/60 bg-surface-base p-4 backdrop-blur-xl shadow-elevation-low hover:bg-surface-elevated hover:border-slate-700/80 hover:shadow-elevation-mid hover:-translate-y-0.5 transition-all", className)}>
    <div className="flex items-center justify-between">
      <span className="text-xs font-medium uppercase tracking-wide text-slate-400">{label}</span>
      {icon && <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-500/10 text-primary-400">{icon}</span>}
    </div>
    <div className="flex items-baseline gap-2">
      <span className="text-2xl font-semibold text-slate-50 lg:text-3xl">{value}</span>
      {trend && trendValue && <span className={clsx("text-xs font-medium", trendColors[trend])}>{trendValue}</span>}
    </div>
  </div>
);
