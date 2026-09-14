import React from 'react';
import { REVIEWS_LIST } from '../../data/watchesData';
import { Star, Quote, ShieldCheck } from 'lucide-react';

export const ReviewsSection: React.FC = () => {
  return (
    <section className="bg-[#0B0B0A] py-24 px-6 relative overflow-hidden border-b border-[#2A2A26]">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#C5A880] block mb-2 font-semibold">
            12 — COLLECTOR TESTIMONIALS
          </span>
          <h2 className="font-serif text-4xl sm:text-6xl text-[#F4F1E9] tracking-tight mb-4">
            VERIFIED COLLECTOR EXPERIENCES
          </h2>
          <p className="font-sans text-xs sm:text-sm text-[#8A8A85]">
            Reflections from watch collectors, architects, and horology enthusiasts across Egypt and the MENA region.
          </p>
        </div>

        {/* 3 Review Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {REVIEWS_LIST.map((rev) => (
            <div
              key={rev.id}
              className="bg-[#151514] border border-[#2A2A26] p-8 flex flex-col justify-between relative group hover:border-[#C5A880]/60 transition-all duration-500"
            >
              <Quote className="w-8 h-8 text-[#C5A880]/20 absolute top-6 right-6" />

              <div>
                {/* Rating Stars */}
                <div className="flex items-center space-x-1 mb-6 text-[#C5A880]">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>

                {/* Review Text */}
                <p className="font-serif text-lg text-[#F4F1E9] italic leading-relaxed mb-6">
                  “{rev.comment}”
                </p>
              </div>

              <div className="pt-6 border-t border-[#2A2A26]">
                <div className="flex justify-between items-end">
                  <div>
                    <h4 className="font-serif text-base text-[#F4F1E9] font-medium tracking-wide">
                      {rev.name}
                    </h4>
                    <span className="text-[9px] uppercase tracking-widest text-[#C5A880] block">
                      {rev.title} • {rev.location}
                    </span>
                  </div>
                  <ShieldCheck className="w-4 h-4 text-[#C5A880]" />
                </div>

                <div className="mt-3 pt-3 border-t border-[#2A2A26]/50 flex justify-between text-[9px] text-[#8A8A85] uppercase tracking-wider">
                  <span>ACQUIRED: {rev.watchPurchased}</span>
                  <span>{rev.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
