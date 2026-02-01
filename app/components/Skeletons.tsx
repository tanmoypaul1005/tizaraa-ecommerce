export const ProductCardSkeleton = () => (
  <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100 animate-pulse">
    {/* Image skeleton */}
    <div className="aspect-square bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] animate-shimmer" />
    
    {/* Content skeleton */}
    <div className="p-4 space-y-3">
      {/* Category */}
      <div className="h-3 bg-gray-200 rounded w-1/4" />
      
      {/* Title */}
      <div className="h-5 bg-gray-200 rounded w-3/4" />
      
      {/* Description */}
      <div className="space-y-2">
        <div className="h-4 bg-gray-200 rounded w-full" />
        <div className="h-4 bg-gray-200 rounded w-5/6" />
      </div>
      
      {/* Rating */}
      <div className="flex items-center gap-2">
        <div className="h-4 bg-gray-200 rounded w-24" />
        <div className="h-4 bg-gray-200 rounded w-12" />
      </div>
      
      {/* Price */}
      <div className="flex items-baseline gap-2 pt-2">
        <div className="h-7 bg-gray-200 rounded w-20" />
        <div className="h-4 bg-gray-200 rounded w-16" />
      </div>
    </div>
  </div>
);

export const ProductListSkeleton = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
    {Array.from({ length: 8 }).map((_, i) => (
      <ProductCardSkeleton key={i} />
    ))}
  </div>
);

export const ProductDetailSkeleton = () => (
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-pulse">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Image Gallery Skeleton */}
      <div className="space-y-4">
        <div className="aspect-square bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] animate-shimmer rounded-2xl" />
        <div className="grid grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="aspect-square bg-gray-200 rounded-lg" />
          ))}
        </div>
      </div>

      {/* Product Info Skeleton */}
      <div className="space-y-6">
        {/* Category & Title */}
        <div className="space-y-3">
          <div className="h-4 bg-gray-200 rounded w-24" />
          <div className="h-8 bg-gray-200 rounded w-3/4" />
          <div className="h-5 bg-gray-200 rounded w-full" />
        </div>

        {/* Rating */}
        <div className="flex items-center gap-2">
          <div className="h-5 bg-gray-200 rounded w-32" />
          <div className="h-5 bg-gray-200 rounded w-20" />
        </div>

        {/* Price */}
        <div className="space-y-2">
          <div className="h-10 bg-gray-200 rounded w-40" />
          <div className="h-5 bg-gray-200 rounded w-32" />
        </div>

        {/* Customization Options */}
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="space-y-2">
              <div className="h-5 bg-gray-200 rounded w-24" />
              <div className="flex gap-2">
                {Array.from({ length: 4 }).map((_, j) => (
                  <div key={j} className="h-10 w-16 bg-gray-200 rounded" />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Buttons */}
        <div className="flex gap-4">
          <div className="h-12 bg-gray-200 rounded-xl flex-1" />
          <div className="h-12 w-12 bg-gray-200 rounded-xl" />
        </div>

        {/* Description */}
        <div className="space-y-2 pt-4">
          <div className="h-6 bg-gray-200 rounded w-32" />
          <div className="h-4 bg-gray-200 rounded w-full" />
          <div className="h-4 bg-gray-200 rounded w-full" />
          <div className="h-4 bg-gray-200 rounded w-5/6" />
        </div>
      </div>
    </div>
  </div>
);

export const SearchSkeleton = () => (
  <div className="space-y-4 animate-pulse">
    {Array.from({ length: 5 }).map((_, i) => (
      <div key={i} className="flex gap-4 p-4 bg-white rounded-lg border border-gray-200">
        <div className="w-20 h-20 bg-gray-200 rounded-lg flex-shrink-0" />
        <div className="flex-1 space-y-2">
          <div className="h-5 bg-gray-200 rounded w-3/4" />
          <div className="h-4 bg-gray-200 rounded w-1/2" />
          <div className="h-6 bg-gray-200 rounded w-24" />
        </div>
      </div>
    ))}
  </div>
);

export const CartSkeleton = () => (
  <div className="space-y-4 animate-pulse">
    {Array.from({ length: 3 }).map((_, i) => (
      <div key={i} className="flex gap-4 p-4 bg-white rounded-lg border border-gray-200">
        <div className="w-20 h-20 bg-gray-200 rounded-lg flex-shrink-0" />
        <div className="flex-1 space-y-2">
          <div className="h-5 bg-gray-200 rounded w-2/3" />
          <div className="h-4 bg-gray-200 rounded w-1/3" />
          <div className="flex items-center gap-2">
            <div className="h-8 w-24 bg-gray-200 rounded" />
            <div className="h-6 bg-gray-200 rounded w-20" />
          </div>
        </div>
      </div>
    ))}
  </div>
);
