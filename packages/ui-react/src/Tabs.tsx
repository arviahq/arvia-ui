import {
  createContext,
  forwardRef,
  useContext,
  type ButtonHTMLAttributes,
  type HTMLAttributes,
  type KeyboardEvent as ReactKeyboardEvent,
  type ReactNode,
} from "react";
import { Tabs as tabsStyles } from "@arviahq/ui-styles/components/tabs.arv";
import { useControllableState, useId } from "@arviahq/react-primitives";

type TabsContextValue = {
  value: string;
  setValue: (value: string) => void;
  baseId: string;
};

const TabsContext = createContext<TabsContextValue | null>(null);

function useTabsContext(part: string): TabsContextValue {
  const ctx = useContext(TabsContext);
  if (!ctx) throw new Error(`Tabs.${part} must be used within <Tabs>`);
  return ctx;
}

export type TabsProps = Omit<HTMLAttributes<HTMLDivElement>, "onChange"> & {
  /** Active tab value (controlled). */
  value?: string;
  /** Initial active tab value (uncontrolled). */
  defaultValue?: string;
  /** Called when the active tab changes. */
  onChange?: (value: string) => void;
  children?: ReactNode;
  className?: string;
};

const TabsRoot = forwardRef<HTMLDivElement, TabsProps>(function Tabs(
  { value, defaultValue, onChange, children, className, id, ...props },
  ref,
) {
  const styles = tabsStyles();
  const baseId = useId(id);
  const [active, setActive] = useControllableState({
    value,
    defaultValue: defaultValue ?? "",
    onChange,
  });

  return (
    <TabsContext.Provider value={{ value: active, setValue: setActive, baseId }}>
      <div ref={ref} className={className ? `${styles.root} ${className}` : styles.root} {...props}>
        {children}
      </div>
    </TabsContext.Provider>
  );
});

export type TabsListProps = HTMLAttributes<HTMLDivElement> & {
  "aria-label"?: string;
  children?: ReactNode;
  className?: string;
};

const TabsList = forwardRef<HTMLDivElement, TabsListProps>(function TabsList(
  { children, className, ...props },
  ref,
) {
  const styles = tabsStyles();
  const ctx = useTabsContext("List");

  function onKeyDown(event: ReactKeyboardEvent<HTMLDivElement>) {
    if (!["ArrowRight", "ArrowLeft", "Home", "End"].includes(event.key)) return;
    const tabs = Array.from(
      event.currentTarget.querySelectorAll<HTMLButtonElement>('[role="tab"]:not([disabled])'),
    );
    if (tabs.length === 0) return;
    const current = tabs.findIndex((tab) => tab === document.activeElement);
    let next = current;
    if (event.key === "ArrowRight") next = (current + 1) % tabs.length;
    else if (event.key === "ArrowLeft") next = (current - 1 + tabs.length) % tabs.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = tabs.length - 1;

    const target = tabs[next];
    if (!target) return;
    event.preventDefault();
    target.focus();
    const nextValue = target.getAttribute("data-value");
    if (nextValue != null) ctx.setValue(nextValue);
  }

  return (
    <div
      ref={ref}
      role="tablist"
      className={className ? `${styles.list} ${className}` : styles.list}
      onKeyDown={onKeyDown}
      {...props}
    >
      {children}
    </div>
  );
});

export type TabProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, "value"> & {
  /** Value linking this tab to its panel. */
  value: string;
  children?: ReactNode;
  className?: string;
};

const Tab = forwardRef<HTMLButtonElement, TabProps>(function Tab(
  { value, children, className, disabled, onClick, ...props },
  ref,
) {
  const styles = tabsStyles();
  const ctx = useTabsContext("Tab");
  const selected = ctx.value === value;

  return (
    <button
      ref={ref}
      type="button"
      role="tab"
      id={`${ctx.baseId}-tab-${value}`}
      aria-selected={selected}
      aria-controls={`${ctx.baseId}-panel-${value}`}
      tabIndex={selected ? 0 : -1}
      data-state={selected ? "active" : "inactive"}
      data-value={value}
      disabled={disabled}
      className={className ? `${styles.tab} ${className}` : styles.tab}
      onClick={(event) => {
        onClick?.(event);
        if (!event.defaultPrevented) ctx.setValue(value);
      }}
      {...props}
    >
      {children}
    </button>
  );
});

export type TabPanelProps = Omit<HTMLAttributes<HTMLDivElement>, "value"> & {
  /** Value linking this panel to its tab. */
  value: string;
  children?: ReactNode;
  className?: string;
};

const TabPanel = forwardRef<HTMLDivElement, TabPanelProps>(function TabPanel(
  { value, children, className, ...props },
  ref,
) {
  const styles = tabsStyles();
  const ctx = useTabsContext("Panel");
  if (ctx.value !== value) return null;

  return (
    <div
      ref={ref}
      role="tabpanel"
      id={`${ctx.baseId}-panel-${value}`}
      aria-labelledby={`${ctx.baseId}-tab-${value}`}
      tabIndex={0}
      className={className ? `${styles.panel} ${className}` : styles.panel}
      {...props}
    >
      {children}
    </div>
  );
});

/**
 * Compound tabs. Compose with the attached parts:
 *
 *   <Tabs defaultValue="a">
 *     <Tabs.List>
 *       <Tabs.Tab value="a">One</Tabs.Tab>
 *       <Tabs.Tab value="b">Two</Tabs.Tab>
 *     </Tabs.List>
 *     <Tabs.Panel value="a">…</Tabs.Panel>
 *     <Tabs.Panel value="b">…</Tabs.Panel>
 *   </Tabs>
 */
export const Tabs = Object.assign(TabsRoot, {
  List: TabsList,
  Tab,
  Panel: TabPanel,
});
