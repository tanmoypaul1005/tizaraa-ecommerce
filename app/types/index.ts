/**
 * Global Type Definitions for Tizaraa E-Commerce Application
 * Centralized type definitions for better type safety and reusability
 */

// ============================================================================
// Product Types
// ============================================================================

export interface ProductImage {
  id: string;
  url: string;
  alt: string;
  type: 'image' | 'video';
}

export interface Variant {
  id: string;
  name: string;
  value: string;
  available: boolean;
  hex?: string;
  priceModifier?: number;
}

export interface ProductVariants {
  colors: Variant[];
  materials: Variant[];
  sizes: Variant[];
}

export interface Specification {
  label: string;
  value: string;
}

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

// ============================================================================
// Cart Types
// ============================================================================

export interface CartItem {
  productId: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
  selectedColor?: string;
  selectedMaterial?: string;
  selectedSize?: string;
  maxQuantity: number;
}

export interface CartState {
  items: CartItem[];
  isOpen: boolean;
  recentlyViewed: RecentlyViewedItem[];
}

export interface RecentlyViewedItem {
  productId: string;
  name: string;
  image: string;
  price: number;
}

// ============================================================================
// Wishlist Types
// ============================================================================

export interface WishlistItem {
  productId: string;
  name: string;
  image: string;
  price: number;
}

export interface WishlistState {
  items: WishlistItem[];
}

// ============================================================================
// Comparison Types
// ============================================================================

export interface ComparisonItem {
  productId: string;
  name: string;
  image: string;
  price: number;
  rating: number;
  category: string;
}

export interface ComparisonState {
  items: ComparisonItem[];
  isOpen: boolean;
}

// ============================================================================
// Promo Code Types
// ============================================================================

export interface PromoCode {
  code: string;
  discount: number;
  minPurchase?: number;
  expiryDate?: Date;
  description?: string;
}

export interface AppliedPromo {
  code: string;
  discount: number;
}

// ============================================================================
// Checkout Types
// ============================================================================

export interface CheckoutFormData {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  zipCode: string;
  country: string;
  paymentMethod: 'card' | 'paypal' | 'cod';
}

export interface CheckoutFormErrors {
  name?: string;
  email?: string;
  phone?: string;
  address?: string;
  city?: string;
  zipCode?: string;
  country?: string;
}

// ============================================================================
// Filter Types
// ============================================================================

export interface ProductFilters {
  categories: string[];
  colors: string[];
  sizes: string[];
  priceRange: [number, number];
  minRating: number;
  sortBy: 'popularity' | 'price-low' | 'price-high' | 'rating' | 'newest';
}

// ============================================================================
// Search Types
// ============================================================================

export interface SearchResult extends Product {
  matchType: 'name' | 'description' | 'category' | 'tag';
}

export interface SearchState {
  query: string;
  results: SearchResult[];
  isLoading: boolean;
  error: string | null;
}

// ============================================================================
// API Response Types
// ============================================================================

export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

// ============================================================================
// Error Types
// ============================================================================

export interface AppError {
  message: string;
  code?: string;
  statusCode?: number;
  details?: unknown;
}

// ============================================================================
// Stock Status Types
// ============================================================================

export type StockStatusType = 'in-stock' | 'low-stock' | 'out-of-stock';

// ============================================================================
// Theme Types
// ============================================================================

export type ThemeMode = 'light' | 'dark' | 'system';

// ============================================================================
// Notification Types
// ============================================================================

export interface Notification {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
  duration?: number;
}

// ============================================================================
// PWA Types
// ============================================================================

export interface PWAInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

// ============================================================================
// User Types
// ============================================================================

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: 'customer' | 'admin';
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

// ============================================================================
// Order Types
// ============================================================================

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  createdAt: Date;
  updatedAt: Date;
  shippingAddress: CheckoutFormData;
}

// ============================================================================
// Review Types
// ============================================================================

export interface Review {
  id: string;
  productId: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  createdAt: Date;
  verified: boolean;
}

// ============================================================================
// Component Prop Types
// ============================================================================

export interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}

export interface InputProps {
  type?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  error?: string;
  disabled?: boolean;
  required?: boolean;
  className?: string;
}

// ============================================================================
// Utility Types
// ============================================================================

export type Nullable<T> = T | null;
export type Optional<T> = T | undefined;
export type AsyncFunction<T = void> = () => Promise<T>;
export type ValueOf<T> = T[keyof T];
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};
