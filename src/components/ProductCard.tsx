
import { Link } from "react-router-dom";
import { Star } from "lucide-react";
import { Product } from "@/data/products";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/useCart";
import { Badge } from "@/components/ui/badge";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product.id, 1);
  };

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
      <Link to={`/product/${product.id}`}>
        <div className="relative w-full pb-[75%] overflow-hidden">
          <img 
            src={product.images[0]} 
            alt={product.title}
            className="absolute top-0 left-0 w-full h-full object-cover hover:scale-105 transition-transform duration-500"
          />
          {product.featured && (
            <div className="absolute top-2 left-2 bg-marketplace-primary text-white text-xs font-medium px-2 py-1 rounded">
              Featured
            </div>
          )}
        </div>
      </Link>

      <div className="p-4">
        <div className="flex items-start justify-between">
          <div>
            <Link to={`/product/${product.id}`} className="block">
              <h3 className="font-medium text-lg leading-tight hover:text-marketplace-primary transition">
                {product.title}
              </h3>
            </Link>
            <p className="text-sm text-muted-foreground mt-1">{product.category}</p>
          </div>
          <p className="font-semibold text-marketplace-dark">${product.price.toFixed(2)}</p>
        </div>

        <div className="flex items-center mt-2">
          <div className="flex items-center">
            <Star className="h-4 w-4 fill-current text-yellow-400 mr-1" />
            <span className="text-sm font-medium">{product.rating}</span>
          </div>
          <span className="mx-2 text-muted-foreground text-sm">•</span>
          <span className="text-sm text-muted-foreground">{product.reviews} reviews</span>
        </div>

        <div className="mt-4 flex space-x-2">
          <Button 
            className="w-full bg-marketplace-primary hover:bg-marketplace-primary/90 text-white"
            onClick={handleAddToCart}
          >
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
