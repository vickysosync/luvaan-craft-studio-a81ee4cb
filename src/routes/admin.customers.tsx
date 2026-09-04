import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AdminLayout, StatusPill, TableWrap } from "@/components/admin/AdminLayout";
import { useStore } from "@/store/StoreContext";
import { inr } from "@/data/mock";

export const Route = createFileRoute("/admin/customers")({
  head: () => ({
    meta: [
      { title: "Customers — LUVAAN Admin" },
      { name: "description", content: "Customer records, order counts and lifetime spend for the LUVAAN demo store." },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "LUVAAN Customers" },
      { property: "og:description", content: "Customer records for the LUVAAN demo store." },
    ],
  }),
  component: AdminCustomers,
});

function AdminCustomers() {
  const { customers, setCustomers, notify } = useStore();
  const [q, setQ] = useState("");
  const rows = customers.filter((c) => (c.name + c.email + c.phone + c.id).toLowerCase().includes(q.toLowerCase()));

  return (
    <AdminLayout
      title="Customers"
      subtitle={`${customers.length} customers · ${inr(customers.reduce((s, c) => s + c.spent, 0))} lifetime spend`}
      actions={<input className="field w-40 py-2 sm:w-56" placeholder="Search customers" value={q} onChange={(e) => setQ(e.target.value)} />}
    >
      <TableWrap>
        <thead className="bg-secondary text-xs tracking-wide text-muted-foreground uppercase">
          <tr>
            {["Customer ID", "Name", "Phone", "Email", "Orders", "Total spent", "Status", "Action"].map((h) => (
              <th key={h} className="px-4 py-3 font-semibold">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((c) => (
            <tr key={c.id} className="border-t border-border">
              <td className="px-4 py-3 font-medium">{c.id}</td>
              <td className="px-4 py-3">{c.name}</td>
              <td className="px-4 py-3 text-muted-foreground">{c.phone}</td>
              <td className="px-4 py-3 text-muted-foreground">{c.email}</td>
              <td className="px-4 py-3">{c.orders}</td>
              <td className="px-4 py-3">{inr(c.spent)}</td>
              <td className="px-4 py-3"><StatusPill value={c.status} /></td>
              <td className="px-4 py-3">
                <button
                  className="btn-ghost text-xs"
                  onClick={() => {
                    setCustomers((prev) => prev.map((x) => (x.id === c.id ? { ...x, status: x.status === "Active" ? "Inactive" : "Active" } : x)));
                    notify(`${c.name} ${c.status === "Active" ? "deactivated" : "activated"}`);
                  }}
                >
                  {c.status === "Active" ? "Deactivate" : "Activate"}
                </button>
              </td>
            </tr>
          ))}
          {rows.length === 0 && (
            <tr><td colSpan={8} className="px-4 py-10 text-center text-muted-foreground">No customers found.</td></tr>
          )}
        </tbody>
      </TableWrap>
    </AdminLayout>
  );
}
