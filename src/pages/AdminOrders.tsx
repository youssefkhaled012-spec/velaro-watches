import React, { useEffect, useState } from 'react';

import {
    collectionGroup,
    getDocs,
    doc,
    updateDoc,
    Timestamp,
    query,
    where,
    limit,
    collection,
    runTransaction,
    serverTimestamp,
    DocumentReference
} from 'firebase/firestore';

import { db } from '../firebase/firebase';
import { useAuth } from '../context/AuthContext';

interface OrderItem {
    productId: string;
    brand: string;
    name: string;
    reference: string;
    quantity: number;
    priceUsd: number;
    lineTotalUsd: number;
}

interface AdminOrder {
    id: string;
    userId: string;
    email: string;

    customer?: {
        firstName?: string;
        lastName?: string;
        phone?: string;
    };

    items: OrderItem[];

    totalUsd: number;

    status: string;
    paymentStatus: string;

    inventoryAdjusted?: boolean;
    inventoryAdjustedAt?: Timestamp;

    createdAt?: Timestamp;

    deliveryAddress?: {
        street?: string;
        city?: string;
        governorate?: string;
        postalCode?: string;
    };
}

interface ProductStockTarget {
    ref: DocumentReference;
    reference: string;
    quantity: number;
}

export const AdminOrders: React.FC = () => {
    const { user } = useAuth();

    const [orders, setOrders] =
        useState<AdminOrder[]>([]);

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState('');

    const [updatingId, setUpdatingId] =
        useState('');

    /*
      Current Firestore stock.
  
      Example:
      {
        "T137.407.11.041.00": 0
      }
    */
    const [productStocks, setProductStocks] =
        useState<Record<string, number>>({});

    /*
      Manual stock input fields.
    */
    const [stockInputs, setStockInputs] =
        useState<Record<string, string>>({});

    const [updatingStock, setUpdatingStock] =
        useState('');

    /*
      ==================================================
      FIND PRODUCT BY REFERENCE
      ==================================================
    */
    const findProductByReference =
        async (reference: string) => {

            const productsQuery =
                query(
                    collection(
                        db,
                        'products'
                    ),

                    where(
                        'reference',
                        '==',
                        reference.trim()
                    ),

                    limit(1)
                );

            const snapshot =
                await getDocs(
                    productsQuery
                );

            if (snapshot.empty) {
                throw new Error(
                    `Could not find product with reference ${reference}.`
                );
            }

            return snapshot.docs[0];
        };

    /*
      ==================================================
      LOAD PRODUCT STOCKS
      ==================================================
    */
    const loadProductStocks =
        async (
            loadedOrders: AdminOrder[]
        ) => {

            try {
                const references =
                    Array.from(
                        new Set(
                            loadedOrders.flatMap(
                                (order) =>
                                    order.items
                                        .map(
                                            (item) =>
                                                item.reference?.trim()
                                        )
                                        .filter(
                                            (
                                                reference
                                            ): reference is string =>
                                                Boolean(reference)
                                        )
                            )
                        )
                    );

                const nextStocks:
                    Record<string, number> = {};

                const nextInputs:
                    Record<string, string> = {};

                for (
                    const reference
                    of references
                ) {
                    try {
                        const productDoc =
                            await findProductByReference(
                                reference
                            );

                        const data =
                            productDoc.data();

                        const stock =
                            typeof data.stock ===
                                'number'
                                ? data.stock
                                : 0;

                        nextStocks[
                            reference
                        ] = stock;

                        nextInputs[
                            reference
                        ] = String(stock);

                    } catch (err) {
                        console.error(
                            `Could not load stock for ${reference}:`,
                            err
                        );
                    }
                }

                setProductStocks(
                    nextStocks
                );

                setStockInputs(
                    nextInputs
                );

            } catch (err) {
                console.error(
                    'Failed to load product stocks:',
                    err
                );
            }
        };

    /*
      ==================================================
      LOAD ORDERS
      ==================================================
    */
    const loadOrders = async () => {
        try {
            setLoading(true);
            setError('');

            const snapshot =
                await getDocs(
                    collectionGroup(
                        db,
                        'orders'
                    )
                );

            const loadedOrders =
                snapshot.docs.map(
                    (orderDoc) => {
                        const data =
                            orderDoc.data();

                        const userId =
                            orderDoc.ref.parent
                                .parent?.id ?? '';

                        return {
                            id:
                                orderDoc.id,

                            userId,

                            email:
                                data.email ?? '',

                            customer:
                                data.customer ?? {},

                            items:
                                Array.isArray(
                                    data.items
                                )
                                    ? data.items
                                    : [],

                            totalUsd:
                                typeof data.totalUsd ===
                                    'number'
                                    ? data.totalUsd
                                    : 0,

                            status:
                                data.status ??
                                'pending',

                            paymentStatus:
                                data.paymentStatus ??
                                'not_paid',

                            inventoryAdjusted:
                                data.inventoryAdjusted ===
                                true,

                            inventoryAdjustedAt:
                                data.inventoryAdjustedAt,

                            createdAt:
                                data.createdAt,

                            deliveryAddress:
                                data.deliveryAddress ??
                                {}
                        } as AdminOrder;
                    }
                );

            loadedOrders.sort(
                (a, b) => {
                    const aTime =
                        a.createdAt
                            ?.toMillis?.() ??
                        0;

                    const bTime =
                        b.createdAt
                            ?.toMillis?.() ??
                        0;

                    return (
                        bTime -
                        aTime
                    );
                }
            );

            setOrders(
                loadedOrders
            );

            /*
              Load current stock for
              all products appearing
              in these orders.
            */
            await loadProductStocks(
                loadedOrders
            );

        } catch (err) {
            console.error(
                'Failed to load admin orders:',
                err
            );

            setError(
                'You do not have permission to view admin orders.'
            );

        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!user) {
            setLoading(false);
            return;
        }

        loadOrders();

    }, [user]);

    /*
      ==================================================
      ADMIN MANUAL STOCK UPDATE
      ==================================================
    */
    const changeProductStock =
        async (
            reference: string,
            change: number
        ) => {

            try {
                setUpdatingStock(
                    reference
                );

                setError('');

                const productDoc =
                    await findProductByReference(
                        reference
                    );

                await runTransaction(
                    db,
                    async (
                        transaction
                    ) => {

                        const snapshot =
                            await transaction.get(
                                productDoc.ref
                            );

                        if (
                            !snapshot.exists()
                        ) {
                            throw new Error(
                                'Product no longer exists.'
                            );
                        }

                        const data =
                            snapshot.data();

                        const currentStock =
                            typeof data.stock ===
                                'number'
                                ? data.stock
                                : 0;

                        const newStock =
                            currentStock +
                            change;

                        if (
                            newStock < 0
                        ) {
                            throw new Error(
                                'Stock cannot go below 0.'
                            );
                        }

                        transaction.update(
                            productDoc.ref,
                            {
                                stock:
                                    newStock
                            }
                        );
                    }
                );

                const newStock =
                    Math.max(
                        0,
                        (
                            productStocks[
                            reference
                            ] ?? 0
                        ) +
                        change
                    );

                setProductStocks(
                    (previous) => ({
                        ...previous,
                        [reference]:
                            newStock
                    })
                );

                setStockInputs(
                    (previous) => ({
                        ...previous,
                        [reference]:
                            String(
                                newStock
                            )
                    })
                );

            } catch (err) {
                console.error(
                    'Failed to adjust stock:',
                    err
                );

                const message =
                    err instanceof Error
                        ? err.message
                        : 'Could not update stock.';

                setError(
                    message
                );

                alert(
                    message
                );

            } finally {
                setUpdatingStock('');
            }
        };

    /*
      ==================================================
      MANUALLY SET EXACT STOCK
      ==================================================
    */
    const setExactProductStock =
        async (
            reference: string
        ) => {

            try {
                setUpdatingStock(
                    reference
                );

                setError('');

                const value =
                    Number(
                        stockInputs[
                        reference
                        ]
                    );

                if (
                    !Number.isInteger(
                        value
                    ) ||
                    value < 0
                ) {
                    throw new Error(
                        'Stock must be a whole number of 0 or more.'
                    );
                }

                const productDoc =
                    await findProductByReference(
                        reference
                    );

                await updateDoc(
                    productDoc.ref,
                    {
                        stock:
                            value
                    }
                );

                setProductStocks(
                    (previous) => ({
                        ...previous,
                        [reference]:
                            value
                    })
                );

                alert(
                    `Stock updated to ${value}.`
                );

            } catch (err) {
                console.error(
                    'Failed to set stock:',
                    err
                );

                const message =
                    err instanceof Error
                        ? err.message
                        : 'Could not update stock.';

                setError(
                    message
                );

                alert(
                    message
                );

            } finally {
                setUpdatingStock('');
            }
        };

    /*
      ==================================================
      FIND ORDER PRODUCT TARGETS
      ==================================================
    */
    const findProductStockTargets =
        async (
            order: AdminOrder
        ): Promise<
            ProductStockTarget[]
        > => {

            const quantities =
                new Map<
                    string,
                    number
                >();

            order.items.forEach(
                (item) => {

                    const reference =
                        item.reference?.trim();

                    if (!reference) {
                        return;
                    }

                    quantities.set(
                        reference,
                        (
                            quantities.get(
                                reference
                            ) ?? 0
                        ) +
                        item.quantity
                    );
                }
            );

            const targets:
                ProductStockTarget[] =
                [];

            for (
                const [
                    reference,
                    quantity
                ] of quantities
            ) {

                const productDoc =
                    await findProductByReference(
                        reference
                    );

                targets.push({
                    ref:
                        productDoc.ref,

                    reference,

                    quantity
                });
            }

            return targets;
        };

    /*
      ==================================================
      APPLY ORDER STOCK REDUCTION
      ==================================================
    */
    const applyStockReduction =
        async (
            order: AdminOrder
        ) => {

            if (
                order.inventoryAdjusted
            ) {
                return;
            }

            const targets =
                await findProductStockTargets(
                    order
                );

            const orderRef =
                doc(
                    db,
                    'users',
                    order.userId,
                    'orders',
                    order.id
                );

            await runTransaction(
                db,
                async (
                    transaction
                ) => {

                    const orderSnapshot =
                        await transaction.get(
                            orderRef
                        );

                    if (
                        !orderSnapshot.exists()
                    ) {
                        throw new Error(
                            'Order no longer exists.'
                        );
                    }

                    const currentOrder =
                        orderSnapshot.data();

                    /*
                      Prevent double stock deduction.
                    */
                    if (
                        currentOrder
                            .inventoryAdjusted ===
                        true
                    ) {
                        return;
                    }

                    const productSnapshots: {
                        target: ProductStockTarget;
                        snapshot: any;
                    }[] = [];

                    /*
                      Read all products first.
                    */
                    for (
                        const target
                        of targets
                    ) {

                        const snapshot =
                            await transaction.get(
                                target.ref
                            );

                        if (
                            !snapshot.exists()
                        ) {
                            throw new Error(
                                `Product ${target.reference} no longer exists.`
                            );
                        }

                        productSnapshots.push({
                            target,
                            snapshot
                        });
                    }

                    /*
                      Validate all stock.
                    */
                    for (
                        const {
                            target,
                            snapshot
                        }
                        of productSnapshots
                    ) {

                        const data =
                            snapshot.data();

                        const currentStock =
                            typeof data.stock ===
                                'number'
                                ? data.stock
                                : 0;

                        if (
                            currentStock <
                            target.quantity
                        ) {
                            throw new Error(
                                `${target.reference} only has ${currentStock} in stock.`
                            );
                        }
                    }

                    /*
                      Deduct stock.
                    */
                    for (
                        const {
                            target,
                            snapshot
                        }
                        of productSnapshots
                    ) {

                        const data =
                            snapshot.data();

                        const currentStock =
                            typeof data.stock ===
                                'number'
                                ? data.stock
                                : 0;

                        transaction.update(
                            target.ref,
                            {
                                stock:
                                    currentStock -
                                    target.quantity
                            }
                        );
                    }

                    /*
                      Mark order as already deducted.
                    */
                    transaction.update(
                        orderRef,
                        {
                            inventoryAdjusted:
                                true,

                            inventoryAdjustedAt:
                                serverTimestamp()
                        }
                    );
                }
            );

            setOrders(
                (previous) =>
                    previous.map(
                        (existing) =>
                            existing.id ===
                                order.id &&
                                existing.userId ===
                                order.userId
                                ? {
                                    ...existing,
                                    inventoryAdjusted:
                                        true
                                }
                                : existing
                    )
            );

            /*
              Refresh live stock numbers.
            */
            await loadProductStocks(
                orders
            );
        };

    /*
      ==================================================
      UPDATE ORDER
      ==================================================
    */
    const updateOrder = async (
        order: AdminOrder,
        changes: {
            status?: string;
            paymentStatus?: string;
        }
    ) => {

        try {
            setUpdatingId(
                order.id
            );

            setError('');

            const orderRef =
                doc(
                    db,
                    'users',
                    order.userId,
                    'orders',
                    order.id
                );

            await updateDoc(
                orderRef,
                changes
            );

            /*
              Confirming automatically
              applies stock.
            */
            if (
                changes.status ===
                'confirmed' &&
                !order.inventoryAdjusted
            ) {

                await applyStockReduction(
                    {
                        ...order,
                        ...changes
                    }
                );
            }

            setOrders(
                (previous) =>
                    previous.map(
                        (existing) =>
                            existing.id ===
                                order.id &&
                                existing.userId ===
                                order.userId
                                ? {
                                    ...existing,
                                    ...changes,

                                    inventoryAdjusted:
                                        changes.status ===
                                            'confirmed'
                                            ? true
                                            : existing.inventoryAdjusted
                                }
                                : existing
                    )
            );

        } catch (err) {
            console.error(
                'Failed to update order:',
                err
            );

            const message =
                err instanceof Error
                    ? err.message
                    : 'Could not update this order.';

            setError(
                message
            );

            alert(
                message
            );

            await loadOrders();

        } finally {
            setUpdatingId('');
        }
    };

    /*
      ==================================================
      LEGACY APPLY STOCK BUTTON
      ==================================================
    */
    const handleApplyStock =
        async (
            order: AdminOrder
        ) => {

            try {
                setUpdatingId(
                    order.id
                );

                setError('');

                await applyStockReduction(
                    order
                );

                alert(
                    'Stock updated successfully.'
                );

                await loadOrders();

            } catch (err) {
                console.error(
                    'Failed to update stock:',
                    err
                );

                const message =
                    err instanceof Error
                        ? err.message
                        : 'Could not update stock.';

                setError(
                    message
                );

                alert(
                    message
                );

            } finally {
                setUpdatingId('');
            }
        };

    const formatDate = (
        timestamp?: Timestamp
    ) => {

        if (!timestamp) {
            return 'Processing';
        }

        return timestamp
            .toDate()
            .toLocaleString(
                'en-GB'
            );
    };

    if (!user) {
        return (
            <div className="min-h-screen bg-[#080808] text-white pt-40 text-center">
                Please sign in.
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#080808] text-[#F5F5F5] pt-36 pb-24 px-6">

            <div className="max-w-7xl mx-auto">

                <p className="eyebrow">
                    VELARO ADMIN
                </p>

                <div className="flex items-end justify-between gap-5 mt-2">

                    <div>

                        <h1 className="font-serif text-5xl">
                            Customer Orders
                        </h1>

                        <p className="text-sm text-[#A5A5A5] mt-3">
                            Review orders and manage inventory.
                        </p>

                    </div>

                    <button
                        onClick={
                            loadOrders
                        }
                        className="border border-[#C6A15B] text-[#C6A15B] px-5 py-3 text-[10px] uppercase tracking-widest hover:bg-[#C6A15B] hover:text-black transition-colors"
                    >
                        REFRESH
                    </button>

                </div>

                {error && (
                    <div className="mt-8 border border-red-500/30 bg-red-500/10 text-red-300 p-4">
                        {error}
                    </div>
                )}

                {loading ? (

                    <p className="mt-10 text-[#A5A5A5]">
                        Loading orders...
                    </p>

                ) : orders.length === 0 ? (

                    <div className="mt-10 border border-white/10 bg-[#111] p-8">
                        No orders found.
                    </div>

                ) : (

                    <div className="mt-10 space-y-6">

                        {orders.map(
                            (order) => (

                                <div
                                    key={`${order.userId}-${order.id}`}
                                    className="border border-white/10 bg-[#111] p-6"
                                >

                                    {/* ORDER DETAILS */}

                                    <div className="grid lg:grid-cols-4 gap-6 border-b border-white/10 pb-5">

                                        <div>

                                            <p className="text-[9px] uppercase tracking-[0.2em] text-[#A5A5A5]">
                                                Order
                                            </p>

                                            <p className="text-xs text-[#C6A15B] mt-2 break-all">
                                                {order.id}
                                            </p>

                                        </div>

                                        <div>

                                            <p className="text-[9px] uppercase tracking-[0.2em] text-[#A5A5A5]">
                                                Customer
                                            </p>

                                            <p className="text-sm mt-2">
                                                {order.customer?.firstName}{' '}
                                                {order.customer?.lastName}
                                            </p>

                                            <p className="text-xs text-[#A5A5A5] mt-1">
                                                {order.email}
                                            </p>

                                        </div>

                                        <div>

                                            <p className="text-[9px] uppercase tracking-[0.2em] text-[#A5A5A5]">
                                                Date
                                            </p>

                                            <p className="text-sm mt-2">
                                                {formatDate(
                                                    order.createdAt
                                                )}
                                            </p>

                                        </div>

                                        <div>

                                            <p className="text-[9px] uppercase tracking-[0.2em] text-[#A5A5A5]">
                                                Total
                                            </p>

                                            <p className="text-xl mt-2 text-[#C6A15B]">
                                                EGP{' '}
                                                {Math.round(
                                                    order.totalUsd *
                                                    49
                                                ).toLocaleString()}
                                            </p>

                                        </div>

                                    </div>

                                    {/* PRODUCTS */}

                                    <div className="mt-6">

                                        <p className="text-[9px] uppercase tracking-[0.2em] text-[#A5A5A5]">
                                            Products
                                        </p>

                                        <div className="mt-4 space-y-4">

                                            {order.items.map(
                                                (
                                                    item,
                                                    index
                                                ) => {

                                                    const reference =
                                                        item.reference?.trim() ??
                                                        '';

                                                    const stock =
                                                        productStocks[
                                                        reference
                                                        ] ?? 0;

                                                    const stockBusy =
                                                        updatingStock ===
                                                        reference;

                                                    return (
                                                        <div
                                                            key={`${item.productId}-${index}`}
                                                            className="border border-white/10 bg-[#080808] p-4"
                                                        >

                                                            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">

                                                                <div>

                                                                    <p className="text-sm">
                                                                        <span className="text-[#C6A15B]">
                                                                            {item.brand}
                                                                        </span>{' '}
                                                                        {item.name}
                                                                        {' × '}
                                                                        {item.quantity}
                                                                    </p>

                                                                    <p className="text-xs text-[#A5A5A5] mt-1">
                                                                        Ref. {reference}
                                                                    </p>

                                                                </div>

                                                                {/* STOCK MANAGEMENT */}

                                                                <div className="flex flex-wrap items-end gap-3">

                                                                    <div>

                                                                        <p className="text-[8px] uppercase tracking-[0.2em] text-[#A5A5A5] mb-2">
                                                                            Current Stock
                                                                        </p>

                                                                        <div
                                                                            className={`text-lg font-semibold ${stock > 0
                                                                                    ? 'text-green-400'
                                                                                    : 'text-red-400'
                                                                                }`}
                                                                        >
                                                                            {stock}
                                                                        </div>

                                                                    </div>

                                                                    <button
                                                                        disabled={
                                                                            stockBusy ||
                                                                            stock <= 0
                                                                        }
                                                                        onClick={() =>
                                                                            changeProductStock(
                                                                                reference,
                                                                                -1
                                                                            )
                                                                        }
                                                                        className="h-10 w-10 border border-white/20 text-lg hover:border-[#C6A15B] hover:text-[#C6A15B] disabled:opacity-30"
                                                                    >
                                                                        −
                                                                    </button>

                                                                    <button
                                                                        disabled={
                                                                            stockBusy
                                                                        }
                                                                        onClick={() =>
                                                                            changeProductStock(
                                                                                reference,
                                                                                1
                                                                            )
                                                                        }
                                                                        className="h-10 w-10 border border-[#C6A15B] text-[#C6A15B] text-lg hover:bg-[#C6A15B] hover:text-black disabled:opacity-30"
                                                                    >
                                                                        +
                                                                    </button>

                                                                    <div>

                                                                        <p className="text-[8px] uppercase tracking-[0.2em] text-[#A5A5A5] mb-2">
                                                                            Set Stock
                                                                        </p>

                                                                        <input
                                                                            type="number"
                                                                            min="0"
                                                                            step="1"
                                                                            value={
                                                                                stockInputs[
                                                                                reference
                                                                                ] ?? ''
                                                                            }
                                                                            onChange={(e) =>
                                                                                setStockInputs(
                                                                                    (
                                                                                        previous
                                                                                    ) => ({
                                                                                        ...previous,

                                                                                        [reference]:
                                                                                            e.target
                                                                                                .value
                                                                                    })
                                                                                )
                                                                            }
                                                                            className="w-24 h-10 bg-[#111] border border-white/10 px-3 text-sm outline-none focus:border-[#C6A15B]"
                                                                        />

                                                                    </div>

                                                                    <button
                                                                        disabled={
                                                                            stockBusy
                                                                        }
                                                                        onClick={() =>
                                                                            setExactProductStock(
                                                                                reference
                                                                            )
                                                                        }
                                                                        className="h-10 px-4 border border-[#C6A15B] text-[#C6A15B] text-[9px] uppercase tracking-widest hover:bg-[#C6A15B] hover:text-black disabled:opacity-50"
                                                                    >
                                                                        {stockBusy
                                                                            ? 'SAVING...'
                                                                            : 'SET STOCK'}
                                                                    </button>

                                                                </div>

                                                            </div>

                                                        </div>
                                                    );
                                                }
                                            )}

                                        </div>

                                    </div>

                                    {/* INVENTORY STATUS */}

                                    <div className="mt-6 border border-white/10 bg-[#080808] p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

                                        <div>

                                            <p className="text-[9px] uppercase tracking-[0.2em] text-[#A5A5A5]">
                                                Order Inventory
                                            </p>

                                            <p
                                                className={`text-sm mt-1 ${order.inventoryAdjusted
                                                        ? 'text-green-400'
                                                        : 'text-[#C6A15B]'
                                                    }`}
                                            >
                                                {order.inventoryAdjusted
                                                    ? 'STOCK APPLIED'
                                                    : 'STOCK NOT YET APPLIED'}
                                            </p>

                                        </div>

                                        {order.status ===
                                            'confirmed' &&
                                            !order.inventoryAdjusted && (

                                                <button
                                                    disabled={
                                                        updatingId ===
                                                        order.id
                                                    }
                                                    onClick={() =>
                                                        handleApplyStock(
                                                            order
                                                        )
                                                    }
                                                    className="border border-[#C6A15B] text-[#C6A15B] px-5 py-3 text-[10px] uppercase tracking-[0.2em] hover:bg-[#C6A15B] hover:text-black disabled:opacity-50"
                                                >
                                                    {updatingId ===
                                                        order.id
                                                        ? 'UPDATING...'
                                                        : 'APPLY STOCK'}
                                                </button>

                                            )}

                                    </div>

                                    {/* STATUS CONTROLS */}

                                    <div className="grid md:grid-cols-2 gap-5 mt-7">

                                        <div>

                                            <label className="text-[9px] uppercase tracking-[0.2em] text-[#A5A5A5]">
                                                Order Status
                                            </label>

                                            <select
                                                value={
                                                    order.status
                                                }
                                                disabled={
                                                    updatingId ===
                                                    order.id
                                                }
                                                onChange={(e) =>
                                                    updateOrder(
                                                        order,
                                                        {
                                                            status:
                                                                e.target
                                                                    .value
                                                        }
                                                    )
                                                }
                                                className="w-full mt-2 bg-[#080808] border border-white/10 px-4 py-3"
                                            >

                                                <option value="pending">
                                                    Pending
                                                </option>

                                                <option value="confirmed">
                                                    Confirmed
                                                </option>

                                                <option value="processing">
                                                    Processing
                                                </option>

                                                <option value="shipped">
                                                    Shipped
                                                </option>

                                                <option value="delivered">
                                                    Delivered
                                                </option>

                                                <option value="cancelled">
                                                    Cancelled
                                                </option>

                                            </select>

                                        </div>

                                        <div>

                                            <label className="text-[9px] uppercase tracking-[0.2em] text-[#A5A5A5]">
                                                Payment Status
                                            </label>

                                            <select
                                                value={
                                                    order.paymentStatus
                                                }
                                                disabled={
                                                    updatingId ===
                                                    order.id
                                                }
                                                onChange={(e) =>
                                                    updateOrder(
                                                        order,
                                                        {
                                                            paymentStatus:
                                                                e.target
                                                                    .value
                                                        }
                                                    )
                                                }
                                                className="w-full mt-2 bg-[#080808] border border-white/10 px-4 py-3"
                                            >

                                                <option value="not_paid">
                                                    Not Paid
                                                </option>

                                                <option value="paid">
                                                    Paid
                                                </option>

                                                <option value="refunded">
                                                    Refunded
                                                </option>

                                            </select>

                                        </div>

                                    </div>

                                    {/* DELIVERY */}

                                    <div className="mt-6 border-t border-white/10 pt-5">

                                        <p className="text-[9px] uppercase tracking-[0.2em] text-[#A5A5A5]">
                                            Delivery Address
                                        </p>

                                        <p className="text-sm text-[#A5A5A5] mt-2">

                                            {
                                                order
                                                    .deliveryAddress
                                                    ?.street
                                            }

                                            {order.deliveryAddress
                                                ?.city
                                                ? `, ${order.deliveryAddress.city}`
                                                : ''}

                                            {order.deliveryAddress
                                                ?.governorate
                                                ? `, ${order.deliveryAddress.governorate}`
                                                : ''}

                                            {order.deliveryAddress
                                                ?.postalCode
                                                ? `, ${order.deliveryAddress.postalCode}`
                                                : ''}

                                        </p>

                                    </div>

                                </div>

                            )
                        )}

                    </div>
                )}

            </div>

        </div>
    );
};