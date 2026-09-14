import React, {
  useMemo,
  useState
} from 'react';

import { useShop } from '../context/ShopContext';
import { VELARO_PRODUCTS } from '../data/velaroData';
import { ProductCardVelaro } from '../components/ProductCardVelaro';
import { useFirebaseProducts } from '../hooks/useFirebaseProducts';
import { DEMO_EGP_RATE } from '../data/catalog';

import {
  ShoppingBag,
  Heart,
  ShieldCheck,
  CheckCircle2,
  ChevronRight,
  MessageCircle,
  FileText,
  Video,
} from 'lucide-react';

export const ProductDetailVelaro: React.FC = () => {
  const {
    selectedProductId,
    addToCart,
    toggleWishlist,
    isInWishlist,
    formatPrice,
    openAuthenticityReport,
    setActivePage,
    setIsSourcingModalOpen,
  } = useShop();

  /*
    ==========================================
    FIREBASE PRODUCTS
    ==========================================
  */

  const {
    products: firebaseProducts
  } = useFirebaseProducts();

  /*
    ==========================================
    LOCAL PRODUCT
    ==========================================

    Keep local catalogue data because it has:

    - images
    - specifications
    - descriptions
    - story
    - scorecard
    - gallery
    - badges
    - set information
  */

  const localProduct =
    VELARO_PRODUCTS.find(
      (watch) =>
        watch.id ===
        selectedProductId
    ) ??
    VELARO_PRODUCTS[0];

  /*
    ==========================================
    MATCH FIREBASE PRODUCT
    ==========================================

    Match by reference instead of ID.
  */

  const firebaseProduct =
    firebaseProducts.find(
      (fp: any) => {

        const firebaseReference =
          String(
            fp.reference ??
            ''
          )
            .trim()
            .toLowerCase();

        const localReference =
          String(
            localProduct.reference ??
            ''
          )
            .trim()
            .toLowerCase();

        return (
          firebaseReference ===
          localReference
        );
      }
    );

  /*
    ==========================================
    LIVE PRICE
    ==========================================
  */

  const firebasePriceEgp =
    Number(
      firebaseProduct?.price ??
      0
    );

  /*
    Keep USD equivalent available because
    some existing website systems still use
    priceUsd internally.
  */

  const firebasePriceUsd =
    firebasePriceEgp > 0
      ? firebasePriceEgp /
      DEMO_EGP_RATE
      : localProduct.priceUsd;

  /*
    ==========================================
    MERGED PRODUCT
    ==========================================
  */

  const product = {
    ...localProduct,

    brand:
      firebaseProduct?.brand ??
      localProduct.brand,

    name:
      firebaseProduct?.model ??
      firebaseProduct?.name ??
      localProduct.name,

    reference:
      firebaseProduct?.reference ??
      localProduct.reference,

    /*
      REAL LIVE EGP PRICE
    */
    price:
      firebasePriceEgp > 0
        ? firebasePriceEgp
        : undefined,

    /*
      USD equivalent for old internal logic.
    */
    priceUsd:
      firebasePriceUsd,

    year:
      Number(
        firebaseProduct?.year ??
        localProduct.year
      ),

    condition:
      firebaseProduct?.condition ??
      localProduct.condition,

    category:
      firebaseProduct?.category ??
      localProduct.category,

    stock:
      Number(
        firebaseProduct?.stock ??
        1
      ),

    currency:
      firebaseProduct?.currency ??
      'EGP',

    movement:
      firebaseProduct?.movement ??
      (localProduct as any).movement,

    firebaseId:
      firebaseProduct?.id,

    firebaseConnected:
      Boolean(
        firebaseProduct
      )
  };

  /*
    ==========================================
    PRICE DISPLAY
    ==========================================
  */

  const formattedPrice =
    product.currency === 'EGP' &&
      typeof product.price ===
      'number'
      ? `EGP ${Number(
        product.price
      ).toLocaleString()}`
      : formatPrice(
        product.priceUsd
      );

  /*
    ==========================================
    IMAGE STATE
    ==========================================
  */

  const [
    activeImageKey,
    setActiveImageKey
  ] =
    useState<
      keyof typeof product.images
    >('front');

  const [
    zoomActive,
    setZoomActive
  ] =
    useState(false);

  const isSaved =
    isInWishlist(
      product.id
    );

  const galleryKeys =
    Object.keys(
      product.images
    ) as (
      keyof typeof product.images
    )[];

  const inStock =
    product.stock > 0;

  /*
    ==========================================
    RELATED PRODUCTS
    ==========================================

    We also merge live Firebase price/stock
    into related watches.
  */

  const relatedProducts =
    useMemo(() => {

      return VELARO_PRODUCTS
        .filter(
          (watch) =>
            watch.id !==
            product.id &&
            (
              watch.brand ===
              product.brand ||
              watch.category ===
              product.category
            )
        )
        .slice(0, 4)
        .map(
          (watch) => {

            const live =
              firebaseProducts.find(
                (fp: any) =>
                  String(
                    fp.reference ??
                    ''
                  )
                    .trim()
                    .toLowerCase() ===

                  String(
                    watch.reference ??
                    ''
                  )
                    .trim()
                    .toLowerCase()
              );

            if (!live) {
              return watch;
            }

            const priceEgp =
              Number(
                live.price ??
                0
              );

            return {
              ...watch,

              brand:
                live.brand ??
                watch.brand,

              name:
                live.model ??
                live.name ??
                watch.name,

              reference:
                live.reference ??
                watch.reference,

              price:
                priceEgp > 0
                  ? priceEgp
                  : undefined,

              priceUsd:
                priceEgp > 0
                  ? priceEgp /
                  DEMO_EGP_RATE
                  : watch.priceUsd,

              currency:
                live.currency ??
                'EGP',

              stock:
                Number(
                  live.stock ??
                  1
                ),

              year:
                Number(
                  live.year ??
                  watch.year
                ),

              condition:
                live.condition ??
                watch.condition,

              movement:
                live.movement ??
                (watch as any)
                  .movement
            };
          }
        );

    }, [
      firebaseProducts,
      product.id,
      product.brand,
      product.category
    ]);

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

        <ChevronRight className="w-3 h-3 text-[#222222]" />

        <button
          onClick={() =>
            setActivePage(
              'collection'
            )
          }
          className="hover:text-[#C6A15B]"
        >
          WATCHES
        </button>

        <ChevronRight className="w-3 h-3 text-[#222222]" />

        <span className="text-[#C6A15B]">
          {product.brand}
        </span>

        <ChevronRight className="w-3 h-3 text-[#222222]" />

        <span className="text-[#F5F5F5] line-clamp-1">
          {product.name}
        </span>

      </div>


      {/* =====================================
          MAIN PRODUCT AREA
      ====================================== */}

      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-12 gap-12">

        {/* LEFT GALLERY */}

        <div className="lg:col-span-7 space-y-4">

          <div
            className="relative w-full aspect-[4/5] bg-[#111111] border border-[#222222] rounded-velaro overflow-hidden group cursor-zoom-in"
            onClick={() =>
              setZoomActive(
                !zoomActive
              )
            }
          >

            <img
              src={
                product.images[
                activeImageKey
                ] ||
                product.images.front
              }
              alt={`${product.brand} ${product.name}`}
              className={`w-full h-full object-cover transition-transform duration-500 ${zoomActive
                  ? 'scale-150'
                  : 'scale-100 group-hover:scale-105'
                }`}
            />

            {product.isPreOwned && (
              <div className="absolute top-4 left-4 bg-[#111111] border border-[#C6A15B] text-[#C6A15B] text-[9px] uppercase tracking-widest px-3 py-1 font-bold">

                CERTIFIED PRE-OWNED

              </div>
            )}

            <div className="absolute bottom-4 right-4 bg-[#080808]/80 text-[#A5A5A5] text-[9px] uppercase tracking-widest px-2.5 py-1">

              CLICK TO{' '}
              {zoomActive
                ? 'RESET'
                : 'ZOOM'}

            </div>

          </div>


          {/* THUMBNAILS */}

          <div className="flex flex-wrap gap-3">

            {galleryKeys.map(
              (key) => {

                const imgUrl =
                  product.images[
                  key
                  ];

                if (!imgUrl) {
                  return null;
                }

                return (
                  <button
                    key={key}
                    onClick={() => {
                      setActiveImageKey(
                        key
                      );

                      setZoomActive(
                        false
                      );
                    }}
                    className={`w-16 h-20 bg-[#111111] border rounded-velaro overflow-hidden transition-all relative ${activeImageKey ===
                        key
                        ? 'border-[#C6A15B]'
                        : 'border-[#222222] opacity-60 hover:opacity-100'
                      }`}
                  >

                    <img
                      src={imgUrl}
                      alt={key}
                      className="w-full h-full object-cover"
                    />

                    <span className="absolute bottom-0 inset-x-0 bg-[#080808]/80 text-[7px] uppercase tracking-widest text-[#A5A5A5] text-center truncate">

                      {key}

                    </span>

                  </button>
                );
              }
            )}

          </div>

        </div>


        {/* =====================================
            RIGHT PRODUCT INFO
        ====================================== */}

        <div className="lg:col-span-5 space-y-6">

          <div>

            <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.25em] text-[#C6A15B] mb-2 font-semibold">

              <span>
                {product.brand}
              </span>

              <span className="font-mono text-[#A5A5A5]">

                REF:{' '}
                {product.reference}

              </span>

            </div>


            <h1 className="font-serif text-4xl sm:text-5xl text-[#F5F5F5] tracking-tight mb-2">

              {product.name}

            </h1>


            {product.subTitle && (
              <p className="text-xs text-[#A5A5A5] font-sans font-light mb-6">

                {product.subTitle}

              </p>
            )}


            {/* =====================================
                PRICE
            ====================================== */}

            <div className="bg-[#111111] border border-[#222222] p-6 rounded-velaro space-y-3 mb-6">

              <div className="flex justify-between items-baseline">

                <span className="text-[9px] uppercase tracking-widest text-[#A5A5A5]">

                  VELARO PRICE

                </span>

                <span className="font-sans text-3xl font-bold text-[#F5F5F5]">

                  {formattedPrice}

                </span>

              </div>


              {product
                .estimatedMarketMinUsd &&
                product
                  .estimatedMarketMaxUsd && (

                  <div className="flex justify-between items-center pt-2 border-t border-[#222222] text-[10px] text-[#A5A5A5]">

                    <span>
                      ESTIMATED MARKET RANGE:
                    </span>

                    <span className="font-mono text-[#C6A15B]">

                      {formatPrice(
                        product
                          .estimatedMarketMinUsd
                      )}

                      {' – '}

                      {formatPrice(
                        product
                          .estimatedMarketMaxUsd
                      )}

                    </span>

                  </div>

                )}

            </div>


            {/* =====================================
                AVAILABILITY
            ====================================== */}

            <div className="bg-[#161616] p-4 border border-[#222222] rounded-velaro space-y-2 text-xs mb-6">

              <div className="flex justify-between">

                <span className="text-[#A5A5A5] uppercase tracking-widest text-[9px]">

                  AVAILABILITY

                </span>

                {inStock ? (

                  <span className="text-emerald-400 font-medium flex items-center">

                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse mr-1.5" />

                    In Stock ·{' '}
                    {product.stock}{' '}
                    Available

                  </span>

                ) : (

                  <span className="text-red-400 font-medium">

                    Out of Stock

                  </span>

                )}

              </div>


              <div className="flex justify-between">

                <span className="text-[#A5A5A5] uppercase tracking-widest text-[9px]">

                  CONDITION & YEAR

                </span>

                <span className="text-[#F5F5F5] font-medium">

                  {product.year}
                  {' · '}
                  {product.condition}

                </span>

              </div>


              <div className="flex justify-between">

                <span className="text-[#A5A5A5] uppercase tracking-widest text-[9px]">

                  SET CONTENTS

                </span>

                <span className="text-[#C6A15B] font-medium">

                  {product.set}

                </span>

              </div>


              {product.movement && (

                <div className="flex justify-between">

                  <span className="text-[#A5A5A5] uppercase tracking-widest text-[9px]">

                    MOVEMENT

                  </span>

                  <span className="text-[#F5F5F5] font-medium">

                    {product.movement}

                  </span>

                </div>

              )}

            </div>


            {/* =====================================
                BUYING BUTTONS
            ====================================== */}

            <div className="space-y-3">

              <button
                disabled={
                  !inStock
                }
                onClick={() =>
                  inStock &&
                  addToCart(
                    product as any
                  )
                }
                className={`w-full py-4 font-bold text-xs uppercase tracking-[0.25em] transition-all flex items-center justify-center space-x-2 rounded-velaro ${inStock
                    ? 'bg-[#C6A15B] hover:bg-[#F5F5F5] text-[#080808]'
                    : 'bg-[#222222] text-[#666666] cursor-not-allowed'
                  }`}
              >

                <ShoppingBag className="w-4 h-4" />

                <span>

                  {inStock
                    ? 'ADD TO BAG'
                    : 'OUT OF STOCK'}

                </span>

              </button>


              <div className="grid grid-cols-2 gap-3">

                <button
                  onClick={() =>
                    setIsSourcingModalOpen(
                      true
                    )
                  }
                  className="py-3 bg-[#111111] border border-[#222222] hover:border-[#C6A15B] text-[#F5F5F5] font-bold text-[10px] uppercase tracking-widest transition-all rounded-velaro"
                >

                  ENQUIRE

                </button>


                <button
                  onClick={() =>
                    setIsSourcingModalOpen(
                      true
                    )
                  }
                  className="py-3 bg-[#111111] border border-[#222222] hover:border-emerald-500 text-emerald-400 font-bold text-[10px] uppercase tracking-widest transition-all flex items-center justify-center space-x-1.5 rounded-velaro"
                >

                  <MessageCircle className="w-3.5 h-3.5" />

                  <span>
                    CONTACT ADVISOR
                  </span>

                </button>

              </div>


              <button
                onClick={() =>
                  toggleWishlist(
                    product.id
                  )
                }
                className="w-full py-2.5 bg-transparent border border-[#222222] hover:border-[#C6A15B] text-[#A5A5A5] hover:text-[#F5F5F5] text-[9px] uppercase tracking-widest transition-all flex items-center justify-center space-x-1.5 rounded-velaro"
              >

                <Heart
                  className={`w-3.5 h-3.5 ${isSaved
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


          {/* =====================================
              TRUST PANEL
          ====================================== */}

          <div className="bg-[#111111] border border-[#222222] p-6 space-y-4 rounded-velaro">

            <h4 className="text-[10px] uppercase tracking-[0.25em] text-[#C6A15B] font-semibold flex items-center">

              <ShieldCheck className="w-4 h-4 mr-2" />

              VELARO CERTIFIED GUARANTEES

            </h4>


            <div className="grid grid-cols-2 gap-3 text-xs text-[#A5A5A5]">

              {[
                'Expert Authenticated',
                'Authenticity Guaranteed',
                'Multi-Point Inspection',
                'Insured Worldwide Delivery',
                '14-Day Return Policy',
                'VELARO Warranty',
              ].map(
                (item) => (

                  <div
                    key={item}
                    className="flex items-center space-x-2"
                  >

                    <CheckCircle2 className="w-3.5 h-3.5 text-[#C6A15B]" />

                    <span>
                      {item}
                    </span>

                  </div>

                )
              )}

            </div>

          </div>

        </div>

      </div>


      {/* =====================================
          DESCRIPTION
      ====================================== */}

      <section className="max-w-7xl mx-auto px-6 pb-16 grid md:grid-cols-2 gap-10">

        <div>

          <p className="eyebrow mb-4">

            THE TIMEPIECE

          </p>

          <p className="text-sm text-[#A5A5A5] leading-relaxed">

            {product.description}

          </p>

        </div>


        <div>

          <p className="eyebrow mb-4">

            DESIGN & HERITAGE

          </p>

          <p className="font-serif text-xl text-[#F5F5F5] leading-relaxed">

            {product.story}

          </p>

        </div>

      </section>


      {/* =====================================
          CONDITION & SPECIFICATIONS
      ====================================== */}

      <div className="bg-[#111111] border-t border-[#222222] py-20 px-6">

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">

          {/* CONDITION SCORE */}

          <div className="lg:col-span-5 space-y-6">

            <span className="text-[9px] uppercase tracking-[0.3em] text-[#C6A15B] font-semibold block">

              VAULT INSPECTION REPORT

            </span>

            <h3 className="font-serif text-3xl text-[#F5F5F5]">

              CONDITION SCORECARD

            </h3>


            <div className="bg-[#080808] border border-[#222222] p-6 space-y-4 rounded-velaro">

              {[
                {
                  label:
                    'CASE CONDITION',

                  score:
                    product
                      .conditionScorecard
                      .caseScore,
                },

                {
                  label:
                    'CRYSTAL GLASS',

                  score:
                    product
                      .conditionScorecard
                      .crystalScore,
                },

                {
                  label:
                    'BRACELET / STRAP',

                  score:
                    product
                      .conditionScorecard
                      .braceletScore,
                },

                {
                  label:
                    'CLASP / BUCKLE',

                  score:
                    product
                      .conditionScorecard
                      .claspScore,
                },

              ].map(
                (item) => (

                  <div
                    key={
                      item.label
                    }
                    className="space-y-1.5"
                  >

                    <div className="flex justify-between text-xs">

                      <span className="text-[#A5A5A5] uppercase tracking-wider text-[9px] font-semibold">

                        {item.label}

                      </span>

                      <span className="text-[#C6A15B] font-mono font-bold">

                        {item.score}
                        {' / 10'}

                      </span>

                    </div>


                    <div className="w-full h-1.5 bg-[#222222] rounded-full overflow-hidden">

                      <div
                        className="h-full bg-[#C6A15B]"
                        style={{
                          width:
                            `${(
                              item.score /
                              10
                            ) * 100}%`
                        }}
                      />

                    </div>

                  </div>

                )
              )}


              <div className="pt-4 border-t border-[#222222] text-xs text-[#A5A5A5] font-light leading-relaxed">

                <span className="text-[#F5F5F5] font-semibold block mb-1">

                  INSPECTOR NOTES:

                </span>

                "
                {
                  product
                    .conditionScorecard
                    .notes
                }
                "

              </div>


              <button
                onClick={() =>
                  openAuthenticityReport(
                    product as any
                  )
                }
                className="w-full py-2.5 bg-[#161616] border border-[#C6A15B]/50 hover:border-[#C6A15B] text-[#C6A15B] text-[9px] font-bold uppercase tracking-widest transition-colors flex items-center justify-center space-x-2 rounded-velaro"
              >

                <FileText className="w-3.5 h-3.5" />

                <span>

                  VIEW DIGITAL AUTHENTICITY REPORT

                </span>

              </button>

            </div>

          </div>


          {/* =====================================
              SPECS
          ====================================== */}

          <div className="lg:col-span-7 space-y-6">

            <span className="text-[9px] uppercase tracking-[0.3em] text-[#C6A15B] font-semibold block">

              SPECIFICATIONS MATRIX

            </span>

            <h3 className="font-serif text-3xl text-[#F5F5F5]">

              WATCH INFORMATION

            </h3>


            <div className="border border-[#222222] bg-[#080808] divide-y divide-[#222222] text-xs rounded-velaro">

              <SpecRow
                label="REFERENCE"
                value={
                  product
                    .specs
                    .general
                    .reference
                }
              />

              <SpecRow
                label="CALIBRE MOVEMENT"
                value={`${product.specs.movement.calibre} (${product.specs.movement.type})`}
              />

              <SpecRow
                label="CASE DIAMETER & THICKNESS"
                value={`${product.specs.case.diameterMm} mm / ${product.specs.case.thicknessMm} mm`}
              />

              <SpecRow
                label="CASE MATERIAL"
                value={
                  product
                    .specs
                    .case
                    .material
                }
              />

              <SpecRow
                label="CRYSTAL GLASS"
                value={
                  product
                    .specs
                    .case
                    .crystal
                }
              />

              <SpecRow
                label="WATER RESISTANCE"
                value={
                  product
                    .specs
                    .case
                    .waterResistance
                }
              />

              <SpecRow
                label="POWER RESERVE"
                value={
                  product
                    .specs
                    .movement
                    .powerReserve
                }
                gold
              />

              <SpecRow
                label="DIAL & HANDS"
                value={
                  product
                    .specs
                    .dial
                    .color
                }
              />

            </div>

          </div>

        </div>

      </div>


      {/* =====================================
          CONCIERGE
      ====================================== */}

      <div className="max-w-7xl mx-auto px-6 py-16">

        <div className="bg-[#111111] border border-[#C6A15B]/50 p-8 text-center max-w-3xl mx-auto rounded-velaro space-y-4">

          <span className="text-[9px] uppercase tracking-[0.3em] text-[#C6A15B] font-semibold block">

            PRIVATE CONSULTATION

          </span>

          <h3 className="font-serif text-3xl text-[#F5F5F5]">

            CONSIDERING THIS PIECE?

          </h3>

          <p className="text-xs text-[#A5A5A5] font-light max-w-lg mx-auto">

            Our watch specialists can provide
            additional high-definition photographs,
            video walkarounds, archival documentation,
            or arrange a private consultation.

          </p>


          <div className="flex flex-wrap justify-center gap-3 pt-2">

            <button
              onClick={() =>
                setIsSourcingModalOpen(
                  true
                )
              }
              className="px-6 py-3 bg-[#C6A15B] text-[#080808] font-bold text-xs uppercase tracking-widest hover:bg-[#F5F5F5] transition-colors"
            >

              SPEAK TO A SPECIALIST

            </button>


            <button
              onClick={() =>
                setIsSourcingModalOpen(
                  true
                )
              }
              className="px-6 py-3 border border-[#222222] hover:border-[#C6A15B] text-[#F5F5F5] text-xs uppercase tracking-widest transition-colors flex items-center"
            >

              <Video className="w-3.5 h-3.5 mr-1.5 text-[#C6A15B]" />

              REQUEST A VIDEO

            </button>

          </div>

        </div>

      </div>


      {/* =====================================
          RELATED PRODUCTS
      ====================================== */}

      {relatedProducts.length >
        0 && (

          <div className="max-w-7xl mx-auto px-6 py-16 border-t border-[#222222]">

            <div className="flex justify-between items-end mb-12">

              <div>

                <span className="text-[9px] uppercase tracking-[0.3em] text-[#C6A15B] font-semibold block mb-1">

                  YOU MAY ALSO LIKE

                </span>

                <h3 className="font-serif text-3xl text-[#F5F5F5]">

                  SIMILAR TIMEPIECES

                </h3>

              </div>

            </div>


            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

              {relatedProducts.map(
                (rel: any) => (

                  <ProductCardVelaro
                    key={rel.id}
                    product={rel}
                  />

                )
              )}

            </div>

          </div>

        )}


      {/* =====================================
          MOBILE ADD TO BAG
      ====================================== */}

      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#111111]/95 backdrop-blur-md border-t border-[#222222] p-4 flex items-center justify-between">

        <div>

          <span className="text-[9px] uppercase tracking-widest text-[#C6A15B] block">

            {product.brand}

          </span>

          <span className="font-serif text-lg text-[#F5F5F5] font-semibold">

            {formattedPrice}

          </span>

        </div>


        <button
          disabled={
            !inStock
          }
          onClick={() =>
            inStock &&
            addToCart(
              product as any
            )
          }
          className={`px-6 py-3 font-bold text-xs uppercase tracking-widest ${inStock
              ? 'bg-[#C6A15B] text-[#080808]'
              : 'bg-[#222222] text-[#666666]'
            }`}
        >

          {inStock
            ? 'ADD TO BAG'
            : 'OUT OF STOCK'}

        </button>

      </div>

    </div>
  );
};


/*
  ==========================================
  SPEC ROW
  ==========================================
*/

function SpecRow({
  label,
  value,
  gold = false,
}: {
  label: string;
  value: React.ReactNode;
  gold?: boolean;
}) {
  return (
    <div className="p-4 flex justify-between">

      <span className="text-[#A5A5A5] uppercase tracking-wider text-[9px]">

        {label}

      </span>

      <span
        className={`font-medium ${gold
            ? 'text-[#C6A15B]'
            : 'text-[#F5F5F5]'
          }`}
      >

        {value}

      </span>

    </div>
  );
}