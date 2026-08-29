import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import SlideUp from "@/components/animations/SlideUp";
import FadeIn from "@/components/animations/FadeIn";

export default function Hero() {
  return (
    <section className="relative px-4 pb-12 pt-4">
      {/* Container for the massive rounded image */}
      <FadeIn className="relative w-full max-w-[1400px] mx-auto h-[75vh] min-h-[500px] md:min-h-[600px] rounded-[2rem] md:rounded-[2.5rem] overflow-hidden group shadow-2xl">
        
        {/* Background Image */}
        <Image 
          src="/hero-bg.jpg" 
          alt="Modern IT Corporate Office"
          fill
          priority
          className="object-cover transition-transform duration-1000 group-hover:scale-105"
        />
        
        {/* Dark/Gradient Overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60"></div>
        
        {/* Content Wrapper */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 md:px-6 z-10">
          
          <h1 className="text-white flex flex-col items-center drop-shadow-2xl">
            {/* Massive Sans-Serif Headline */}
            <SlideUp delay={0.1}>
              <span className="block text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-display font-black uppercase tracking-tight mb-2">
                Technology
              </span>
            </SlideUp>
            {/* Elegant Serif Sub-Headline */}
            <SlideUp delay={0.2}>
              <span className="block text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-serif italic font-medium text-white/90">
                Talent &amp; Solutions
              </span>
            </SlideUp>
          </h1>
          
          <SlideUp delay={0.3}>
            <p className="mt-6 md:mt-8 text-base sm:text-lg md:text-xl text-white/80 max-w-2xl mx-auto font-medium drop-shadow-md">
              Handcrafted digital experiences, cutting-edge software, and top-tier talent for the modern enterprise.
            </p>
          </SlideUp>
          
          {/* Glassy Pill Buttons */}
          <SlideUp delay={0.4}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-5 mt-8 md:mt-10 w-full sm:w-auto">
              <Link href="/services" className="btn btn-primary bg-white text-primary-dark hover:bg-gray-100 px-8 py-3.5 shadow-xl w-full sm:w-auto">
                Explore Services
              </Link>
              <Link href="/get-a-quote" className="btn btn-glass px-8 py-3.5 shadow-xl w-full sm:w-auto text-sm md:text-base">
                Plan Your Project
              </Link>
            </div>
          </SlideUp>
          
        </div>
      </FadeIn>
    </section>
  );
}
