import { KeyboardEvent, TextareaHTMLAttributes, forwardRef } from "react";
import clsx from "clsx";

interface ChatInputProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  onSend?: () => void;
}

export const ChatInput = forwardRef<HTMLTextAreaElement, ChatInputProps>(
  ({ onSend, className, ...props }, ref) => {
    const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); onSend?.(); }
    };
    return (
      <textarea ref={ref} onKeyDown={handleKeyDown} rows={1}
        className={clsx("w-full resize-none bg-transparent text-sm text-slate-50 placeholder:text-slate-500 outline-none", className)}
        {...props} />
    );
  }
);
ChatInput.displayName = "ChatInput";
