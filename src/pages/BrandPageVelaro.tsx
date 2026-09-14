import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { SHOP_BRANDS as VELARO_BRANDS, SHOP_PRODUCTS as VELARO_PRODUCTS } from '../data/catalog';
import { ProductCardVelaro } from '../components/ProductCardVelaro';
import { ChevronRight } from 'lucide-react';

export const BrandPageVelaro: React.FC = () => {
  const { selectedBrandSlug, setActivePage, setFilters } = useShop();

  const brandInfo = VELARO_BRANDS.find(b => b.slug.toLowerCase() === selectedBrandSlug.toLowerCase()) || VELARO_BRANDS[0];

  const [activeSubcat, setActiveSubcat] = useState<string>('All');

  const brandProducts = VELARO_PRODUCTS.filter(w => w.brand.toLowerCase() === brandInfo.name.toLowerCase());
  const filteredProducts = activeSubcat === 'All'
    ? brandProducts
    : brandProducts.filter(w => w.name.toLowerCase().includes(activeSubcat.toLowerCase()) || w.subTitle?.toLowerCase().includes(activeSubcat.toLowerCase()));

  return (
    <div className="min-h-screen bg-[#080808] text-[#F5F5F5] pt-28">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-6 py-3 border-b border-[#222222] flex items-center space-x-2 text-[10px] text-[#A5A5A5] uppercase tracking-widest">
        <button onClick={() => setActivePage('home')} className="hover:text-[#C6A15B]">HOME</button>
        <ChevronRight className="w-3 h-3 text-[#222222]" />
        <button onClick={() => setActivePage('collection')} className="hover:text-[#C6A15B]">BRANDS</button>
        <ChevronRight className="w-3 h-3 text-[#222222]" />
        <span className="text-[#C6A15B]">{brandInfo.name}</span>
      </div>

      {/* Brand Editorial Hero */}
      <div className="relative w-full h-[400px] bg-[#111111] border-b border-[#222222] overflow-hidden flex items-center justify-center">
        <img
          src={brandInfo.heroImage}
          alt={brandInfo.name}
          className="absolute inset-0 w-full h-full object-cover brightness-[.4]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-[#080808]/40 to-transparent" />

        <div className="relative z-10 text-center max-w-3xl px-6">
          <span className="text-[9px] uppercase tracking-[0.35em] text-[#C6A15B] block mb-2 font-semibold">
            MAISON DE HAUTE HORLOGERIE • {brandInfo.origin}
          </span>
          <h1 className="font-serif text-5xl sm:text-7xl text-[#F5F5F5] tracking-tight mb-4">
            {brandInfo.name}
          </h1>
          <p className="text-xs sm:text-sm text-[#A5A5A5] font-light leading-relaxed max-w-xl mx-auto">
            {brandInfo.description}
          </p>
        </div>
      </div>

      {/* Subcategory Pills */}
      {brandInfo.subcategories.length > 0 && (
        <div className="bg-[#111111] border-b border-[#222222] py-4 px-6">
          <div className="max-w-7xl mx-auto flex items-center space-x-3 overflow-x-auto no-scrollbar">
            <button
              onClick={() => setActiveSubcat('All')}
              className={`px-4 py-1.5 text-xs uppercase tracking-widest transition-colors rounded-velaro whitespace-nowrap ${
                activeSubcat === 'All'
                  ? 'bg-[#C6A15B] text-[#080808] font-bold'
                  : 'bg-[#080808] text-[#A5A5A5] border border-[#222222] hover:text-[#F5F5F5]'
              }`}
            >
              ALL {brandInfo.name.toUpperCase()}
            </button>
            {brandInfo.subcategories.map((sub) => (
              <button
                key={sub}
                onClick={() => setActiveSubcat(sub)}
                className={`px-4 py-1.5 text-xs uppercase tracking-widest transition-colors rounded-velaro whitespace-nowrap ${
                  activeSubcat === sub
                    ? 'bg-[#C6A15B] text-[#080808] font-bold'
                    : 'bg-[#080808] text-[#A5A5A5] border border-[#222222] hover:text-[#F5F5F5]'
                }`}
              >
                {sub}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Product Grid */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="flex justify-between items-center mb-8 border-b border-[#222222] pb-4">
          <span className="text-[10px] uppercase tracking-widest text-[#C6A15B] font-semibold">
            {activeSubcat === 'All' ? `ALL ${brandInfo.name.toUpperCase()} TIMEPIECES` : `${subcatUpper(activeSubcat)} SELECTION`}
          </span>
          <span className="text-xs text-[#A5A5A5] font-mono">
            {filteredProducts.length} AVAILABLE
          </span>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="text-center py-20 bg-[#111111] border border-[#222222] p-8 rounded-velaro">
            <h3 className="font-serif text-3xl text-[#F5F5F5] mb-2">No timepieces currently listed for {activeSubcat}</h3>
            <p className="text-xs text-[#A5A5A5] mb-6">Contact our watch sourcing desk to request unlisted references.</p>
            <button
              onClick={() => setActiveSubcat('All')}
              className="px-6 py-3 bg-[#C6A15B] text-[#080808] font-bold text-xs uppercase tracking-widest"
            >
              VIEW ALL {brandInfo.name.toUpperCase()}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCardVelaro key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

function subcatUpper(sub: string) {
  return sub.toUpperCase();
}
