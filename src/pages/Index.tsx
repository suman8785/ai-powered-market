
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SearchBar from "@/components/SearchBar";
import ProductCard from "@/components/ProductCard";
import { getFeaturedProducts } from "@/data/products";
import { Button } from "@/components/ui/button";

const Index = () => {
  const featuredProducts = getFeaturedProducts();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="search-container relative py-20 md:py-32 flex items-center justify-center">
        <div className="container mx-auto text-center">
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Find Amazing Products with AI
          </h1>
          <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Our AI assistant helps you discover exactly what you're looking for
          </p>
          <SearchBar className="mx-auto" />
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16">
        <div className="container mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl md:text-3xl font-semibold">Featured Products</h2>
            <Link to="/products">
              <Button variant="outline">View All</Button>
            </Link>
          </div>
          <div className="product-grid">
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-marketplace-light">
        <div className="container mx-auto">
          <h2 className="text-2xl md:text-3xl font-semibold mb-8 text-center">Shop by Category</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {["Electronics", "Home Decor", "Kitchen", "Accessories"].map((category) => (
              <Link 
                key={category} 
                to={`/products?category=${encodeURIComponent(category)}`}
                className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow"
              >
                <h3 className="font-medium text-lg mb-2">{category}</h3>
                <p className="text-sm text-muted-foreground">
                  Explore our {category.toLowerCase()} collection
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* AI Support Promo */}
      <section className="py-16">
        <div className="container mx-auto">
          <div className="bg-marketplace-primary/10 rounded-lg p-8 md:p-12">
            <div className="flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-8">
              <div className="md:w-2/3">
                <h2 className="text-2xl md:text-3xl font-semibold mb-4">Need Help? Ask Our AI Assistant</h2>
                <p className="text-lg mb-6">
                  Get instant answers about products, orders, shipping, returns, and more!
                </p>
                <Link to="/support">
                  <Button className="bg-marketplace-primary hover:bg-marketplace-primary/90">
                    Chat with AI Support
                  </Button>
                </Link>
              </div>
              <div className="md:w-1/3 flex justify-center">
                <div className="relative w-48 h-48 flex items-center justify-center rounded-full bg-white/80 shadow-lg">
                  <span className="text-6xl">🤖</span>
                  <div className="absolute -top-2 -right-2 rounded-full bg-marketplace-primary w-8 h-8 flex items-center justify-center text-white text-sm font-bold">
                    AI
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
