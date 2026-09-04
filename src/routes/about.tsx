import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero, SiteLayout } from "@/components/site/SiteLayout";
import { useStore } from "@/store/StoreContext";
import { manufacturingStats, resolveImage } from "@/data/mock";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About LUVAAN — Footwear Made in Pune, India" },
      {
        name: "description",
        content:
          "LUVAAN INTERNATIONAL PRIVATE LIMITED manufactures, sells and cares for its own premium footwear from Pune, Maharashtra.",
      },
      { property: "og:title", content: "About LUVAAN — Footwear Made in Pune" },
      {
        property: "og:description",
        content:
          "One brand, one standard: footwear manufacturing, direct-to-customer retail and professional shoe care.",
      },
    ],
  }),
  component: About,
});

const values = [
  { title: "Craft Over Volume", body: "We would rather make fewer pairs properly than flood a warehouse." },
  { title: "Honest Pricing", body: "Direct-to-customer means you pay for the shoe, not the middlemen." },
  { title: "Longer Life", body: "Cleaning and restoration keep pairs in rotation instead of in landfill." },
  { title: "People First", body: "Skilled operators, fair work and real accountability on the floor." },
];

function About() {
  const { settings } = useStore();

  return (
    <SiteLayout>
      <PageHero
        eyebrow="Who We Are"
        title="A footwear house built end to end."
        subtitle="From the leather we grade to the polish we apply months later, LUVAAN owns every step of the journey."
      />

      <section className="container-luv grid items-center gap-12 py-16 md:py-24 lg:grid-cols-2">
        <div>
          <h2 className="text-3xl font-semibold md:text-4xl">Our Story</h2>
          <p className="mt-5 leading-relaxed text-muted-foreground">
            LUVAAN began on a small production floor in Pune with a single conviction: a shoe
            should be judged after a year of wear, not on a shelf. We started as a
            manufacturer, learned the craft station by station, and then took our own
            footwear directly to customers so nothing was lost in translation.
          </p>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            Today {settings.companyName} runs three connected businesses — footwear
            manufacturing, our own e-commerce collection, and a professional shoe cleaning
            and restoration studio. The same team that builds your pair is the team that
            keeps it looking new.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/collection" className="btn-primary">
              Shop the Collection
            </Link>
            <Link to="/manufacturing" className="btn-outline">
              See How We Make It
            </Link>
          </div>
        </div>
        <div className="relative overflow-hidden rounded-2xl">
          <img
            src={resolveImage("factory")}
            alt="Inside the LUVAAN footwear workshop in Pune"
            className="h-full w-full object-cover"
          />
        </div>
      </section>

      <section className="border-y border-border bg-cream">
        <div className="container-luv grid gap-8 py-14 sm:grid-cols-2 lg:grid-cols-4">
          {manufacturingStats.map((s) => (
            <div key={s.label}>
              <p className="font-display text-4xl font-semibold text-charcoal">{s.value}</p>
              <p className="mt-2 text-sm text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container-luv py-16 md:py-24">
        <p className="eyebrow text-accent">What We Do</p>
        <h2 className="mt-3 text-3xl font-semibold md:text-4xl">Three businesses, one standard.</h2>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {[
            {
              img: "factory",
              title: "Manufacturing",
              body: "A seven-step in-house process covering material selection through final packaging, with inspection on every pair.",
              to: "/manufacturing" as const,
              cta: "Our process",
            },
            {
              img: "sneaker",
              title: "E-commerce",
              body: "Our full collection sold directly, with clear sizing guidance, easy exchanges and honest pricing.",
              to: "/collection" as const,
              cta: "Browse shoes",
            },
            {
              img: "cleaning",
              title: "Shoe Care",
              body: "Professional cleaning, leather care, suede treatment and full restoration from ₹299.",
              to: "/shoe-cleaning" as const,
              cta: "Book cleaning",
            },
          ].map((c) => (
            <article key={c.title} className="card-luv overflow-hidden hover:-translate-y-1 hover:shadow-[var(--shadow-lift)]">
              <img src={resolveImage(c.img)} alt={c.title} className="h-48 w-full object-cover" />
              <div className="p-6">
                <h3 className="text-xl font-semibold">{c.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{c.body}</p>
                <Link to={c.to} className="mt-5 inline-block text-sm font-semibold text-accent">
                  {c.cta} →
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-charcoal text-primary-foreground">
        <div className="container-luv py-16 md:py-24">
          <p className="eyebrow text-accent">Our Values</p>
          <h2 className="mt-3 text-3xl font-semibold md:text-4xl">What we hold to.</h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v) => (
              <div
                key={v.title}
                className="rounded-xl border border-primary-foreground/12 p-6 transition-colors hover:border-accent/60"
              >
                <h3 className="text-lg font-semibold">{v.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-primary-foreground/65">{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container-luv py-16 md:py-24">
        <div className="card-luv grid gap-8 p-8 md:grid-cols-3 md:p-12">
          <div>
            <h3 className="eyebrow text-muted-foreground">Company</h3>
            <p className="mt-3 font-semibold">{settings.companyName}</p>
            <p className="mt-1 text-sm text-muted-foreground">Footwear manufacturing · Retail · Shoe care</p>
          </div>
          <div>
            <h3 className="eyebrow text-muted-foreground">Registered Address</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{settings.address}</p>
          </div>
          <div>
            <h3 className="eyebrow text-muted-foreground">Reach Us</h3>
            <p className="mt-3 text-sm text-muted-foreground">{settings.phone}</p>
            <p className="text-sm text-muted-foreground">{settings.email}</p>
            <p className="mt-2 text-xs text-muted-foreground">{settings.businessHours}</p>
            <Link to="/contact" className="mt-4 inline-block text-sm font-semibold text-accent">
              Contact us →
            </Link>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
