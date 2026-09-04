import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { PageHero, SiteLayout } from "@/components/site/SiteLayout";
import { ProductCard } from "@/components/site/ProductCard";
import { useStore } from "@/store/StoreContext";
import { categories, inr } from "@/data/mock";

export const Route = createFileRoute("/collection")({
  head: () => ({
    meta: [
      { title: "Collection — Shop LUVAAN Footwear Online" },
      {
        name: "description",
        content:
          "Browse the full LUVAAN footwear collection: sneakers, running, formal, casual, loafers, sports and premium shoes with filters and sorting.",
      },
      { property: "og:title", content: "Shop the LUVAAN Collection" },
      {
        property: "og:description",
        content: "Sneakers, formals, loafers and sports footwear crafted by LUVAAN.",
      },
    ],
  }),
  component: Collection,
});

const sortOptions = ["Featured", "Price Low to High", "Price High to Low", "Newest", "Best Rated"];

function Collection() {
  const { products } = useStore();
  const [category, setCategory] = useState("All");
  const [maxPrice, setMaxPrice] = useState(9000);
  const [size, setSize] = useState<number | null>(null);
  const [color, setColor] = useState("All");
  const [minRating, setMinRating] = useState(0);
  const [sort, setSort] = useState("Featured");

  const allColors = useMemo(
    () => ["All", ...Array.from(new Set(products.flatMap((p) => p.colors)))],
    [products],
  );
  const allSizes = useMemo(
    () => Array.from(new Set(products.flatMap((p) => p.sizes))).sort((a, b) => a - b),
    [products],
  );

  const list = useMemo(() => {
    let out = products.filter((p) => p.status !== "Draft");
    if (category !== "All") out = out.filter((p) => p.category === category);
    out = out.filter((p) => p.price <= maxPrice);
    if (size) out = out.filter((p) => p.sizes.includes(size));
    if (color !== "All") out = out.filter((p) => p.colors.includes(color));
    if (minRating) out = out.filter((p) => p.rating >= minRating);

    const sorted = [...out];
    if (sort === "Price Low to High") sorted.sort((a, b) => a.price - b.price);
    if (sort === "Price High to Low") sorted.sort((a, b) => b.price - a.price);
    if (sort === "Newest") sorted.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
    if (sort === "Best Rated") sorted.sort((a, b) => b.rating - a.rating);
    if (sort === "Featured") sorted.sort((a, b) => Number(b.featured) - Number(a.featured));
    return sorted;
  }, [products, category, maxPrice, size, color, minRating, sort]);

  const reset = () => {
    setCategory("All");
    setMaxPrice(9000);
    setSize(null);
    setColor("All");
    setMinRating(0);
    setSort("Featured");
  };

  return (
    <SiteLayout>
      <PageHero
        eyebrow="The Collection"
        title="Every pair, one standard."
        subtitle="Filter by category, price, size, colour and rating to find the LUVAAN pair that fits your day."
      />

      <div className="container-luv py-12">
        <div className="flex flex-wrap gap-2">
          {["All", ...categories].map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={`rounded-full border px-5 py-2 text-sm font-medium transition-all ${
                category === c
                  ? "border-charcoal bg-charcoal text-primary-foreground"
                  : "border-border bg-card text-muted-foreground hover:border-charcoal/40 hover:text-foreground"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-[16rem_1fr]">
          <aside className="card-luv h-fit space-y-6 p-6">
            <div>
              <p className="label-luv">Max price · {inr(maxPrice)}</p>
              <input
                type="range"
                min={1000}
                max={9000}
                step={100}
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-[oklch(0.72_0.085_72)]"
              />
            </div>

            <div>
              <p className="label-luv">Size</p>
              <div className="flex flex-wrap gap-2">
                {allSizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSize(size === s ? null : s)}
                    className={`h-9 w-9 rounded-md border text-xs font-semibold transition-colors ${
                      size === s
                        ? "border-charcoal bg-charcoal text-primary-foreground"
                        : "border-border hover:border-charcoal/40"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="label-luv">Colour</p>
              <select value={color} onChange={(e) => setColor(e.target.value)} className="field">
                {allColors.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </div>

            <div>
              <p className="label-luv">Minimum rating</p>
              <div className="flex gap-2">
                {[0, 4, 4.5].map((r) => (
                  <button
                    key={r}
                    onClick={() => setMinRating(r)}
                    className={`rounded-md border px-3 py-1.5 text-xs font-semibold transition-colors ${
                      minRating === r
                        ? "border-charcoal bg-charcoal text-primary-foreground"
                        : "border-border hover:border-charcoal/40"
                    }`}
                  >
                    {r === 0 ? "Any" : `${r}+`}
                  </button>
                ))}
              </div>
            </div>

            <button onClick={reset} className="btn-ghost px-0 text-xs">
              Reset filters
            </button>
          </aside>

          <div>
            <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
              <p className="text-sm text-muted-foreground">{list.length} products</p>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="field w-auto py-2 text-sm"
              >
                {sortOptions.map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
            </div>

            {list.length === 0 ? (
              <div className="card-luv p-12 text-center text-muted-foreground">
                No products match these filters.
              </div>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {list.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </SiteLayout>
  );
}
