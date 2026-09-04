import { useStore } from "@/store/StoreContext";

export function Toaster() {
  const { toasts } = useStore();
  if (toasts.length === 0) return null;
  return (
    <div className="pointer-events-none fixed bottom-5 left-1/2 z-[60] flex w-[min(92vw,24rem)] -translate-x-1/2 flex-col gap-2">
      {toasts.map((t) => (
        <div
          key={t.id}
          className={`animate-rise rounded-lg px-4 py-3 text-sm font-medium shadow-[var(--shadow-lift)] ${
            t.tone === "error"
              ? "bg-destructive text-destructive-foreground"
              : "bg-charcoal text-primary-foreground"
          }`}
        >
          {t.message}
        </div>
      ))}
    </div>
  );
}
