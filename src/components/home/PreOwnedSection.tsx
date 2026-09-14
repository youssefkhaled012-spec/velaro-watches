import React from 'react';
import { useShop } from '../../context/ShopContext';
import { WATCHES_CATALOG } from '../../data/watchesData';
import { ShieldCheck, ArrowRight, CheckCircle2 } from 'lucide-react';

export const PreOwnedSection: React.FC = () => {
  const { navigateToProduct, setActivePage, setFilters } = useShop();

  const preOwnedWatches = WATCHES_CATALOG.filter(w => w.isPreOwned || w.condition).slice(0, 3);

  const handleExplorePreOwned = () => {
    setFilters(prev => ({ ...prev, condition: 'Pre-Owned' }));
    setActivePage('collection');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="bg-[#151514] border-y border-[#2A2A26] py-24 px-6 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 border-b border-[#2A2A26] pb-6">
          <div>
            <div className="inline-flex items-center space-x-2 text-[10px] uppercase tracking-[0.3em] text-[#C5A880] mb-2 font-semibold">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>11 — CERTIFIED PRE-OWNED</span>
            </div>
            <h2 className="font-serif text-4xl sm:text-6xl text-[#F4F1E9] tracking-tight">
              SECOND LIFE. FIRST-CLASS.
            </h2>
          </div>

          <button
            onClick={handleExplorePreOwned}
            className="text-xs uppercase tracking-widest text-[#C5A880] hover:text-[#F4F1E9] flex items-center mt-4 md:mt-0 transition-colors"
          >
            EXPLORE PRE-OWNED VAULT <ArrowRight className="w-4 h-4 ml-1.5" />
          </button>
        </div>

        {/* 3 Pre-Owned Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {preOwnedWatches.map((watch) => (
            <div
              key={watch.id}
              className="bg-[#0B0B0A] border border-[#2A2A26] hover:border-[#C5A880] transition-all duration-500 p-6 flex flex-col justify-between group"
            >
              <div>
                {/* Media */}
                <div
                  className="w-full aspect-square bg-[#151514] overflow-hidden mb-6 cursor-pointer relative"
                  onClick={() => navigateToProduct(watch.id)}
                >
                  <img
                    src={watch.images[0]}
                    alt={watch.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-95"
                  />
                  <div className="absolute top-3 left-3 bg-[#151514] border border-[#C5A880] text-[#C5A880] text-[9px] uppercase tracking-widest px-2.5 py-1 font-bold">
                    CERTIFIED PRE-OWNED
                  </div>
                </div>

                <span className="text-[10px] uppercase tracking-widest text-[#C5A880] block font-semibold">
                  {watch.brand}
                </span>
                <h3
                  onClick={() => navigateToProduct(watch.id)}
                  className="font-serif text-2xl text-[#F4F1E9] cursor-pointer hover:text-[#C5A880] transition-colors mb-4 line-clamp-1"
                >
                  {watch.name}
                </h3>

                {/* Pre-owned specific parameters */}
                <div className="bg-[#151514] p-4 border border-[#2A2A26] space-y-2 text-xs text-[#8A8A85] mb-4">
                  <div className="flex justify-between">
                    <span className="text-[10px] uppercase tracking-wider text-[#8A8A85]">CONDITION</span>
                    <span className="text-[#F4F1E9] font-medium">{watch.condition || 'Mint 98%'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[10px] uppercase tracking-wider text-[#8A8A85]">PRODUCTION YEAR</span>
                    <span className="text-[#F4F1E9] font-medium">{watch.year || 2022}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[10px] uppercase tracking-wider text-[#8A8A85]">PROVENANCE</span>
                    <span className="text-[#C5A880] font-medium">{watch.boxAndPapers || 'Original Box & Papers'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[10px] uppercase tracking-wider text-[#8A8A85]">WARRANTY</span>
                    <span className="text-[#F4F1E9] font-medium">{watch.warrantyYears} Years Azzam Vault</span>
                  </div>
                </div>
              </div>

              {/* Price & Action */}
              <div className="pt-4 border-t border-[#2A2A26] flex items-center justify-between">
                <div>
                  <span className="text-[9px] uppercase tracking-widest text-[#8A8A85] block">PRICE</span>
                  <span className="font-sans text-base font-semibold text-[#F4F1E9]">
                    {new Intl.NumberFormat('en-EG', {
                      style: 'currency',
                      currency: 'EGP',
                      maximumFractionDigits: 0
                    }).format(watch.priceEgp)}
                  </span>
                </div>

                <button
                  onClick={() => navigateToProduct(watch.id)}
                  className="px-4 py-2 bg-[#C5A880] hover:bg-[#F4F1E9] text-[#0B0B0A] text-[10px] uppercase tracking-widest font-bold transition-colors"
                >
                  VIEW WATCH
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
