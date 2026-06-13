import {
  cloneElement,
  createContext,
  forwardRef,
  isValidElement,
  useContext,
  type CSSProperties,
  type HTMLAttributes,
  type MouseEvent,
  type ReactElement,
  type ReactNode,
  type RefObject,
} from "react";
import { Popover as popoverStyles } from "@arviahq/ui-styles/components/popover.arv";
import {
  Portal,
  useAnchoredPosition,
  useComposedRefs,
  useControllableState,
  useId,
  useOnClickOutside,
  useOnEscape,
} from "@arviahq/react-primitives";

type PopoverContextValue = {
  open: boolean;
  setOpen: (open: boolean) => void;
  baseId: string;
  anchorRef: RefObject<HTMLElement | null>;
  floatingRef: RefObject<HTMLDivElement | null>;
  style: CSSProperties;
};

const PopoverContext = createContext<PopoverContextValue | null>(null);

function usePopoverContext(part: string): PopoverContextValue {
  const ctx = useContext(PopoverContext);
  if (!ctx) throw new Error(`Popover.${part} must be used within <Popover>`);
  return ctx;
}

export type PopoverProps = {
  open?: boolean;
  defaultOpen?: boolean;
  onChange?: (open: boolean) => void;
  children?: ReactNode;
};

function PopoverRoot({ open, defaultOpen, onChange, children }: PopoverProps) {
  const baseId = useId();
  const [isOpen, setOpen] = useControllableState<boolean>({
    value: open,
    defaultValue: defaultOpen ?? false,
    onChange,
  });
  const { anchorRef, floatingRef, style } = useAnchoredPosition<HTMLElement, HTMLDivElement>(
    isOpen,
    {
      gap: 6,
    },
  );

  return (
    <PopoverContext.Provider
      value={{ open: isOpen, setOpen, baseId, anchorRef, floatingRef, style }}
    >
      {children}
    </PopoverContext.Provider>
  );
}

export type PopoverTriggerProps = { children: ReactElement };

function PopoverTrigger({ children }: PopoverTriggerProps) {
  const ctx = usePopoverContext("Trigger");
  const child = children as ReactElement<{ onClick?: (e: MouseEvent) => void; ref?: unknown }>;
  const childRef = (child as { ref?: unknown }).ref ?? child.props.ref;
  const ref = useComposedRefs<HTMLElement>(ctx.anchorRef, childRef as never);
  if (!isValidElement(child)) throw new Error("Popover.Trigger expects a single element child.");
  return cloneElement(child, {
    ref,
    "aria-haspopup": "dialog",
    "aria-expanded": ctx.open,
    onClick: (event: MouseEvent) => {
      child.props.onClick?.(event);
      if (!event.defaultPrevented) ctx.setOpen(!ctx.open);
    },
  } as Partial<typeof child.props> & { ref: unknown });
}

export type PopoverContentProps = HTMLAttributes<HTMLDivElement> & {
  children?: ReactNode;
  className?: string;
};

const PopoverContent = forwardRef<HTMLDivElement, PopoverContentProps>(function PopoverContent(
  { children, className, style, ...props },
  ref,
) {
  const styles = popoverStyles();
  const ctx = usePopoverContext("Content");
  const composedRef = useComposedRefs<HTMLDivElement>(ctx.floatingRef, ref);

  useOnEscape(ctx.open, () => ctx.setOpen(false));
  useOnClickOutside(ctx.open, () => ctx.setOpen(false), [ctx.anchorRef, ctx.floatingRef]);

  if (!ctx.open) return null;

  return (
    <Portal>
      <div
        ref={composedRef}
        role="dialog"
        id={`${ctx.baseId}-content`}
        tabIndex={-1}
        className={className ? `${styles.content} ${className}` : styles.content}
        style={{ ...ctx.style, ...style }}
        {...props}
      >
        {children}
      </div>
    </Portal>
  );
});

/**
 * Anchored popover:
 *
 *   <Popover>
 *     <Popover.Trigger><Button>Open</Button></Popover.Trigger>
 *     <Popover.Content>…</Popover.Content>
 *   </Popover>
 */
export const Popover = Object.assign(PopoverRoot, {
  Trigger: PopoverTrigger,
  Content: PopoverContent,
});
