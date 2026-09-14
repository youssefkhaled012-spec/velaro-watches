import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
export function FooterVelaro() {
  const { setActivePage, navigateToCategory, setIsSellTradeModalOpen, showToast } = useShop();
  const [subscribed, setSubscribed] = useState(false);
  const handleSubscribe = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const email = String(new FormData(event.currentTarget).get('email') ?? '').trim();
    try { localStorage.setItem('velaro-newsletter-interest', JSON.stringify({ email })); setSubscribed(true); }
    catch { showToast('STORAGE UNAVAILABLE', 'Your browser could not save your interest. Please try again.'); }
  };
  return <>
      {/* 12 — NEWSLETTER */}
      <section className="py-20 px-6 bg-[#111111] border-t border-[#222222] text-center">
        <div className="max-w-xl mx-auto space-y-4">
          <span className="text-[9px] uppercase tracking-[0.3em] text-[#C6A15B] font-semibold block">
            INSIDE VELARO
          </span>
          <h2 className="font-serif text-4xl text-[#F5F5F5]">JOIN THE LIST</h2>
          <p className="text-xs text-[#A5A5A5] font-light">
            Private releases, exceptional arrivals, and stories from the world of horology. Save your interest on this device; newsletter delivery is not yet connected.
          </p>

          {subscribed && <p role="status" className="text-sm text-[#C6A15B]">Your interest is saved on this device. No subscription email has been sent.</p>}
          <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 pt-4">
            <input
              aria-label="Newsletter email" name="email" type="email"
              required
              placeholder="ENTER YOUR EMAIL..."
              className="w-full bg-[#080808] border border-[#222222] focus:border-[#C6A15B] px-4 py-3 text-xs text-[#F5F5F5] focus:outline-none uppercase tracking-widest"
            />
            <button
              type="submit"
              className="px-8 py-3 bg-[#C6A15B] hover:bg-[#F5F5F5] text-[#080808] font-bold text-xs uppercase tracking-[0.2em] transition-colors whitespace-nowrap"
            >
              JOIN THE LIST
            </button>
          </form>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#080808] border-t border-[#222222] pt-20 pb-12 px-6 text-xs text-[#A5A5A5]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-10 mb-16">
          <div>
            <h4 className="text-[10px] uppercase tracking-[0.25em] text-[#C6A15B] font-semibold mb-4">SHOP</h4>
            <ul className="space-y-2.5">
              <li><button onClick={() => navigateToCategory('New Arrivals')} className="hover:text-[#F5F5F5]">New Arrivals</button></li>
              <li><button onClick={() => navigateToCategory('Men')} className="hover:text-[#F5F5F5]">Men's Watches</button></li>
              <li><button onClick={() => navigateToCategory('Women')} className="hover:text-[#F5F5F5]">Women's Watches</button></li>
              <li><button onClick={() => navigateToCategory('Luxury')} className="hover:text-[#F5F5F5]">Luxury</button></li>
              <li><button onClick={() => setActivePage('certified-preowned')} className="hover:text-[#F5F5F5]">Certified Pre-Owned</button></li>
            </ul>
          </div>

          <div>
            <h4 className="text-[10px] uppercase tracking-[0.25em] text-[#C6A15B] font-semibold mb-4">SERVICES</h4>
            <ul className="space-y-2.5">
              <li><button onClick={() => setIsSellTradeModalOpen(true)} className="hover:text-[#F5F5F5]">Sell Your Watch</button></li>
              <li><button onClick={() => setIsSellTradeModalOpen(true)} className="hover:text-[#F5F5F5]">Trade Your Watch</button></li>
              <li><button onClick={() => setActivePage('watch-sourcing')} className="hover:text-[#F5F5F5]">Find a Watch</button></li>
              <li><button onClick={() => setActivePage('bespoke')} className="hover:text-[#F5F5F5]">Bespoke Commissions</button></li>
            </ul>
          </div>

          <div>
            <h4 className="text-[10px] uppercase tracking-[0.25em] text-[#C6A15B] font-semibold mb-4">CLIENT CARE</h4>
            <ul className="space-y-2.5">
              <li><button className="hover:text-[#F5F5F5]" onClick={() => setActivePage('bespoke')}>Contact Specialist</button></li>
              <li><button className="hover:text-[#F5F5F5]" onClick={() => setActivePage('client-care')}>Insured Shipping</button></li>
              <li><button className="hover:text-[#F5F5F5]" onClick={() => setActivePage('client-care')}>14-Day Returns</button></li>
              <li><button className="hover:text-[#F5F5F5]" onClick={() => setActivePage('client-care')}>VELARO Warranty</button></li>
            </ul>
          </div>

          <div>
            <h4 className="text-[10px] uppercase tracking-[0.25em] text-[#C6A15B] font-semibold mb-4">VELARO</h4>
            <ul className="space-y-2.5">
              <li><button onClick={() => setActivePage('story')} className="hover:text-[#F5F5F5]">Our Story</button></li>
              <li><button onClick={() => setActivePage('journal')} className="hover:text-[#F5F5F5]">Journal</button></li>
              <li><button className="hover:text-[#F5F5F5]" onClick={() => setActivePage('bespoke')}>Bespoke</button></li>
            </ul>
          </div>

          <div className="space-y-3">
            <span className="font-serif text-2xl text-[#F5F5F5] tracking-widest block">VELARO</span>
            <p className="text-[11px] font-light leading-relaxed">
              Curated luxury watches selected for collectors, enthusiasts, and those who appreciate extraordinary mechanical craftsmanship.
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto pt-8 border-t border-[#222222] flex flex-col md:flex-row justify-between items-center text-[9px] uppercase tracking-widest gap-4">
          <span>© {new Date().getFullYear()} VELARO WATCHES. ALL RIGHTS RESERVED.</span>
          <div className="flex space-x-6">
            <button onClick={() => setActivePage('client-care')}>PRIVACY POLICY</button>
            <button onClick={() => setActivePage('client-care')}>TERMS OF SERVICE</button>
            <button onClick={() => setActivePage('client-care')}>LOCAL DATA</button>
          </div>
        </div>
      </footer>
</>;
}
