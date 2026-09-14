import React, { useState } from 'react';
import { useShop, PageView } from '../../context/ShopContext';
import { Mail, Check, MapPin, Phone, Instagram, Facebook, Youtube } from 'lucide-react';

export const NewsletterFooter: React.FC = () => {
  const { setActivePage, navigateToBrand, navigateToCategory } = useShop();

  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
    }
  };

  const handleLinkClick = (page: PageView) => {
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#0B0B0A] text-[#F4F1E9] border-t border-[#2A2A26]">
      {/* 14 — NEWSLETTER SECTION */}
      <div className="py-20 px-6 bg-[#151514] border-b border-[#2A2A26] text-center relative overflow-hidden">
        <div className="max-w-2xl mx-auto space-y-6">
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#C5A880] block font-semibold">
            14 — VALERE COLLECTIVE
          </span>
          <h2 className="font-serif text-4xl sm:text-6xl text-[#F4F1E9] tracking-tight">
            JOIN THE COLLECTIVE
          </h2>
          <p className="font-sans text-xs sm:text-sm text-[#8A8A85] font-light max-w-md mx-auto leading-relaxed">
            Discover new arrivals, horological stories, vault allocations, and private collector invitations.
          </p>

          {subscribed ? (
            <div className="inline-flex items-center space-x-2 bg-[#0B0B0A] border border-[#C5A880] px-6 py-3 text-[#C5A880] text-xs uppercase tracking-widest font-semibold animate-fadeIn">
              <Check className="w-4 h-4" />
              <span>YOU ARE NOW SUBSCRIBED TO THE VALERE COLLECTIVE</span>
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto">
              <div className="relative w-full">
                <Mail className="w-4 h-4 text-[#8A8A85] absolute left-4 top-3.5" />
                <input
                  type="email"
                  required
                  placeholder="ENTER YOUR EMAIL ADDRESS..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#0B0B0A] border border-[#2A2A26] focus:border-[#C5A880] pl-11 pr-4 py-3 text-xs text-[#F4F1E9] focus:outline-none uppercase tracking-widest"
                />
              </div>
              <button
                type="submit"
                className="w-full sm:w-auto px-8 py-3 bg-[#C5A880] hover:bg-[#F4F1E9] text-[#0B0B0A] font-bold text-xs uppercase tracking-[0.2em] transition-colors whitespace-nowrap"
              >
                SUBSCRIBE
              </button>
            </form>
          )}
        </div>
      </div>

      {/* 15 — MULTI-COLUMN FOOTER */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          {/* Col 1: Shop */}
          <div>
            <h4 className="text-[10px] uppercase tracking-[0.25em] text-[#C5A880] font-semibold mb-6">
              SHOP
            </h4>
            <ul className="space-y-3 text-xs text-[#8A8A85]">
              <li>
                <button onClick={() => navigateToCategory('Automatic')} className="hover:text-[#F4F1E9] transition-colors">
                  Automatic Watches
                </button>
              </li>
              <li>
                <button onClick={() => navigateToCategory('Chronograph')} className="hover:text-[#F4F1E9] transition-colors">
                  Chronograph Complications
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick('luxury-suite')} className="hover:text-[#F4F1E9] transition-colors">
                  The Luxury Suite
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick('pre-owned')} className="hover:text-[#F4F1E9] transition-colors">
                  Certified Pre-Owned
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick('collection')} className="hover:text-[#F4F1E9] transition-colors">
                  New Arrivals
                </button>
              </li>
              <li>
                <button onClick={() => navigateToBrand('TISSOT')} className="hover:text-[#F4F1E9] transition-colors">
                  Swiss & Japanese Brands
                </button>
              </li>
            </ul>
          </div>

          {/* Col 2: Customer Care */}
          <div>
            <h4 className="text-[10px] uppercase tracking-[0.25em] text-[#C5A880] font-semibold mb-6">
              CUSTOMER CARE
            </h4>
            <ul className="space-y-3 text-xs text-[#8A8A85]">
              <li className="hover:text-[#F4F1E9] cursor-pointer">Contact Senior Advisor</li>
              <li className="hover:text-[#F4F1E9] cursor-pointer">Insured Shipping Policy</li>
              <li className="hover:text-[#F4F1E9] cursor-pointer">Returns & Vault Inspection</li>
              <li className="hover:text-[#F4F1E9] cursor-pointer">5-Year Warranty Terms</li>
              <li className="hover:text-[#F4F1E9] cursor-pointer">Authenticity Guarantee</li>
              <li className="hover:text-[#F4F1E9] cursor-pointer">Installment Calculator</li>
            </ul>
          </div>

          {/* Col 3: About */}
          <div>
            <h4 className="text-[10px] uppercase tracking-[0.25em] text-[#C5A880] font-semibold mb-6">
              ABOUT VALERE
            </h4>
            <ul className="space-y-3 text-xs text-[#8A8A85]">
              <li>
                <button onClick={() => handleLinkClick('story')} className="hover:text-[#F4F1E9] transition-colors">
                  Our Story & Heritage
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick('story')} className="hover:text-[#F4F1E9] transition-colors">
                  Vault Verification Lab
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick('journal')} className="hover:text-[#F4F1E9] transition-colors">
                  The Valere Journal
                </button>
              </li>
              <li className="hover:text-[#F4F1E9] cursor-pointer">Cairo & Alex Showrooms</li>
            </ul>
          </div>

          {/* Col 4: Services */}
          <div>
            <h4 className="text-[10px] uppercase tracking-[0.25em] text-[#C5A880] font-semibold mb-6">
              SERVICES
            </h4>
            <ul className="space-y-3 text-xs text-[#8A8A85]">
              <li className="hover:text-[#F4F1E9] cursor-pointer">Sell Your Timepiece</li>
              <li className="hover:text-[#F4F1E9] cursor-pointer">Watch Servicing & Polishing</li>
              <li className="hover:text-[#F4F1E9] cursor-pointer">Bespoke Strap Fitting</li>
              <li className="hover:text-[#F4F1E9] cursor-pointer">Private Residence Concierge</li>
            </ul>
          </div>

          {/* Col 5: Brand Identity */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 border border-[#C5A880] flex items-center justify-center text-[#C5A880]">
                <span className="font-serif text-lg font-bold">V</span>
              </div>
              <span className="font-serif text-xl tracking-[0.2em] font-semibold text-[#F4F1E9]">
                VALERE WATCHES
              </span>
            </div>
            <p className="text-xs text-[#8A8A85] leading-relaxed font-light">
              An immersive digital watch boutique preserving horological craftsmanship and certified provenance since 1954.
            </p>

            <div className="flex items-center space-x-4 text-[#8A8A85] pt-2">
              <Instagram className="w-4 h-4 hover:text-[#C5A880] cursor-pointer transition-colors" />
              <Facebook className="w-4 h-4 hover:text-[#C5A880] cursor-pointer transition-colors" />
              <Youtube className="w-4 h-4 hover:text-[#C5A880] cursor-pointer transition-colors" />
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[#2A2A26] flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#8A8A85]">
          <div className="flex items-center space-x-6 text-[10px] uppercase tracking-widest">
            <span>© {new Date().getFullYear()} VALERE WATCHES EGYPT.</span>
            <span>PRIVACY POLICY</span>
            <span>TERMS OF SERVICE</span>
          </div>

          <div className="text-[10px] uppercase tracking-widest text-[#C5A880]">
            EGYPT (EGP £) • ENGLISH / ARABIC READY
          </div>
        </div>
      </div>
    </footer>
  );
};
