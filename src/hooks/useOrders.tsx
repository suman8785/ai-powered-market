
import { createContext, useContext } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';

type OrderItem = {
  id: string;
  order_id: string;
  product_id: string;
  quantity: number;
  price: number;
};

type Order = {
  id: string;
  user_id: string;
  status: 'pending' | 'completed' | 'cancelled';
  created_at: string;
  total: number;
  items?: OrderItem[];
};

type OrderContextType = {
  orders: Order[];
  isLoading: boolean;
  error: Error | null;
  createOrder: (items: { product_id: string; quantity: number; price: number }[]) => Promise<string>;
};

const OrdersContext = createContext<OrderContextType | undefined>(undefined);

export const OrdersProvider = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const {
    data: orders = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ['orders', user?.id],
    queryFn: async () => {
      if (!user) return [];
      
      const { data, error } = await supabase
        .from('orders')
        .select(`
          *,
          items:order_items(*)
        `)
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });
        
      if (error) throw error;
      return data as Order[];
    },
    enabled: !!user,
  });

  const createOrderMutation = useMutation({
    mutationFn: async (items: { product_id: string; quantity: number; price: number }[]) => {
      if (!user) throw new Error('User must be logged in to create an order');
      
      // Calculate order total
      const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      
      // 1. Create order
      const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert({
          user_id: user.id,
          status: 'pending',
          total,
        })
        .select('id')
        .single();
        
      if (orderError) throw orderError;
      
      // 2. Add order items
      const orderItems = items.map(item => ({
        order_id: order.id,
        product_id: item.product_id,
        quantity: item.quantity,
        price: item.price,
      }));
      
      const { error: itemsError } = await supabase
        .from('order_items')
        .insert(orderItems);
        
      if (itemsError) throw itemsError;
      
      return order.id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders', user?.id] });
      toast({
        title: "Order created!",
        description: "Your order has been placed successfully",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error creating order",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const createOrder = async (items: { product_id: string; quantity: number; price: number }[]) => {
    return createOrderMutation.mutateAsync(items);
  };

  return (
    <OrdersContext.Provider value={{ orders, isLoading, error, createOrder }}>
      {children}
    </OrdersContext.Provider>
  );
};

export const useOrders = () => {
  const context = useContext(OrdersContext);
  if (context === undefined) {
    throw new Error('useOrders must be used within an OrdersProvider');
  }
  return context;
};
