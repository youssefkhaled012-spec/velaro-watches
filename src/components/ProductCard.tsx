import React, { useState } from 'react';
import { WatchProduct } from '../data/watchesData';
import { useShop } from '../context/ShopContext';
import { Heart, Eye, ArrowRight } from 'lucide-react';

interface ProductCardProps {
  product: WatchProduct;
  layout?: 'grid' | 'editorial';
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, layout = 'grid' }) => {
  const { navigateToProduct, toggleWishlist, isInWishlist, addToCart } = useShop();
  const [currentImgIndex, setCurrentImgIndex] = useState(0);

  const isSaved = isInWishlist(product.id);

  const formattedPrice = new Intl.NumberFormat('en-EG', {
    style: 'currency',
    currency: 'EGP',
    maximumFractionDigits: 0
  }).format(product.priceEgp);

  const formattedInstallment = new Intl.NumberFormat('en-EG', {
    style: 'currency',
    currency: 'EGP',
    maximumFractionDigits: 0
  }).format(product.monthlyInstallmentEgp);

  return (
    <div
      className={`group relative bg-[#151514] border border-[#2A2A26] hover:border-[#C5A880]/60 transition-all duration-500 flex flex-col justify-between overflow-hidden ${
        layout === 'editorial' ? 'h-full min-h-[440px]' : ''
      }`}
    >
      {/* Top Media Container */}
      <div
        className="relative w-full aspect-[4/5] bg-[#0B0B0A] overflow-hidden cursor-pointer"
        onClick={() => navigateToProduct(product.id)}
        onMouseEnter={() => product.images.length > 1 && setCurrentImgIndex(1)}
        onMouseLeave={() => setCurrentImgIndex(0)}
      >
        {/* Main Product Image */}
        <img
          src={product.images[currentImgIndex] || product.images[0]}
          alt={`${product.brand} ${product.name}`}
          className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-700 brightness-95 group-hover:brightness-100"
          loading="lazy"
        />

        {/* Subtle Status Label Top-Left */}
        <div className="absolute top-4 left-4 z-10 flex flex-col space-y-1">
          {product.isNew && (
            <span className="text-[9px] uppercase tracking-[0.25em] text-[#0B0B0A] bg-[#C5A880] px-2 py-0.5 font-bold">
              NEW
            </span>
          )}
          {product.isPreOwned && (
            <span className="text-[9px] uppercase tracking-[0.25em] text-[#F4F1E9] bg-[#2A2A26] px-2 py-0.5 border border-[#8A8A85]">
              PRE-OWNED
            </span>
          )}
          {product.isLimited && (
            <span className="text-[9px] uppercase tracking-[0.25em] text-[#C5A880] bg-[#0B0B0A]/80 border border-[#C5A880]/50 px-2 py-0.5">
              LIMITED EDITION
            </span>
          )}
          {product.isBestseller && !product.isNew && !product.isPreOwned && (
            <span className="text-[9px] uppercase tracking-[0.25em] text-[#8A8A85] bg-[#151514] px-2 py-0.5 border border-[#2A2A26]">
              CURATED
            </span>
          )}
        </div>

        {/* Wishlist Button Top-Right */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          className={`absolute top-4 right-4 z-10 p-2 rounded-full transition-all duration-300 ${
            isSaved
              ? 'bg-[#C5A880] text-[#0B0B0A]'
              : 'bg-[#0B0B0A]/60 text-[#F4F1E9] hover:bg-[#C5A880] hover:text-[#0B0B0A]'
          }`}
          title={isSaved ? 'Remove from Wishlist' : 'Add to Wishlist'}
        >
          <Heart className={`w-3.5 h-3.5 ${isSaved ? 'fill-current' : ''}`} />
        </button>

        {/* Hover Quick Action Overlay */}
        <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-[#0B0B0A] via-[#0B0B0A]/80 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-300 flex items-center justify-between">
          <span className="text-[10px] uppercase tracking-widest text-[#C5A880] flex items-center">
            VIEW TIMEPIECE <ArrowRight className="w-3 h-3 ml-1" />
          </span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              addToCart(product);
            }}
            className="text-[9px] uppercase tracking-widest bg-[#C5A880] text-[#0B0B0A] px-3 py-1.5 font-bold hover:bg-[#F4F1E9] transition-colors"
          >
            ADD TO BAG
          </button>
        </div>
      </div>

      {/* Product Details Section */}
      <div className="p-5 flex flex-col justify-between flex-1 bg-[#151514]">
        <div>
          {/* Brand & Technical Specification Tag */}
          <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.25em] text-[#8A8A85] mb-1">
            <span className="text-[#C5A880] font-semibold">{product.brand}</span>
            <span>{product.movement} • {product.caseSizeMm}MM</span>
          </div>

          {/* Model Name */}
          <h3
            onClick={() => navigateToProduct(product.id)}
            className="font-serif text-xl text-[#F4F1E9] font-medium tracking-wide cursor-pointer hover:text-[#C5A880] transition-colors line-clamp-1 mb-2"
          >
            {product.name}
          </h3>

          {/* Subtitle / Key Spec */}
          {product.subTitle && (
            <p className="text-xs text-[#8A8A85] line-clamp-1 mb-3 font-sans font-light">
              {product.subTitle}
            </p>
          )}
        </div>

        {/* Pricing Block */}
        <div className="pt-3 border-t border-[#2A2A26] flex items-baseline justify-between">
          <div>
            <span className="text-xs uppercase tracking-widest text-[#8A8A85] block text-[9px]">PRICE</span>
            <span className="font-sans text-base font-semibold text-[#F4F1E9]">
              {formattedPrice}
            </span>
          </div>

          <div className="text-right">
            <span className="text-[9px] uppercase tracking-wider text-[#C5A880] block font-medium">
              FROM {formattedInstallment} / MO
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
