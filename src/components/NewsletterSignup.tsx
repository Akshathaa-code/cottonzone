import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

export function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  return (
    <section className="bg-cream py-20">
      <div className="container-luxe max-w-2xl text-center">
        <span className="text-xs uppercase tracking-[0.3em] text-accent">The Cotton Zone Letter</span>
        <h2 className="font-display text-3xl md:text-4xl mt-3">First access. Always cotton.</h2>
        <p className="text-muted-foreground mt-3">
          Subscribe for new arrivals, behind-the-scenes from our Coimbatore atelier, and exclusive early offers.
        </p>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (!email) return;
            setLoading(true);
            setTimeout(() => {
              toast.success("Welcome to Cotton Zone", { description: "Check your inbox soon.", position: "top-center" });
              setEmail("");
              setLoading(false);
            }, 600);
          }}
          className="mt-8 flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
        >
          <Input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            className="h-12 rounded-none bg-background"
          />
          <Button type="submit" disabled={loading} className="h-12 rounded-none bg-navy text-navy-foreground hover:bg-navy/90 px-8 tracking-[0.2em] text-xs uppercase">
            Subscribe
          </Button>
        </form>
      </div>
    </section>
  );
}
