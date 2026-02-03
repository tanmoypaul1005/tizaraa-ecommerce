import ProductCard from "./components/ProductCard";
import { getFeaturedProducts } from "./data/products";
import { Suspense } from "react";
import { ProductListSkeleton } from "./components/Skeletons";
import HeroSection from "./components/home/HeroSection";
import FeaturesSection from "./components/home/FeaturesSection";
import CTASection from "./components/home/CTASection";
import ProductsPage from "./product/page";
import RecentlyViewed from "./components/RecentlyViewed";


export default function Home() {

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <HeroSection />

      <ProductsPage/>

      {/* Features Section */}
      <FeaturesSection />

      {/* Recently Viewed Products */}
      <div className="lg:px-36">
        <RecentlyViewed />
      </div>

      {/* CTA Section */}
      <CTASection />
    </div>
  );
}
