import React from 'react';
import { useShop } from '../context/ShopContext';
import { ShoppingBag, Heart, Scale, CheckCircle } from 'lucide-react';

export const ToastNotification: React.FC = () => {
  const { toast } = useShop();

  if (!toast) return null;

  const renderIcon = () => {
    switch (toast.type) {
      case 'cart': return <ShoppingBag className="w-4 h-4 text-[#C6A15B]" />;
      case 'wishlist': return <Heart className="w-4 h-4 text-[#C6A15B] fill-current" />;
      case 'compare': return <Scale className="w-4 h-4 text-[#C6A15B]" />;
      default: return <CheckCircle className="w-4 h-4 text-[#C6A15B]" />;
    }
  };

  return (
    <div role="status" aria-live="polite" className="fixed bottom-6 right-4 left-4 sm:left-auto sm:right-6 z-[70] bg-[#111111] border border-[#C6A15B]/60 text-[#F5F5F5] px-5 py-3.5 shadow-2xl rounded-velaro flex items-center space-x-3.5 animate-toast max-w-sm">
      <div className="p-2 bg-[#080808] rounded-full border border-[#222222]">
        {renderIcon()}
      </div>
      <div>
        <h4 className="text-[10px] uppercase tracking-widest font-bold text-[#C6A15B]">
          {toast.title}
        </h4>
        <p className="text-xs text-[#F5F5F5] font-sans leading-relaxed font-light">
          {toast.message}
        </p>
      </div>
    </div>
  );
};
