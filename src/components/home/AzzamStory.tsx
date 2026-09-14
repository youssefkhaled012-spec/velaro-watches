import React from 'react';
import { useShop } from '../../context/ShopContext';
import { ArrowRight, Compass } from 'lucide-react';

export const AzzamStory: React.FC = () => {
  const { setActivePage } = useShop();

  return (
    <section className="bg-[#151514] border-y border-[#2A2A26] py-24 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left: Macro Mechanical Watch Imagery Spread */}
        <div className="lg:col-span-6 relative">
          <div className="relative aspect-[4/5] bg-[#0B0B0A] border border-[#2A2A26] p-3">
            <img
              src="https://images.unsplash.com/photo-1587836374828-4dbafa94cf0e?auto=format&fit=crop&q=80&w=1200"
              alt="Azzam Mechanical Watch Craftsmanship"
              className="w-full h-full object-cover brightness-95 contrast-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0A] via-transparent to-transparent opacity-60" />
            
            {/* Small Floating Technical Stamp */}
            <div className="absolute bottom-8 left-8 bg-[#0B0B0A]/90 border border-[#C5A880]/40 p-4 max-w-xs backdrop-blur-md">
              <span className="text-[9px] uppercase tracking-[0.3em] text-[#C5A880] block mb-1">
                EXCELLENCE SINCE 1954
              </span>
              <p className="font-serif text-sm text-[#F4F1E9] italic">
                “Every tooth on every wheel serves a singular purpose: absolute accuracy.”
              </p>
            </div>
          </div>
        </div>

        {/* Right: Editorial Narrative Content */}
        <div className="lg:col-span-6 space-y-6">
          <div className="inline-flex items-center space-x-2 text-[10px] uppercase tracking-[0.3em] text-[#C5A880]">
            <Compass className="w-3.5 h-3.5" />
            <span>06 — HERITAGE & PHILOSOPHY</span>
          </div>

          <h2 className="font-serif text-4xl sm:text-6xl text-[#F4F1E9] leading-tight">
            THE SOUL IS IN THE DETAILS.
          </h2>

          <p className="font-sans text-sm text-[#8A8A85] leading-relaxed font-light">
            Founded in 1954, Azzam Watches established its foundation on a singular conviction: that a timepiece is not merely an instrument for recording hours, but a living testament to human engineering and aesthetic passion.
          </p>

          <p className="font-sans text-sm text-[#8A8A85] leading-relaxed font-light">
            Across seven decades, our boutique has curated the finest references from Geneva, Le Locle, and Shizukuishi—bringing together authorized Swiss manufacturing with rare vault acquisitions.
          </p>

          <div className="pt-4 border-t border-[#2A2A26] flex items-center justify-between">
            <div>
              <span className="font-serif text-2xl text-[#C5A880]">1954</span>
              <span className="text-[10px] uppercase tracking-widest text-[#8A8A85] block">FOUNDING YEAR</span>
            </div>
            <div>
              <span className="font-serif text-2xl text-[#C5A880]">100%</span>
              <span className="text-[10px] uppercase tracking-widest text-[#8A8A85] block">VERIFIED PROVENANCE</span>
            </div>
            <div>
              <span className="font-serif text-2xl text-[#C5A880]">5-YEAR</span>
              <span className="text-[10px] uppercase tracking-widest text-[#8A8A85] block">VAULT WARRANTY</span>
            </div>
          </div>

          <div className="pt-6">
            <button
              onClick={() => setActivePage('story')}
              className="px-8 py-4 bg-[#C5A880] hover:bg-[#F4F1E9] text-[#0B0B0A] font-bold text-xs uppercase tracking-[0.25em] transition-all flex items-center space-x-2"
            >
              <span>DISCOVER OUR STORY</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
