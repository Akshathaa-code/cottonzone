import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — Cotton Zone" },
      { name: "description", content: "How Cotton Zone collects, uses, and protects your information." },
      { property: "og:url", content: "/privacy" },
    ],
    links: [{ rel: "canonical", href: "/privacy" }],
  }),
  component: () => (
    <section className="container-luxe py-16 max-w-3xl prose prose-neutral">
      <h1 className="font-display text-5xl mb-8">Privacy Policy</h1>
      <p>Cotton Zone respects your privacy. This policy explains what we collect and why.</p>
      <h2 className="font-display text-2xl mt-8">Information We Collect</h2>
      <p>Name, email, phone, shipping address, and order details when you place an order or sign up for our newsletter. Payment information is processed securely by Shopify; we never store card details.</p>
      <h2 className="font-display text-2xl mt-8">How We Use It</h2>
      <p>To fulfil your orders, send shipping updates, respond to support queries, and — with your consent — share new arrivals or offers.</p>
      <h2 className="font-display text-2xl mt-8">Cookies</h2>
      <p>We use cookies to keep your bag, remember preferences, and improve our website. You can disable cookies in your browser at any time.</p>
      <h2 className="font-display text-2xl mt-8">Third Parties</h2>
      <p>We share order data only with the shipping and payment partners required to deliver your purchase.</p>
      <h2 className="font-display text-2xl mt-8">Your Rights</h2>
      <p>Write to hello@cottonzone.in to access, correct, or delete your data.</p>
    </section>
  ),
});
