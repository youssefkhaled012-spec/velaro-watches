import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef
} from 'react';

import {
  doc,
  getDoc,
  setDoc
} from 'firebase/firestore';

import { db } from '../firebase/firebase';
import { useAuth } from './AuthContext';

import {
  WatchProductVelaro,
  VELARO_PRODUCTS
} from '../data/velaroData';

import { WatchProduct } from '../data/watchesData';

import {
  SHOP_PRODUCTS,
  toShopProduct,
  DEMO_EGP_RATE
} from '../data/catalog';

export type PageViewVelaro =
  | 'home'
  | 'collection'
  | 'product-detail'
  | 'brand'
  | 'certified-preowned'
  | 'sell-trade'
  | 'watch-sourcing'
  | 'bespoke'
  | 'journal'
  | 'account'
  | 'auth'
  | 'admin-orders'
  | 'admin-inventory';

export type PageView =
  | PageViewVelaro
  | 'luxury-suite'
  | 'pre-owned'
  | 'story'
  | 'wishlist'
  | 'client-care';

export type CurrencyType =
  | 'USD'
  | 'EUR'
  | 'GBP'
  | 'EGP';

export type CartProductVelaro =
  WatchProductVelaro & {
    stock?: number;
    price?: number;
    currency?: string;
  };

export interface CartItemVelaro {
  product: CartProductVelaro;
  quantity: number;
}

export interface CollectionFilterStateVelaro {
  brand: string;
  category: string;
  movement: string;
  condition: string;
  minPrice: number;
  maxPrice: number;
  caseSize: string;
  searchQuery: string;
}

export interface ToastMessage {
  id: string;
  title: string;
  message: string;
  type?:
  | 'cart'
  | 'wishlist'
  | 'compare'
  | 'info';
}

interface ShopContextType {
  activePage: PageView;

  setActivePage: (
    page: PageView
  ) => void;

  isMenuOpen: boolean;

  setIsMenuOpen: (
    open: boolean
  ) => void;

  consultationProduct:
  | WatchProduct
  | WatchProductVelaro
  | null;

  openConsultationModal: (
    product:
      | WatchProduct
      | WatchProductVelaro
  ) => void;

  closeConsultationModal: () => void;

  cartTotalEgp: number;

  selectedProductId: string;

  setSelectedProductId: (
    id: string
  ) => void;

  selectedBrandSlug: string;

  setSelectedBrandSlug: (
    slug: string
  ) => void;

  navigateToProduct: (
    id: string
  ) => void;

  navigateToBrand: (
    brandSlug: string
  ) => void;

  navigateToCategory: (
    category: string
  ) => void;

  currency: CurrencyType;

  setCurrency: (
    c: CurrencyType
  ) => void;

  formatPrice: (
    usdPrice: number
  ) => string;

  cart: CartItemVelaro[];

  addToCart: (
    product:
      | WatchProductVelaro
      | WatchProduct,
    qty?: number
  ) => void;

  removeFromCart: (
    productId: string
  ) => void;

  updateQuantity: (
    productId: string,
    delta: number
  ) => void;

  isCartOpen: boolean;

  setIsCartOpen: (
    open: boolean
  ) => void;

  cartTotalUsd: number;

  cartCount: number;

  wishlist: string[];

  toggleWishlist: (
    productId: string
  ) => void;

  isInWishlist: (
    productId: string
  ) => boolean;

  compareList:
  WatchProductVelaro[];

  toggleCompare: (
    product: WatchProductVelaro
  ) => void;

  isInCompare: (
    productId: string
  ) => boolean;

  clearCompare: () => void;

  isCompareModalOpen: boolean;

  setIsCompareModalOpen: (
    open: boolean
  ) => void;

  isSearchOpen: boolean;

  setIsSearchOpen: (
    open: boolean
  ) => void;

  isSourcingModalOpen: boolean;

  setIsSourcingModalOpen: (
    open: boolean
  ) => void;

  isSellTradeModalOpen: boolean;

  setIsSellTradeModalOpen: (
    open: boolean
  ) => void;

  authenticityModalProduct:
  WatchProductVelaro | null;

  openAuthenticityReport: (
    product: WatchProductVelaro
  ) => void;

  closeAuthenticityReport:
  () => void;

  toast: ToastMessage | null;

  showToast: (
    title: string,
    message: string,
    type?:
      | 'cart'
      | 'wishlist'
      | 'compare'
      | 'info'
  ) => void;

  filters:
  CollectionFilterStateVelaro;

  setFilters:
  React.Dispatch<
    React.SetStateAction<
      CollectionFilterStateVelaro
    >
  >;

  resetFilters: () => void;

  activeMegaMenu:
  | 'brands'
  | 'watches'
  | 'luxury'
  | 'collections'
  | null;

  setActiveMegaMenu: (
    menu:
      | 'brands'
      | 'watches'
      | 'luxury'
      | 'collections'
      | null
  ) => void;
}

const initialFilters:
  CollectionFilterStateVelaro = {
  brand: '',
  category: '',
  movement: '',
  condition: '',
  minPrice: 0,
  maxPrice: 500000,
  caseSize: '',
  searchQuery: ''
};

const ShopContext =
  createContext<
    ShopContextType | undefined
  >(undefined);

function readStored<T>(
  key: string,
  fallback: T,
  validate:
    (value: unknown) => value is T
): T {
  try {
    const value: unknown =
      JSON.parse(
        localStorage.getItem(key) ??
        'null'
      );

    return validate(value)
      ? value
      : fallback;

  } catch {
    return fallback;
  }
}

/*
  IMPORTANT:
  admin-inventory is included here.
*/
const pages: PageView[] = [
  'home',
  'collection',
  'product-detail',
  'brand',
  'certified-preowned',
  'sell-trade',
  'watch-sourcing',
  'bespoke',
  'journal',
  'account',
  'auth',
  'admin-orders',
  'admin-inventory',
  'luxury-suite',
  'pre-owned',
  'story',
  'wishlist',
  'client-care'
];

function readRoute() {
  const params =
    new URLSearchParams(
      window.location.hash.slice(1)
    );

  const page =
    params.get('page') as PageView;

  return {
    page:
      pages.includes(page)
        ? page
        : ('home' as PageView),

    product:
      params.get('product') ??
      VELARO_PRODUCTS[0].id,

    brand:
      params.get('brand') ??
      'rolex'
  };
}

export const ShopProvider:
  React.FC<{
    children: React.ReactNode;
  }> = ({ children }) => {

    const { user } = useAuth();

    const [
      activePage,
      updateActivePage
    ] = useState<PageView>(
      () => readRoute().page
    );

    const [
      selectedProductId,
      setSelectedProductId
    ] = useState<string>(
      () => readRoute().product
    );

    const [
      selectedBrandSlug,
      setSelectedBrandSlug
    ] = useState<string>(
      () => readRoute().brand
    );

    const [
      isMenuOpen,
      setIsMenuOpen
    ] = useState(false);

    const [
      consultationProduct,
      setConsultationProduct
    ] = useState<
      | WatchProduct
      | WatchProductVelaro
      | null
    >(null);

    const setActivePage = (
      page: PageView
    ) => {
      updateActivePage(page);

      window.scrollTo({
        top: 0,
        behavior: 'instant'
      });
    };

    const [
      currency,
      setCurrency
    ] =
      useState<CurrencyType>(
        'EGP'
      );

    const [
      cart,
      setCart
    ] =
      useState<CartItemVelaro[]>(
        () => {

          const items =
            readStored<
              {
                id: string;
                quantity: number;
              }[]
            >(
              'velaro-cart',
              [],
              (
                v
              ): v is {
                id: string;
                quantity: number;
              }[] =>
                Array.isArray(v) &&
                v.every(
                  (i) =>
                    i &&
                    typeof i.id ===
                    'string' &&
                    Number.isInteger(
                      i.quantity
                    ) &&
                    i.quantity > 0 &&
                    i.quantity <= 99
                )
            );

          return items.flatMap(
            (i) => {

              const product =
                SHOP_PRODUCTS.find(
                  (p) =>
                    p.id === i.id
                );

              return product
                ? [
                  {
                    product:
                      product as CartProductVelaro,

                    quantity:
                      i.quantity
                  }
                ]
                : [];
            }
          );
        }
      );

    const [
      isCartOpen,
      setIsCartOpen
    ] = useState(false);

    const [
      wishlist,
      setWishlist
    ] =
      useState<string[]>(
        () =>
          readStored<string[]>(
            'velaro-wishlist',
            [],
            (
              v
            ): v is string[] =>
              Array.isArray(v) &&
              v.every(
                (id) =>
                  typeof id ===
                  'string'
              )
          )
      );

    const [
      wishlistReady,
      setWishlistReady
    ] =
      useState(false);

    const [
      compareList,
      setCompareList
    ] =
      useState<
        WatchProductVelaro[]
      >([]);

    const [
      isCompareModalOpen,
      setIsCompareModalOpen
    ] = useState(false);

    const [
      isSearchOpen,
      setIsSearchOpen
    ] = useState(false);

    const [
      isSourcingModalOpen,
      setIsSourcingModalOpen
    ] = useState(false);

    const [
      isSellTradeModalOpen,
      setIsSellTradeModalOpen
    ] = useState(false);

    const [
      authenticityModalProduct,
      setAuthenticityModalProduct
    ] =
      useState<
        WatchProductVelaro | null
      >(null);

    const [
      toast,
      setToast
    ] =
      useState<
        ToastMessage | null
      >(null);

    const [
      activeMegaMenu,
      setActiveMegaMenu
    ] =
      useState<
        | 'brands'
        | 'watches'
        | 'luxury'
        | 'collections'
        | null
      >(null);

    const [
      filters,
      setFilters
    ] =
      useState<
        CollectionFilterStateVelaro
      >(initialFilters);

    const toastTimer =
      useRef<
        ReturnType<
          typeof setTimeout
        >
      >();

    useEffect(
      () =>
        () =>
          clearTimeout(
            toastTimer.current
          ),
      []
    );

    /*
      ==========================================
      LOAD USER WISHLIST
      ==========================================
    */
    useEffect(() => {

      let cancelled = false;

      const loadWishlist =
        async () => {

          setWishlistReady(false);

          if (!user) {

            const guestWishlist =
              readStored<string[]>(
                'velaro-wishlist',
                [],
                (
                  value
                ): value is string[] =>
                  Array.isArray(
                    value
                  ) &&
                  value.every(
                    (id) =>
                      typeof id ===
                      'string'
                  )
              );

            if (!cancelled) {
              setWishlist(
                guestWishlist
              );

              setWishlistReady(
                true
              );
            }

            return;
          }

          try {

            const userRef =
              doc(
                db,
                'users',
                user.uid
              );

            const snapshot =
              await getDoc(
                userRef
              );

            if (
              snapshot.exists()
            ) {

              const data =
                snapshot.data();

              const savedWishlist =
                Array.isArray(
                  data.wishlist
                )
                  ? data.wishlist.filter(
                    (
                      id:
                        unknown
                    ): id is string =>
                      typeof id ===
                      'string'
                  )
                  : [];

              if (!cancelled) {
                setWishlist(
                  savedWishlist
                );
              }

            } else {

              await setDoc(
                userRef,
                {
                  email:
                    user.email ??
                    '',

                  wishlist: [],

                  createdAt:
                    new Date()
                },
                {
                  merge: true
                }
              );

              if (!cancelled) {
                setWishlist([]);
              }
            }

          } catch (error) {

            console.error(
              'Failed to load wishlist:',
              error
            );

          } finally {

            if (!cancelled) {
              setWishlistReady(
                true
              );
            }

          }
        };

      loadWishlist();

      return () => {
        cancelled = true;
      };

    }, [user]);

    /*
      ==========================================
      SAVE USER WISHLIST
      ==========================================
    */
    useEffect(() => {

      if (
        !user ||
        !wishlistReady
      ) {
        return;
      }

      const saveWishlist =
        async () => {

          try {

            const userRef =
              doc(
                db,
                'users',
                user.uid
              );

            await setDoc(
              userRef,
              {
                email:
                  user.email ??
                  '',

                wishlist
              },
              {
                merge: true
              }
            );

          } catch (error) {

            console.error(
              'Failed to save wishlist:',
              error
            );

          }
        };

      saveWishlist();

    }, [
      wishlist,
      user,
      wishlistReady
    ]);

    /*
      ==========================================
      LOCAL STORAGE
      ==========================================
    */
    useEffect(() => {

      try {

        localStorage.setItem(
          'velaro-cart',
          JSON.stringify(
            cart.map(
              (i) => ({
                id:
                  i.product.id,

                quantity:
                  i.quantity
              })
            )
          )
        );

        localStorage.setItem(
          'velaro-currency',
          JSON.stringify(
            currency
          )
        );

        if (!user) {

          localStorage.setItem(
            'velaro-wishlist',
            JSON.stringify(
              wishlist
            )
          );
        }

      } catch {
        // Ignore storage errors
      }

    }, [
      cart,
      wishlist,
      currency,
      user
    ]);

    /*
      ==========================================
      URL ROUTING
      ==========================================
    */
    useEffect(() => {

      const params =
        new URLSearchParams({
          page:
            activePage
        });

      if (
        activePage ===
        'product-detail'
      ) {

        params.set(
          'product',
          selectedProductId
        );
      }

      if (
        activePage ===
        'brand'
      ) {

        params.set(
          'brand',
          selectedBrandSlug
        );
      }

      const next =
        '#' +
        params.toString();

      if (
        window.location.hash !==
        next
      ) {

        window.history.pushState(
          null,
          '',
          next
        );
      }

      document.title =
        `${activePage === 'home'
          ? 'Time, Elevated.'
          : activePage.replace(
            /-/g,
            ' '
          )
        } | VELARO`;

    }, [
      activePage,
      selectedProductId,
      selectedBrandSlug
    ]);

    useEffect(() => {

      const restore = () => {

        const route =
          readRoute();

        updateActivePage(
          route.page
        );

        setSelectedProductId(
          route.product
        );

        setSelectedBrandSlug(
          route.brand
        );

        window.scrollTo(
          0,
          0
        );
      };

      window.addEventListener(
        'popstate',
        restore
      );

      window.addEventListener(
        'hashchange',
        restore
      );

      return () => {

        window.removeEventListener(
          'popstate',
          restore
        );

        window.removeEventListener(
          'hashchange',
          restore
        );
      };

    }, []);

    /*
      ==========================================
      TOAST
      ==========================================
    */
    const showToast = (
      title: string,
      message: string,
      type:
        | 'cart'
        | 'wishlist'
        | 'compare'
        | 'info' =
        'info'
    ) => {

      const id =
        Date.now().toString();

      clearTimeout(
        toastTimer.current
      );

      setToast({
        id,
        title,
        message,
        type
      });

      toastTimer.current =
        setTimeout(
          () => {
            setToast(null);
          },
          3500
        );
    };

    /*
      ==========================================
      PRICE FORMAT
      ==========================================
    */
    const formatPrice = (
      usdPrice: number
    ): string => {

      let rate = 1;
      let symbol = '$';

      if (
        currency === 'EUR'
      ) {
        rate = 0.92;
        symbol = '€';

      } else if (
        currency === 'GBP'
      ) {
        rate = 0.78;
        symbol = '£';

      } else if (
        currency === 'EGP'
      ) {
        rate = 49.0;
        symbol = 'EGP ';
      }

      const converted =
        usdPrice * rate;

      const formatted =
        new Intl.NumberFormat(
          'en-US',
          {
            maximumFractionDigits:
              0
          }
        ).format(
          Math.round(
            converted
          )
        );

      return `${symbol}${formatted}`;
    };

    /*
      ==========================================
      NAVIGATION
      ==========================================
    */
    const navigateToProduct = (
      id: string
    ) => {

      setSelectedProductId(id);

      setActivePage(
        'product-detail'
      );

      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    };

    const navigateToBrand = (
      brandSlug: string
    ) => {

      setSelectedBrandSlug(
        brandSlug
          .toLowerCase()
          .replace(
            /\s+/g,
            '-'
          )
      );

      setActivePage(
        'brand'
      );

      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    };

    const navigateToCategory = (
      category: string
    ) => {

      setFilters({
        ...initialFilters,
        category
      });

      setActivePage(
        'collection'
      );

      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    };

    /*
      ==========================================
      ADD TO CART
      ==========================================
    */
    const addToCart = (
      input:
        | WatchProductVelaro
        | WatchProduct,
      qty: number = 1
    ) => {

      const incomingProduct =
        input as
        | (
          WatchProductVelaro & {
            stock?: number;
            price?: number;
            currency?: string;
          }
        )
        | (
          WatchProduct & {
            stock?: number;
            price?: number;
            currency?: string;
          }
        );

      const availableStock =
        typeof incomingProduct.stock ===
          'number'
          ? incomingProduct.stock
          : 1;

      if (
        availableStock <= 0
      ) {

        showToast(
          'OUT OF STOCK',
          `${incomingProduct.brand} ${incomingProduct.name} is currently unavailable.`,
          'info'
        );

        return;
      }

      if (
        !Number.isInteger(qty) ||
        qty < 1
      ) {
        return;
      }

      const product =
        toShopProduct(
          input
        ) as CartProductVelaro;

      const existing =
        cart.find(
          (item) =>
            item.product.id ===
            product.id
        );

      const existingQuantity =
        existing?.quantity ?? 0;

      if (
        existingQuantity + qty >
        availableStock
      ) {

        showToast(
          'STOCK LIMIT REACHED',
          `Only ${availableStock} available for ${product.brand} ${product.name}.`,
          'info'
        );

        setIsCartOpen(true);

        return;
      }

      setCart(
        (prev) => {

          const current =
            prev.find(
              (item) =>
                item.product.id ===
                product.id
            );

          if (current) {

            return prev.map(
              (item) =>
                item.product.id ===
                  product.id
                  ? {
                    ...item,

                    product: {
                      ...item.product,
                      stock:
                        availableStock
                    },

                    quantity:
                      item.quantity +
                      qty
                  }
                  : item
            );
          }

          return [
            ...prev,
            {
              product: {
                ...product,
                stock:
                  availableStock
              },

              quantity:
                qty
            }
          ];
        }
      );

      showToast(
        'ADDED TO BAG',
        `${product.brand} ${product.name}`,
        'cart'
      );

      setIsCompareModalOpen(
        false
      );

      setIsCartOpen(
        true
      );
    };

    /*
      ==========================================
      REMOVE FROM CART
      ==========================================
    */
    const removeFromCart = (
      productId: string
    ) => {

      setCart(
        (prev) =>
          prev.filter(
            (item) =>
              item.product.id !==
              productId
          )
      );
    };

    /*
      ==========================================
      UPDATE CART QUANTITY
      ==========================================
    */
    const updateQuantity = (
      productId: string,
      delta: number
    ) => {

      const item =
        cart.find(
          (cartItem) =>
            cartItem.product.id ===
            productId
        );

      if (!item) {
        return;
      }

      const newQuantity =
        item.quantity +
        delta;

      if (
        newQuantity < 1
      ) {
        return;
      }

      const availableStock =
        typeof item.product.stock ===
          'number'
          ? item.product.stock
          : 1;

      if (
        delta > 0 &&
        newQuantity >
        availableStock
      ) {

        showToast(
          'STOCK LIMIT REACHED',
          `Only ${availableStock} available for ${item.product.brand} ${item.product.name}.`,
          'info'
        );

        return;
      }

      setCart(
        (prev) =>
          prev.map(
            (cartItem) => {

              if (
                cartItem.product.id !==
                productId
              ) {
                return cartItem;
              }

              return {
                ...cartItem,
                quantity:
                  newQuantity
              };
            }
          )
      );
    };

    /*
      ==========================================
      WISHLIST
      ==========================================
    */
    const toggleWishlist = (
      productId: string
    ) => {

      const target =
        SHOP_PRODUCTS.find(
          (p) =>
            p.id ===
            productId
        );

      const alreadySaved =
        wishlist.includes(
          productId
        );

      showToast(
        alreadySaved
          ? 'REMOVED FROM WISHLIST'
          : 'SAVED TO WISHLIST',

        target?.name ??
        'Timepiece',

        'wishlist'
      );

      setWishlist(
        (prev) => {

          if (
            prev.includes(
              productId
            )
          ) {

            return prev.filter(
              (id) =>
                id !==
                productId
            );
          }

          return [
            ...prev,
            productId
          ];
        }
      );
    };

    const isInWishlist = (
      productId: string
    ) =>
      wishlist.includes(
        productId
      );

    /*
      ==========================================
      COMPARE
      ==========================================
    */
    const toggleCompare = (
      product:
        WatchProductVelaro
    ) => {

      const exists =
        compareList.some(
          (p) =>
            p.id ===
            product.id
        );

      if (
        !exists &&
        compareList.length >= 3
      ) {

        showToast(
          'COMPARISON LIMIT REACHED',
          'You can compare up to 3 timepieces.',
          'info'
        );

        return;
      }

      showToast(
        exists
          ? 'REMOVED FROM COMPARISON'
          : 'ADDED TO COMPARISON',

        product.name,

        'compare'
      );

      setCompareList(
        (prev) => {

          const exists =
            prev.some(
              (p) =>
                p.id ===
                product.id
            );

          if (exists) {

            return prev.filter(
              (p) =>
                p.id !==
                product.id
            );
          }

          if (
            prev.length >= 3
          ) {
            return prev;
          }

          return [
            ...prev,
            product
          ];
        }
      );
    };

    const isInCompare = (
      productId: string
    ) =>
      compareList.some(
        (p) =>
          p.id ===
          productId
      );

    const clearCompare =
      () =>
        setCompareList([]);

    /*
      ==========================================
      AUTHENTICITY REPORT
      ==========================================
    */
    const openAuthenticityReport = (
      product:
        WatchProductVelaro
    ) => {

      if (
        product
          .conditionScorecard
          .caseScore === 0
      ) {

        showToast(
          'REPORT NOT AVAILABLE',
          'No inspection report has been supplied for this archive reference.'
        );

        return;
      }

      setAuthenticityModalProduct(
        product
      );
    };

    const closeAuthenticityReport =
      () => {

        setAuthenticityModalProduct(
          null
        );
      };

    /*
      ==========================================
      RESET FILTERS
      ==========================================
    */
    const resetFilters =
      () =>
        setFilters(
          initialFilters
        );

    /*
      ==========================================
      CART TOTALS
      ==========================================
    */
    const cartTotalUsd =
      cart.reduce(
        (sum, item) =>
          sum +
          item.product
            .priceUsd *
          item.quantity,
        0
      );

    const cartCount =
      cart.reduce(
        (sum, item) =>
          sum +
          item.quantity,
        0
      );

    return (
      <ShopContext.Provider
        value={{
          isMenuOpen,
          setIsMenuOpen,

          consultationProduct,

          openConsultationModal:
            setConsultationProduct,

          closeConsultationModal:
            () =>
              setConsultationProduct(
                null
              ),

          cartTotalEgp:
            cartTotalUsd *
            DEMO_EGP_RATE,

          activePage,
          setActivePage,

          selectedProductId,
          setSelectedProductId,

          selectedBrandSlug,
          setSelectedBrandSlug,

          navigateToProduct,
          navigateToBrand,
          navigateToCategory,

          currency,
          setCurrency,
          formatPrice,

          cart,
          addToCart,
          removeFromCart,
          updateQuantity,

          isCartOpen,
          setIsCartOpen,

          cartTotalUsd,
          cartCount,

          wishlist,
          toggleWishlist,
          isInWishlist,

          compareList,
          toggleCompare,
          isInCompare,
          clearCompare,

          isCompareModalOpen,
          setIsCompareModalOpen,

          isSearchOpen,
          setIsSearchOpen,

          isSourcingModalOpen,
          setIsSourcingModalOpen,

          isSellTradeModalOpen,
          setIsSellTradeModalOpen,

          authenticityModalProduct,
          openAuthenticityReport,
          closeAuthenticityReport,

          toast,
          showToast,

          filters,
          setFilters,
          resetFilters,

          activeMegaMenu,
          setActiveMegaMenu
        }}
      >
        {children}
      </ShopContext.Provider>
    );
  };

export const useShop = () => {

  const context =
    useContext(
      ShopContext
    );

  if (!context) {

    throw new Error(
      'useShop must be used within a ShopProvider'
    );
  }

  return context;
};