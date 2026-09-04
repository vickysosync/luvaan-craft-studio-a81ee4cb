import { Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useStore } from "@/store/StoreContext";

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/collection", label: "Collection" },
  { to: "/manufacturing", label: "Manufacturing" },
  { to: "/shoe-cleaning", label: "Shoe Cleaning" },
  { to: "/portfolio", label: "Portfolio" },
  { to: "/contact", label: "Contact" },
] as const;

export function Navbar() {
  const { cartCount, settings, products } = useStore();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const results = query.trim()
    ? products
        .filter((p) => p.name.toLowerCase().includes(query.trim().toLowerCase()))
        .slice(0, 5)
    : [];

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "border-b border-border bg-background/90 backdrop-blur-md shadow-[var(--shadow-soft)]"
          : "bg-transparent"
      }`}
    >
      <div className="container-luv flex h-18 items-center justify-between gap-4 py-4">
        <Link to="/" className="shrink-0" onClick={() => setOpen(false)}>
          <span className="font-display text-2xl font-semibold tracking-[0.22em]">
            {settings.brandName}
          </span>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              activeProps={{ className: "text-foreground" }}
              activeOptions={{ exact: l.to === "/" }}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1.5 sm:gap-3">
          <button
            aria-label="Search products"
            onClick={() => setSearchOpen((s) => !s)}
            className="grid h-10 w-10 place-items-center rounded-full text-lg transition-colors hover:bg-secondary"
          >
            ⌕
          </button>
          <Link
            to="/cart"
            aria-label="Cart"
            className="relative grid h-10 w-10 place-items-center rounded-full text-lg transition-colors hover:bg-secondary"
          >
            ⛬
            <span className="absolute -top-0.5 -right-0.5 grid h-5 min-w-5 place-items-center rounded-full bg-accent px-1 text-[10px] font-bold text-accent-foreground">
              {cartCount}
            </span>
          </Link>
          <Link to="/collection" className="btn-primary hidden px-5 py-2.5 sm:inline-flex">
            Shop Now
          </Link>
          <button
            aria-label="Menu"
            onClick={() => setOpen((o) => !o)}
            className="grid h-10 w-10 place-items-center rounded-full transition-colors hover:bg-secondary lg:hidden"
          >
            <span className="flex flex-col gap-1.5">
              <span className={`block h-px w-5 bg-foreground transition-transform ${open ? "translate-y-[6.5px] rotate-45" : ""}`} />
              <span className={`block h-px w-5 bg-foreground transition-opacity ${open ? "opacity-0" : ""}`} />
              <span className={`block h-px w-5 bg-foreground transition-transform ${open ? "-translate-y-[6.5px] -rotate-45" : ""}`} />
            </span>
          </button>
        </div>
      </div>

      {searchOpen && (
        <div className="border-t border-border bg-card">
          <div className="container-luv py-4">
            <input
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search LUVAAN footwear…"
              className="field"
            />
            {results.length > 0 && (
              <ul className="mt-2 divide-y divide-border overflow-hidden rounded-lg border border-border">
                {results.map((p) => (
                  <li key={p.id}>
                    <button
                      className="w-full px-4 py-3 text-left text-sm hover:bg-secondary"
                      onClick={() => {
                        setSearchOpen(false);
                        setQuery("");
                        navigate({ to: "/product/$id", params: { id: p.id } });
                      }}
                    >
                      {p.name}
                      <span className="ml-2 text-xs text-muted-foreground">{p.category}</span>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}

      {open && (
        <div className="border-t border-border bg-card lg:hidden">
          <nav className="container-luv flex flex-col py-2">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="border-b border-border/60 py-3.5 text-sm font-medium last:border-0"
              >
                {l.label}
              </Link>
            ))}
            <Link to="/collection" onClick={() => setOpen(false)} className="btn-primary my-4">
              Shop Now
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
