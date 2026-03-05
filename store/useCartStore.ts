import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Định nghĩa kiểu dữ liệu cho sản phẩm trong giỏ
interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

interface CartState {
  cart: CartItem[];
  addToCart: (product: any) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      cart: [],
      
      addToCart: (product) => {
        const currentCart = get().cart;
        const existingItem = currentCart.find((item) => item.id === product.id);

        if (existingItem) {
          // Nếu đã có trong giỏ, tăng số lượng
          set({
            cart: currentCart.map((item) =>
              item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
            ),
          });
        } else {
          // Nếu chưa có, thêm mới với số lượng là 1
          set({ cart: [...currentCart, { ...product, quantity: 1 }] });
        }
      },

      removeFromCart: (id) => set({
        cart: get().cart.filter((item) => item.id !== id)
      }),

      updateQuantity: (id, quantity) => set({
        cart: get().cart.map((item) =>
          item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item
        ),
      }),

      clearCart: () => set({ cart: [] }),

      getTotalItems: () => get().cart.reduce((total, item) => total + item.quantity, 0),

      getTotalPrice: () => get().cart.reduce((total, item) => total + (item.price * item.quantity), 0),
    }),
    {
      name: 'Minh-Hong-cart', // Tên khóa lưu trong LocalStorage
    }
  )
);