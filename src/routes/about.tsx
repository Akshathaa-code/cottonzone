import { createFileRoute } from "@tanstack/react-router";
import storeAsset from "@/assets/cotton-zone-interior.asset.json";
import craftAsset from "@/assets/cotton-zone-storefront.asset.json";
import heroAsset from "@/assets/cotton-zone-shelves.asset.json";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "Our Story — Cotton Zone, Coimbatore" },
      { name: "description", content: "The Cotton Zone story — a family-run heritage of premium cotton shirts in RS Puram, Coimbatore." },
      { property: "og:title", content: "Our Story — Cotton Zone" },
      { property: "og:description", content: "A family-run heritage of premium cotton shirts in Coimbatore." },
      { property: "og:url", content: "/about" },
      { property: "og:image", content: storeAsset.url },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <>
      <section className="bg-cream py-20">
        <div className="container-luxe max-w-3xl text-center">
          <span className="text-xs uppercase tracking-[0.3em] text-accent">Our Story</span>
          <h1 className="font-display text-5xl md:text-6xl mt-3">Woven in Coimbatore. Worn everywhere.</h1>
          <p className="text-muted-foreground mt-6 leading-relaxed">
            Cotton Zone began with a simple belief — that an honest cotton shirt, made well, fits any man, any day. From a single storefront in RS Puram, we've quietly become Coimbatore's go-to address for cotton that breathes, cotton that lasts, cotton that feels like home.
          </p>
        </div>
      </section>

      <section className="container-luxe py-20 grid md:grid-cols-2 gap-12 items-center">
        <div className="aspect-[4/5] overflow-hidden">
          <img src={craftAsset.url} alt="Cotton Zone storefront in daylight" loading="lazy" className="w-full h-full object-cover" />
        </div>
        <div>
          <span className="text-xs uppercase tracking-[0.3em] text-accent">Heritage & Trust</span>
          <h2 className="font-display text-4xl mt-3">A family of tailors. A city of customers.</h2>
          <p className="text-muted-foreground mt-5 leading-relaxed">
            For decades, college students have walked in for their first interview shirt. Office-goers have come for the comfort that lasts a workweek. Businessmen, for shirts that hold their crispness from sunrise to dinner. Generations of Coimbatore men have made us part of their wardrobe — and we've been honoured to keep showing up, thread for thread.
          </p>
        </div>
      </section>

      <section className="bg-navy text-navy-foreground py-20">
        <div className="container-luxe grid md:grid-cols-3 gap-10 text-center">
          {[
            { t: "Pure Cotton, Always", d: "Long-staple cotton sourced from India's finest mills." },
            { t: "Made to Last", d: "Reinforced seams. Pre-shrunk fabric. True colours." },
            { t: "Fairly Priced", d: "Mill to wardrobe — no middlemen, no markups." },
          ].map((c) => (
            <div key={c.t}>
              <h3 className="font-display text-2xl text-accent">{c.t}</h3>
              <p className="text-navy-foreground/80 mt-3 leading-relaxed">{c.d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container-luxe py-20">
        <h2 className="font-display text-3xl md:text-4xl text-center mb-10">Inside our Coimbatore boutique</h2>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="md:col-span-2 aspect-[16/10] overflow-hidden">
            <img src={storeAsset.url} alt="Inside Cotton Zone with shelves of folded shirts" loading="lazy" className="w-full h-full object-cover" />
          </div>
          <div className="aspect-square md:aspect-auto overflow-hidden">
            <img src={heroAsset.url} alt="Shelves of neatly arranged Cotton Zone shirts" loading="lazy" className="w-full h-full object-cover" />
          </div>
        </div>
      </section>
    </>
  );
}
