import React from 'react';
import { HeroScene } from '../components/home/HeroScene';
import { TrustBar } from '../components/home/TrustBar';
import { FindYourTimepiece } from '../components/home/FindYourTimepiece';
import { WatchFinderInteractive } from '../components/home/WatchFinderInteractive';
import { CuratedReferences } from '../components/home/CuratedReferences';
import { BrandStory } from '../components/home/BrandStory';
import { WatchmakersSection } from '../components/home/WatchmakersSection';
import { LuxurySuite } from '../components/home/LuxurySuite';
import { AuthenticityVerified } from '../components/home/AuthenticityVerified';
import { HeritageTimeline } from '../components/home/HeritageTimeline';
import { PreOwnedSection } from '../components/home/PreOwnedSection';
import { ReviewsSection } from '../components/home/ReviewsSection';
import { JournalSection } from '../components/home/JournalSection';
import { NewsletterFooter } from '../components/home/NewsletterFooter';

export const HomePage: React.FC = () => {
  return (
    <main className="w-full min-h-screen bg-[#0B0B0A] text-[#F4F1E9]">
      {/* 01 — HERO */}
      <HeroScene />

      {/* 02 — TRUST / BRAND STATEMENT */}
      <TrustBar />

      {/* 03 — FIND YOUR TIMEPIECE */}
      <FindYourTimepiece />

      {/* 04 — WATCH FINDER */}
      <WatchFinderInteractive />

      {/* 05 — CURATED REFERENCES */}
      <CuratedReferences />

      {/* 06 — VALERE STORY */}
      <BrandStory />

      {/* 07 — THE WORLD'S GREAT WATCHMAKERS */}
      <WatchmakersSection />

      {/* 08 — THE LUXURY SUITE */}
      <LuxurySuite />

      {/* 09 — EVERY WATCH. VERIFIED. */}
      <AuthenticityVerified />

      {/* 10 — A LEGACY MEASURED IN DECADES */}
      <HeritageTimeline />

      {/* 11 — SECOND LIFE. FIRST-CLASS (PRE-OWNED) */}
      <PreOwnedSection />

      {/* 12 — VERIFIED COLLECTOR EXPERIENCES */}
      <ReviewsSection />

      {/* 13 — THE AZZAM JOURNAL */}
      <JournalSection />

      {/* 14 & 15 — NEWSLETTER & FOOTER */}
      <NewsletterFooter />
    </main>
  );
};
