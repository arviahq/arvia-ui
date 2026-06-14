import { createContext, useCallback, useContext, useRef, useState, type ReactNode } from "react";
import { Toast as toastStyles } from "@arvia-ui/core-styles/components/toast.arv";
import { Portal } from "./utils";

export type ToastTone = "neutral" | "info" | "success" | "warning" | "danger";

export type ToastOptions = {
  title?: ReactNode;
  description?: ReactNode;
  tone?: ToastTone;
  /** Auto-dismiss delay in ms; 0 keeps it until dismissed. Defaults to the provider's duration. */
  duration?: number;
};

type ToastItem = ToastOptions & { id: string };

type ToastContextValue = {
  toast: (options: ToastOptions) => string;
  dismiss: (id: string) => void;
};

const ToastContext = createContext<ToastContextValue | null>(null);

export function useToast(): ToastContextValue {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within <ToastProvider>");
  return ctx;
}

const ICON_PATHS: Record<ToastTone, ReactNode> = {
  neutral: (
    <>
      <circle cx="12" cy="12" r="10" />
      <path d="M12 16v-4M12 8h.01" />
    </>
  ),
  info: (
    <>
      <circle cx="12" cy="12" r="10" />
      <path d="M12 16v-4M12 8h.01" />
    </>
  ),
  success: (
    <>
      <circle cx="12" cy="12" r="10" />
      <polyline points="8 12 11 15 16 9" />
    </>
  ),
  warning: (
    <>
      <path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z" />
      <path d="M12 9v4M12 17h.01" />
    </>
  ),
  danger: (
    <>
      <circle cx="12" cy="12" r="10" />
      <path d="M15 9l-6 6M9 9l6 6" />
    </>
  ),
};

export function ToastProvider({
  children,
  duration = 5000,
}: {
  children: ReactNode;
  /** Default auto-dismiss delay in ms. */
  duration?: number;
}) {
  const styles = toastStyles();
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const timers = useRef<Map<string, ReturnType<typeof setTimeout>>>(new Map());
  const counter = useRef(0);

  const dismiss = useCallback((id: string) => {
    setToasts((list) => list.filter((item) => item.id !== id));
    const timer = timers.current.get(id);
    if (timer) {
      clearTimeout(timer);
      timers.current.delete(id);
    }
  }, []);

  const toast = useCallback(
    (options: ToastOptions) => {
      counter.current += 1;
      const id = `toast-${counter.current}`;
      setToasts((list) => [...list, { ...options, id }]);
      const ms = options.duration ?? duration;
      if (ms > 0)
        timers.current.set(
          id,
          setTimeout(() => dismiss(id), ms),
        );
      return id;
    },
    [dismiss, duration],
  );

  return (
    <ToastContext.Provider value={{ toast, dismiss }}>
      {children}
      <Portal>
        <div className={styles.viewport}>
          {toasts.map((item) => {
            const tone = item.tone ?? "neutral";
            return (
              <div
                key={item.id}
                role="status"
                aria-live="polite"
                className={styles.toast}
                data-tone={tone === "neutral" ? undefined : tone}
              >
                <span className={styles.icon}>
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden
                  >
                    {ICON_PATHS[tone]}
                  </svg>
                </span>
                <div className={styles.content}>
                  {item.title ? <p className={styles.title}>{item.title}</p> : null}
                  {item.description ? (
                    <p className={styles.description}>{item.description}</p>
                  ) : null}
                </div>
                <button
                  type="button"
                  className={styles.close}
                  aria-label="Dismiss"
                  onClick={() => dismiss(item.id)}
                >
                  <svg
                    width="14"
                    height="14"
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
                </button>
              </div>
            );
          })}
        </div>
      </Portal>
    </ToastContext.Provider>
  );
}
