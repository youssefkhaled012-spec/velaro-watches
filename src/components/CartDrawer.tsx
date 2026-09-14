import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { X, Plus, Minus, Trash2, ArrowRight, ShieldCheck, Truck, Check } from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const { isCartOpen, setIsCartOpen, cart, removeFromCart, updateQuantity, cartTotalEgp, navigateToProduct } = useShop();

  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [checkoutComplete, setCheckoutComplete] = useState(false);

  if (!isCartOpen) return null;

  const formattedTotal = new Intl.NumberFormat('en-EG', {
    style: 'currency',
    currency: 'EGP',
    maximumFractionDigits: 0
  }).format(cartTotalEgp);

  const handleCheckout = () => {
    setIsCheckingOut(true);
    setTimeout(() => {
      setIsCheckingOut(false);
      setCheckoutComplete(true);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-fadeIn">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-[#0B0B0A]/80 backdrop-blur-sm transition-opacity"
        onClick={() => {
          setIsCartOpen(false);
          setCheckoutComplete(false);
        }}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#151514] border-l border-[#2A2A26] shadow-2xl flex flex-col justify-between text-[#F4F1E9]">
          
          {/* Header */}
          <div className="p-6 border-b border-[#2A2A26] flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="font-serif text-2xl font-semibold tracking-wide">YOUR BAG</span>
              <span className="text-xs text-[#C5A880] tracking-widest font-sans">
                ({cart.length} TIMEPIECE{cart.length !== 1 ? 'S' : ''})
              </span>
            </div>
            <button
              onClick={() => {
                setIsCartOpen(false);
                setCheckoutComplete(false);
              }}
              className="p-2 border border-[#2A2A26] hover:border-[#C5A880] text-[#F4F1E9] hover:text-[#C5A880] transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Checkout Success Screen */}
          {checkoutComplete ? (
            <div className="p-8 text-center flex-1 flex flex-col items-center justify-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#C5A880]/20 border border-[#C5A880] flex items-center justify-center text-[#C5A880]">
                <Check className="w-8 h-8" />
              </div>
              <h3 className="font-serif text-3xl text-[#F4F1E9]">Order Reserved</h3>
              <p className="text-xs text-[#8A8A85] max-w-xs leading-relaxed">
                Your luxury selection has been reserved with Azzam Vault Services. A private concierge representative will contact you for white-glove verification and delivery.
              </p>
              <button
                onClick={() => {
                  setCheckoutComplete(false);
                  setIsCartOpen(false);
                }}
                className="mt-6 px-6 py-3 bg-[#C5A880] text-[#0B0B0A] text-xs font-bold uppercase tracking-widest hover:bg-[#F4F1E9] transition-colors"
              >
                RETURN TO BOUTIQUE
              </button>
            </div>
          ) : (
            <>
              {/* Cart Line Items */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {cart.length === 0 ? (
                  <div className="text-center py-16 space-y-4">
                    <p className="font-serif text-2xl text-[#8A8A85]">Your bag is currently empty</p>
                    <p className="text-xs text-[#8A8A85] tracking-wider uppercase">
                      Explore our curated references or luxury suite.
                    </p>
                  </div>
                ) : (
                  cart.map((item) => (
                    <div
                      key={item.product.id}
                      className="flex space-x-4 p-4 bg-[#0B0B0A] border border-[#2A2A26] relative group"
                    >
                      <img
                        src={item.product.images.front}
                        alt={item.product.name}
                        className="w-20 h-24 object-cover cursor-pointer"
                        onClick={() => {
                          navigateToProduct(item.product.id);
                          setIsCartOpen(false);
                        }}
                      />
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between items-start">
                            <div>
                              <span className="text-[9px] uppercase tracking-widest text-[#C5A880] font-semibold">
                                {item.product.brand}
                              </span>
                              <h4
                                onClick={() => {
                                  navigateToProduct(item.product.id);
                                  setIsCartOpen(false);
                                }}
                                className="font-serif text-base text-[#F4F1E9] line-clamp-1 hover:text-[#C5A880] cursor-pointer"
                              >
                                {item.product.name}
                              </h4>
                            </div>
                            <button
                              onClick={() => removeFromCart(item.product.id)}
                              className="text-[#8A8A85] hover:text-red-400 transition-colors p-1"
                              title="Remove item"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                          <span className="text-[10px] text-[#8A8A85] block mt-1">
                            Ref: {item.product.reference}
                          </span>
                        </div>

                        <div className="flex items-center justify-between mt-3 pt-2 border-t border-[#2A2A26]/50">
                          {/* Quantity selector */}
                          <div className="flex items-center space-x-2 border border-[#2A2A26] px-2 py-0.5">
                            <button
                              onClick={() => updateQuantity(item.product.id, -1)}
                              className="text-[#8A8A85] hover:text-[#F4F1E9]"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="text-xs font-semibold px-1">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.product.id, 1)}
                              className="text-[#8A8A85] hover:text-[#F4F1E9]"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>

                          <span className="font-sans text-sm font-semibold text-[#F4F1E9]">
                            {new Intl.NumberFormat('en-EG', {
                              style: 'currency',
                              currency: 'EGP',
                              maximumFractionDigits: 0
                            }).format(item.product.priceUsd * 49 * item.quantity)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Footer Summary & Checkout */}
              {cart.length > 0 && (
                <div className="p-6 border-t border-[#2A2A26] bg-[#0B0B0A] space-y-4">
                  {/* Delivery & Warranty guarantees */}
                  <div className="flex items-center justify-between text-[10px] uppercase tracking-wider text-[#8A8A85]">
                    <span className="flex items-center">
                      <Truck className="w-3.5 h-3.5 text-[#C5A880] mr-1.5" />
                      Insured Delivery in Egypt
                    </span>
                    <span className="flex items-center">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#C5A880] mr-1.5" />
                      Full Manufacturer Warranty
                    </span>
                  </div>

                  <div className="space-y-2 pt-2 border-t border-[#2A2A26]/60">
                    <div className="flex justify-between text-xs text-[#8A8A85]">
                      <span>SUBTOTAL</span>
                      <span className="text-[#F4F1E9] font-medium">{formattedTotal}</span>
                    </div>
                    <div className="flex justify-between text-xs text-[#8A8A85]">
                      <span>SECURE SHIPPING & VAULT PACKAGING</span>
                      <span className="text-[#C5A880]">COMPLIMENTARY</span>
                    </div>
                    <div className="flex justify-between text-sm font-semibold text-[#F4F1E9] pt-2 border-t border-[#2A2A26]">
                      <span>TOTAL (EGP)</span>
                      <span className="text-[#C5A880] font-serif text-lg">{formattedTotal}</span>
                    </div>
                  </div>

                  <button
                    onClick={handleCheckout}
                    disabled={isCheckingOut}
                    className="w-full py-4 bg-[#C5A880] hover:bg-[#F4F1E9] text-[#0B0B0A] font-bold text-xs uppercase tracking-[0.2em] transition-all flex items-center justify-center space-x-2"
                  >
                    <span>{isCheckingOut ? 'PROCESSING RESERVATION...' : 'PROCEED TO CHECKOUT'}</span>
                    {!isCheckingOut && <ArrowRight className="w-4 h-4" />}
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
