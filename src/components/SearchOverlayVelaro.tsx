import { useDialog } from '../hooks/useDialog';
import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { SHOP_PRODUCTS as VELARO_PRODUCTS, SHOP_BRANDS as VELARO_BRANDS } from '../data/catalog';
import { Search, X } from 'lucide-react';

export const SearchOverlayVelaro: React.FC = () => {
  const { isSearchOpen, setIsSearchOpen, navigateToProduct, navigateToBrand, formatPrice } = useShop();
  const [query, setQuery] = useState('');

  const dialogRef = useDialog(!!isSearchOpen, () => { setIsSearchOpen(false); setQuery(''); });
  if (!isSearchOpen) return null;

  const filteredProducts = query.trim()
    ? VELARO_PRODUCTS.filter(
        w =>
          w.name.toLowerCase().includes(query.trim().toLowerCase()) ||
          w.brand.toLowerCase().includes(query.trim().toLowerCase()) ||
          w.reference.toLowerCase().includes(query.trim().toLowerCase()) ||
          w.category.toLowerCase().includes(query.trim().toLowerCase())
      )
    : VELARO_PRODUCTS.slice(0, 4);

  const filteredBrands = query.trim()
    ? VELARO_BRANDS.filter(b => b.name.toLowerCase().includes(query.trim().toLowerCase()))
    : VELARO_BRANDS.slice(0, 6);

  return (
    <div ref={dialogRef} role="dialog" aria-modal="true" aria-label="Search timepieces" tabIndex={-1} className="dialog-overlay fixed inset-0 z-50 bg-[#080808]/95 backdrop-blur-md text-[#F5F5F5] flex flex-col justify-between overflow-hidden animate-fadeIn">
      {/* Search Bar */}
      <div className="max-w-7xl mx-auto w-full px-6 py-8 border-b border-[#222222] flex items-center justify-between">
        <div className="flex-1 flex items-center space-x-4 max-w-3xl">
          <Search className="w-6 h-6 text-[#C6A15B]" />
          <input
            aria-label="Search watches"
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="SEARCH BY BRAND, MODEL OR REFERENCE (e.g. Daytona, 126500LN, Rolex)..."
            className="w-full bg-transparent font-serif text-xl sm:text-3xl text-[#F5F5F5] placeholder-[#A5A5A5] focus:outline-none tracking-wide"
          />
        </div>

        <button aria-label="Close search timepieces"
          onClick={() => {
            setIsSearchOpen(false);
            setQuery('');
          }}
          className="p-3 border border-[#222222] hover:border-[#C6A15B] text-[#F5F5F5] hover:text-[#C6A15B] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Results */}
      <div className="max-w-7xl mx-auto w-full px-6 py-8 flex-1 overflow-y-auto space-y-10">
        {/* Brand matching */}
        {filteredBrands.length > 0 && (
          <div>
            <h4 className="text-[9px] uppercase tracking-[0.25em] text-[#C6A15B] mb-4 font-semibold">
              PREMIER MANUFACTURES
            </h4>
            <div className="flex flex-wrap gap-3">
              {filteredBrands.map((b) => (
                <button
                  key={b.slug}
                  onClick={() => {
                    navigateToBrand(b.slug);
                    setIsSearchOpen(false);
                    setQuery('');
                  }}
                  className="px-4 py-2 border border-[#222222] hover:border-[#C6A15B] bg-[#111111] text-xs uppercase tracking-widest text-[#F5F5F5] hover:text-[#C6A15B] transition-all rounded-velaro"
                >
                  {b.name}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Product Grid */}
        <div>
          <h4 className="text-[9px] uppercase tracking-[0.25em] text-[#A5A5A5] mb-6 font-semibold">
            {query ? `TIMEPIECES FOUND (${filteredProducts.length})` : 'CURATED TIMEPIECES'}
          </h4>

          {filteredProducts.length === 0 ? (
            <p className="text-sm text-[#A5A5A5] italic font-serif">
              No matching timepieces found for "{query}". Try searching for Rolex, Daytona, or Patek.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredProducts.map((watch) => (
                <div
                  key={watch.id}
                  onClick={() => {
                    navigateToProduct(watch.id);
                    setIsSearchOpen(false);
                    setQuery('');
                  }}
                  className="group bg-[#111111] border border-[#222222] p-4 cursor-pointer hover:border-[#C6A15B] transition-all flex flex-col justify-between rounded-velaro"
                >
                  <div className="w-full aspect-square bg-[#080808] overflow-hidden mb-3">
                    <img
                      src={watch.images.front}
                      alt={watch.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div>
                    <span className="text-[9px] uppercase tracking-widest text-[#C6A15B] block font-semibold">
                      {watch.brand}
                    </span>
                    <h5 className="font-serif text-lg text-[#F5F5F5] group-hover:text-[#C6A15B] transition-colors line-clamp-1">
                      {watch.name}
                    </h5>
                    <p className="text-xs text-[#A5A5A5] font-sans mt-1">
                      {formatPrice(watch.priceUsd)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
