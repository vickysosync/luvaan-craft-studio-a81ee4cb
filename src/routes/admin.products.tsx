import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AdminLayout, StatusPill, TableWrap } from "@/components/admin/AdminLayout";
import { useStore } from "@/store/StoreContext";
import { categories, inr, resolveImage, type Product } from "@/data/mock";

export const Route = createFileRoute("/admin/products")({
  head: () => ({
    meta: [
      { title: "Product Management — LUVAAN Admin" },
      { name: "description", content: "Add, edit, price and stock LUVAAN footwear products." },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "LUVAAN Product Management" },
      { property: "og:description", content: "Manage the LUVAAN footwear catalogue." },
    ],
  }),
  component: AdminProducts,
});

const blank: Product = {
  id: "",
  name: "",
  category: "Sneakers",
  price: 1999,
  originalPrice: undefined,
  rating: 4.5,
  reviewCount: 0,
  description: "",
  details: "",
  materials: "",
  care: "",
  sizes: [7, 8, 9, 10],
  colors: ["Charcoal"],
  image: "sneaker",
  gallery: ["sneaker"],
  stock: 20,
  status: "Active",
  featured: false,
  createdAt: new Date().toISOString().slice(0, 10),
};

function AdminProducts() {
  const { products, setProducts, notify } = useStore();
  const [query, setQuery] = useState("");
  const [cat, setCat] = useState("All");
  const [editing, setEditing] = useState<Product | null>(null);

  const rows = products.filter(
    (p) =>
      (cat === "All" || p.category === cat) &&
      p.name.toLowerCase().includes(query.toLowerCase()),
  );

  function save() {
    if (!editing) return;
    const item = { ...editing, id: editing.id || editing.name.toLowerCase().replace(/[^a-z0-9]+/g, "-") };
    setProducts((prev) =>
      prev.some((p) => p.id === item.id)
        ? prev.map((p) => (p.id === item.id ? item : p))
        : [item, ...prev],
    );
    setEditing(null);
    notify("Product saved.");
  }

  return (
    <AdminLayout
      title="Products"
      subtitle={`${products.length} products in the catalogue`}
      actions={
        <button className="btn-primary px-4 py-2" onClick={() => setEditing({ ...blank })}>
          Add Product
        </button>
      }
    >
      <div className="mb-5 flex flex-wrap gap-3">
        <input
          className="field max-w-xs"
          placeholder="Search products…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <select className="field max-w-[200px]" value={cat} onChange={(e) => setCat(e.target.value)}>
          {["All", ...categories].map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
      </div>

      <TableWrap>
        <thead className="bg-secondary text-xs tracking-wide text-muted-foreground uppercase">
          <tr>
            {["Product", "Category", "Price", "Stock", "Status", "Featured", ""].map((h) => (
              <th key={h} className="px-4 py-3 font-semibold">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((p) => (
            <tr key={p.id} className="border-t border-border">
              <td className="px-4 py-3">
                <div className="flex items-center gap-3">
                  <img src={resolveImage(p.image)} alt={p.name} className="h-10 w-10 rounded-md object-cover" />
                  <span className="font-medium">{p.name}</span>
                </div>
              </td>
              <td className="px-4 py-3 text-muted-foreground">{p.category}</td>
              <td className="px-4 py-3">
                <input
                  className="w-24 rounded-md border border-input bg-card px-2 py-1 text-sm"
                  type="number"
                  value={p.price}
                  onChange={(e) =>
                    setProducts((prev) =>
                      prev.map((x) => (x.id === p.id ? { ...x, price: Number(e.target.value) } : x)),
                    )
                  }
                />
              </td>
              <td className="px-4 py-3">
                <input
                  className="w-20 rounded-md border border-input bg-card px-2 py-1 text-sm"
                  type="number"
                  value={p.stock}
                  onChange={(e) =>
                    setProducts((prev) =>
                      prev.map((x) => (x.id === p.id ? { ...x, stock: Number(e.target.value) } : x)),
                    )
                  }
                />
              </td>
              <td className="px-4 py-3">
                <select
                  className="rounded-md border border-input bg-card px-2 py-1 text-xs"
                  value={p.status}
                  onChange={(e) =>
                    setProducts((prev) =>
                      prev.map((x) =>
                        x.id === p.id ? { ...x, status: e.target.value as Product["status"] } : x,
                      ),
                    )
                  }
                >
                  <option>Active</option>
                  <option>Draft</option>
                  <option>Out of Stock</option>
                </select>
              </td>
              <td className="px-4 py-3">
                <button
                  className="pill border border-border"
                  onClick={() =>
                    setProducts((prev) =>
                      prev.map((x) => (x.id === p.id ? { ...x, featured: !x.featured } : x)),
                    )
                  }
                >
                  {p.featured ? "Featured" : "Standard"}
                </button>
              </td>
              <td className="px-4 py-3 text-right whitespace-nowrap">
                <button className="btn-ghost" onClick={() => setEditing(p)}>Edit</button>
                <button
                  className="btn-ghost text-destructive"
                  onClick={() => {
                    setProducts((prev) => prev.filter((x) => x.id !== p.id));
                    notify("Product deleted.", "error");
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </TableWrap>

      {rows.length === 0 && (
        <p className="mt-8 text-center text-sm text-muted-foreground">No products match your filters.</p>
      )}

      {editing && (
        <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-charcoal/50 p-4 backdrop-blur-sm">
          <div className="card-luv my-8 w-full max-w-2xl p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">{editing.id ? "Edit Product" : "Add Product"}</h2>
              <StatusPill value={editing.status} />
            </div>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label className="label-luv">Name</label>
                <input className="field" value={editing.name} onChange={(e) => setEditing({ ...editing, name: e.target.value })} />
              </div>
              <div>
                <label className="label-luv">Category</label>
                <select className="field" value={editing.category} onChange={(e) => setEditing({ ...editing, category: e.target.value })}>
                  {categories.map((c) => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="label-luv">Image key</label>
                <select className="field" value={editing.image} onChange={(e) => setEditing({ ...editing, image: e.target.value, gallery: [e.target.value] })}>
                  {["sneaker", "formal", "loafer", "sports", "hero", "cleaning", "factory"].map((k) => <option key={k}>{k}</option>)}
                </select>
              </div>
              <div>
                <label className="label-luv">Price (₹)</label>
                <input type="number" className="field" value={editing.price} onChange={(e) => setEditing({ ...editing, price: Number(e.target.value) })} />
              </div>
              <div>
                <label className="label-luv">Original price (₹)</label>
                <input type="number" className="field" value={editing.originalPrice ?? ""} onChange={(e) => setEditing({ ...editing, originalPrice: e.target.value ? Number(e.target.value) : undefined })} />
              </div>
              <div>
                <label className="label-luv">Sizes (comma separated)</label>
                <input className="field" value={editing.sizes.join(", ")} onChange={(e) => setEditing({ ...editing, sizes: e.target.value.split(",").map((s) => Number(s.trim())).filter(Boolean) })} />
              </div>
              <div>
                <label className="label-luv">Colors (comma separated)</label>
                <input className="field" value={editing.colors.join(", ")} onChange={(e) => setEditing({ ...editing, colors: e.target.value.split(",").map((s) => s.trim()).filter(Boolean) })} />
              </div>
              <div>
                <label className="label-luv">Stock</label>
                <input type="number" className="field" value={editing.stock} onChange={(e) => setEditing({ ...editing, stock: Number(e.target.value) })} />
              </div>
              <div>
                <label className="label-luv">Status</label>
                <select className="field" value={editing.status} onChange={(e) => setEditing({ ...editing, status: e.target.value as Product["status"] })}>
                  <option>Active</option><option>Draft</option><option>Out of Stock</option>
                </select>
              </div>
              <div className="sm:col-span-2">
                <label className="label-luv">Short description</label>
                <textarea rows={2} className="field resize-none" value={editing.description} onChange={(e) => setEditing({ ...editing, description: e.target.value })} />
              </div>
              <div className="sm:col-span-2">
                <label className="label-luv">Details</label>
                <textarea rows={3} className="field resize-none" value={editing.details} onChange={(e) => setEditing({ ...editing, details: e.target.value })} />
              </div>
              <div>
                <label className="label-luv">Materials</label>
                <input className="field" value={editing.materials} onChange={(e) => setEditing({ ...editing, materials: e.target.value })} />
              </div>
              <div>
                <label className="label-luv">Care instructions</label>
                <input className="field" value={editing.care} onChange={(e) => setEditing({ ...editing, care: e.target.value })} />
              </div>
            </div>
            <div className="mt-6 flex justify-between gap-3">
              <span className="self-center text-xs text-muted-foreground">Preview price: {inr(editing.price)}</span>
              <div className="flex gap-3">
                <button className="btn-outline px-5 py-2.5" onClick={() => setEditing(null)}>Cancel</button>
                <button className="btn-primary px-5 py-2.5" onClick={save}>Save Product</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
