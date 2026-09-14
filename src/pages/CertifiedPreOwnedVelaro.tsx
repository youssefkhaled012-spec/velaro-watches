import { isPreOwned } from '../data/catalog';
import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { VELARO_PRODUCTS } from '../data/velaroData';
import { ProductCardVelaro } from '../components/ProductCardVelaro';
import { ShieldCheck, Award, CheckCircle2, Search, Cpu, Lock, Sparkles, SlidersHorizontal, RotateCcw } from 'lucide-react';

export const CertifiedPreOwnedVelaro: React.FC = () => {
  const { openAuthenticityReport, formatPrice, setIsSellTradeModalOpen } = useShop();
  const [selectedBrand, setSelectedBrand] = useState<string>('all');

  // Filter certified pre-owned watches
  const cpoWatches = VELARO_PRODUCTS.filter(p => {
    if (!isPreOwned(p)) return false;
    if (selectedBrand === 'all') return true;
    return p.brand.toLowerCase() === selectedBrand.toLowerCase();
  });

  return (
    <div className="min-h-screen bg-[#080808] text-[#F5F5F5] pt-24 pb-24">
      {/* Hero Banner */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-12 bg-gradient-to-b from-[#111111] to-[#080808] border-b border-white/10 overflow-hidden">
        <div className="absolute right-0 top-0 w-1/3 h-full bg-[#C6A15B]/5 blur-3xl pointer-events-none"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="max-w-3xl">
            <span className="text-xs font-mono text-[#C6A15B] uppercase tracking-widest block mb-3 flex items-center gap-2">
              <ShieldCheck size={16} /> VELARO CERTIFIED PRE-OWNED (CPO)
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-white font-normal leading-tight tracking-tight">
              Absolute Authenticity. <br />
              Uncompromising Standards.
            </h1>
            <p className="text-base text-[#A5A5A5] mt-6 leading-relaxed">
              Every pre-owned timepiece in the VELARO Vault undergoes a 6-point physical, mechanical, and laser inspection by our Swiss-trained master watchmakers. Accompanied by a 5-year international warranty and cryptographic digital passport.
            </p>

            <div className="flex flex-wrap gap-4 mt-8">
              <button
                onClick={() => setIsSellTradeModalOpen(true)}
                className="bg-[#C6A15B] hover:bg-[#b08d4b] text-black text-xs font-semibold uppercase tracking-widest px-6 py-3.5 rounded-sm transition-all"
              >
                Sell or Trade Your Timepiece
              </button>
              <button
                onClick={() => {
                  const el = document.getElementById('cpo-catalog');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="bg-[#161616] hover:bg-white/10 border border-white/10 text-white text-xs uppercase tracking-widest px-6 py-3.5 rounded-sm transition-all"
              >
                Browse CPO Inventory
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* The 6-Step Verification Protocol */}
      <section className="py-20 px-4 sm:px-6 lg:px-12 border-b border-white/10 bg-[#0B0B0B]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-mono text-[#C6A15B] uppercase tracking-widest block mb-2">RIGOROUS CERTIFICATION</span>
            <h2 className="font-serif text-3xl sm:text-4xl text-white">The VELARO 6-Point Inspection Protocol</h2>
            <p className="text-xs text-[#A5A5A5] mt-3">We accept fewer than 12% of timepieces submitted to our acquisition desk.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-[#111111] p-6 rounded-sm border border-white/10 hover:border-[#C6A15B]/40 transition-all">
              <div className="w-12 h-12 bg-[#161616] rounded-sm border border-white/10 flex items-center justify-center text-[#C6A15B] mb-5">
                <Search size={22} />
              </div>
              <span className="text-[10px] font-mono text-[#C6A15B] uppercase tracking-widest">STEP 01</span>
              <h3 className="font-serif text-lg text-white mt-1">Laser Serial & Provenance Audit</h3>
              <p className="text-xs text-[#A5A5A5] mt-2 leading-relaxed">
                Deep infrared microscopic examination of serial and model engravings against stolen watch databases and manufacture registry archives.
              </p>
            </div>

            <div className="bg-[#111111] p-6 rounded-sm border border-white/10 hover:border-[#C6A15B]/40 transition-all">
              <div className="w-12 h-12 bg-[#161616] rounded-sm border border-white/10 flex items-center justify-center text-[#C6A15B] mb-5">
                <Cpu size={22} />
              </div>
              <span className="text-[10px] font-mono text-[#C6A15B] uppercase tracking-widest">STEP 02</span>
              <h3 className="font-serif text-lg text-white mt-1">Caliber & Movement Deconstruction</h3>
              <p className="text-xs text-[#A5A5A5] mt-2 leading-relaxed">
                Full movement casing removal. Verification of gear train originality, balance spring integrity, and lubricant freshness under 40x magnification.
              </p>
            </div>

            <div className="bg-[#111111] p-6 rounded-sm border border-white/10 hover:border-[#C6A15B]/40 transition-all">
              <div className="w-12 h-12 bg-[#161616] rounded-sm border border-white/10 flex items-center justify-center text-[#C6A15B] mb-5">
                <SlidersHorizontal size={22} />
              </div>
              <span className="text-[10px] font-mono text-[#C6A15B] uppercase tracking-widest">STEP 03</span>
              <h3 className="font-serif text-lg text-white mt-1">Witschi Timing Calibration</h3>
              <p className="text-xs text-[#A5A5A5] mt-2 leading-relaxed">
                Digital timing machine diagnosis across 5 positions. Amplitude, beat error, and daily rate calibrated strictly within -2 to +2 seconds/day.
              </p>
            </div>

            <div className="bg-[#111111] p-6 rounded-sm border border-white/10 hover:border-[#C6A15B]/40 transition-all">
              <div className="w-12 h-12 bg-[#161616] rounded-sm border border-white/10 flex items-center justify-center text-[#C6A15B] mb-5">
                <Lock size={22} />
              </div>
              <span className="text-[10px] font-mono text-[#C6A15B] uppercase tracking-widest">STEP 04</span>
              <h3 className="font-serif text-lg text-white mt-1">Pressure Chamber Waterproofing</h3>
              <p className="text-xs text-[#A5A5A5] mt-2 leading-relaxed">
                Multi-atmosphere wet and dry pressure testing ensuring gasket seals meet or exceed original factory depth specifications.
              </p>
            </div>

            <div className="bg-[#111111] p-6 rounded-sm border border-white/10 hover:border-[#C6A15B]/40 transition-all">
              <div className="w-12 h-12 bg-[#161616] rounded-sm border border-white/10 flex items-center justify-center text-[#C6A15B] mb-5">
                <Sparkles size={22} />
              </div>
              <span className="text-[10px] font-mono text-[#C6A15B] uppercase tracking-widest">STEP 05</span>
              <h3 className="font-serif text-lg text-white mt-1">Case Refinement & Grading</h3>
              <p className="text-xs text-[#A5A5A5] mt-2 leading-relaxed">
                Non-destructive sonic cleaning. Surface finishing preserves sharp original bevels without over-polishing or altering case geometry.
              </p>
            </div>

            <div className="bg-[#111111] p-6 rounded-sm border border-white/10 hover:border-[#C6A15B]/40 transition-all">
              <div className="w-12 h-12 bg-[#161616] rounded-sm border border-white/10 flex items-center justify-center text-[#C6A15B] mb-5">
                <Award size={22} />
              </div>
              <span className="text-[10px] font-mono text-[#C6A15B] uppercase tracking-widest">STEP 06</span>
              <h3 className="font-serif text-lg text-white mt-1">5-Year Warranty & Vault Pass</h3>
              <p className="text-xs text-[#A5A5A5] mt-2 leading-relaxed">
                Issuance of the VELARO Cryptographic Digital Passport and 5-Year Comprehensive International Service & Movement Guarantee.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Catalog Section */}
      <section id="cpo-catalog" className="py-20 px-4 sm:px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 pb-6 border-b border-white/10">
            <div>
              <span className="text-xs font-mono text-[#C6A15B] uppercase tracking-widest block mb-2">INSPECTED & READY TO SHIP</span>
              <h2 className="font-serif text-3xl sm:text-4xl text-white">Certified Pre-Owned Vault</h2>
            </div>

            {/* Brand Filter Selector */}
            <div className="flex items-center gap-2 overflow-x-auto scrollbar-none">
              {['all', ...new Set(VELARO_PRODUCTS.filter(isPreOwned).map(p => p.brand))].map(brand => (
                <button
                  key={brand}
                  onClick={() => setSelectedBrand(brand)}
                  className={`px-4 py-2 text-xs font-mono uppercase tracking-wider rounded-sm transition-all whitespace-nowrap ${
                    selectedBrand === brand
                      ? 'bg-[#C6A15B] text-black font-bold'
                      : 'bg-[#111111] text-[#A5A5A5] hover:text-white border border-white/10'
                  }`}
                >
                  {brand}
                </button>
              ))}
            </div>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {cpoWatches.map(product => (
              <ProductCardVelaro key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
