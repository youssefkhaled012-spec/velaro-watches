import React from 'react';
import { JournalSection } from '../components/home/JournalSection';
import { NewsletterFooter } from '../components/home/NewsletterFooter';

export const JournalPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#0B0B0A] text-[#F4F1E9] pt-28">
      <div className="max-w-7xl mx-auto px-6 py-12 border-b border-[#2A2A26]">
        <span className="text-[10px] uppercase tracking-[0.3em] text-[#C5A880] block mb-2 font-semibold">
          AZZAM EDITORIAL PUBLICATION
        </span>
        <h1 className="font-serif text-5xl sm:text-7xl text-[#F4F1E9] tracking-tight mb-4">
          HOROLOGY & GUIDES
        </h1>
        <p className="text-xs text-[#8A8A85] font-sans max-w-xl leading-relaxed">
          Deep-dives into mechanical complications, provenance verification, silicon balance springs, and market analysis.
        </p>
      </div>

      <JournalSection />
      <NewsletterFooter />
    </div>
  );
};
