import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { PageHero, SiteLayout } from "@/components/site/SiteLayout";
import { useStore } from "@/store/StoreContext";
import { portfolioCategories, resolveImage } from "@/data/mock";

export const Route = createFileRoute("/portfolio")({
  head: () => ({
    meta: [
      { title: "Footwear Portfolio — LUVAAN Manufacturing & Design" },
      {
        name: "description",
        content:
          "Lifestyle, sports, formal and premium sneaker lines designed and produced by LUVAAN in Pune, plus custom orders and workshop showcases.",
      },
      { property: "og:title", content: "LUVAAN Footwear Portfolio" },
      {
        property: "og:description",
        content: "Selected footwear lines designed, manufactured and delivered by LUVAAN.",
      },
    ],
  }),
  component: PortfolioPage,
});

function PortfolioPage() {
  const { portfolio } = useStore();
  const [active, setActive] = useState("All");

  const filters = useMemo(() => ["All", ...portfolioCategories], []);
  const items = portfolio.filter(
    (p) => p.published && (active === "All" || p.category === active),
  );

  return (
    <SiteLayout>
      <PageHero
        eyebrow="Our Work"
        title="Lines we have built."
        subtitle="From lifestyle capsules to bulk custom orders — a look at what leaves our Pune workshop."
      />

      <section className="container-luv py-14">
        <div className="flex flex-wrap gap-2">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActive(f)}
              className={`pill border transition-colors ${
                active === f
                  ? "border-charcoal bg-charcoal text-primary-foreground"
                  : "border-border bg-card text-muted-foreground hover:border-accent hover:text-foreground"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <article
              key={item.id}
              className="card-luv group overflow-hidden hover:-translate-y-1 hover:shadow-[var(--shadow-lift)]"
            >
              <div className="aspect-4/3 overflow-hidden bg-cream">
                <img
                  src={resolveImage(item.image)}
                  alt={item.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="p-5">
                <p className="eyebrow text-accent">{item.category}</p>
                <h2 className="mt-2 text-lg font-semibold">{item.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {item.description}
                </p>
              </div>
            </article>
          ))}
        </div>

        {items.length === 0 && (
          <p className="mt-12 text-center text-sm text-muted-foreground">
            No published projects in this category yet.
          </p>
        )}
      </section>
    </SiteLayout>
  );
}
