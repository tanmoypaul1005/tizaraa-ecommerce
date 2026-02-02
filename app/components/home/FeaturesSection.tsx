import { Sparkles, Shield, Truck } from "lucide-react";

const FeaturesSection = () => {
    
    return (
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
    );
};

export default FeaturesSection;