import React, { useState } from 'react';

import {
  X,
  Plus,
  Minus,
  Trash2,
  ArrowRight,
  ShieldCheck,
  Truck,
  Lock,
  Check
} from 'lucide-react';

import {
  collection,
  addDoc,
  doc,
  getDoc,
  getDocs,
  query,
  where,
  limit,
  serverTimestamp
} from 'firebase/firestore';

import { useShop } from '../context/ShopContext';
import { useAuth } from '../context/AuthContext';
import { useDialog } from '../hooks/useDialog';
import { db } from '../firebase/firebase';

export const CartDrawerVelaro: React.FC = () => {
  const {
    isCartOpen,
    setIsCartOpen,
    cart,
    removeFromCart,
    updateQuantity,
    cartTotalUsd,
    formatPrice,
    navigateToProduct,
    setActivePage,
    currency,
    showToast
  } = useShop();

  const { user } = useAuth();

  const [isCheckingOut, setIsCheckingOut] =
    useState(false);

  const [checkoutComplete, setCheckoutComplete] =
    useState(false);

  const [orderId, setOrderId] =
    useState('');

  const [checkoutError, setCheckoutError] =
    useState('');

  const dialogRef = useDialog(
    !!isCartOpen,
    () => {
      setIsCartOpen(false);
    }
  );

  if (!isCartOpen) {
    return null;
  }

  /*
    ==================================================
    CHECK LIVE FIREBASE STOCK
    ==================================================

    This runs immediately before creating the order.

    It prevents:
    - ordering a product that has become sold out
    - ordering more units than currently available
    - stale cart quantities
  */
  const validateLiveStock =
    async () => {

      for (const item of cart) {
        const reference =
          item.product.reference?.trim();

        if (!reference) {
          throw new Error(
            `${item.product.brand} ${item.product.name} has no reference number.`
          );
        }

        const productQuery =
          query(
            collection(
              db,
              'products'
            ),

            where(
              'reference',
              '==',
              reference
            ),

            limit(1)
          );

        const snapshot =
          await getDocs(
            productQuery
          );

        if (snapshot.empty) {
          throw new Error(
            `${item.product.brand} ${item.product.name} could not be found in inventory.`
          );
        }

        const liveProduct =
          snapshot.docs[0].data();

        const liveStock =
          typeof liveProduct.stock ===
            'number'
            ? liveProduct.stock
            : 0;

        /*
          Product completely sold out.
        */
        if (liveStock <= 0) {
          throw new Error(
            `${item.product.brand} ${item.product.name} is now out of stock.`
          );
        }

        /*
          Customer has more units in cart
          than Firestore currently has.
        */
        if (
          item.quantity >
          liveStock
        ) {
          throw new Error(
            `Only ${liveStock} available for ${item.product.brand} ${item.product.name}. Please reduce the quantity before ordering.`
          );
        }
      }
    };

  const handleCheckout =
    async () => {

      setCheckoutError('');

      /*
        Customer must be signed in.
      */
      if (!user) {
        setIsCartOpen(false);

        showToast(
          'SIGN IN REQUIRED',
          'Please sign in before placing your order.',
          'info'
        );

        setActivePage('auth');

        return;
      }

      if (
        cart.length === 0
      ) {
        return;
      }

      try {
        setIsCheckingOut(true);

        /*
          ==================================================
          STEP 1
          GET CUSTOMER PROFILE
          ==================================================
        */

        const userRef =
          doc(
            db,
            'users',
            user.uid
          );

        const userSnapshot =
          await getDoc(
            userRef
          );

        const userData =
          userSnapshot.exists()
            ? userSnapshot.data()
            : {};

        const address =
          userData.address;

        /*
          Require delivery address.
        */
        if (
          !address?.street ||
          !address?.city ||
          !address?.governorate
        ) {
          setCheckoutError(
            'Please save your delivery address in My Account before placing an order.'
          );

          return;
        }

        /*
          ==================================================
          STEP 2
          CHECK LIVE FIREBASE STOCK
          ==================================================
        */

        await validateLiveStock();

        /*
          If we reached here, every item
          currently has enough stock.
        */

        /*
          ==================================================
          STEP 3
          BUILD ORDER ITEMS
          ==================================================
        */

        const orderItems =
          cart.map(
            (item) => ({
              productId:
                item.product.id,

              brand:
                item.product.brand,

              name:
                item.product.name,

              reference:
                item.product.reference,

              quantity:
                item.quantity,

              priceUsd:
                item.product.priceUsd,

              lineTotalUsd:
                item.product.priceUsd *
                item.quantity,

              image:
                item.product.images?.front ??
                ''
            })
          );

        /*
          ==================================================
          STEP 4
          CREATE ORDER
          ==================================================
        */

        const ordersRef =
          collection(
            db,
            'users',
            user.uid,
            'orders'
          );

        const newOrder =
          await addDoc(
            ordersRef,
            {
              userId:
                user.uid,

              email:
                user.email ?? '',

              customer: {
                firstName:
                  userData.firstName ??
                  '',

                lastName:
                  userData.lastName ??
                  '',

                phone:
                  userData.phone ??
                  ''
              },

              deliveryAddress: {
                street:
                  address.street ??
                  '',

                city:
                  address.city ??
                  '',

                governorate:
                  address.governorate ??
                  '',

                postalCode:
                  address.postalCode ??
                  ''
              },

              items:
                orderItems,

              totalUsd:
                cartTotalUsd,

              currency,

              status:
                'pending',

              paymentStatus:
                'not_paid',

              /*
                Stock has NOT been reduced yet.

                Your admin system will reduce
                it when the order is confirmed.
              */
              inventoryAdjusted:
                false,

              createdAt:
                serverTimestamp()
            }
          );

        setOrderId(
          newOrder.id
        );

        /*
          ==================================================
          STEP 5
          CLEAR CART
          ==================================================
        */

        cart.forEach(
          (item) => {

            removeFromCart(
              item.product.id
            );
          }
        );

        setCheckoutComplete(
          true
        );

        showToast(
          'ORDER CREATED',
          'Your order has been saved to your VELARO account.',
          'cart'
        );

      } catch (error) {

        console.error(
          'Checkout failed:',
          error
        );

        const message =
          error instanceof Error
            ? error.message
            : 'We could not create your order. Please try again.';

        setCheckoutError(
          message
        );

        showToast(
          'ORDER NOT CREATED',
          message,
          'info'
        );

      } finally {

        setIsCheckingOut(
          false
        );
      }
    };

  return (
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label="Shopping bag"
      tabIndex={-1}
      className="dialog-overlay fixed inset-0 z-50 overflow-hidden animate-fadeIn"
    >

      {/* BACKDROP */}

      <div
        className="absolute inset-0 bg-[#080808]/80 backdrop-blur-sm transition-opacity"
        onClick={() => {
          setIsCartOpen(false);
          setCheckoutComplete(false);
          setCheckoutError('');
        }}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">

        <div className="w-screen max-w-md bg-[#111111] border-l border-[#222222] shadow-2xl flex flex-col justify-between text-[#F5F5F5]">

          {/* HEADER */}

          <div className="p-6 border-b border-[#222222] flex items-center justify-between">

            <div className="flex items-center space-x-2">

              <span className="font-serif text-2xl font-semibold tracking-wide">
                SHOPPING BAG
              </span>

              <span className="text-xs text-[#C6A15B] tracking-widest font-mono">
                ({cart.length})
              </span>

            </div>

            <button
              aria-label="Close shopping bag"
              onClick={() => {
                setIsCartOpen(false);
                setCheckoutComplete(false);
                setCheckoutError('');
              }}
              className="p-2 border border-[#222222] hover:border-[#C6A15B] text-[#F5F5F5] hover:text-[#C6A15B] transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

          </div>

          {/* SUCCESS SCREEN */}

          {checkoutComplete ? (

            <div className="p-8 text-center flex-1 flex flex-col items-center justify-center space-y-4">

              <div className="w-16 h-16 rounded-full bg-[#C6A15B]/20 border border-[#C6A15B] mx-auto flex items-center justify-center text-[#C6A15B]">

                <Check className="w-8 h-8" />

              </div>

              <p className="eyebrow">
                ORDER RECEIVED
              </p>

              <h3 className="font-serif text-3xl text-[#F5F5F5]">
                Your selection has been reserved for review.
              </h3>

              <p className="text-xs text-[#A5A5A5] max-w-xs leading-relaxed font-light">
                Your order has been saved to your VELARO account.
                No payment has been taken yet.
              </p>

              {orderId && (

                <div className="border border-white/10 bg-[#080808] px-4 py-3 w-full">

                  <p className="text-[8px] uppercase tracking-[0.2em] text-[#A5A5A5]">
                    ORDER REFERENCE
                  </p>

                  <p className="text-xs text-[#C6A15B] mt-1 break-all">
                    {orderId}
                  </p>

                </div>

              )}

              <button
                onClick={() => {
                  setCheckoutComplete(false);
                  setIsCartOpen(false);
                  setActivePage('account');
                }}
                className="mt-6 px-8 py-3 bg-[#C6A15B] text-[#080808] text-xs font-bold uppercase tracking-widest hover:bg-[#F5F5F5]"
              >
                VIEW MY ACCOUNT
              </button>

              <button
                onClick={() => {
                  setCheckoutComplete(false);
                  setIsCartOpen(false);
                  setActivePage('collection');
                }}
                className="text-[10px] uppercase tracking-widest text-[#A5A5A5] hover:text-[#C6A15B]"
              >
                CONTINUE SHOPPING
              </button>

            </div>

          ) : (

            <>

              {/* CART ITEMS */}

              <div className="flex-1 overflow-y-auto p-6 space-y-6">

                {cart.length === 0 ? (

                  <div className="text-center py-16 space-y-4">

                    <p className="font-serif text-2xl text-[#A5A5A5]">
                      Your bag is currently empty
                    </p>

                    <p className="text-xs text-[#A5A5A5] tracking-wider uppercase">
                      Explore our New Arrivals or Collector&apos;s Vault.
                    </p>

                  </div>

                ) : (

                  cart.map(
                    (item) => {

                      const availableStock =
                        typeof item.product.stock ===
                          'number'
                          ? item.product.stock
                          : 1;

                      const atStockLimit =
                        item.quantity >=
                        availableStock;

                      return (
                        <div
                          key={
                            item.product.id
                          }
                          className="flex space-x-4 p-4 bg-[#080808] border border-[#222222] relative group rounded-velaro"
                        >

                          <img
                            src={
                              item.product.images.front
                            }
                            alt={
                              item.product.name
                            }
                            className="w-20 h-24 object-cover cursor-pointer"
                            onClick={() => {

                              navigateToProduct(
                                item.product.id
                              );

                              setIsCartOpen(
                                false
                              );
                            }}
                          />

                          <div className="flex-1 flex flex-col justify-between">

                            <div>

                              <div className="flex justify-between items-start">

                                <div>

                                  <span className="text-[9px] uppercase tracking-widest text-[#C6A15B] font-semibold">
                                    {item.product.brand}
                                  </span>

                                  <h4
                                    onClick={() => {

                                      navigateToProduct(
                                        item.product.id
                                      );

                                      setIsCartOpen(
                                        false
                                      );
                                    }}
                                    className="font-serif text-base text-[#F5F5F5] line-clamp-1 hover:text-[#C6A15B] cursor-pointer"
                                  >
                                    {item.product.name}
                                  </h4>

                                </div>

                                <button
                                  onClick={() =>
                                    removeFromCart(
                                      item.product.id
                                    )
                                  }
                                  className="text-[#A5A5A5] hover:text-red-400 p-1"
                                  title="Remove item"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>

                              </div>

                              <span className="text-[10px] text-[#A5A5A5] block mt-1 font-mono">
                                Ref: {item.product.reference}
                              </span>

                              <span className="text-[9px] text-[#C6A15B] uppercase tracking-wider block mt-1">
                                {availableStock > 0
                                  ? `${availableStock} available`
                                  : 'Out of stock'}
                              </span>

                            </div>

                            <div className="flex items-center justify-between mt-3 pt-2 border-t border-[#222222]">

                              <div className="flex items-center space-x-2 border border-[#222222] px-2 py-0.5">

                                <button
                                  aria-label={`Decrease quantity of ${item.product.name}`}
                                  disabled={
                                    item.quantity <=
                                    1
                                  }
                                  onClick={() =>
                                    updateQuantity(
                                      item.product.id,
                                      -1
                                    )
                                  }
                                  className="text-[#A5A5A5] hover:text-[#F5F5F5] disabled:opacity-30"
                                >
                                  <Minus className="w-3 h-3" />
                                </button>

                                <span className="text-xs font-semibold px-1">
                                  {item.quantity}
                                </span>

                                <button
                                  aria-label={`Increase quantity of ${item.product.name}`}
                                  disabled={
                                    atStockLimit
                                  }
                                  onClick={() =>
                                    updateQuantity(
                                      item.product.id,
                                      1
                                    )
                                  }
                                  className="text-[#A5A5A5] hover:text-[#F5F5F5] disabled:opacity-30 disabled:cursor-not-allowed"
                                >
                                  <Plus className="w-3 h-3" />
                                </button>

                              </div>

                              <span className="font-sans text-sm font-semibold text-[#F5F5F5]">
                                {formatPrice(
                                  item.product.priceUsd *
                                  item.quantity
                                )}
                              </span>

                            </div>

                          </div>

                        </div>
                      );
                    }
                  )
                )}

              </div>

              {/* FOOTER */}

              {cart.length > 0 && (

                <div className="p-6 border-t border-[#222222] bg-[#080808] space-y-4">

                  <div className="flex items-center justify-between text-[9px] uppercase tracking-wider text-[#A5A5A5]">

                    <span className="flex items-center">
                      <Truck className="w-3.5 h-3.5 text-[#C6A15B] mr-1.5" />
                      Insured Delivery
                    </span>

                    <span className="flex items-center">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#C6A15B] mr-1.5" />
                      VELARO Warranty
                    </span>

                  </div>

                  <div className="space-y-2 pt-2 border-t border-[#222222]">

                    <div className="flex justify-between text-xs text-[#A5A5A5]">

                      <span>
                        SUBTOTAL
                      </span>

                      <span className="text-[#F5F5F5] font-medium">
                        {formatPrice(
                          cartTotalUsd
                        )}
                      </span>

                    </div>

                    <div className="flex justify-between text-xs text-[#A5A5A5]">

                      <span>
                        INSURED EXPRESS SHIPPING
                      </span>

                      <span className="text-[#C6A15B]">
                        COMPLIMENTARY
                      </span>

                    </div>

                    <div className="flex justify-between text-sm font-semibold text-[#F5F5F5] pt-2 border-t border-[#222222]">

                      <span>
                        TOTAL
                      </span>

                      <span className="text-[#C6A15B] font-serif text-lg">
                        {formatPrice(
                          cartTotalUsd
                        )}
                      </span>

                    </div>

                  </div>

                  {checkoutError && (

                    <div className="border border-red-500/30 bg-red-500/10 p-3 text-xs text-red-300 leading-relaxed">
                      {checkoutError}
                    </div>

                  )}

                  <p className="text-xs text-[#A5A5A5] leading-relaxed">
                    Stock availability will be checked again before your order is created.
                    Payment integration will be added separately.
                  </p>

                  <button
                    onClick={
                      handleCheckout
                    }
                    disabled={
                      isCheckingOut
                    }
                    className="w-full py-4 bg-[#C6A15B] hover:bg-[#F5F5F5] text-[#080808] font-bold text-xs uppercase tracking-[0.2em] transition-all flex items-center justify-center space-x-2 disabled:opacity-50"
                  >

                    <Lock className="w-3.5 h-3.5" />

                    <span>
                      {isCheckingOut
                        ? 'CHECKING STOCK...'
                        : user
                          ? 'PLACE ORDER'
                          : 'SIGN IN TO CHECKOUT'}
                    </span>

                    {!isCheckingOut && (
                      <ArrowRight className="w-4 h-4" />
                    )}

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