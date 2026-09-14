import React, { useState } from 'react';
import { BRANDS_CATALOG } from '../../data/watchesData';
import { useShop } from '../../context/ShopContext';
import { ArrowUpRight } from 'lucide-react';

export const WatchmakersSection: React.FC = () => {
  const { navigateToBrand } = useShop();

  const [activeBrandImg, setActiveBrandImg] = useState<string>(
    BRANDS_CATALOG[0].previewImage
  );
  const [activeTagline, setActiveTagline] = useState<string>(
    BRANDS_CATALOG[0].tagline
  );

  return (
    <section className="bg-[#0B0B0A] py-24 px-6 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 border-b border-[#2A2A26] pb-6">
          <div>
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#C5A880] block mb-2">
              07 — MAISONS DE HAUTE HORLOGERIE
            </span>
            <h2 className="font-serif text-4xl sm:text-6xl text-[#F4F1E9]">
              THE WORLD’S GREAT WATCHMAKERS
            </h2>
          </div>
          <p className="text-xs text-[#8A8A85] font-sans max-w-sm mt-4 md:mt-0">
            Official authorized references and authenticated vault models.
          </p>
        </div>

        {/* Brand Typographic List & Hover Preview Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left: Large Typography Brands Wall */}
          <div className="lg:col-span-7 space-y-3">
            {BRANDS_CATALOG.map((brand) => (
              <div
                key={brand.name}
                onMouseEnter={() => {
                  setActiveBrandImg(brand.previewImage);
                  setActiveTagline(`${brand.tagline} • ${brand.origin}`);
                }}
                onClick={() => navigateToBrand(brand.name)}
                className="group border-b border-[#2A2A26] py-3 cursor-pointer transition-colors hover:border-[#C5A880] flex items-center justify-between"
              >
                <div>
                  <span className="font-serif text-3xl sm:text-5xl uppercase tracking-wider text-[#F4F1E9]/70 group-hover:text-[#C5A880] transition-colors duration-300">
                    {brand.name}
                  </span>
                  <span className="block text-[10px] uppercase tracking-widest text-[#8A8A85] font-sans mt-0.5">
                    {brand.origin} • EST. {brand.founded}
                  </span>
                </div>

                <ArrowUpRight className="w-6 h-6 text-[#8A8A85] group-hover:text-[#C5A880] group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300 opacity-0 group-hover:opacity-100" />
              </div>
            ))}
          </div>

          {/* Right: Dynamic Hover Watch Preview Card */}
          <div className="lg:col-span-5 relative h-[480px] bg-[#151514] border border-[#2A2A26] p-4 flex flex-col justify-between overflow-hidden">
            <div className="relative w-full h-full overflow-hidden border border-[#2A2A26]">
              <img
                src={activeBrandImg}
                alt="Azzam Watchmaker Preview"
                className="w-full h-full object-cover transition-all duration-700 brightness-90 contrast-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0A] via-transparent to-transparent opacity-80" />
              <div className="absolute bottom-6 left-6 right-6">
                <span className="text-[9px] uppercase tracking-[0.3em] text-[#C5A880] block mb-1">
                  HOUSE PHILOSOPHY
                </span>
                <p className="font-serif text-xl text-[#F4F1E9] italic">
                  “{activeTagline}”
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
