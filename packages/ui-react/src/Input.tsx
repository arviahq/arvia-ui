import { forwardRef, type InputHTMLAttributes } from "react";
import {
  Input as inputStyles,
  type InputProps as ArviaInputProps,
} from "@arviahq/ui-styles/components/input.arv";

export type InputProps = ArviaInputProps &
  Omit<InputHTMLAttributes<HTMLInputElement>, "size"> & {
    className?: string;
  };

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { className, size, ...props },
  ref,
) {
  const styles = inputStyles({ size });
  return (
    <input
      ref={ref}
      className={className ? `${styles.root} ${className}` : styles.root}
      {...props}
    />
  );
});
