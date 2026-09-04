import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero, SiteLayout } from "@/components/site/SiteLayout";
import { useStore } from "@/store/StoreContext";
import { inr, resolveImage } from "@/data/mock";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [
      { title: "Your Cart — LUVAAN Footwear" },
      {
        name: "description",
        content: "Review the LUVAAN footwear in your cart, adjust sizes and quantities, then head to checkout.",
      },
      { property: "og:title", content: "Your LUVAAN Cart" },
      { property: "og:description", content: "Review your selected LUVAAN footwear before checkout." },
    ],
  }),
  component: CartPage,
});

export function useCartTotals() {
  const { cart, cartSubtotal } = useStore();
  const discount = cartSubtotal > 5000 ? Math.round(cartSubtotal * 0.05) : 0;
  const delivery = cartSubtotal === 0 || cartSubtotal > 2000 ? 0 : 99;
  const total = cartSubtotal - discount + delivery;
  return { cart, subtotal: cartSubtotal, discount, delivery, total };
}

function CartPage() {
  const { cart, removeFromCart, changeQty, clearCart, notify } = useStore();
  const { subtotal, discount, delivery, total } = useCartTotals();

  return (
    <SiteLayout>
      <PageHero
        eyebrow="Your Bag"
        title="Ready when you are."
        subtitle="Frontend demo cart — quantities, removals and totals are managed in React state."
      />

      <section className="container-luv grid gap-10 py-16 lg:grid-cols-[1.6fr_1fr]">
        <div>
          {cart.length === 0 ? (
            <div className="card-luv p-10 text-center">
              <p className="text-lg font-semibold">Your cart is empty.</p>
              <p className="mt-2 text-sm text-muted-foreground">
                Add a pair from the collection to get started.
              </p>
              <Link to="/collection" className="btn-primary mt-6">
                Explore Collection
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {cart.map((line, i) => (
                <article
                  key={`${line.productId}-${line.size}-${line.color}`}
                  className="card-luv flex flex-col gap-4 p-4 sm:flex-row sm:items-center"
                >
                  <img
                    src={resolveImage(line.image)}
                    alt={line.name}
                    className="h-28 w-28 shrink-0 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold">
                      <Link to="/product/$id" params={{ id: line.productId }}>
                        {line.name}
                      </Link>
                    </h3>
                    <p className="mt-1 text-xs text-muted-foreground">
                      Size {line.size} · {line.color}
                    </p>
                    <p className="mt-2 font-semibold">{inr(line.price)}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center rounded-full border border-border">
                      <button
                        aria-label="Decrease quantity"
                        onClick={() => changeQty(i, -1)}
                        className="h-9 w-9 rounded-full text-lg hover:bg-secondary"
                      >
                        −
                      </button>
                      <span className="w-8 text-center text-sm font-semibold">{line.qty}</span>
                      <button
                        aria-label="Increase quantity"
                        onClick={() => changeQty(i, 1)}
                        className="h-9 w-9 rounded-full text-lg hover:bg-secondary"
                      >
                        +
                      </button>
                    </div>
                    <button
                      onClick={() => {
                        removeFromCart(i);
                        notify(`${line.name} removed`, "error");
                      }}
                      className="text-xs font-semibold text-muted-foreground hover:text-destructive"
                    >
                      Remove
                    </button>
                  </div>
                </article>
              ))}

              <button
                onClick={() => {
                  clearCart();
                  notify("Cart cleared", "error");
                }}
                className="btn-ghost"
              >
                Clear cart
              </button>
            </div>
          )}
        </div>

        <aside className="card-luv h-fit p-6 lg:sticky lg:top-28">
          <h2 className="text-lg font-semibold">Order Summary</h2>
          <dl className="mt-5 space-y-3 text-sm">
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Subtotal</dt>
              <dd className="font-medium">{inr(subtotal)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Discount</dt>
              <dd className="font-medium text-success">− {inr(discount)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Delivery</dt>
              <dd className="font-medium">{delivery === 0 ? "Free" : inr(delivery)}</dd>
            </div>
            <div className="flex justify-between border-t border-border pt-3 text-base">
              <dt className="font-semibold">Total</dt>
              <dd className="font-semibold">{inr(total)}</dd>
            </div>
          </dl>
          <Link
            to="/checkout"
            className={`btn-primary mt-6 w-full ${cart.length === 0 ? "pointer-events-none opacity-50" : ""}`}
          >
            Proceed to Checkout
          </Link>
          <p className="mt-3 text-center text-xs text-muted-foreground">
            Demo checkout — no payment gateway is connected.
          </p>
        </aside>
      </section>
    </SiteLayout>
  );
}
