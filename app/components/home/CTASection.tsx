import { Sparkles } from 'lucide-react';
import Link from 'next/link';

const CTASection = () => {
    return (
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
    );
};

export default CTASection;