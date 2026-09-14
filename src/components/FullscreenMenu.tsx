import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { X, ArrowUpRight, PhoneCall, MapPin } from 'lucide-react';

export const FullscreenMenu: React.FC = () => {
  const { isMenuOpen, setIsMenuOpen, setActivePage, navigateToBrand, setFilters } = useShop();

  const [activeHoverImage, setActiveHoverImage] = useState<string>(
    'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&q=80&w=1200'
  );

  if (!isMenuOpen) return null;

  const menuItems = [
    {
      label: 'ALL TIMEPIECES',
      sub: 'Complete Watch Collection & Complications',
      action: () => { setActivePage('collection'); setIsMenuOpen(false); },
      image: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&q=80&w=1200'
    },
    {
      label: 'LUXURY SUITE',
      sub: 'Rare Complications & High Jewellery',
      action: () => { setActivePage('luxury-suite'); setIsMenuOpen(false); },
      image: 'https://images.unsplash.com/photo-1533139502658-0198f920d8e8?auto=format&fit=crop&q=80&w=1200'
    },
    {
      label: 'CERTIFIED PRE-OWNED',
      sub: 'Certified Provenance & Inspected',
      action: () => { setActivePage('pre-owned'); setIsMenuOpen(false); },
      image: 'https://images.unsplash.com/photo-1547996160-81dfa63595aa?auto=format&fit=crop&q=80&w=1200'
    },
    {
      label: 'BRANDS DIRECTORY',
      sub: 'Swiss & Japanese Watchmaking Houses',
      action: () => { navigateToBrand('TISSOT'); setIsMenuOpen(false); },
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=1200'
    },
    {
      label: 'VALERE HERITAGE',
      sub: 'Horological Legacy & Craftsmanship Since 1954',
      action: () => { setActivePage('story'); setIsMenuOpen(false); },
      image: 'https://images.unsplash.com/photo-1587836374828-4dbafa94cf0e?auto=format&fit=crop&q=80&w=1200'
    },
    {
      label: 'JOURNAL & ESSAYS',
      sub: 'Horology, Guides & Editorial',
      action: () => { setActivePage('journal'); setIsMenuOpen(false); },
      image: 'https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?auto=format&fit=crop&q=80&w=1200'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 bg-[#151514] text-[#F4F1E9] flex flex-col justify-between overflow-hidden animate-fadeIn">
      {/* Header Bar inside menu */}
      <div className="max-w-7xl mx-auto w-full px-6 py-6 flex items-center justify-between border-b border-[#2A2A26]">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 border border-[#C5A880] flex items-center justify-center text-[#C5A880]">
            <span className="font-serif text-lg font-bold">V</span>
          </div>
          <span className="font-serif text-xl tracking-[0.25em] font-semibold text-[#F4F1E9]">
            VALERE BOUTIQUE
          </span>
        </div>

        <button
          onClick={() => setIsMenuOpen(false)}
          className="p-3 border border-[#2A2A26] hover:border-[#C5A880] text-[#F4F1E9] hover:text-[#C5A880] transition-all flex items-center space-x-2 focus:outline-none"
        >
          <span className="text-[10px] uppercase tracking-widest">CLOSE</span>
          <X className="w-5 h-5 stroke-[1.5]" />
        </button>
      </div>

      {/* Main Content Grid */}
      <div className="max-w-7xl mx-auto w-full px-6 py-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center flex-1">
        {/* Left: Large Editorial Links */}
        <div className="lg:col-span-7 space-y-2">
          <p className="text-[10px] uppercase tracking-[0.3em] text-[#C5A880] mb-4">BOUTIQUE DIRECTORY</p>
          {menuItems.map((item, idx) => (
            <div
              key={idx}
              className="group border-b border-[#2A2A26]/60 py-3 transition-all hover:border-[#C5A880]"
              onMouseEnter={() => setActiveHoverImage(item.image)}
            >
              <button
                onClick={item.action}
                className="w-full flex items-baseline justify-between text-left focus:outline-none"
              >
                <div>
                  <span className="font-serif text-3xl sm:text-5xl uppercase tracking-wider text-[#F4F1E9]/80 group-hover:text-[#C5A880] transition-colors duration-300">
                    {item.label}
                  </span>
                  <span className="block text-xs text-[#8A8A85] tracking-widest mt-1 font-sans">
                    {item.sub}
                  </span>
                </div>
                <ArrowUpRight className="w-6 h-6 text-[#8A8A85] group-hover:text-[#C5A880] group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300 opacity-0 group-hover:opacity-100" />
              </button>
            </div>
          ))}
        </div>

        {/* Right: Dynamic Hover Image Preview */}
        <div className="hidden lg:block lg:col-span-5 relative h-[460px] border border-[#2A2A26] p-3 bg-[#0B0B0A]">
          <div className="w-full h-full relative overflow-hidden">
            <img
              src={activeHoverImage}
              alt="Valere Editorial Watch Preview"
              className="w-full h-full object-cover transition-all duration-700 brightness-90 contrast-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0A] via-transparent to-transparent opacity-80" />
            <div className="absolute bottom-6 left-6 right-6">
              <span className="text-[9px] uppercase tracking-[0.3em] text-[#C5A880] block mb-1">
                VALERE HOROLOGY ARCHIVE
              </span>
              <p className="font-serif text-lg text-[#F4F1E9] italic">
                “Craftsmanship preserved through decades of horological mastery.”
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Info Strip inside menu */}
      <div className="border-t border-[#2A2A26] bg-[#0B0B0A] py-6 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#8A8A85]">
          <div className="flex items-center space-x-6">
            <span className="flex items-center text-[#F4F1E9]">
              <MapPin className="w-3.5 h-3.5 text-[#C5A880] mr-1.5" />
              Cairo & Alexandria Showrooms
            </span>
            <span className="flex items-center text-[#F4F1E9]">
              <PhoneCall className="w-3.5 h-3.5 text-[#C5A880] mr-1.5" />
              VIP Concierge Desk: +20 (2) 19540
            </span>
          </div>

          <div className="text-[10px] uppercase tracking-widest text-[#8A8A85]">
            © {new Date().getFullYear()} VALERE WATCHES. ALL RIGHTS RESERVED.
          </div>
        </div>
      </div>
    </div>
  );
};
