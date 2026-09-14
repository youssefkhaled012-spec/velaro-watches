import React from 'react';
import { WATCHES_CATALOG } from '../../data/watchesData';
import { ProductCard } from '../ProductCard';
import { useShop } from '../../context/ShopContext';
import { ArrowRight } from 'lucide-react';

export const CuratedReferences: React.FC = () => {
  const { setActivePage } = useShop();

  const featuredWatch = WATCHES_CATALOG[0]; // Tissot PRX
  const sideWatches = [WATCHES_CATALOG[1], WATCHES_CATALOG[2]]; // Longines & Seiko
  const secondFeatured = WATCHES_CATALOG[3]; // Rado Captain Cook
  const secondSide = [WATCHES_CATALOG[6], WATCHES_CATALOG[7]]; // Omega & Grand Seiko

  return (
    <section className="bg-[#0B0B0A] py-24 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 border-b border-[#2A2A26] pb-6">
          <div>
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#C5A880] block mb-2">
              05 — HOROLOGICAL SELECTION
            </span>
            <h2 className="font-serif text-4xl sm:text-6xl text-[#F4F1E9]">
              CURATED REFERENCES
            </h2>
          </div>

          <button
            onClick={() => setActivePage('collection')}
            className="text-xs uppercase tracking-widest text-[#C5A880] hover:text-[#F4F1E9] flex items-center mt-4 md:mt-0 transition-colors"
          >
            VIEW ENTIRE CATALOGUE <ArrowRight className="w-4 h-4 ml-1.5" />
          </button>
        </div>

        {/* First Editorial Composition Spread: 1 Large + 2 Smaller */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          {/* Large Hero Card */}
          <div className="lg:col-span-7">
            <ProductCard product={featuredWatch} layout="editorial" />
          </div>

          {/* 2 Smaller Side Cards */}
          <div className="lg:col-span-5 grid grid-cols-1 gap-8">
            {sideWatches.map((watch) => (
              <ProductCard key={watch.id} product={watch} />
            ))}
          </div>
        </div>

        {/* Second Editorial Composition Spread: 2 Smaller + 1 Large */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-5 grid grid-cols-1 gap-8">
            {secondSide.map((watch) => (
              <ProductCard key={watch.id} product={watch} />
            ))}
          </div>

          <div className="lg:col-span-7">
            <ProductCard product={secondFeatured} layout="editorial" />
          </div>
        </div>
      </div>
    </section>
  );
};
