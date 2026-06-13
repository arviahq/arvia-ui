import { forwardRef, useState, type HTMLAttributes, type ReactNode } from "react";
import {
  Avatar as avatarStyles,
  type AvatarProps as ArviaAvatarProps,
} from "@arviahq/ui-styles/components/avatar.arv";

function initials(name?: string): string {
  if (!name) return "";
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

export type AvatarProps = ArviaAvatarProps &
  Omit<HTMLAttributes<HTMLSpanElement>, "children"> & {
    /** Image URL; falls back to initials/children if missing or it fails to load. */
    src?: string;
    alt?: string;
    /** Name used to derive fallback initials. */
    name?: string;
    children?: ReactNode;
    className?: string;
  };

export const Avatar = forwardRef<HTMLSpanElement, AvatarProps>(function Avatar(
  { src, alt, name, size, children, className, ...props },
  ref,
) {
  const styles = avatarStyles({ size });
  const [errored, setErrored] = useState(false);
  const showImage = Boolean(src) && !errored;

  return (
    <span ref={ref} className={className ? `${styles.root} ${className}` : styles.root} {...props}>
      {showImage ? (
        <img
          className={styles.image}
          src={src}
          alt={alt ?? name ?? ""}
          onError={() => setErrored(true)}
        />
      ) : (
        (children ?? initials(name))
      )}
    </span>
  );
});
