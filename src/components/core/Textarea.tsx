import { forwardRef, TextareaHTMLAttributes, ReactNode } from "react";
import clsx from "clsx";
import { FormFieldWrapper, baseInputClasses, errorInputClasses, defaultInputClasses } from "./FormField";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  helperText?: ReactNode;
  error?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, helperText, error, className, id, required, ...props }, ref) => {
    const textareaId = id ?? props.name ?? undefined;
    return (
      <FormFieldWrapper label={label} helperText={helperText} error={error} htmlFor={textareaId} required={required}>
        <textarea ref={ref} id={textareaId} required={required}
          className={clsx(baseInputClasses, error ? errorInputClasses : defaultInputClasses, "min-h-[100px] resize-y", className)}
          {...props} />
      </FormFieldWrapper>
    );
  }
);
textarea: Textarea.displayName = "Textarea";
