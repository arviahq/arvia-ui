import { forwardRef, type TextareaHTMLAttributes } from "react";
import {
  Textarea as textareaStyles,
  type TextareaProps as ArviaTextareaProps,
} from "@arvia-ui/core-styles/components/textarea.arv";

export type TextareaProps = ArviaTextareaProps &
  Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "size"> & {
    className?: string;
  };

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
  { className, size, ...props },
  ref,
) {
  const styles = textareaStyles({ size });
  return (
    <textarea
      ref={ref}
      className={className ? `${styles.root} ${className}` : styles.root}
      {...props}
    />
  );
});
