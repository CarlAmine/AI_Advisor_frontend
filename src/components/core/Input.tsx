import { forwardRef, InputHTMLAttributes, ReactNode } from "react";
import clsx from "clsx";
import { FormFieldWrapper, baseInputClasses, errorInputClasses, defaultInputClasses } from "./FormField";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helperText?: ReactNode;
  error?: string;
  icon?: ReactNode;
  variant?: string; // accept but ignore variant prop for compatibility
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, helperText, error, icon, className, id, required, variant: _variant, ...props }, ref) => {
    const inputId = id ?? props.name ?? undefined;
    return (
      <FormFieldWrapper label={label} helperText={helperText} error={error} htmlFor={inputId} required={required}>
        <div className="relative">
          {icon && <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-500">{icon}</div>}
          <input ref={ref} id={inputId} required={required}
            className={clsx(baseInputClasses, error ? errorInputClasses : defaultInputClasses, icon && "pl-10", className)}
            {...props} />
        </div>
      </FormFieldWrapper>
    );
  }
);
Input.displayName = "Input";
