import React from 'react';
import { BrandStory } from '../components/home/BrandStory';
import { HeritageTimeline } from '../components/home/HeritageTimeline';
import { AuthenticityVerified } from '../components/home/AuthenticityVerified';
import { FooterVelaro } from '../components/FooterVelaro';

export const StoryPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#0B0B0A] text-[#F4F1E9] pt-28">
      <div className="max-w-7xl mx-auto px-6 py-12 border-b border-[#2A2A26]">
        <span className="text-[10px] uppercase tracking-[0.3em] text-[#C5A880] block mb-2 font-semibold">
          70 YEARS OF HOROLOGICAL LEGACY
        </span>
        <h1 className="font-serif text-5xl sm:text-7xl text-[#F4F1E9] tracking-tight mb-4">
          THE VELARO STORY
        </h1>
        <p className="text-xs text-[#8A8A85] font-sans max-w-xl leading-relaxed">
          Discover the boutique's approach to fine watchmaking, vintage provenance, and technical craftsmanship.
        </p>
      </div>

      <BrandStory />
      <HeritageTimeline />
      <AuthenticityVerified />
      <FooterVelaro />
    </div>
  );
};
