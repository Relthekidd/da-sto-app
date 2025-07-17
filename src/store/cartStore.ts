import { create } from 'zustand';
import { Product, WeightOption } from '@/types';
import { persist } from 'zustand/middleware';

interface CartItem extends Product {
  selectedWeight: WeightOption;
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  total: number;
  addToCart: (product: Product, weight: WeightOption, quantity: number) => void;
  removeFromCart: (productId: string, weight: WeightOption) => void;
  updateQuantity: (productId: string, weight: WeightOption, quantity: number) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      total: 0,

      addToCart: (product, selectedWeight, quantity) => {
        const existingItemIndex = get().items.findIndex(
          (item) =>
            item.id === product.id && item.selectedWeight.weight === selectedWeight.weight
        );

        if (existingItemIndex >= 0) {
          const updatedItems = [...get().items];
          updatedItems[existingItemIndex].quantity += quantity;

          return set({
            items: updatedItems,
            total: get().total + selectedWeight.price * quantity,
          });
        }

        const newItem: CartItem = { ...product, selectedWeight, quantity };
        return set({
          items: [...get().items, newItem],
          total: get().total + selectedWeight.price * quantity,
        });
      },

      removeFromCart: (productId, selectedWeight) => {
        const item = get().items.find(
          (item) => item.id === productId && item.selectedWeight.weight === selectedWeight.weight
        );

        if (!item) return;

        set({
          items: get().items.filter(
            (i) =>
              !(i.id === productId && i.selectedWeight.weight === selectedWeight.weight)
          ),
          total: get().total - item.selectedWeight.price * item.quantity,
        });
      },

      updateQuantity: (productId, selectedWeight, newQuantity) => {
        const items = get().items.map((item) => {
          if (item.id === productId && item.selectedWeight.weight === selectedWeight.weight) {
            const diff = newQuantity - item.quantity;
            item.quantity = newQuantity;
            set({ total: get().total + item.selectedWeight.price * diff });
          }
          return item;
        });

        set({ items });
      },

      clearCart: () => set({ items: [], total: 0 }),
    }),
    { name: 'cart-store' }
  )
);
