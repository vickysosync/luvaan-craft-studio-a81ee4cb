import { Link } from "@tanstack/react-router";
import { inr, resolveImage, type Product } from "@/data/mock";
import { useStore } from "@/store/StoreContext";
import { Stars } from "./SiteLayout";

export function ProductCard({ product }: { product: Product }) {
  const { addToCart, notify } = useStore();
  const discount =
    product.originalPrice && product.originalPrice > product.price
      ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
      : 0;

  return (
    <article className="card-luv group flex flex-col overflow-hidden hover:-translate-y-1 hover:shadow-[var(--shadow-lift)]">
      <Link
        to="/product/$id"
        params={{ id: product.id }}
        className="relative block aspect-square overflow-hidden bg-cream"
      >
        <img
          src={resolveImage(product.image)}
          alt={product.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        {discount > 0 && (
          <span className="pill absolute top-3 left-3 bg-charcoal text-primary-foreground">
            {discount}% OFF
          </span>
        )}
        {product.stock === 0 && (
          <span className="pill absolute top-3 right-3 bg-destructive text-destructive-foreground">
            Sold out
          </span>
        )}
      </Link>

      <div className="flex flex-1 flex-col p-5">
        <p className="eyebrow text-muted-foreground">{product.category}</p>
        <h3 className="mt-2 text-lg font-semibold">
          <Link to="/product/$id" params={{ id: product.id }}>
            {product.name}
          </Link>
        </h3>
        <p className="mt-1.5 line-clamp-2 text-sm text-muted-foreground">
          {product.description}
        </p>

        <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
          <Stars rating={product.rating} />
          <span>{product.rating.toFixed(1)} · {product.reviewCount} reviews</span>
        </div>

        <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
          <span>Sizes {product.sizes[0]}–{product.sizes[product.sizes.length - 1]}</span>
          <span className="text-border">|</span>
          <span>{product.colors.join(", ")}</span>
        </div>

        <div className="mt-4 flex items-baseline gap-2">
          <span className="text-xl font-semibold">{inr(product.price)}</span>
          {product.originalPrice && (
            <span className="text-sm text-muted-foreground line-through">
              {inr(product.originalPrice)}
            </span>
          )}
        </div>

        <div className="mt-5 flex gap-2">
          <Link
            to="/product/$id"
            params={{ id: product.id }}
            className="btn-outline flex-1 px-4 py-2.5 text-xs"
          >
            View Product
          </Link>
          <button
            disabled={product.stock === 0}
            onClick={() => {
              addToCart({
                productId: product.id,
                name: product.name,
                price: product.price,
                image: product.image,
                size: product.sizes[0] ?? 8,
                color: product.colors[0] ?? "Default",
                qty: 1,
              });
              notify(`${product.name} added to cart`);
            }}
            className="btn-primary flex-1 px-4 py-2.5 text-xs"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </article>
  );
}
