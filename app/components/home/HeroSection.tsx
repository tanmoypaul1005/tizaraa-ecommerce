
import Link from "next/link";
import { Sparkles, Zap } from "lucide-react";
import { motion } from "framer-motion";
import { MotionDiv } from "@/app/utils/const";

const HeroSection = () => {
    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.1,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: "easeOut",
            },
        },
    };

    const badgeVariants = {
        hidden: { opacity: 0, scale: 0.8 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                duration: 0.5,
                ease: "easeOut",
            },
        },
    };

    const buttonVariants = {
        hover: {
            scale: 1.05,
            transition: {
                duration: 0.2,
                ease: "easeInOut",
            },
        },
        tap: {
            scale: 0.95,
        },
    };

    return (
        <section className="relative bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 text-white overflow-hidden">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjMC0yLjIxLTEuNzktNC00LTRzLTQgMS43OS00IDQgMS43OSA0IDQgNCA0LTEuNzkgNC00em0wLTEwYzAtMi4yMS0xLjc5LTQtNC00cy00IDEuNzktNCA0IDEuNzkgNCA0IDQgNC0xLjc5IDQtNHptMC0xMGMwLTIuMjEtMS43OS00LTQtNHMtNCAxLjc5LTQgNCAxLjc5IDQgNCA0IDQtMS43OSA0LTR6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-20"></div>

            <div className="relative container mx-auto px-4 py-20 md:py-32">
                <MotionDiv
                    className="max-w-4xl mx-auto text-center space-y-6"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <MotionDiv
                        className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full text-sm font-medium"
                        variants={badgeVariants}
                    >
                        <Sparkles className="w-4 h-4" />
                        <span>Premium Customizable Products</span>
                    </MotionDiv>

                    <MotionH1
                        className="text-4xl md:text-6xl font-bold leading-tight"
                        variants={itemVariants}
                    >
                        Design Your Perfect
                        <span className="block bg-gradient-to-r from-yellow-200 to-pink-200 bg-clip-text text-transparent">
                            Custom Product
                        </span>
                    </MotionH1>

                    <MotionP
                        className="text-lg text-blue-100 max-w-2xl mx-auto leading-relaxed"
                        variants={itemVariants}
                    >
                        Real-time 3D customization, dynamic pricing, and premium quality.
                        Create something truly unique with our advanced product builder.
                    </MotionP>

                    <MotionDiv
                        className="flex flex-col sm:flex-row gap-4 justify-center pt-4"
                        variants={itemVariants}
                    >
                        <MotionDiv
                            variants={buttonVariants}
                            whileHover="hover"
                            whileTap="tap"
                        >
                            <Link
                                href="/product/01"
                                className="inline-flex items-center justify-center gap-2 bg-white text-blue-600 font-bold px-8 py-4 rounded-xl hover:bg-blue-50 transition-all shadow-2xl hover:shadow-3xl"
                            >
                                <Zap className="w-5 h-5" />
                                Start Customizing
                            </Link>
                        </MotionDiv>

                        <MotionDiv
                            variants={buttonVariants}
                            whileHover="hover"
                            whileTap="tap"
                        >
                            <Link
                                href="#products"
                                className="inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur-md text-white font-semibold px-8 py-4 rounded-xl hover:bg-white/20 transition-all border-2 border-white/20"
                            >
                                Browse Products
                            </Link>
                        </MotionDiv>
                    </MotionDiv>
                </MotionDiv>
            </div>

            {/* Wave Divider with animation */}
            <MotionDiv
                className="absolute bottom-0 left-0 right-0"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
            >
                <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
                    <path d="M0 0L60 10C120 20 240 40 360 46.7C480 53 600 47 720 43.3C840 40 960 40 1080 46.7C1200 53 1320 67 1380 73.3L1440 80V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0V0Z" fill="white" />
                </svg>
            </MotionDiv>
        </section>
    );
};

export default HeroSection;