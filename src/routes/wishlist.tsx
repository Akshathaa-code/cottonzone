import { createFileRoute, Link } from "@tanstack/react-router";
import { ProductCard } from "@/components/ProductCard";
import { useWishlistStore } from "@/stores/wishlistStore";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/wishlist")({
  head: () => ({
    meta: [
      { title: "Your Wishlist — Cotton Zone" },
      { name: "description", content: "Saved Cotton Zone shirts you love. Come back any time." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: WishlistPage,
});

function WishlistPage() {
  const items = useWishlistStore((s) => s.items);
  return (
    <>
      <section className="bg-cream py-16">
        <div className="container-luxe text-center">
          <span className="text-xs uppercase tracking-[0.3em] text-accent">Saved for Later</span>
          <h1 className="font-display text-5xl md:text-6xl mt-3">Your Wishlist</h1>
          <p className="text-muted-foreground mt-4 max-w-xl mx-auto">
            The pieces you've loved. Saved on this device — no account needed.
          </p>
        </div>
      </section>
      <section className="container-luxe py-16">
        {items.length === 0 ? (
          <div className="text-center py-16">
            <Heart className="h-10 w-10 mx-auto text-accent" />
            <p className="font-display text-2xl mt-6">Your wishlist is empty</p>
            <p className="text-sm text-muted-foreground mt-3">Tap the heart on any shirt to save it here.</p>
            <Button asChild className="mt-8 rounded-none h-12 px-8 bg-navy text-navy-foreground hover:bg-navy/90 text-xs tracking-[0.2em] uppercase">
              <Link to="/shop">Browse the Collection</Link>
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-12">
            {items.map((p) => <ProductCard key={p.node.id} product={p} />)}
          </div>
        )}
      </section>
    </>
  );
}
