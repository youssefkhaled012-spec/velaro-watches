import React from 'react';
import { useShop } from '../../context/ShopContext';
import { ArrowUpRight } from 'lucide-react';

export const FindYourTimepiece: React.FC = () => {
  const { navigateToCategory } = useShop();

  const categories = [
    {
      id: 'Automatic',
      name: 'AUTOMATIC',
      subtitle: 'Self-winding mechanical movements',
      image: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&q=80&w=1200',
      colSpan: 'lg:col-span-8',
      height: 'h-[360px]'
    },
    {
      id: 'Chronograph',
      name: 'CHRONOGRAPH',
      subtitle: 'Precision timing complications',
      image: 'https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?auto=format&fit=crop&q=80&w=1200',
      colSpan: 'lg:col-span-4',
      height: 'h-[360px]'
    },
    {
      id: 'Dress',
      name: 'DRESS',
      subtitle: 'Slim profiles & classic elegance',
      image: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&q=80&w=1200',
      colSpan: 'lg:col-span-4',
      height: 'h-[360px]'
    },
    {
      id: 'Sport',
      name: 'SPORT',
      subtitle: 'Robust diving & titanium cases',
      image: 'https://images.unsplash.com/photo-1547996160-81dfa63595aa?auto=format&fit=crop&q=80&w=1200',
      colSpan: 'lg:col-span-4',
      height: 'h-[360px]'
    },
    {
      id: 'Luxury',
      name: 'LUXURY SUITE',
      subtitle: 'Rare complications & collector references',
      image: 'https://images.unsplash.com/photo-1533139502658-0198f920d8e8?auto=format&fit=crop&q=80&w=1200',
      colSpan: 'lg:col-span-4',
      height: 'h-[360px]'
    }
  ];

  return (
    <section className="bg-[#0B0B0A] py-24 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 border-b border-[#2A2A26] pb-6">
          <div>
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#C5A880] block mb-2">
              03 — CURATED ARCHITECTURE
            </span>
            <h2 className="font-serif text-4xl sm:text-6xl text-[#F4F1E9] tracking-tight">
              FIND YOUR TIMEPIECE
            </h2>
          </div>
          <p className="text-xs text-[#8A8A85] font-sans max-w-sm mt-4 md:mt-0 leading-relaxed">
            Select by movement engineering, casing material, or aesthetic discipline.
          </p>
        </div>

        {/* Asymmetric Category Tiles Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {categories.map((cat) => (
            <div
              key={cat.id}
              onClick={() => navigateToCategory(cat.id)}
              className={`group relative ${cat.colSpan} ${cat.height} bg-[#151514] border border-[#2A2A26] hover:border-[#C5A880] transition-all duration-500 overflow-hidden cursor-pointer flex flex-col justify-end p-8`}
            >
              {/* Background Image */}
              <img
                src={cat.image}
                alt={cat.name}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-75 group-hover:brightness-90 contrast-110"
              />
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0A] via-[#0B0B0A]/40 to-transparent" />

              {/* Tile Content */}
              <div className="relative z-10 flex items-end justify-between">
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-[#C5A880] font-medium block mb-1">
                    DISCIPLINE
                  </span>
                  <h3 className="font-serif text-3xl sm:text-4xl text-[#F4F1E9] group-hover:text-[#C5A880] transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-[#8A8A85] font-sans mt-1">
                    {cat.subtitle}
                  </p>
                </div>

                <div className="w-10 h-10 rounded-full border border-[#2A2A26] group-hover:border-[#C5A880] bg-[#0B0B0A]/80 flex items-center justify-center text-[#F4F1E9] group-hover:text-[#C5A880] transition-all group-hover:scale-110">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
