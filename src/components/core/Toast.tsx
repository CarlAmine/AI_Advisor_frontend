import { ReactNode } from "react";
import clsx from "clsx";

interface ToastProps {
  message: string;
  description?: string;
  variant?: "success" | "error" | "warning" | "info";
  onClose?: () => void;
}

export const Toast = ({ message, description, variant = "info", onClose }: ToastProps) => {
  const colors = {
    success: "border-success-500/30 bg-success-500/10 text-success-300",
    error: "border-danger-500/30 bg-danger-500/10 text-danger-300",
    warning: "border-warning-500/30 bg-warning-500/10 text-warning-300",
    info: "border-primary-500/30 bg-primary-500/10 text-primary-300",
  };
  return (
    <div className={clsx("flex items-start gap-3 rounded-xl border p-4 shadow-elevation-mid backdrop-blur-xl", colors[variant])}>
      <div className="flex-1">
        <p className="text-sm font-semibold">{message}</p>
        {description && <p className="mt-0.5 text-xs opacity-80">{description}</p>}
      </div>
      {onClose && <button onClick={onClose} className="text-current opacity-60 hover:opacity-100">✕</button>}
    </div>
  );
};
