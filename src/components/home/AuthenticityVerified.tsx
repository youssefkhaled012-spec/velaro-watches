import React from 'react';
import { Search, Eye, ShieldCheck, Truck } from 'lucide-react';

export const AuthenticityVerified: React.FC = () => {
  const steps = [
    {
      num: '01',
      title: 'SOURCED',
      desc: 'Acquired directly from Swiss manufacture distributors or verified first-owner vault collections.',
      icon: Search
    },
    {
      num: '02',
      title: 'INSPECTED',
      desc: 'Disassembled under 40x micro-magnification by certified horologists to verify serial serials and calibre movement teeth.',
      icon: Eye
    },
    {
      num: '03',
      title: 'VERIFIED',
      desc: 'Pressure tested to depth rating and timed on digital Witschi chronofacing equipment to ensure precision.',
      icon: ShieldCheck
    },
    {
      num: '04',
      title: 'DELIVERED',
      desc: 'Packaged in Azzam vault temperature-controlled casing and delivered via insured white-glove transport.',
      icon: Truck
    }
  ];

  return (
    <section className="bg-[#EAE6DC] text-[#151515] py-24 px-6 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 border-b border-[#D8D3C5] pb-6">
          <div>
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#8C7757] block mb-2 font-semibold">
              09 — TECHNICAL STANDARDS & AUDIT
            </span>
            <h2 className="font-serif text-4xl sm:text-6xl text-[#151515] tracking-tight">
              EVERY WATCH. VERIFIED.
            </h2>
          </div>
          <p className="text-xs text-[#555550] font-sans max-w-sm mt-4 md:mt-0 leading-relaxed font-normal">
            Four rigorous technical checkpoints enforced on every timepiece leaving the Azzam vault.
          </p>
        </div>

        {/* 4 Steps Container with Thin Connecting Line */}
        <div className="relative">
          {/* Thin Horizontal Connecting Line (Desktop) */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-[1px] bg-[#D8D3C5] -translate-y-6 z-0" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <div
                  key={idx}
                  className="bg-[#F3F0E8] border border-[#D8D3C5] p-8 flex flex-col justify-between hover:shadow-lg transition-shadow duration-300"
                >
                  <div>
                    <div className="flex justify-between items-center mb-6">
                      <span className="font-serif text-4xl font-bold text-[#8C7757]">
                        {step.num}
                      </span>
                      <div className="w-10 h-10 rounded-full bg-[#EAE6DC] border border-[#D8D3C5] flex items-center justify-center text-[#151515]">
                        <Icon className="w-5 h-5 stroke-[1.5]" />
                      </div>
                    </div>

                    <h3 className="font-serif text-2xl text-[#151515] tracking-wide mb-3 font-semibold">
                      {step.title}
                    </h3>
                    <p className="text-xs text-[#555550] font-sans leading-relaxed">
                      {step.desc}
                    </p>
                  </div>

                  <div className="mt-8 pt-4 border-t border-[#D8D3C5] text-[9px] uppercase tracking-widest text-[#8C7757] font-semibold">
                    AZZAM CERTIFIED AUDIT
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
