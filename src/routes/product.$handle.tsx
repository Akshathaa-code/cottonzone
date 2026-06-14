import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Loader2, Truck, Leaf, ShieldCheck, RotateCcw, Heart } from "lucide-react";
import { fetchProductByHandle, formatPrice } from "@/lib/shopify";
import { useCartStore } from "@/stores/cartStore";
import { useWishlistStore, useRecentStore } from "@/stores/wishlistStore";
import { ProductCard } from "@/components/ProductCard";
import { toast } from "sonner";


const productQuery = (handle: string) =>
  queryOptions({
    queryKey: ["product", handle],
    queryFn: async () => {
      const p = await fetchProductByHandle(handle);
      if (!p) throw notFound();
      return p;
    },
  });

export const Route = createFileRoute("/product/$handle")({
  loader: ({ context, params }) => context.queryClient.ensureQueryData(productQuery(params.handle)),
  head: ({ loaderData }) => ({
    meta: [
      { title: loaderData ? `${loaderData.title} — Cotton Zone` : "Product — Cotton Zone" },
      { name: "description", content: loaderData?.description?.slice(0, 160) ?? "Premium cotton shirt from Cotton Zone." },
      { property: "og:title", content: loaderData?.title ?? "Cotton Zone" },
      { property: "og:description", content: loaderData?.description?.slice(0, 160) ?? "" },
      { property: "og:type", content: "product" },
      ...(loaderData?.images.edges[0]
        ? [{ property: "og:image", content: loaderData.images.edges[0].node.url }]
        : []),
    ],
    links: loaderData ? [{ rel: "canonical", href: `/product/${loaderData.handle}` }] : [],
    scripts: loaderData
      ? [{
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            name: loaderData.title,
            description: loaderData.description,
            image: loaderData.images.edges.map((e) => e.node.url),
            offers: {
              "@type": "Offer",
              price: loaderData.priceRange.minVariantPrice.amount,
              priceCurrency: loaderData.priceRange.minVariantPrice.currencyCode,
              availability: "https://schema.org/InStock",
            },
          }),
        }]
      : [],
  }),
  component: ProductPage,
});

function ProductPage() {
  const { handle } = Route.useParams();
  const { data: product } = useSuspenseQuery(productQuery(handle));
  const [imgIdx, setImgIdx] = useState(0);
  const [zoom, setZoom] = useState<{ x: number; y: number } | null>(null);
  const [variantId, setVariantId] = useState(product.variants.edges[0]?.node.id);
  const variant = product.variants.edges.find((v) => v.node.id === variantId)?.node || product.variants.edges[0]?.node;
  const addItem = useCartStore((s) => s.addItem);
  const isLoading = useCartStore((s) => s.isLoading);
  const getCheckoutUrl = useCartStore((s) => s.getCheckoutUrl);
  const toggleWish = useWishlistStore((s) => s.toggle);
  const wished = useWishlistStore((s) => s.ids.includes(product.id));
  const addRecent = useRecentStore((s) => s.add);
  const recent = useRecentStore((s) => s.items.filter((p) => p.node.id !== product.id).slice(0, 4));

  useEffect(() => {
    addRecent({ node: product });
  }, [product.id]);


  const handleAdd = async () => {
    if (!variant) return;
    await addItem({
      product: { node: product },
      variantId: variant.id,
      variantTitle: variant.title,
      price: variant.price,
      quantity: 1,
      selectedOptions: variant.selectedOptions || [],
    });
    toast.success("Added to bag", { description: product.title, position: "top-center" });
  };

  const handleBuyNow = async () => {
    await handleAdd();
    const url = getCheckoutUrl();
    if (url) window.open(url, "_blank");
  };

  return (
    <section className="container-luxe py-12">
      <nav className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-8">
        <Link to="/" className="hover:text-accent">Home</Link> / <Link to="/shop" className="hover:text-accent">Shop</Link> / <span className="text-foreground">{product.title}</span>
      </nav>
      <div className="grid md:grid-cols-2 gap-10 md:gap-16">
        <div>
          <div
            className="relative aspect-[4/5] bg-muted overflow-hidden mb-4 cursor-zoom-in"
            onMouseMove={(e) => {
              const r = e.currentTarget.getBoundingClientRect();
              setZoom({ x: ((e.clientX - r.left) / r.width) * 100, y: ((e.clientY - r.top) / r.height) * 100 });
            }}
            onMouseLeave={() => setZoom(null)}
          >
            {product.images.edges[imgIdx] && (
              <img
                src={product.images.edges[imgIdx].node.url}
                alt={product.images.edges[imgIdx].node.altText || product.title}
                className="w-full h-full object-cover transition-transform duration-300"
                style={zoom ? { transform: `scale(2)`, transformOrigin: `${zoom.x}% ${zoom.y}%` } : undefined}
              />
            )}
          </div>

          {product.images.edges.length > 1 && (
            <div className="grid grid-cols-5 gap-2">
              {product.images.edges.map((img, i) => (
                <button key={i} onClick={() => setImgIdx(i)}
                  className={`aspect-square overflow-hidden bg-muted border-2 ${i === imgIdx ? "border-accent" : "border-transparent"}`}>
                  <img src={img.node.url} alt="" className="w-full h-full object-cover" loading="lazy" />
                </button>
              ))}
            </div>
          )}
        </div>
        <div>
          <h1 className="font-display text-4xl md:text-5xl">{product.title}</h1>
          <p className="text-2xl mt-4">{formatPrice(product.priceRange.minVariantPrice.amount, product.priceRange.minVariantPrice.currencyCode)}</p>
          <p className="text-xs text-muted-foreground mt-1">Inclusive of all taxes</p>

          <div className="prose prose-sm mt-6 text-muted-foreground leading-relaxed">{product.description}</div>

          {product.options.map((opt) => (
            <div key={opt.name} className="mt-6">
              <p className="text-xs uppercase tracking-[0.2em] mb-3">{opt.name}</p>
              <div className="flex flex-wrap gap-2">
                {opt.values.map((val) => {
                  const matchVariant = product.variants.edges.find((v) =>
                    v.node.selectedOptions.some((o) => o.name === opt.name && o.value === val) &&
                    variant?.selectedOptions.every((sv) => sv.name === opt.name || v.node.selectedOptions.find((vo) => vo.name === sv.name && vo.value === sv.value)),
                  )?.node;
                  const active = variant?.selectedOptions.some((o) => o.name === opt.name && o.value === val);
                  return (
                    <button
                      key={val}
                      onClick={() => matchVariant && setVariantId(matchVariant.id)}
                      className={`px-4 py-2 text-sm border ${active ? "border-navy bg-navy text-navy-foreground" : "border-border hover:border-navy"}`}
                    >
                      {val}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}

          <div className="flex flex-col sm:flex-row gap-3 mt-8">
            <Button onClick={handleAdd} disabled={isLoading || !variant?.availableForSale}
              className="flex-1 h-12 rounded-none bg-navy text-navy-foreground hover:bg-navy/90 text-xs tracking-[0.2em] uppercase">
              {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : variant?.availableForSale ? "Add to Bag" : "Sold Out"}
            </Button>
            <Button onClick={handleBuyNow} disabled={isLoading || !variant?.availableForSale} variant="outline"
              className="flex-1 h-12 rounded-none border-navy text-navy hover:bg-accent hover:border-accent hover:text-accent-foreground text-xs tracking-[0.2em] uppercase">
              Buy Now
            </Button>
            <Button
              onClick={() => { toggleWish({ node: product }); toast.success(wished ? "Removed from wishlist" : "Saved to wishlist", { position: "top-center" }); }}
              variant="outline"
              aria-label="Toggle wishlist"
              className="h-12 w-12 rounded-none border-border hover:border-accent"
            >
              <Heart className={`h-4 w-4 ${wished ? "fill-accent text-accent" : ""}`} />
            </Button>
          </div>


          <div className="grid grid-cols-2 gap-4 mt-8 text-sm">
            <div className="flex items-center gap-2"><Leaf className="h-4 w-4 text-accent"/> 100% Cotton</div>
            <div className="flex items-center gap-2"><Truck className="h-4 w-4 text-accent"/> Free shipping ₹1,499+</div>
            <div className="flex items-center gap-2"><RotateCcw className="h-4 w-4 text-accent"/> 7-day exchange</div>
            <div className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-accent"/> Secure checkout</div>
          </div>

          <Accordion type="single" collapsible className="mt-10">
            <AccordionItem value="fabric">
              <AccordionTrigger>Fabric & Care</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Woven from 100% premium long-staple cotton. Machine wash cold with similar colours. Iron on medium heat. Do not bleach.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="size">
              <AccordionTrigger>Size Guide</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Our shirts run true to standard Indian sizing. S (38), M (40), L (42), XL (44), XXL (46). For a slimmer fit, size down.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="shipping">
              <AccordionTrigger>Shipping & Returns</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Free shipping pan-India on orders above ₹1,499. Delivered in 3–6 working days. 7-day easy exchange.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="reviews">
              <AccordionTrigger>Customer Reviews</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                No reviews yet. Be the first to share your experience.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>

      {recent.length > 0 && (
        <div className="mt-24">
          <span className="text-xs uppercase tracking-[0.3em] text-accent">Recently Viewed</span>
          <h2 className="font-display text-3xl md:text-4xl mt-3 mb-10">Pick up where you left off</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-12">
            {recent.map((p) => <ProductCard key={p.node.id} product={p} />)}
          </div>
        </div>
      )}
    </section>
  );
}

