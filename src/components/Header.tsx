import React, { useState, useEffect } from 'react';
import { useShop, PageView } from '../context/ShopContext';
import { Search, ShoppingBag, Heart, Menu, User, ShieldCheck, Sparkles } from 'lucide-react';

export const Header: React.FC = () => {
  const {
    activePage,
    setActivePage,
    cartCount,
    wishlist,
    setIsCartOpen,
    setIsMenuOpen,
    setIsSearchOpen,
    setFilters
  } = useShop();

  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (page: PageView) => {
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCategoryNav = (genderOrCategory: string) => {
    setFilters(prev => ({
      ...prev,
      category: genderOrCategory === 'Men' || genderOrCategory === 'Women' ? '' : genderOrCategory,
      brand: ''
    }));
    setActivePage('collection');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40">
      {/* Announcement Bar Top Strip */}
      <div className="bg-[#151514] border-b border-[#2A2A26] py-1.5 px-4 text-center text-[9px] uppercase tracking-[0.25em] text-[#C5A880] flex items-center justify-between">
        <div className="hidden sm:flex items-center space-x-2 text-[#8A8A85]">
          <ShieldCheck className="w-3 h-3 text-[#C5A880]" />
          <span>CAIRO & ALEXANDRIA SHOWROOMS</span>
        </div>

        <div className="mx-auto flex items-center space-x-2">
          <Sparkles className="w-3 h-3 text-[#C5A880] animate-pulse" />
          <span>COMPLIMENTARY INSURED SHIPPING IN EGYPT • 0% EGP INSTALLMENTS</span>
        </div>

        <div className="hidden md:flex items-center space-x-2 text-[#8A8A85]">
          <span className="text-[#C5A880] font-semibold">EGP £</span>
          <span>EGYPT</span>
        </div>
      </div>

      {/* Main Navigation Header */}
      <div
        className={`transition-all duration-500 ${
          isScrolled
            ? 'bg-[#0B0B0A]/95 backdrop-blur-md py-3 border-b border-[#151514] shadow-2xl'
            : 'bg-gradient-to-b from-[#0B0B0A]/90 via-[#0B0B0A]/50 to-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* LEFT: BRAND LOGO & MARK */}
          <div className="flex items-center space-x-3">
            <button
              onClick={() => handleNavClick('home')}
              className="flex items-center space-x-3 group text-left focus:outline-none"
            >
              <div className="w-8 h-8 border border-[#C5A880]/50 flex items-center justify-center text-[#C5A880] group-hover:border-[#C5A880] transition-colors bg-[#0B0B0A]">
                <span className="font-serif text-lg font-bold tracking-tighter">V</span>
              </div>
              <div>
                <span className="font-serif text-xl sm:text-2xl font-semibold tracking-[0.22em] text-[#F4F1E9] block leading-none">
                  VALERE
                </span>
                <span className="text-[8px] uppercase tracking-[0.35em] text-[#8A8A85] block mt-1">
                  HORLOGERIE • EST. 1954
                </span>
              </div>
            </button>
          </div>

          {/* CENTER / NAVIGATION (DESKTOP) */}
          <nav className="hidden lg:flex items-center space-x-7">
            <button
              onClick={() => handleNavClick('home')}
              className={`text-[11px] uppercase tracking-[0.2em] transition-all relative py-1 focus:outline-none ${
                activePage === 'home' ? 'text-[#C5A880] font-semibold' : 'text-[#F4F1E9]/80 hover:text-[#F4F1E9]'
              }`}
            >
              HOME
            </button>
            <button
              onClick={() => handleCategoryNav('Men')}
              className="text-[11px] uppercase tracking-[0.2em] text-[#F4F1E9]/80 hover:text-[#C5A880] transition-all py-1 focus:outline-none"
            >
              MEN WATCHES
            </button>
            <button
              onClick={() => handleCategoryNav('Women')}
              className="text-[11px] uppercase tracking-[0.2em] text-[#F4F1E9]/80 hover:text-[#C5A880] transition-all py-1 focus:outline-none"
            >
              WOMEN WATCHES
            </button>
            <button
              onClick={() => handleNavClick('luxury-suite')}
              className={`text-[11px] uppercase tracking-[0.2em] transition-all relative py-1 focus:outline-none ${
                activePage === 'luxury-suite' ? 'text-[#C5A880] font-semibold' : 'text-[#F4F1E9]/80 hover:text-[#F4F1E9]'
              }`}
            >
              LUXURY SUITE
            </button>
            <button
              onClick={() => handleNavClick('pre-owned')}
              className={`text-[11px] uppercase tracking-[0.2em] transition-all relative py-1 focus:outline-none ${
                activePage === 'pre-owned' ? 'text-[#C5A880] font-semibold' : 'text-[#F4F1E9]/80 hover:text-[#F4F1E9]'
              }`}
            >
              PRE-OWNED
            </button>
            <button
              onClick={() => handleCategoryNav('Accessories')}
              className="text-[11px] uppercase tracking-[0.2em] text-[#F4F1E9]/80 hover:text-[#C5A880] transition-all py-1 focus:outline-none"
            >
              ACCESSORIES
            </button>
            <button
              onClick={() => handleNavClick('journal')}
              className={`text-[11px] uppercase tracking-[0.2em] transition-all relative py-1 focus:outline-none ${
                activePage === 'journal' ? 'text-[#C5A880] font-semibold' : 'text-[#F4F1E9]/80 hover:text-[#F4F1E9]'
              }`}
            >
              JOURNAL
            </button>
          </nav>

          {/* RIGHT: ACTIONS & CONTROLS */}
          <div className="flex items-center space-x-4">
            {/* Search Trigger */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-1.5 text-[#F4F1E9]/80 hover:text-[#C5A880] transition-colors focus:outline-none"
              title="Search Timepieces"
              aria-label="Search"
            >
              <Search className="w-4 h-4 stroke-[1.75]" />
            </button>

            {/* Wishlist */}
            <button
              onClick={() => handleNavClick('collection')}
              className="p-1.5 text-[#F4F1E9]/80 hover:text-[#C5A880] transition-colors relative focus:outline-none hidden sm:block"
              title="Wishlist"
              aria-label="Wishlist"
            >
              <Heart className="w-4 h-4 stroke-[1.75]" />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#C5A880] text-[#0B0B0A] text-[9px] font-bold flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Account / Concierge */}
            <button
              onClick={() => handleNavClick('story')}
              className="p-1.5 text-[#F4F1E9]/80 hover:text-[#C5A880] transition-colors focus:outline-none hidden sm:block"
              title="VIP Services"
              aria-label="Account"
            >
              <User className="w-4 h-4 stroke-[1.75]" />
            </button>

            {/* Cart Drawer Toggle */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="p-1.5 text-[#F4F1E9]/80 hover:text-[#C5A880] transition-colors relative focus:outline-none flex items-center space-x-1"
              aria-label="Cart"
            >
              <ShoppingBag className="w-4 h-4 stroke-[1.75]" />
              {cartCount > 0 && (
                <span className="w-4 h-4 rounded-full bg-[#C5A880] text-[#0B0B0A] text-[9px] font-bold flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Menu Overlay Toggle */}
            <button
              onClick={() => setIsMenuOpen(true)}
              className="p-2 border border-[#2A2A26] hover:border-[#C5A880] text-[#F4F1E9] hover:text-[#C5A880] transition-all flex items-center space-x-2 focus:outline-none bg-[#0B0B0A]"
              aria-label="Toggle Navigation Menu"
            >
              <Menu className="w-4 h-4 stroke-[1.75]" />
              <span className="text-[10px] uppercase tracking-widest hidden md:inline">MENU</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
