import { createFileRoute, Link } from "@tanstack/react-router";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { Suspense } from "react";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/ProductCard";
import { NewsletterSignup } from "@/components/NewsletterSignup";
import { fetchProducts } from "@/lib/shopify";
import { ArrowRight, Award, Leaf, Truck, ShieldCheck, MapPin } from "lucide-react";
import heroImg from "@/assets/hero.jpg";
import formalImg from "@/assets/collection-formal.jpg";
import casualImg from "@/assets/collection-casual.jpg";
import ethnicImg from "@/assets/collection-ethnic.jpg";
import storeImg from "@/assets/store-interior.jpg";
import craftImg from "@/assets/craftsmanship.jpg";

const productsQuery = queryOptions({
  queryKey: ["products", "featured"],
  queryFn: () => fetchProducts(8),
});

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Cotton Zone — Premium Cotton Shirts Crafted for Comfort" },
      { name: "description", content: "Discover 100% cotton shirts and men's wear, woven with care in Coimbatore. Shop premium formal, casual & ethnic styles online." },
      { property: "og:title", content: "Cotton Zone — Premium Cotton Shirts Crafted for Comfort" },
      { property: "og:description", content: "100% cotton shirts and men's wear, woven with care in Coimbatore." },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  loader: ({ context }) => context.queryClient.ensureQueryData(productsQuery),
  component: HomePage,
});

function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedCollections />
      <Suspense fallback={<div className="container-luxe py-24 text-center text-muted-foreground">Loading…</div>}>
        <BestSellers />
      </Suspense>
      <WhyChoose />
      <BrandStory />
      <StorePreview />
      <ReviewsSection />
      <NewsletterSignup />
    </>
  );
}

function Hero() {
  return (
    <section className="relative bg-cream overflow-hidden">
      <div className="container-luxe grid md:grid-cols-2 gap-10 items-center py-16 md:py-24">
        <div className="animate-fade-up">
          <span className="text-xs uppercase tracking-[0.3em] text-accent">Coimbatore · Est. heritage</span>
          <h1 className="font-display text-5xl md:text-7xl leading-[1.05] mt-5">
            Premium Cotton<br/>
            Shirts <em className="text-accent font-normal">Crafted</em><br/>
            for Comfort.
          </h1>
          <p className="text-muted-foreground mt-6 max-w-lg leading-relaxed">
            From our family-run store in RS Puram to your wardrobe — 100% breathable cotton, tailored for the Indian gentleman who values quality, softness, and an honest craft.
          </p>
          <div className="flex flex-wrap gap-3 mt-8">
            <Button asChild className="rounded-none h-12 px-8 bg-navy text-navy-foreground hover:bg-navy/90 text-xs tracking-[0.2em] uppercase">
              <Link to="/shop">Shop the Collection <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
            <Button asChild variant="outline" className="rounded-none h-12 px-8 border-navy text-navy hover:bg-navy hover:text-navy-foreground text-xs tracking-[0.2em] uppercase">
              <Link to="/about">Our Story</Link>
            </Button>
          </div>
          <div className="flex flex-wrap gap-8 mt-12 text-xs uppercase tracking-[0.15em] text-muted-foreground">
            <span className="flex items-center gap-2"><Leaf className="h-4 w-4 text-accent"/> 100% Cotton</span>
            <span className="flex items-center gap-2"><Award className="h-4 w-4 text-accent"/> Heritage Craft</span>
            <span className="flex items-center gap-2"><Truck className="h-4 w-4 text-accent"/> Pan-India</span>
          </div>
        </div>
        <div className="relative">
          <div className="aspect-[3/4] overflow-hidden shadow-luxe">
            <img src={heroImg} alt="Man in premium white cotton shirt" width={1080} height={1440} className="w-full h-full object-cover" />
          </div>
          <div className="hidden md:block absolute -bottom-6 -left-6 bg-background p-6 shadow-soft max-w-xs">
            <p className="font-display text-2xl leading-tight">"Softer than anything I've ever owned."</p>
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mt-3">— A customer in Bengaluru</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function FeaturedCollections() {
  const collections = [
    { name: "Formal Shirts", desc: "For the boardroom and beyond.", img: formalImg, cat: "formal" },
    { name: "Casual Shirts", desc: "Weekend ease, weekday polish.", img: casualImg, cat: "casual" },
    { name: "Ethnic Wear", desc: "Tradition, tailored.", img: ethnicImg, cat: "ethnic" },
  ];
  return (
    <section className="container-luxe py-20">
      <div className="text-center mb-12">
        <span className="text-xs uppercase tracking-[0.3em] text-accent">Collections</span>
        <h2 className="font-display text-4xl md:text-5xl mt-3">Shop by Occasion</h2>
      </div>
      <div className="grid md:grid-cols-3 gap-6">
        {collections.map((c) => (
          <Link key={c.cat} to="/shop" className="group block">
            <div className="aspect-[4/5] overflow-hidden bg-muted">
              <img src={c.img} alt={c.name} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            </div>
            <div className="pt-5">
              <h3 className="font-display text-2xl">{c.name}</h3>
              <p className="text-sm text-muted-foreground mt-1">{c.desc}</p>
              <span className="inline-flex items-center gap-2 mt-3 text-xs uppercase tracking-[0.2em] text-accent">
                Explore <ArrowRight className="h-3 w-3" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

function BestSellers() {
  const { data: products } = useSuspenseQuery(productsQuery);
  return (
    <section className="bg-secondary/40 py-20">
      <div className="container-luxe">
        <div className="flex items-end justify-between mb-10">
          <div>
            <span className="text-xs uppercase tracking-[0.3em] text-accent">Bestsellers</span>
            <h2 className="font-display text-4xl md:text-5xl mt-3">Most Loved</h2>
          </div>
          <Link to="/shop" className="text-xs uppercase tracking-[0.2em] hover:text-accent hidden md:inline-flex items-center gap-2">
            View all <ArrowRight className="h-3 w-3" />
          </Link>
        </div>
        {products.length === 0 ? (
          <div className="bg-background p-12 text-center">
            <p className="font-display text-xl">No products found</p>
            <p className="text-sm text-muted-foreground mt-2">
              We're stocking up our atelier. Visit our RS Puram store, or ask us in chat to add a product.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {products.slice(0, 8).map((p) => <ProductCard key={p.node.id} product={p} />)}
          </div>
        )}
      </div>
    </section>
  );
}

function WhyChoose() {
  const items = [
    { icon: Leaf, t: "100% Pure Cotton", d: "Sourced and woven in India, breathable for every season." },
    { icon: Award, t: "Heritage Craft", d: "Decades of tailoring expertise from our Coimbatore atelier." },
    { icon: ShieldCheck, t: "Built to Last", d: "Reinforced stitching, pre-shrunk fabric, true colours." },
    { icon: Truck, t: "Pan-India Delivery", d: "Free shipping above ₹1,499. Easy 7-day exchange." },
  ];
  return (
    <section className="container-luxe py-20">
      <div className="text-center mb-14">
        <span className="text-xs uppercase tracking-[0.3em] text-accent">Why Cotton Zone</span>
        <h2 className="font-display text-4xl md:text-5xl mt-3">Quality woven into every thread</h2>
      </div>
      <div className="grid md:grid-cols-4 gap-10">
        {items.map((i) => (
          <div key={i.t} className="text-center">
            <div className="inline-flex items-center justify-center h-14 w-14 rounded-full border border-accent text-accent">
              <i.icon className="h-6 w-6" />
            </div>
            <h3 className="font-display text-xl mt-5">{i.t}</h3>
            <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{i.d}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function BrandStory() {
  return (
    <section className="bg-navy text-navy-foreground py-20">
      <div className="container-luxe grid md:grid-cols-2 gap-12 items-center">
        <div className="aspect-[4/3] overflow-hidden">
          <img src={craftImg} alt="Tailor inspecting cotton shirt" loading="lazy" className="w-full h-full object-cover" />
        </div>
        <div>
          <span className="text-xs uppercase tracking-[0.3em] text-accent">Our Story</span>
          <h2 className="font-display text-4xl md:text-5xl mt-3">A family of cotton, since the beginning.</h2>
          <p className="text-navy-foreground/80 mt-6 leading-relaxed">
            For years, men across Coimbatore have walked into our RS Puram store knowing exactly what they'd find — honest cotton, fairly priced, fitted by people who care. Today, we're bringing the same trust online — without losing a single thread of who we are.
          </p>
          <Button asChild variant="outline" className="mt-8 rounded-none h-12 px-8 border-accent text-accent hover:bg-accent hover:text-accent-foreground text-xs tracking-[0.2em] uppercase">
            <Link to="/about">Read Our Story</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

function StorePreview() {
  return (
    <section className="container-luxe py-20">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div className="order-2 md:order-1">
          <span className="text-xs uppercase tracking-[0.3em] text-accent">Visit Us</span>
          <h2 className="font-display text-4xl md:text-5xl mt-3">RS Puram, Coimbatore</h2>
          <p className="text-muted-foreground mt-6 leading-relaxed">
            Step into our flagship boutique on RS Puram's iconic shopping street. Touch the fabric. Try the fit. Meet the family behind every shirt.
          </p>
          <div className="mt-6 space-y-2 text-sm">
            <p className="flex items-center gap-3"><MapPin className="h-4 w-4 text-accent"/> RS Puram, Coimbatore, Tamil Nadu 641002</p>
            <p className="text-muted-foreground pl-7">Mon – Sat · 10:00 AM – 9:00 PM</p>
          </div>
          <div className="flex gap-3 mt-8">
            <Button asChild className="rounded-none h-12 bg-navy text-navy-foreground hover:bg-navy/90 text-xs tracking-[0.2em] uppercase">
              <Link to="/contact">Get Directions</Link>
            </Button>
          </div>
        </div>
        <div className="order-1 md:order-2 aspect-[4/3] overflow-hidden shadow-soft">
          <img src={storeImg} alt="Cotton Zone store interior" loading="lazy" className="w-full h-full object-cover" />
        </div>
      </div>
    </section>
  );
}

function ReviewsSection() {
  return (
    <section className="bg-cream py-20">
      <div className="container-luxe text-center">
        <span className="text-xs uppercase tracking-[0.3em] text-accent">Reviews</span>
        <h2 className="font-display text-4xl md:text-5xl mt-3">From our customers</h2>
        <p className="text-muted-foreground mt-6 max-w-md mx-auto">
          We're collecting reviews from our customers. Be the first to share your experience.
        </p>
      </div>
    </section>
  );
}
