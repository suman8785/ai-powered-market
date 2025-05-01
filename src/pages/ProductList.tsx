
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import SearchBar from "@/components/SearchBar";
import { searchProducts, products as allProducts } from "@/data/products";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Separator } from "@/components/ui/separator";

const ProductList = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [displayedProducts, setDisplayedProducts] = useState(allProducts);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [priceRange, setPriceRange] = useState([0, 200]);

  // Get all unique categories
  const categories = [...new Set(allProducts.map(product => product.category))];

  // Effect to filter products based on URL search params
  useEffect(() => {
    const searchQuery = searchParams.get("search");
    const categoryFilter = searchParams.get("category");
    
    let filtered = allProducts;
    
    if (searchQuery) {
      filtered = searchProducts(searchQuery);
      setSelectedCategory("");
    } else if (categoryFilter) {
      filtered = allProducts.filter(p => p.category === categoryFilter);
      setSelectedCategory(categoryFilter);
    }
    
    // Apply price filter
    filtered = filtered.filter(
      p => p.price >= priceRange[0] && p.price <= priceRange[1]
    );
    
    setDisplayedProducts(filtered);
  }, [searchParams, priceRange]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    if (category) {
      searchParams.set("category", category);
      searchParams.delete("search");
    } else {
      searchParams.delete("category");
    }
    setSearchParams(searchParams);
  };

  const handleSearch = (query: string) => {
    setSelectedCategory("");
    if (query) {
      searchParams.set("search", query);
      searchParams.delete("category");
    } else {
      searchParams.delete("search");
    }
    setSearchParams(searchParams);
  };

  const clearFilters = () => {
    setSearchParams(new URLSearchParams());
    setSelectedCategory("");
    setPriceRange([0, 200]);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        <div className="container mx-auto py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-4">
              {searchParams.get("search") 
                ? `Search Results: "${searchParams.get("search")}"` 
                : searchParams.get("category") 
                  ? `${searchParams.get("category")}` 
                  : "All Products"}
            </h1>
            <SearchBar onSearch={handleSearch} className="max-w-2xl" />
          </div>
          
          <div className="flex flex-col md:flex-row gap-8">
            {/* Filters Sidebar */}
            <div className="w-full md:w-1/4 rounded-lg border bg-card p-4">
              <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-medium text-lg">Filters</h3>
                  <Button variant="ghost" size="sm" onClick={clearFilters}>
                    Clear All
                  </Button>
                </div>
                
                <div className="mb-6">
                  <h4 className="font-medium mb-2">Categories</h4>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <Checkbox 
                        id="all" 
                        checked={selectedCategory === ""} 
                        onCheckedChange={() => handleCategoryChange("")}
                      />
                      <Label htmlFor="all" className="ml-2 cursor-pointer">
                        All Categories
                      </Label>
                    </div>
                    
                    {categories.map(category => (
                      <div key={category} className="flex items-center">
                        <Checkbox 
                          id={category} 
                          checked={selectedCategory === category} 
                          onCheckedChange={() => handleCategoryChange(category)}
                        />
                        <Label htmlFor={category} className="ml-2 cursor-pointer">
                          {category}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
                
                <Separator className="my-4" />
                
                <div>
                  <h4 className="font-medium mb-4">Price Range</h4>
                  <Slider
                    defaultValue={[0, 200]}
                    min={0}
                    max={200}
                    step={10}
                    value={priceRange}
                    onValueChange={setPriceRange}
                  />
                  <div className="flex justify-between mt-2">
                    <span>${priceRange[0]}</span>
                    <span>${priceRange[1]}+</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Products Grid */}
            <div className="w-full md:w-3/4">
              {displayedProducts.length > 0 ? (
                <div className="product-grid">
                  {displayedProducts.map(product => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <h3 className="text-xl font-medium mb-2">No products found</h3>
                  <p className="text-muted-foreground mb-6">
                    Try adjusting your search or filter criteria
                  </p>
                  <Button onClick={clearFilters}>Clear Filters</Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ProductList;
