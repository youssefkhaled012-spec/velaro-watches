import React from 'react';
import { Clock, History, Building2, Globe2 } from 'lucide-react';

export const HeritageTimeline: React.FC = () => {
  const milestoneList = [
    {
      year: '1954',
      title: 'FOUNDATION IN CAIRO',
      desc: 'Opened our first horology workshop specializing in mechanical pocket watches and Swiss imports.',
      icon: History
    },
    {
      year: '1982',
      title: 'REGIONAL EXPANSION',
      desc: 'Established relationships with major Swiss manufactures in Geneva & Le Locle.',
      icon: Building2
    },
    {
      year: '2008',
      title: 'CERTIFIED VAULT LAUNCH',
      desc: 'Introduced Egypt’s first dedicated certified pre-owned watch inspection lab.',
      icon: Clock
    },
    {
      year: 'TODAY',
      title: 'THE DIGITAL BOUTIQUE',
      desc: 'Combining luxury editorial art direction with private vault concierge fulfillment worldwide.',
      icon: Globe2
    }
  ];

  return (
    <section className="bg-[#0B0B0A] py-24 px-6 relative overflow-hidden border-t border-[#2A2A26]">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#C5A880] block mb-2 font-semibold">
            10 — SEVEN DECADES OF HOROLOGY
          </span>
          <h2 className="font-serif text-5xl sm:text-7xl text-[#F4F1E9] tracking-tight mb-4">
            A LEGACY MEASURED IN DECADES
          </h2>
          <p className="font-sans text-xs sm:text-sm text-[#8A8A85] max-w-xl mx-auto font-light">
            Founded in 1954. Continuously dedicated to fine watchmaking, authenticity verification, and collector stewardship.
          </p>
        </div>

        {/* Timeline Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
          {milestoneList.map((m, idx) => {
            const Icon = m.icon;
            return (
              <div
                key={idx}
                className="bg-[#151514] border border-[#2A2A26] hover:border-[#C5A880] p-8 flex flex-col justify-between transition-all duration-500 group"
              >
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <span className="font-serif text-4xl text-[#C5A880] font-bold">
                      {m.year}
                    </span>
                    <Icon className="w-5 h-5 text-[#8A8A85] group-hover:text-[#C5A880] transition-colors" />
                  </div>

                  <h3 className="font-serif text-xl text-[#F4F1E9] mb-2 tracking-wide group-hover:text-[#C5A880] transition-colors">
                    {m.title}
                  </h3>
                  <p className="text-xs text-[#8A8A85] font-sans leading-relaxed font-light">
                    {m.desc}
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-[#2A2A26] flex items-center space-x-2 text-[9px] uppercase tracking-widest text-[#8A8A85]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880]" />
                  <span>AZZAM ARCHIVE</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
