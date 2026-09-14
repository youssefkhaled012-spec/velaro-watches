import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { WATCHES_CATALOG, BRANDS_CATALOG } from '../data/watchesData';
import { ProductCard } from '../components/ProductCard';
import { NewsletterFooter } from '../components/home/NewsletterFooter';
import { Filter, SlidersHorizontal, Grid, LayoutGrid, RotateCcw, Check, X } from 'lucide-react';

export const CollectionPage: React.FC = () => {
  const { filters, setFilters, resetFilters } = useShop();

  const [layoutMode, setLayoutMode] = useState<'grid' | 'spread'>('grid');
  const [showFilterDrawer, setShowFilterDrawer] = useState(false);
  const [sortBy, setSortBy] = useState<'featured' | 'price-low' | 'price-high' | 'newest'>('featured');

  // Filter computation
  const filteredProducts = WATCHES_CATALOG.filter((w) => {
    if (filters.brand && w.brand.toLowerCase() !== filters.brand.toLowerCase()) return false;
    if (filters.category && w.category.toLowerCase() !== filters.category.toLowerCase()) return false;
    if (filters.movement && w.movement.toLowerCase() !== filters.movement.toLowerCase()) return false;
    if (filters.condition === 'Pre-Owned' && !w.isPreOwned) return false;
    if (w.priceEgp > filters.maxPrice) return false;
    if (filters.searchQuery && !w.name.toLowerCase().includes(filters.searchQuery.toLowerCase())) return false;
    return true;
  });

  // Sort computation
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price-low') return a.priceEgp - b.priceEgp;
    if (sortBy === 'price-high') return b.priceEgp - a.priceEgp;
    if (sortBy === 'newest') return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
    return 0;
  });

  return (
    <div className="min-h-screen bg-[#0B0B0A] text-[#F4F1E9] pt-28">
      {/* Header Banner */}
      <div className="max-w-7xl mx-auto px-6 py-12 border-b border-[#2A2A26]">
        <span className="text-[10px] uppercase tracking-[0.3em] text-[#C5A880] block mb-2 font-semibold">
          CURATED CATALOGUE
        </span>
        <h1 className="font-serif text-5xl sm:text-7xl text-[#F4F1E9] tracking-tight mb-4">
          TIMEPIECE SELECTION
        </h1>
        <p className="text-xs text-[#8A8A85] font-sans max-w-xl leading-relaxed">
          Explore Swiss manufacture complications, certified vintage references, and contemporary horological icons.
        </p>
      </div>

      {/* Controls Bar */}
      <div className="bg-[#151514] border-b border-[#2A2A26] sticky top-20 z-30 px-6 py-4">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setShowFilterDrawer(!showFilterDrawer)}
              className="flex items-center space-x-2 border border-[#2A2A26] hover:border-[#C5A880] bg-[#0B0B0A] px-4 py-2 text-xs uppercase tracking-widest text-[#F4F1E9] transition-colors"
            >
              <Filter className="w-3.5 h-3.5 text-[#C5A880]" />
              <span>FILTERS {filters.brand || filters.category ? '(ACTIVE)' : ''}</span>
            </button>

            <span className="text-xs text-[#8A8A85] font-mono">
              SHOWING {sortedProducts.length} TIMEPIECES
            </span>
          </div>

          <div className="flex items-center space-x-6">
            {/* Sort selection */}
            <div className="flex items-center space-x-2">
              <span className="text-[10px] uppercase tracking-widest text-[#8A8A85] hidden sm:inline">SORT:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-[#0B0B0A] border border-[#2A2A26] focus:border-[#C5A880] px-3 py-1.5 text-xs text-[#F4F1E9] focus:outline-none uppercase tracking-wider"
              >
                <option value="featured">CURATED FEATURED</option>
                <option value="price-low">PRICE: LOW TO HIGH</option>
                <option value="price-high">PRICE: HIGH TO LOW</option>
                <option value="newest">NEWEST ARRIVALS</option>
              </select>
            </div>

            {/* Layout Toggle */}
            <div className="hidden sm:flex items-center border border-[#2A2A26] bg-[#0B0B0A]">
              <button
                onClick={() => setLayoutMode('grid')}
                className={`p-2 transition-colors ${layoutMode === 'grid' ? 'text-[#C5A880] bg-[#151514]' : 'text-[#8A8A85]'}`}
                title="Grid View"
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setLayoutMode('spread')}
                className={`p-2 transition-colors ${layoutMode === 'spread' ? 'text-[#C5A880] bg-[#151514]' : 'text-[#8A8A85]'}`}
                title="Spread View"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Layout (Filter Drawer + Product Grid) */}
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left Filter Sidebar */}
        <div className={`lg:col-span-3 space-y-8 ${showFilterDrawer ? 'block' : 'hidden lg:block'}`}>
          <div className="bg-[#151514] border border-[#2A2A26] p-6 space-y-6">
            <div className="flex justify-between items-center pb-4 border-b border-[#2A2A26]">
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#C5A880] font-semibold">
                REFINE SELECTION
              </span>
              <button
                onClick={resetFilters}
                className="text-[9px] uppercase tracking-widest text-[#8A8A85] hover:text-[#C5A880] flex items-center"
              >
                <RotateCcw className="w-3 h-3 mr-1" /> RESET
              </button>
            </div>

            {/* Brand Filter */}
            <div>
              <label className="block text-[10px] uppercase tracking-widest text-[#F4F1E9] mb-3 font-medium">
                WATCHMAKER BRAND
              </label>
              <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
                <button
                  onClick={() => setFilters(prev => ({ ...prev, brand: '' }))}
                  className={`w-full text-left text-xs uppercase tracking-wider py-1 px-2 transition-colors ${
                    !filters.brand ? 'text-[#C5A880] font-semibold bg-[#0B0B0A]' : 'text-[#8A8A85] hover:text-[#F4F1E9]'
                  }`}
                >
                  ALL BRANDS
                </button>
                {BRANDS_CATALOG.map((b) => (
                  <button
                    key={b.name}
                    onClick={() => setFilters(prev => ({ ...prev, brand: b.name }))}
                    className={`w-full text-left text-xs uppercase tracking-wider py-1 px-2 transition-colors ${
                      filters.brand === b.name
                        ? 'text-[#C5A880] font-semibold bg-[#0B0B0A]'
                        : 'text-[#8A8A85] hover:text-[#F4F1E9]'
                    }`}
                  >
                    {b.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Movement Filter */}
            <div className="pt-4 border-t border-[#2A2A26]">
              <label className="block text-[10px] uppercase tracking-widest text-[#F4F1E9] mb-3 font-medium">
                CALIBRE MOVEMENT
              </label>
              <div className="space-y-1.5">
                {['', 'Automatic', 'Chronograph', 'Quartz', 'Solar'].map((m) => (
                  <button
                    key={m || 'all'}
                    onClick={() => setFilters(prev => ({ ...prev, movement: m }))}
                    className={`w-full text-left text-xs uppercase tracking-wider py-1 px-2 transition-colors ${
                      filters.movement === m
                        ? 'text-[#C5A880] font-semibold bg-[#0B0B0A]'
                        : 'text-[#8A8A85] hover:text-[#F4F1E9]'
                    }`}
                  >
                    {m || 'ALL MOVEMENTS'}
                  </button>
                ))}
              </div>
            </div>

            {/* Condition Filter */}
            <div className="pt-4 border-t border-[#2A2A26]">
              <label className="block text-[10px] uppercase tracking-widest text-[#F4F1E9] mb-3 font-medium">
                PROVENANCE CONDITION
              </label>
              <div className="space-y-1.5">
                {['', 'Pre-Owned'].map((cond) => (
                  <button
                    key={cond || 'new'}
                    onClick={() => setFilters(prev => ({ ...prev, condition: cond }))}
                    className={`w-full text-left text-xs uppercase tracking-wider py-1 px-2 transition-colors ${
                      filters.condition === cond
                        ? 'text-[#C5A880] font-semibold bg-[#0B0B0A]'
                        : 'text-[#8A8A85] hover:text-[#F4F1E9]'
                    }`}
                  >
                    {cond === 'Pre-Owned' ? 'CERTIFIED PRE-OWNED' : 'ALL CONDITIONS'}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Cap Slider */}
            <div className="pt-4 border-t border-[#2A2A26]">
              <div className="flex justify-between items-center mb-2">
                <label className="text-[10px] uppercase tracking-widest text-[#F4F1E9] font-medium">
                  MAX PRICE (EGP)
                </label>
                <span className="text-xs font-mono text-[#C5A880]">
                  {new Intl.NumberFormat('en-EG', { style: 'currency', currency: 'EGP', maximumFractionDigits: 0 }).format(filters.maxPrice)}
                </span>
              </div>
              <input
                type="range"
                min={30000}
                max={5000000}
                step={50000}
                value={filters.maxPrice}
                onChange={(e) => setFilters(prev => ({ ...prev, maxPrice: Number(e.target.value) }))}
                className="w-full h-1 bg-[#2A2A26] rounded appearance-none accent-[#C5A880]"
              />
            </div>
          </div>
        </div>

        {/* Right Product Grid */}
        <div className={showFilterDrawer ? 'lg:col-span-9' : 'lg:col-span-9'}>
          {/* Active Filter Tags */}
          {(filters.brand || filters.category || filters.movement || filters.condition) && (
            <div className="flex flex-wrap items-center gap-2 mb-6 p-3 bg-[#151514] border border-[#2A2A26]">
              <span className="text-[9px] uppercase tracking-widest text-[#8A8A85] mr-2">ACTIVE:</span>
              {filters.brand && (
                <span className="inline-flex items-center text-[10px] bg-[#0B0B0A] text-[#C5A880] px-2.5 py-1 border border-[#2A2A26]">
                  BRAND: {filters.brand}
                  <X className="w-3 h-3 ml-1 cursor-pointer" onClick={() => setFilters(prev => ({ ...prev, brand: '' }))} />
                </span>
              )}
              {filters.movement && (
                <span className="inline-flex items-center text-[10px] bg-[#0B0B0A] text-[#C5A880] px-2.5 py-1 border border-[#2A2A26]">
                  MOVEMENT: {filters.movement}
                  <X className="w-3 h-3 ml-1 cursor-pointer" onClick={() => setFilters(prev => ({ ...prev, movement: '' }))} />
                </span>
              )}
              {filters.condition && (
                <span className="inline-flex items-center text-[10px] bg-[#0B0B0A] text-[#C5A880] px-2.5 py-1 border border-[#2A2A26]">
                  {filters.condition}
                  <X className="w-3 h-3 ml-1 cursor-pointer" onClick={() => setFilters(prev => ({ ...prev, condition: '' }))} />
                </span>
              )}
            </div>
          )}

          {sortedProducts.length === 0 ? (
            <div className="text-center py-24 bg-[#151514] border border-[#2A2A26] p-8">
              <h3 className="font-serif text-3xl text-[#F4F1E9] mb-2">No matching timepieces found</h3>
              <p className="text-xs text-[#8A8A85] font-sans mb-6">
                Try widening your price limit or clearing active filter parameters.
              </p>
              <button
                onClick={resetFilters}
                className="px-6 py-3 bg-[#C5A880] text-[#0B0B0A] font-bold text-xs uppercase tracking-widest hover:bg-[#F4F1E9]"
              >
                RESET ALL FILTERS
              </button>
            </div>
          ) : (
            <div
              className={`grid gap-6 ${
                layoutMode === 'spread'
                  ? 'grid-cols-1 md:grid-cols-2'
                  : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
              }`}
            >
              {sortedProducts.map((product) => (
                <ProductCard key={product.id} product={product} layout={layoutMode === 'spread' ? 'editorial' : 'grid'} />
              ))}
            </div>
          )}
        </div>
      </div>

      <NewsletterFooter />
    </div>
  );
};
