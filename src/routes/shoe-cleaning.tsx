import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageHero, SiteLayout } from "@/components/site/SiteLayout";
import { useStore } from "@/store/StoreContext";
import { inr, resolveImage } from "@/data/mock";

export const Route = createFileRoute("/shoe-cleaning")({
  head: () => ({
    meta: [
      { title: "Shoe Cleaning Services in Pune — LUVAAN Shoe Care" },
      {
        name: "description",
        content:
          "Professional shoe cleaning, leather care, suede treatment, sneaker cleaning, whitening and restoration by LUVAAN. Book a pickup from ₹299.",
      },
      { property: "og:title", content: "Give Your Shoes A Fresh Start — LUVAAN Shoe Care" },
      {
        property: "og:description",
        content: "Deep cleaning, leather and suede care, whitening and restoration from ₹299.",
      },
    ],
  }),
  component: ShoeCleaning,
});

const shoeTypes = [
  "Sneakers",
  "Running Shoes",
  "Leather Formals",
  "Suede Loafers",
  "Sports Shoes",
  "Boots",
  "Other",
];
const times = ["10:00 AM", "11:00 AM", "01:00 PM", "03:00 PM", "04:30 PM", "06:00 PM"];

function ShoeCleaning() {
  const { services, setBookings, notify } = useStore();
  const active = services.filter((s) => s.status === "Active");
  const [form, setForm] = useState({
    customer: "",
    phone: "",
    email: "",
    shoeType: shoeTypes[0]!,
    service: active[0]?.name ?? "",
    date: "",
    time: times[0]!,
    mode: "Pickup",
    notes: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [bookingId, setBookingId] = useState<string | null>(null);

  const set = (key: keyof typeof form, value: string) =>
    setForm((f) => ({ ...f, [key]: value }));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const next: Record<string, string> = {};
    if (!form.customer.trim()) next['customer'] = "Enter your name";
    if (!/^\d{10}$/.test(form.phone.trim())) next['phone'] = "Enter a 10 digit phone number";
    if (!/^\S+@\S+\.\S+$/.test(form.email.trim())) next['email'] = "Enter a valid email";
    if (!form.date) next['date'] = "Pick a preferred date";
    setErrors(next);
    if (Object.keys(next).length) {
      notify("Please fix the highlighted fields", "error");
      return;
    }
    const id = `LC-${Math.floor(20000 + Math.random() * 9999)}`;
    const price = services.find((s) => s.name === form.service)?.price ?? 299;
    setBookings((prev) => [
      {
        id,
        customer: form.customer.trim(),
        phone: form.phone.trim(),
        email: form.email.trim(),
        shoeType: form.shoeType,
        service: form.service,
        date: form.date,
        time: form.time,
        mode: form.mode,
        notes: form.notes,
        amount: price,
        status: "New",
      },
      ...prev,
    ]);
    setBookingId(id);
    notify("Cleaning request submitted");
  };

  const scrollToForm = (serviceName: string) => {
    set("service", serviceName);
    document.getElementById("booking")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <SiteLayout>
      <PageHero
        eyebrow="LUVAAN Shoe Care"
        title="Give Your Shoes A Fresh Start."
        subtitle="Our in-house care studio cleans, conditions and restores footwear of every kind — sneakers, leather, suede and sports pairs. Pickup and drop-off available across Pune."
      />

      <section className="container-luv py-16 md:py-24">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow text-accent">Services</p>
            <h2 className="mt-3 text-3xl font-semibold md:text-4xl">Choose your care level.</h2>
          </div>
          <p className="max-w-md text-sm text-muted-foreground">
            Prices are starting points — final quotes depend on shoe condition and material.
          </p>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {active.map((s) => (
            <article
              key={s.id}
              className="card-luv group flex flex-col overflow-hidden hover:-translate-y-1 hover:shadow-[var(--shadow-lift)]"
            >
              <div className="aspect-[4/3] overflow-hidden bg-cream">
                <img
                  src={resolveImage(s.image)}
                  alt={s.name}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-1 flex-col p-6">
                <h3 className="text-lg font-semibold">{s.name}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {s.description}
                </p>
                <div className="mt-5 flex items-center justify-between text-sm">
                  <span className="font-semibold">From {inr(s.price)}</span>
                  <span className="text-muted-foreground">{s.duration}</span>
                </div>
                <button onClick={() => scrollToForm(s.name)} className="btn-primary mt-5 w-full">
                  Book Now
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="booking" className="border-y border-border bg-cream">
        <div className="container-luv py-16 md:py-24">
          <div className="mx-auto max-w-3xl">
            {bookingId ? (
              <div className="card-luv animate-rise p-10 text-center">
                <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-accent text-2xl text-accent-foreground">
                  ✓
                </div>
                <h2 className="mt-6 text-3xl font-semibold">Cleaning Request Submitted</h2>
                <p className="mt-3 text-sm text-muted-foreground">
                  Our care team will confirm your slot on the phone number you provided.
                </p>
                <p className="mt-6 rounded-lg bg-cream px-4 py-3 font-mono text-sm font-semibold">
                  Booking ID: {bookingId}
                </p>
                <button onClick={() => setBookingId(null)} className="btn-outline mt-7">
                  Book Another Pair
                </button>
              </div>
            ) : (
              <form onSubmit={submit} className="card-luv p-6 md:p-10">
                <p className="eyebrow text-accent">Booking</p>
                <h2 className="mt-3 text-3xl font-semibold">Book a cleaning slot.</h2>
                <div className="mt-8 grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className="label-luv" htmlFor="customer">Customer Name</label>
                    <input
                      id="customer"
                      className="field"
                      value={form.customer}
                      onChange={(e) => set("customer", e.target.value)}
                      placeholder="Aarav Sharma"
                    />
                    {errors['customer'] && <p className="mt-1.5 text-xs font-medium text-destructive">{errors['customer']}</p>}
                  </div>
                  <div>
                    <label className="label-luv" htmlFor="phone">Phone</label>
                    <input
                      id="phone"
                      className="field"
                      value={form.phone}
                      onChange={(e) => set("phone", e.target.value)}
                      placeholder="9945678901"
                    />
                    {errors['phone'] && <p className="mt-1.5 text-xs font-medium text-destructive">{errors['phone']}</p>}
                  </div>
                  <div className="sm:col-span-2">
                    <label className="label-luv" htmlFor="email">Email</label>
                    <input
                      id="email"
                      className="field"
                      value={form.email}
                      onChange={(e) => set("email", e.target.value)}
                      placeholder="you@example.com"
                    />
                    {errors['email'] && <p className="mt-1.5 text-xs font-medium text-destructive">{errors['email']}</p>}
                  </div>
                  <div>
                    <label className="label-luv" htmlFor="shoeType">Shoe Type</label>
                    <select
                      id="shoeType"
                      className="field"
                      value={form.shoeType}
                      onChange={(e) => set("shoeType", e.target.value)}
                    >
                      {shoeTypes.map((t) => (
                        <option key={t}>{t}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="label-luv" htmlFor="service">Selected Service</label>
                    <select
                      id="service"
                      className="field"
                      value={form.service}
                      onChange={(e) => set("service", e.target.value)}
                    >
                      {active.map((s) => (
                        <option key={s.id}>{s.name}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="label-luv" htmlFor="date">Preferred Date</label>
                    <input
                      id="date"
                      type="date"
                      className="field"
                      value={form.date}
                      onChange={(e) => set("date", e.target.value)}
                    />
                    {errors['date'] && <p className="mt-1.5 text-xs font-medium text-destructive">{errors['date']}</p>}
                  </div>
                  <div>
                    <label className="label-luv" htmlFor="time">Preferred Time</label>
                    <select
                      id="time"
                      className="field"
                      value={form.time}
                      onChange={(e) => set("time", e.target.value)}
                    >
                      {times.map((t) => (
                        <option key={t}>{t}</option>
                      ))}
                    </select>
                  </div>
                  <div className="sm:col-span-2">
                    <span className="label-luv">Pickup / Drop-off</span>
                    <div className="flex gap-3">
                      {["Pickup", "Drop-off"].map((m) => (
                        <button
                          key={m}
                          type="button"
                          onClick={() => set("mode", m)}
                          className={`rounded-full border px-5 py-2.5 text-sm font-semibold transition-colors ${
                            form.mode === m
                              ? "border-charcoal bg-charcoal text-primary-foreground"
                              : "border-border hover:border-charcoal/40"
                          }`}
                        >
                          {m}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="sm:col-span-2">
                    <label className="label-luv" htmlFor="notes">Additional Notes</label>
                    <textarea
                      id="notes"
                      rows={4}
                      className="field"
                      value={form.notes}
                      onChange={(e) => set("notes", e.target.value)}
                      placeholder="Anything we should know about the pair?"
                    />
                  </div>
                </div>
                <button type="submit" className="btn-primary mt-8 w-full">
                  Book Cleaning Service
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
