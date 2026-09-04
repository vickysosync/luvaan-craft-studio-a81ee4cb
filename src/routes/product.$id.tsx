import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { SiteLayout, Stars } from "@/components/site/SiteLayout";
import { ProductCard } from "@/components/site/ProductCard";
import { useStore } from "@/store/StoreContext";
import { inr, resolveImage } from "@/data/mock";

export const Route = createFileRoute("/product/$id")({
  head: () => ({
    meta: [
      { title: "Product Details — LUVAAN Footwear" },
      {
        name: "description",
        content:
          "Sizes, colours, materials, care instructions, shipping, returns and customer reviews for LUVAAN footwear.",
      },
      { property: "og:title", content: "LUVAAN Product Details" },
      {
        property: "og:description",
        content: "Explore materials, fit, care and reviews for this LUVAAN pair.",
      },
    ],
  }),
  component: ProductDetail,
});

function ProductDetail() {
  const { id } = Route.useParams();
  const { products, reviews, addToCart, notify } = useStore();
  const navigate = useNavigate();
  const product = products.find((p) => p.id === id);

  const [activeImg, setActiveImg] = useState(0);
  const [size, setSize] = useState<number | null>(null);
  const [color, setColor] = useState<string | null>(null);
  const [qty, setQty] = useState(1);
  const [tab, setTab] = useState("Product Details");

  if (!product) {
    return (
      <SiteLayout>
        <div className="container-luv py-32 text-center">
          <h1 className="text-3xl font-semibold">Product not found</h1>
          <Link to="/collection" className="btn-primary mt-6">
            Back to collection
          </Link>
        </div>
      </SiteLayout>
    );
  }

  const chosenSize = size ?? product.sizes[0] ?? 8;
  const chosenColor = color ?? product.colors[0] ?? "Default";
  const gallery = product.gallery.length ? product.gallery : [product.image];
  const approved = reviews.filter((r) => r.productId === product.id && r.status === "Approved");
  const related = products
    .filter((p) => p.id !== product.id && p.status !== "Draft")
    .slice(0, 4);
  const discount =
    product.originalPrice && product.originalPrice > product.price
      ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
      : 0;

  const tabs: Record<string, string> = {
    "Product Details": product.details,
    Materials: product.materials,
    "Care Instructions": product.care,
    "Shipping Information":
      "Free delivery across India on orders above ₹1,999. Dispatch within 24–48 hours from Pune, delivery in 3–6 working days.",
    "Return Information":
      "Easy 7-day returns and size exchanges on unworn pairs with original packaging. Pickup arranged at no cost.",
  };

  const add = () => {
    addToCart({
      productId: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      size: chosenSize,
      color: chosenColor,
      qty,
    });
    notify(`${product.name} added to cart`);
  };

  return (
    <SiteLayout>
      <div className="container-luv py-10 lg:py-16">
        <nav className="mb-8 text-xs text-muted-foreground">
          <Link to="/" className="hover:text-foreground">Home</Link> /{" "}
          <Link to="/collection" className="hover:text-foreground">Collection</Link> /{" "}
          <span className="text-foreground">{product.name}</span>
        </nav>

        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <div className="overflow-hidden rounded-2xl bg-cream">
              <img
                src={resolveImage(gallery[activeImg] ?? product.image)}
                alt={product.name}
                className="aspect-square w-full object-cover"
              />
            </div>
            <div className="mt-4 flex gap-3">
              {gallery.map((g, i) => (
                <button
                  key={g + i}
                  onClick={() => setActiveImg(i)}
                  className={`h-20 w-20 overflow-hidden rounded-lg border-2 transition-colors ${
                    activeImg === i ? "border-charcoal" : "border-transparent opacity-70"
                  }`}
                >
                  <img src={resolveImage(g)} alt="" loading="lazy" className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="eyebrow text-accent">{product.category}</p>
            <h1 className="mt-3 text-4xl font-semibold md:text-5xl">{product.name}</h1>
            <div className="mt-4 flex items-center gap-3 text-sm text-muted-foreground">
              <Stars rating={product.rating} />
              <span>{product.rating.toFixed(1)}</span>
              <span>·</span>
              <span>{product.reviewCount} reviews</span>
            </div>

            <div className="mt-6 flex flex-wrap items-baseline gap-3">
              <span className="text-3xl font-semibold">{inr(product.price)}</span>
              {product.originalPrice && (
                <span className="text-lg text-muted-foreground line-through">
                  {inr(product.originalPrice)}
                </span>
              )}
              {discount > 0 && (
                <span className="pill bg-accent text-accent-foreground">{discount}% OFF</span>
              )}
            </div>
            <p className="mt-4 leading-relaxed text-muted-foreground">{product.description}</p>

            <div className="mt-8">
              <p className="label-luv">Select size</p>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSize(s)}
                    className={`h-11 w-11 rounded-md border text-sm font-semibold transition-colors ${
                      chosenSize === s
                        ? "border-charcoal bg-charcoal text-primary-foreground"
                        : "border-border hover:border-charcoal/40"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-6">
              <p className="label-luv">Select colour</p>
              <div className="flex flex-wrap gap-2">
                {product.colors.map((c) => (
                  <button
                    key={c}
                    onClick={() => setColor(c)}
                    className={`rounded-full border px-4 py-2 text-sm transition-colors ${
                      chosenColor === c
                        ? "border-charcoal bg-charcoal text-primary-foreground"
                        : "border-border hover:border-charcoal/40"
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-6">
              <p className="label-luv">Quantity</p>
              <div className="inline-flex items-center rounded-full border border-border">
                <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="px-4 py-2 text-lg">−</button>
                <span className="w-10 text-center text-sm font-semibold">{qty}</span>
                <button onClick={() => setQty((q) => q + 1)} className="px-4 py-2 text-lg">+</button>
              </div>
              <span className="ml-4 text-xs text-muted-foreground">
                {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
              </span>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <button onClick={add} disabled={product.stock === 0} className="btn-outline flex-1">
                Add to Cart
              </button>
              <button
                disabled={product.stock === 0}
                onClick={() => {
                  add();
                  navigate({ to: "/checkout" });
                }}
                className="btn-primary flex-1"
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>

        {/* TABS */}
        <div className="mt-20">
          <div className="flex flex-wrap gap-2 border-b border-border pb-3">
            {Object.keys(tabs).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  tab === t ? "bg-charcoal text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
          <p className="mt-6 max-w-3xl leading-relaxed text-muted-foreground">{tabs[tab]}</p>
        </div>

        {/* REVIEWS */}
        <div className="mt-16">
          <h2 className="text-2xl font-semibold">Customer Reviews</h2>
          {approved.length === 0 ? (
            <p className="mt-4 text-sm text-muted-foreground">No approved reviews yet.</p>
          ) : (
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {approved.map((r) => (
                <div key={r.id} className="card-luv p-6">
                  <div className="flex items-center justify-between">
                    <p className="font-semibold">{r.title}</p>
                    <Stars rating={r.rating} />
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">{r.body}</p>
                  <p className="mt-3 text-xs text-muted-foreground">
                    {r.author} · {r.date}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* RELATED */}
        <div className="mt-20">
          <h2 className="text-2xl font-semibold">You may also like</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </div>
    </SiteLayout>
  );
}
