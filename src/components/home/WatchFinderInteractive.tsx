import React, { useState } from 'react';
import { useShop } from '../../context/ShopContext';
import { Sparkles, SlidersHorizontal, ArrowRight, Check } from 'lucide-react';
import { BRANDS_CATALOG } from '../../data/watchesData';

export const WatchFinderInteractive: React.FC = () => {
  const { setFilters, setActivePage } = useShop();

  const [recipient, setRecipient] = useState<'Myself' | 'Gift'>('Myself');
  const [style, setStyle] = useState<string>('Classic');
  const [movement, setMovement] = useState<string>('Automatic');
  const [maxBudgetEgp, setMaxBudgetEgp] = useState<number>(300000);
  const [selectedBrand, setSelectedBrand] = useState<string>('');

  const handleSearchTrigger = () => {
    setFilters(prev => ({
      ...prev,
      movement: movement === 'Any' ? '' : movement,
      brand: selectedBrand,
      maxPrice: maxBudgetEgp
    }));
    setActivePage('collection');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="bg-[#151514] border-y border-[#2A2A26] py-24 px-6 relative overflow-hidden">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 text-[10px] uppercase tracking-[0.3em] text-[#C5A880] mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>04 — PRIVATE CONCIERGE</span>
          </div>
          <h2 className="font-serif text-4xl sm:text-6xl text-[#F4F1E9] mb-4">
            FIND YOUR PERFECT WATCH
          </h2>
          <p className="text-xs text-[#8A8A85] font-sans leading-relaxed">
            Answer a few quick specifications to let our concierge tailor your recommendation.
          </p>
        </div>

        {/* Interactive Wizard Card */}
        <div className="bg-[#0B0B0A] border border-[#C5A880]/40 p-8 sm:p-12 shadow-2xl space-y-10 relative">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Step 1: Who is it for */}
            <div>
              <label className="block text-[10px] uppercase tracking-[0.25em] text-[#C5A880] mb-3 font-semibold">
                01. WHO IS IT FOR?
              </label>
              <div className="grid grid-cols-2 gap-3">
                {['Myself', 'Gift'].map((opt) => (
                  <button
                    key={opt}
                    onClick={() => setRecipient(opt as 'Myself' | 'Gift')}
                    className={`py-3 px-4 border text-xs uppercase tracking-widest font-medium transition-all ${
                      recipient === opt
                        ? 'border-[#C5A880] bg-[#C5A880]/10 text-[#C5A880]'
                        : 'border-[#2A2A26] bg-[#151514] text-[#8A8A85] hover:border-[#8A8A85]'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Movement Preference */}
            <div>
              <label className="block text-[10px] uppercase tracking-[0.25em] text-[#C5A880] mb-3 font-semibold">
                02. MECHANICAL MOVEMENT
              </label>
              <div className="grid grid-cols-4 gap-2">
                {['Automatic', 'Quartz', 'Solar', 'Any'].map((mvt) => (
                  <button
                    key={mvt}
                    onClick={() => setMovement(mvt)}
                    className={`py-3 px-2 border text-[10px] uppercase tracking-wider font-medium text-center transition-all ${
                      movement === mvt
                        ? 'border-[#C5A880] bg-[#C5A880]/10 text-[#C5A880]'
                        : 'border-[#2A2A26] bg-[#151514] text-[#8A8A85] hover:border-[#8A8A85]'
                    }`}
                  >
                    {mvt}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: Aesthetic Style */}
            <div>
              <label className="block text-[10px] uppercase tracking-[0.25em] text-[#C5A880] mb-3 font-semibold">
                03. AESTHETIC STYLE
              </label>
              <div className="flex flex-wrap gap-2">
                {['Classic', 'Sport', 'Minimal', 'Luxury', 'Everyday'].map((st) => (
                  <button
                    key={st}
                    onClick={() => setStyle(st)}
                    className={`py-2 px-3 border text-xs uppercase tracking-widest transition-all ${
                      style === st
                        ? 'border-[#C5A880] bg-[#C5A880]/10 text-[#C5A880]'
                        : 'border-[#2A2A26] bg-[#151514] text-[#8A8A85] hover:border-[#8A8A85]'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 4: Preferred Brand */}
            <div>
              <label className="block text-[10px] uppercase tracking-[0.25em] text-[#C5A880] mb-3 font-semibold">
                04. PREFERRED WATCHMAKER (OPTIONAL)
              </label>
              <select
                value={selectedBrand}
                onChange={(e) => setSelectedBrand(e.target.value)}
                className="w-full bg-[#151514] border border-[#2A2A26] focus:border-[#C5A880] px-4 py-2.5 text-xs text-[#F4F1E9] focus:outline-none uppercase tracking-widest"
              >
                <option value="">ALL WATCHMAKER BRANDS</option>
                {BRANDS_CATALOG.map((b) => (
                  <option key={b.name} value={b.name}>
                    {b.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Step 5: Budget Range Slider */}
          <div className="pt-4 border-t border-[#2A2A26]">
            <div className="flex justify-between items-center mb-3">
              <label className="text-[10px] uppercase tracking-[0.25em] text-[#C5A880] font-semibold">
                05. BUDGET CAP (EGP)
              </label>
              <span className="font-serif text-xl text-[#F4F1E9]">
                {new Intl.NumberFormat('en-EG', {
                  style: 'currency',
                  currency: 'EGP',
                  maximumFractionDigits: 0
                }).format(maxBudgetEgp)}
              </span>
            </div>
            <input
              type="range"
              min={30000}
              max={1000000}
              step={10000}
              value={maxBudgetEgp}
              onChange={(e) => setMaxBudgetEgp(Number(e.target.value))}
              className="w-full h-1 bg-[#2A2A26] rounded-lg appearance-none cursor-pointer accent-[#C5A880]"
            />
            <div className="flex justify-between text-[9px] text-[#8A8A85] mt-2 font-mono">
              <span>EGP 30,000</span>
              <span>EGP 500,000</span>
              <span>EGP 1,000,000+</span>
            </div>
          </div>

          {/* Submit Trigger */}
          <div className="pt-4 flex justify-center">
            <button
              onClick={handleSearchTrigger}
              className="w-full sm:w-auto px-12 py-4 bg-[#C5A880] hover:bg-[#F4F1E9] text-[#0B0B0A] font-bold text-xs uppercase tracking-[0.25em] transition-colors flex items-center justify-center space-x-3"
            >
              <span>SHOW MY MATCHING WATCHES</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
