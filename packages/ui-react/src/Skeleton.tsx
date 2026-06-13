import { forwardRef, type CSSProperties, type HTMLAttributes } from "react";
import {
  Skeleton as skeletonStyles,
  type SkeletonProps as ArviaSkeletonProps,
} from "@arviahq/ui-styles/components/skeleton.arv";

export type SkeletonProps = Omit<HTMLAttributes<HTMLDivElement>, "children"> & {
  /** Pulse animation (default true). */
  animated?: boolean;
  width?: number | string;
  height?: number | string;
  radius?: CSSProperties["borderRadius"];
  className?: string;
};

export const Skeleton = forwardRef<HTMLDivElement, SkeletonProps>(function Skeleton(
  { animated = true, width, height, radius, className, style, ...props },
  ref,
) {
  const styles = skeletonStyles({
    animated: (animated ? "yes" : "no") as ArviaSkeletonProps["animated"],
  });
  return (
    <div
      ref={ref}
      aria-hidden
      className={className ? `${styles.root} ${className}` : styles.root}
      style={{ width, height, borderRadius: radius, ...style }}
      {...props}
    />
  );
});
