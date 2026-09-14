import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { WATCHES_CATALOG } from '../data/watchesData';
import { FooterVelaro } from '../components/FooterVelaro';
import { ProductCard } from '../components/ProductCard';
import { useFirebaseProducts } from '../hooks/useFirebaseProducts';

import {
  ShoppingBag,
  Heart,
  ShieldCheck,
  Truck,
  CheckCircle2,
  PhoneCall,
  ChevronRight
} from 'lucide-react';

export const ProductDetailPage: React.FC = () => {
  const {
    selectedProductId,
    addToCart,
    toggleWishlist,
    isInWishlist,
    openConsultationModal,
    setActivePage
  } = useShop();

  // Get Firebase products
  const { products: firebaseProducts } = useFirebaseProducts();

  // Find the normal/local product first
  const localProduct =
    WATCHES_CATALOG.find((w) => w.id === selectedProductId) ||
    WATCHES_CATALOG[0];

  // Match the same watch in Firebase using reference number
  const firebaseProduct = firebaseProducts.find(
    (fp: any) =>
      String(fp.reference).trim().toLowerCase() ===
      String(localProduct.reference).trim().toLowerCase()
  );

  // Keep all local information/images,
  // but allow Firebase to control live product information
  const product = {
    ...localProduct,

    brand:
      firebaseProduct?.brand ??
      localProduct.brand,

    name:
      firebaseProduct?.model ??
      localProduct.name,

    reference:
      firebaseProduct?.reference ??
      localProduct.reference,

    priceEgp:
      firebaseProduct?.price ??
      localProduct.priceEgp,

    condition:
      firebaseProduct?.condition ??
      localProduct.condition,

    year:
      firebaseProduct?.year ??
      localProduct.year,

    movement:
      firebaseProduct?.movement ??
      localProduct.movement,

    stock:
      firebaseProduct?.stock ?? 1
  };

  const [activeImageIndex, setActiveImageIndex] = useState(0);

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

  const relatedProducts = WATCHES_CATALOG.filter(
    (w) =>
      w.id !== product.id &&
      (
        w.brand === product.brand ||
        w.category === product.category
      )
  ).slice(0, 3);

  const isInStock = product.stock > 0;

  return (
    <div className="min-h-screen bg-[#0B0B0A] text-[#F4F1E9] pt-28">

      {/* Breadcrumb Bar */}
      <div className="max-w-7xl mx-auto px-6 py-4 border-b border-[#2A2A26] flex items-center space-x-2 text-xs text-[#8A8A85] uppercase tracking-widest">

        <button
          onClick={() => setActivePage('home')}
          className="hover:text-[#C5A880]"
        >
          HOME
        </button>

        <ChevronRight className="w-3 h-3 text-[#2A2A26]" />

        <button
          onClick={() => setActivePage('collection')}
          className="hover:text-[#C5A880]"
        >
          WATCHES
        </button>

        <ChevronRight className="w-3 h-3 text-[#2A2A26]" />

        <span className="text-[#C5A880]">
          {product.brand}
        </span>

        <ChevronRight className="w-3 h-3 text-[#2A2A26]" />

        <span className="text-[#F4F1E9] line-clamp-1">
          {product.name}
        </span>

      </div>


      {/* Main Viewport Grid */}
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-12 gap-12">


        {/* LEFT: PRODUCT GALLERY */}
        <div className="lg:col-span-7 space-y-4">

          <div className="relative w-full aspect-[4/5] bg-[#151514] border border-[#2A2A26] overflow-hidden group">

            <img
              src={
                product.images[activeImageIndex] ||
                product.images[0]
              }
              alt={`${product.brand} ${product.name}`}
              className="w-full h-full object-cover brightness-95 group-hover:scale-105 transition-transform duration-700"
            />

            {product.isPreOwned && (
              <div className="absolute top-4 left-4 bg-[#151514] border border-[#C5A880] text-[#C5A880] text-[9px] uppercase tracking-widest px-3 py-1 font-bold">
                CERTIFIED PRE-OWNED
              </div>
            )}

            {product.isLuxurySuite && (
              <div className="absolute top-4 left-4 bg-[#0B0B0A] border border-[#C5A880] text-[#C5A880] text-[9px] uppercase tracking-widest px-3 py-1 font-bold">
                LUXURY SUITE VAULT
              </div>
            )}

          </div>


          {/* Thumbnails */}
          {product.images.length > 1 && (

            <div className="flex space-x-4">

              {product.images.map((img, idx) => (

                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`w-20 h-24 bg-[#151514] border transition-all overflow-hidden ${activeImageIndex === idx
                      ? 'border-[#C5A880] opacity-100'
                      : 'border-[#2A2A26] opacity-60 hover:opacity-100'
                    }`}
                >

                  <img
                    src={img}
                    alt=""
                    className="w-full h-full object-cover"
                  />

                </button>

              ))}

            </div>

          )}

        </div>


        {/* RIGHT: PURCHASING AREA */}
        <div className="lg:col-span-5 space-y-8 flex flex-col justify-between">

          <div>


            {/* Brand + Reference */}
            <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.25em] text-[#C5A880] mb-2 font-semibold">

              <span>
                {product.brand}
              </span>

              <span>
                REF: {product.reference}
              </span>

            </div>


            {/* Name */}
            <h1 className="font-serif text-3xl sm:text-5xl text-[#F4F1E9] tracking-tight mb-3">
              {product.name}
            </h1>


            {/* Subtitle */}
            {product.subTitle && (

              <p className="text-sm text-[#8A8A85] font-sans font-light mb-6">
                {product.subTitle}
              </p>

            )}


            {/* Price */}
            <div className="bg-[#151514] border border-[#2A2A26] p-6 space-y-3 mb-6">

              <div className="flex justify-between items-baseline">

                <span className="text-[10px] uppercase tracking-widest text-[#8A8A85]">
                  TOTAL PRICE (EGP)
                </span>

                <span className="font-sans text-2xl font-bold text-[#F4F1E9]">
                  {formattedPrice}
                </span>

              </div>


              <div className="flex justify-between items-center pt-2 border-t border-[#2A2A26]">

                <span className="text-[10px] uppercase tracking-wider text-[#C5A880] font-medium">
                  EASY INSTALLMENTS
                </span>

                <span className="text-xs font-medium text-[#C5A880]">
                  FROM {formattedInstallment} / MONTH
                </span>

              </div>

            </div>


            {/* Firebase stock */}
            <div className="flex items-center space-x-2 text-xs text-[#8A8A85] mb-4">

              <span
                className={`w-2 h-2 rounded-full ${isInStock
                    ? 'bg-emerald-500 animate-pulse'
                    : 'bg-red-500'
                  }`}
              />

              <span>
                {isInStock
                  ? `IN STOCK • ${product.stock} AVAILABLE FOR IMMEDIATE EGYPT DELIVERY`
                  : 'OUT OF STOCK'}
              </span>

            </div>


            {/* Firebase year / condition */}
            <div className="flex items-center justify-between border border-[#2A2A26] bg-[#151514] px-4 py-3 mb-8 text-xs">

              <div>

                <span className="block text-[9px] uppercase tracking-widest text-[#8A8A85] mb-1">
                  YEAR
                </span>

                <span className="text-[#F4F1E9]">
                  {product.year}
                </span>

              </div>


              <div className="text-right">

                <span className="block text-[9px] uppercase tracking-widest text-[#8A8A85] mb-1">
                  CONDITION
                </span>

                <span className="text-[#C5A880]">
                  {product.condition}
                </span>

              </div>

            </div>


            {/* Buttons */}
            <div className="space-y-3">

              {product.isLuxurySuite ? (

                <button
                  onClick={() =>
                    openConsultationModal(product)
                  }
                  className="w-full py-4 bg-[#C5A880] hover:bg-[#F4F1E9] text-[#0B0B0A] font-bold text-xs uppercase tracking-[0.2em] transition-all flex items-center justify-center space-x-2"
                >

                  <PhoneCall className="w-4 h-4 mr-1" />

                  <span>
                    REQUEST PRIVATE CONSULTATION
                  </span>

                </button>

              ) : (

                <>

                  <button
                    disabled={!isInStock}
                    onClick={() =>
                      isInStock && addToCart(product)
                    }
                    className={`w-full py-4 font-bold text-xs uppercase tracking-[0.2em] transition-all flex items-center justify-center space-x-2 ${isInStock
                        ? 'bg-[#C5A880] hover:bg-[#F4F1E9] text-[#0B0B0A]'
                        : 'bg-[#2A2A26] text-[#666] cursor-not-allowed'
                      }`}
                  >

                    <ShoppingBag className="w-4 h-4" />

                    <span>
                      {isInStock
                        ? 'ADD TO BAG'
                        : 'OUT OF STOCK'}
                    </span>

                  </button>


                  <button
                    disabled={!isInStock}
                    onClick={() => {
                      if (isInStock) {
                        addToCart(product);
                      }
                    }}
                    className={`w-full py-4 border font-bold text-xs uppercase tracking-[0.2em] transition-all ${isInStock
                        ? 'bg-[#151514] border-[#2A2A26] hover:border-[#C5A880] text-[#F4F1E9]'
                        : 'bg-[#151514] border-[#2A2A26] text-[#555] cursor-not-allowed'
                      }`}
                  >
                    BUY NOW WITH EGP INSTALLMENTS
                  </button>

                </>

              )}


              <button
                onClick={() =>
                  toggleWishlist(product.id)
                }
                className="w-full py-3 bg-transparent border border-[#2A2A26] hover:border-[#C5A880] text-[#8A8A85] hover:text-[#F4F1E9] text-xs uppercase tracking-widest transition-all flex items-center justify-center space-x-2"
              >

                <Heart
                  className={`w-4 h-4 ${isSaved
                      ? 'fill-current text-red-500'
                      : ''
                    }`}
                />

                <span>
                  {isSaved
                    ? 'SAVED TO WISHLIST'
                    : 'ADD TO WISHLIST'}
                </span>

              </button>

            </div>

          </div>


          {/* Guarantees */}
          <div className="bg-[#151514] border border-[#2A2A26] p-6 space-y-4 text-xs text-[#8A8A85] pt-6">

            <div className="flex items-center space-x-3">

              <ShieldCheck className="w-4 h-4 text-[#C5A880] shrink-0" />

              <span>
                {product.warrantyYears}-Year VELARO Warranty Coverage
              </span>

            </div>


            <div className="flex items-center space-x-3">

              <Truck className="w-4 h-4 text-[#C5A880] shrink-0" />

              <span>
                Fully Insured Express Delivery in Egypt
              </span>

            </div>


            <div className="flex items-center space-x-3">

              <CheckCircle2 className="w-4 h-4 text-[#C5A880] shrink-0" />

              <span>
                100% Certified Original Serial & Provenance
              </span>

            </div>

          </div>

        </div>

      </div>


      {/* WATCH INFORMATION */}
      <div className="bg-[#151514] border-t border-[#2A2A26] py-20 px-6">

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">


          {/* Description */}
          <div className="lg:col-span-6 space-y-8">

            <div>

              <span className="text-[10px] uppercase tracking-[0.3em] text-[#C5A880] block mb-2 font-semibold">
                HOROLOGICAL DESIGN
              </span>

              <h2 className="font-serif text-3xl sm:text-4xl text-[#F4F1E9] mb-4">
                THE WATCH & CRAFTSMANSHIP
              </h2>

              <p className="font-sans text-sm text-[#8A8A85] leading-relaxed font-light mb-6">
                {product.description}
              </p>

              <p className="font-sans text-sm text-[#8A8A85] leading-relaxed font-light">
                {product.craftsmanshipDetail}
              </p>

            </div>


            {/* Included */}
            <div className="bg-[#0B0B0A] border border-[#2A2A26] p-6 space-y-3">

              <h4 className="font-serif text-xl text-[#F4F1E9]">
                WHAT'S INCLUDED
              </h4>

              <ul className="space-y-2 text-xs text-[#8A8A85]">

                <li className="flex items-center">

                  <CheckCircle2 className="w-3.5 h-3.5 text-[#C5A880] mr-2" />

                  {product.boxAndPapers ||
                    'Official Manufacturer Presentation Box & Guarantee Cards'}

                </li>


                <li className="flex items-center">

                  <CheckCircle2 className="w-3.5 h-3.5 text-[#C5A880] mr-2" />

                  VELARO Certificate of Authenticity & Timing Inspection Document

                </li>


                <li className="flex items-center">

                  <CheckCircle2 className="w-3.5 h-3.5 text-[#C5A880] mr-2" />

                  International Multi-Year Warranty Passport

                </li>

              </ul>

            </div>

          </div>


          {/* Specs */}
          <div className="lg:col-span-6">

            <span className="text-[10px] uppercase tracking-[0.3em] text-[#C5A880] block mb-2 font-semibold">
              SPECIFICATIONS MATRIX
            </span>

            <h2 className="font-serif text-3xl sm:text-4xl text-[#F4F1E9] mb-6">
              TECHNICAL DETAILS
            </h2>


            <div className="border border-[#2A2A26] bg-[#0B0B0A] divide-y divide-[#2A2A26] text-xs">

              <div className="p-4 flex justify-between">

                <span className="text-[#8A8A85] uppercase tracking-wider">
                  REFERENCE NUMBER
                </span>

                <span className="font-mono text-[#F4F1E9] font-medium">
                  {product.reference}
                </span>

              </div>


              <div className="p-4 flex justify-between">

                <span className="text-[#8A8A85] uppercase tracking-wider">
                  CALIBRE MOVEMENT
                </span>

                <span className="text-[#F4F1E9] font-medium">
                  {product.movement}
                </span>

              </div>


              <div className="p-4 flex justify-between">

                <span className="text-[#8A8A85] uppercase tracking-wider">
                  CASE DIAMETER
                </span>

                <span className="text-[#F4F1E9] font-medium">
                  {product.caseSizeMm} MM
                </span>

              </div>


              <div className="p-4 flex justify-between">

                <span className="text-[#8A8A85] uppercase tracking-wider">
                  CASE MATERIAL
                </span>

                <span className="text-[#F4F1E9] font-medium">
                  {product.caseMaterial}
                </span>

              </div>


              <div className="p-4 flex justify-between">

                <span className="text-[#8A8A85] uppercase tracking-wider">
                  CRYSTAL GLASS
                </span>

                <span className="text-[#F4F1E9] font-medium">
                  {product.crystal}
                </span>

              </div>


              <div className="p-4 flex justify-between">

                <span className="text-[#8A8A85] uppercase tracking-wider">
                  WATER RESISTANCE
                </span>

                <span className="text-[#F4F1E9] font-medium">
                  {product.waterResistance}
                </span>

              </div>


              <div className="p-4 flex justify-between">

                <span className="text-[#8A8A85] uppercase tracking-wider">
                  STRAP / BRACELET
                </span>

                <span className="text-[#F4F1E9] font-medium">
                  {product.strapMaterial}
                </span>

              </div>


              {product.powerReserve && (

                <div className="p-4 flex justify-between">

                  <span className="text-[#8A8A85] uppercase tracking-wider">
                    POWER RESERVE
                  </span>

                  <span className="text-[#C5A880] font-medium">
                    {product.powerReserve}
                  </span>

                </div>

              )}


              <div className="p-4 flex justify-between">

                <span className="text-[#8A8A85] uppercase tracking-wider">
                  DIAL FINISH
                </span>

                <span className="text-[#F4F1E9] font-medium">
                  {product.dialColor}
                </span>

              </div>

            </div>

          </div>

        </div>

      </div>


      {/* Related Products */}
      {relatedProducts.length > 0 && (

        <div className="max-w-7xl mx-auto px-6 py-20 border-t border-[#2A2A26]">

          <div className="flex justify-between items-end mb-12">

            <div>

              <span className="text-[10px] uppercase tracking-[0.3em] text-[#C5A880] block mb-1">
                RECOMMENDED
              </span>

              <h3 className="font-serif text-3xl text-[#F4F1E9]">
                SIMILAR TIMEPIECES
              </h3>

            </div>

          </div>


          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">

            {relatedProducts.map((rel) => (

              <ProductCard
                key={rel.id}
                product={rel}
              />

            ))}

          </div>

        </div>

      )}


      {/* Mobile Purchase Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#151514]/95 backdrop-blur-md border-t border-[#2A2A26] p-4 flex items-center justify-between">

        <div>

          <span className="text-[9px] uppercase tracking-widest text-[#8A8A85] block">
            {product.brand}
          </span>

          <span className="font-serif text-lg text-[#F4F1E9] font-semibold">
            {formattedPrice}
          </span>

        </div>


        <button
          disabled={!isInStock}
          onClick={() =>
            isInStock && addToCart(product)
          }
          className={`px-6 py-3 font-bold text-xs uppercase tracking-widest ${isInStock
              ? 'bg-[#C5A880] text-[#0B0B0A]'
              : 'bg-[#2A2A26] text-[#666] cursor-not-allowed'
            }`}
        >
          {isInStock
            ? 'ADD TO BAG'
            : 'OUT OF STOCK'}
        </button>

      </div>


      <FooterVelaro />

    </div>
  );
};