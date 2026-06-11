import { createFileRoute } from "@tanstack/react-router";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqs = [
  { q: "Are your shirts really 100% cotton?", a: "Yes — every shirt we make is woven from 100% long-staple cotton sourced from India's finest mills. No blends." },
  { q: "How do I find my size?", a: "Our shirts follow standard Indian sizing: S (38), M (40), L (42), XL (44), XXL (46). For a slimmer fit, size down. Detailed measurements are on each product page." },
  { q: "Do you ship across India?", a: "Yes. We deliver pan-India in 3–6 working days. Free shipping on orders above ₹1,499." },
  { q: "What's your return policy?", a: "7-day easy exchange on unworn, unwashed items with tags intact. See our Returns page for details." },
  { q: "Can I visit your store?", a: "Absolutely. Our flagship boutique is at RS Puram, Coimbatore — open Mon–Sat, 10 AM to 9 PM." },
  { q: "Do you accept Cash on Delivery?", a: "Yes, COD is available across most pin codes for orders up to ₹5,000." },
  { q: "How do I care for my cotton shirt?", a: "Machine wash cold with similar colours. Iron on medium heat. Avoid bleach. Hang to dry to keep the fabric crisp." },
];

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "FAQ — Cotton Zone" },
      { name: "description", content: "Frequently asked questions about Cotton Zone shirts, sizing, shipping, and returns." },
      { property: "og:url", content: "/faq" },
    ],
    links: [{ rel: "canonical", href: "/faq" }],
    scripts: [{
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      }),
    }],
  }),
  component: () => (
    <section className="container-luxe py-16 max-w-3xl">
      <h1 className="font-display text-5xl text-center">FAQ</h1>
      <Accordion type="single" collapsible className="mt-10">
        {faqs.map((f, i) => (
          <AccordionItem key={i} value={`f${i}`}>
            <AccordionTrigger className="text-left text-base">{f.q}</AccordionTrigger>
            <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  ),
});
