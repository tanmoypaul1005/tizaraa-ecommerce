import { ProductListSkeleton } from './components/Skeletons';

export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Skeleton */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20 animate-pulse">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-4">
            <div className="h-12 bg-white/20 rounded w-2/3 mx-auto" />
            <div className="h-6 bg-white/20 rounded w-1/2 mx-auto" />
            <div className="h-12 w-48 bg-white/20 rounded-xl mx-auto mt-8" />
          </div>
        </div>
      </div>

      {/* Featured Products Skeleton */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8 animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-64 mb-2" />
          <div className="h-5 bg-gray-200 rounded w-96" />
        </div>
        <ProductListSkeleton />
      </div>
    </div>
  );
}
