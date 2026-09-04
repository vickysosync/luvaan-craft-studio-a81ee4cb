import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AdminLayout, StatusPill, TableWrap } from "@/components/admin/AdminLayout";
import { useStore } from "@/store/StoreContext";
import { inr, orderStatuses } from "@/data/mock";

export const Route = createFileRoute("/admin/orders")({
  head: () => ({
    meta: [
      { title: "Order Management — LUVAAN Admin" },
      { name: "description", content: "Track and update LUVAAN footwear orders and payment status." },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "LUVAAN Order Management" },
      { property: "og:description", content: "Track and update LUVAAN footwear orders." },
    ],
  }),
  component: AdminOrders,
});

function AdminOrders() {
  const { orders, setOrders, notify } = useStore();
  const [filter, setFilter] = useState("All");
  const [q, setQ] = useState("");

  const rows = orders.filter(
    (o) =>
      (filter === "All" || o.status === filter) &&
      (o.id + o.customer).toLowerCase().includes(q.toLowerCase()),
  );

  const setStatus = (id: string, status: string) => {
    setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status } : o)));
    notify(`${id} marked ${status}`);
  };

  return (
    <AdminLayout
      title="Orders"
      subtitle={`${orders.length} mock orders · ${inr(orders.reduce((s, o) => s + o.amount, 0))} revenue`}
      actions={
        <input
          className="field w-40 py-2 sm:w-56"
          placeholder="Search orders"
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
      }
    >
      <div className="mb-4 flex flex-wrap gap-2">
        {["All", ...orderStatuses].map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={filter === s ? "btn-primary px-4 py-2 text-xs" : "btn-outline px-4 py-2 text-xs"}
          >
            {s}
          </button>
        ))}
      </div>

      <TableWrap>
        <thead className="bg-secondary text-xs tracking-wide text-muted-foreground uppercase">
          <tr>
            {["Order ID", "Customer", "Date", "Items", "Amount", "Payment", "Status", "Update"].map((h) => (
              <th key={h} className="px-4 py-3 font-semibold">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((o) => (
            <tr key={o.id} className="border-t border-border">
              <td className="px-4 py-3 font-medium">{o.id}</td>
              <td className="px-4 py-3">{o.customer}</td>
              <td className="px-4 py-3 text-muted-foreground">{o.date}</td>
              <td className="px-4 py-3 text-muted-foreground">{o.items}</td>
              <td className="px-4 py-3">{inr(o.amount)}</td>
              <td className="px-4 py-3"><StatusPill value={o.payment} /></td>
              <td className="px-4 py-3"><StatusPill value={o.status} /></td>
              <td className="px-4 py-3">
                <select
                  className="field py-2 text-xs"
                  value={o.status}
                  onChange={(e) => setStatus(o.id, e.target.value)}
                >
                  {orderStatuses.map((s) => <option key={s}>{s}</option>)}
                </select>
              </td>
            </tr>
          ))}
          {rows.length === 0 && (
            <tr><td colSpan={8} className="px-4 py-10 text-center text-muted-foreground">No orders match this view.</td></tr>
          )}
        </tbody>
      </TableWrap>
    </AdminLayout>
  );
}
