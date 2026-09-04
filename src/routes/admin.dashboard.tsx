import { createFileRoute } from "@tanstack/react-router";
import { AdminLayout, StatusPill } from "@/components/admin/AdminLayout";
import { useStore } from "@/store/StoreContext";
import { inr } from "@/data/mock";

export const Route = createFileRoute("/admin/dashboard")({
  head: () => ({
    meta: [
      { title: "Admin Dashboard — LUVAAN" },
      { name: "description", content: "Overview of LUVAAN products, orders, cleaning bookings and revenue." },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "LUVAAN Admin Dashboard" },
      { property: "og:description", content: "Operational overview for the LUVAAN demo store." },
    ],
  }),
  component: Dashboard,
});

function Dashboard() {
  const { products, orders, bookings, portfolio, enquiries } = useStore();

  const revenue = orders.reduce((s, o) => s + o.amount, 0);
  const pendingOrders = orders.filter((o) => /Pending|Confirmed|Processing/.test(o.status)).length;
  const pendingBookings = bookings.filter((b) => !/Completed|Cancelled/.test(b.status)).length;

  const stats = [
    { label: "Total Products", value: products.length },
    { label: "Total Orders", value: orders.length },
    { label: "Cleaning Bookings", value: bookings.length },
    { label: "Portfolio Projects", value: portfolio.length },
    { label: "Contact Enquiries", value: enquiries.length },
    { label: "Revenue", value: inr(revenue) },
    { label: "Pending Orders", value: pendingOrders },
    { label: "Pending Cleaning", value: pendingBookings },
  ];

  const byCategory = products.reduce<Record<string, number>>((acc, p) => {
    acc[p.category] = (acc[p.category] ?? 0) + 1;
    return acc;
  }, {});
  const maxCat = Math.max(...Object.values(byCategory), 1);

  const revenueBars = orders.slice(0, 6).map((o) => ({ label: o.id, value: o.amount }));
  const maxRev = Math.max(...revenueBars.map((r) => r.value), 1);

  return (
    <AdminLayout title="Dashboard" subtitle="Live view of the LUVAAN demo store">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="card-luv p-5 hover:-translate-y-0.5">
            <p className="eyebrow text-muted-foreground">{s.label}</p>
            <p className="mt-3 font-display text-3xl font-semibold">{s.value}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <div className="card-luv p-6">
          <h2 className="text-base font-semibold">Products by category</h2>
          <div className="mt-5 space-y-3">
            {Object.entries(byCategory).map(([cat, count]) => (
              <div key={cat}>
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>{cat}</span>
                  <span>{count}</span>
                </div>
                <div className="mt-1 h-2 rounded-full bg-secondary">
                  <div
                    className="h-2 rounded-full bg-accent transition-all duration-700"
                    style={{ width: `${(count / maxCat) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card-luv p-6">
          <h2 className="text-base font-semibold">Recent order value</h2>
          <div className="mt-6 flex h-44 items-end gap-3">
            {revenueBars.map((r) => (
              <div key={r.label} className="flex flex-1 flex-col items-center gap-2">
                <div
                  className="w-full rounded-t-md bg-charcoal transition-all duration-700"
                  style={{ height: `${Math.max((r.value / maxRev) * 100, 6)}%` }}
                  title={inr(r.value)}
                />
                <span className="text-[10px] text-muted-foreground">{r.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <div className="card-luv p-6">
          <h2 className="text-base font-semibold">Latest orders</h2>
          <ul className="mt-4 space-y-3 text-sm">
            {orders.slice(0, 5).map((o) => (
              <li key={o.id} className="flex items-center justify-between gap-3">
                <span className="truncate">{o.customer}</span>
                <span className="text-muted-foreground">{inr(o.amount)}</span>
                <StatusPill value={o.status} />
              </li>
            ))}
          </ul>
        </div>
        <div className="card-luv p-6">
          <h2 className="text-base font-semibold">Latest cleaning bookings</h2>
          <ul className="mt-4 space-y-3 text-sm">
            {bookings.slice(0, 5).map((b) => (
              <li key={b.id} className="flex items-center justify-between gap-3">
                <span className="truncate">{b.customer}</span>
                <span className="truncate text-muted-foreground">{b.service}</span>
                <StatusPill value={b.status} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </AdminLayout>
  );
}
