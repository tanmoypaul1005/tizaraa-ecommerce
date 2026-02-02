export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  shortDescription: string;
  basePrice: number;
  compareAtPrice?: number;
  rating: number;
  reviewCount: number;
  category: string;
  tags: string[];
  inStock: boolean;
  stockQuantity: number;
  images: ProductImage[];
  variants: ProductVariants;
  specifications: Specification[];
  createdAt?: string;
  popularity?: number;
}

export interface ProductImage {
  id: string;
  url: string;
  alt: string;
  type: 'image' | 'video';
}

export interface ProductVariants {
  colors: Variant[];
  materials: Variant[];
  sizes: Variant[];
}

export interface Variant {
  id: string;
  name: string;
  value: string;
  available: boolean;
  hex?: string;
  priceModifier?: number;
}

export interface Specification {
  label: string;
  value: string;
}

export const MOCK_PRODUCTS: Product[] = [
  {
    id: '01',
    name: 'Premium Customizable T-Shirt',
    slug: 'premium-tshirt',
    shortDescription: 'Crafted from the finest organic cotton with superior breathability and comfort.',
    description: 'Experience ultimate comfort with our premium customizable t-shirt. Made from 100% organic cotton, this versatile piece offers exceptional breathability and durability. Perfect for any occasion, from casual outings to everyday wear. Customize colors, materials, and sizes to create your perfect fit.',
    basePrice: 79.99,
    compareAtPrice: 99.99,
    rating: 4.8,
    reviewCount: 1247,
    category: 'Apparel',
    tags: ['premium', 'organic', 'customizable', 'bestseller'],
    inStock: true,
    stockQuantity: 156,
    images: [
      { id: '1', url: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&h=800&fit=crop', alt: 'T-Shirt front view', type: 'image' },
      { id: '2', url: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=800&h=800&fit=crop', alt: 'T-Shirt back view', type: 'image' },
      { id: '3', url: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&h=800&fit=crop', alt: 'T-Shirt detail', type: 'image' },
      { id: '4', url: 'https://images.unsplash.com/photo-1562157873-818bc0726f68?w=800&h=800&fit=crop', alt: 'T-Shirt lifestyle', type: 'image' },
    ],
    variants: {
      colors: [
        { id: 'black', name: 'Midnight Black', value: 'black', hex: '#000000', available: true },
        { id: 'white', name: 'Pure White', value: 'white', hex: '#FFFFFF', available: true },
        { id: 'navy', name: 'Navy Blue', value: 'navy', hex: '#1E3A8A', available: true },
        { id: 'gray', name: 'Heather Gray', value: 'gray', hex: '#9CA3AF', available: false },
        { id: 'red', name: 'Crimson Red', value: 'red', hex: '#DC2626', available: true },
      ],
      materials: [
        { id: 'cotton', name: '100% Organic Cotton', value: 'cotton', available: true, priceModifier: 0 },
        { id: 'blend', name: 'Cotton Blend', value: 'blend', available: true, priceModifier: 10 },
        { id: 'performance', name: 'Performance Tech', value: 'performance', available: false, priceModifier: 25 },
      ],
      sizes: [
        { id: 'xs', name: 'Extra Small', value: 'XS', available: true, priceModifier: 0 },
        { id: 's', name: 'Small', value: 'S', available: true, priceModifier: 10  },
        { id: 'm', name: 'Medium', value: 'M', available: true, priceModifier: 12  },
        { id: 'l', name: 'Large', value: 'L', available: true, priceModifier: 14  },
        { id: 'xl', name: 'Extra Large', value: 'XL', available: false, priceModifier: 18  },
      ],
    },
    specifications: [
      { label: 'Material', value: 'Premium Cotton Blend' },
      { label: 'Weight', value: '180 GSM' },
      { label: 'Fit', value: 'Regular Fit' },
      { label: 'Care', value: 'Machine Washable' },
    ],
  },
  {
    id: '02',
    name: 'Designer Custom Hoodie',
    slug: 'designer-hoodie',
    shortDescription: 'Premium heavyweight hoodie with customizable design options.',
    description: 'Stay warm and stylish with our designer custom hoodie. Features premium heavyweight fabric, adjustable drawstrings, and spacious kangaroo pocket. Perfect for layering or standalone wear.',
    basePrice: 129.99,
    compareAtPrice: 159.99,
    rating: 4.9,
    reviewCount: 892,
    category: 'Apparel',
    tags: ['premium', 'winter', 'customizable'],
    inStock: true,
    stockQuantity: 78,
    images: [
      { id: '1', url: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&h=800&fit=crop', alt: 'Hoodie front', type: 'image' },
      { id: '2', url: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=800&h=800&fit=crop', alt: 'Hoodie back', type: 'image' },
      { id: '3', url: 'https://images.unsplash.com/photo-1620799139834-6b8f844fbe61?w=800&h=800&fit=crop', alt: 'Hoodie detail', type: 'image' },
    ],
    variants: {
      colors: [
        { id: 'black', name: 'Black', value: 'black', hex: '#000000', available: true },
        { id: 'gray', name: 'Gray', value: 'gray', hex: '#6B7280', available: true },
        { id: 'navy', name: 'Navy', value: 'navy', hex: '#1E3A8A', available: true },
      ],
      materials: [
        { id: 'cotton', name: '80/20 Cotton Blend', value: 'cotton', available: true },
        { id: 'fleece', name: 'Premium Fleece', value: 'fleece', available: true, priceModifier: 15 },
      ],
      sizes: [
        { id: 's', name: 'Small', value: 'S', available: true },
        { id: 'm', name: 'Medium', value: 'M', available: true },
        { id: 'l', name: 'Large', value: 'L', available: true },
        { id: 'xl', name: 'Extra Large', value: 'XL', available: true },
      ],
    },
    specifications: [
      { label: 'Material', value: '80% Cotton, 20% Polyester' },
      { label: 'Weight', value: '400 GSM' },
      { label: 'Features', value: 'Adjustable Hood, Kangaroo Pocket' },
    ],
  },
  {
    id: '03',
    name: 'Personalized Phone Case',
    slug: 'phone-case',
    shortDescription: 'Durable custom phone case with premium protection.',
    description: 'Protect your device in style with our personalized phone case. Features military-grade drop protection, wireless charging compatibility, and customizable designs.',
    basePrice: 34.99,
    rating: 4.7,
    reviewCount: 2341,
    category: 'Accessories',
    tags: ['tech', 'protective', 'customizable'],
    inStock: true,
    stockQuantity: 234,
    images: [
      { id: '1', url: 'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=800&h=800&fit=crop', alt: 'Phone case', type: 'image' },
      { id: '2', url: 'https://images.unsplash.com/photo-1556656793-08538906a9f8?w=800&h=800&fit=crop', alt: 'Case on phone', type: 'image' },
    ],
    variants: {
      colors: [
        { id: 'clear', name: 'Clear', value: 'clear', hex: '#FFFFFF', available: true },
        { id: 'black', name: 'Black', value: 'black', hex: '#000000', available: true },
        { id: 'blue', name: 'Blue', value: 'blue', hex: '#3B82F6', available: true },
      ],
      materials: [
        { id: 'silicone', name: 'Silicone', value: 'silicone', available: true },
        { id: 'hard', name: 'Hard Case', value: 'hard', available: true, priceModifier: 5 },
      ],
      sizes: [
        { id: 'iphone14', name: 'iPhone 14', value: 'iPhone 14', available: true },
        { id: 'iphone15', name: 'iPhone 15', value: 'iPhone 15', available: true },
        { id: 'samsung', name: 'Samsung S24', value: 'Samsung', available: true },
      ],
    },
    specifications: [
      { label: 'Protection', value: 'Military Grade Drop Protection' },
      { label: 'Compatibility', value: 'Wireless Charging' },
    ],
  },
  {
    id: '04',
    name: 'Custom Baseball Cap',
    slug: 'baseball-cap',
    shortDescription: 'Classic baseball cap with embroidered customization.',
    description: 'Top off your look with our custom baseball cap. Features adjustable strap, breathable fabric, and high-quality embroidered personalization options.',
    basePrice: 39.99,
    rating: 4.6,
    reviewCount: 567,
    category: 'Accessories',
    tags: ['headwear', 'casual', 'customizable'],
    inStock: true,
    stockQuantity: 145,
    images: [
      { id: '1', url: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=800&h=800&fit=crop', alt: 'Baseball cap', type: 'image' },
      { id: '2', url: 'https://images.unsplash.com/photo-1575428652377-a2d80e2277fc?w=800&h=800&fit=crop', alt: 'Cap side view', type: 'image' },
    ],
    variants: {
      colors: [
        { id: 'black', name: 'Black', value: 'black', hex: '#000000', available: true },
        { id: 'white', name: 'White', value: 'white', hex: '#FFFFFF', available: true },
        { id: 'navy', name: 'Navy', value: 'navy', hex: '#1E3A8A', available: true },
        { id: 'red', name: 'Red', value: 'red', hex: '#DC2626', available: true },
      ],
      materials: [
        { id: 'cotton', name: '100% Cotton', value: 'cotton', available: true },
        { id: 'polyester', name: 'Performance Polyester', value: 'polyester', available: true, priceModifier: 5 },
      ],
      sizes: [
        { id: 'adjustable', name: 'Adjustable', value: 'One Size', available: true },
      ],
    },
    specifications: [
      { label: 'Style', value: 'Baseball Cap' },
      { label: 'Closure', value: 'Adjustable Strap' },
    ],
  },
  {
    id: '05',
    name: 'Premium Water Bottle',
    slug: 'water-bottle',
    shortDescription: 'Insulated stainless steel bottle with custom engraving.',
    description: 'Stay hydrated in style with our premium insulated water bottle. Keeps drinks cold for 24 hours or hot for 12 hours. Features leak-proof lid and custom engraving options.',
    basePrice: 44.99,
    rating: 4.9,
    reviewCount: 1523,
    category: 'Drinkware',
    tags: ['eco-friendly', 'insulated', 'customizable'],
    inStock: true,
    stockQuantity: 89,
    images: [
      { id: '1', url: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=800&h=800&fit=crop', alt: 'Water bottle', type: 'image' },
      { id: '2', url: 'https://images.unsplash.com/photo-1523362628745-0c100150b504?w=800&h=800&fit=crop', alt: 'Bottle detail', type: 'image' },
    ],
    variants: {
      colors: [
        { id: 'silver', name: 'Stainless Steel', value: 'silver', hex: '#C0C0C0', available: true },
        { id: 'black', name: 'Matte Black', value: 'black', hex: '#000000', available: true },
        { id: 'blue', name: 'Ocean Blue', value: 'blue', hex: '#3B82F6', available: true },
        { id: 'pink', name: 'Rose Gold', value: 'pink', hex: '#F472B6', available: true },
      ],
      materials: [
        { id: 'steel', name: 'Stainless Steel', value: 'steel', available: true },
      ],
      sizes: [
        { id: '500ml', name: '500ml', value: '500ml', available: true },
        { id: '750ml', name: '750ml', value: '750ml', available: true, priceModifier: 10 },
        { id: '1000ml', name: '1000ml', value: '1L', available: true, priceModifier: 15 },
      ],
    },
    specifications: [
      { label: 'Capacity', value: '500ml - 1000ml' },
      { label: 'Insulation', value: '24h Cold / 12h Hot' },
      { label: 'Material', value: 'Double-Wall Stainless Steel' },
    ],
  },
  {
    id: '06',
    name: 'Custom Tote Bag',
    slug: 'tote-bag',
    shortDescription: 'Eco-friendly canvas tote with personalized print.',
    description: 'Carry your essentials in our eco-friendly custom tote bag. Made from sustainable cotton canvas with reinforced handles and customizable designs.',
    basePrice: 29.99,
    rating: 4.5,
    reviewCount: 834,
    category: 'Bags',
    tags: ['eco-friendly', 'reusable', 'customizable'],
    inStock: true,
    stockQuantity: 167,
    images: [
      { id: '1', url: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=800&h=800&fit=crop', alt: 'Tote bag', type: 'image' },
      { id: '2', url: 'https://images.unsplash.com/photo-1573867639040-6dd25fa5f597?w=800&h=800&fit=crop', alt: 'Bag with items', type: 'image' },
    ],
    variants: {
      colors: [
        { id: 'natural', name: 'Natural', value: 'natural', hex: '#F5F5DC', available: true },
        { id: 'black', name: 'Black', value: 'black', hex: '#000000', available: true },
        { id: 'navy', name: 'Navy', value: 'navy', hex: '#1E3A8A', available: true },
      ],
      materials: [
        { id: 'canvas', name: '100% Cotton Canvas', value: 'canvas', available: true },
        { id: 'organic', name: 'Organic Cotton', value: 'organic', available: true, priceModifier: 8 },
      ],
      sizes: [
        { id: 'medium', name: 'Medium', value: 'M', available: true },
        { id: 'large', name: 'Large', value: 'L', available: true, priceModifier: 5 },
      ],
    },
    specifications: [
      { label: 'Material', value: '100% Cotton Canvas' },
      { label: 'Dimensions', value: '38cm x 42cm' },
      { label: 'Handle', value: 'Reinforced Cotton' },
    ],
  },
];

// Helper function to get product by ID
export const getProductById = (id: string): Product | undefined => {
  return MOCK_PRODUCTS.find(product => product.id === id);
};

// Helper function to get featured products
export const getFeaturedProducts = (limit: number = 6): Product[] => {
  return MOCK_PRODUCTS.slice(0, limit);
};

// Helper function to get products by category
export const getProductsByCategory = (category: string): Product[] => {
  return MOCK_PRODUCTS.filter(product => product.category === category);
};

// Helper function to sort products
export const sortProducts = (products: Product[], sortBy: string): Product[] => {
  const sorted = [...products];
  
  switch (sortBy) {
    case 'price-low-high':
      return sorted.sort((a, b) => a.basePrice - b.basePrice);
    
    case 'price-high-low':
      return sorted.sort((a, b) => b.basePrice - a.basePrice);
    
    case 'newest':
      return sorted.sort((a, b) => {
        const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
        const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
        return dateB - dateA;
      });
    
    case 'best-rated':
      return sorted.sort((a, b) => {
        if (b.rating === a.rating) {
          return b.reviewCount - a.reviewCount;
        }
        return b.rating - a.rating;
      });
    
    case 'most-popular':
      return sorted.sort((a, b) => {
        const popularityA = (a.popularity || 0) + (a.reviewCount * 0.5);
        const popularityB = (b.popularity || 0) + (b.reviewCount * 0.5);
        return popularityB - popularityA;
      });
    
    case 'featured':
    default:
      return sorted;
  }
};
