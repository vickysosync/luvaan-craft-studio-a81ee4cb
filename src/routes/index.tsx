import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { ProductCard } from "@/components/site/ProductCard";
import { useStore } from "@/store/StoreContext";
import { inr, manufacturingStats, resolveImage } from "@/data/mock";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "LUVAAN — Premium Footwear, Manufacturing & Shoe Care" },
      {
        name: "description",
        content:
          "LUVAAN crafts premium footwear in Pune, sells direct to you, and keeps every pair fresh with professional shoe cleaning services.",
      },
      { property: "og:title", content: "LUVAAN — Step Into Better." },
      {
        property: "og:description",
        content:
          "Premium footwear crafted with purpose, designed for everyday confidence, and backed by professional shoe care.",
      },
    ],
  }),
  component: Home,
});

function Home() {
  const { homepage, products, portfolio, steps, services } = useStore();

  const featured = homepage.featuredIds
    .map((id) => products.find((p) => p.id === id))
    .filter((p): p is NonNullable<typeof p> => Boolean(p) && p!.status !== "Draft");

  const publishedPortfolio = portfolio.filter((p) => p.published).slice(0, 3);
  const activeServices = services.filter((s) => s.status === "Active").slice(0, 3);

  return (
    <SiteLayout>
      {/* HERO */}
      <section className="relative overflow-hidden bg-cream">
        <div className="pointer-events-none absolute -top-40 -right-40 h-[36rem] w-[36rem] rounded-full bg-sand/60 blur-3xl" />
        <div className="container-luv relative grid items-center gap-12 py-14 lg:grid-cols-2 lg:py-24">
          <div className="animate-rise">
            <p className="eyebrow text-accent">{homepage.heroLabel}</p>
            <h1 className="mt-5 text-5xl leading-[0.95] font-semibold sm:text-6xl lg:text-7xl">
              {homepage.heroTitle}
            </h1>
            <p className="mt-6 max-w-lg text-base leading-relaxed text-muted-foreground md:text-lg">
              {homepage.heroSubtitle}
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link to="/collection" className="btn-primary">
                {homepage.ctaPrimaryText}
              </Link>
              <Link to="/shoe-cleaning" className="btn-outline">
                {homepage.ctaSecondaryText}
              </Link>
            </div>
            <Link
              to="/about"
              className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline"
            >
              {homepage.discoverText} <span aria-hidden>→</span>
            </Link>
          </div>

          <div className="relative">
            <div className="overflow-hidden rounded-2xl bg-sand shadow-[var(--shadow-lift)]">
              <img
                src={resolveImage(homepage.heroImage)}
                alt="Premium LUVAAN leather sneaker"
                width={1600}
                height={1200}
                className="h-[22rem] w-full object-cover sm:h-[30rem]"
              />
            </div>
            {homepage.floatingTags[0] && (
              <div className="animate-floaty absolute -top-4 left-2 rounded-full bg-card px-4 py-2.5 text-xs font-semibold shadow-[var(--shadow-soft)] sm:-left-6">
                {homepage.floatingTags[0]}
              </div>
            )}
            {homepage.floatingTags[1] && (
              <div
                className="animate-floaty absolute -bottom-4 left-6 rounded-full bg-charcoal px-4 py-2.5 text-xs font-semibold text-primary-foreground shadow-[var(--shadow-soft)]"
                style={{ animationDelay: "1.4s" }}
              >
                {homepage.floatingTags[1]}
              </div>
            )}
            {homepage.floatingTags[2] && (
              <div
                className="animate-floaty absolute right-2 bottom-16 rounded-full bg-accent px-4 py-2.5 text-xs font-semibold text-accent-foreground shadow-[var(--shadow-soft)] sm:-right-6"
                style={{ animationDelay: "0.7s" }}
              >
                {homepage.floatingTags[2]}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* BRAND INTRO */}
      <section className="container-luv grid items-center gap-12 py-20 lg:grid-cols-2 lg:py-28">
        <div>
          <p className="eyebrow text-accent">The Brand</p>
          <h2 className="mt-4 text-4xl font-semibold md:text-5xl">{homepage.introTitle}</h2>
          <p className="mt-6 leading-relaxed text-muted-foreground">{homepage.introBody}</p>
          <div className="mt-8 grid grid-cols-3 gap-4 border-y border-border py-6">
            <div>
              <p className="text-2xl font-semibold">Made</p>
              <p className="text-xs text-muted-foreground">In-house</p>
            </div>
            <div>
              <p className="text-2xl font-semibold">Sold</p>
              <p className="text-xs text-muted-foreground">Direct to you</p>
            </div>
            <div>
              <p className="text-2xl font-semibold">Cared</p>
              <p className="text-xs text-muted-foreground">For life</p>
            </div>
          </div>
          <Link to="/about" className="btn-primary mt-8">
            Know Our Story
          </Link>
        </div>
        <div className="overflow-hidden rounded-2xl">
          <img
            src={resolveImage(homepage.introImage)}
            alt="LUVAAN workshop craftsmanship"
            loading="lazy"
            className="h-[24rem] w-full object-cover transition-transform duration-700 hover:scale-105 lg:h-[32rem]"
          />
        </div>
      </section>

      {/* FEATURED COLLECTION */}
      <section className="bg-cream py-20 lg:py-28">
        <div className="container-luv">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="eyebrow text-accent">Featured Collection</p>
              <h2 className="mt-3 text-4xl font-semibold md:text-5xl">Shoes worth walking in.</h2>
            </div>
            <Link to="/collection" className="btn-outline">
              View All
            </Link>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featured.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* WHY LUVAAN */}
      <section className="container-luv py-20 lg:py-28">
        <p className="eyebrow text-accent">Why LUVAAN</p>
        <h2 className="mt-3 max-w-2xl text-4xl font-semibold md:text-5xl">
          Built on craft, not shortcuts.
        </h2>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {homepage.whyCards.map((c) => (
            <div
              key={c.title}
              className="card-luv p-7 hover:-translate-y-1 hover:shadow-[var(--shadow-lift)]"
            >
              <span className="grid h-11 w-11 place-items-center rounded-full bg-cream text-lg text-accent">
                {c.icon}
              </span>
              <h3 className="mt-5 text-lg font-semibold">{c.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{c.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* MANUFACTURING */}
      <section className="bg-charcoal py-20 text-primary-foreground lg:py-28">
        <div className="container-luv">
          <p className="eyebrow text-accent">Manufacturing</p>
          <h2 className="mt-3 text-4xl font-semibold md:text-5xl">Crafted With Precision.</h2>
          <p className="mt-4 max-w-xl text-primary-foreground/70">
            {homepage.manufacturingHighlight}
          </p>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {manufacturingStats.map((s) => (
              <div key={s.label} className="rounded-xl border border-primary-foreground/12 p-6">
                <p className="font-display text-3xl font-semibold text-accent">{s.value}</p>
                <p className="mt-1 text-sm text-primary-foreground/60">{s.label}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 flex flex-wrap gap-2">
            {steps
              .filter((s) => s.status === "Published")
              .sort((a, b) => a.order - b.order)
              .map((s) => (
                <span
                  key={s.id}
                  className="rounded-full border border-primary-foreground/15 px-4 py-2 text-xs text-primary-foreground/75"
                >
                  {s.order}. {s.title}
                </span>
              ))}
          </div>
          <Link to="/manufacturing" className="btn-accent mt-10">
            See The Process
          </Link>
        </div>
      </section>

      {/* SHOE CLEANING */}
      <section className="container-luv py-20 lg:py-28">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow text-accent">Shoe Care</p>
            <h2 className="mt-3 text-4xl font-semibold md:text-5xl">
              Professional shoe cleaning.
            </h2>
            <p className="mt-4 max-w-xl text-muted-foreground">{homepage.serviceHighlight}</p>
          </div>
          <Link to="/shoe-cleaning" className="btn-outline">
            Book Now
          </Link>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {activeServices.map((s) => (
            <div key={s.id} className="card-luv group overflow-hidden">
              <div className="aspect-[4/3] overflow-hidden bg-cream">
                <img
                  src={resolveImage(s.image)}
                  alt={s.name}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="p-6">
                <h3 className="text-lg font-semibold">{s.name}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{s.description}</p>
                <p className="mt-4 text-sm font-semibold">Starting {inr(s.price)}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PORTFOLIO */}
      <section className="bg-cream py-20 lg:py-28">
        <div className="container-luv">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="eyebrow text-accent">Portfolio</p>
              <h2 className="mt-3 text-4xl font-semibold md:text-5xl">Work we stand behind.</h2>
              <p className="mt-4 max-w-xl text-muted-foreground">{homepage.portfolioHighlight}</p>
            </div>
            <Link to="/portfolio" className="btn-outline">
              Explore Portfolio
            </Link>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {publishedPortfolio.map((p) => (
              <div key={p.id} className="group relative overflow-hidden rounded-xl">
                <img
                  src={resolveImage(p.image)}
                  alt={p.title}
                  loading="lazy"
                  className="h-72 w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-charcoal/90 to-transparent p-6">
                  <p className="eyebrow text-accent">{p.category}</p>
                  <h3 className="mt-1.5 text-lg font-semibold text-primary-foreground">
                    {p.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
