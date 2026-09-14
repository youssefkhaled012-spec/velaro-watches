import React from 'react';
import { useShop } from '../../context/ShopContext';
import { ArrowDown, ChevronRight, Shield } from 'lucide-react';

export const HeroScene: React.FC = () => {
  const { setActivePage } = useShop();

  return (
    <section className="relative w-full min-h-screen bg-[#0B0B0A] flex items-center justify-center overflow-hidden pt-20">
      {/* Background Atmospheric Lighting & High-Res Watch Imagery */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1533139502658-0198f920d8e8?auto=format&fit=crop&q=80&w=2000"
          alt="Azzam Atmospheric Luxury Watch"
          className="w-full h-full object-cover object-center scale-105 opacity-30 contrast-125 brightness-75 transition-all duration-1000"
        />
        {/* Deep Vignette Radial Shadow */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0A] via-[#0B0B0A]/60 to-[#0B0B0A]/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B0B0A] via-transparent to-[#0B0B0A]" />
      </div>

      {/* Floating Ambient Brand Crest Background Graphic */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0 pointer-events-none select-none opacity-5">
        <span className="font-serif text-[260px] font-bold text-[#F4F1E9] tracking-tighter">
          VALERE
        </span>
      </div>

      {/* Hero Content Container */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center flex flex-col items-center justify-center py-20">
        {/* Small Technical Label */}
        <div className="inline-flex items-center space-x-2 border border-[#C5A880]/30 bg-[#151514]/80 backdrop-blur-md px-4 py-1.5 mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880] animate-pulse" />
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#C5A880] font-medium">
            SWISS HOROLOGY & BOUTIQUE • EST. 1954
          </span>
        </div>

        {/* Large Editorial Headline */}
        <h1 className="font-serif text-5xl sm:text-7xl md:text-8xl lg:text-9xl text-[#F4F1E9] leading-none tracking-tight mb-6 font-light">
          TIME, CHOSEN WELL.
        </h1>

        {/* Short Editorial Subtext */}
        <p className="font-sans text-sm sm:text-base text-[#8A8A85] max-w-xl mx-auto font-light leading-relaxed mb-10 tracking-wide">
          An immersive boutique dedicated to rare mechanical complications, certified vintage references, and modern Swiss watchmaking mastery.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
          <button
            onClick={() => setActivePage('collection')}
            className="w-full sm:w-auto px-8 py-4 bg-[#C5A880] hover:bg-[#F4F1E9] text-[#0B0B0A] font-bold text-xs uppercase tracking-[0.25em] transition-all duration-300 shadow-xl flex items-center justify-center group"
          >
            <span>EXPLORE WATCHES</span>
            <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            onClick={() => setActivePage('luxury-suite')}
            className="w-full sm:w-auto px-8 py-4 bg-transparent border border-[#2A2A26] hover:border-[#C5A880] text-[#F4F1E9] hover:text-[#C5A880] text-xs uppercase tracking-[0.25em] transition-all duration-300 backdrop-blur-sm"
          >
            ENTER LUXURY SUITE
          </button>
        </div>

        {/* Subtle Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center space-y-2 text-[#8A8A85] animate-bounce">
          <span className="text-[9px] uppercase tracking-[0.3em]">SCROLL TO DISCOVER</span>
          <ArrowDown className="w-3.5 h-3.5 text-[#C5A880]" />
        </div>
      </div>
    </section>
  );
};
