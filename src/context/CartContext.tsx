// context/CartContext.tsx
'use client';
import { createContext, useContext, useState, ReactNode } from 'react';

interface CartItem {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  quantity: number;
  color: string;
  size: string;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  updateQuantity: (id: string, type: 'increase' | 'decrease', color: string, size: string) => void;
  removeFromCart: (id: string) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // Limit per item (Max 100)
  const MAX_ITEM_QUANTITY = 100;

  const addToCart = (item: CartItem) => {
    setCartItems((prevItems) => {
      const existingItemIndex = prevItems.findIndex(
        (cartItem) => cartItem.id === item.id && cartItem.color === item.color && cartItem.size === item.size
      );
      
      if (existingItemIndex !== -1) {
        const updatedItems = [...prevItems];
        const existingItem = updatedItems[existingItemIndex];
        
        if (existingItem.quantity < MAX_ITEM_QUANTITY) {
          existingItem.quantity = Math.min(MAX_ITEM_QUANTITY, existingItem.quantity + item.quantity);
        }
        return updatedItems;
      }
      return [...prevItems, item];
    });
  };

  const updateQuantity = (id: string, type: 'increase' | 'decrease', color: string, size: string) => {
    setCartItems((prevItems) => {
      return prevItems.map((item) =>
        item.id === id && item.color === color && item.size === size
          ? {
              ...item,
              quantity: type === 'increase'
                ? Math.min(MAX_ITEM_QUANTITY, item.quantity + 1)
                : Math.max(1, item.quantity - 1),
            }
          : item
      );
    });
  };

  const removeFromCart = (id: string) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, updateQuantity, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};
