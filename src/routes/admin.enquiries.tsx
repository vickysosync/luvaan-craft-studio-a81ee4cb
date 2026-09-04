import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AdminLayout, StatusPill, TableWrap } from "@/components/admin/AdminLayout";
import { useStore } from "@/store/StoreContext";
import type { Enquiry } from "@/data/mock";

export const Route = createFileRoute("/admin/enquiries")({
  head: () => ({
    meta: [
      { title: "Contact Enquiries — LUVAAN Admin" },
      { name: "description", content: "Read and resolve contact enquiries submitted on the LUVAAN website." },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "LUVAAN Contact Enquiries" },
      { property: "og:description", content: "Read and resolve website contact enquiries." },
    ],
  }),
  component: AdminEnquiries,
});

const statuses: Enquiry["status"][] = ["New", "Contacted", "Resolved"];

function AdminEnquiries() {
  const { enquiries, setEnquiries, notify } = useStore();
  const [filter, setFilter] = useState<string>("All");
  const rows = enquiries.filter((e) => filter === "All" || e.status === filter);

  return (
    <AdminLayout
      title="Contact Enquiries"
      subtitle={`${enquiries.filter((e) => e.status === "New").length} new of ${enquiries.length}`}
    >
      <div className="mb-4 flex flex-wrap gap-2">
        {["All", ...statuses].map((s) => (
          <button key={s} onClick={() => setFilter(s)} className={filter === s ? "btn-primary px-4 py-2 text-xs" : "btn-outline px-4 py-2 text-xs"}>
            {s}
          </button>
        ))}
      </div>

      <TableWrap>
        <thead className="bg-secondary text-xs tracking-wide text-muted-foreground uppercase">
          <tr>
            {["Name", "Contact", "Subject", "Message", "Date", "Status", "Update"].map((h) => (
              <th key={h} className="px-4 py-3 font-semibold">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((e) => (
            <tr key={e.id} className="border-t border-border align-top">
              <td className="px-4 py-3 font-medium">{e.name}</td>
              <td className="px-4 py-3 text-muted-foreground">
                {e.email}
                <span className="block">{e.phone}</span>
              </td>
              <td className="px-4 py-3">{e.subject}</td>
              <td className="max-w-xs px-4 py-3 text-muted-foreground">{e.message}</td>
              <td className="px-4 py-3 text-muted-foreground">{e.date}</td>
              <td className="px-4 py-3"><StatusPill value={e.status} /></td>
              <td className="px-4 py-3">
                <select
                  className="field py-2 text-xs"
                  value={e.status}
                  onChange={(ev) => {
                    const status = ev.target.value as Enquiry["status"];
                    setEnquiries((prev) => prev.map((x) => (x.id === e.id ? { ...x, status } : x)));
                    notify(`${e.name} → ${status}`);
                  }}
                >
                  {statuses.map((s) => <option key={s}>{s}</option>)}
                </select>
              </td>
            </tr>
          ))}
          {rows.length === 0 && (
            <tr><td colSpan={7} className="px-4 py-10 text-center text-muted-foreground">No enquiries in this view.</td></tr>
          )}
        </tbody>
      </TableWrap>
    </AdminLayout>
  );
}
