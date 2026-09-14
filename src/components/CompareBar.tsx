import React from 'react';
import { useShop } from '../context/ShopContext';
import { Scale, X, ArrowRight } from 'lucide-react';

export const CompareBar: React.FC = () => {
  const { activePage, compareList, toggleCompare, clearCompare, setIsCompareModalOpen } = useShop();

  if (compareList.length === 0) return null;

  return (
    <div className={`compare-bar fixed ${activePage === 'product-detail' ? 'bottom-24 lg:bottom-4' : 'bottom-4'} left-1/2 -translate-x-1/2 z-40 bg-[#111111]/95 backdrop-blur-md border border-[#C6A15B]/40 px-6 py-3 shadow-2xl rounded-velaro flex items-center space-x-3 sm:space-x-6 animate-fadeIn w-[calc(100%-2rem)] sm:w-auto max-w-3xl flex-wrap gap-y-3 justify-center`}>
      <div className="flex items-center space-x-2 text-xs text-[#F5F5F5]">
        <Scale className="w-4 h-4 text-[#C6A15B]" />
        <span className="font-serif text-sm font-semibold tracking-wider">COMPARE</span>
        <span className="text-[10px] text-[#A5A5A5] font-mono">({compareList.length}/3)</span>
      </div>

      {/* Thumbnails */}
      <div className="hidden sm:flex items-center space-x-3">
        {compareList.map((item) => (
          <div key={item.id} className="relative group w-10 h-12 bg-[#080808] border border-[#222222]">
            <img src={item.images.front} alt={item.name} className="w-full h-full object-cover" />
            <button
              onClick={() => toggleCompare(item)}
              className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-red-500 text-white flex items-center justify-center text-[10px]"
            >
              <X className="w-2.5 h-2.5" />
            </button>
          </div>
        ))}
      </div>

      <div className="flex items-center space-x-3">
        <button
          onClick={() => setIsCompareModalOpen(true)}
          className="px-4 py-2 bg-[#C6A15B] text-[#080808] text-[10px] font-bold uppercase tracking-widest hover:bg-[#F5F5F5] transition-colors flex items-center"
        >
          <span>COMPARE</span>
          <ArrowRight className="w-3 h-3 ml-1" />
        </button>

        <button
          onClick={clearCompare}
          className="text-[9px] uppercase tracking-widest text-[#A5A5A5] hover:text-red-400"
        >
          CLEAR
        </button>
      </div>
    </div>
  );
};
