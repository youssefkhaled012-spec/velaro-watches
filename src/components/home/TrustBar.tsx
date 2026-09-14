import React from 'react';
import { ShieldCheck, Award, Lock, Truck, Clock } from 'lucide-react';

export const TrustBar: React.FC = () => {
  const trustItems = [
    { icon: ShieldCheck, title: 'AUTHENTIC TIMEPIECES', desc: '100% Guaranteed Provenance' },
    { icon: Award, title: 'SINCE 1954', desc: '70+ Years Horological Legacy' },
    { icon: Lock, title: 'SECURE PAYMENTS', desc: 'Encrypted & Installment Ready' },
    { icon: Clock, title: 'WARRANTY SUPPORT', desc: 'Up to 5 Years Full Coverage' },
    { icon: Truck, title: 'RELIABLE DELIVERY', desc: 'Insured White-Glove Shipping' }
  ];

  return (
    <section className="bg-[#151514] border-y border-[#2A2A26] py-8 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-5 gap-6">
        {trustItems.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className="flex items-center space-x-3 text-left border-r border-[#2A2A26] last:border-r-0 pr-4"
            >
              <div className="w-8 h-8 rounded-full bg-[#0B0B0A] border border-[#2A2A26] flex items-center justify-center text-[#C5A880] shrink-0">
                <Icon className="w-4 h-4 stroke-[1.5]" />
              </div>
              <div>
                <h4 className="text-[11px] uppercase tracking-[0.2em] font-semibold text-[#F4F1E9]">
                  {item.title}
                </h4>
                <p className="text-[10px] text-[#8A8A85] font-sans mt-0.5">{item.desc}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
