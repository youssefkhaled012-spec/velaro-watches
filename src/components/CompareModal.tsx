import { useDialog } from '../hooks/useDialog';
import React from 'react';
import { useShop } from '../context/ShopContext';
import { X, Check, Scale } from 'lucide-react';

export const CompareModal: React.FC = () => {
  const { isCompareModalOpen, setIsCompareModalOpen, compareList, formatPrice, toggleCompare, addToCart } = useShop();

  const dialogRef = useDialog(!!isCompareModalOpen, () => { setIsCompareModalOpen(false); });
  if (!isCompareModalOpen) return null;

  return (
    <div ref={dialogRef} role="dialog" aria-modal="true" aria-label="Compare timepieces" tabIndex={-1} className="dialog-overlay fixed inset-0 z-50 bg-[#080808]/90 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto animate-fadeIn">
      <div className="max-w-6xl w-full bg-[#111111] border border-[#C6A15B]/40 p-8 shadow-2xl relative text-[#F5F5F5] rounded-velaro my-8">
        <button aria-label="Close compare timepieces"
          onClick={() => setIsCompareModalOpen(false)}
          className="absolute top-6 right-6 p-2 text-[#A5A5A5] hover:text-[#C6A15B] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center space-x-3 pb-6 border-b border-[#222222] mb-8">
          <Scale className="w-6 h-6 text-[#C6A15B]" />
          <div>
            <span className="text-[9px] uppercase tracking-[0.3em] text-[#C6A15B] block font-semibold">
              VELARO COMPARISON ENGINE
            </span>
            <h2 className="font-serif text-3xl text-[#F5F5F5]">
              SIDE-BY-SIDE TIMEPIECE MATRIX
            </h2>
          </div>
        </div>

        {compareList.length === 0 ? (
          <div className="text-center py-16 text-[#A5A5A5]">
            <p className="font-serif text-2xl text-[#F5F5F5]">No timepieces selected for comparison</p>
            <p className="text-xs mt-2">Click the scale icon on any watch card to add it to your matrix.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="border-b border-[#222222]">
                  <th className="p-4 w-44 uppercase text-[10px] tracking-widest text-[#C6A15B] font-semibold">
                    SPECIFICATION
                  </th>
                  {compareList.map((item) => (
                    <th key={item.id} className="p-4 min-w-[220px] text-center border-l border-[#222222]">
                      <div className="relative aspect-square w-32 h-32 mx-auto bg-[#080808] border border-[#222222] mb-3 overflow-hidden">
                        <img src={item.images.front} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <span className="text-[9px] uppercase tracking-widest text-[#C6A15B] block font-semibold">
                        {item.brand}
                      </span>
                      <h4 className="font-serif text-base text-[#F5F5F5] font-medium line-clamp-1">{item.name}</h4>
                      <p className="text-xs text-[#C6A15B] font-sans font-semibold mt-1">{formatPrice(item.priceUsd)}</p>
                      <button
                        onClick={() => addToCart(item)}
                        className="mt-3 w-full py-1.5 bg-[#C6A15B] text-[#080808] font-bold text-[9px] uppercase tracking-widest hover:bg-[#F5F5F5]"
                      >
                        ADD TO BAG
                      </button>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-[#222222]">
                <tr>
                  <td className="p-4 font-semibold text-[#A5A5A5]">Reference</td>
                  {compareList.map(item => <td key={item.id} className="p-4 text-center border-l border-[#222222] font-mono">{item.reference}</td>)}
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-[#A5A5A5]">Condition</td>
                  {compareList.map(item => <td key={item.id} className="p-4 text-center border-l border-[#222222] text-[#C6A15B] font-semibold">{item.condition} ({item.year})</td>)}
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-[#A5A5A5]">Calibre Movement</td>
                  {compareList.map(item => <td key={item.id} className="p-4 text-center border-l border-[#222222]">{item.specs.movement.calibre} ({item.specs.movement.type})</td>)}
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-[#A5A5A5]">Case Diameter</td>
                  {compareList.map(item => <td key={item.id} className="p-4 text-center border-l border-[#222222] font-mono">{item.specs.case.diameterMm} MM</td>)}
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-[#A5A5A5]">Case Material</td>
                  {compareList.map(item => <td key={item.id} className="p-4 text-center border-l border-[#222222]">{item.specs.case.material}</td>)}
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-[#A5A5A5]">Power Reserve</td>
                  {compareList.map(item => <td key={item.id} className="p-4 text-center border-l border-[#222222]">{item.specs.movement.powerReserve}</td>)}
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-[#A5A5A5]">Water Resistance</td>
                  {compareList.map(item => <td key={item.id} className="p-4 text-center border-l border-[#222222]">{item.specs.case.waterResistance}</td>)}
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-[#A5A5A5]">Set Contents</td>
                  {compareList.map(item => <td key={item.id} className="p-4 text-center border-l border-[#222222] text-[#F5F5F5]">{item.set}</td>)}
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
