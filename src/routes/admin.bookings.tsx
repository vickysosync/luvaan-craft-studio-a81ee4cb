import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AdminLayout, StatusPill, TableWrap } from "@/components/admin/AdminLayout";
import { useStore } from "@/store/StoreContext";
import { bookingStatuses, inr } from "@/data/mock";

export const Route = createFileRoute("/admin/bookings")({
  head: () => ({
    meta: [
      { title: "Cleaning Bookings — LUVAAN Admin" },
      { name: "description", content: "Review and progress LUVAAN shoe cleaning bookings." },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "LUVAAN Cleaning Bookings" },
      { property: "og:description", content: "Review and progress shoe cleaning bookings." },
    ],
  }),
  component: AdminBookings,
});

function AdminBookings() {
  const { bookings, setBookings, notify } = useStore();
  const [filter, setFilter] = useState("All");
  const [q, setQ] = useState("");

  const rows = bookings.filter(
    (b) =>
      (filter === "All" || b.status === filter) &&
      (b.id + b.customer + b.service).toLowerCase().includes(q.toLowerCase()),
  );

  return (
    <AdminLayout
      title="Cleaning Bookings"
      subtitle={`${bookings.length} bookings · ${bookings.filter((b) => b.status === "New").length} new`}
      actions={
        <input className="field w-40 py-2 sm:w-56" placeholder="Search bookings" value={q} onChange={(e) => setQ(e.target.value)} />
      }
    >
      <div className="mb-4 flex flex-wrap gap-2">
        {["All", ...bookingStatuses].map((s) => (
          <button key={s} onClick={() => setFilter(s)} className={filter === s ? "btn-primary px-4 py-2 text-xs" : "btn-outline px-4 py-2 text-xs"}>
            {s}
          </button>
        ))}
      </div>

      <TableWrap>
        <thead className="bg-secondary text-xs tracking-wide text-muted-foreground uppercase">
          <tr>
            {["Booking ID", "Customer", "Shoe type", "Service", "Date", "Time", "Amount", "Status", "Update"].map((h) => (
              <th key={h} className="px-4 py-3 font-semibold">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((b) => (
            <tr key={b.id} className="border-t border-border align-top">
              <td className="px-4 py-3 font-medium">{b.id}</td>
              <td className="px-4 py-3">
                {b.customer}
                <span className="block text-xs text-muted-foreground">{b.phone}</span>
              </td>
              <td className="px-4 py-3 text-muted-foreground">{b.shoeType}</td>
              <td className="px-4 py-3">{b.service}<span className="block text-xs text-muted-foreground">{b.mode}</span></td>
              <td className="px-4 py-3 text-muted-foreground">{b.date}</td>
              <td className="px-4 py-3 text-muted-foreground">{b.time}</td>
              <td className="px-4 py-3">{inr(b.amount)}</td>
              <td className="px-4 py-3"><StatusPill value={b.status} /></td>
              <td className="px-4 py-3">
                <select
                  className="field py-2 text-xs"
                  value={b.status}
                  onChange={(e) => {
                    const status = e.target.value;
                    setBookings((prev) => prev.map((x) => (x.id === b.id ? { ...x, status } : x)));
                    notify(`${b.id} → ${status}`);
                  }}
                >
                  {bookingStatuses.map((s) => <option key={s}>{s}</option>)}
                </select>
              </td>
            </tr>
          ))}
          {rows.length === 0 && (
            <tr><td colSpan={9} className="px-4 py-10 text-center text-muted-foreground">No bookings match this view.</td></tr>
          )}
        </tbody>
      </TableWrap>
    </AdminLayout>
  );
}
