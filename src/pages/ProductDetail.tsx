
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getProductById } from "@/data/products";
import { Button } from "@/components/ui/button";
import { Star, Truck, Package, Clock } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const product = getProductById(id || "");
  const [quantity, setQuantity] = useState(1);
  const { toast } = useToast();

  const handleAddToCart = () => {
    toast({
      title: "Added to cart",
      description: `${quantity} × ${product?.title} added to your cart`,
    });
  };

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-medium mb-2">Product Not Found</h2>
            <p className="text-muted-foreground mb-6">
              The product you're looking for doesn't exist or has been removed.
            </p>
            <Link to="/products">
              <Button>Browse Products</Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        <div className="container mx-auto py-8">
          <div className="mb-4">
            <Link to="/products" className="text-sm text-marketplace-primary hover:underline">
              ← Back to products
            </Link>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Product Image */}
            <div className="relative rounded-lg overflow-hidden bg-white shadow-md">
              <img 
                src={product.images[0]} 
                alt={product.title} 
                className="w-full h-full object-cover"
              />
              {product.featured && (
                <div className="absolute top-4 left-4 bg-marketplace-primary text-white text-sm font-medium px-2 py-1 rounded">
                  Featured
                </div>
              )}
            </div>
            
            {/* Product Info */}
            <div>
              <h1 className="text-3xl font-bold mb-2">{product.title}</h1>
              
              <div className="flex items-center mb-4">
                <div className="flex items-center">
                  <Star className="h-4 w-4 fill-current text-yellow-400 mr-1" />
                  <span className="font-medium">{product.rating}</span>
                </div>
                <span className="mx-2 text-muted-foreground">•</span>
                <span className="text-muted-foreground">{product.reviews} reviews</span>
                <span className="mx-2 text-muted-foreground">•</span>
                <span className="text-green-600 font-medium">In Stock ({product.stock})</span>
              </div>
              
              <div className="text-3xl font-bold mb-6">
                ${product.price.toFixed(2)}
              </div>
              
              <p className="text-muted-foreground mb-6">
                {product.description}
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="flex flex-col items-center border rounded-md p-4 text-center">
                  <Truck className="h-5 w-5 mb-2 text-marketplace-secondary" />
                  <span className="text-sm font-medium">Free Shipping</span>
                </div>
                <div className="flex flex-col items-center border rounded-md p-4 text-center">
                  <Package className="h-5 w-5 mb-2 text-marketplace-secondary" />
                  <span className="text-sm font-medium">Easy Returns</span>
                </div>
                <div className="flex flex-col items-center border rounded-md p-4 text-center">
                  <Clock className="h-5 w-5 mb-2 text-marketplace-secondary" />
                  <span className="text-sm font-medium">2-Day Delivery</span>
                </div>
              </div>
              
              <Separator className="my-6" />
              
              <div className="flex flex-wrap md:flex-nowrap items-center gap-4 mb-6">
                <div className="flex items-center border rounded">
                  <button 
                    className="px-4 py-2 border-r text-lg"
                    onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                  >
                    -
                  </button>
                  <span className="px-6 py-2">{quantity}</span>
                  <button 
                    className="px-4 py-2 border-l text-lg"
                    onClick={() => setQuantity(prev => Math.min(product.stock, prev + 1))}
                  >
                    +
                  </button>
                </div>
                
                <Button 
                  className="flex-1 bg-marketplace-primary hover:bg-marketplace-primary/90 text-white py-6"
                  onClick={handleAddToCart}
                >
                  Add to Cart
                </Button>
                
                <Button className="flex-1 bg-marketplace-accent hover:bg-marketplace-accent/90 text-white py-6">
                  Buy Now
                </Button>
              </div>
              
              <p className="text-sm text-muted-foreground">
                Category: <span className="text-marketplace-dark">{product.category}</span>
              </p>
              
              <div className="flex flex-wrap gap-2 mt-2">
                {product.tags.map(tag => (
                  <div key={tag} className="bg-marketplace-light px-2 py-1 rounded-full text-xs">
                    {tag}
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="mt-12">
            <Tabs defaultValue="details">
              <TabsList className="w-full max-w-md mx-auto grid grid-cols-3">
                <TabsTrigger value="details">Product Details</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
                <TabsTrigger value="shipping">Shipping</TabsTrigger>
              </TabsList>
              
              <div className="mt-8 border rounded-lg p-6">
                <TabsContent value="details" className="space-y-4">
                  <h3 className="text-xl font-medium">Product Details</h3>
                  <p>
                    {product.description} This premium product is designed to provide exceptional 
                    quality and performance. Made from high-quality materials and built to last.
                  </p>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>High-quality construction</li>
                    <li>Designed for everyday use</li>
                    <li>Stylish and functional design</li>
                    <li>Backed by our satisfaction guarantee</li>
                  </ul>
                </TabsContent>
                
                <TabsContent value="reviews">
                  <h3 className="text-xl font-medium mb-4">Customer Reviews</h3>
                  <div className="space-y-6">
                    <div className="border-b pb-4">
                      <div className="flex items-center mb-2">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              className={`h-4 w-4 ${i < 5 ? 'fill-current text-yellow-400' : ''}`}
                            />
                          ))}
                        </div>
                        <span className="ml-2 font-medium">Amazing product!</span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-1">
                        This product exceeded all my expectations. The quality is outstanding and 
                        it works perfectly for what I need.
                      </p>
                      <span className="text-xs text-muted-foreground">John D. - 2 weeks ago</span>
                    </div>
                    
                    <div>
                      <div className="flex items-center mb-2">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              className={`h-4 w-4 ${i < 4 ? 'fill-current text-yellow-400' : ''}`}
                            />
                          ))}
                        </div>
                        <span className="ml-2 font-medium">Great value</span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-1">
                        Very satisfied with my purchase. It's well made and works as described.
                        Would recommend to others looking for a quality product.
                      </p>
                      <span className="text-xs text-muted-foreground">Sarah M. - 1 month ago</span>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="shipping">
                  <h3 className="text-xl font-medium mb-4">Shipping Information</h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium">Delivery Times</h4>
                      <p className="text-sm text-muted-foreground">
                        Standard Shipping: 3-5 business days<br />
                        Express Shipping: 1-2 business days (additional fee)
                      </p>
                    </div>
                    
                    <div>
                      <h4 className="font-medium">Return Policy</h4>
                      <p className="text-sm text-muted-foreground">
                        We accept returns within 30 days of delivery. Items must be unused, 
                        in the same condition that you received them, and in the original packaging.
                      </p>
                    </div>
                  </div>
                </TabsContent>
              </div>
            </Tabs>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ProductDetail;
