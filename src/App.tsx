import React from 'react';

import { FooterVelaro } from './components/FooterVelaro';
import { HeaderVelaro } from './components/HeaderVelaro';

import { ShopProvider, useShop } from './context/ShopContext';

import { HomeVelaro } from './pages/HomeVelaro';
import { CollectionVelaro } from './pages/CollectionVelaro';
import { ProductDetailVelaro } from './pages/ProductDetailVelaro';
import { BrandPageVelaro } from './pages/BrandPageVelaro';
import { CertifiedPreOwnedVelaro } from './pages/CertifiedPreOwnedVelaro';
import { BespokeVelaro } from './pages/BespokeVelaro';
import { JournalVelaro } from './pages/JournalVelaro';
import { AccountDashboard } from './pages/AccountDashboard';
import { WishlistPage } from './pages/WishlistPage';
import { FindWatchPage } from './pages/FindWatchPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { StoryPage } from './pages/StoryPage';
import { AuthPage } from './pages/AuthPage';
import { ClientCarePage } from './pages/ClientCarePage';

/*
  ADMIN PAGES
*/
import { AdminOrders } from './pages/AdminOrders';
import { AdminInventory } from './pages/AdminInventory';

import { LuxurySuite } from './components/home/LuxurySuite';
import { ConsultationModal } from './components/ConsultationModal';

import { VELARO_PRODUCTS } from './data/velaroData';
import { WATCHES_CATALOG } from './data/watchesData';
import { SHOP_BRANDS } from './data/catalog';

import { WatchSourcingModal } from './components/WatchSourcingModal';
import { SellTradeModal } from './components/SellTradeModal';
import { AuthenticityReportModal } from './components/AuthenticityReportModal';
import { CartDrawerVelaro } from './components/CartDrawerVelaro';
import { SearchOverlayVelaro } from './components/SearchOverlayVelaro';
import { ToastNotification } from './components/ToastNotification';

const AppContent: React.FC = () => {
  const {
    activePage,
    selectedProductId,
    selectedBrandSlug,
    setActivePage
  } = useShop();

  const renderCurrentPage = () => {
    /*
      ==========================================
      INVALID PRODUCT / BRAND CHECK
      ==========================================
    */

    if (
      (
        activePage === 'product-detail' &&
        ![
          ...VELARO_PRODUCTS,
          ...WATCHES_CATALOG
        ].some(
          (product) =>
            product.id === selectedProductId
        )
      ) ||
      (
        activePage === 'brand' &&
        !SHOP_BRANDS.some(
          (brand) =>
            brand.slug === selectedBrandSlug
        )
      )
    ) {
      return (
        <div className="page-shell text-center px-6 pb-24">

          <p className="eyebrow">
            REFERENCE NOT FOUND
          </p>

          <h1 className="font-serif text-5xl my-6">
            A different discovery awaits.
          </h1>

          <p className="text-velaro-muted mb-8">
            This reference is not available in the current catalogue.
          </p>

          <button
            className="gold-button"
            onClick={() =>
              setActivePage('collection')
            }
          >
            Explore the collection
          </button>

        </div>
      );
    }

    /*
      ==========================================
      PAGE ROUTER
      ==========================================
    */

    switch (activePage) {
      case 'home':
        return <HomeVelaro />;

      case 'collection':
        return <CollectionVelaro />;

      case 'product-detail':
        return (
          !VELARO_PRODUCTS.some(
            (product) =>
              product.id === selectedProductId
          ) &&
          WATCHES_CATALOG.some(
            (product) =>
              product.id === selectedProductId
          )
        )
          ? (
            <ProductDetailPage
              key={selectedProductId}
            />
          )
          : (
            <ProductDetailVelaro
              key={selectedProductId}
            />
          );

      case 'brand':
        return (
          <BrandPageVelaro
            key={selectedBrandSlug}
          />
        );

      case 'client-care':
        return <ClientCarePage />;

      case 'wishlist':
        return <WishlistPage />;

      case 'story':
        return <StoryPage />;

      case 'luxury-suite':
        return (
          <div className="page-shell">
            <LuxurySuite />
          </div>
        );

      case 'pre-owned':
      case 'certified-preowned':
        return <CertifiedPreOwnedVelaro />;

      case 'sell-trade':
        return <CertifiedPreOwnedVelaro />;

      case 'watch-sourcing':
        return <FindWatchPage />;

      case 'bespoke':
        return <BespokeVelaro />;

      case 'journal':
        return <JournalVelaro />;

      case 'auth':
        return <AuthPage />;

      case 'account':
        return <AccountDashboard />;

      /*
        ==========================================
        ADMIN
        ==========================================
      */

      case 'admin-orders':
        return <AdminOrders />;

      case 'admin-inventory':
        return <AdminInventory />;

      default:
        return <HomeVelaro />;
    }
  };

  /*
    Hide footer on certain special pages.
  */
  const hideFooter =
    activePage === 'story' ||
    activePage === 'admin-orders' ||
    activePage === 'admin-inventory' ||
    (
      activePage === 'product-detail' &&
      !VELARO_PRODUCTS.some(
        (product) =>
          product.id === selectedProductId
      ) &&
      WATCHES_CATALOG.some(
        (product) =>
          product.id === selectedProductId
      )
    );

  return (
    <div className="relative min-h-screen bg-[#080808] text-[#F5F5F5] font-sans selection:bg-[#C6A15B] selection:text-black">

      {/* HEADER */}
      <HeaderVelaro />

      {/* ACCESSIBILITY SKIP LINK */}
      <a
        href="#main-content"
        className="skip-link"
        onClick={(event) => {
          event.preventDefault();

          const main =
            document.getElementById(
              'main-content'
            );

          main?.focus();
          main?.scrollIntoView();
        }}
      >
        Skip to content
      </a>

      {/* MAIN PAGE */}
      <main
        id="main-content"
        tabIndex={-1}
      >
        {renderCurrentPage()}
      </main>

      {/* FOOTER */}
      {!hideFooter && (
        <FooterVelaro />
      )}

      {/* GLOBAL MODALS */}
      <ConsultationModal />

      <WatchSourcingModal />

      <SellTradeModal />

      <AuthenticityReportModal />

      <CartDrawerVelaro />

      <SearchOverlayVelaro />

      <ToastNotification />

    </div>
  );
};

export function App() {
  return (
    <ShopProvider>
      <AppContent />
    </ShopProvider>
  );
}

export default App;