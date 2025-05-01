
import { Link, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/useCart";
import { useAuth } from "@/hooks/useAuth";
import { useOrders } from "@/hooks/useOrders";
import { Trash, ShoppingBag } from "lucide-react";

const Cart = () => {
  const { cartItems, removeFromCart, clearCart, cartTotal } = useCart();
  const { user } = useAuth();
  const { createOrder } = useOrders();
  const navigate = useNavigate();

  const handleCheckout = async () => {
    if (!user) {
      navigate('/login');
      return;
    }

    try {
      const orderItems = cartItems.map(item => ({
        product_id: item.product_id,
        quantity: item.quantity,
        price: item.product?.price || 0
      }));

      await createOrder(orderItems);
      clearCart();
      navigate('/orders');
    } catch (error) {
      console.error('Error during checkout:', error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-8">Your Shopping Cart</h1>
        
        {cartItems.length === 0 ? (
          <div className="text-center py-16">
            <div className="flex justify-center mb-6">
              <ShoppingBag className="h-16 w-16 text-gray-400" />
            </div>
            <h2 className="text-2xl font-medium mb-2">Your cart is empty</h2>
            <p className="text-gray-600 mb-8">
              Looks like you haven't added any products to your cart yet.
            </p>
            <Link to="/products">
              <Button className="bg-marketplace-primary hover:bg-marketplace-primary/90">
                Browse Products
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow">
                <div className="flex items-center justify-between p-6 border-b">
                  <h2 className="text-lg font-medium">Shopping Cart ({cartItems.length} items)</h2>
                  <Button variant="ghost" onClick={clearCart}>Clear Cart</Button>
                </div>
                
                <ul className="divide-y">
                  {cartItems.map(item => (
                    <li key={item.product_id} className="flex py-6 px-6">
                      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border">
                        <img
                          src={item.product?.images[0]}
                          alt={item.product?.title}
                          className="h-full w-full object-cover object-center"
                        />
                      </div>
                      
                      <div className="ml-4 flex flex-1 flex-col">
                        <div className="flex justify-between text-base font-medium">
                          <h3>
                            <Link to={`/product/${item.product_id}`} className="hover:text-marketplace-primary">
                              {item.product?.title}
                            </Link>
                          </h3>
                          <p className="ml-4">${(item.product?.price || 0).toFixed(2)}</p>
                        </div>
                        <p className="mt-1 text-sm text-gray-500">
                          Quantity: {item.quantity}
                        </p>
                        <div className="flex flex-1 items-end justify-between text-sm">
                          <p className="text-gray-500">
                            Subtotal: ${((item.product?.price || 0) * item.quantity).toFixed(2)}
                          </p>
                          <div className="flex">
                            <Button 
                              variant="ghost" 
                              className="text-red-500 hover:text-red-700"
                              onClick={() => removeFromCart(item.product_id)}
                            >
                              <Trash className="h-4 w-4 mr-1" />
                              Remove
                            </Button>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow p-6 sticky top-24">
                <h2 className="text-lg font-medium mb-4">Order Summary</h2>
                
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span>${cartTotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span>Free</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Taxes</span>
                    <span>${(cartTotal * 0.1).toFixed(2)}</span>
                  </div>
                  <div className="border-t pt-3 mt-3">
                    <div className="flex justify-between font-medium">
                      <span>Total</span>
                      <span>${(cartTotal * 1.1).toFixed(2)}</span>
                    </div>
                  </div>
                </div>
                
                <Button 
                  onClick={handleCheckout}
                  className="w-full bg-marketplace-primary hover:bg-marketplace-primary/90 text-white py-3"
                  disabled={cartItems.length === 0}
                >
                  {user ? 'Checkout' : 'Sign in to Checkout'}
                </Button>
                
                {!user && (
                  <p className="mt-4 text-center text-sm text-gray-500">
                    You need to{' '}
                    <Link to="/login" className="text-marketplace-primary hover:underline">
                      sign in
                    </Link>{' '}
                    to complete your order
                  </p>
                )}
              </div>
            </div>
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default Cart;
