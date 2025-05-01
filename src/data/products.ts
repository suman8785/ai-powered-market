
export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  images: string[];
  category: string;
  featured: boolean;
  rating: number;
  reviews: number;
  stock: number;
  tags: string[];
}

export const products: Product[] = [
  {
    id: "1",
    title: "Modern Minimalist Desk Lamp",
    description: "Sleek, adjustable desk lamp with touch controls and multiple brightness settings. Perfect for your home office or bedside table.",
    price: 59.99,
    images: ["https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&q=80"],
    category: "Home Decor",
    featured: true,
    rating: 4.8,
    reviews: 124,
    stock: 45,
    tags: ["lighting", "desk", "office", "modern", "minimalist"]
  },
  {
    id: "2",
    title: "Wireless Noise-Canceling Headphones",
    description: "Premium wireless headphones with active noise cancellation, 30-hour battery life, and comfortable over-ear design.",
    price: 199.99,
    images: ["https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80"],
    category: "Electronics",
    featured: true,
    rating: 4.9,
    reviews: 302,
    stock: 18,
    tags: ["audio", "wireless", "headphones", "noise-canceling"]
  },
  {
    id: "3",
    title: "Organic Cotton Throw Blanket",
    description: "Soft, eco-friendly throw blanket made from 100% organic cotton. Available in multiple colors to match any decor.",
    price: 49.99,
    images: ["https://images.unsplash.com/photo-1462927114214-6956d2fddd4e?auto=format&fit=crop&q=80"],
    category: "Home Decor",
    featured: false,
    rating: 4.7,
    reviews: 89,
    stock: 32,
    tags: ["blanket", "cotton", "organic", "home", "soft"]
  },
  {
    id: "4",
    title: "Portable Bluetooth Speaker",
    description: "Waterproof, rugged Bluetooth speaker with 24-hour battery life and crisp, clear sound quality.",
    price: 79.99,
    images: ["https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&q=80"],
    category: "Electronics",
    featured: true,
    rating: 4.6,
    reviews: 178,
    stock: 27,
    tags: ["speaker", "bluetooth", "portable", "waterproof", "audio"]
  },
  {
    id: "5",
    title: "Handcrafted Ceramic Mug Set",
    description: "Set of 4 handmade ceramic mugs, each with unique glazing patterns. Microwave and dishwasher safe.",
    price: 39.99,
    images: ["https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?auto=format&fit=crop&q=80"],
    category: "Kitchen",
    featured: false,
    rating: 4.8,
    reviews: 56,
    stock: 15,
    tags: ["mugs", "ceramic", "handcrafted", "kitchen", "coffee"]
  },
  {
    id: "6",
    title: "Smart Fitness Tracker",
    description: "Comprehensive fitness tracker with heart rate monitoring, sleep tracking, and 7-day battery life.",
    price: 129.99,
    images: ["https://images.unsplash.com/photo-1575311373937-040b8e97df37?auto=format&fit=crop&q=80"],
    category: "Fitness",
    featured: true,
    rating: 4.5,
    reviews: 211,
    stock: 23,
    tags: ["fitness", "tracker", "smartwatch", "health", "exercise"]
  },
  {
    id: "7",
    title: "Natural Bamboo Cutting Board",
    description: "Sustainable bamboo cutting board with juice groove and handles. Durable and knife-friendly.",
    price: 34.99,
    images: ["https://images.unsplash.com/photo-1590794056226-79ef3a8147e1?auto=format&fit=crop&q=80"],
    category: "Kitchen",
    featured: false,
    rating: 4.7,
    reviews: 87,
    stock: 41,
    tags: ["bamboo", "cutting board", "kitchen", "sustainable", "eco-friendly"]
  },
  {
    id: "8",
    title: "Leather Laptop Sleeve",
    description: "Genuine leather laptop sleeve with soft microfiber interior. Fits laptops up to 15 inches.",
    price: 49.99,
    images: ["https://images.unsplash.com/photo-1603899968034-1a55f783a927?auto=format&fit=crop&q=80"],
    category: "Accessories",
    featured: false,
    rating: 4.6,
    reviews: 64,
    stock: 29,
    tags: ["leather", "laptop", "sleeve", "accessories", "work"]
  }
];

export function getProductById(id: string): Product | undefined {
  return products.find(product => product.id === id);
}

export function getProductsByCategory(category: string): Product[] {
  return products.filter(product => product.category === category);
}

export function getFeaturedProducts(): Product[] {
  return products.filter(product => product.featured);
}

export function searchProducts(query: string): Product[] {
  const normalizedQuery = query.toLowerCase().trim();
  return products.filter(product => 
    product.title.toLowerCase().includes(normalizedQuery) ||
    product.description.toLowerCase().includes(normalizedQuery) ||
    product.category.toLowerCase().includes(normalizedQuery) ||
    product.tags.some(tag => tag.toLowerCase().includes(normalizedQuery))
  );
}
