import React, { useState } from 'react';
import { WatchProductVelaro } from '../data/velaroData';
import { useShop } from '../context/ShopContext';
import { Heart, ArrowRight } from 'lucide-react';

interface ProductCardProps {
  product: WatchProductVelaro & {
    price?: number;
    stock?: number;
    currency?: string;
  };
  layout?: 'grid' | 'spread';
}

export const ProductCardVelaro: React.FC<ProductCardProps> = ({
  product,
  layout = 'grid'
}) => {
  const {
    navigateToProduct,
    toggleWishlist,
    isInWishlist,
    formatPrice,
    addToCart
  } = useShop();

  const [currentImgKey, setCurrentImgKey] =
    useState<'front' | 'side'>('front');

  const isSaved = isInWishlist(product.id);

  // Firebase price first, old local price second
  const livePrice =
    product.price ??
    product.priceUsd;

  // If Firebase says the price is already EGP,
  // do NOT convert it again.
  const formattedPrice =
    product.currency === 'EGP'
      ? `EGP ${Number(livePrice).toLocaleString()}`
      : formatPrice(livePrice);

  const stock =
    product.stock ?? 1;

  const isInStock =
    stock > 0;

  return (
    <div
      data-testid="product-card"
      className={`group relative bg-[#111111] border border-[#222222] hover:border-[#C6A15B]/60 transition-all duration-500 rounded-velaro flex flex-col justify-between overflow-hidden ${layout === 'spread'
          ? 'h-full min-h-[460px]'
          : ''
        }`}
    >
      {/* Top Media Area */}
      <div
        className="relative w-full aspect-[4/5] bg-[#080808] overflow-hidden cursor-pointer"
        onClick={() =>
          navigateToProduct(product.id)
        }
        onMouseEnter={() =>
          product.images.side &&
          setCurrentImgKey('side')
        }
        onMouseLeave={() =>
          setCurrentImgKey('front')
        }
      >
        {/* Main Product Image */}
        <img
          src={
            product.images[currentImgKey] ||
            product.images.front
          }
          alt={`${product.brand} ${product.name}`}
          className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-700 brightness-95 group-hover:brightness-100"
          loading="lazy"
        />

        {/* Badges Top-Left */}
        <div className="absolute top-3.5 left-3.5 z-10 flex flex-col space-y-1">
          {product.badges
            .filter((b) =>
              [
                'New',
                'New Arrival',
                'Sale',
                'Certified',
                'Pre-Owned',
                'Full Set',
                'Unworn',
                'Limited'
              ].includes(b)
            )
            .slice(0, 2)
            .map((badge, idx) => (
              <span
                key={idx}
                className={`text-[8px] uppercase tracking-[0.2em] px-2 py-0.5 font-bold ${badge === 'Certified'
                    ? 'bg-[#C6A15B] text-[#080808]'
                    : badge === 'Full Set'
                      ? 'bg-[#161616] text-[#F5F5F5] border border-[#222222]'
                      : 'bg-[#080808]/80 text-[#C6A15B] border border-[#C6A15B]/40'
                  }`}
              >
                {badge}
              </span>
            ))}
        </div>

        {/* Wishlist Button */}
        <div className="absolute top-3.5 right-3.5 z-10 flex flex-col space-y-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleWishlist(product.id);
            }}
            className={`p-2 rounded-full transition-all duration-300 ${isSaved
                ? 'bg-[#C6A15B] text-[#080808]'
                : 'bg-[#080808]/70 text-[#F5F5F5] hover:bg-[#C6A15B] hover:text-[#080808]'
              }`}
            title={
              isSaved
                ? 'Remove from Wishlist'
                : 'Save to Wishlist'
            }
          >
            <Heart
              className={`w-3.5 h-3.5 ${isSaved ? 'fill-current' : ''
                }`}
            />
          </button>
        </div>

        {/* Hover Quick Action Overlay */}
        <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-[#080808] via-[#080808]/80 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-300 flex items-center justify-between z-10">
          <span className="text-[9px] uppercase tracking-widest text-[#C6A15B] flex items-center font-medium">
            QUICK VIEW
            <ArrowRight className="w-3 h-3 ml-1" />
          </span>

          <button
            disabled={!isInStock}
            onClick={(e) => {
              e.stopPropagation();

              if (isInStock) {
                addToCart(product);
              }
            }}
            className={`text-[9px] uppercase tracking-widest px-3 py-1.5 font-bold transition-colors ${isInStock
                ? 'bg-[#C6A15B] text-[#080808] hover:bg-[#F5F5F5]'
                : 'bg-[#333333] text-[#777777] cursor-not-allowed'
              }`}
          >
            {isInStock
              ? 'ADD TO BAG'
              : 'OUT OF STOCK'}
          </button>
        </div>
      </div>

      {/* Details Area */}
      <div className="p-5 flex flex-col justify-between flex-1 bg-[#111111] group-hover:translate-y-[-2px] transition-transform duration-300">
        <div>
          {/* Brand & Reference */}
          <div className="product-card-meta flex items-center justify-between text-[9px] uppercase tracking-[0.2em] text-[#A5A5A5] mb-1 font-medium">
            <span className="text-[#C6A15B] font-semibold">
              {product.brand}
            </span>

            <span>
              Ref. {product.reference}
            </span>
          </div>

          {/* Model Name */}
          <h3 className="font-serif text-xl text-[#F5F5F5] font-medium tracking-wide cursor-pointer hover:text-[#C6A15B] transition-colors line-clamp-1 mb-1">
            <a
              href={`#page=product-detail&product=${encodeURIComponent(
                product.id
              )}`}
              onClick={(e) => {
                e.preventDefault();
                navigateToProduct(product.id);
              }}
            >
              {product.name}
            </a>
          </h3>

          {/* Condition */}
          <p className="text-[11px] text-[#A5A5A5] font-sans font-light mb-3">
            {product.year} · {product.condition} · {product.set}
          </p>
        </div>

        {/* Pricing */}
        <div className="pt-3 border-t border-[#222222] flex flex-wrap gap-2 items-baseline justify-between">
          <div>
            <span className="text-[8px] uppercase tracking-widest text-[#A5A5A5] block">
              PRICE
            </span>

            <span className="font-sans text-base font-semibold text-[#F5F5F5]">
              {formattedPrice}
            </span>
          </div>

          <span className="text-[9px] uppercase tracking-widest text-[#C6A15B] font-semibold">
            {isInStock
              ? `${stock} IN STOCK`
              : 'OUT OF STOCK'}
          </span>
        </div>
      </div>
    </div>
  );
};