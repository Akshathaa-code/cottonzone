import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { ShopifyProduct } from "@/lib/shopify";

interface WishlistStore {
  ids: string[];
  items: ShopifyProduct[];
  toggle: (product: ShopifyProduct) => void;
  has: (id: string) => boolean;
  clear: () => void;
}

const isSavedProduct = (product: unknown): product is ShopifyProduct => {
  if (!product || typeof product !== "object" || !("node" in product)) return false;
  const node = (product as { node?: Partial<ShopifyProduct["node"]> }).node;
  return !!node?.id && !!node?.handle && !!node?.title && !!node?.priceRange && !!node?.images && !!node?.variants;
};

const cleanItems = (items: unknown): ShopifyProduct[] => Array.isArray(items) ? items.filter(isSavedProduct) : [];
const cleanIds = (ids: unknown): string[] => Array.isArray(ids) ? ids.filter((id): id is string => typeof id === "string") : [];

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      ids: [],
      items: [],
      toggle: (product) => {
        const id = product.node.id;
        const exists = get().ids.includes(id);
        if (exists) {
          set({
            ids: get().ids.filter((i) => i !== id),
            items: get().items.filter((p) => p.node.id !== id),
          });
        } else {
          set({ ids: [...get().ids, id], items: [...get().items, product] });
        }
      },
      has: (id) => get().ids.includes(id),
      clear: () => set({ ids: [], items: [] }),
    }),
    {
      name: "cotton-zone-wishlist",
      storage: createJSONStorage(() => localStorage),
      merge: (persisted, current) => {
        const state = persisted as Partial<WishlistStore> | undefined;
        const items = cleanItems(state?.items);
        return { ...current, ...state, items, ids: cleanIds(state?.ids).filter((id) => items.some((p) => p.node.id === id)) };
      },
    },
  ),
);

interface RecentStore {
  items: ShopifyProduct[];
  add: (product: ShopifyProduct) => void;
}

export const useRecentStore = create<RecentStore>()(
  persist(
    (set, get) => ({
      items: [],
      add: (product) => {
        const id = product.node.id;
        const without = get().items.filter((p) => p.node.id !== id);
        set({ items: [product, ...without].slice(0, 8) });
      },
    }),
    {
      name: "cotton-zone-recent",
      storage: createJSONStorage(() => localStorage),
      merge: (persisted, current) => {
        const state = persisted as Partial<RecentStore> | undefined;
        return { ...current, ...state, items: cleanItems(state?.items).slice(0, 8) };
      },
    },
  ),
);
