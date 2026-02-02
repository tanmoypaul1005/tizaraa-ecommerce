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
        { id: 's', name: 'Small', value: 'S', available: true, priceModifier: 0 },
        { id: 'm', name: 'Medium', value: 'M', available: true, priceModifier: 10 },
        { id: 'l', name: 'Large', value: 'L', available: true, priceModifier: 20 },
        { id: 'xl', name: 'Extra Large', value: 'XL', available: true, priceModifier: 30 },
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
        { id: 'iphone14', name: 'iPhone 14', value: 'iPhone 14', available: true , priceModifier: 0 },
        { id: 'iphone15', name: 'iPhone 15', value: 'iPhone 15', available: true, priceModifier: 20 },
        { id: 'samsung', name: 'Samsung S24', value: 'Samsung', available: true, priceModifier: 35 },
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
        { id: '500ml', name: '500ml', value: '500ml', available: true , priceModifier: 0},
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
        { id: 'organic', name: 'Organic Cotton', value: 'organic', available: true, priceModifier: 18 },
      ],
      sizes: [
        { id: 'medium', name: 'Medium', value: 'M', available: true },
        { id: 'large', name: 'Large', value: 'L', available: true, priceModifier: 10 },
      ],
    },
    specifications: [
      { label: 'Material', value: '100% Cotton Canvas' },
      { label: 'Dimensions', value: '38cm x 42cm' },
      { label: 'Handle', value: 'Reinforced Cotton' },
    ],
  },
  {
    id: '06',
    name: 'Wireless Noise-Cancelling Headphones',
    slug: 'wireless-headphones',
    shortDescription: 'Premium sound quality with active noise cancellation technology.',
    description: 'Immerse yourself in crystal-clear audio with our wireless noise-cancelling headphones. Featuring advanced ANC technology, 40-hour battery life, and premium comfort padding. Perfect for travel, work, or relaxation.',
    basePrice: 249.99,
    compareAtPrice: 349.99,
    rating: 4.9,
    reviewCount: 892,
    category: 'Electronics',
    tags: ['audio', 'wireless', 'premium', 'bestseller'],
    inStock: true,
    stockQuantity: 78,
    images: [
      { id: '1', url: 'https://images.unsplash.com/photo-1545127398-14699f92334b?w=800&h=800&fit=crop', alt: 'Headphones front view', type: 'image' },
      { id: '2', url: 'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800&h=800&fit=crop', alt: 'Headphones side view', type: 'image' },
      { id: '3', url: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=800&h=800&fit=crop', alt: 'Headphones detail', type: 'image' },
    ],
    variants: {
      colors: [
        { id: 'black', name: 'Matte Black', value: 'black', hex: '#1F2937', available: true },
        { id: 'silver', name: 'Space Silver', value: 'silver', hex: '#9CA3AF', available: true },
        { id: 'white', name: 'Cloud White', value: 'white', hex: '#F9FAFB', available: true },
        { id: 'blue', name: 'Ocean Blue', value: 'blue', hex: '#3B82F6', available: true },
      ],
      materials: [
        { id: 'standard', name: 'Standard Padding', value: 'standard', available: true, priceModifier: 0 },
        { id: 'memory', name: 'Memory Foam', value: 'memory', available: true, priceModifier: 30 },
      ],
      sizes: [
        { id: 'universal', name: 'Universal', value: 'One Size', available: true, priceModifier: 0 },
      ],
    },
    specifications: [
      { label: 'Battery Life', value: '40 Hours' },
      { label: 'Charging', value: 'USB-C Fast Charge' },
      { label: 'Connectivity', value: 'Bluetooth 5.3' },
      { label: 'Weight', value: '250g' },
    ],
  },
  {
    id: '07',
    name: 'Smart Fitness Watch',
    slug: 'smart-fitness-watch',
    shortDescription: 'Track your health and fitness with advanced sensors and AI coaching.',
    description: 'Take control of your wellness journey with our smart fitness watch. Features heart rate monitoring, sleep tracking, GPS, and personalized AI coaching. Water-resistant design with 7-day battery life.',
    basePrice: 199.99,
    compareAtPrice: 279.99,
    rating: 4.7,
    reviewCount: 1456,
    category: 'Electronics',
    tags: ['fitness', 'smart', 'health', 'popular'],
    inStock: true,
    stockQuantity: 142,
    images: [
      { id: '1', url: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=800&h=800&fit=crop', alt: 'Smartwatch display', type: 'image' },
      { id: '2', url: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&h=800&fit=crop', alt: 'Smartwatch on wrist', type: 'image' },
      { id: '3', url: 'https://images.unsplash.com/photo-1617043786394-f977fa12eddf?w=800&h=800&fit=crop', alt: 'Smartwatch features', type: 'image' },
    ],
    variants: {
      colors: [
        { id: 'black', name: 'Midnight Black', value: 'black', hex: '#000000', available: true },
        { id: 'silver', name: 'Aluminum Silver', value: 'silver', hex: '#D1D5DB', available: true },
        { id: 'rose', name: 'Rose Gold', value: 'rose', hex: '#F59E0B', available: true },
      ],
      materials: [
        { id: 'silicone', name: 'Sport Silicone', value: 'silicone', available: true, priceModifier: 0 },
        { id: 'leather', name: 'Genuine Leather', value: 'leather', available: true, priceModifier: 40 },
        { id: 'metal', name: 'Stainless Steel', value: 'metal', available: true, priceModifier: 60 },
      ],
      sizes: [
        { id: '40mm', name: '40mm', value: '40mm', available: true, priceModifier: 0 },
        { id: '44mm', name: '44mm', value: '44mm', available: true, priceModifier: 20 },
      ],
    },
    specifications: [
      { label: 'Display', value: '1.4" AMOLED' },
      { label: 'Battery', value: '7 Days' },
      { label: 'Water Resistance', value: '5ATM' },
      { label: 'Sensors', value: 'Heart Rate, SpO2, GPS' },
    ],
  },
  {
    id: '08',
    name: 'Leather Laptop Messenger Bag',
    slug: 'leather-messenger-bag',
    shortDescription: 'Handcrafted genuine leather bag with laptop compartment.',
    description: 'Sophisticated and practical, this handcrafted leather messenger bag is perfect for professionals. Features a padded laptop compartment, multiple pockets, and adjustable strap. Ages beautifully with use.',
    basePrice: 159.99,
    compareAtPrice: 219.99,
    rating: 4.8,
    reviewCount: 567,
    category: 'Accessories',
    tags: ['leather', 'professional', 'laptop', 'handcrafted'],
    inStock: true,
    stockQuantity: 92,
    images: [
      { id: '1', url: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&h=800&fit=crop', alt: 'Messenger bag front', type: 'image' },
      { id: '2', url: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=800&h=800&fit=crop', alt: 'Messenger bag detail', type: 'image' },
      { id: '3', url: 'https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?w=800&h=800&fit=crop', alt: 'Messenger bag in use', type: 'image' },
    ],
    variants: {
      colors: [
        { id: 'brown', name: 'Vintage Brown', value: 'brown', hex: '#92400E', available: true },
        { id: 'black', name: 'Classic Black', value: 'black', hex: '#000000', available: true },
        { id: 'tan', name: 'Caramel Tan', value: 'tan', hex: '#D97706', available: true },
      ],
      materials: [
        { id: 'fullgrain', name: 'Full-Grain Leather', value: 'fullgrain', available: true, priceModifier: 0 },
        { id: 'topgrain', name: 'Top-Grain Leather', value: 'topgrain', available: true, priceModifier: -20 },
      ],
      sizes: [
        { id: '13inch', name: '13" Laptop', value: '13"', available: true, priceModifier: 0 },
        { id: '15inch', name: '15" Laptop', value: '15"', available: true, priceModifier: 15 },
        { id: '17inch', name: '17" Laptop', value: '17"', available: true, priceModifier: 25 },
      ],
    },
    specifications: [
      { label: 'Material', value: 'Genuine Leather' },
      { label: 'Dimensions', value: '16" x 12" x 4"' },
      { label: 'Compartments', value: 'Multiple Pockets' },
      { label: 'Strap', value: 'Adjustable' },
    ],
  },
  {
    id: '09',
    name: 'Ceramic Coffee Mug Set',
    slug: 'ceramic-mug-set',
    shortDescription: 'Artisan-crafted ceramic mugs with unique glazed finish.',
    description: 'Elevate your morning coffee ritual with our handcrafted ceramic mug set. Each piece features a unique glazed finish and ergonomic handle. Microwave and dishwasher safe. Set of 2 or 4 mugs.',
    basePrice: 39.99,
    compareAtPrice: 59.99,
    rating: 4.6,
    reviewCount: 834,
    category: 'Home & Kitchen',
    tags: ['ceramic', 'artisan', 'coffee', 'handmade'],
    inStock: true,
    stockQuantity: 215,
    images: [
      { id: '1', url: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=800&h=800&fit=crop', alt: 'Coffee mug set', type: 'image' },
      { id: '2', url: 'https://images.unsplash.com/photo-1611080626919-7cf5a9dbab5b?w=800&h=800&fit=crop', alt: 'Mug detail', type: 'image' },
      { id: '3', url: 'https://images.unsplash.com/photo-1610889556528-9a770e32642f?w=800&h=800&fit=crop', alt: 'Mug in use', type: 'image' },
    ],
    variants: {
      colors: [
        { id: 'white', name: 'Ivory White', value: 'white', hex: '#F9FAFB', available: true },
        { id: 'blue', name: 'Ocean Blue', value: 'blue', hex: '#1E40AF', available: true },
        { id: 'gray', name: 'Stone Gray', value: 'gray', hex: '#6B7280', available: true },
        { id: 'green', name: 'Sage Green', value: 'green', hex: '#059669', available: true },
      ],
      materials: [
        { id: 'standard', name: 'Standard Ceramic', value: 'standard', available: true, priceModifier: 0 },
        { id: 'premium', name: 'Premium Glaze', value: 'premium', available: true, priceModifier: 10 },
      ],
      sizes: [
        { id: '2pack', name: 'Set of 2', value: '2 Mugs', available: true, priceModifier: 0 },
        { id: '4pack', name: 'Set of 4', value: '4 Mugs', available: true, priceModifier: 30 },
      ],
    },
    specifications: [
      { label: 'Material', value: 'High-Quality Ceramic' },
      { label: 'Capacity', value: '12 oz per mug' },
      { label: 'Care', value: 'Dishwasher & Microwave Safe' },
      { label: 'Origin', value: 'Handcrafted' },
    ],
  },
  {
    id: '10',
    name: 'Portable Bluetooth Speaker',
    slug: 'portable-speaker',
    shortDescription: '360° sound with deep bass and waterproof design.',
    description: 'Take your music anywhere with our portable Bluetooth speaker. Features 360° surround sound, powerful bass, 24-hour battery life, and IPX7 waterproof rating. Perfect for outdoor adventures.',
    basePrice: 89.99,
    compareAtPrice: 129.99,
    rating: 4.7,
    reviewCount: 1023,
    category: 'Electronics',
    tags: ['audio', 'portable', 'waterproof', 'outdoor'],
    inStock: true,
    stockQuantity: 187,
    images: [
      { id: '1', url: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=800&h=800&fit=crop', alt: 'Bluetooth speaker', type: 'image' },
      { id: '2', url: 'https://images.unsplash.com/photo-1589492477829-5e65395b66cc?w=800&h=800&fit=crop', alt: 'Speaker detail', type: 'image' },
      { id: '3', url: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?w=800&h=800&fit=crop', alt: 'Speaker outdoors', type: 'image' },
    ],
    variants: {
      colors: [
        { id: 'black', name: 'Carbon Black', value: 'black', hex: '#111827', available: true },
        { id: 'blue', name: 'Electric Blue', value: 'blue', hex: '#2563EB', available: true },
        { id: 'red', name: 'Flame Red', value: 'red', hex: '#DC2626', available: true },
        { id: 'green', name: 'Forest Green', value: 'green', hex: '#059669', available: true },
      ],
      materials: [
        { id: 'standard', name: 'Rubber Finish', value: 'standard', available: true, priceModifier: 0 },
        { id: 'fabric', name: 'Fabric Mesh', value: 'fabric', available: true, priceModifier: 15 },
      ],
      sizes: [
        { id: 'compact', name: 'Compact', value: 'Small', available: true, priceModifier: 0 },
        { id: 'large', name: 'Large', value: 'Large', available: true, priceModifier: 40 },
      ],
    },
    specifications: [
      { label: 'Battery', value: '24 Hours' },
      { label: 'Connectivity', value: 'Bluetooth 5.0' },
      { label: 'Water Resistance', value: 'IPX7' },
      { label: 'Power', value: '20W Output' },
    ],
  },
  {
    id: '11',
    name: 'Yoga Mat with Alignment Marks',
    slug: 'yoga-mat',
    shortDescription: 'Non-slip eco-friendly yoga mat with alignment guides.',
    description: 'Perfect your practice with our premium yoga mat featuring alignment marks for proper positioning. Made from eco-friendly TPE material, extra thick cushioning, and superior grip. Includes carrying strap.',
    basePrice: 49.99,
    compareAtPrice: 69.99,
    rating: 4.8,
    reviewCount: 756,
    category: 'Sports & Fitness',
    tags: ['yoga', 'fitness', 'eco-friendly', 'exercise'],
    inStock: true,
    stockQuantity: 168,
    images: [
      { id: '1', url: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=800&h=800&fit=crop', alt: 'Yoga mat rolled', type: 'image' },
      { id: '2', url: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&h=800&fit=crop', alt: 'Yoga mat in use', type: 'image' },
      { id: '3', url: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&h=800&fit=crop', alt: 'Yoga mat detail', type: 'image' },
    ],
    variants: {
      colors: [
        { id: 'purple', name: 'Lavender Purple', value: 'purple', hex: '#8B5CF6', available: true },
        { id: 'pink', name: 'Coral Pink', value: 'pink', hex: '#EC4899', available: true },
        { id: 'blue', name: 'Sky Blue', value: 'blue', hex: '#3B82F6', available: true },
        { id: 'green', name: 'Mint Green', value: 'green', hex: '#10B981', available: true },
      ],
      materials: [
        { id: 'tpe', name: 'TPE Eco-Friendly', value: 'tpe', available: true, priceModifier: 0 },
        { id: 'nbr', name: 'NBR Premium', value: 'nbr', available: true, priceModifier: 10 },
        { id: 'natural', name: 'Natural Rubber', value: 'natural', available: true, priceModifier: 20 },
      ],
      sizes: [
        { id: '6mm', name: '6mm Thick', value: '6mm', available: true, priceModifier: 0 },
        { id: '8mm', name: '8mm Thick', value: '8mm', available: true, priceModifier: 10 },
        { id: '10mm', name: '10mm Thick', value: '10mm', available: true, priceModifier: 15 },
      ],
    },
    specifications: [
      { label: 'Material', value: 'Eco-Friendly TPE' },
      { label: 'Dimensions', value: '72" x 24"' },
      { label: 'Thickness', value: '6mm / 8mm / 10mm' },
      { label: 'Features', value: 'Non-Slip, Alignment Marks' },
    ],
  },
  {
    id: '13',
    name: 'Insulated Travel Tumbler',
    slug: 'travel-tumbler',
    shortDescription: 'Vacuum insulated tumbler keeps drinks cold for 24 hours.',
    description: 'Premium stainless steel travel tumbler with double-wall vacuum insulation. Keeps beverages cold for 24 hours or hot for 12 hours. Leak-proof lid, fits most cup holders. Perfect for commuting and travel.',
    basePrice: 34.99,
    compareAtPrice: 49.99,
    rating: 4.9,
    reviewCount: 1678,
    category: 'Kitchen & Dining',
    tags: ['tumbler', 'insulated', 'travel', 'stainless steel'],
    inStock: true,
    stockQuantity: 294,
    images: [
      { id: '1', url: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=800&h=800&fit=crop', alt: 'Travel tumbler', type: 'image' },
      { id: '2', url: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&h=800&fit=crop', alt: 'Tumbler detail', type: 'image' },
      { id: '3', url: 'https://images.unsplash.com/photo-1614963366795-83c4fc78f9a6?w=800&h=800&fit=crop', alt: 'Tumbler in car', type: 'image' },
    ],
    variants: {
      colors: [
        { id: 'black', name: 'Matte Black', value: 'black', hex: '#000000', available: true },
        { id: 'silver', name: 'Stainless Steel', value: 'silver', hex: '#C0C0C0', available: true },
        { id: 'rose', name: 'Rose Gold', value: 'rose', hex: '#B76E79', available: true },
        { id: 'blue', name: 'Navy Blue', value: 'blue', hex: '#1E3A8A', available: true },
        { id: 'mint', name: 'Mint Green', value: 'mint', hex: '#6EE7B7', available: true },
      ],
      materials: [
        { id: 'steel', name: 'Stainless Steel', value: 'steel', available: true, priceModifier: 0 },
        { id: 'copper', name: 'Copper Lined', value: 'copper', available: true, priceModifier: 10 },
      ],
      sizes: [
        { id: '20oz', name: '20 oz', value: '20oz', available: true, priceModifier: 0 },
        { id: '30oz', name: '30 oz', value: '30oz', available: true, priceModifier: 8 },
        { id: '40oz', name: '40 oz', value: '40oz', available: true, priceModifier: 15 },
      ],
    },
    specifications: [
      { label: 'Material', value: 'Food-Grade Stainless Steel' },
      { label: 'Insulation', value: 'Double-Wall Vacuum' },
      { label: 'Lid', value: 'Leak-Proof' },
      { label: 'Capacity', value: '20oz / 30oz / 40oz' },
    ],
  },
  {
    id: '14',
    name: 'Gaming Mouse Pad XXL',
    slug: 'gaming-mousepad',
    shortDescription: 'Extended gaming mouse pad with smooth surface and anti-slip base.',
    description: 'Level up your gaming setup with our XXL gaming mouse pad. Features ultra-smooth surface for precise tracking, stitched edges to prevent fraying, and non-slip rubber base. Large enough for keyboard and mouse.',
    basePrice: 29.99,
    compareAtPrice: 44.99,
    rating: 4.6,
    reviewCount: 912,
    category: 'Gaming',
    tags: ['gaming', 'mousepad', 'desk', 'accessories'],
    inStock: true,
    stockQuantity: 256,
    images: [
      { id: '1', url: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=800&h=800&fit=crop', alt: 'Gaming mousepad', type: 'image' },
      { id: '2', url: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=800&h=800&fit=crop', alt: 'Mousepad on desk', type: 'image' },
      { id: '3', url: 'https://images.unsplash.com/photo-1612198188060-c7c2a3b66eae?w=800&h=800&fit=crop', alt: 'Mousepad detail', type: 'image' },
    ],
    variants: {
      colors: [
        { id: 'black', name: 'Stealth Black', value: 'black', hex: '#000000', available: true },
        { id: 'rgb', name: 'RGB Edge', value: 'rgb', hex: '#FF00FF', available: true, priceModifier: 10 },
        { id: 'blue', name: 'Cyberpunk Blue', value: 'blue', hex: '#3B82F6', available: true },
        { id: 'red', name: 'Dragon Red', value: 'red', hex: '#DC2626', available: true },
      ],
      materials: [
        { id: 'cloth', name: 'Speed Cloth', value: 'cloth', available: true, priceModifier: 0 },
        { id: 'hybrid', name: 'Hybrid Surface', value: 'hybrid', available: true, priceModifier: 8 },
      ],
      sizes: [
        { id: 'large', name: 'Large (31x15)', value: 'Large', available: true, priceModifier: 0 },
        { id: 'xl', name: 'XL (35x15)', value: 'XL', available: true, priceModifier: 5 },
        { id: 'xxl', name: 'XXL (47x15)', value: 'XXL', available: true, priceModifier: 10 },
      ],
    },
    specifications: [
      { label: 'Surface', value: 'Micro-textured Cloth' },
      { label: 'Base', value: 'Anti-Slip Rubber' },
      { label: 'Edge', value: 'Stitched' },
      { label: 'Thickness', value: '3mm' },
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
