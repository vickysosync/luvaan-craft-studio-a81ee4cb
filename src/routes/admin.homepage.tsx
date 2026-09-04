import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { useStore } from "@/store/StoreContext";
import { imageLibrary } from "@/data/mock";

export const Route = createFileRoute("/admin/homepage")({
  head: () => ({
    meta: [
      { title: "Homepage Management — LUVAAN Admin" },
      { name: "description", content: "Control the LUVAAN homepage hero, CTAs, featured products and highlights." },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "LUVAAN Homepage Management" },
      { property: "og:description", content: "Control the LUVAAN homepage hero and highlights." },
    ],
  }),
  component: AdminHomepage,
});

const imageKeys = Object.keys(imageLibrary);

function AdminHomepage() {
  const { homepage, setHomepage, products, notify } = useStore();
  const [draft, setDraft] = useState(homepage);

  const set = <K extends keyof typeof draft>(key: K, value: (typeof draft)[K]) =>
    setDraft((d) => ({ ...d, [key]: value }));

  const toggleFeatured = (id: string) =>
    setDraft((d) => ({
      ...d,
      featuredIds: d.featuredIds.includes(id)
        ? d.featuredIds.filter((x) => x !== id)
        : [...d.featuredIds, id],
    }));

  return (
    <AdminLayout
      title="Homepage"
      subtitle="Hero, CTAs, featured products and section highlights"
      actions={
        <button
          className="btn-primary px-4 py-2 text-xs"
          onClick={() => { setHomepage(draft); notify("Homepage content updated"); }}
        >
          Save changes
        </button>
      }
    >
      <div className="grid gap-6 xl:grid-cols-2">
        <section className="card-luv p-6">
          <h2 className="text-sm font-semibold tracking-wide uppercase">Hero</h2>
          <div className="mt-4 grid gap-4">
            <div><label className="label-luv">Label</label><input className="field" value={draft.heroLabel} onChange={(e) => set("heroLabel", e.target.value)} /></div>
            <div><label className="label-luv">Title</label><input className="field" value={draft.heroTitle} onChange={(e) => set("heroTitle", e.target.value)} /></div>
            <div><label className="label-luv">Subtitle</label><textarea className="field h-24" value={draft.heroSubtitle} onChange={(e) => set("heroSubtitle", e.target.value)} /></div>
            <div>
              <label className="label-luv">Hero image</label>
              <select className="field" value={draft.heroImage} onChange={(e) => set("heroImage", e.target.value)}>
                {imageKeys.map((k) => <option key={k}>{k}</option>)}
              </select>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div><label className="label-luv">Primary CTA text</label><input className="field" value={draft.ctaPrimaryText} onChange={(e) => set("ctaPrimaryText", e.target.value)} /></div>
              <div><label className="label-luv">Primary CTA link</label><input className="field" value={draft.ctaPrimaryLink} onChange={(e) => set("ctaPrimaryLink", e.target.value)} /></div>
              <div><label className="label-luv">Secondary CTA text</label><input className="field" value={draft.ctaSecondaryText} onChange={(e) => set("ctaSecondaryText", e.target.value)} /></div>
              <div><label className="label-luv">Secondary CTA link</label><input className="field" value={draft.ctaSecondaryLink} onChange={(e) => set("ctaSecondaryLink", e.target.value)} /></div>
            </div>
            <div><label className="label-luv">Discover text</label><input className="field" value={draft.discoverText} onChange={(e) => set("discoverText", e.target.value)} /></div>
            <div>
              <label className="label-luv">Floating tags (comma separated)</label>
              <input className="field" value={draft.floatingTags.join(", ")} onChange={(e) => set("floatingTags", e.target.value.split(",").map((t) => t.trim()).filter(Boolean))} />
            </div>
          </div>
        </section>

        <section className="card-luv p-6">
          <h2 className="text-sm font-semibold tracking-wide uppercase">Brand introduction</h2>
          <div className="mt-4 grid gap-4">
            <div><label className="label-luv">Title</label><input className="field" value={draft.introTitle} onChange={(e) => set("introTitle", e.target.value)} /></div>
            <div><label className="label-luv">Body</label><textarea className="field h-32" value={draft.introBody} onChange={(e) => set("introBody", e.target.value)} /></div>
            <div>
              <label className="label-luv">Intro image</label>
              <select className="field" value={draft.introImage} onChange={(e) => set("introImage", e.target.value)}>
                {imageKeys.map((k) => <option key={k}>{k}</option>)}
              </select>
            </div>
            <div><label className="label-luv">Manufacturing highlight</label><input className="field" value={draft.manufacturingHighlight} onChange={(e) => set("manufacturingHighlight", e.target.value)} /></div>
            <div><label className="label-luv">Portfolio highlight</label><input className="field" value={draft.portfolioHighlight} onChange={(e) => set("portfolioHighlight", e.target.value)} /></div>
            <div><label className="label-luv">Service highlight</label><input className="field" value={draft.serviceHighlight} onChange={(e) => set("serviceHighlight", e.target.value)} /></div>
          </div>
        </section>

        <section className="card-luv p-6">
          <h2 className="text-sm font-semibold tracking-wide uppercase">Featured products</h2>
          <p className="mt-1 text-xs text-muted-foreground">{draft.featuredIds.length} selected</p>
          <div className="mt-4 grid gap-2 sm:grid-cols-2">
            {products.map((p) => (
              <label key={p.id} className="flex items-center gap-3 rounded-lg border border-border px-3 py-2 text-sm">
                <input type="checkbox" checked={draft.featuredIds.includes(p.id)} onChange={() => toggleFeatured(p.id)} />
                <span className="truncate">{p.name}</span>
              </label>
            ))}
          </div>
        </section>

        <section className="card-luv p-6">
          <h2 className="text-sm font-semibold tracking-wide uppercase">Why LUVAAN cards</h2>
          <div className="mt-4 grid gap-4">
            {draft.whyCards.map((c, i) => (
              <div key={i} className="grid gap-2 rounded-lg border border-border p-4 sm:grid-cols-[70px_1fr]">
                <input
                  className="field text-center"
                  value={c.icon}
                  onChange={(e) => set("whyCards", draft.whyCards.map((x, ix) => (ix === i ? { ...x, icon: e.target.value } : x)))}
                />
                <div className="grid gap-2">
                  <input
                    className="field"
                    value={c.title}
                    onChange={(e) => set("whyCards", draft.whyCards.map((x, ix) => (ix === i ? { ...x, title: e.target.value } : x)))}
                  />
                  <textarea
                    className="field h-16"
                    value={c.body}
                    onChange={(e) => set("whyCards", draft.whyCards.map((x, ix) => (ix === i ? { ...x, body: e.target.value } : x)))}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </AdminLayout>
  );
}
