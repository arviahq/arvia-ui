import {
  cloneElement,
  createContext,
  forwardRef,
  isValidElement,
  useContext,
  type HTMLAttributes,
  type MouseEvent,
  type ReactElement,
  type ReactNode,
} from "react";
import { Dialog as dialogStyles } from "@arviahq/ui-styles/components/dialog.arv";
import {
  Portal,
  useControllableState,
  useFocusTrap,
  useId,
  useOnEscape,
  useScrollLock,
} from "@arviahq/react-primitives";

type DialogContextValue = {
  open: boolean;
  setOpen: (open: boolean) => void;
  baseId: string;
};

const DialogContext = createContext<DialogContextValue | null>(null);

function useDialogContext(part: string): DialogContextValue {
  const ctx = useContext(DialogContext);
  if (!ctx) throw new Error(`Dialog.${part} must be used within <Dialog>`);
  return ctx;
}

type ClickableProps = { onClick?: (event: MouseEvent) => void };

/** Clone a single child element, composing our handler with the child's own onClick. */
function cloneWithClick(child: ReactNode, handler: (event: MouseEvent) => void, extra?: object) {
  if (!isValidElement(child)) {
    throw new Error("Dialog.Trigger / Dialog.Close with `asChild` expects a single React element child.");
  }
  const element = child as ReactElement<ClickableProps>;
  return cloneElement(element, {
    ...extra,
    onClick: (event: MouseEvent) => {
      element.props.onClick?.(event);
      if (!event.defaultPrevented) handler(event);
    },
  });
}

export type DialogProps = {
  /** Whether the dialog is open (controlled). */
  open?: boolean;
  /** Initial open state (uncontrolled). */
  defaultOpen?: boolean;
  /** Called when the open state changes. */
  onChange?: (open: boolean) => void;
  children?: ReactNode;
};

function DialogRoot({ open, defaultOpen, onChange, children }: DialogProps) {
  const baseId = useId();
  const [value, setOpen] = useControllableState<boolean>({
    value: open,
    defaultValue: defaultOpen ?? false,
    onChange,
  });

  return (
    <DialogContext.Provider value={{ open: value, setOpen, baseId }}>{children}</DialogContext.Provider>
  );
}

export type DialogTriggerProps = { children: ReactNode };

function DialogTrigger({ children }: DialogTriggerProps) {
  const ctx = useDialogContext("Trigger");
  return cloneWithClick(children, () => ctx.setOpen(true), {
    "aria-haspopup": "dialog",
    "aria-expanded": ctx.open,
  });
}

export type DialogContentProps = HTMLAttributes<HTMLDivElement> & {
  children?: ReactNode;
  className?: string;
};

const DialogContent = forwardRef<HTMLDivElement, DialogContentProps>(function DialogContent(
  { children, className, ...props },
  ref,
) {
  const styles = dialogStyles();
  const ctx = useDialogContext("Content");
  const trapRef = useFocusTrap<HTMLDivElement>(ctx.open);

  useScrollLock(ctx.open);
  useOnEscape(ctx.open, () => ctx.setOpen(false));

  if (!ctx.open) return null;

  const setRefs = (node: HTMLDivElement | null) => {
    (trapRef as { current: HTMLDivElement | null }).current = node;
    if (typeof ref === "function") ref(node);
    else if (ref) (ref as { current: HTMLDivElement | null }).current = node;
  };

  return (
    <Portal>
      <div
        className={styles.overlay}
        onClick={(event) => {
          if (event.target === event.currentTarget) ctx.setOpen(false);
        }}
      >
        <div
          ref={setRefs}
          role="dialog"
          aria-modal="true"
          aria-labelledby={`${ctx.baseId}-title`}
          aria-describedby={`${ctx.baseId}-desc`}
          tabIndex={-1}
          className={className ? `${styles.content} ${className}` : styles.content}
          {...props}
        >
          {children}
        </div>
      </div>
    </Portal>
  );
});

function DialogHeader({ children, className, ...props }: HTMLAttributes<HTMLDivElement>) {
  const styles = dialogStyles();
  return (
    <div className={className ? `${styles.header} ${className}` : styles.header} {...props}>
      {children}
    </div>
  );
}

function DialogTitle({ children, className, ...props }: HTMLAttributes<HTMLHeadingElement>) {
  const styles = dialogStyles();
  const ctx = useDialogContext("Title");
  return (
    <h2 id={`${ctx.baseId}-title`} className={className ? `${styles.title} ${className}` : styles.title} {...props}>
      {children}
    </h2>
  );
}

function DialogDescription({ children, className, ...props }: HTMLAttributes<HTMLParagraphElement>) {
  const styles = dialogStyles();
  const ctx = useDialogContext("Description");
  return (
    <p
      id={`${ctx.baseId}-desc`}
      className={className ? `${styles.description} ${className}` : styles.description}
      {...props}
    >
      {children}
    </p>
  );
}

function DialogBody({ children, className, ...props }: HTMLAttributes<HTMLDivElement>) {
  const styles = dialogStyles();
  return (
    <div className={className ? `${styles.body} ${className}` : styles.body} {...props}>
      {children}
    </div>
  );
}

function DialogFooter({ children, className, ...props }: HTMLAttributes<HTMLDivElement>) {
  const styles = dialogStyles();
  return (
    <div className={className ? `${styles.footer} ${className}` : styles.footer} {...props}>
      {children}
    </div>
  );
}

export type DialogCloseProps = {
  /** Render the close behavior on the provided child element instead of the default × button. */
  asChild?: boolean;
  children?: ReactNode;
  className?: string;
  "aria-label"?: string;
};

function DialogClose({ asChild, children, className, ...props }: DialogCloseProps) {
  const styles = dialogStyles();
  const ctx = useDialogContext("Close");

  if (asChild) {
    return cloneWithClick(children, () => ctx.setOpen(false));
  }

  return (
    <button
      type="button"
      aria-label={props["aria-label"] ?? "Close"}
      className={className ? `${styles.close} ${className}` : styles.close}
      onClick={() => ctx.setOpen(false)}
    >
      {children ?? (
        <svg
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
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      )}
    </button>
  );
}

/**
 * Compound modal dialog. Open via `open`/`onChange` or `Dialog.Trigger`:
 *
 *   <Dialog>
 *     <Dialog.Trigger><Button>Open</Button></Dialog.Trigger>
 *     <Dialog.Content>
 *       <Dialog.Close />
 *       <Dialog.Header>
 *         <Dialog.Title>Title</Dialog.Title>
 *         <Dialog.Description>…</Dialog.Description>
 *       </Dialog.Header>
 *       <Dialog.Body>…</Dialog.Body>
 *       <Dialog.Footer>
 *         <Dialog.Close asChild><Button tone="secondary">Cancel</Button></Dialog.Close>
 *       </Dialog.Footer>
 *     </Dialog.Content>
 *   </Dialog>
 */
export const Dialog = Object.assign(DialogRoot, {
  Trigger: DialogTrigger,
  Content: DialogContent,
  Header: DialogHeader,
  Title: DialogTitle,
  Description: DialogDescription,
  Body: DialogBody,
  Footer: DialogFooter,
  Close: DialogClose,
});
