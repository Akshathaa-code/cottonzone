import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet, createRootRouteWithContext, useRouter, HeadContent, Scripts, Link,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { Toaster } from "@/components/ui/sonner";
import { useCartSync } from "@/hooks/useCartSync";

function NotFoundComponent() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-accent">404</p>
        <h1 className="font-display text-4xl mt-3">Page not found</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link to="/" className="inline-block mt-8 px-8 py-3 bg-navy text-navy-foreground text-xs uppercase tracking-[0.2em]">
          Return Home
        </Link>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);
  return (
    <div className="flex min-h-[70vh] items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-2xl">Something went wrong</h1>
        <p className="mt-3 text-sm text-muted-foreground">Please try refreshing the page.</p>
        <button
          onClick={() => { router.invalidate(); reset(); }}
          className="mt-6 px-6 py-3 bg-navy text-navy-foreground text-xs uppercase tracking-[0.2em]"
        >Try again</button>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Cotton Zone — Premium Cotton Shirts | Coimbatore" },
      { name: "description", content: "Premium 100% cotton shirts and men's wear, crafted in Coimbatore. Shop online or visit our RS Puram store." },
      { name: "author", content: "Cotton Zone" },
      { property: "og:site_name", content: "Cotton Zone" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "theme-color", content: "#1a2547" },
      { property: "og:title", content: "Cotton Zone — Premium Cotton Shirts | Coimbatore" },
      { name: "twitter:title", content: "Cotton Zone — Premium Cotton Shirts | Coimbatore" },
      { property: "og:description", content: "Premium 100% cotton shirts and men's wear, crafted in Coimbatore. Shop online or visit our RS Puram store." },
      { name: "twitter:description", content: "Premium 100% cotton shirts and men's wear, crafted in Coimbatore. Shop online or visit our RS Puram store." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/8c688eed-424a-4848-a964-99f2f171aaad/id-preview-6725da49--1486d43b-c087-4772-be21-e1c90f45d8ab.lovable.app-1781361506689.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/8c688eed-424a-4848-a964-99f2f171aaad/id-preview-6725da49--1486d43b-c087-4772-be21-e1c90f45d8ab.lovable.app-1781361506689.png" },
    ],
      links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", type: "image/png", href: "/favicon.png" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Inter:wght@300;400;500;600;700&display=swap",
      },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ClothingStore",
          name: "Cotton Zone",
          description: "Premium men's cotton shirts and clothing in Coimbatore.",
          address: {
            "@type": "PostalAddress",
            streetAddress: "RS Puram",
            addressLocality: "Coimbatore",
            addressRegion: "Tamil Nadu",
            postalCode: "641002",
            addressCountry: "IN",
          },
          telephone: "+91-98765-43210",
          openingHours: "Mo-Sa 10:00-21:00",
        }),
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head><HeadContent /></head>
      <body><Scripts />{children}</body>
    </html>
  );
}

function AppShell() {
  useCartSync();
  return (
    <>
      <Header />
      <main className="min-h-[60vh]"><Outlet /></main>
      <Footer />
      <WhatsAppButton />
      <Toaster position="top-center" />
    </>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <AppShell />
    </QueryClientProvider>
  );
}
