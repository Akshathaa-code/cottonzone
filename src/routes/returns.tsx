import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/returns")({
  head: () => ({
    meta: [
      { title: "Returns & Exchanges — Cotton Zone" },
      { name: "description", content: "Cotton Zone's 7-day easy exchange and return policy." },
      { property: "og:url", content: "/returns" },
    ],
    links: [{ rel: "canonical", href: "/returns" }],
  }),
  component: () => (
    <section className="container-luxe py-16 max-w-3xl prose prose-neutral">
      <h1 className="font-display text-5xl mb-8">Returns & Exchanges</h1>
      <p>We want every Cotton Zone shirt to feel right. If something doesn't, we'll make it right.</p>
      <h2 className="font-display text-2xl mt-8">7-Day Easy Exchange</h2>
      <p>You may exchange any unworn, unwashed item with tags intact within 7 days of delivery. Simply WhatsApp us at +91 98765 43210 or email hello@cottonzone.in with your order number.</p>
      <h2 className="font-display text-2xl mt-8">Refunds</h2>
      <p>If an exchange isn't possible, we'll refund the original amount to your source of payment within 5–7 working days of receiving the returned item.</p>
      <h2 className="font-display text-2xl mt-8">Non-returnable Items</h2>
      <p>Items marked Final Sale, customised or altered pieces, and innerwear are not eligible for return.</p>
      <h2 className="font-display text-2xl mt-8">Damaged or Wrong Item?</h2>
      <p>We're sorry. Send us a photo within 48 hours of delivery and we'll arrange a free pickup and full replacement.</p>
    </section>
  ),
});
