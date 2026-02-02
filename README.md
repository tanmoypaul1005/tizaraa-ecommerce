# Tizaraa E-Commerce Platform

A modern, feature-rich e-commerce platform built with Next.js 16, featuring PWA capabilities, persistent cart system, and customizable products.

## 🚀 Features Implemented

### 1. Persistent Shopping Cart System
- ✅ **IndexedDB Storage** - Cart data persists across browser sessions
- ✅ **Cross-Tab Synchronization** - Cart updates sync across multiple browser tabs using BroadcastChannel API
- ✅ **Offline Support** - Cart works even when offline
- ✅ **State Management** - Powered by Zustand for predictable state updates
- ✅ **Optimistic UI Updates** - Instant feedback with automatic rollback on errors

### 2. Smart Cart Features
- ✅ **Save for Later** - Move items between cart and saved list
- ✅ **Recently Viewed Products** - Track last 10 viewed products automatically
- ✅ **Quantity Discount System** - Automatic tiered discounts:
  - 5% off for 3-4 items
  - 10% off for 5-9 items
  - 15% off for 10+ items
- ✅ **Visual Progress Indicators** - Real-time tier tracking and next tier preview
- ✅ **Low Stock Warnings** - Alert when items have ≤5 units remaining
- ✅ **Promo Code System** - Apply discount codes with validation (stackable with quantity discounts)

### 3. Cart Operations
- ✅ **Add to Cart** - Add products with variant selections (color, material, size)
- ✅ **Update Quantity** - Increase/decrease with stock limit validation
- ✅ **Remove Items** - Delete items from cart
- ✅ **Clear Cart** - Remove all items at once
- ✅ **Price Calculations**
  - Subtotal calculation
  - Bundle discounts
  - Promo code discounts
  - Tax calculation (8%)
  - Shipping calculation (Free over $50, otherwise $5.99)
  - Final total with all discounts

### 4. Promo Codes Available
- `WELCOME10` - 10% off on orders above $50
- `SAVE15` - 15% off on orders above $100
- `FLAT20` - $20 off on orders above $150
- `BUNDLE15` - 15% off (no minimum purchase)

### 5. Product Details Page (PDP)
- ✅ **Image Gallery** - Zoom, rotation, fullscreen modal with video support
- ✅ **Variant Selection** - Color swatches, material cards, size buttons
- ✅ **Dynamic Pricing** - Real-time price updates based on variant selections
- ✅ **Stock Status** - In-stock, low-stock, out-of-stock indicators
- ✅ **Product Rating** - Star ratings with review count
- ✅ **Customization Summary** - Preview of selected options
- ✅ **Share Functionality** - Copy configured product URL
- ✅ **Recently Viewed Tracking** - Auto-track product views

### 6. Progressive Web App (PWA)
- ✅ **Offline Mode** - Full app functionality offline
- ✅ **Install Prompt** - Add to home screen on Android/iOS
- ✅ **Service Worker** - Cache-first strategy for assets
- ✅ **Manifest Configuration** - App icons and theme colors
- ✅ **Online/Offline Indicators** - Connection status display
- ✅ **Update Notifications** - Alert when new version available

### 7. Mock Data System
- ✅ **6 Sample Products** - T-shirt, Hoodie, Phone Case, Cap, Water Bottle, Tote Bag
- ✅ **Product Categories** - Apparel, Accessories
- ✅ **Variant Options** - Multiple colors, materials, and sizes per product
- ✅ **High-Quality Images** - Unsplash integration for product photos
- ✅ **Pricing Tiers** - Base prices with variant modifiers

### 8. UI Components
- ✅ **CartDrawer** - Slide-in cart with full functionality
- ✅ **CartBadge** - Animated item count in navigation
- ✅ **CartItem** - Individual cart item with controls
- ✅ **SavedItem** - Saved for later items display
- ✅ **ProductCard** - Compact product grid card (4:3 aspect ratio)
- ✅ **Free Shipping Progress Bar** - Visual progress toward free shipping
- ✅ **Bundle Discount Alerts** - Notification when discount applies

## 📁 Project Structure

```
app/
├── components/
│   ├── CartDrawer.tsx          # Main cart sidebar
│   ├── CartBadge.tsx            # Cart icon with item count
│   ├── CartItem.tsx             # Individual cart item
│   ├── SavedItem.tsx            # Saved for later item
│   ├── ProductCard.tsx          # Product grid card
│   ├── ProductImageGallery.tsx # Image viewer
│   ├── VariantSelector.tsx      # Variant selection UI
│   ├── QuantitySelector.tsx     # Quantity controls
│   ├── ProductActions.tsx       # Add to cart buttons
│   ├── ProductAccordion.tsx     # Product details accordion
│   ├── StockStatus.tsx          # Stock indicators
│   ├── ProductRating.tsx        # Star ratings
│   ├── CustomizationSummary.tsx # Config preview
│   ├── PWAInstallPrompt.tsx     # PWA install UI
│   ├── OnlineStatus.tsx         # Connection indicator
│   └── Navbar.tsx               # Navigation with cart badge
├── data/
│   └── products.ts              # Mock product database
├── lib/
│   ├── db.ts                    # IndexedDB utilities
│   └── promo.ts                 # Promo code logic
├── store/
│   └── cartStore.ts             # Zustand cart store
├── product/
│   └── [product_id]/
│       └── page.tsx             # Product details page
├── page.tsx                     # Home page
├── layout.tsx                   # Root layout
└── globals.css                  # Global styles

public/
├── manifest.json                # PWA manifest
├── sw.js                        # Service worker
└── icons/                       # PWA icons
```

## 🛠️ Technologies Used

- **Next.js 16.1.6** - React framework with Turbopack
- **React 19.2.3** - UI library
- **TypeScript 5** - Type safety
- **Tailwind CSS 4** - Styling
- **Zustand** - State management
- **IndexedDB** - Local database
- **BroadcastChannel API** - Cross-tab sync
- **lucide-react** - Icons
- **next-pwa** - PWA support
- **framer-motion** - Animations

## 📊 Cart Store Features

### State Management
```typescript
- items: CartItem[]              # Active cart items
- savedItems: SavedItem[]        # Saved for later
- recentlyViewed: RecentlyViewedItem[] # Recently viewed products
- promoCode: string | null       # Applied promo code
- promoDiscount: number          # Discount amount
- subtotal: number               # Cart subtotal
- bundleDiscount: number         # Bundle discount %
- tax: number                    # Tax amount
- shipping: number               # Shipping cost
- total: number                  # Final total
```

### Actions
```typescript
- addItem()                      # Add product to cart
- updateQuantity()               # Change item quantity
- removeItem()                   # Remove from cart
- clearCart()                    # Empty cart
- moveToSaved()                  # Save item for later
- moveToCart()                   # Move saved to cart
- removeSaved()                  # Delete saved item
- addRecentlyViewed()            # Track viewed products
- applyPromoCode()               # Apply discount code
- removePromoCode()              # Remove discount
- openCart()                     # Open cart drawer
- closeCart()                    # Close cart drawer
- loadFromDB()                   # Load from IndexedDB
- calculateTotals()              # Recalculate prices
```

## 🎯 Key Implementation Details

### IndexedDB Structure
- **cart** store - Active cart items
- **savedForLater** store - Saved items
- **recentlyViewed** store - Max 10 recently viewed products

### Cross-Tab Sync
- Uses BroadcastChannel API
- Broadcasts on every cart mutation
- All tabs listen and reload from IndexedDB
- Handles race conditions gracefully

### Optimistic Updates
- Immediate UI updates for better UX
- Automatic rollback on database errors
- Error handling with user feedback

### Variant-Based Cart Items
- Unique item ID: `{productId}-{color}-{material}-{size}`
- Same product with different variants = separate cart items
- Automatic quantity merging when adding existing variant

### Price Calculations
1. Calculate subtotal from all items
2. Apply bundle discount (if eligible)
3. Apply promo code discount (if valid)
4. Calculate tax (8% of discounted amount)
5. Add shipping ($5.99 or FREE if subtotal ≥ $50)
6. Final total = (subtotal - discounts) + tax + shipping

## 🎨 UI/UX Highlights

- **Slide-in Cart Drawer** - Smooth animation from right
- **Animated Badge** - Scale-in animation for cart count
- **Free Shipping Progress** - Visual bar showing progress
- **Bundle Discount Alerts** - Green notification when active
- **Low Stock Warnings** - Orange alerts for limited stock
- **Compact Product Cards** - 4:3 aspect ratio for better grid
- **Responsive Design** - Mobile-first approach
- **Loading States** - Visual feedback during operations
- **Error Handling** - User-friendly error messages

## 🔄 Cart Persistence Flow

1. User adds item to cart
2. Update Zustand store (optimistic)
3. Save to IndexedDB
4. Broadcast update to other tabs
5. Other tabs receive message
6. Other tabs reload from IndexedDB
7. All tabs synchronized

## 📱 PWA Features

- **Offline Caching** - Static assets cached
- **Background Sync** - Sync when connection restored
- **Push Notifications** - Ready for notifications
- **Install Prompts** - Custom install UI
- **Update Detection** - Notify on new versions
- **Offline Fallback** - Custom offline page

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## 📝 Notes

- Cart data persists in browser's IndexedDB
- Works offline after first visit
- Cross-tab sync requires modern browsers
- PWA features require HTTPS in production
- Promo codes are case-insensitive
- Quantity discounts apply automatically based on item count
- Quantity discounts stack with promo codes for maximum savings
- Free shipping threshold: $50
- Tax rate: 8%
- Recently viewed limited to 10 items
- Low stock warning at ≤5 units

## 💰 Quantity Discount System

The platform features an automatic **tiered discount system** that rewards customers for adding more items:

### Discount Tiers
- **3-4 items**: 5% off entire order
- **5-9 items**: 10% off entire order  
- **10+ items**: 15% off entire order

### Key Features
- 🎯 **Automatic Application** - No codes needed, discounts apply instantly
- 📊 **Visual Progress** - See your current tier and progress to next level
- 💵 **Real Savings Display** - Shows exact dollar amount saved
- 🔄 **Real-Time Updates** - Discount adjusts as you add/remove items
- 🎁 **Stackable** - Combine with promo codes for bigger savings

### Example Savings
```
Cart: 5 items, Subtotal: $200
├─ Quantity Discount (10%): -$20.00
├─ Promo Code "SAVE20" (20%): -$36.00
├─ Tax (8%): +$11.52
└─ Total: $155.52 → You save $64.48! 💰
```

For complete details, see [QUANTITY_DISCOUNTS.md](./QUANTITY_DISCOUNTS.md)

## 🔧 Server Actions

The platform implements Next.js Server Actions for cart and wishlist operations:

- **Cart Operations**: Add, update, remove items with server-side persistence
- **Wishlist Management**: Server-side wishlist storage and sync
- **Hybrid Architecture**: Automatic fallback to IndexedDB when offline
- **Cookie Storage**: HTTP-only cookies for secure cart persistence
- **Real-Time Sync**: Syncs with server when connection is available

For technical details, see [SERVER_ACTIONS.md](./SERVER_ACTIONS.md)

## 🎯 Future Enhancements

- User authentication and cloud cart sync
- Wishlist with persistent storage
- Product recommendations based on cart
- Abandoned cart recovery
- Real-time inventory updates
- Multiple shipping options
- Gift wrapping options
- Product reviews and ratings submission
- Advanced search and filters
- Order history tracking

---

Built with ❤️ using Next.js and modern web technologies
