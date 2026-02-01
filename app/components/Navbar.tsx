import Link from "next/link";

const Navbar = () => {
    return (
        <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
            <div className="container mx-auto px-4 py-4">
                <div className="flex justify-between items-center">
                    <Link href="/" className="text-2xl font-bold text-gray-900">
                        Tizaraa
                    </Link>
                    <div className="flex gap-6">
                        <Link
                            href="/products"
                            className="text-gray-700 hover:text-gray-900 font-medium transition-colors"
                        >
                            Products
                        </Link>
                        <Link
                            href="/cart"
                            className="text-gray-700 hover:text-gray-900 font-medium transition-colors"
                        >
                            Cart
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;