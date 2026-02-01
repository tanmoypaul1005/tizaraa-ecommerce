import Link from "next/link";
import { CartBadge } from "./CartBadge";

const Navbar = () => {
    return (
        <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
            <div className="container mx-auto px-4 py-4">
                <div className="flex justify-between items-center">
                    <Link href="/" className="text-2xl font-bold text-gray-900">
                        Tizaraa
                    </Link>
                    <div className="flex items-center gap-6">
                        <Link
                            href="/products"
                            className="text-gray-700 hover:text-gray-900 font-medium transition-colors"
                        >
                            Products
                        </Link>
                        <CartBadge />
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;