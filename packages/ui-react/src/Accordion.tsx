import {
  createContext,
  forwardRef,
  useContext,
  type ButtonHTMLAttributes,
  type HTMLAttributes,
  type ReactNode,
} from "react";
import { Accordion as accordionStyles } from "@arviahq/ui-styles/components/accordion.arv";
import { useControllableState, useId } from "@arviahq/react-primitives";

function toArray(value: string | string[] | undefined): string[] {
  if (value == null) return [];
  if (Array.isArray(value)) return value;
  return value ? [value] : [];
}

type AccordionContextValue = {
  isOpen: (value: string) => boolean;
  toggle: (value: string) => void;
  baseId: string;
};

const AccordionContext = createContext<AccordionContextValue | null>(null);

function useAccordionContext(part: string): AccordionContextValue {
  const ctx = useContext(AccordionContext);
  if (!ctx) throw new Error(`Accordion.${part} must be used within <Accordion>`);
  return ctx;
}

type ItemContextValue = { value: string; open: boolean };
const ItemContext = createContext<ItemContextValue | null>(null);

function useItemContext(part: string): ItemContextValue {
  const ctx = useContext(ItemContext);
  if (!ctx) throw new Error(`Accordion.${part} must be used within <Accordion.Item>`);
  return ctx;
}

export type AccordionProps = Omit<HTMLAttributes<HTMLDivElement>, "onChange" | "defaultValue"> & {
  /** "single" allows one open item, "multiple" allows many. */
  type?: "single" | "multiple";
  /** Open item value(s) — controlled. */
  value?: string | string[];
  /** Initially open item value(s) — uncontrolled. */
  defaultValue?: string | string[];
  /** Called when the open item(s) change. */
  onChange?: (value: string | string[]) => void;
  /** When type="single", allow closing the open item. */
  collapsible?: boolean;
  children?: ReactNode;
  className?: string;
};

const AccordionRoot = forwardRef<HTMLDivElement, AccordionProps>(function Accordion(
  {
    type = "single",
    value,
    defaultValue,
    onChange,
    collapsible = true,
    children,
    className,
    id,
    ...props
  },
  ref,
) {
  const styles = accordionStyles();
  const baseId = useId(id);
  const multiple = type === "multiple";

  const [open, setOpen] = useControllableState<string[]>({
    value: value !== undefined ? toArray(value) : undefined,
    defaultValue: toArray(defaultValue),
    onChange: onChange ? (next) => onChange(multiple ? next : (next[0] ?? "")) : undefined,
  });

  const ctx: AccordionContextValue = {
    baseId,
    isOpen: (v) => open.includes(v),
    toggle: (v) => {
      if (multiple) {
        setOpen(open.includes(v) ? open.filter((item) => item !== v) : [...open, v]);
      } else {
        const isOpen = open.includes(v);
        setOpen(isOpen ? (collapsible ? [] : open) : [v]);
      }
    },
  };

  return (
    <AccordionContext.Provider value={ctx}>
      <div ref={ref} className={className ? `${styles.root} ${className}` : styles.root} {...props}>
        {children}
      </div>
    </AccordionContext.Provider>
  );
});

export type AccordionItemProps = HTMLAttributes<HTMLDivElement> & {
  /** Identifies this item for open-state tracking. */
  value: string;
  children?: ReactNode;
  className?: string;
};

const AccordionItem = forwardRef<HTMLDivElement, AccordionItemProps>(function AccordionItem(
  { value, children, className, ...props },
  ref,
) {
  const styles = accordionStyles();
  const ctx = useAccordionContext("Item");
  const open = ctx.isOpen(value);

  return (
    <ItemContext.Provider value={{ value, open }}>
      <div ref={ref} className={className ? `${styles.item} ${className}` : styles.item} {...props}>
        {children}
      </div>
    </ItemContext.Provider>
  );
});

export type AccordionTriggerProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children?: ReactNode;
  className?: string;
};

const AccordionTrigger = forwardRef<HTMLButtonElement, AccordionTriggerProps>(
  function AccordionTrigger({ children, className, onClick, ...props }, ref) {
    const styles = accordionStyles();
    const ctx = useAccordionContext("Trigger");
    const item = useItemContext("Trigger");
    const state = item.open ? "open" : "closed";

    return (
      <button
        ref={ref}
        type="button"
        id={`${ctx.baseId}-trigger-${item.value}`}
        aria-expanded={item.open}
        aria-controls={`${ctx.baseId}-content-${item.value}`}
        data-state={state}
        className={className ? `${styles.trigger} ${className}` : styles.trigger}
        onClick={(event) => {
          onClick?.(event);
          if (!event.defaultPrevented) ctx.toggle(item.value);
        }}
        {...props}
      >
        {children}
        <svg
          className={styles.icon}
          data-state={state}
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>
    );
  },
);

export type AccordionContentProps = HTMLAttributes<HTMLDivElement> & {
  children?: ReactNode;
  className?: string;
};

const AccordionContent = forwardRef<HTMLDivElement, AccordionContentProps>(
  function AccordionContent({ children, className, ...props }, ref) {
    const styles = accordionStyles();
    const ctx = useAccordionContext("Content");
    const item = useItemContext("Content");

    return (
      <div
        ref={ref}
        role="region"
        id={`${ctx.baseId}-content-${item.value}`}
        aria-labelledby={`${ctx.baseId}-trigger-${item.value}`}
        data-state={item.open ? "open" : "closed"}
        className={className ? `${styles.content} ${className}` : styles.content}
        {...props}
      >
        <div className={styles.contentInner} inert={item.open ? undefined : true}>
          <div className={styles.contentBody}>{children}</div>
        </div>
      </div>
    );
  },
);

/**
 * Compound accordion. Compose with the attached parts:
 *
 *   <Accordion type="single" defaultValue="a">
 *     <Accordion.Item value="a">
 *       <Accordion.Trigger>Section A</Accordion.Trigger>
 *       <Accordion.Content>…</Accordion.Content>
 *     </Accordion.Item>
 *   </Accordion>
 */
export const Accordion = Object.assign(AccordionRoot, {
  Item: AccordionItem,
  Trigger: AccordionTrigger,
  Content: AccordionContent,
});
