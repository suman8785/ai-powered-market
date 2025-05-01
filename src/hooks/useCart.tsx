
import { useState, useEffect, createContext, useContext } from 'react';
import { supabase, CartItem } from '@/lib/supabase';
import { useAuth } from '@/hooks/useAuth';
import { Product, getProductById } from '@/data/products';
import { useToast } from '@/hooks/use-toast';

type CartContextType = {
  cartItems: (CartItem & { product?: Product })[];
  loading: boolean;
  addToCart: (productId: string, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  cartTotal: number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'marketplace_cart';

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cartItems, setCartItems] = useState<(CartItem & { product?: Product })[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();

  // Load cart on mount and when user changes
  useEffect(() => {
    const loadCart = async () => {
      setLoading(true);
      try {
        if (user) {
          // Get cart from Supabase if user is logged in
          const { data, error } = await supabase
            .from('cart_items')
            .select('product_id, quantity')
            .eq('user_id', user.id);
          
          if (error) throw error;
          
          // Add product details to cart items
          const itemsWithProducts = data.map(item => ({
            ...item,
            product: getProductById(item.product_id)
          }));
          
          setCartItems(itemsWithProducts);
        } else {
          // Get cart from localStorage if user is not logged in
          const storedCart = localStorage.getItem(CART_STORAGE_KEY);
          if (storedCart) {
            const parsedCart: CartItem[] = JSON.parse(storedCart);
            const itemsWithProducts = parsedCart.map(item => ({
              ...item,
              product: getProductById(item.product_id)
            }));
            setCartItems(itemsWithProducts);
          }
        }
      } catch (error) {
        console.error('Error loading cart:', error);
      } finally {
        setLoading(false);
      }
    };

    loadCart();
  }, [user]);

  // Update localStorage or Supabase when cart changes
  useEffect(() => {
    const saveCart = async () => {
      if (loading) return; // Don't save during initial load
      
      // Only save cart items without product data
      const itemsToSave = cartItems.map(({ product_id, quantity }) => ({
        product_id, quantity
      }));
      
      if (user) {
        // Save to Supabase
        try {
          // First delete all existing items
          await supabase
            .from('cart_items')
            .delete()
            .eq('user_id', user.id);
          
          // Then insert new items
          if (itemsToSave.length > 0) {
            const items = itemsToSave.map(item => ({
              ...item,
              user_id: user.id
            }));
            
            await supabase.from('cart_items').insert(items);
          }
        } catch (error) {
          console.error('Error saving cart to Supabase:', error);
        }
      } else {
        // Save to localStorage
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(itemsToSave));
      }
    };

    saveCart();
  }, [cartItems, user, loading]);

  const addToCart = (productId: string, quantity: number) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.product_id === productId);
      
      if (existingItem) {
        return prevItems.map(item => 
          item.product_id === productId 
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        const product = getProductById(productId);
        return [...prevItems, { 
          product_id: productId, 
          quantity,
          product
        }];
      }
    });

    toast({
      title: "Added to cart",
      description: `${quantity} item(s) added to your cart`,
    });
  };

  const removeFromCart = (productId: string) => {
    setCartItems(prevItems => prevItems.filter(item => item.product_id !== productId));
    
    toast({
      title: "Removed from cart",
      description: "Item removed from your cart",
    });
  };

  const clearCart = () => {
    setCartItems([]);
    toast({
      title: "Cart cleared",
      description: "All items have been removed from your cart",
    });
  };

  const cartTotal = cartItems.reduce((total, item) => {
    return total + (item.product?.price || 0) * item.quantity;
  }, 0);

  return (
    <CartContext.Provider 
      value={{ 
        cartItems, 
        loading, 
        addToCart, 
        removeFromCart, 
        clearCart,
        cartTotal
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
