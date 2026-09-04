import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { PageHero, SiteLayout } from "@/components/site/SiteLayout";
import { useStore } from "@/store/StoreContext";
import { inr, resolveImage } from "@/data/mock";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Checkout — LUVAAN Footwear Demo Order" },
      {
        name: "description",
        content: "Complete your LUVAAN demo order. Frontend-only checkout with mock order confirmation.",
      },
      { property: "og:title", content: "LUVAAN Checkout" },
      { property: "og:description", content: "Place a demo order for LUVAAN footwear." },
    ],
  }),
  component: Checkout,
});

const emptyForm = {
  name: "",
  phone: "",
  email: "",
  address: "",
  city: "",
  state: "",
  pincode: "",
};

function Checkout() {
  const { cart, cartSubtotal, clearCart, setOrders, notify } = useStore();
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [orderId, setOrderId] = useState<string | null>(null);

  const discount = cartSubtotal > 5000 ? Math.round(cartSubtotal * 0.05) : 0;
  const delivery = cartSubtotal === 0 || cartSubtotal > 2000 ? 0 : 99;
  const total = cartSubtotal - discount + delivery;

  const set = (key: keyof typeof emptyForm, value: string) =>
    setForm((f) => ({ ...f, [key]: value }));

  const placeOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const next: Record<string, string> = {};
    if (!form.name.trim()) next['name'] = "Enter your full name";
    if (!/^\d{10}$/.test(form.phone.trim())) next['phone'] = "Enter a 10 digit phone number";
    if (!/^\S+@\S+\.\S+$/.test(form.email.trim())) next['email'] = "Enter a valid email";
    if (!form.address.trim()) next['address'] = "Enter your address";
    if (!form.city.trim()) next['city'] = "Enter your city";
    if (!form.state.trim()) next['state'] = "Enter your state";
    if (!/^\d{6}$/.test(form.pincode.trim())) next['pincode'] = "Enter a 6 digit pincode";
    setErrors(next);
    if (Object.keys(next).length > 0) {
      notify("Please fix the highlighted fields", "error");
      return;
    }

    const id = `LV-${Math.floor(10000 + Math.random() * 89999)}`;
    setOrders((prev) => [
      {
        id,
        customer: form.name.trim(),
        date: new Date().toISOString().slice(0, 10),
        items: cart.reduce((s, l) => s + l.qty, 0),
        amount: total,
        payment: "Pending" as const,
        status: "Pending",
      },
      ...prev,
    ]);
    setOrderId(id);
    clearCart();
    notify("Order placed successfully");
  };

  if (orderId) {
    return (
      <SiteLayout>
        <section className="container-luv flex min-h-[70vh] items-center justify-center py-20">
          <div className="card-luv animate-rise max-w-lg p-10 text-center">
            <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-accent text-2xl text-accent-foreground">
              ✓
            </div>
            <h1 className="mt-6 text-3xl font-semibold">Order Placed Successfully</h1>
            <p className="mt-3 text-sm text-muted-foreground">
              Thank you. Your demo order has been recorded and is visible in the admin panel.
            </p>
            <p className="mt-6 rounded-lg bg-cream px-4 py-3 font-mono text-sm font-semibold">
              Order ID: {orderId}
            </p>
            <div className="mt-7 flex flex-wrap justify-center gap-3">
              <Link to="/collection" className="btn-primary">
                Continue Shopping
              </Link>
              <Link to="/" className="btn-outline">
                Back Home
              </Link>
            </div>
          </div>
        </section>
      </SiteLayout>
    );
  }

  return (
    <SiteLayout>
      <PageHero
        eyebrow="Checkout"
        title="A few details and it's done."
        subtitle="This is a frontend demo — no payment gateway is connected and no data leaves your browser."
      />

      <section className="container-luv grid gap-10 py-16 lg:grid-cols-[1.5fr_1fr]">
        <form onSubmit={placeOrder} className="card-luv p-6 md:p-8">
          <h2 className="text-lg font-semibold">Delivery Details</h2>
          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            {(
              [
                ["name", "Full Name", "Aarav Sharma", "sm:col-span-2"],
                ["phone", "Phone", "9945678901", ""],
                ["email", "Email", "you@example.com", ""],
                ["address", "Address", "Flat, building, street", "sm:col-span-2"],
                ["city", "City", "Pune", ""],
                ["state", "State", "Maharashtra", ""],
                ["pincode", "Pincode", "411045", ""],
              ] as const
            ).map(([key, label, ph, span]) => (
              <div key={key} className={span}>
                <label className="label-luv" htmlFor={key}>
                  {label}
                </label>
                <input
                  id={key}
                  className="field"
                  placeholder={ph}
                  value={form[key]}
                  onChange={(e) => set(key, e.target.value)}
                />
                {errors[key] && (
                  <p className="mt-1.5 text-xs font-medium text-destructive">{errors[key]}</p>
                )}
              </div>
            ))}
          </div>
          <button type="submit" className="btn-primary mt-8 w-full" disabled={cart.length === 0}>
            Place Order
          </button>
          {cart.length === 0 && (
            <p className="mt-3 text-center text-xs text-muted-foreground">
              Your cart is empty —{" "}
              <Link to="/collection" className="font-semibold text-accent">
                add a pair first
              </Link>
              .
            </p>
          )}
        </form>

        <aside className="card-luv h-fit p-6 lg:sticky lg:top-28">
          <h2 className="text-lg font-semibold">Order Summary</h2>
          <ul className="mt-5 space-y-4">
            {cart.map((l) => (
              <li key={`${l.productId}-${l.size}-${l.color}`} className="flex gap-3">
                <img
                  src={resolveImage(l.image)}
                  alt={l.name}
                  className="h-14 w-14 rounded-md object-cover"
                />
                <div className="flex-1 text-sm">
                  <p className="font-medium">{l.name}</p>
                  <p className="text-xs text-muted-foreground">
                    Size {l.size} · {l.color} · × {l.qty}
                  </p>
                </div>
                <span className="text-sm font-semibold">{inr(l.price * l.qty)}</span>
              </li>
            ))}
            {cart.length === 0 && <li className="text-sm text-muted-foreground">No items yet.</li>}
          </ul>
          <dl className="mt-6 space-y-3 border-t border-border pt-5 text-sm">
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Subtotal</dt>
              <dd>{inr(cartSubtotal)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Discount</dt>
              <dd className="text-success">− {inr(discount)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Delivery</dt>
              <dd>{delivery === 0 ? "Free" : inr(delivery)}</dd>
            </div>
            <div className="flex justify-between border-t border-border pt-3 text-base font-semibold">
              <dt>Total</dt>
              <dd>{inr(total)}</dd>
            </div>
          </dl>
        </aside>
      </section>
    </SiteLayout>
  );
}
