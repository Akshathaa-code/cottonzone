import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms & Conditions — Cotton Zone" },
      { name: "description", content: "Terms of use governing your purchase from Cotton Zone." },
      { property: "og:url", content: "/terms" },
    ],
    links: [{ rel: "canonical", href: "/terms" }],
  }),
  component: () => (
    <section className="container-luxe py-16 max-w-3xl prose prose-neutral">
      <h1 className="font-display text-5xl mb-8">Terms & Conditions</h1>
      <p>By using cottonzone.in you agree to the following terms.</p>
      <h2 className="font-display text-2xl mt-8">Orders & Pricing</h2>
      <p>All prices are in INR and inclusive of taxes. We reserve the right to refuse or cancel orders in case of pricing or stock errors.</p>
      <h2 className="font-display text-2xl mt-8">Intellectual Property</h2>
      <p>All content — images, copy, designs — is owned by Cotton Zone and may not be reused without written consent.</p>
      <h2 className="font-display text-2xl mt-8">Liability</h2>
      <p>Our liability is limited to the value of the product purchased.</p>
      <h2 className="font-display text-2xl mt-8">Governing Law</h2>
      <p>These terms are governed by the laws of India. Jurisdiction lies with the courts of Coimbatore, Tamil Nadu.</p>
    </section>
  ),
});
