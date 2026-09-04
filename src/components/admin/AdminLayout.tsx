import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import { useStore } from "@/store/StoreContext";

export const adminNav = [
  { to: "/admin/dashboard", label: "Dashboard" },
  { to: "/admin/products", label: "Products" },
  { to: "/admin/categories", label: "Categories" },
  { to: "/admin/orders", label: "Orders" },
  { to: "/admin/cleaning", label: "Shoe Cleaning" },
  { to: "/admin/bookings", label: "Cleaning Bookings" },
  { to: "/admin/portfolio", label: "Portfolio" },
  { to: "/admin/manufacturing", label: "Manufacturing" },
  { to: "/admin/homepage", label: "Homepage" },
  { to: "/admin/customers", label: "Customers" },
  { to: "/admin/reviews", label: "Reviews" },
  { to: "/admin/enquiries", label: "Contact Enquiries" },
  { to: "/admin/settings", label: "Settings" },
] as const;

export function AdminLayout({
  title,
  subtitle,
  actions,
  children,
}: {
  title: string;
  subtitle?: string;
  actions?: ReactNode;
  children: ReactNode;
}) {
  const { isAdmin, logout, settings } = useStore();
  const navigate = useNavigate();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!isAdmin) navigate({ to: "/admin/login" });
  }, [isAdmin, navigate]);

  if (!isAdmin) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-cream">
        <p className="text-sm text-muted-foreground">Redirecting to admin login…</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream lg:flex">
      <aside
        className={`${
          open ? "block" : "hidden"
        } bg-charcoal text-primary-foreground lg:sticky lg:top-0 lg:block lg:h-screen lg:w-64 lg:shrink-0 lg:overflow-y-auto`}
      >
        <div className="px-6 py-6">
          <Link to="/" className="font-display text-xl font-semibold tracking-[0.22em]">
            {settings.brandName}
          </Link>
          <p className="mt-1 text-[11px] tracking-[0.2em] text-accent uppercase">Admin</p>
        </div>
        <nav className="space-y-1 px-3 pb-8">
          {adminNav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              onClick={() => setOpen(false)}
              className={`block rounded-lg px-3 py-2 text-sm transition-colors ${
                pathname === n.to
                  ? "bg-primary-foreground/10 text-accent"
                  : "text-primary-foreground/65 hover:bg-primary-foreground/5 hover:text-primary-foreground"
              }`}
            >
              {n.label}
            </Link>
          ))}
          <button
            onClick={() => {
              logout();
              navigate({ to: "/admin/login" });
            }}
            className="mt-3 block w-full rounded-lg px-3 py-2 text-left text-sm text-primary-foreground/65 transition-colors hover:bg-primary-foreground/5 hover:text-destructive"
          >
            Logout
          </button>
        </nav>
      </aside>

      <div className="min-w-0 flex-1">
        <header className="sticky top-0 z-20 border-b border-border bg-background/90 backdrop-blur">
          <div className="flex items-center gap-4 px-5 py-4">
            <button
              className="btn-outline px-3 py-2 lg:hidden"
              onClick={() => setOpen((o) => !o)}
              aria-label="Toggle admin menu"
            >
              ☰
            </button>
            <div className="min-w-0 flex-1">
              <h1 className="truncate text-lg font-semibold">{title}</h1>
              {subtitle && (
                <p className="truncate text-xs text-muted-foreground">{subtitle}</p>
              )}
            </div>
            <div className="flex shrink-0 items-center gap-2">{actions}</div>
          </div>
        </header>
        <main className="px-5 py-7">{children}</main>
      </div>
    </div>
  );
}

export function StatusPill({ value }: { value: string }) {
  const tone =
    /Delivered|Completed|Approved|Active|Paid|Resolved|Published/.test(value)
      ? "bg-accent/15 text-accent-foreground"
      : /Cancelled|Rejected|Out of Stock|Inactive|Hidden/.test(value)
        ? "bg-destructive/10 text-destructive"
        : "bg-secondary text-secondary-foreground";
  return <span className={`pill ${tone}`}>{value}</span>;
}

export function TableWrap({ children }: { children: ReactNode }) {
  return (
    <div className="card-luv overflow-x-auto p-0">
      <table className="w-full min-w-[720px] text-left text-sm">{children}</table>
    </div>
  );
}
