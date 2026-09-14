import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { WATCHES_CATALOG, BRANDS_CATALOG } from '../data/watchesData';
import { Search, X, ArrowRight } from 'lucide-react';

export const SearchOverlay: React.FC = () => {
  const { isSearchOpen, setIsSearchOpen, navigateToProduct, navigateToBrand } = useShop();
  const [query, setQuery] = useState('');

  if (!isSearchOpen) return null;

  const filteredWatches = query.trim()
    ? WATCHES_CATALOG.filter(
        w =>
          w.name.toLowerCase().includes(query.toLowerCase()) ||
          w.brand.toLowerCase().includes(query.toLowerCase()) ||
          w.reference.toLowerCase().includes(query.toLowerCase()) ||
          w.category.toLowerCase().includes(query.toLowerCase())
      )
    : WATCHES_CATALOG.slice(0, 4);

  const filteredBrands = query.trim()
    ? BRANDS_CATALOG.filter(b => b.name.toLowerCase().includes(query.toLowerCase()))
    : BRANDS_CATALOG;

  return (
    <div className="fixed inset-0 z-50 bg-[#0B0B0A]/95 backdrop-blur-md text-[#F4F1E9] flex flex-col justify-between overflow-hidden animate-fadeIn">
      {/* Search Header Bar */}
      <div className="max-w-7xl mx-auto w-full px-6 py-8 border-b border-[#2A2A26] flex items-center justify-between">
        <div className="flex-1 flex items-center space-x-4 max-w-3xl">
          <Search className="w-6 h-6 text-[#C5A880]" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="SEARCH BY BRAND, MODEL OR REFERENCE (e.g. PRX, 5711, TISSOT)..."
            className="w-full bg-transparent font-serif text-xl sm:text-3xl text-[#F4F1E9] placeholder-[#8A8A85] focus:outline-none tracking-wide"
            autoFocus
          />
        </div>

        <button
          onClick={() => {
            setIsSearchOpen(false);
            setQuery('');
          }}
          className="p-3 border border-[#2A2A26] hover:border-[#C5A880] text-[#F4F1E9] hover:text-[#C5A880] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Results Content Body */}
      <div className="max-w-7xl mx-auto w-full px-6 py-8 flex-1 overflow-y-auto space-y-10">
        {/* Brands Quick Match Strip */}
        {filteredBrands.length > 0 && (
          <div>
            <h4 className="text-[10px] uppercase tracking-[0.25em] text-[#C5A880] mb-4">
              MATCHING WATCHMAKERS
            </h4>
            <div className="flex flex-wrap gap-3">
              {filteredBrands.map((b) => (
                <button
                  key={b.name}
                  onClick={() => {
                    navigateToBrand(b.name);
                    setIsSearchOpen(false);
                    setQuery('');
                  }}
                  className="px-4 py-2 border border-[#2A2A26] hover:border-[#C5A880] bg-[#151514] text-xs uppercase tracking-widest text-[#F4F1E9] hover:text-[#C5A880] transition-all"
                >
                  {b.name}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Product Results Grid */}
        <div>
          <h4 className="text-[10px] uppercase tracking-[0.25em] text-[#8A8A85] mb-6">
            {query ? `TIMEPIECES FOUND (${filteredWatches.length})` : 'CURATED SUGGESTIONS'}
          </h4>

          {filteredWatches.length === 0 ? (
            <p className="text-sm text-[#8A8A85] italic font-serif">
              No matching timepieces found for "{query}". Try searching by reference number or brand name.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredWatches.map((watch) => (
                <div
                  key={watch.id}
                  onClick={() => {
                    navigateToProduct(watch.id);
                    setIsSearchOpen(false);
                    setQuery('');
                  }}
                  className="group bg-[#151514] border border-[#2A2A26] p-4 cursor-pointer hover:border-[#C5A880] transition-all flex flex-col justify-between"
                >
                  <div className="w-full aspect-square bg-[#0B0B0A] overflow-hidden mb-3">
                    <img
                      src={watch.images[0]}
                      alt={watch.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div>
                    <span className="text-[9px] uppercase tracking-widest text-[#C5A880] block">
                      {watch.brand}
                    </span>
                    <h5 className="font-serif text-lg text-[#F4F1E9] group-hover:text-[#C5A880] transition-colors line-clamp-1">
                      {watch.name}
                    </h5>
                    <p className="text-xs text-[#8A8A85] font-sans mt-1">
                      {new Intl.NumberFormat('en-EG', {
                        style: 'currency',
                        currency: 'EGP',
                        maximumFractionDigits: 0
                      }).format(watch.priceEgp)}
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
