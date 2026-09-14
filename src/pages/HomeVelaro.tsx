import React from 'react';
import {
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  Truck,
  RotateCcw,
  UserCheck,
} from 'lucide-react';

import { useShop } from '../context/ShopContext';
import {
  SHOP_BRANDS,
  SHOP_PRODUCTS,
  isPreOwned,
} from '../data/catalog';

import { ProductCardVelaro } from '../components/ProductCardVelaro';
import { VELARO_JOURNAL } from '../data/velaroData';
import { useFirebaseProducts } from '../hooks/useFirebaseProducts';

const image =
  'https://images.unsplash.com/photo-1533139502658-0198f920d8e8?auto=format&fit=crop&q=80&w=1800';

const featuredBrands = [
  'Rolex',
  'Cartier',
  'Omega',
  'Patek Philippe',
  'Audemars Piguet',
  'Tissot',
];

export const HomeVelaro: React.FC = () => {
  const {
    navigateToBrand,
    navigateToCategory,
    setActivePage,
  } = useShop();

  const {
    products: firebaseProducts,
    loading,
    error,
  } = useFirebaseProducts();

  const mergedProducts = SHOP_PRODUCTS.map((product) => {
    const firebaseProduct = firebaseProducts.find(
      (fp: any) =>
        String(fp.reference ?? '')
          .trim()
          .toLowerCase() ===
        String(product.reference ?? '')
          .trim()
          .toLowerCase()
    );

    if (!firebaseProduct) {
      return product;
    }

    return {
      ...product,

      brand:
        firebaseProduct.brand ??
        product.brand,

      name:
        firebaseProduct.model ??
        product.name,

      reference:
        firebaseProduct.reference ??
        product.reference,

      priceUsd:
        Number(
          firebaseProduct.price ??
          product.priceUsd
        ),

      condition:
        firebaseProduct.condition ??
        product.condition,

      year:
        Number(
          firebaseProduct.year ??
          product.year
        ),

      isNewArrival:
        firebaseProduct.newArrival ??
        product.isNewArrival,

      stock:
        Number(
          firebaseProduct.stock ?? 1
        ),

      currency:
        firebaseProduct.currency ??
        'EGP',
    };
  });

  const newArrivals = mergedProducts
    .filter((product) => product.isNewArrival)
    .slice(0, 4);

  const bestSellers = mergedProducts
    .filter((product) => product.isBestseller)
    .slice(0, 4);

  const preOwned = mergedProducts
    .filter(isPreOwned)
    .slice(0, 4);

  const brands = featuredBrands
    .map((name) =>
      SHOP_BRANDS.find(
        (brand) =>
          brand.name.toLowerCase() ===
          name.toLowerCase()
      )
    )
    .filter(Boolean);

  return (
    <div className="bg-[#080808] text-[#F5F5F5]">

      {/* HERO */}
      <section className="relative min-h-[86vh] flex items-center justify-center overflow-hidden pt-28">

        <img
          src={image}
          alt="VELARO timepiece"
          className="absolute inset-0 w-full h-full object-cover opacity-45"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-[#080808]/65 to-[#080808]/80" />

        <div className="relative z-10 text-center max-w-3xl px-6">

          <p className="eyebrow mb-5">
            BOUTIQUE HAUTE HORLOGERIE
          </p>

          <h1 className="font-serif text-7xl sm:text-9xl leading-none tracking-tight">
            VELARO
          </h1>

          <p className="font-serif text-2xl sm:text-4xl text-[#C6A15B] tracking-[0.22em] mt-4">
            TIME, ELEVATED.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-3 mt-10">

            <button
              className="gold-button"
              onClick={() => navigateToCategory('')}
            >
              SHOP WATCHES
              <ArrowRight className="inline w-4 h-4 ml-2" />
            </button>

            <button
              className="px-7 py-3 border border-white/20 text-xs uppercase tracking-widest hover:border-[#C6A15B]"
              onClick={() => navigateToCategory('Luxury')}
            >
              EXPLORE LUXURY
            </button>

          </div>

        </div>

      </section>

      {/* NEW ARRIVALS */}
      <section className="section-shell">

        <SectionHeading
          eyebrow="JUST ARRIVED"
          title="NEW ARRIVALS"
          action="VIEW ALL"
          onAction={() =>
            navigateToCategory('New Arrivals')
          }
        />

        {loading ? (
          <p className="text-sm text-[#A5A5A5]">
            Loading watches...
          </p>
        ) : error ? (
          <p className="text-sm text-red-400">
            {error}
          </p>
        ) : (
          <ProductGrid products={newArrivals} />
        )}

      </section>

      {/* SHOP BY BRAND */}
      <section className="section-shell bg-[#111111]">

        <SectionHeading
          eyebrow="CURATED HOUSES"
          title="SHOP BY BRAND"
          action="VIEW ALL BRANDS"
          onAction={() =>
            setActivePage('brand')
          }
        />

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">

          {brands.map(
            (brand) =>
              brand && (
                <button
                  key={brand.slug}
                  onClick={() =>
                    navigateToBrand(brand.slug)
                  }
                  className="relative h-44 overflow-hidden border border-white/10 group text-left"
                >

                  <img
                    src={brand.heroImage}
                    alt={brand.name}
                    className="absolute inset-0 w-full h-full object-cover opacity-45 group-hover:scale-105 transition-transform duration-700"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-[#080808] to-transparent" />

                  <span className="absolute bottom-5 left-5 font-serif text-2xl group-hover:text-[#C6A15B]">
                    {brand.name}
                  </span>

                </button>
              )
          )}

        </div>

      </section>

      {/* THE VAULT */}
      <section className="section-shell">

        <div className="relative min-h-[390px] border border-[#C6A15B]/30 overflow-hidden flex items-center">

          <img
            src={image}
            alt="The VELARO Vault"
            className="absolute inset-0 w-full h-full object-cover opacity-35"
          />

          <div className="absolute inset-0 bg-gradient-to-r from-[#080808] via-[#080808]/75 to-transparent" />

          <div className="relative z-10 max-w-xl p-8 sm:p-14">

            <p className="eyebrow">
              EXCEPTIONAL ACQUISITIONS
            </p>

            <h2 className="font-serif text-5xl sm:text-7xl mt-3">
              THE VAULT
            </h2>

            <p className="text-sm text-[#A5A5A5] mt-5">
              Exceptional timepieces from the world's most prestigious watchmakers.
            </p>

            <button
              className="gold-button mt-8"
              onClick={() =>
                navigateToCategory('Luxury')
              }
            >
              EXPLORE LUXURY
              <ArrowRight className="inline w-4 h-4 ml-2" />
            </button>

          </div>

        </div>

      </section>

      {/* BEST SELLERS */}
      <section className="section-shell bg-[#111111]">

        <SectionHeading
          eyebrow="COLLECTOR FAVOURITES"
          title="BEST SELLERS"
          action="SHOP BEST SELLERS"
          onAction={() =>
            navigateToCategory('Best Sellers')
          }
        />

        <ProductGrid products={bestSellers} />

      </section>

      {/* CERTIFIED PRE-OWNED */}
      <section className="section-shell">

        <SectionHeading
          eyebrow="AUTHENTICATED PROVENANCE"
          title="CERTIFIED PRE-OWNED"
          action="SHOP PRE-OWNED"
          onAction={() =>
            setActivePage('certified-preowned')
          }
        />

        <p className="text-sm text-[#A5A5A5] mb-10">
          Authenticated. Inspected. Guaranteed.
        </p>

        <ProductGrid products={preOwned} />

      </section>

      {/* BESPOKE */}
      <section className="section-shell bg-[#111111]">

        <div className="grid lg:grid-cols-2 gap-10 items-center">

          <img
            src={image}
            alt="VELARO Bespoke"
            className="w-full aspect-[4/3] object-cover opacity-75"
          />

          <div>

            <p className="eyebrow">
              ONE OF ONE
            </p>

            <h2 className="font-serif text-5xl sm:text-7xl mt-3">
              VELARO BESPOKE
            </h2>

            <p className="text-sm text-[#A5A5A5] leading-relaxed mt-5 max-w-md">
              Personal details, considered materials, and a timepiece made for your wrist.
            </p>

            <button
              className="gold-button mt-8"
              onClick={() =>
                setActivePage('bespoke')
              }
            >
              DISCOVER BESPOKE
              <ArrowRight className="inline w-4 h-4 ml-2" />
            </button>

          </div>

        </div>

      </section>

      {/* WHY VELARO */}
      <section className="section-shell">

        <SectionHeading
          eyebrow="THE VELARO STANDARD"
          title="WHY VELARO"
        />

        <div className="grid grid-cols-2 md:grid-cols-5 gap-6">

          {[
            {
              icon: ShieldCheck,
              label: '100% AUTHENTIC',
            },
            {
              icon: Truck,
              label: 'FAST DELIVERY',
            },
            {
              icon: RotateCcw,
              label: '14-DAY RETURNS',
            },
            {
              icon: CheckCircle2,
              label: 'SECURE PAYMENTS',
            },
            {
              icon: UserCheck,
              label: 'WATCH EXPERT SUPPORT',
            },
          ].map(({ icon: Icon, label }) => (

            <div
              key={label}
              className="flex flex-col items-center text-center gap-3"
            >

              <Icon
                className="text-[#C6A15B]"
                size={26}
              />

              <span className="text-[10px] tracking-widest text-[#A5A5A5]">
                {label}
              </span>

            </div>

          ))}

        </div>

      </section>

      {/* JOURNAL */}
      <section className="section-shell bg-[#111111]">

        <SectionHeading
          eyebrow="FROM THE JOURNAL"
          title="HOROLOGY & GUIDES"
          action="VIEW JOURNAL"
          onAction={() =>
            setActivePage('journal')
          }
        />

        <div className="grid md:grid-cols-3 gap-6">

          {VELARO_JOURNAL
            .slice(0, 3)
            .map((article) => (

              <article
                key={article.id}
                className="border border-white/10 overflow-hidden group cursor-pointer"
                onClick={() =>
                  setActivePage('journal')
                }
              >

                <img
                  src={article.imageUrl}
                  alt={article.title}
                  className="w-full aspect-[16/10] object-cover group-hover:scale-105 transition-transform duration-700"
                />

                <div className="p-5">

                  <p className="eyebrow">
                    {article.category}
                  </p>

                  <h3 className="font-serif text-2xl mt-2 group-hover:text-[#C6A15B]">
                    {article.title}
                  </h3>

                  <p className="text-xs text-[#A5A5A5] mt-3 line-clamp-2">
                    {article.excerpt}
                  </p>

                </div>

              </article>

            ))}

        </div>

      </section>

    </div>
  );
};

function ProductGrid({
  products,
}: {
  products: any[];
}) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
      {products.map((product) => (
        <ProductCardVelaro
          key={product.id}
          product={product}
        />
      ))}
    </div>
  );
}

function SectionHeading({
  eyebrow,
  title,
  action,
  onAction,
}: {
  eyebrow: string;
  title: string;
  action?: string;
  onAction?: () => void;
}) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">

      <div>
        <p className="eyebrow">
          {eyebrow}
        </p>

        <h2 className="font-serif text-4xl sm:text-6xl mt-2">
          {title}
        </h2>
      </div>

      {action && (
        <button
          className="text-xs uppercase tracking-widest text-[#C6A15B] hover:text-white"
          onClick={onAction}
        >
          {action}
          <ArrowRight className="inline w-4 h-4 ml-1" />
        </button>
      )}

    </div>
  );
}