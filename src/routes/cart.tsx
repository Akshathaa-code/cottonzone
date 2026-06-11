import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/stores/cartStore";
import { formatPrice } from "@/lib/shopify";
import { Minus, Plus, Trash2, ExternalLink, Loader2, ShoppingBag } from "lucide-react";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [
      { title: "Your Bag — Cotton Zone" },
      { name: "description", content: "Review your bag before secure Shopify checkout." },
      { property: "og:url", content: "/cart" },
    ],
    links: [{ rel: "canonical", href: "/cart" }],
  }),
  component: CartPage,
});

function CartPage() {
  const { items, isLoading, isSyncing, updateQuantity, removeItem, getCheckoutUrl } = useCartStore();
  const total = items.reduce((s, i) => s + parseFloat(i.price.amount) * i.quantity, 0);
  const currency = items[0]?.price.currencyCode || "INR";
  const checkout = () => { const url = getCheckoutUrl(); if (url) window.open(url, "_blank"); };

  return (
    <section className="container-luxe py-16">
      <h1 className="font-display text-5xl mb-10">Your Bag</h1>
      {items.length === 0 ? (
        <div className="text-center py-20">
          <ShoppingBag className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <p className="font-display text-2xl">Your bag is empty</p>
          <Button asChild className="mt-6 rounded-none h-12 px-8 bg-navy text-navy-foreground hover:bg-navy/90 text-xs tracking-[0.2em] uppercase">
            <Link to="/shop">Shop the Collection</Link>
          </Button>
        </div>
      ) : (
        <div className="grid md:grid-cols-3 gap-10">
          <div className="md:col-span-2 space-y-6">
            {items.map((i) => (
              <div key={i.variantId} className="flex gap-4 pb-6 border-b">
                <div className="w-28 h-36 bg-muted overflow-hidden">
                  {i.product.node.images.edges[0] && (
                    <img src={i.product.node.images.edges[0].node.url} alt={i.product.node.title} className="w-full h-full object-cover" />
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="font-display text-xl">{i.product.node.title}</h3>
                  <p className="text-xs text-muted-foreground mt-1">{i.selectedOptions.map((o) => o.value).join(" · ")}</p>
                  <p className="mt-2">{formatPrice(i.price.amount, i.price.currencyCode)}</p>
                  <div className="flex items-center gap-3 mt-4">
                    <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => updateQuantity(i.variantId, i.quantity - 1)}><Minus className="h-3 w-3" /></Button>
                    <span className="w-8 text-center">{i.quantity}</span>
                    <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => updateQuantity(i.variantId, i.quantity + 1)}><Plus className="h-3 w-3" /></Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 ml-auto" onClick={() => removeItem(i.variantId)}><Trash2 className="h-4 w-4" /></Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <aside className="bg-cream p-6 h-fit">
            <h2 className="font-display text-2xl">Order Summary</h2>
            <div className="flex justify-between mt-6 text-sm"><span>Subtotal</span><span>{formatPrice(total, currency)}</span></div>
            <div className="flex justify-between mt-2 text-sm text-muted-foreground"><span>Shipping</span><span>Calculated at checkout</span></div>
            <div className="border-t border-border my-4" />
            <div className="flex justify-between text-lg font-medium"><span>Total</span><span>{formatPrice(total, currency)}</span></div>
            <Button onClick={checkout} disabled={isLoading || isSyncing} className="mt-6 w-full h-12 rounded-none bg-navy text-navy-foreground hover:bg-navy/90 text-xs tracking-[0.2em] uppercase">
              {isLoading || isSyncing ? <Loader2 className="w-4 h-4 animate-spin" /> : <><ExternalLink className="w-4 h-4 mr-2" /> Secure Checkout</>}
            </Button>
            <p className="text-xs text-muted-foreground mt-3 text-center">Powered by Shopify · Secure payments</p>
          </aside>
        </div>
      )}
    </section>
  );
}
