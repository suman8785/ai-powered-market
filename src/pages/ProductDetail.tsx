
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getProductById } from "@/data/products";
import { Button } from "@/components/ui/button";
import { Star, MapPin, Users, Bed, Bath, Wifi, Check } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/hooks/useCart";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const product = getProductById(id || "");
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    if (product) {
      addToCart(product.id, quantity);
    }
  };

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-medium mb-2">Property Not Found</h2>
            <p className="text-muted-foreground mb-6">
              The property you're looking for doesn't exist or has been removed.
            </p>
            <Link to="/products">
              <Button>Browse Properties</Button>
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
              ← Back to properties
            </Link>
          </div>
          
          {/* Property Title Section */}
          <div className="mb-6">
            <h1 className="text-3xl font-bold">{product.title}</h1>
            <div className="flex items-center flex-wrap gap-2 mt-2">
              <div className="flex items-center">
                <Star className="h-4 w-4 fill-current text-yellow-400 mr-1" />
                <span className="font-medium">{product.rating}</span>
                <span className="mx-1">•</span>
                <span className="text-muted-foreground">{product.reviews} reviews</span>
              </div>
              {product.host.isSuperhost && (
                <>
                  <span className="mx-1 text-muted-foreground">•</span>
                  <Badge variant="outline">Superhost</Badge>
                </>
              )}
              <span className="mx-1 text-muted-foreground">•</span>
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-1" />
                <span>{product.location}</span>
              </div>
            </div>
          </div>
          
          {/* Property Image */}
          <div className="relative rounded-xl overflow-hidden bg-white shadow-md mb-8">
            <img 
              src={product.images[0]} 
              alt={product.title} 
              className="w-full h-[500px] object-cover"
            />
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Property Info - Left Column */}
            <div className="lg:col-span-2">
              <div className="border-b pb-6 mb-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-semibold">
                      {product.category} hosted by {product.host.name}
                    </h2>
                    <div className="flex mt-1 text-muted-foreground">
                      <span>{product.guests} guests</span>
                      <span className="mx-1">•</span>
                      <span>{product.bedrooms} bedroom{product.bedrooms !== 1 ? 's' : ''}</span>
                      <span className="mx-1">•</span>
                      <span>{product.bathrooms} bath{product.bathrooms !== 1 ? 's' : ''}</span>
                    </div>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-lg font-semibold">
                    {product.host.name.charAt(0)}
                  </div>
                </div>
              </div>
              
              {/* Highlights */}
              <div className="border-b pb-6 mb-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-start">
                    <div className="mr-4 mt-1">
                      <Users className="h-6 w-6 text-gray-500" />
                    </div>
                    <div>
                      <h3 className="font-medium">Hosted by {product.host.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {product.host.isSuperhost ? 'Superhost with ' : ''}{product.reviews} reviews
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="mr-4 mt-1">
                      <MapPin className="h-6 w-6 text-gray-500" />
                    </div>
                    <div>
                      <h3 className="font-medium">Great location</h3>
                      <p className="text-sm text-muted-foreground">
                        100% of recent guests gave the location a 5-star rating
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="mr-4 mt-1">
                      <Wifi className="h-6 w-6 text-gray-500" />
                    </div>
                    <div>
                      <h3 className="font-medium">Great amenities</h3>
                      <p className="text-sm text-muted-foreground">
                        This place has all the essentials
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Description */}
              <div className="border-b pb-6 mb-6">
                <h2 className="text-xl font-semibold mb-4">About this place</h2>
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                  {product.description}
                </p>
              </div>
              
              {/* Amenities */}
              <div className="border-b pb-6 mb-6">
                <h2 className="text-xl font-semibold mb-4">What this place offers</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {product.amenities.map((amenity, index) => (
                    <div key={index} className="flex items-center">
                      <Check className="h-5 w-5 mr-3 text-marketplace-primary" />
                      <span>{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Booking Card - Right Column */}
            <div>
              <Card className="shadow-lg sticky top-24">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <span className="text-2xl font-bold">${product.price.toFixed(2)}</span>
                      <span className="text-muted-foreground"> / night</span>
                    </div>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 fill-current text-yellow-400 mr-1" />
                      <span className="font-medium">{product.rating}</span>
                      <span className="mx-1 text-muted-foreground">•</span>
                      <span className="text-muted-foreground">{product.reviews} reviews</span>
                    </div>
                  </div>
                  
                  <div className="border rounded-lg mb-4">
                    <div className="grid grid-cols-2 divide-x">
                      <div className="p-3">
                        <div className="text-xs font-medium">CHECK-IN</div>
                        <div className="text-sm">6/5/2025</div>
                      </div>
                      <div className="p-3">
                        <div className="text-xs font-medium">CHECKOUT</div>
                        <div className="text-sm">6/10/2025</div>
                      </div>
                    </div>
                    <div className="border-t p-3">
                      <div className="text-xs font-medium mb-1">GUESTS</div>
                      <select className="w-full text-sm bg-transparent">
                        <option>1 guest</option>
                        <option>2 guests</option>
                        <option>3 guests</option>
                        <option>4 guests</option>
                      </select>
                    </div>
                  </div>
                  
                  <Button 
                    className="w-full bg-marketplace-primary hover:bg-marketplace-primary/90 text-white py-6 mb-4"
                    onClick={handleAddToCart}
                  >
                    Reserve
                  </Button>
                  
                  <div className="text-center text-muted-foreground text-sm">
                    You won't be charged yet
                  </div>
                  
                  <div className="mt-6 space-y-4">
                    <div className="flex justify-between">
                      <span className="underline">${product.price.toFixed(2)} x 5 nights</span>
                      <span>${(product.price * 5).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="underline">Cleaning fee</span>
                      <span>$85.00</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="underline">Service fee</span>
                      <span>$99.00</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between font-semibold">
                      <span>Total before taxes</span>
                      <span>${(product.price * 5 + 85 + 99).toFixed(2)}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
          
          <div className="mt-12">
            <Tabs defaultValue="reviews">
              <TabsList className="w-full max-w-md mx-auto grid grid-cols-2 bg-gray-50">
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
                <TabsTrigger value="location">Location</TabsTrigger>
              </TabsList>
              
              <div className="mt-8">
                <TabsContent value="reviews" className="space-y-4">
                  <h3 className="text-xl font-medium mb-4">Guest Reviews</h3>
                  <div className="space-y-6">
                    <div className="border-b pb-4">
                      <div className="flex items-start">
                        <div className="w-10 h-10 rounded-full bg-gray-200 mr-4 flex items-center justify-center font-medium">
                          J
                        </div>
                        <div>
                          <div className="font-medium">John D.</div>
                          <div className="text-xs text-muted-foreground mb-2">May 2025</div>
                          <p className="text-sm text-gray-700">
                            This place exceeded all my expectations. The location is perfect and the amenities are exactly as described. The host was very responsive and helpful.
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex items-start">
                        <div className="w-10 h-10 rounded-full bg-gray-200 mr-4 flex items-center justify-center font-medium">
                          S
                        </div>
                        <div>
                          <div className="font-medium">Sarah M.</div>
                          <div className="text-xs text-muted-foreground mb-2">April 2025</div>
                          <p className="text-sm text-gray-700">
                            Beautiful property with amazing views. Very clean and comfortable. The host provided excellent recommendations for local attractions and restaurants. Would definitely stay again!
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="location">
                  <h3 className="text-xl font-medium mb-4">Location Information</h3>
                  <div className="rounded-lg overflow-hidden h-80 bg-gray-200 flex items-center justify-center mb-4">
                    <p className="text-gray-500">Map would be displayed here</p>
                  </div>
                  <p className="text-gray-700">
                    {product.location}. This location is known for its excellent access to local amenities, 
                    transportation, and attractions. Guests love the convenient location and nearby dining options.
                  </p>
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
