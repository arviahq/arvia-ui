import { forwardRef, type ReactNode } from "react";
import {
  Heading as headingStyles,
  type HeadingProps as ArviaHeadingProps,
} from "@arvia-ui/core-styles/components/heading.arv";

const LEVEL_TAGS = {
  "1": "h1",
  "2": "h2",
  "3": "h3",
  "4": "h4",
  "5": "h5",
  "6": "h6",
} as const;

export type HeadingProps = ArviaHeadingProps & {
  children?: ReactNode;
  className?: string;
};

export const Heading = forwardRef<HTMLHeadingElement, HeadingProps>(function Heading(
  { children, className, level = "2", tone },
  ref,
) {
  const Tag = LEVEL_TAGS[level];
  const styles = headingStyles({ level, tone });
  return (
    <Tag ref={ref} className={className ? `${styles.root} ${className}` : styles.root}>
      {children}
    </Tag>
  );
});
