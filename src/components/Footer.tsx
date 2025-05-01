
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-marketplace-light mt-16 py-12">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-semibold text-lg mb-4">AIMarket</h3>
            <p className="text-sm text-marketplace-dark/80">
              AI-powered marketplace with smart search and intelligent customer support.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Shop</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/products" className="text-sm text-marketplace-dark/80 hover:text-marketplace-primary">
                  All Products
                </Link>
              </li>
              <li>
                <Link to="/products?category=Electronics" className="text-sm text-marketplace-dark/80 hover:text-marketplace-primary">
                  Electronics
                </Link>
              </li>
              <li>
                <Link to="/products?category=Home+Decor" className="text-sm text-marketplace-dark/80 hover:text-marketplace-primary">
                  Home Decor
                </Link>
              </li>
              <li>
                <Link to="/products?category=Kitchen" className="text-sm text-marketplace-dark/80 hover:text-marketplace-primary">
                  Kitchen
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/support" className="text-sm text-marketplace-dark/80 hover:text-marketplace-primary">
                  AI Support
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-sm text-marketplace-dark/80 hover:text-marketplace-primary">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/shipping" className="text-sm text-marketplace-dark/80 hover:text-marketplace-primary">
                  Shipping Info
                </Link>
              </li>
              <li>
                <Link to="/returns" className="text-sm text-marketplace-dark/80 hover:text-marketplace-primary">
                  Returns &amp; Exchanges
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Contact</h3>
            <ul className="space-y-2">
              <li className="text-sm text-marketplace-dark/80">
                Email: support@aimarket.demo
              </li>
              <li className="text-sm text-marketplace-dark/80">
                Phone: (555) 123-4567
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-marketplace-dark/70">
            © {new Date().getFullYear()} AIMarket. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="/terms" className="text-sm text-marketplace-dark/70 hover:text-marketplace-primary">
              Terms of Service
            </Link>
            <Link to="/privacy" className="text-sm text-marketplace-dark/70 hover:text-marketplace-primary">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
