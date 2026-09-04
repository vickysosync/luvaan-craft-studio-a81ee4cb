import type { ReactNode } from "react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";

export function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}

export function PageHero({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <section className="border-b border-border bg-cream">
      <div className="container-luv py-16 md:py-24">
        <p className="eyebrow animate-rise text-accent">{eyebrow}</p>
        <h1 className="animate-rise mt-4 max-w-3xl text-4xl leading-[1.05] font-semibold md:text-6xl">
          {title}
        </h1>
        {subtitle && (
          <p className="animate-rise mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}

export function Stars({ rating, size = "text-sm" }: { rating: number; size?: string }) {
  return (
    <span className={`${size} tracking-tight text-accent`} aria-label={`${rating} out of 5`}>
      {"★★★★★".slice(0, Math.round(rating))}
      <span className="text-muted-foreground/40">{"★★★★★".slice(Math.round(rating))}</span>
    </span>
  );
}
