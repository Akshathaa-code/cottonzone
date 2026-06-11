import { createFileRoute } from "@tanstack/react-router";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { Suspense, useMemo, useState } from "react";
import { ProductCard } from "@/components/ProductCard";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { fetchProducts } from "@/lib/shopify";
import { Search } from "lucide-react";

const shopQuery = queryOptions({
  queryKey: ["products", "all"],
  queryFn: () => fetchProducts(60),
});

export const Route = createFileRoute("/shop")({
  head: () => ({
    meta: [
      { title: "Shop Premium Cotton Shirts — Cotton Zone" },
      { name: "description", content: "Browse our full collection of 100% cotton shirts, formal, casual and ethnic men's wear." },
      { property: "og:title", content: "Shop — Cotton Zone" },
      { property: "og:description", content: "Premium 100% cotton shirts and men's wear." },
      { property: "og:url", content: "/shop" },
    ],
    links: [{ rel: "canonical", href: "/shop" }],
  }),
  loader: ({ context }) => context.queryClient.ensureQueryData(shopQuery),
  component: ShopPage,
});

function ShopPage() {
  return (
    <>
      <section className="bg-cream py-16">
        <div className="container-luxe text-center">
          <span className="text-xs uppercase tracking-[0.3em] text-accent">The Collection</span>
          <h1 className="font-display text-5xl md:text-6xl mt-3">Shop All</h1>
          <p className="text-muted-foreground mt-4 max-w-xl mx-auto">
            Every piece, woven from 100% pure cotton. Built to feel as good on the hundredth wear as the first.
          </p>
        </div>
      </section>
      <Suspense fallback={<div className="container-luxe py-24 text-center text-muted-foreground">Loading…</div>}>
        <Grid />
      </Suspense>
    </>
  );
}

function Grid() {
  const { data: products } = useSuspenseQuery(shopQuery);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("featured");
  const [cat, setCat] = useState("all");

  const categories = useMemo(() => {
    const set = new Set<string>();
    products.forEach((p) => p.node.productType && set.add(p.node.productType));
    return ["all", ...Array.from(set)];
  }, [products]);

  const filtered = useMemo(() => {
    let r = products;
    if (cat !== "all") r = r.filter((p) => p.node.productType === cat);
    if (search) r = r.filter((p) => p.node.title.toLowerCase().includes(search.toLowerCase()));
    if (sort === "price-asc") r = [...r].sort((a, b) => +a.node.priceRange.minVariantPrice.amount - +b.node.priceRange.minVariantPrice.amount);
    if (sort === "price-desc") r = [...r].sort((a, b) => +b.node.priceRange.minVariantPrice.amount - +a.node.priceRange.minVariantPrice.amount);
    if (sort === "title") r = [...r].sort((a, b) => a.node.title.localeCompare(b.node.title));
    return r;
  }, [products, search, sort, cat]);

  return (
    <section className="container-luxe py-12">
      <div className="flex flex-col md:flex-row gap-3 mb-10 items-stretch md:items-center justify-between">
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search shirts…" className="pl-10 h-11 rounded-none" />
        </div>
        <div className="flex gap-3">
          {categories.length > 1 && (
            <Select value={cat} onValueChange={setCat}>
              <SelectTrigger className="w-44 h-11 rounded-none"><SelectValue /></SelectTrigger>
              <SelectContent>
                {categories.map((c) => <SelectItem key={c} value={c}>{c === "all" ? "All Categories" : c}</SelectItem>)}
              </SelectContent>
            </Select>
          )}
          <Select value={sort} onValueChange={setSort}>
            <SelectTrigger className="w-44 h-11 rounded-none"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="featured">Featured</SelectItem>
              <SelectItem value="price-asc">Price: Low → High</SelectItem>
              <SelectItem value="price-desc">Price: High → Low</SelectItem>
              <SelectItem value="title">Name: A → Z</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      {filtered.length === 0 ? (
        <div className="text-center py-24">
          <p className="font-display text-2xl">No products found</p>
          <p className="text-sm text-muted-foreground mt-3">
            Our online catalogue is being prepared. Visit our RS Puram store, or message the chat to add a product.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-12">
          {filtered.map((p) => <ProductCard key={p.node.id} product={p} />)}
        </div>
      )}
    </section>
  );
}
