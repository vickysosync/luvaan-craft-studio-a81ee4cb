import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AdminLayout, StatusPill } from "@/components/admin/AdminLayout";
import { useStore } from "@/store/StoreContext";
import { imageLibrary, resolveImage, type ManufacturingStep } from "@/data/mock";

export const Route = createFileRoute("/admin/manufacturing")({
  head: () => ({
    meta: [
      { title: "Manufacturing Content — LUVAAN Admin" },
      { name: "description", content: "Edit the LUVAAN seven-step manufacturing process content." },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "LUVAAN Manufacturing Content" },
      { property: "og:description", content: "Edit the LUVAAN manufacturing process content." },
    ],
  }),
  component: AdminManufacturing;
});

const imageKeys = Object.keys(imageLibrary);

function AdminManufacturing() {
  const { steps, setSteps, notify } = useStore();
  const [editing, setEditing] = useState<ManufacturingStep | null>(null);

  const save = () => {
    if (!editing) return;
    setSteps((prev) => prev.map((s) => (s.id === editing.id ? editing : s)).sort((a, b) => a.order - b.order));
    notify("Step updated");
    setEditing(null);
  };

  return (
    <AdminLayout
      title="Manufacturing"
      subtitle="Steps shown on the public manufacturing page"
      actions={
        <button
          className="btn-primary px-4 py-2 text-xs"
          onClick={() => {
            const order = steps.length + 1;
            const step: ManufacturingStep = { id: `MS-${Date.now()}`, order, title: "New step", description: "", image: "factory", status: "Hidden" };
            setSteps((prev) => [...prev, step]);
            setEditing(step);
          }}
        >
          Add step
        </button>
      }
    >
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {[...steps].sort((a, b) => a.order - b.order).map((s) => (
          <div key={s.id} className="card-luv overflow-hidden">
            <img src={resolveImage(s.image)} alt={s.title} className="h-32 w-full object-cover" loading="lazy" />
            <div className="p-5">
              <div className="flex items-start justify-between gap-3">
                <h3 className="font-semibold">{s.order}. {s.title}</h3>
                <StatusPill value={s.status} />
              </div>
              <p className="mt-2 text-sm text-muted-foreground">{s.description}</p>
              <div className="mt-4 flex gap-2">
                <button className="btn-outline px-4 py-2 text-xs" onClick={() => setEditing(s)}>Edit</button>
                <button
                  className="btn-ghost text-xs"
                  onClick={() => {
                    setSteps((prev) => prev.map((x) => (x.id === s.id ? { ...x, status: x.status === "Published" ? "Hidden" : "Published" } : x)));
                    notify(`${s.title} ${s.status === "Published" ? "hidden" : "published"}`);
                  }}
                >
                  {s.status === "Published" ? "Hide" : "Publish"}
                </button>
                <button
                  className="btn-ghost text-xs text-destructive"
                  onClick={() => { setSteps((prev) => prev.filter((x) => x.id !== s.id)); notify("Step deleted"); }}
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
            <h2 className="text-lg font-semibold">Edit step</h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2"><label className="label-luv">Title</label><input className="field" value={editing.title} onChange={(e) => setEditing({ ...editing, title: e.target.value })} /></div>
              <div><label className="label-luv">Order</label><input type="number" className="field" value={editing.order} onChange={(e) => setEditing({ ...editing, order: Number(e.target.value) })} /></div>
              <div>
                <label className="label-luv">Status</label>
                <select className="field" value={editing.status} onChange={(e) => setEditing({ ...editing, status: e.target.value as ManufacturingStep["status"] })}>
                  <option>Published</option>
                  <option>Hidden</option>
                </select>
              </div>
              <div className="sm:col-span-2">
                <label className="label-luv">Image key</label>
                <select className="field" value={editing.image} onChange={(e) => setEditing({ ...editing, image: e.target.value })}>
                  {imageKeys.map((k) => <option key={k}>{k}</option>)}
                </select>
              </div>
              <div className="sm:col-span-2"><label className="label-luv">Description</label><textarea className="field h-24" value={editing.description} onChange={(e) => setEditing({ ...editing, description: e.target.value })} /></div>
            </div>
            <div className="mt-6 flex justify-end gap-2">
              <button className="btn-outline px-5 py-2 text-xs" onClick={() => setEditing(null)}>Cancel</button>
              <button className="btn-primary px-5 py-2 text-xs" onClick={save}>Save step</button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
