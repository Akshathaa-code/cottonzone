import { Link } from "@tanstack/react-router";
import { Instagram, Facebook, Youtube, MapPin, Phone, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-navy text-navy-foreground mt-24">
      <div className="container-luxe py-16 grid grid-cols-1 md:grid-cols-4 gap-10">
        <div>
          <div className="font-display text-2xl">
            Cotton <span className="text-accent italic">Zone</span>
          </div>
          <p className="text-sm text-navy-foreground/70 mt-4 leading-relaxed">
            Premium 100% pure cotton men's shirts — formal & casual, self-stitched in our Coimbatore workshop. A family-run heritage now woven for a new generation.
          </p>
          <div className="flex gap-3 mt-6">
            <a href="#" aria-label="Instagram" className="hover:text-accent transition-colors"><Instagram className="h-5 w-5" /></a>
            <a href="#" aria-label="Facebook" className="hover:text-accent transition-colors"><Facebook className="h-5 w-5" /></a>
            <a href="#" aria-label="YouTube" className="hover:text-accent transition-colors"><Youtube className="h-5 w-5" /></a>
          </div>
        </div>

        <div>
          <h4 className="text-xs uppercase tracking-[0.2em] text-accent mb-4">Shop</h4>
          <ul className="space-y-2 text-sm text-navy-foreground/80">
            <li><Link to="/shop" className="hover:text-accent">All Products</Link></li>
            <li><Link to="/shop" search={{ category: "formal" }} className="hover:text-accent">Formal Shirts</Link></li>
            <li><Link to="/shop" search={{ category: "casual" }} className="hover:text-accent">Casual Shirts</Link></li>
            
          </ul>
        </div>

        <div>
          <h4 className="text-xs uppercase tracking-[0.2em] text-accent mb-4">Help</h4>
          <ul className="space-y-2 text-sm text-navy-foreground/80">
            <li><Link to="/faq" className="hover:text-accent">FAQ</Link></li>
            <li><Link to="/returns" className="hover:text-accent">Returns & Exchanges</Link></li>
            <li><Link to="/privacy" className="hover:text-accent">Privacy Policy</Link></li>
            <li><Link to="/terms" className="hover:text-accent">Terms & Conditions</Link></li>
            <li><Link to="/contact" className="hover:text-accent">Contact Us</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs uppercase tracking-[0.2em] text-accent mb-4">Visit Us</h4>
          <ul className="space-y-3 text-sm text-navy-foreground/80">
            <li className="flex gap-3"><MapPin className="h-4 w-4 mt-0.5 flex-shrink-0 text-accent" /> RS Puram, Coimbatore<br/>Tamil Nadu 641002</li>
            <li className="flex gap-3"><Phone className="h-4 w-4 mt-0.5 flex-shrink-0 text-accent" /> +91 98765 43210</li>
            <li className="flex gap-3"><Mail className="h-4 w-4 mt-0.5 flex-shrink-0 text-accent" /> hello@cottonzone.in</li>
          </ul>
          <p className="text-xs text-navy-foreground/60 mt-4">Mon – Sat · 10:00 AM – 9:00 PM</p>
        </div>
      </div>
      <div className="border-t border-navy-foreground/10">
        <div className="container-luxe py-6 text-xs text-navy-foreground/60 text-center">
          © {new Date().getFullYear()} Cotton Zone. Crafted with care in Coimbatore.
        </div>
      </div>
    </footer>
  );
}
