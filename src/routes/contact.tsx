import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { MapPin, Phone, Mail, Clock, MessageCircle, Navigation } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name required").max(100),
  email: z.string().trim().email("Valid email required").max(255),
  message: z.string().trim().min(5, "Message too short").max(1000),
});

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact & Visit Our Store — Cotton Zone, RS Puram" },
      { name: "description", content: "Visit Cotton Zone at RS Puram, Coimbatore. Phone, WhatsApp, directions, store timings." },
      { property: "og:title", content: "Visit Cotton Zone — RS Puram, Coimbatore" },
      { property: "og:description", content: "Visit our flagship in RS Puram, Coimbatore." },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: ContactPage,
});

const WA = "919876543210";

function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [busy, setBusy] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = contactSchema.safeParse(form);
    if (!parsed.success) {
      toast.error(parsed.error.issues[0].message, { position: "top-center" });
      return;
    }
    setBusy(true);
    setTimeout(() => {
      toast.success("Message received", { description: "We'll reply within one business day.", position: "top-center" });
      setForm({ name: "", email: "", message: "" });
      setBusy(false);
    }, 600);
  };

  return (
    <>
      <section className="bg-cream py-16">
        <div className="container-luxe text-center">
          <span className="text-xs uppercase tracking-[0.3em] text-accent">Visit & Connect</span>
          <h1 className="font-display text-5xl md:text-6xl mt-3">Come Say Hello</h1>
          <p className="text-muted-foreground mt-4 max-w-xl mx-auto">
            Walk into our RS Puram boutique, message us on WhatsApp, or send us a note — we'd love to help.
          </p>
        </div>
      </section>

      <section className="container-luxe py-16 grid md:grid-cols-2 gap-12">
        <div>
          <h2 className="font-display text-3xl">Send us a message</h2>
          <form onSubmit={submit} className="space-y-5 mt-6">
            <div>
              <Label htmlFor="name">Your Name</Label>
              <Input id="name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="h-11 rounded-none mt-2" maxLength={100} required />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="h-11 rounded-none mt-2" maxLength={255} required />
            </div>
            <div>
              <Label htmlFor="message">Message</Label>
              <Textarea id="message" rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className="rounded-none mt-2" maxLength={1000} required />
            </div>
            <Button type="submit" disabled={busy} className="rounded-none h-12 px-8 bg-navy text-navy-foreground hover:bg-navy/90 text-xs tracking-[0.2em] uppercase">
              {busy ? "Sending…" : "Send Message"}
            </Button>
          </form>
        </div>

        <div>
          <h2 className="font-display text-3xl">Our Boutique</h2>
          <div className="space-y-5 mt-6">
            <div className="flex gap-4">
              <MapPin className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium">Cotton Zone Flagship</p>
                <p className="text-sm text-muted-foreground">RS Puram, Coimbatore<br/>Tamil Nadu 641002, India</p>
              </div>
            </div>
            <div className="flex gap-4">
              <Phone className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
              <a href="tel:+919876543210" className="text-sm hover:text-accent">+91 98765 43210</a>
            </div>
            <div className="flex gap-4">
              <Mail className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
              <a href="mailto:hello@cottonzone.in" className="text-sm hover:text-accent">hello@cottonzone.in</a>
            </div>
            <div className="flex gap-4">
              <Clock className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
              <div className="text-sm">
                <p>Mon – Sat · 10:00 AM – 9:00 PM</p>
                <p className="text-muted-foreground">Sunday · Closed</p>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 mt-8">
            <Button asChild className="rounded-none bg-[#25D366] hover:bg-[#1ebe57] text-white text-xs tracking-[0.2em] uppercase">
              <a href={`https://wa.me/${WA}`} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="h-4 w-4 mr-2" /> WhatsApp Us
              </a>
            </Button>
            <Button asChild variant="outline" className="rounded-none border-navy text-navy hover:bg-navy hover:text-navy-foreground text-xs tracking-[0.2em] uppercase">
              <a href="https://www.google.com/maps/search/?api=1&query=RS+Puram+Coimbatore" target="_blank" rel="noopener noreferrer">
                <Navigation className="h-4 w-4 mr-2" /> Get Directions
              </a>
            </Button>
          </div>

          <div className="mt-8 aspect-[4/3] overflow-hidden">
            <iframe
              title="Cotton Zone location"
              src="https://www.google.com/maps?q=RS+Puram+Coimbatore&output=embed"
              className="w-full h-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>
    </>
  );
}
