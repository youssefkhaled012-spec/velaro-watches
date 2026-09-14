import React from 'react';
import { useShop } from '../../context/ShopContext';
import { WATCHES_CATALOG } from '../../data/watchesData';
import { ShieldAlert, ArrowRight, Eye, PhoneCall } from 'lucide-react';

export const LuxurySuite: React.FC = () => {
  const { navigateToProduct, openConsultationModal, setActivePage } = useShop();

  const luxuryWatches = WATCHES_CATALOG.filter(w => w.isLuxurySuite || w.priceEgp >= 300000).slice(0, 3);

  return (
    <section className="bg-[#050505] border-y border-[#1A1A18] py-28 px-6 relative overflow-hidden">
      {/* Subtle Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-[#C5A880]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center space-x-2 border border-[#C5A880]/40 bg-[#0B0B0A] px-4 py-1.5 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880]" />
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#C5A880] font-semibold">
              08 — VAULT & PRIVATE SHOWROOM
            </span>
          </div>
          <h2 className="font-serif text-5xl sm:text-7xl text-[#F4F1E9] tracking-tight mb-4">
            THE LUXURY SUITE
          </h2>
          <p className="font-sans text-xs sm:text-sm text-[#8A8A85] tracking-wide max-w-xl mx-auto font-light">
            Exceptional timepieces for exceptional collections. High complications, rare vintage Grails, and verified vault references.
          </p>
        </div>

        {/* 3 Premium Watch Showroom Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {luxuryWatches.map((watch) => (
            <div
              key={watch.id}
              className="group bg-[#0B0B0A] border border-[#2A2A26] hover:border-[#C5A880] transition-all duration-700 p-6 flex flex-col justify-between"
            >
              <div>
                {/* Status Tag */}
                <div className="flex justify-between items-center mb-4 text-[9px] uppercase tracking-[0.25em]">
                  <span className="text-[#C5A880] bg-[#151514] border border-[#C5A880]/40 px-2.5 py-1">
                    {watch.isPreOwned ? 'CERTIFIED PRE-OWNED' : 'RARE & LIMITED'}
                  </span>
                  <span className="text-[#8A8A85]">{watch.movement}</span>
                </div>

                {/* Watch Media */}
                <div
                  className="w-full aspect-[4/5] bg-[#050505] overflow-hidden mb-6 cursor-pointer relative"
                  onClick={() => navigateToProduct(watch.id)}
                >
                  <img
                    src={watch.images[0]}
                    alt={watch.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-95 group-hover:brightness-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0A] via-transparent to-transparent opacity-40" />
                </div>

                {/* Details */}
                <span className="text-[10px] uppercase tracking-widest text-[#C5A880] block font-semibold">
                  {watch.brand}
                </span>
                <h3
                  onClick={() => navigateToProduct(watch.id)}
                  className="font-serif text-2xl text-[#F4F1E9] cursor-pointer hover:text-[#C5A880] transition-colors mb-2 line-clamp-1"
                >
                  {watch.name}
                </h3>
                <p className="text-xs text-[#8A8A85] font-sans line-clamp-2 mb-4 font-light">
                  {watch.description}
                </p>
              </div>

              {/* Price & Consultation Action */}
              <div className="pt-4 border-t border-[#2A2A26] space-y-3">
                <div className="flex justify-between items-baseline">
                  <span className="text-[9px] uppercase tracking-widest text-[#8A8A85]">PRICE ON REQUEST</span>
                  <span className="font-sans text-lg font-semibold text-[#F4F1E9]">
                    {new Intl.NumberFormat('en-EG', {
                      style: 'currency',
                      currency: 'EGP',
                      maximumFractionDigits: 0
                    }).format(watch.priceEgp)}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-2">
                  <button
                    onClick={() => navigateToProduct(watch.id)}
                    className="py-2.5 px-3 border border-[#2A2A26] hover:border-[#C5A880] text-[10px] uppercase tracking-widest text-[#F4F1E9] transition-colors"
                  >
                    SPECS
                  </button>
                  <button
                    onClick={() => openConsultationModal(watch)}
                    className="py-2.5 px-3 bg-[#C5A880] hover:bg-[#F4F1E9] text-[#0B0B0A] text-[10px] uppercase tracking-widest font-bold transition-colors flex items-center justify-center space-x-1"
                  >
                    <PhoneCall className="w-3 h-3 mr-1" />
                    CONSULT
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Callout Banner */}
        <div className="bg-[#0B0B0A] border border-[#2A2A26] p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h4 className="font-serif text-2xl text-[#F4F1E9]">SEEKING A SPECIFIC HIGH COMPLICATION?</h4>
            <p className="text-xs text-[#8A8A85] font-sans mt-1">
              Azzam private acquisition network accesses unlisted watch references across Switzerland and Dubai.
            </p>
          </div>

          <button
            onClick={() => setActivePage('luxury-suite')}
            className="px-8 py-4 bg-transparent border border-[#C5A880] text-[#C5A880] hover:bg-[#C5A880] hover:text-[#0B0B0A] text-xs uppercase tracking-[0.2em] font-bold transition-all whitespace-nowrap"
          >
            ENTER THE LUXURY SUITE
          </button>
        </div>
      </div>
    </section>
  );
};
