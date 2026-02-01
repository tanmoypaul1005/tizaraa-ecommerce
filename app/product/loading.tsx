import { ProductListSkeleton } from '../components/Skeletons';

export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Skeleton */}
        <div className="mb-8 animate-pulse">
          <div className="h-10 bg-gray-200 rounded w-64 mb-4" />
          <div className="flex gap-4">
            <div className="h-10 bg-gray-200 rounded w-32" />
            <div className="h-10 bg-gray-200 rounded w-32" />
            <div className="h-10 bg-gray-200 rounded w-32" />
          </div>
        </div>

        {/* Product Grid Skeleton */}
        <ProductListSkeleton />
      </div>
    </div>
  );
}
