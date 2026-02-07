import Link from "next/link";
import { CartBadge } from "./CartBadge";
import { WishlistBadge } from "./WishlistBadge";
import ComparisonBadge from "./ComparisonBadge";
import SearchBar from "./SearchBar";

const Navbar = () => {
    return (
        <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
            <div className="container mx-auto px-20 py-3">
                <div className="flex items-center gap-4 lg:gap-8">
                    {/* Logo */}
                    <Link href="/" className="text-2xl font-bold text-gray-900 whitespace-nowrap">
                        Tizaraa
                    </Link>
                    
                    {/* Search Bar - Hidden on mobile, shown on tablet+ */}
                    <div className="hidden md:flex flex-1">
                        <SearchBar />
                    </div>
                    
                    {/* Navigation Links */}
                    <div className="flex items-center gap-4 lg:gap-6">
                        <ComparisonBadge />
                        <WishlistBadge />
                        <CartBadge />
                    </div>
                </div>
                
                {/* Mobile Search Bar */}
                <div className="md:hidden mt-3">
                    <SearchBar />
                </div>
            </div>
        </nav>
    );
};

export default Navbar;