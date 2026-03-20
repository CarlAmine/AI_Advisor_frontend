import { ReactNode } from "react";
import clsx from "clsx";

interface SidebarNavItemProps {
  icon: ReactNode;
  label: string;
  isActive?: boolean;
  collapsed?: boolean;
  onClick?: () => void;
}

export const SidebarNavItem = ({ icon, label, isActive, collapsed, onClick }: SidebarNavItemProps) => (
  <button type="button" onClick={onClick}
    className={clsx("flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all",
      isActive ? "bg-primary-500/15 text-primary-300" : "text-slate-400 hover:bg-surface-elevated hover:text-slate-200")}>
    <span className="flex h-5 w-5 items-center justify-center flex-shrink-0">{icon}</span>
    {!collapsed && <span className="truncate">{label}</span>}
  </button>
);
