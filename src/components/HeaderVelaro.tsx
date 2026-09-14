import React, { useEffect, useState } from 'react';
import {
  Search,
  ShoppingBag,
  Heart,
  Menu,
  User,
  ChevronDown,
  X,
  Shield
} from 'lucide-react';

import {
  useShop,
  PageView,
  CurrencyType
} from '../context/ShopContext';

import { useAuth } from '../context/AuthContext';
import { SHOP_BRANDS } from '../data/catalog';

import {
  doc,
  getDoc
} from 'firebase/firestore';

import { db } from '../firebase/firebase';

const luxuryBrands = [
  'Rolex',
  'Patek Philippe',
  'Audemars Piguet',
  'Cartier',
  'Omega',
  'Richard Mille',
  'Vacheron Constantin',
  'IWC',
  'Breitling',
  'Tudor',
  'Grand Seiko',
  'Jaeger-LeCoultre'
];

const premiumBrands = [
  'Longines',
  'Tissot',
  'Hamilton',
  'Rado',
  'Oris',
  'Frederique Constant',
  'Nomos',
  'Seiko'
];

const everydayBrands = [
  'Casio',
  'G-Shock',
  'Swatch',
  'Citizen',
  'Bulova',
  'D1 Milano'
];

const timepieceTypes = [
  'Automatic',
  'Mechanical',
  'Quartz',
  'Digital',
  'Chronograph',
  'Solar',
  'Smart Watches'
];

export const HeaderVelaro: React.FC = () => {
  const {
    setActivePage,
    cartCount,
    wishlist,
    currency,
    setCurrency,
    setIsCartOpen,
    setIsSearchOpen,
    navigateToBrand,
    navigateToCategory
  } = useShop();

  const { user } = useAuth();

  const [scrolled, setScrolled] =
    useState(false);

  const [menu, setMenu] =
    useState<
      | 'brands'
      | 'timepieces'
      | 'luxury'
      | 'admin'
      | null
    >(null);

  const [mobile, setMobile] =
    useState(false);

  const [isAdmin, setIsAdmin] =
    useState(false);

  /*
    ==========================================
    CHECK IF CURRENT USER IS ADMIN
    ==========================================
  */
  useEffect(() => {
    let cancelled = false;

    const checkAdmin = async () => {
      if (!user) {
        if (!cancelled) {
          setIsAdmin(false);
        }

        return;
      }

      try {
        const adminRef =
          doc(
            db,
            'admins',
            user.uid
          );

        const snapshot =
          await getDoc(
            adminRef
          );

        if (!cancelled) {
          setIsAdmin(
            snapshot.exists()
          );
        }

      } catch (error) {
        console.error(
          'Failed to check admin status:',
          error
        );

        if (!cancelled) {
          setIsAdmin(false);
        }
      }
    };

    checkAdmin();

    return () => {
      cancelled = true;
    };
  }, [user]);

  /*
    ==========================================
    SCROLL EFFECT
    ==========================================
  */
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(
        window.scrollY > 30
      );
    };

    window.addEventListener(
      'scroll',
      handleScroll
    );

    return () =>
      window.removeEventListener(
        'scroll',
        handleScroll
      );

  }, []);

  const page = (
    p: PageView
  ) => {
    setActivePage(p);

    setMenu(null);

    setMobile(false);

    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const accountPage = () => {
    if (user) {
      page('account');
    } else {
      page('auth');
    }
  };

  const category = (
    c: string
  ) => {
    navigateToCategory(c);

    setMenu(null);

    setMobile(false);
  };

  const brand = (
    name: string
  ) => {
    const b =
      SHOP_BRANDS.find(
        (x) =>
          x.name.toLowerCase() ===
          name.toLowerCase()
      );

    if (b) {
      navigateToBrand(
        b.slug
      );
    } else {
      category(name);
    }
  };

  return (
    <header
      className="fixed top-0 left-0 right-0 z-40"
      onMouseLeave={() =>
        setMenu(null)
      }
    >

      {/* TOP MESSAGE */}

      <div className="bg-[#050505] border-b border-[#1A1A18] py-1.5 text-center text-[9px] uppercase tracking-[0.25em] text-[#A5A5A5]">
        COMPLIMENTARY INSURED DELIVERY ON LUXURY TIMEPIECES
      </div>

      {/* HEADER */}

      <div
        className={`${scrolled
          ? 'bg-[#080808]/95 backdrop-blur-md border-b border-[#161616]'
          : 'bg-gradient-to-b from-[#080808] to-transparent'
          } py-4`}
      >

        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">

          {/* LEFT */}

          <div className="flex items-center gap-3">

            <button
              aria-label="Open navigation"
              className="lg:hidden p-1.5"
              onClick={() =>
                setMobile(true)
              }
            >
              <Menu size={20} />
            </button>

            <button
              aria-label="Search"
              onClick={() =>
                setIsSearchOpen(true)
              }
            >
              <Search size={18} />
            </button>

          </div>

          {/* LOGO */}

          <button
            onClick={() =>
              page('home')
            }
            className="text-center"
          >

            <span className="font-serif text-2xl tracking-[0.25em]">
              VELARO
            </span>

            <span className="block text-[8px] tracking-[0.4em] text-[#C6A15B]">
              TIME, ELEVATED.
            </span>

          </button>

          {/* RIGHT */}

          <div className="flex items-center gap-4">

            {/* ADMIN ICON */}

            {isAdmin && (
              <button
                aria-label="Admin inventory"
                title="Admin"
                onClick={() =>
                  page(
                    'admin-inventory'
                  )
                }
                className="text-[#C6A15B]"
              >
                <Shield size={18} />
              </button>
            )}

            {/* ACCOUNT */}

            <button
              aria-label={
                user
                  ? 'Account'
                  : 'Sign in'
              }
              title={
                user
                  ? user.email ||
                  'Account'
                  : 'Sign in'
              }
              onClick={
                accountPage
              }
              className={
                user
                  ? 'text-[#C6A15B]'
                  : ''
              }
            >
              <User size={18} />
            </button>

            {/* WISHLIST */}

            <button
              aria-label="Wishlist"
              onClick={() =>
                page(
                  'wishlist'
                )
              }
              className="relative"
            >

              <Heart size={18} />

              {wishlist.length >
                0 && (
                  <span className="absolute -top-2 -right-2 text-[8px] rounded-full bg-[#C6A15B] text-black w-3.5 h-3.5 flex items-center justify-center">
                    {wishlist.length}
                  </span>
                )}

            </button>

            {/* CART */}

            <button
              aria-label="Cart"
              onClick={() =>
                setIsCartOpen(
                  true
                )
              }
              className="relative"
            >

              <ShoppingBag
                size={18}
              />

              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 text-[8px] rounded-full bg-[#C6A15B] text-black w-3.5 h-3.5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}

            </button>

          </div>

        </div>

        {/* DESKTOP NAV */}

        <nav className="hidden lg:flex justify-center gap-8 mt-4 pt-3 border-t border-white/[0.05] text-[10px] uppercase tracking-[0.2em]">

          <button
            onClick={() =>
              category(
                'New Arrivals'
              )
            }
          >
            NEW ARRIVALS
          </button>

          <button
            onMouseEnter={() =>
              setMenu('brands')
            }
            onClick={() =>
              setMenu(
                menu === 'brands'
                  ? null
                  : 'brands'
              )
            }
            className="flex items-center gap-1"
          >
            BRANDS
            <ChevronDown
              size={12}
            />
          </button>

          <button
            onMouseEnter={() =>
              setMenu(
                'timepieces'
              )
            }
            onClick={() =>
              setMenu(
                menu ===
                  'timepieces'
                  ? null
                  : 'timepieces'
              )
            }
            className="flex items-center gap-1"
          >
            TIMEPIECES
            <ChevronDown
              size={12}
            />
          </button>

          <button
            onMouseEnter={() =>
              setMenu('luxury')
            }
            onClick={() =>
              setMenu(
                menu ===
                  'luxury'
                  ? null
                  : 'luxury'
              )
            }
            className="flex items-center gap-1"
          >
            LUXURY
            <ChevronDown
              size={12}
            />
          </button>

          <button
            onClick={() =>
              page(
                'bespoke'
              )
            }
          >
            BESPOKE
          </button>

          <button
            onClick={() =>
              category(
                'Accessories'
              )
            }
          >
            ACCESSORIES
          </button>

          <button
            onClick={() =>
              page(
                'journal'
              )
            }
          >
            JOURNAL
          </button>

          {/* ADMIN NAV */}

          {isAdmin && (
            <button
              onMouseEnter={() =>
                setMenu(
                  'admin'
                )
              }
              onClick={() =>
                setMenu(
                  menu ===
                    'admin'
                    ? null
                    : 'admin'
                )
              }
              className="flex items-center gap-1 text-[#C6A15B]"
            >
              ADMIN
              <ChevronDown
                size={12}
              />
            </button>
          )}

        </nav>

      </div>

      {/* DESKTOP MEGA MENU */}

      {menu && (
        <div className="hidden lg:block bg-[#111] border-b border-[#222] shadow-2xl p-6">

          <div className="max-w-7xl mx-auto text-xs text-[#A5A5A5]">

            {menu ===
              'brands' && (
                <div className="grid grid-cols-3 gap-8">

                  <BrandCol
                    title="LUXURY BRANDS"
                    items={
                      luxuryBrands
                    }
                    onClick={
                      brand
                    }
                  />

                  <BrandCol
                    title="PREMIUM / HOROLOGY"
                    items={
                      premiumBrands
                    }
                    onClick={
                      brand
                    }
                  />

                  <div>

                    <BrandCol
                      title="EVERYDAY / FASHION"
                      items={
                        everydayBrands
                      }
                      onClick={
                        brand
                      }
                    />

                    <button
                      onClick={() =>
                        page(
                          'brand'
                        )
                      }
                      className="mt-4 text-[#C6A15B] uppercase tracking-widest text-[10px]"
                    >
                      VIEW ALL BRANDS →
                    </button>

                  </div>

                </div>
              )}

            {menu ===
              'timepieces' && (
                <div className="grid grid-cols-3 gap-8">

                  <BrandCol
                    title="SHOP BY GENDER"
                    items={[
                      'Men',
                      'Women',
                      'Junior / Kids'
                    ]}
                    onClick={
                      category
                    }
                  />

                  <BrandCol
                    title="SHOP BY TYPE"
                    items={
                      timepieceTypes
                    }
                    onClick={
                      category
                    }
                  />

                  <BrandCol
                    title="DISCOVER"
                    items={[
                      'All Watches',
                      'Best Sellers'
                    ]}
                    onClick={
                      category
                    }
                  />

                </div>
              )}

            {menu ===
              'luxury' && (
                <div className="grid grid-cols-3 gap-8">

                  <BrandCol
                    title="LUXURY"
                    items={[
                      'Luxury Deals',
                      'Brand New',
                      'Certified Pre-Owned'
                    ]}
                    onClick={(
                      x
                    ) =>
                      x ===
                        'Certified Pre-Owned'
                        ? page(
                          'certified-preowned'
                        )
                        : category(
                          x
                        )
                    }
                  />

                  <BrandCol
                    title="SELECTED BRANDS"
                    items={luxuryBrands.slice(
                      0,
                      6
                    )}
                    onClick={
                      brand
                    }
                  />

                </div>
              )}

            {/* ADMIN MENU */}

            {menu ===
              'admin' &&
              isAdmin && (
                <div className="grid grid-cols-2 gap-8 max-w-xl">

                  <div>

                    <h4 className="text-[10px] uppercase tracking-[0.2em] text-[#C6A15B] font-semibold mb-3">
                      STORE MANAGEMENT
                    </h4>

                    <div className="space-y-3">

                      <button
                        onClick={() =>
                          page(
                            'admin-orders'
                          )
                        }
                        className="block hover:text-white"
                      >
                        CUSTOMER ORDERS
                      </button>

                      <button
                        onClick={() =>
                          page(
                            'admin-inventory'
                          )
                        }
                        className="block hover:text-white"
                      >
                        INVENTORY
                      </button>

                    </div>

                  </div>

                  <div>

                    <p className="text-[10px] uppercase tracking-[0.2em] text-[#A5A5A5]">
                      ADMIN ACCESS
                    </p>

                    <p className="text-xs mt-3 text-[#F5F5F5] break-all">
                      {user?.email}
                    </p>

                  </div>

                </div>
              )}

          </div>

        </div>
      )}

      {/* MOBILE MENU */}

      {mobile && (
        <div className="lg:hidden fixed inset-0 z-50 bg-[#080808] p-6 overflow-y-auto">

          <div className="flex justify-between border-b border-[#222] pb-5">

            <span className="font-serif text-2xl tracking-widest text-[#C6A15B]">
              VELARO
            </span>

            <button
              aria-label="Close navigation"
              onClick={() =>
                setMobile(
                  false
                )
              }
            >
              <X size={24} />
            </button>

          </div>

          <div className="py-6 space-y-2">

            {[
              'New Arrivals',
              'Brands',
              'Timepieces',
              'Luxury',
              'Bespoke',
              'Accessories',
              'Journal'
            ].map(
              (x) => (

                <button
                  key={x}
                  onClick={() =>
                    x ===
                      'Bespoke'
                      ? page(
                        'bespoke'
                      )
                      : x ===
                        'Journal'
                        ? page(
                          'journal'
                        )
                        : x ===
                          'Brands' ||
                          x ===
                          'Timepieces' ||
                          x ===
                          'Luxury'
                          ? setMenu(
                            x.toLowerCase() as
                            | 'brands'
                            | 'timepieces'
                            | 'luxury'
                          )
                          : category(
                            x
                          )
                  }
                  className="block w-full text-left font-serif text-xl py-3 border-b border-[#161616]"
                >
                  {x}
                </button>

              )
            )}

            {/* MOBILE ADMIN */}

            {isAdmin && (
              <div className="border-t border-[#222] mt-5 pt-5">

                <p className="text-[9px] uppercase tracking-[0.2em] text-[#C6A15B] mb-2">
                  ADMIN
                </p>

                <button
                  onClick={() =>
                    page(
                      'admin-orders'
                    )
                  }
                  className="block w-full text-left py-3 border-b border-[#161616]"
                >
                  Customer Orders
                </button>

                <button
                  onClick={() =>
                    page(
                      'admin-inventory'
                    )
                  }
                  className="block w-full text-left py-3 border-b border-[#161616]"
                >
                  Inventory
                </button>

              </div>
            )}

            <button
              onClick={
                accountPage
              }
              className="block w-full text-left py-3"
            >
              {user
                ? 'My Account'
                : 'Sign In / Create Account'}
            </button>

            <button
              onClick={() =>
                page(
                  'wishlist'
                )
              }
              className="block w-full text-left py-3"
            >
              Wishlist
            </button>

            <select
              aria-label="Currency"
              value={
                currency
              }
              onChange={(
                e
              ) =>
                setCurrency(
                  e.target
                    .value as CurrencyType
                )
              }
              className="field mt-4"
            >

              {[
                'EGP',
                'USD',
                'EUR',
                'GBP'
              ].map(
                (c) => (
                  <option
                    key={c}
                  >
                    {c}
                  </option>
                )
              )}

            </select>

          </div>

        </div>
      )}

    </header>
  );
};

function BrandCol({
  title,
  items,
  onClick
}: {
  title: string;
  items: string[];
  onClick: (
    x: string
  ) => void;
}) {
  return (
    <div>

      <h4 className="text-[10px] uppercase tracking-[0.2em] text-[#C6A15B] font-semibold mb-3">
        {title}
      </h4>

      <ul className="space-y-1.5">

        {items.map(
          (x) => (

            <li key={x}>

              <button
                onClick={() =>
                  onClick(x)
                }
                className="hover:text-white text-left"
              >
                {x}
              </button>

            </li>

          )
        )}

      </ul>

    </div>
  );
}