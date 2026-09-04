import { createFileRoute } from "@tanstack/react-router";
import { AdminLayout, TableWrap } from "@/components/admin/AdminLayout";
import { useStore } from "@/store/StoreContext";
import { categories, inr } from "@/data/mock";

export const Route = createFileRoute("/admin/categories")({
  head: () => ({
    meta: [
      { title: "Categories — LUVAAN Admin" },
      { name: "description", content: "Review LUVAAN footwear categories, product counts and catalogue value." },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "LUVAAN Categories" },
      { property: "og:description", content: "Footwear category overview for the LUVAAN demo store." },
    ],
  }),
  component: AdminCategories,
});

function AdminCategories() {
  const { products } = useStore();

  return (
    <AdminLayout title="Categories" subtitle="Category performance across the catalogue">
      <TableWrap>
        <thead className="bg-secondary text-xs tracking-wide text-muted-foreground uppercase">
          <tr>
            {["Category", "Products", "Active", "Avg. price", "Stock"].map((h) => (
              <th key={h} className="px-4 py-3 font-semibold">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {categories.map((c) => {
            const items = products.filter((p) => p.category === c);
            const avg = items.length ? Math.round(items.reduce((s, p) => s + p.price, 0) / items.length) : 0;
            return (
              <tr key={c} className="border-t border-border">
                <td className="px-4 py-3 font-medium">{c}</td>
                <td className="px-4 py-3 text-muted-foreground">{items.length}</td>
                <td className="px-4 py-3 text-muted-foreground">
                  {items.filter((p) => p.status === "Active").length}
                </td>
                <td className="px-4 py-3">{items.length ? inr(avg) : "—"}</td>
                <td className="px-4 py-3 text-muted-foreground">
                  {items.reduce((s, p) => s + p.stock, 0)}
                </td>
              </tr>
            );
          })}
        </tbody>
      </TableWrap>
      <p className="mt-4 text-xs text-muted-foreground">
        Categories are fixed in the demo mock data; assign products to a category from Product
        Management.
      </p>
    </AdminLayout>
  );
}
