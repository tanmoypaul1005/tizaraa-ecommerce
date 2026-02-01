import Link from "next/link";

// Mock product data
const products = [
  { id: 1, name: "Custom T-Shirt", price: 29.99, rating: 4.5 },
  { id: 2, name: "Customizable Mug", price: 14.99, rating: 4.8 },
  { id: 3, name: "Personalized Phone Case", price: 19.99, rating: 4.6 },
  { id: 4, name: "Custom Hoodie", price: 49.99, rating: 4.7 },
  { id: 5, name: "Design Your Cap", price: 24.99, rating: 4.4 },
  { id: 6, name: "Custom Backpack", price: 39.99, rating: 4.9 },
  { id: 7, name: "Personalized Notebook", price: 12.99, rating: 4.5 },
  { id: 8, name: "Custom Water Bottle", price: 16.99, rating: 4.6 },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Product Banner */}
      <section className="bg-gradient-to-b from-blue-50 to-white py-16 sm:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
              3D Product Customization for Modern E-Commerce
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Real-time customization, dynamic pricing, and advanced cart management.
            </p>
            <Link
              href="/products/1"
              className="inline-block px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl"
            >
              Start Customizing
            </Link>
          </div>
        </div>
      </section>

      {/* Product List */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Featured Products
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden"
              >
                {/* Product Image Placeholder */}
                <div className="w-full h-48 bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                  <svg
                    className="w-16 h-16 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                    />
                  </svg>
                </div>

                {/* Product Details */}
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">
                    {product.name}
                  </h3>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xl font-bold text-gray-900">
                      ${product.price}
                    </span>
                    <div className="flex items-center gap-1">
                      <svg
                        className="w-4 h-4 text-yellow-400 fill-current"
                        viewBox="0 0 20 20"
                      >
                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                      </svg>
                      <span className="text-sm text-gray-600">
                        {product.rating}
                      </span>
                    </div>
                  </div>
                  <Link
                    href={`/product/${product.id}`}
                    className="block w-full py-2 bg-gray-900 text-white text-center font-medium rounded-md hover:bg-gray-800 transition-colors"
                  >
                    Customize
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
