import { forwardRef, type HTMLAttributes } from "react";
import {
  ProgressCircle as circleStyles,
  type ProgressCircleProps as ArviaProgressCircleProps,
} from "@arviahq/ui-styles/components/progress-circle.arv";

const DIMENSIONS: Record<"sm" | "md" | "lg", { diameter: number; stroke: number }> = {
  sm: { diameter: 32, stroke: 4 },
  md: { diameter: 48, stroke: 5 },
  lg: { diameter: 64, stroke: 6 },
};

export type ProgressCircleProps = ArviaProgressCircleProps &
  Omit<HTMLAttributes<HTMLDivElement>, "children"> & {
    value: number;
    max?: number;
    size?: "sm" | "md" | "lg";
    /** Override the ring thickness derived from `size`. */
    strokeWidth?: number;
    className?: string;
  };

export const ProgressCircle = forwardRef<HTMLDivElement, ProgressCircleProps>(
  function ProgressCircle(
    { value, max = 100, size = "md", strokeWidth, tone, className, ...props },
    ref,
  ) {
    const styles = circleStyles({ tone });
    const { diameter, stroke } = DIMENSIONS[size];
    const ringStroke = strokeWidth ?? stroke;
    const pct = Math.min(Math.max(value / max, 0), 1);
    const radius = (diameter - ringStroke) / 2;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference * (1 - pct);
    const center = diameter / 2;

    return (
      <div
        ref={ref}
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={max}
        className={className ? `${styles.root} ${className}` : styles.root}
        style={{ width: diameter, height: diameter }}
        {...props}
      >
        <svg width={diameter} height={diameter} viewBox={`0 0 ${diameter} ${diameter}`}>
          <circle
            className={styles.track}
            cx={center}
            cy={center}
            r={radius}
            strokeWidth={ringStroke}
          />
          <circle
            className={styles.indicator}
            cx={center}
            cy={center}
            r={radius}
            strokeWidth={ringStroke}
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            transform={`rotate(-90 ${center} ${center})`}
          />
        </svg>
      </div>
    );
  },
);
