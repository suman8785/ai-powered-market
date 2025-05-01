
import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, Search, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  return (
    <header className="border-b sticky top-0 bg-white z-50">
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        <Link to="/" className="font-semibold text-2xl text-marketplace-primary flex items-center">
          <span className="mr-2">●</span>
          AIMarket
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link to="/" className="text-marketplace-dark hover:text-marketplace-primary transition">
            Home
          </Link>
          <Link to="/products" className="text-marketplace-dark hover:text-marketplace-primary transition">
            Products
          </Link>
          <Link to="/support" className="text-marketplace-dark hover:text-marketplace-primary transition">
            AI Support
          </Link>
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon">
            <Search className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <ShoppingCart className="h-5 w-5" />
            <span className="absolute top-1 right-1 bg-marketplace-primary text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
              0
            </span>
          </Button>
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden border-t animate-fade-in">
          <nav className="container mx-auto py-4 flex flex-col space-y-4 px-4">
            <Link 
              to="/" 
              className="text-marketplace-dark hover:text-marketplace-primary transition px-2 py-1"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/products" 
              className="text-marketplace-dark hover:text-marketplace-primary transition px-2 py-1"
              onClick={() => setIsMenuOpen(false)}
            >
              Products
            </Link>
            <Link 
              to="/support" 
              className="text-marketplace-dark hover:text-marketplace-primary transition px-2 py-1"
              onClick={() => setIsMenuOpen(false)}
            >
              AI Support
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
