import { Link } from "@tanstack/react-router";
import { Menu, Search, User } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { CartDrawer } from "./CartDrawer";

const nav = [
  { to: "/", label: "Home" },
  { to: "/shop", label: "Shop" },
  { to: "/about", label: "Our Story" },
  { to: "/contact", label: "Visit Store" },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="bg-navy text-navy-foreground text-xs">
        <div className="container-luxe flex justify-center md:justify-between items-center h-9">
          <span className="hidden md:inline">Free shipping across India on orders above ₹1,499</span>
          <span>Visit our store at RS Puram, Coimbatore</span>
        </div>
      </div>
      <div className="container-luxe flex items-center justify-between h-16 md:h-20">
        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden" aria-label="Menu">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-72">
            <nav className="flex flex-col gap-1 mt-10">
              {nav.map((n) => (
                <Link
                  key={n.to}
                  to={n.to}
                  onClick={() => setMobileOpen(false)}
                  className="font-display text-2xl py-3 border-b border-border"
                >
                  {n.label}
                </Link>
              ))}
            </nav>
          </SheetContent>
        </Sheet>

        <nav className="hidden md:flex items-center gap-8 flex-1">
          {nav.slice(0, 2).map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="text-sm uppercase tracking-[0.18em] text-foreground hover:text-accent transition-colors"
              activeProps={{ className: "text-accent" }}
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <Link to="/" className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center">
          <span className="font-display text-2xl md:text-3xl tracking-wide leading-none">
            Cotton <span className="text-accent italic">Zone</span>
          </span>
          <span className="hidden md:block text-[10px] tracking-[0.3em] uppercase text-muted-foreground mt-0.5">
            Coimbatore · Since
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8 flex-1 justify-end">
          {nav.slice(2).map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="text-sm uppercase tracking-[0.18em] text-foreground hover:text-accent transition-colors"
              activeProps={{ className: "text-accent" }}
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1 md:ml-6">
          <Button variant="ghost" size="icon" aria-label="Search" className="hidden md:inline-flex">
            <Search className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" aria-label="Account" className="hidden md:inline-flex">
            <User className="h-5 w-5" />
          </Button>
          <CartDrawer />
        </div>
      </div>
    </header>
  );
}
