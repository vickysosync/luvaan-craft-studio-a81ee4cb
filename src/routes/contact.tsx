import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { PageHero, SiteLayout } from "@/components/site/SiteLayout";
import { useStore } from "@/store/StoreContext";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact LUVAAN — Footwear Manufacturing & Shoe Care, Pune" },
      {
        name: "description",
        content:
          "Reach LUVAAN International Private Limited in Baner, Pune for footwear orders, manufacturing enquiries and professional shoe cleaning.",
      },
      { property: "og:title", content: "Contact LUVAAN" },
      {
        property: "og:description",
        content: "Call 9945678901 or write to support@luvaan.com — Baner, Pune.",
      },
    ],
  }),
  component: ContactPage,
});

const empty = { name: "", email: "", phone: "", subject: "", message: "" };

function ContactPage() {
  const { settings, setEnquiries, notify } = useStore();
  const [form, setForm] = useState(empty);
  const [sent, setSent] = useState(false);

  function submit(e: FormEvent) {
    e.preventDefault();
    const id = "ENQ-" + Math.floor(400 + Math.random() * 599);
    setEnquiries((prev) => [
      {
        id,
        ...form,
        date: new Date().toISOString().slice(0, 10),
        status: "New" as const,
      },
      ...prev,
    ]);
    setForm(empty);
    setSent(true);
    notify("Message sent — we'll reply within one business day.");
  }

  return (
    <SiteLayout>
      <PageHero
        eyebrow="Get In Touch"
        title="Let's talk footwear."
        subtitle="Orders, bulk manufacturing, shoe care pickups or partnerships — we read every message."
      />

      <section className="container-luv grid gap-10 py-16 lg:grid-cols-[1fr_1.2fr]">
        <div className="space-y-4">
          {[
            { label: "Address", value: settings.address },
            { label: "Phone", value: settings.phone },
            { label: "Email", value: settings.email },
            { label: "Business Hours", value: settings.businessHours },
          ].map((c) => (
            <div key={c.label} className="card-luv p-6">
              <p className="eyebrow text-accent">{c.label}</p>
              <p className="mt-2 text-sm leading-relaxed text-foreground">{c.value}</p>
            </div>
          ))}

          <div className="card-luv relative overflow-hidden p-0">
            <div className="flex h-56 items-center justify-center bg-[repeating-linear-gradient(45deg,var(--color-cream),var(--color-cream)_14px,var(--color-secondary)_14px,var(--color-secondary)_28px)]">
              <div className="rounded-full bg-charcoal px-5 py-2.5 text-xs font-semibold tracking-[0.2em] text-primary-foreground uppercase">
                Baner · Pune · 411045
              </div>
            </div>
          </div>
        </div>

        <div className="card-luv p-7 md:p-9">
          {sent ? (
            <div className="py-10 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-accent text-2xl text-accent-foreground">
                ✓
              </div>
              <h2 className="mt-5 text-2xl font-semibold">Message Sent</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Thank you for reaching out to LUVAAN. Our team will get back to you shortly.
              </p>
              <button onClick={() => setSent(false)} className="btn-outline mt-6">
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={submit} className="space-y-4">
              <h2 className="text-2xl font-semibold">Send us a message</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="label-luv" htmlFor="c-name">Name</label>
                  <input
                    id="c-name"
                    required
                    className="field"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                  />
                </div>
                <div>
                  <label className="label-luv" htmlFor="c-email">Email</label>
                  <input
                    id="c-email"
                    type="email"
                    required
                    className="field"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                  />
                </div>
                <div>
                  <label className="label-luv" htmlFor="c-phone">Phone</label>
                  <input
                    id="c-phone"
                    required
                    className="field"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  />
                </div>
                <div>
                  <label className="label-luv" htmlFor="c-subject">Subject</label>
                  <input
                    id="c-subject"
                    required
                    className="field"
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  />
                </div>
              </div>
              <div>
                <label className="label-luv" htmlFor="c-msg">Message</label>
                <textarea
                  id="c-msg"
                  required
                  rows={5}
                  className="field resize-none"
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                />
              </div>
              <button type="submit" className="btn-primary w-full">
                Send Message
              </button>
            </form>
          )}
        </div>
      </section>
    </SiteLayout>
  );
}
