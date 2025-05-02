
import { Link } from "react-router-dom";
import { Star, MapPin } from "lucide-react";
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
        <div className="relative w-full pb-[66%] overflow-hidden">
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
            <div className="flex items-center text-sm text-muted-foreground mb-1">
              <MapPin className="h-3 w-3 mr-1" />
              {product.location}
            </div>
            <Link to={`/product/${product.id}`} className="block">
              <h3 className="font-medium text-lg leading-tight hover:text-marketplace-primary transition">
                {product.title}
              </h3>
            </Link>
            <div className="text-sm text-muted-foreground mt-1">
              <span>{product.bedrooms} bedroom{product.bedrooms !== 1 ? 's' : ''}</span>
              <span className="mx-1">•</span>
              <span>{product.bathrooms} bath{product.bathrooms !== 1 ? 's' : ''}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center">
            <Star className="h-4 w-4 fill-current text-yellow-400 mr-1" />
            <span className="text-sm font-medium">{product.rating}</span>
            <span className="mx-1 text-muted-foreground text-sm">•</span>
            <span className="text-sm text-muted-foreground">{product.reviews} reviews</span>
          </div>
          <div>
            {product.host.isSuperhost && (
              <Badge variant="outline" className="text-xs">Superhost</Badge>
            )}
          </div>
        </div>

        <div className="mt-2 flex items-center justify-between">
          <div className="font-semibold text-marketplace-dark">${product.price.toFixed(2)} <span className="text-muted-foreground font-normal text-sm">/ night</span></div>
          <Button 
            variant="ghost"
            size="sm"
            className="hover:bg-marketplace-primary/10 text-marketplace-primary"
            onClick={handleAddToCart}
          >
            Save
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
