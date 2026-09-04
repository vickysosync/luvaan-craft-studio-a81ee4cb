import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero, SiteLayout } from "@/components/site/SiteLayout";
import { useStore } from "@/store/StoreContext";
import { manufacturingStats, resolveImage } from "@/data/mock";

export const Route = createFileRoute("/manufacturing")({
  head: () => ({
    meta: [
      { title: "Manufacturing — How LUVAAN Shoes Are Made" },
      {
        name: "description",
        content:
          "Inside LUVAAN's seven-step footwear manufacturing process: material selection, design, cutting, stitching, assembly, inspection and packaging.",
      },
      { property: "og:title", content: "Crafted With Precision — LUVAAN Manufacturing" },
      {
        property: "og:description",
        content: "A seven-step in-house footwear production process, inspected pair by pair.",
      },
    ],
  }),
  component: Manufacturing,
});

function Manufacturing() {
  const { steps } = useStore();
  const published = steps
    .filter((s) => s.status === "Published")
    .sort((a, b) => a.order - b.order);

  return (
    <SiteLayout>
      <PageHero
        eyebrow="Our Process"
        title="Crafted With Precision."
        subtitle="Seven stations, one standard. Every LUVAAN pair moves through the same disciplined route from raw material to boxed shoe."
      />

      <section className="border-b border-border bg-cream">
        <div className="container-luv grid gap-8 py-14 sm:grid-cols-2 lg:grid-cols-4">
          {manufacturingStats.map((s) => (
            <div key={s.label} className="animate-rise">
              <p className="font-display text-4xl font-semibold text-charcoal">{s.value}</p>
              <p className="mt-2 text-sm text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container-luv py-16 md:py-24">
        <div className="space-y-10">
          {published.map((step, i) => (
            <article
              key={step.id}
              className={`card-luv grid overflow-hidden md:grid-cols-2 ${
                i % 2 === 1 ? "md:[&>figure]:order-2" : ""
              }`}
            >
              <figure className="h-64 md:h-full">
                <img
                  src={resolveImage(step.image)}
                  alt={step.title}
                  className="h-full w-full object-cover"
                />
              </figure>
              <div className="p-8 md:p-10">
                <span className="pill bg-cream text-muted-foreground">
                  Step {String(step.order).padStart(2, "0")}
                </span>
                <h2 className="mt-4 text-2xl font-semibold md:text-3xl">{step.title}</h2>
                <p className="mt-3 leading-relaxed text-muted-foreground">{step.description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-charcoal text-primary-foreground">
        <div className="container-luv flex flex-col items-start gap-6 py-16 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-2xl font-semibold md:text-3xl">
              Looking for a manufacturing partner?
            </h2>
            <p className="mt-2 max-w-xl text-sm text-primary-foreground/70">
              We take on custom and bulk footwear orders from our Pune facility — from sampling
              through delivery.
            </p>
          </div>
          <div className="flex gap-3">
            <Link to="/contact" className="btn-accent">
              Talk To Us
            </Link>
            <Link
              to="/portfolio"
              className="btn border border-primary-foreground/25 text-primary-foreground hover:bg-primary-foreground/10"
            >
              View Portfolio
            </Link>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
