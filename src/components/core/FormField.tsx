import { ReactNode } from "react";
import clsx from "clsx";

interface FormFieldWrapperProps {
  label?: string;
  helperText?: ReactNode;
  error?: string;
  htmlFor?: string;
  required?: boolean;
  children: ReactNode;
}

export const FormFieldWrapper = ({ label, helperText, error, htmlFor, required, children }: FormFieldWrapperProps) => (
  <div className="space-y-2">
    {label && (
      <label htmlFor={htmlFor} className="block text-sm font-medium text-slate-200">
        {label}{required && <span className="ml-1 text-danger-400">*</span>}
      </label>
    )}
    {children}
    {error ? (
      <p className="text-xs text-danger-400">{error}</p>
    ) : helperText ? (
      <p className="text-xs text-slate-400">{helperText}</p>
    ) : null}
  </div>
);

export const baseInputClasses = clsx(
  "w-full rounded-lg border bg-surface-base px-4 py-2.5 text-sm text-slate-50",
  "placeholder:text-slate-500 shadow-elevation-low",
  "transition-all duration-quick ease-snappy focus-visible:outline-none",
  "disabled:opacity-50 disabled:cursor-not-allowed"
);
export const errorInputClasses = "border-danger-500/60 focus-visible:border-danger-500";
export const defaultInputClasses = "border-slate-700/60 hover:border-slate-600/80 focus-visible:border-primary-500/50";
