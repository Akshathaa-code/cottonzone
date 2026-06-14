import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Loader2, Heart } from "lucide-react";
import { useCartStore } from "@/stores/cartStore";
import { useWishlistStore } from "@/stores/wishlistStore";
import { formatPrice, type ShopifyProduct } from "@/lib/shopify";
import { toast } from "sonner";

export function ProductCard({ product }: { product: ShopifyProduct }) {
  const addItem = useCartStore((s) => s.addItem);
  const isLoading = useCartStore((s) => s.isLoading);
  const toggleWish = useWishlistStore((s) => s.toggle);
  const wished = useWishlistStore((s) => s.ids.includes(product.node.id));
  const node = product.node;
  const img = node.images.edges[0]?.node;
  const img2 = node.images.edges[1]?.node;
  const variant = node.variants.edges.find((v) => v.node.availableForSale)?.node || node.variants.edges[0]?.node;
  const price = node.priceRange.minVariantPrice;

  const handleAdd = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!variant) return;
    await addItem({
      product,
      variantId: variant.id,
      variantTitle: variant.title,
      price: variant.price,
      quantity: 1,
      selectedOptions: variant.selectedOptions || [],
    });
    toast.success("Added to bag", { description: node.title, position: "top-center" });
  };

  const handleWish = (e: React.MouseEvent) => {
    e.preventDefault();
    toggleWish(product);
    toast.success(wished ? "Removed from wishlist" : "Saved to wishlist", { position: "top-center" });
  };

  return (
    <Link
      to="/product/$handle"
      params={{ handle: node.handle }}
      className="group block"
    >
      <div className="relative aspect-[3/4] bg-muted overflow-hidden">
        {img && (
          <img
            src={img.url}
            alt={img.altText || node.title}
            loading="lazy"
            className="w-full h-full object-cover transition-opacity duration-500 group-hover:opacity-0"
          />
        )}
        {img2 && (
          <img
            src={img2.url}
            alt={img2.altText || node.title}
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          />
        )}
        <button
          onClick={handleWish}
          aria-label={wished ? "Remove from wishlist" : "Add to wishlist"}
          className="absolute top-3 right-3 h-9 w-9 rounded-full bg-background/85 backdrop-blur flex items-center justify-center hover:bg-background transition-colors"
        >
          <Heart className={`h-4 w-4 ${wished ? "fill-accent text-accent" : "text-foreground"}`} />
        </button>
        <div className="absolute inset-x-3 bottom-3 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button
            onClick={handleAdd}
            disabled={isLoading || !variant?.availableForSale}
            className="w-full bg-background text-foreground hover:bg-navy hover:text-navy-foreground rounded-none h-11 text-xs tracking-[0.2em] uppercase"
          >
            {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : variant?.availableForSale ? "Add to Bag" : "Sold Out"}
          </Button>
        </div>
      </div>
      <div className="pt-4 text-center">
        <h3 className="text-sm font-medium tracking-wide">{node.title}</h3>
        <p className="text-sm text-muted-foreground mt-1">{formatPrice(price.amount, price.currencyCode)}</p>
      </div>
    </Link>
  );
}
