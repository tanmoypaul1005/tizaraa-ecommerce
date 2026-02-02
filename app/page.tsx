import Link from "next/link";
import ProductCard from "./components/ProductCard";
import RecentlyViewed from "./components/RecentlyViewed";
import { getFeaturedProducts } from "./data/products";
import { Sparkles, Shield, Truck } from "lucide-react";
import { Suspense } from "react";
import { ProductListSkeleton } from "./components/Skeletons";
import HeroSection from "./components/home/HeroSection";
import FeaturesSection from "./components/home/FeaturesSection";

// Async component for featured products
async function FeaturedProductsGrid() {
  // Simulate async data fetching
  await new Promise(resolve => setTimeout(resolve, 100));
  const featuredProducts = getFeaturedProducts(6);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 md:gap-8 lg:px-36">
      {featuredProducts?.map((product) => (
        <ProductCard
          key={product?.id}
          id={product?.id}
          name={product?.name}
          shortDescription={product?.shortDescription}
          basePrice={product?.basePrice}
          compareAtPrice={product?.compareAtPrice}
          rating={product?.rating}
          reviewCount={product?.reviewCount}
          image={product?.images[0].url}
          category={product?.category}
          tags={product?.tags}
          inStock={product?.inStock}
          fullProduct={product}
        />
      ))}
    </div>
  );
}

export default function Home() {

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <HeroSection />

      {/* Products Section */}
      <section id="products" className="py-2 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 space-y-4">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900">
              Featured Products
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Explore our collection of premium customizable products
            </p>
          </div>

          <Suspense fallback={<ProductListSkeleton />}>
            <FeaturedProductsGrid />
          </Suspense>
        </div>
      </section>


      {/* Features Section */}
      <FeaturesSection />

      {/* Recently Viewed Products */}
      <div className="lg:px-36">
        <RecentlyViewed />
      </div>


      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold">
              Ready to Create Something Amazing?
            </h2>
            <p className="text-lg text-blue-100">
              Start designing your custom product today and bring your vision to life
            </p>
            <Link
              href="/product/01"
              className="inline-flex items-center gap-2 bg-white text-blue-600 font-bold px-8 py-4 rounded-xl hover:bg-blue-50 transition-all shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95"
            >
              <Sparkles className="w-5 h-5" />
              Get Started Now
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
