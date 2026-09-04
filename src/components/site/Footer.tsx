import { Link } from "@tanstack/react-router";
import { useStore } from "@/store/StoreContext";

const nav = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/collection", label: "Collection" },
  { to: "/manufacturing", label: "Manufacturing" },
  { to: "/shoe-cleaning", label: "Shoe Cleaning" },
  { to: "/portfolio", label: "Portfolio" },
  { to: "/contact", label: "Contact" },
] as const;

export function Footer() {
  const { settings } = useStore();
  return (
    <footer className="mt-24 bg-charcoal text-primary-foreground">
      <div className="container-luv grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <span className="font-display text-2xl font-semibold tracking-[0.22em]">
            {settings.brandName}
          </span>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-primary-foreground/65">
            A Pune-based footwear house — manufacturing, direct-to-customer retail and
            professional shoe care under one premium brand.
          </p>
          <div className="mt-6 flex gap-3">
            {[
              { label: "Instagram", href: settings.instagram },
              { label: "Facebook", href: settings.facebook },
              { label: "LinkedIn", href: settings.linkedin },
            ].map((s) => (
              <a
                key={s.label}
                href={s.href}
                className="rounded-full border border-primary-foreground/20 px-3.5 py-1.5 text-xs transition-colors hover:border-accent hover:text-accent"
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>

        <div>
          <h3 className="eyebrow text-accent">Navigate</h3>
          <ul className="mt-5 space-y-2.5 text-sm text-primary-foreground/70">
            {nav.map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="transition-colors hover:text-accent">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="eyebrow text-accent">Customer</h3>
          <ul className="mt-5 space-y-2.5 text-sm text-primary-foreground/70">
            <li><Link to="/collection" className="hover:text-accent">Shop</Link></li>
            <li><Link to="/cart" className="hover:text-accent">Cart</Link></li>
            <li><Link to="/contact" className="hover:text-accent">Shipping</Link></li>
            <li><Link to="/contact" className="hover:text-accent">Returns</Link></li>
            <li><Link to="/contact" className="hover:text-accent">FAQs</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="eyebrow text-accent">Contact</h3>
          <ul className="mt-5 space-y-2.5 text-sm text-primary-foreground/70">
            <li>{settings.phone}</li>
            <li>{settings.email}</li>
            <li>Pune, Maharashtra, India</li>
            <li className="pt-1 text-xs text-primary-foreground/50">{settings.businessHours}</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-primary-foreground/10">
        <div className="container-luv flex flex-col items-center justify-between gap-3 py-6 text-xs text-primary-foreground/50 sm:flex-row">
          <p>{settings.footerText}</p>
          <Link
            to="/admin/login"
            className="underline-offset-4 transition-colors hover:text-accent hover:underline"
          >
            Admin Login
          </Link>
        </div>
      </div>
    </footer>
  );
}
