import Link from "next/link";
import ProductCard from "./components/ProductCard";
import RecentlyViewed from "./components/RecentlyViewed";
import { getFeaturedProducts } from "./data/products";
import { Sparkles, Zap, Shield, Truck } from "lucide-react";
import { Suspense } from "react";
import { ProductListSkeleton } from "./components/Skeletons";

// Async component for featured products
async function FeaturedProductsGrid() {
  // Simulate async data fetching
  await new Promise(resolve => setTimeout(resolve, 100));
  const featuredProducts = getFeaturedProducts(6);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 md:gap-8 px-36">
      {featuredProducts.map((product) => (
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
        />
      ))}
    </div>
  );
}

export default function Home() {

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjMC0yLjIxLTEuNzktNC00LTRzLTQgMS43OS00IDQgMS43OSA0IDQgNCA0LTEuNzkgNC00em0wLTEwYzAtMi4yMS0xLjc5LTQtNC00cy00IDEuNzktNCA0IDEuNzkgNCA0IDQgNC0xLjc5IDQtNHptMC0xMGMwLTIuMjEtMS43OS00LTQtNHMtNCAxLjc5LTQgNCAxLjc5IDQgNCA0IDQtMS43OSA0LTR6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-20"></div>

        <div className="relative container mx-auto px-4 py-20 md:py-32">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full text-sm font-medium">
              <Sparkles className="w-4 h-4" />
              <span>Premium Customizable Products</span>
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
              Design Your Perfect
              <span className="block bg-gradient-to-r from-yellow-200 to-pink-200 bg-clip-text text-transparent">
                Custom Product
              </span>
            </h1>

            <p className="text-lg md:text-xl text-blue-100 max-w-2xl mx-auto leading-relaxed">
              Real-time 3D customization, dynamic pricing, and premium quality.
              Create something truly unique with our advanced product builder.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Link
                href="/product/01"
                className="inline-flex items-center justify-center gap-2 bg-white text-blue-600 font-bold px-8 py-4 rounded-xl hover:bg-blue-50 transition-all shadow-2xl hover:shadow-3xl hover:scale-105 active:scale-95"
              >
                <Zap className="w-5 h-5" />
                Start Customizing
              </Link>

              <Link
                href="#products"
                className="inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur-md text-white font-semibold px-8 py-4 rounded-xl hover:bg-white/20 transition-all border-2 border-white/20"
              >
                Browse Products
              </Link>
            </div>
          </div>
        </div>

        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
            <path d="M0 0L60 10C120 20 240 40 360 46.7C480 53 600 47 720 43.3C840 40 960 40 1080 46.7C1200 53 1320 67 1380 73.3L1440 80V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0V0Z" fill="white" />
          </svg>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="py-16 md:py-24 bg-gradient-to-b from-white to-gray-50">
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
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center space-y-3">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto">
                <Sparkles className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-bold text-lg text-gray-900">Real-Time Customization</h3>
              <p className="text-gray-600 text-sm">See your changes instantly with our 3D preview</p>
            </div>

            <div className="text-center space-y-3">
              <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto">
                <Shield className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="font-bold text-lg text-gray-900">Premium Quality</h3>
              <p className="text-gray-600 text-sm">100% satisfaction guarantee on all products</p>
            </div>

            <div className="text-center space-y-3">
              <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto">
                <Truck className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="font-bold text-lg text-gray-900">Fast Shipping</h3>
              <p className="text-gray-600 text-sm">Free delivery on orders over $50</p>
            </div>
          </div>
        </div>
      </section>

      {/* Recently Viewed Products */}
      <div className="px-36">
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
