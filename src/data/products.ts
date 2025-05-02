
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
  // Hotel specific fields
  location: string;
  amenities: string[];
  bedrooms: number;
  bathrooms: number;
  guests: number;
  host: {
    name: string;
    rating: number;
    isSuperhost: boolean;
  };
}

export const products: Product[] = [
  {
    id: "1",
    title: "Modern Loft in Downtown",
    description: "Bright and airy loft in the heart of downtown with incredible city views. This stylish space features floor-to-ceiling windows, a fully equipped kitchen, and modern furnishings. Perfect for a weekend getaway or business trip.",
    price: 129.99,
    images: ["https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80"],
    category: "Apartment",
    featured: true,
    rating: 4.8,
    reviews: 124,
    stock: 1,
    tags: ["downtown", "city view", "modern", "loft"],
    location: "Downtown, New York",
    amenities: ["Wifi", "Kitchen", "Workspace", "Air conditioning", "TV"],
    bedrooms: 1,
    bathrooms: 1,
    guests: 2,
    host: {
      name: "Emily",
      rating: 4.9,
      isSuperhost: true
    }
  },
  {
    id: "2",
    title: "Beachfront Villa with Pool",
    description: "Luxurious beachfront villa with private pool and direct beach access. Enjoy stunning ocean views from the terrace and fall asleep to the sound of waves. Perfect for families or groups looking for a relaxing beach vacation.",
    price: 359.99,
    images: ["https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&q=80"],
    category: "Villa",
    featured: true,
    rating: 4.9,
    reviews: 302,
    stock: 1,
    tags: ["beach", "pool", "ocean view", "luxury"],
    location: "Miami Beach, Florida",
    amenities: ["Pool", "Beach access", "Wifi", "Kitchen", "Free parking"],
    bedrooms: 3,
    bathrooms: 2,
    guests: 6,
    host: {
      name: "Michael",
      rating: 4.8,
      isSuperhost: true
    }
  },
  {
    id: "3",
    title: "Cozy Mountain Cabin",
    description: "Charming cabin nestled in the mountains with a wood-burning fireplace and stunning forest views. Enjoy hiking nearby trails and relaxing on the deck overlooking the wilderness. Perfect for a romantic getaway or peaceful retreat.",
    price: 149.99,
    images: ["https://images.unsplash.com/photo-1518732714860-b62714ce0c59?auto=format&fit=crop&q=80"],
    category: "Cabin",
    featured: false,
    rating: 4.7,
    reviews: 89,
    stock: 1,
    tags: ["mountains", "forest", "fireplace", "cozy"],
    location: "Aspen, Colorado",
    amenities: ["Fireplace", "Hot tub", "Wifi", "Mountain view", "BBQ grill"],
    bedrooms: 2,
    bathrooms: 1,
    guests: 4,
    host: {
      name: "Sarah",
      rating: 4.7,
      isSuperhost: false
    }
  },
  {
    id: "4",
    title: "Historic Townhouse in Old Town",
    description: "Beautiful restored townhouse in the historic district with original features and modern comforts. Walk to local attractions, restaurants, and shops. Experience the charm of old architecture with all the modern amenities.",
    price: 179.99,
    images: ["https://images.unsplash.com/photo-1501183638710-841dd1904471?auto=format&fit=crop&q=80"],
    category: "Townhouse",
    featured: true,
    rating: 4.6,
    reviews: 178,
    stock: 1,
    tags: ["historic", "old town", "central", "charming"],
    location: "Charleston, South Carolina",
    amenities: ["Wifi", "Kitchen", "Washer", "Air conditioning", "Patio"],
    bedrooms: 2,
    bathrooms: 2,
    guests: 4,
    host: {
      name: "Robert",
      rating: 4.9,
      isSuperhost: true
    }
  },
  {
    id: "5",
    title: "Minimalist Studio in Arts District",
    description: "Modern studio apartment in the vibrant arts district. Clean lines, thoughtful design, and artistic touches throughout. Close to galleries, cafes, and the city's best restaurants. Ideal for creative travelers and art enthusiasts.",
    price: 99.99,
    images: ["https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80"],
    category: "Apartment",
    featured: false,
    rating: 4.8,
    reviews: 56,
    stock: 1,
    tags: ["studio", "arts district", "modern", "minimalist"],
    location: "Portland, Oregon",
    amenities: ["Wifi", "Kitchen", "Workspace", "Smart TV", "Bike storage"],
    bedrooms: 1,
    bathrooms: 1,
    guests: 2,
    host: {
      name: "Alex",
      rating: 4.6,
      isSuperhost: false
    }
  },
  {
    id: "6",
    title: "Luxury Penthouse with City Views",
    description: "Stunning penthouse apartment with panoramic city views and upscale amenities. Features include a private terrace, gourmet kitchen, and floor-to-ceiling windows. Located in the heart of the financial district, close to everything.",
    price: 299.99,
    images: ["https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&q=80"],
    category: "Penthouse",
    featured: true,
    rating: 4.9,
    reviews: 211,
    stock: 1,
    tags: ["luxury", "penthouse", "city view", "modern"],
    location: "Chicago, Illinois",
    amenities: ["Wifi", "Full kitchen", "Gym access", "Doorman", "Heated pool"],
    bedrooms: 3,
    bathrooms: 2,
    guests: 6,
    host: {
      name: "Jessica",
      rating: 5.0,
      isSuperhost: true
    }
  },
  {
    id: "7",
    title: "Rustic Farmhouse Retreat",
    description: "Charming farmhouse on 5 acres of private land with a pond and walking trails. Fully renovated interior with rustic touches and modern conveniences. Enjoy country living just 30 minutes from downtown. Perfect for families or friends.",
    price: 189.99,
    images: ["https://images.unsplash.com/photo-1438029071396-1e831a7fa6d8?auto=format&fit=crop&q=80"],
    category: "Farmhouse",
    featured: false,
    rating: 4.7,
    reviews: 87,
    stock: 1,
    tags: ["rustic", "farmhouse", "country", "pond"],
    location: "Nashville, Tennessee",
    amenities: ["Wifi", "Full kitchen", "Fireplace", "BBQ", "Pond access"],
    bedrooms: 3,
    bathrooms: 2,
    guests: 8,
    host: {
      name: "Daniel",
      rating: 4.8,
      isSuperhost: true
    }
  },
  {
    id: "8",
    title: "Oceanview Condo in Resort",
    description: "Beautiful oceanview condo in a luxury resort with access to pools, beach, and restaurants. Enjoy sunset views from your private balcony and all the amenities of a high-end resort. Perfect for couples or small families looking for a relaxing beach vacation.",
    price: 219.99,
    images: ["https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80"],
    category: "Condo",
    featured: false,
    rating: 4.6,
    reviews: 64,
    stock: 1,
    tags: ["oceanview", "resort", "beach", "pool"],
    location: "Maui, Hawaii",
    amenities: ["Wifi", "Kitchen", "Pool access", "Beach access", "Air conditioning"],
    bedrooms: 2,
    bathrooms: 2,
    guests: 4,
    host: {
      name: "Leilani",
      rating: 4.9,
      isSuperhost: true
    }
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
