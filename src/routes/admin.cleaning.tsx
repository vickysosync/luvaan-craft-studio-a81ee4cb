import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AdminLayout, StatusPill, TableWrap } from "@/components/admin/AdminLayout";
import { useStore } from "@/store/StoreContext";
import { inr, resolveImage, type Service } from "@/data/mock";

export const Route = createFileRoute("/admin/cleaning")({
  head: () => ({
    meta: [
      { title: "Shoe Cleaning Services — LUVAAN Admin" },
      { name: "description", content: "Manage LUVAAN shoe cleaning services, pricing and availability." },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "LUVAAN Cleaning Services" },
      { property: "og:description", content: "Manage LUVAAN shoe cleaning services and pricing." },
    ],
  }),
  component: AdminCleaning,
});

const blank: Service = {
  id: "",
  name: "",
  price: 299,
  duration: "24 hours",
  description: "",
  image: "cleaning",
  status: "Active",
};

function AdminCleaning() {
  const { services, setServices, notify } = useStore();
  const [editing, setEditing] = useState<Service | null>(null);
  const [isNew, setIsNew] = useState(false);

  const save = () => {
    if (!editing) return;
    if (!editing.name.trim()) return notify("Service name is required", "error");
    if (isNew) {
      const id = `svc-${Date.now()}`;
      setServices((prev) => [{ ...editing, id }, ...prev]);
      notify("Service added");
    } else {
      setServices((prev) => prev.map((s) => (s.id === editing.id ? editing : s)));
      notify("Service updated");
    }
    setEditing(null);
  };

  return (
    <AdminLayout
      title="Shoe Cleaning"
      subtitle={`${services.length} services published to the public page`}
      actions={
        <button className="btn-primary px-4 py-2 text-xs" onClick={() => { setEditing(blank); setIsNew(true); }}>
          Add service
        </button>
      }
    >
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {services.map((s) => (
          <div key={s.id} className="card-luv overflow-hidden">
            <img src={resolveImage(s.image)} alt={s.name} className="h-36 w-full object-cover" loading="lazy" />
            <div className="p-5">
              <div className="flex items-start justify-between gap-3">
                <h3 className="font-semibold">{s.name}</h3>
                <StatusPill value={s.status} />
              </div>
              <p className="mt-2 text-sm text-muted-foreground">{s.description}</p>
              <p className="mt-3 text-sm font-semibold">{inr(s.price)} · {s.duration}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                <button className="btn-outline px-4 py-2 text-xs" onClick={() => { setEditing(s); setIsNew(false); }}>Edit</button>
                <button
                  className="btn-ghost text-xs"
                  onClick={() => {
                    setServices((prev) => prev.map((x) => (x.id === s.id ? { ...x, status: x.status === "Active" ? "Paused" : "Active" } : x)));
                    notify(`${s.name} ${s.status === "Active" ? "paused" : "activated"}`);
                  }}
                >
                  {s.status === "Active" ? "Pause" : "Activate"}
                </button>
                <button
                  className="btn-ghost text-xs text-destructive"
                  onClick={() => { setServices((prev) => prev.filter((x) => x.id !== s.id)); notify("Service deleted"); }}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {editing && (
        <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-charcoal/50 p-4 backdrop-blur-sm">
          <div className="card-luv my-8 w-full max-w-xl p-6">
            <h2 className="text-lg font-semibold">{isNew ? "Add service" : "Edit service"}</h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label className="label-luv">Name</label>
                <input className="field" value={editing.name} onChange={(e) => setEditing({ ...editing, name: e.target.value })} />
              </div>
              <div>
                <label className="label-luv">Price (₹)</label>
                <input type="number" className="field" value={editing.price} onChange={(e) => setEditing({ ...editing, price: Number(e.target.value) })} />
              </div>
              <div>
                <label className="label-luv">Duration</label>
                <input className="field" value={editing.duration} onChange={(e) => setEditing({ ...editing, duration: e.target.value })} />
              </div>
              <div>
                <label className="label-luv">Image key</label>
                <select className="field" value={editing.image} onChange={(e) => setEditing({ ...editing, image: e.target.value })}>
                  {["cleaning", "sneaker", "formal", "loafer", "sports", "hero", "factory"].map((k) => <option key={k}>{k}</option>)}
                </select>
              </div>
              <div>
                <label className="label-luv">Status</label>
                <select className="field" value={editing.status} onChange={(e) => setEditing({ ...editing, status: e.target.value as Service["status"] })}>
                  <option>Active</option>
                  <option>Paused</option>
                </select>
              </div>
              <div className="sm:col-span-2">
                <label className="label-luv">Description</label>
                <textarea className="field h-24" value={editing.description} onChange={(e) => setEditing({ ...editing, description: e.target.value })} />
              </div>
            </div>
            <div className="mt-6 flex justify-end gap-2">
              <button className="btn-outline px-5 py-2 text-xs" onClick={() => setEditing(null)}>Cancel</button>
              <button className="btn-primary px-5 py-2 text-xs" onClick={save}>Save service</button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
