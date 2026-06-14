import {
  cloneElement,
  createContext,
  forwardRef,
  isValidElement,
  useContext,
  useEffect,
  type ButtonHTMLAttributes,
  type CSSProperties,
  type HTMLAttributes,
  type KeyboardEvent as ReactKeyboardEvent,
  type MouseEvent,
  type ReactElement,
  type ReactNode,
  type RefObject,
} from "react";
import { Menu as menuStyles } from "@arvia-ui/core-styles/components/menu.arv";
import {
  Portal,
  useAnchoredPosition,
  useComposedRefs,
  useControllableState,
  useId,
  useOnClickOutside,
  useOnEscape,
} from "./utils";

type MenuContextValue = {
  open: boolean;
  setOpen: (open: boolean) => void;
  baseId: string;
  anchorRef: RefObject<HTMLElement | null>;
  floatingRef: RefObject<HTMLDivElement | null>;
  style: CSSProperties;
};

const MenuContext = createContext<MenuContextValue | null>(null);

function useMenuContext(part: string): MenuContextValue {
  const ctx = useContext(MenuContext);
  if (!ctx) throw new Error(`Menu.${part} must be used within <Menu>`);
  return ctx;
}

export type MenuProps = {
  open?: boolean;
  defaultOpen?: boolean;
  onChange?: (open: boolean) => void;
  children?: ReactNode;
};

function MenuRoot({ open, defaultOpen, onChange, children }: MenuProps) {
  const baseId = useId();
  const [isOpen, setOpen] = useControllableState<boolean>({
    value: open,
    defaultValue: defaultOpen ?? false,
    onChange,
  });
  const { anchorRef, floatingRef, style } = useAnchoredPosition<HTMLElement, HTMLDivElement>(
    isOpen,
    {
      gap: 4,
    },
  );

  return (
    <MenuContext.Provider value={{ open: isOpen, setOpen, baseId, anchorRef, floatingRef, style }}>
      {children}
    </MenuContext.Provider>
  );
}

export type MenuTriggerProps = { children: ReactElement };

function MenuTrigger({ children }: MenuTriggerProps) {
  const ctx = useMenuContext("Trigger");
  const child = children as ReactElement<{ onClick?: (e: MouseEvent) => void; ref?: unknown }>;
  const childRef = (child as { ref?: unknown }).ref ?? child.props.ref;
  const ref = useComposedRefs<HTMLElement>(ctx.anchorRef, childRef as never);
  if (!isValidElement(child)) throw new Error("Menu.Trigger expects a single element child.");
  return cloneElement(child, {
    ref,
    "aria-haspopup": "menu",
    "aria-expanded": ctx.open,
    onClick: (event: MouseEvent) => {
      child.props.onClick?.(event);
      if (!event.defaultPrevented) ctx.setOpen(!ctx.open);
    },
  } as Partial<typeof child.props> & { ref: unknown });
}

export type MenuContentProps = HTMLAttributes<HTMLDivElement> & {
  children?: ReactNode;
  className?: string;
};

const MenuContent = forwardRef<HTMLDivElement, MenuContentProps>(function MenuContent(
  { children, className, style, ...props },
  ref,
) {
  const styles = menuStyles();
  const ctx = useMenuContext("Content");
  const composedRef = useComposedRefs<HTMLDivElement>(ctx.floatingRef, ref);

  useOnEscape(ctx.open, () => ctx.setOpen(false));
  useOnClickOutside(ctx.open, () => ctx.setOpen(false), [ctx.anchorRef, ctx.floatingRef]);

  useEffect(() => {
    if (!ctx.open) return;
    ctx.floatingRef.current
      ?.querySelector<HTMLElement>('[role="menuitem"]:not([disabled])')
      ?.focus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ctx.open]);

  if (!ctx.open) return null;

  function onKeyDown(event: ReactKeyboardEvent<HTMLDivElement>) {
    const items = Array.from(
      event.currentTarget.querySelectorAll<HTMLElement>('[role="menuitem"]:not([disabled])'),
    );
    if (items.length === 0) return;
    const index = items.indexOf(document.activeElement as HTMLElement);
    if (event.key === "ArrowDown") {
      event.preventDefault();
      items[(index + 1) % items.length]?.focus();
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      items[(index - 1 + items.length) % items.length]?.focus();
    } else if (event.key === "Home") {
      event.preventDefault();
      items[0]?.focus();
    } else if (event.key === "End") {
      event.preventDefault();
      items[items.length - 1]?.focus();
    } else if (event.key === "Tab") {
      ctx.setOpen(false);
    }
  }

  return (
    <Portal>
      <div
        ref={composedRef}
        role="menu"
        id={`${ctx.baseId}-menu`}
        tabIndex={-1}
        className={className ? `${styles.content} ${className}` : styles.content}
        style={{ ...ctx.style, ...style }}
        onKeyDown={onKeyDown}
        {...props}
      >
        {children}
      </div>
    </Portal>
  );
});

export type MenuItemProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  /** Called when the item is chosen; the menu then closes. */
  onSelect?: () => void;
  danger?: boolean;
  children?: ReactNode;
  className?: string;
};

const MenuItem = forwardRef<HTMLButtonElement, MenuItemProps>(function MenuItem(
  { onSelect, danger, children, className, disabled, onClick, ...props },
  ref,
) {
  const styles = menuStyles();
  const ctx = useMenuContext("Item");
  return (
    <button
      ref={ref}
      type="button"
      role="menuitem"
      tabIndex={-1}
      disabled={disabled}
      data-danger={danger || undefined}
      className={className ? `${styles.item} ${className}` : styles.item}
      onClick={(event) => {
        onClick?.(event);
        onSelect?.();
        ctx.setOpen(false);
      }}
      {...props}
    >
      {children}
    </button>
  );
});

function MenuSeparator({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  const styles = menuStyles();
  return (
    <div
      role="separator"
      className={className ? `${styles.separator} ${className}` : styles.separator}
      {...props}
    />
  );
}

function MenuLabel({ children, className, ...props }: HTMLAttributes<HTMLDivElement>) {
  const styles = menuStyles();
  return (
    <div className={className ? `${styles.label} ${className}` : styles.label} {...props}>
      {children}
    </div>
  );
}

/**
 * Dropdown menu:
 *
 *   <Menu>
 *     <Menu.Trigger><Button>Actions</Button></Menu.Trigger>
 *     <Menu.Content>
 *       <Menu.Item onSelect={…}>Edit</Menu.Item>
 *       <Menu.Separator />
 *       <Menu.Item danger onSelect={…}>Delete</Menu.Item>
 *     </Menu.Content>
 *   </Menu>
 */
export const Menu = Object.assign(MenuRoot, {
  Trigger: MenuTrigger,
  Content: MenuContent,
  Item: MenuItem,
  Separator: MenuSeparator,
  Label: MenuLabel,
});
