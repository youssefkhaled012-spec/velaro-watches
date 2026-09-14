import React, { useEffect, useState } from 'react';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc
} from 'firebase/firestore';

import { useShop } from '../context/ShopContext';
import { useAuth } from '../context/AuthContext';
import { SHOP_PRODUCTS } from '../data/catalog';
import { db } from '../firebase/firebase';

interface OrderItem {
  productId: string;
  brand: string;
  name: string;
  reference: string;
  quantity: number;
  priceUsd: number;
  lineTotalUsd: number;
  image?: string;
}

interface OrderRecord {
  id: string;
  items: OrderItem[];
  totalUsd: number;
  currency?: string;
  status?: string;
  paymentStatus?: string;
  createdAt?: any;
  deliveryAddress?: {
    street?: string;
    city?: string;
    governorate?: string;
    postalCode?: string;
  };
}

export const AccountDashboard: React.FC = () => {
  const {
    wishlist,
    setActivePage,
    formatPrice
  } = useShop();

  const {
    user,
    logout
  } = useAuth();

  const [tab, setTab] = useState<
    'orders' |
    'wishlist' |
    'addresses' |
    'profile'
  >('orders');

  const [loggingOut, setLoggingOut] =
    useState(false);

  const [loadingProfile, setLoadingProfile] =
    useState(true);

  const [loadingOrders, setLoadingOrders] =
    useState(true);

  const [savingProfile, setSavingProfile] =
    useState(false);

  const [savingAddress, setSavingAddress] =
    useState(false);

  const [message, setMessage] =
    useState('');

  const [orders, setOrders] =
    useState<OrderRecord[]>([]);

  const [firstName, setFirstName] =
    useState('');

  const [lastName, setLastName] =
    useState('');

  const [phone, setPhone] =
    useState('');

  const [street, setStreet] =
    useState('');

  const [city, setCity] =
    useState('');

  const [governorate, setGovernorate] =
    useState('');

  const [postalCode, setPostalCode] =
    useState('');

  const wishlisted =
    SHOP_PRODUCTS.filter((p) =>
      wishlist.includes(p.id)
    );

  useEffect(() => {
    if (!user) {
      setLoadingProfile(false);
      setLoadingOrders(false);
      return;
    }

    const loadUserData = async () => {
      try {
        setLoadingProfile(true);

        const userRef = doc(
          db,
          'users',
          user.uid
        );

        const snapshot =
          await getDoc(userRef);

        if (!snapshot.exists()) {
          return;
        }

        const data = snapshot.data();

        setFirstName(
          data.firstName ?? ''
        );

        setLastName(
          data.lastName ?? ''
        );

        setPhone(
          data.phone ?? ''
        );

        setStreet(
          data.address?.street ?? ''
        );

        setCity(
          data.address?.city ?? ''
        );

        setGovernorate(
          data.address?.governorate ?? ''
        );

        setPostalCode(
          data.address?.postalCode ?? ''
        );

      } catch (error) {
        console.error(
          'Failed to load account details:',
          error
        );
      } finally {
        setLoadingProfile(false);
      }
    };

    const loadOrders = async () => {
      try {
        setLoadingOrders(true);

        const ordersRef = collection(
          db,
          'users',
          user.uid,
          'orders'
        );

        const snapshot =
          await getDocs(ordersRef);

        const loadedOrders: OrderRecord[] =
          snapshot.docs.map((orderDoc) => {
            const data = orderDoc.data();

            return {
              id: orderDoc.id,
              items: Array.isArray(data.items)
                ? data.items
                : [],
              totalUsd:
                typeof data.totalUsd === 'number'
                  ? data.totalUsd
                  : 0,
              currency:
                data.currency ?? 'EGP',
              status:
                data.status ?? 'pending',
              paymentStatus:
                data.paymentStatus ?? 'not_paid',
              createdAt:
                data.createdAt,
              deliveryAddress:
                data.deliveryAddress ?? {}
            };
          });

        loadedOrders.sort((a, b) => {
          const aTime =
            a.createdAt?.toMillis?.() ?? 0;

          const bTime =
            b.createdAt?.toMillis?.() ?? 0;

          return bTime - aTime;
        });

        setOrders(loadedOrders);

      } catch (error) {
        console.error(
          'Failed to load orders:',
          error
        );
      } finally {
        setLoadingOrders(false);
      }
    };

    loadUserData();
    loadOrders();

  }, [user]);

  const handleLogout = async () => {
    try {
      setLoggingOut(true);

      await logout();

      setActivePage('auth');

    } catch (error) {
      console.error(
        'Logout failed:',
        error
      );

    } finally {
      setLoggingOut(false);
    }
  };

  const saveProfile = async () => {
    if (!user) {
      return;
    }

    try {
      setSavingProfile(true);
      setMessage('');

      const userRef = doc(
        db,
        'users',
        user.uid
      );

      await setDoc(
        userRef,
        {
          email: user.email ?? '',
          firstName: firstName.trim(),
          lastName: lastName.trim(),
          phone: phone.trim()
        },
        {
          merge: true
        }
      );

      setMessage(
        'Profile saved successfully.'
      );

    } catch (error) {
      console.error(
        'Failed to save profile:',
        error
      );

      setMessage(
        'Could not save profile.'
      );

    } finally {
      setSavingProfile(false);
    }
  };

  const saveAddress = async () => {
    if (!user) {
      return;
    }

    try {
      setSavingAddress(true);
      setMessage('');

      const userRef = doc(
        db,
        'users',
        user.uid
      );

      await setDoc(
        userRef,
        {
          email: user.email ?? '',
          address: {
            street: street.trim(),
            city: city.trim(),
            governorate:
              governorate.trim(),
            postalCode:
              postalCode.trim()
          }
        },
        {
          merge: true
        }
      );

      setMessage(
        'Address saved successfully.'
      );

    } catch (error) {
      console.error(
        'Failed to save address:',
        error
      );

      setMessage(
        'Could not save address.'
      );

    } finally {
      setSavingAddress(false);
    }
  };

  const formatOrderDate = (
    createdAt: any
  ) => {
    if (!createdAt) {
      return 'Processing';
    }

    try {
      const date =
        typeof createdAt.toDate === 'function'
          ? createdAt.toDate()
          : new Date(createdAt);

      return date.toLocaleDateString(
        'en-GB',
        {
          day: '2-digit',
          month: 'short',
          year: 'numeric'
        }
      );

    } catch {
      return 'Processing';
    }
  };

  if (loadingProfile) {
    return (
      <div className="min-h-screen bg-[#080808] text-[#F5F5F5] pt-40 px-6 text-center">
        <p className="text-sm text-[#A5A5A5]">
          Loading your VELARO account...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#080808] text-[#F5F5F5] pt-32 pb-24 px-6">

      <div className="max-w-5xl mx-auto">

        {/* HEADER */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">

          <div>

            <p className="eyebrow">
              VELARO ACCOUNT
            </p>

            <h1 className="font-serif text-5xl mt-3">
              My Account
            </h1>

            {user?.email && (
              <p className="text-sm text-[#A5A5A5] mt-3">
                Signed in as {user.email}
              </p>
            )}

          </div>

          <button
            onClick={handleLogout}
            disabled={loggingOut}
            className="border border-[#C6A15B] text-[#C6A15B] px-5 py-3 text-[10px] uppercase tracking-[0.2em] hover:bg-[#C6A15B] hover:text-[#080808] transition-colors disabled:opacity-50"
          >
            {loggingOut
              ? 'SIGNING OUT...'
              : 'LOG OUT'}
          </button>

        </div>

        {/* TABS */}
        <div className="flex flex-wrap gap-2 mt-10 border-b border-white/10 pb-3">

          {([
            'orders',
            'wishlist',
            'addresses',
            'profile'
          ] as const).map((x) => (

            <button
              key={x}
              onClick={() => {
                setTab(x);
                setMessage('');
              }}
              className={`px-4 py-2 text-xs uppercase tracking-widest ${tab === x
                  ? 'text-[#C6A15B] border-b border-[#C6A15B]'
                  : 'text-[#A5A5A5]'
                }`}
            >
              {x}
            </button>

          ))}

        </div>

        {/* MESSAGE */}
        {message && (
          <div className="mt-6 border border-[#C6A15B]/30 bg-[#C6A15B]/10 px-4 py-3 text-sm text-[#C6A15B]">
            {message}
          </div>
        )}

        {/* CONTENT */}
        <div className="mt-10 border border-white/10 bg-[#111] p-6 sm:p-8">

          {/* ORDERS */}
          {tab === 'orders' && (
            <>

              <div className="flex items-center justify-between gap-4">

                <div>

                  <h2 className="font-serif text-2xl">
                    Orders
                  </h2>

                  <p className="text-sm text-[#A5A5A5] mt-2">
                    Your recent VELARO orders.
                  </p>

                </div>

                {orders.length > 0 && (
                  <span className="text-[10px] uppercase tracking-[0.2em] text-[#C6A15B]">
                    {orders.length}{' '}
                    {orders.length === 1
                      ? 'ORDER'
                      : 'ORDERS'}
                  </span>
                )}

              </div>

              {loadingOrders ? (

                <p className="text-sm text-[#A5A5A5] mt-8">
                  Loading orders...
                </p>

              ) : orders.length === 0 ? (

                <div className="mt-8">

                  <p className="text-sm text-[#A5A5A5]">
                    You have not placed any orders yet.
                  </p>

                  <button
                    onClick={() =>
                      setActivePage('collection')
                    }
                    className="gold-button mt-6"
                  >
                    BROWSE TIMEPIECES
                  </button>

                </div>

              ) : (

                <div className="mt-8 space-y-6">

                  {orders.map((order) => (

                    <div
                      key={order.id}
                      className="border border-white/10 bg-[#080808] p-5 sm:p-6"
                    >

                      {/* ORDER HEADER */}
                      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 border-b border-white/10 pb-5">

                        <div>

                          <p className="text-[9px] uppercase tracking-[0.2em] text-[#A5A5A5]">
                            Order Reference
                          </p>

                          <p className="text-sm text-[#C6A15B] mt-1 break-all">
                            {order.id}
                          </p>

                        </div>

                        <div className="md:text-right">

                          <p className="text-[9px] uppercase tracking-[0.2em] text-[#A5A5A5]">
                            Order Date
                          </p>

                          <p className="text-sm mt-1">
                            {formatOrderDate(
                              order.createdAt
                            )}
                          </p>

                        </div>

                      </div>

                      {/* STATUS */}
                      <div className="grid sm:grid-cols-3 gap-4 py-5 border-b border-white/10">

                        <div>

                          <p className="text-[9px] uppercase tracking-[0.2em] text-[#A5A5A5]">
                            Status
                          </p>

                          <p className="text-sm mt-1 text-[#C6A15B] uppercase">
                            {order.status ??
                              'pending'}
                          </p>

                        </div>

                        <div>

                          <p className="text-[9px] uppercase tracking-[0.2em] text-[#A5A5A5]">
                            Payment
                          </p>

                          <p className="text-sm mt-1 uppercase">
                            {(order.paymentStatus ??
                              'not_paid'
                            ).replace(
                              /_/g,
                              ' '
                            )}
                          </p>

                        </div>

                        <div>

                          <p className="text-[9px] uppercase tracking-[0.2em] text-[#A5A5A5]">
                            Total
                          </p>

                          <p className="text-lg font-semibold text-[#F5F5F5] mt-1">
                            {formatPrice(
                              order.totalUsd
                            )}
                          </p>

                        </div>

                      </div>

                      {/* ITEMS */}
                      <div className="mt-5 space-y-4">

                        {order.items.map(
                          (item, index) => (

                            <div
                              key={`${item.productId}-${index}`}
                              className="flex items-center gap-4"
                            >

                              {item.image ? (

                                <img
                                  src={item.image}
                                  alt={`${item.brand} ${item.name}`}
                                  className="w-16 h-20 object-cover bg-[#111] border border-white/10"
                                />

                              ) : (

                                <div className="w-16 h-20 bg-[#111] border border-white/10" />

                              )}

                              <div className="flex-1">

                                <p className="text-[9px] uppercase tracking-[0.2em] text-[#C6A15B]">
                                  {item.brand}
                                </p>

                                <p className="font-serif text-lg mt-1">
                                  {item.name}
                                </p>

                                <p className="text-[10px] text-[#A5A5A5] mt-1">
                                  Ref. {item.reference}
                                </p>

                                <p className="text-[10px] text-[#A5A5A5] mt-1">
                                  Quantity: {item.quantity}
                                </p>

                              </div>

                              <div className="text-right">

                                <p className="text-sm">
                                  {formatPrice(
                                    item.lineTotalUsd
                                  )}
                                </p>

                              </div>

                            </div>

                          )
                        )}

                      </div>

                      {/* DELIVERY */}
                      {order.deliveryAddress && (
                        <div className="mt-6 pt-5 border-t border-white/10">

                          <p className="text-[9px] uppercase tracking-[0.2em] text-[#A5A5A5]">
                            Delivery Address
                          </p>

                          <p className="text-xs text-[#A5A5A5] mt-2 leading-relaxed">

                            {order.deliveryAddress.street}

                            {order.deliveryAddress.city
                              ? `, ${order.deliveryAddress.city}`
                              : ''}

                            {order.deliveryAddress.governorate
                              ? `, ${order.deliveryAddress.governorate}`
                              : ''}

                            {order.deliveryAddress.postalCode
                              ? `, ${order.deliveryAddress.postalCode}`
                              : ''}

                          </p>

                        </div>
                      )}

                    </div>

                  ))}

                </div>

              )}

            </>
          )}

          {/* WISHLIST */}
          {tab === 'wishlist' && (
            <>

              <h2 className="font-serif text-2xl">
                Wishlist
              </h2>

              {wishlisted.length ? (

                <div className="mt-5 space-y-3">

                  {wishlisted.map((p) => (

                    <div
                      key={p.id}
                      className="flex justify-between border-b border-white/10 pb-3"
                    >

                      <span>
                        {p.brand} {p.name}
                      </span>

                      <span className="text-[#C6A15B]">
                        {formatPrice(
                          p.priceUsd
                        )}
                      </span>

                    </div>

                  ))}

                </div>

              ) : (

                <p className="text-sm text-[#A5A5A5] mt-3">
                  Your wishlist is empty.
                </p>

              )}

            </>
          )}

          {/* ADDRESSES */}
          {tab === 'addresses' && (
            <>

              <h2 className="font-serif text-2xl">
                Delivery Address
              </h2>

              <p className="text-sm text-[#A5A5A5] mt-3">
                Save your preferred delivery address.
              </p>

              <div className="grid sm:grid-cols-2 gap-5 mt-7">

                <div className="sm:col-span-2">

                  <label className="block text-[9px] uppercase tracking-[0.2em] text-[#A5A5A5] mb-2">
                    Street Address
                  </label>

                  <input
                    type="text"
                    value={street}
                    onChange={(e) =>
                      setStreet(
                        e.target.value
                      )
                    }
                    placeholder="Street and building number"
                    className="w-full bg-[#080808] border border-white/10 px-4 py-3 text-sm outline-none focus:border-[#C6A15B]"
                  />

                </div>

                <div>

                  <label className="block text-[9px] uppercase tracking-[0.2em] text-[#A5A5A5] mb-2">
                    City
                  </label>

                  <input
                    type="text"
                    value={city}
                    onChange={(e) =>
                      setCity(
                        e.target.value
                      )
                    }
                    placeholder="City"
                    className="w-full bg-[#080808] border border-white/10 px-4 py-3 text-sm outline-none focus:border-[#C6A15B]"
                  />

                </div>

                <div>

                  <label className="block text-[9px] uppercase tracking-[0.2em] text-[#A5A5A5] mb-2">
                    Governorate
                  </label>

                  <input
                    type="text"
                    value={governorate}
                    onChange={(e) =>
                      setGovernorate(
                        e.target.value
                      )
                    }
                    placeholder="Governorate"
                    className="w-full bg-[#080808] border border-white/10 px-4 py-3 text-sm outline-none focus:border-[#C6A15B]"
                  />

                </div>

                <div>

                  <label className="block text-[9px] uppercase tracking-[0.2em] text-[#A5A5A5] mb-2">
                    Postal Code
                  </label>

                  <input
                    type="text"
                    value={postalCode}
                    onChange={(e) =>
                      setPostalCode(
                        e.target.value
                      )
                    }
                    placeholder="Postal code"
                    className="w-full bg-[#080808] border border-white/10 px-4 py-3 text-sm outline-none focus:border-[#C6A15B]"
                  />

                </div>

              </div>

              <button
                onClick={saveAddress}
                disabled={savingAddress}
                className="gold-button mt-7 disabled:opacity-50"
              >
                {savingAddress
                  ? 'SAVING...'
                  : 'SAVE ADDRESS'}
              </button>

            </>
          )}

          {/* PROFILE */}
          {tab === 'profile' && (
            <>

              <h2 className="font-serif text-2xl">
                Profile
              </h2>

              <p className="text-sm text-[#A5A5A5] mt-3">
                Manage your personal details.
              </p>

              <div className="grid sm:grid-cols-2 gap-5 mt-7">

                <div>

                  <label className="block text-[9px] uppercase tracking-[0.2em] text-[#A5A5A5] mb-2">
                    First Name
                  </label>

                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) =>
                      setFirstName(
                        e.target.value
                      )
                    }
                    placeholder="First name"
                    className="w-full bg-[#080808] border border-white/10 px-4 py-3 text-sm outline-none focus:border-[#C6A15B]"
                  />

                </div>

                <div>

                  <label className="block text-[9px] uppercase tracking-[0.2em] text-[#A5A5A5] mb-2">
                    Last Name
                  </label>

                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) =>
                      setLastName(
                        e.target.value
                      )
                    }
                    placeholder="Last name"
                    className="w-full bg-[#080808] border border-white/10 px-4 py-3 text-sm outline-none focus:border-[#C6A15B]"
                  />

                </div>

                <div>

                  <label className="block text-[9px] uppercase tracking-[0.2em] text-[#A5A5A5] mb-2">
                    Phone Number
                  </label>

                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) =>
                      setPhone(
                        e.target.value
                      )
                    }
                    placeholder="+20..."
                    className="w-full bg-[#080808] border border-white/10 px-4 py-3 text-sm outline-none focus:border-[#C6A15B]"
                  />

                </div>

                <div>

                  <label className="block text-[9px] uppercase tracking-[0.2em] text-[#A5A5A5] mb-2">
                    Email
                  </label>

                  <input
                    type="email"
                    value={user?.email ?? ''}
                    disabled
                    className="w-full bg-[#080808] border border-white/10 px-4 py-3 text-sm text-[#A5A5A5] opacity-70"
                  />

                </div>

              </div>

              <button
                onClick={saveProfile}
                disabled={savingProfile}
                className="gold-button mt-7 disabled:opacity-50"
              >
                {savingProfile
                  ? 'SAVING...'
                  : 'SAVE PROFILE'}
              </button>

              <div className="mt-8 pt-6 border-t border-white/10">

                <p className="text-[9px] uppercase tracking-[0.2em] text-[#A5A5A5]">
                  Account ID
                </p>

                <p className="text-xs mt-2 text-[#A5A5A5] break-all">
                  {user?.uid}
                </p>

              </div>

            </>
          )}

        </div>

      </div>

    </div>
  );
};