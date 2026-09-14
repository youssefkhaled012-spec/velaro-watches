import { matchesFilters } from '../utils/catalogFilters';
import React, { useMemo, useState } from 'react';
import { useShop } from '../context/ShopContext';

import {
  SHOP_PRODUCTS as VELARO_PRODUCTS,
  SHOP_BRANDS as VELARO_BRANDS,
  DEMO_EGP_RATE
} from '../data/catalog';

import { ProductCardVelaro } from '../components/ProductCardVelaro';
import { useFirebaseProducts } from '../hooks/useFirebaseProducts';

import {
  Filter,
  RotateCcw,
  X,
  ChevronRight
} from 'lucide-react';

export const CollectionVelaro: React.FC = () => {

  const {
    filters,
    setFilters,
    resetFilters,
    formatPrice,
    setActivePage
  } = useShop();

  /*
   * FIREBASE PRODUCTS
   */
  const {
    products: firebaseProducts
  } = useFirebaseProducts();

  const [layoutCols, setLayoutCols] =
    useState<2 | 3 | 4>(3);

  const [showFilterDrawer, setShowFilterDrawer] =
    useState(false);

  const [sortBy, setSortBy] =
    useState<
      'featured' |
      'newest' |
      'price-low' |
      'price-high' |
      'popular'
    >('featured');


  /*
   * ==========================================
   * MERGE FIREBASE DATA
   * WITH EXISTING WEBSITE PRODUCTS
   * ==========================================
   *
   * IMPORTANT:
   *
   * Firebase stores live price in EGP.
   *
   * The old website filters expect priceUsd.
   *
   * So we keep BOTH:
   *
   * price    = EGP live price
   * priceUsd = USD-equivalent for filters
   *
   * ProductCardVelaro will display "price"
   * when currency === EGP.
   */
  const mergedProducts = useMemo(() => {

    return VELARO_PRODUCTS.map((product: any) => {

      /*
       * Find matching Firebase product
       * using reference number.
       */
      const firebaseProduct =
        firebaseProducts.find((fp: any) => {

          const firebaseReference =
            String(
              fp.reference ?? ''
            )
              .trim()
              .toLowerCase();

          const localReference =
            String(
              product.reference ?? ''
            )
              .trim()
              .toLowerCase();

          return (
            firebaseReference ===
            localReference
          );

        });


      /*
       * No Firebase product found.
       * Keep original catalogue product.
       */
      if (!firebaseProduct) {
        return product;
      }


      /*
       * Firebase live EGP price.
       */
      const firebasePriceEgp =
        Number(
          firebaseProduct.price ??
          0
        );


      /*
       * Convert EGP back into the USD-style
       * value used by your existing filters.
       *
       * Example:
       *
       * EGP 2,100,000 / 49
       * ≈ USD 42,857
       *
       * This prevents the filter from thinking
       * the watch costs USD 2,100,000.
       */
      const filterPriceUsd =
        firebasePriceEgp > 0
          ? firebasePriceEgp /
          DEMO_EGP_RATE
          : Number(
            product.priceUsd ??
            0
          );


      /*
       * Firebase controls live store fields.
       *
       * Local catalogue still keeps:
       * images
       * badges
       * descriptions
       * IDs
       * other display information
       */
      return {
        ...product,

        brand:
          firebaseProduct.brand ??
          product.brand,

        name:
          firebaseProduct.model ??
          firebaseProduct.name ??
          product.name,

        reference:
          firebaseProduct.reference ??
          product.reference,

        /*
         * REAL DISPLAY PRICE
         * stored in EGP.
         */
        price:
          firebasePriceEgp > 0
            ? firebasePriceEgp
            : undefined,

        /*
         * FILTER/SORT PRICE ONLY.
         */
        priceUsd:
          filterPriceUsd,

        condition:
          firebaseProduct.condition ??
          product.condition,

        year:
          Number(
            firebaseProduct.year ??
            product.year
          ),

        movement:
          firebaseProduct.movement ??
          product.movement,

        isNewArrival:
          firebaseProduct.newArrival ??
          product.isNewArrival,

        stock:
          Number(
            firebaseProduct.stock ??
            product.stock ??
            1
          ),

        currency:
          firebaseProduct.currency ??
          'EGP',

        /*
         * Keep Firebase information
         * available if needed elsewhere.
         */
        firebaseId:
          firebaseProduct.id,

        firebaseConnected:
          true

      };

    });

  }, [firebaseProducts]);


  /*
   * ==========================================
   * FILTER PRODUCTS
   * ==========================================
   */
  const filteredProducts =
    mergedProducts.filter(
      (product: any) =>
        matchesFilters(
          product,
          filters
        )
    );


  /*
   * ==========================================
   * SORT PRODUCTS
   * ==========================================
   *
   * Sorting uses priceUsd because your
   * existing catalogue/filter system
   * expects this field.
   */
  const sortedProducts =
    [...filteredProducts].sort(
      (a: any, b: any) => {

        if (
          sortBy === 'price-low'
        ) {

          return (
            Number(
              a.priceUsd || 0
            ) -
            Number(
              b.priceUsd || 0
            )
          );

        }

        if (
          sortBy === 'price-high'
        ) {

          return (
            Number(
              b.priceUsd || 0
            ) -
            Number(
              a.priceUsd || 0
            )
          );

        }

        if (
          sortBy === 'newest'
        ) {

          return (
            (
              b.isNewArrival
                ? 1
                : 0
            ) -
            (
              a.isNewArrival
                ? 1
                : 0
            )
          );

        }

        if (
          sortBy === 'popular'
        ) {

          return (
            (
              b.isBestseller
                ? 1
                : 0
            ) -
            (
              a.isBestseller
                ? 1
                : 0
            )
          );

        }

        return 0;

      }
    );


  return (

    <div className="min-h-screen bg-[#080808] text-[#F5F5F5] pt-28">

      {/* =====================================
          BREADCRUMB
      ====================================== */}

      <div className="max-w-7xl mx-auto px-6 py-3 border-b border-[#222222] flex items-center space-x-2 text-[10px] text-[#A5A5A5] uppercase tracking-widest">

        <button
          onClick={() =>
            setActivePage(
              'home'
            )
          }
          className="hover:text-[#C6A15B]"
        >
          HOME
        </button>

        <ChevronRight
          className="w-3 h-3 text-[#222222]"
        />

        <span className="text-[#C6A15B]">

          {filters.category ===
            'Accessories'
            ? 'ACCESSORIES'
            : 'LUXURY WATCHES'}

        </span>

      </div>


      {/* =====================================
          PAGE HEADER
      ====================================== */}

      <div className="max-w-7xl mx-auto px-6 py-10 border-b border-[#222222]">

        <span className="text-[9px] uppercase tracking-[0.3em] text-[#C6A15B] block mb-2 font-semibold">

          CURATED CATALOGUE

        </span>

        <h1 className="font-serif text-5xl sm:text-7xl text-[#F5F5F5] tracking-tight mb-3">

          {filters.category ===
            'Accessories'
            ? 'ACCESSORIES'
            : filters.category ||
            'LUXURY WATCHES'}

        </h1>

        <p className="text-xs text-[#A5A5A5] font-sans max-w-xl font-light">

          {filters.category ===
            'Accessories'
            ? 'Complete your collection with carefully selected watch accessories.'
            : 'Explore a considered selection of timepieces from trusted watchmakers.'}

        </p>

      </div>


      {/* =====================================
          CONTROLS
      ====================================== */}

      <div className="bg-[#111111] border-b border-[#222222] sticky top-[112px] lg:top-[150px] z-30 px-6 py-3.5">

        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">

          <div className="flex items-center space-x-4">

            <button
              onClick={() =>
                setShowFilterDrawer(
                  !showFilterDrawer
                )
              }
              className="flex items-center space-x-2 border border-[#222222] hover:border-[#C6A15B] bg-[#080808] px-4 py-2 text-xs uppercase tracking-widest text-[#F5F5F5] transition-colors rounded-velaro"
            >

              <Filter className="w-3.5 h-3.5 text-[#C6A15B]" />

              <span>
                REFINE FILTERS
              </span>

            </button>

            <span className="text-xs text-[#A5A5A5] font-mono">

              {sortedProducts.length}{' '}
              TIMEPIECES

            </span>

          </div>


          <div className="flex items-center space-x-6">

            {/* SORT */}

            <div className="flex items-center space-x-2">

              <span className="text-[9px] uppercase tracking-widest text-[#A5A5A5] hidden sm:inline">

                SORT:

              </span>

              <select
                aria-label="Sort watches"
                value={sortBy}
                onChange={(e) =>
                  setSortBy(
                    e.target
                      .value as any
                  )
                }
                className="bg-[#080808] border border-[#222222] focus:border-[#C6A15B] px-3 py-1.5 text-xs text-[#F5F5F5] focus:outline-none uppercase tracking-wider rounded-velaro"
              >

                <option value="featured">
                  FEATURED
                </option>

                <option value="newest">
                  NEWEST ARRIVALS
                </option>

                <option value="price-low">
                  PRICE: LOW TO HIGH
                </option>

                <option value="price-high">
                  PRICE: HIGH TO LOW
                </option>

                <option value="popular">
                  MOST POPULAR
                </option>

              </select>

            </div>


            {/* GRID */}

            <div className="hidden md:flex items-center space-x-1 border border-[#222222] bg-[#080808] p-1 rounded-velaro">

              {[2, 3, 4].map(
                (cols) => (

                  <button
                    key={cols}
                    onClick={() =>
                      setLayoutCols(
                        cols as
                        | 2
                        | 3
                        | 4
                      )
                    }
                    className={`px-2.5 py-1 text-[10px] font-mono font-bold rounded transition-colors ${layoutCols ===
                        cols
                        ? 'bg-[#C6A15B] text-[#080808]'
                        : 'text-[#A5A5A5] hover:text-[#F5F5F5]'
                      }`}
                  >

                    G{cols}

                  </button>

                )
              )}

            </div>

          </div>

        </div>

      </div>


      {/* =====================================
          MAIN AREA
      ====================================== */}

      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-12 gap-10">

        {/* =====================================
            FILTER SIDEBAR
        ====================================== */}

        <div
          className={`lg:col-span-3 space-y-6 ${showFilterDrawer
              ? 'block'
              : 'hidden lg:block'
            }`}
        >

          <div className="bg-[#111111] border border-[#222222] p-6 space-y-6 rounded-velaro">

            {/* FILTER TITLE */}

            <div className="flex justify-between items-center pb-4 border-b border-[#222222]">

              <span className="text-[10px] uppercase tracking-[0.25em] text-[#C6A15B] font-semibold">

                FILTERS

              </span>

              <button
                onClick={
                  resetFilters
                }
                className="text-[9px] uppercase tracking-widest text-[#A5A5A5] hover:text-[#C6A15B] flex items-center"
              >

                <RotateCcw className="w-3 h-3 mr-1" />

                RESET

              </button>

            </div>


            {/* =====================================
                BRAND
            ====================================== */}

            <div>

              <label className="block text-[10px] uppercase tracking-widest text-[#F5F5F5] mb-2 font-semibold">

                BRAND

              </label>

              <div className="space-y-1 max-h-48 overflow-y-auto pr-1">

                <button
                  onClick={() =>
                    setFilters(
                      prev => ({
                        ...prev,
                        brand: ''
                      })
                    )
                  }
                  className={`w-full text-left text-xs uppercase tracking-wider py-1 px-2 transition-colors ${!filters.brand
                      ? 'text-[#C6A15B] font-semibold bg-[#080808]'
                      : 'text-[#A5A5A5] hover:text-[#F5F5F5]'
                    }`}
                >

                  ALL BRANDS

                </button>

                {VELARO_BRANDS.map(
                  (brand) => (

                    <button
                      key={
                        brand.slug
                      }
                      onClick={() =>
                        setFilters(
                          prev => ({
                            ...prev,
                            brand:
                              brand.name
                          })
                        )
                      }
                      className={`w-full text-left text-xs uppercase tracking-wider py-1 px-2 transition-colors ${filters.brand
                          .toLowerCase() ===
                          brand.name
                            .toLowerCase()
                          ? 'text-[#C6A15B] font-semibold bg-[#080808]'
                          : 'text-[#A5A5A5] hover:text-[#F5F5F5]'
                        }`}
                    >

                      {brand.name}

                    </button>

                  )
                )}

              </div>

            </div>


            {/* =====================================
                CONDITION
            ====================================== */}

            <div className="pt-4 border-t border-[#222222]">

              <label className="block text-[10px] uppercase tracking-widest text-[#F5F5F5] mb-2 font-semibold">

                CONDITION

              </label>

              <div className="space-y-1">

                {[
                  '',
                  'New',
                  'Unworn',
                  'Excellent',
                  'Very Good',
                  'Good'
                ].map(
                  (condition) => (

                    <button
                      key={
                        condition ||
                        'all'
                      }
                      onClick={() =>
                        setFilters(
                          prev => ({
                            ...prev,
                            condition
                          })
                        )
                      }
                      className={`w-full text-left text-xs uppercase tracking-wider py-1 px-2 transition-colors ${filters.condition ===
                          condition
                          ? 'text-[#C6A15B] font-semibold bg-[#080808]'
                          : 'text-[#A5A5A5] hover:text-[#F5F5F5]'
                        }`}
                    >

                      {condition ||
                        'ALL CONDITIONS'}

                    </button>

                  )
                )}

              </div>

            </div>


            {/* =====================================
                MOVEMENT
            ====================================== */}

            <div className="pt-4 border-t border-[#222222]">

              <label className="block text-[10px] uppercase tracking-widest text-[#F5F5F5] mb-2 font-semibold">

                MOVEMENT

              </label>

              <div className="space-y-1">

                {[
                  '',
                  'Automatic',
                  'Manual',
                  'Mechanical',
                  'Quartz',
                  'Solar'
                ].map(
                  (movement) => (

                    <button
                      key={
                        movement ||
                        'all'
                      }
                      onClick={() =>
                        setFilters(
                          prev => ({
                            ...prev,
                            movement
                          })
                        )
                      }
                      className={`w-full text-left text-xs uppercase tracking-wider py-1 px-2 transition-colors ${filters.movement ===
                          movement
                          ? 'text-[#C6A15B] font-semibold bg-[#080808]'
                          : 'text-[#A5A5A5] hover:text-[#F5F5F5]'
                        }`}
                    >

                      {movement ||
                        'ALL MOVEMENTS'}

                    </button>

                  )
                )}

              </div>

            </div>


            {/* =====================================
                SEARCH
            ====================================== */}

            <div className="pt-4 border-t border-[#222222] space-y-3">

              <label
                htmlFor="catalog-search"
                className="eyebrow"
              >
                SEARCH CATALOGUE
              </label>

              <input
                id="catalog-search"
                className="field"
                value={
                  filters.searchQuery
                }
                onChange={(e) =>
                  setFilters(
                    prev => ({
                      ...prev,

                      searchQuery:
                        e.target.value
                    })
                  )
                }
                placeholder="Brand, model or reference"
              />

              <label
                htmlFor="case-size"
                className="eyebrow"
              >
                CASE SIZE
              </label>

              <select
                id="case-size"
                className="field"
                value={
                  filters.caseSize
                }
                onChange={(e) =>
                  setFilters(
                    prev => ({
                      ...prev,

                      caseSize:
                        e.target.value
                    })
                  )
                }
              >

                <option value="">
                  All sizes
                </option>

                <option value="small">
                  Under 38 mm
                </option>

                <option value="medium">
                  38–41 mm
                </option>

                <option value="large">
                  Over 41 mm
                </option>

              </select>

            </div>


            {/* =====================================
                PRICE
            ====================================== */}

            <div className="pt-4 border-t border-[#222222]">

              <div className="flex justify-between items-center mb-2">

                <label className="text-[10px] uppercase tracking-widest text-[#F5F5F5] font-semibold">

                  PRICE CAP

                </label>

                <span className="text-xs font-mono text-[#C6A15B]">

                  {formatPrice(
                    filters.maxPrice
                  )}

                </span>

              </div>

              <input
                aria-label="Maximum price"
                type="range"
                min={0}
                max={500000}
                step={1000}
                value={
                  filters.maxPrice
                }
                onChange={(e) =>
                  setFilters(
                    prev => ({
                      ...prev,

                      maxPrice:
                        Number(
                          e.target.value
                        )
                    })
                  )
                }
                className="w-full h-1 bg-[#222222] rounded appearance-none accent-[#C6A15B]"
              />

            </div>

          </div>

        </div>


        {/* =====================================
            PRODUCT GRID
        ====================================== */}

        <div className="lg:col-span-9">

          {/* =====================================
              ACTIVE FILTERS
          ====================================== */}

          {(filters.brand ||
            filters.category ||
            filters.movement ||
            filters.condition ||
            filters.minPrice >
            0) && (

              <div className="flex flex-wrap items-center gap-2 mb-6 p-3 bg-[#111111] border border-[#222222] rounded-velaro">

                <span className="text-[9px] uppercase tracking-widest text-[#A5A5A5] mr-2">

                  ACTIVE:

                </span>

                {filters.category && (

                  <button
                    className="text-xs text-[#C6A15B] border border-[#222222] px-3 py-1"
                    onClick={() =>
                      setFilters(
                        prev => ({
                          ...prev,
                          category: ''
                        })
                      )
                    }
                  >

                    {filters.category}{' '}
                    ×

                  </button>

                )}

                {filters.brand && (

                  <span className="inline-flex items-center text-[10px] bg-[#080808] text-[#C6A15B] px-2.5 py-1 border border-[#222222]">

                    {filters.brand}

                    <X
                      className="w-3 h-3 ml-1 cursor-pointer"
                      onClick={() =>
                        setFilters(
                          prev => ({
                            ...prev,
                            brand: ''
                          })
                        )
                      }
                    />

                  </span>

                )}

                {filters.movement && (

                  <span className="inline-flex items-center text-[10px] bg-[#080808] text-[#C6A15B] px-2.5 py-1 border border-[#222222]">

                    {filters.movement}

                    <X
                      className="w-3 h-3 ml-1 cursor-pointer"
                      onClick={() =>
                        setFilters(
                          prev => ({
                            ...prev,
                            movement:
                              ''
                          })
                        )
                      }
                    />

                  </span>

                )}

                {filters.condition && (

                  <span className="inline-flex items-center text-[10px] bg-[#080808] text-[#C6A15B] px-2.5 py-1 border border-[#222222]">

                    {filters.condition}

                    <X
                      className="w-3 h-3 ml-1 cursor-pointer"
                      onClick={() =>
                        setFilters(
                          prev => ({
                            ...prev,
                            condition:
                              ''
                          })
                        )
                      }
                    />

                  </span>

                )}

              </div>

            )}


          {/* =====================================
              NO RESULTS
          ====================================== */}

          {sortedProducts.length ===
            0 ? (

            <div className="text-center py-24 bg-[#111111] border border-[#222222] p-8 rounded-velaro">

              <h3 className="font-serif text-3xl text-[#F5F5F5] mb-2">

                No matching timepieces found

              </h3>

              <p className="text-xs text-[#A5A5A5] font-sans mb-6">

                Try expanding your budget cap or resetting active filter choices.

              </p>

              <button
                onClick={
                  resetFilters
                }
                className="px-6 py-3 bg-[#C6A15B] text-[#080808] font-bold text-xs uppercase tracking-widest hover:bg-[#F5F5F5]"
              >

                RESET FILTERS

              </button>

            </div>

          ) : (

            /* =====================================
                PRODUCT CARDS
            ====================================== */

            <div
              className={`grid gap-6 ${layoutCols === 2
                  ? 'grid-cols-1 sm:grid-cols-2'

                  : layoutCols ===
                    3
                    ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'

                    : 'grid-cols-1 sm:grid-cols-2 xl:grid-cols-4'
                }`}
            >

              {sortedProducts.map(
                (product: any) => (

                  <ProductCardVelaro
                    key={
                      product.id
                    }
                    product={
                      product
                    }
                  />

                )
              )}

            </div>

          )}

        </div>

      </div>

    </div>
  );
};