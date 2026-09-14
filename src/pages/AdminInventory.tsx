import React, {
    useEffect,
    useMemo,
    useState
} from 'react';

import {
    collection,
    doc,
    getDoc,
    getDocs,
    setDoc,
    updateDoc
} from 'firebase/firestore';

import { db } from '../firebase/firebase';
import { useAuth } from '../context/AuthContext';

import {
    SHOP_PRODUCTS,
    DEMO_EGP_RATE
} from '../data/catalog';

interface InventoryProduct {
    id: string;
    brand: string;
    name: string;
    reference: string;

    stock: number;

    price?: number;
    priceUsd?: number;
    currency?: string;

    year?: number;
    condition?: string;
    movement?: string;
    category?: string;

    image?: string;

    images?: {
        front?: string;
        side?: string;
    };
}

interface ProductEditForm {
    brand: string;
    name: string;
    price: string;
    year: string;
    condition: string;
    movement: string;
    stock: string;
}

export const AdminInventory: React.FC = () => {
    const { user } = useAuth();

    const [products, setProducts] =
        useState<InventoryProduct[]>([]);

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState('');

    const [success, setSuccess] =
        useState('');

    const [search, setSearch] =
        useState('');

    const [stockInputs, setStockInputs] =
        useState<Record<string, string>>({});

    const [updatingId, setUpdatingId] =
        useState('');

    const [isAdmin, setIsAdmin] =
        useState(false);

    const [syncing, setSyncing] =
        useState(false);

    const [editingId, setEditingId] =
        useState<string | null>(null);

    const [editForm, setEditForm] =
        useState<ProductEditForm>({
            brand: '',
            name: '',
            price: '',
            year: '',
            condition: '',
            movement: '',
            stock: ''
        });

    const [savingProduct, setSavingProduct] =
        useState(false);

    const normaliseReference = (
        value: unknown
    ) =>
        String(value ?? '')
            .trim()
            .toLowerCase();

    const checkAdmin = async () => {
        if (!user) {
            setIsAdmin(false);
            return false;
        }

        const adminRef =
            doc(
                db,
                'admins',
                user.uid
            );

        const snapshot =
            await getDoc(adminRef);

        const allowed =
            snapshot.exists();

        setIsAdmin(allowed);

        return allowed;
    };

    const loadProducts = async (
        clearMessages = true
    ) => {
        try {
            setLoading(true);

            if (clearMessages) {
                setError('');
                setSuccess('');
            }

            const allowed =
                await checkAdmin();

            if (!allowed) {
                setError(
                    'You do not have permission to manage inventory.'
                );

                setProducts([]);
                return;
            }

            const snapshot =
                await getDocs(
                    collection(
                        db,
                        'products'
                    )
                );

            const loaded =
                snapshot.docs.map(
                    (productDoc) => {
                        const data =
                            productDoc.data();

                        const localProduct =
                            SHOP_PRODUCTS.find(
                                (product) =>
                                    normaliseReference(
                                        product.reference
                                    ) ===
                                    normaliseReference(
                                        data.reference
                                    )
                            );

                        const local =
                            localProduct as any;

                        return {
                            id:
                                productDoc.id,

                            brand:
                                data.brand ??
                                local?.brand ??
                                '',

                            name:
                                data.name ??
                                data.model ??
                                local?.name ??
                                '',

                            reference:
                                data.reference ??
                                local?.reference ??
                                '',

                            stock:
                                typeof data.stock === 'number'
                                    ? data.stock
                                    : 0,

                            price:
                                typeof data.price === 'number'
                                    ? data.price
                                    : undefined,

                            priceUsd:
                                typeof data.priceUsd === 'number'
                                    ? data.priceUsd
                                    : local?.priceUsd,

                            currency:
                                data.currency,

                            year:
                                typeof data.year === 'number'
                                    ? data.year
                                    : (
                                        typeof local?.year === 'number'
                                            ? local.year
                                            : undefined
                                    ),

                            condition:
                                data.condition ??
                                local?.condition ??
                                '',

                            movement:
                                data.movement ??
                                local?.movement ??
                                '',

                            category:
                                data.category ??
                                local?.category ??
                                '',

                            image:
                                data.image ??
                                local?.images?.front,

                            images:
                                data.images ??
                                local?.images

                        } as InventoryProduct;
                    }
                );

            loaded.sort(
                (a, b) => {
                    const brandCompare =
                        a.brand.localeCompare(
                            b.brand
                        );

                    if (brandCompare !== 0) {
                        return brandCompare;
                    }

                    return a.name.localeCompare(
                        b.name
                    );
                }
            );

            setProducts(loaded);

            const inputs:
                Record<string, string> = {};

            loaded.forEach(
                (product) => {
                    inputs[
                        product.id
                    ] =
                        String(
                            product.stock
                        );
                }
            );

            setStockInputs(inputs);

        } catch (err) {
            console.error(
                'Failed to load inventory:',
                err
            );

            setError(
                'Could not load inventory.'
            );

        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadProducts();
    }, [user]);

    const syncCatalogueToFirebase =
        async () => {
            try {
                setSyncing(true);
                setError('');
                setSuccess('');

                const allowed =
                    await checkAdmin();

                if (!allowed) {
                    throw new Error(
                        'You do not have permission to sync products.'
                    );
                }

                const existingSnapshot =
                    await getDocs(
                        collection(
                            db,
                            'products'
                        )
                    );

                const existingByReference =
                    new Map<
                        string,
                        {
                            id: string;
                            data: any;
                        }
                    >();

                existingSnapshot.docs.forEach(
                    (firebaseDoc) => {
                        const data =
                            firebaseDoc.data();

                        const reference =
                            normaliseReference(
                                data.reference
                            );

                        if (reference) {
                            existingByReference.set(
                                reference,
                                {
                                    id:
                                        firebaseDoc.id,
                                    data
                                }
                            );
                        }
                    }
                );

                let createdCount = 0;
                let updatedCount = 0;

                for (
                    const product of SHOP_PRODUCTS
                ) {
                    const local =
                        product as any;

                    const reference =
                        normaliseReference(
                            local.reference
                        );

                    if (!reference) {
                        console.warn(
                            'Skipping product without reference:',
                            local
                        );

                        continue;
                    }

                    const existing =
                        existingByReference.get(
                            reference
                        );

                    const localPriceUsd =
                        typeof local.priceUsd ===
                            'number'
                            ? local.priceUsd
                            : 0;

                    const localPriceEgp =
                        Math.round(
                            localPriceUsd *
                            DEMO_EGP_RATE
                        );

                    if (existing) {
                        const old =
                            existing.data;

                        const updateData: any = {
                            brand:
                                old.brand ??
                                local.brand ??
                                '',

                            model:
                                old.model ??
                                old.name ??
                                local.name ??
                                '',

                            reference:
                                old.reference ??
                                local.reference ??
                                '',

                            year:
                                old.year ??
                                local.year ??
                                null,

                            condition:
                                old.condition ??
                                local.condition ??
                                '',

                            movement:
                                old.movement ??
                                local.movement ??
                                '',

                            category:
                                old.category ??
                                local.category ??
                                '',

                            images:
                                old.images ??
                                local.images ??
                                {},

                            image:
                                old.image ??
                                local.images?.front ??
                                '',

                            stock:
                                typeof old.stock ===
                                    'number'
                                    ? old.stock
                                    : (
                                        typeof local.stock ===
                                            'number'
                                            ? local.stock
                                            : 1
                                    ),

                            price:
                                typeof old.price ===
                                    'number'
                                    ? old.price
                                    : localPriceEgp,

                            priceUsd:
                                typeof old.priceUsd ===
                                    'number'
                                    ? old.priceUsd
                                    : localPriceUsd,

                            currency:
                                old.currency ??
                                'EGP',

                            syncedFromCatalogue:
                                true,

                            updatedAt:
                                new Date()
                        };

                        if (
                            local.set !== undefined
                        ) {
                            updateData.set =
                                old.set ??
                                local.set;
                        }

                        if (
                            local.badges !== undefined
                        ) {
                            updateData.badges =
                                old.badges ??
                                local.badges;
                        }

                        await setDoc(
                            doc(
                                db,
                                'products',
                                existing.id
                            ),
                            updateData,
                            {
                                merge: true
                            }
                        );

                        updatedCount += 1;

                    } else {
                        const newProductRef =
                            doc(
                                db,
                                'products',
                                String(
                                    local.id
                                )
                            );

                        const newData: any = {
                            brand:
                                local.brand ??
                                '',

                            model:
                                local.name ??
                                '',

                            reference:
                                local.reference ??
                                '',

                            price:
                                localPriceEgp,

                            priceUsd:
                                localPriceUsd,

                            currency:
                                'EGP',

                            stock:
                                typeof local.stock ===
                                    'number'
                                    ? local.stock
                                    : 1,

                            year:
                                local.year ??
                                null,

                            condition:
                                local.condition ??
                                '',

                            movement:
                                local.movement ??
                                '',

                            category:
                                local.category ??
                                '',

                            images:
                                local.images ??
                                {},

                            image:
                                local.images?.front ??
                                '',

                            syncedFromCatalogue:
                                true,

                            createdAt:
                                new Date(),

                            updatedAt:
                                new Date()
                        };

                        if (
                            local.set !== undefined
                        ) {
                            newData.set =
                                local.set;
                        }

                        if (
                            local.badges !== undefined
                        ) {
                            newData.badges =
                                local.badges;
                        }

                        await setDoc(
                            newProductRef,
                            newData,
                            {
                                merge: true
                            }
                        );

                        createdCount += 1;
                    }
                }

                await loadProducts(false);

                setSuccess(
                    `Catalogue sync complete. ${createdCount} products added and ${updatedCount} existing products updated.`
                );

            } catch (err) {
                console.error(
                    'Catalogue sync failed:',
                    err
                );

                const message =
                    err instanceof Error
                        ? err.message
                        : 'Could not sync catalogue.';

                setError(message);

            } finally {
                setSyncing(false);
            }
        };

    const startEditing = (
        product: InventoryProduct
    ) => {
        setEditingId(
            product.id
        );

        setEditForm({
            brand:
                product.brand ?? '',

            name:
                product.name ?? '',

            price:
                typeof product.price === 'number'
                    ? String(product.price)
                    : '',

            year:
                typeof product.year === 'number'
                    ? String(product.year)
                    : '',

            condition:
                product.condition ?? '',

            movement:
                product.movement ?? '',

            stock:
                String(product.stock)
        });

        setError('');
        setSuccess('');
    };

    const cancelEditing = () => {
        setEditingId(null);

        setEditForm({
            brand: '',
            name: '',
            price: '',
            year: '',
            condition: '',
            movement: '',
            stock: ''
        });
    };

    const saveProduct = async (
        product: InventoryProduct
    ) => {
        try {
            setSavingProduct(true);
            setError('');
            setSuccess('');

            const brand =
                editForm.brand.trim();

            const name =
                editForm.name.trim();

            const condition =
                editForm.condition.trim();

            const movement =
                editForm.movement.trim();

            const price =
                Number(
                    editForm.price
                );

            const year =
                Number(
                    editForm.year
                );

            const stock =
                Number(
                    editForm.stock
                );

            if (!brand) {
                throw new Error(
                    'Brand is required.'
                );
            }

            if (!name) {
                throw new Error(
                    'Model name is required.'
                );
            }

            if (
                !Number.isFinite(price) ||
                price < 0
            ) {
                throw new Error(
                    'Price must be 0 or more.'
                );
            }

            if (
                !Number.isInteger(year) ||
                year < 1800 ||
                year > 2200
            ) {
                throw new Error(
                    'Enter a valid year.'
                );
            }

            if (
                !Number.isInteger(stock) ||
                stock < 0
            ) {
                throw new Error(
                    'Stock must be a whole number of 0 or more.'
                );
            }

            const productRef =
                doc(
                    db,
                    'products',
                    product.id
                );

            await updateDoc(
                productRef,
                {
                    brand,
                    model: name,
                    price,
                    currency: 'EGP',
                    year,
                    condition,
                    movement,
                    stock,
                    updatedAt:
                        new Date()
                }
            );

            setProducts(
                (previous) =>
                    previous.map(
                        (item) =>
                            item.id ===
                                product.id
                                ? {
                                    ...item,
                                    brand,
                                    name,
                                    price,
                                    currency:
                                        'EGP',
                                    year,
                                    condition,
                                    movement,
                                    stock
                                }
                                : item
                    )
            );

            setStockInputs(
                (previous) => ({
                    ...previous,
                    [product.id]:
                        String(stock)
                })
            );

            setEditingId(null);

            setSuccess(
                `${brand} ${name} updated successfully.`
            );

        } catch (err) {
            console.error(
                'Failed to save product:',
                err
            );

            const message =
                err instanceof Error
                    ? err.message
                    : 'Could not update product.';

            setError(message);

        } finally {
            setSavingProduct(false);
        }
    };

    const setExactStock =
        async (
            product: InventoryProduct
        ) => {
            try {
                setUpdatingId(
                    product.id
                );

                setError('');
                setSuccess('');

                const raw =
                    stockInputs[
                    product.id
                    ];

                const newStock =
                    Number(raw);

                if (
                    !Number.isInteger(
                        newStock
                    ) ||
                    newStock < 0
                ) {
                    throw new Error(
                        'Stock must be a whole number of 0 or more.'
                    );
                }

                const productRef =
                    doc(
                        db,
                        'products',
                        product.id
                    );

                await updateDoc(
                    productRef,
                    {
                        stock:
                            newStock,
                        updatedAt:
                            new Date()
                    }
                );

                setProducts(
                    (previous) =>
                        previous.map(
                            (item) =>
                                item.id ===
                                    product.id
                                    ? {
                                        ...item,
                                        stock:
                                            newStock
                                    }
                                    : item
                        )
                );

                setSuccess(
                    `${product.brand} ${product.name} stock updated to ${newStock}.`
                );

            } catch (err) {
                console.error(
                    'Failed to update stock:',
                    err
                );

                const message =
                    err instanceof Error
                        ? err.message
                        : 'Could not update stock.';

                setError(message);

            } finally {
                setUpdatingId('');
            }
        };

    const adjustStock =
        async (
            product: InventoryProduct,
            amount: number
        ) => {
            const newStock =
                product.stock +
                amount;

            if (newStock < 0) {
                return;
            }

            try {
                setUpdatingId(
                    product.id
                );

                setError('');
                setSuccess('');

                const productRef =
                    doc(
                        db,
                        'products',
                        product.id
                    );

                await updateDoc(
                    productRef,
                    {
                        stock:
                            newStock,
                        updatedAt:
                            new Date()
                    }
                );

                setProducts(
                    (previous) =>
                        previous.map(
                            (item) =>
                                item.id ===
                                    product.id
                                    ? {
                                        ...item,
                                        stock:
                                            newStock
                                    }
                                    : item
                        )
                );

                setStockInputs(
                    (previous) => ({
                        ...previous,

                        [product.id]:
                            String(newStock)
                    })
                );

            } catch (err) {
                console.error(
                    'Failed to adjust stock:',
                    err
                );

                setError(
                    'Could not update stock.'
                );

            } finally {
                setUpdatingId('');
            }
        };

    const filteredProducts =
        useMemo(
            () => {
                const term =
                    search
                        .trim()
                        .toLowerCase();

                if (!term) {
                    return products;
                }

                return products.filter(
                    (product) =>
                        product.brand
                            .toLowerCase()
                            .includes(term) ||

                        product.name
                            .toLowerCase()
                            .includes(term) ||

                        product.reference
                            .toLowerCase()
                            .includes(term)
                );
            },
            [
                products,
                search
            ]
        );

    const totalUnits =
        products.reduce(
            (sum, product) =>
                sum +
                product.stock,
            0
        );

    const outOfStockCount =
        products.filter(
            (product) =>
                product.stock <= 0
        ).length;

    const lowStockCount =
        products.filter(
            (product) =>
                product.stock > 0 &&
                product.stock <= 2
        ).length;

    const getPrice = (
        product: InventoryProduct
    ) => {
        if (
            typeof product.price ===
            'number' &&
            product.currency ===
            'EGP'
        ) {
            return `EGP ${product.price.toLocaleString()}`;
        }

        if (
            typeof product.priceUsd ===
            'number'
        ) {
            return `EGP ${Math.round(
                product.priceUsd *
                DEMO_EGP_RATE
            ).toLocaleString()}`;
        }

        if (
            typeof product.price ===
            'number'
        ) {
            return `EGP ${product.price.toLocaleString()}`;
        }

        return '—';
    };

    const getImage = (
        product: InventoryProduct
    ) =>
        product.images?.front ??
        product.image ??
        '';

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

                <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">

                    <div>
                        <p className="eyebrow">
                            VELARO ADMIN
                        </p>

                        <h1 className="font-serif text-5xl mt-2">
                            Inventory
                        </h1>

                        <p className="text-sm text-[#A5A5A5] mt-3">
                            Manage products, pricing and availability across the VELARO collection.
                        </p>
                    </div>

                    <div className="flex flex-wrap gap-3">

                        <button
                            disabled={
                                syncing ||
                                loading
                            }
                            onClick={
                                syncCatalogueToFirebase
                            }
                            className="bg-[#C6A15B] text-[#080808] px-5 py-3 text-[10px] font-semibold uppercase tracking-[0.2em] hover:bg-[#F5F5F5] transition-colors disabled:opacity-40"
                        >
                            {syncing
                                ? 'SYNCING...'
                                : 'SYNC CATALOGUE TO FIREBASE'}
                        </button>

                        <button
                            disabled={syncing}
                            onClick={() =>
                                loadProducts()
                            }
                            className="border border-[#C6A15B] text-[#C6A15B] px-5 py-3 text-[10px] uppercase tracking-[0.2em] hover:bg-[#C6A15B] hover:text-black transition-colors disabled:opacity-40"
                        >
                            REFRESH INVENTORY
                        </button>

                    </div>
                </div>

                {error && (
                    <div className="mt-8 border border-red-500/30 bg-red-500/10 p-4 text-red-300">
                        {error}
                    </div>
                )}

                {success && (
                    <div className="mt-8 border border-green-500/30 bg-green-500/10 p-4 text-green-300">
                        {success}
                    </div>
                )}

                {isAdmin && (
                    <>
                        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-10">

                            <div className="border border-white/10 bg-[#111] p-5">
                                <p className="text-[9px] uppercase tracking-[0.2em] text-[#A5A5A5]">
                                    Products
                                </p>
                                <p className="font-serif text-3xl mt-2">
                                    {products.length}
                                </p>
                            </div>

                            <div className="border border-white/10 bg-[#111] p-5">
                                <p className="text-[9px] uppercase tracking-[0.2em] text-[#A5A5A5]">
                                    Total Units
                                </p>
                                <p className="font-serif text-3xl mt-2 text-[#C6A15B]">
                                    {totalUnits}
                                </p>
                            </div>

                            <div className="border border-white/10 bg-[#111] p-5">
                                <p className="text-[9px] uppercase tracking-[0.2em] text-[#A5A5A5]">
                                    Low Stock
                                </p>
                                <p className="font-serif text-3xl mt-2 text-yellow-400">
                                    {lowStockCount}
                                </p>
                            </div>

                            <div className="border border-white/10 bg-[#111] p-5">
                                <p className="text-[9px] uppercase tracking-[0.2em] text-[#A5A5A5]">
                                    Out of Stock
                                </p>
                                <p className="font-serif text-3xl mt-2 text-red-400">
                                    {outOfStockCount}
                                </p>
                            </div>

                        </div>

                        <div className="mt-8">
                            <input
                                value={search}
                                onChange={(e) =>
                                    setSearch(
                                        e.target.value
                                    )
                                }
                                placeholder="Search brand, watch or reference..."
                                className="w-full bg-[#111] border border-white/10 px-5 py-4 text-sm outline-none focus:border-[#C6A15B]"
                            />
                        </div>
                    </>
                )}

                {loading ? (

                    <p className="mt-10 text-[#A5A5A5]">
                        Loading inventory...
                    </p>

                ) : !isAdmin ? (

                    <div className="mt-10 border border-red-500/30 bg-red-500/10 p-6 text-red-300">
                        You do not have permission to manage inventory.
                    </div>

                ) : filteredProducts.length === 0 ? (

                    <div className="mt-10 border border-white/10 bg-[#111] p-8">
                        No products found.
                    </div>

                ) : (

                    <div className="mt-8 space-y-4">

                        {filteredProducts.map(
                            (product) => {
                                const busy =
                                    updatingId ===
                                    product.id;

                                const editing =
                                    editingId ===
                                    product.id;

                                return (
                                    <div
                                        key={product.id}
                                        className="border border-white/10 bg-[#111]"
                                    >

                                        <div className="p-4">

                                            <div className="grid lg:grid-cols-[90px_1fr_160px_340px] gap-5 items-center">

                                                <div className="w-[80px] h-[90px] bg-[#080808] border border-white/10 overflow-hidden">

                                                    {getImage(product) ? (

                                                        <img
                                                            src={
                                                                getImage(
                                                                    product
                                                                )
                                                            }
                                                            alt={`${product.brand} ${product.name}`}
                                                            className="w-full h-full object-cover"
                                                        />

                                                    ) : (

                                                        <div className="w-full h-full flex items-center justify-center text-[9px] text-[#666]">
                                                            NO IMAGE
                                                        </div>

                                                    )}

                                                </div>

                                                <div>

                                                    <p className="text-[9px] uppercase tracking-[0.2em] text-[#C6A15B]">
                                                        {product.brand || 'UNKNOWN BRAND'}
                                                    </p>

                                                    <h2 className="font-serif text-xl mt-1">
                                                        {product.name || 'Unnamed Watch'}
                                                    </h2>

                                                    <p className="text-xs text-[#A5A5A5] mt-2">
                                                        Ref. {product.reference}
                                                    </p>

                                                    <p className="text-sm mt-2">
                                                        {getPrice(product)}
                                                    </p>

                                                    <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-[10px] text-[#777]">

                                                        {product.year && (
                                                            <span>
                                                                {product.year}
                                                            </span>
                                                        )}

                                                        {product.condition && (
                                                            <span>
                                                                {product.condition}
                                                            </span>
                                                        )}

                                                        {product.movement && (
                                                            <span>
                                                                {product.movement}
                                                            </span>
                                                        )}

                                                    </div>

                                                    <button
                                                        onClick={() =>
                                                            editing
                                                                ? cancelEditing()
                                                                : startEditing(
                                                                    product
                                                                )
                                                        }
                                                        className="mt-4 text-[9px] uppercase tracking-[0.2em] text-[#C6A15B] border-b border-[#C6A15B]/50 pb-1"
                                                    >
                                                        {editing
                                                            ? 'CLOSE EDITOR'
                                                            : 'EDIT PRODUCT'}
                                                    </button>

                                                </div>

                                                <div>

                                                    <p className="text-[9px] uppercase tracking-[0.2em] text-[#A5A5A5]">
                                                        Current Stock
                                                    </p>

                                                    <p
                                                        className={`font-serif text-3xl mt-2 ${product.stock === 0
                                                                ? 'text-red-400'
                                                                : product.stock <= 2
                                                                    ? 'text-yellow-400'
                                                                    : 'text-green-400'
                                                            }`}
                                                    >
                                                        {product.stock}
                                                    </p>

                                                    <p className="text-[9px] uppercase tracking-widest mt-1 text-[#A5A5A5]">
                                                        {product.stock === 0
                                                            ? 'OUT OF STOCK'
                                                            : product.stock <= 2
                                                                ? 'LOW STOCK'
                                                                : 'IN STOCK'}
                                                    </p>

                                                </div>

                                                <div className="flex flex-wrap items-end gap-3 lg:justify-end">

                                                    <button
                                                        disabled={
                                                            busy ||
                                                            product.stock <= 0
                                                        }
                                                        onClick={() =>
                                                            adjustStock(
                                                                product,
                                                                -1
                                                            )
                                                        }
                                                        className="h-11 w-11 border border-white/20 hover:border-[#C6A15B] hover:text-[#C6A15B] disabled:opacity-30 text-lg"
                                                    >
                                                        −
                                                    </button>

                                                    <button
                                                        disabled={busy}
                                                        onClick={() =>
                                                            adjustStock(
                                                                product,
                                                                1
                                                            )
                                                        }
                                                        className="h-11 w-11 border border-[#C6A15B] text-[#C6A15B] hover:bg-[#C6A15B] hover:text-black disabled:opacity-40 text-lg"
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
                                                                product.id
                                                                ] ?? ''
                                                            }
                                                            onChange={(e) =>
                                                                setStockInputs(
                                                                    (
                                                                        previous
                                                                    ) => ({
                                                                        ...previous,

                                                                        [product.id]:
                                                                            e.target.value
                                                                    })
                                                                )
                                                            }
                                                            className="w-24 h-11 bg-[#080808] border border-white/10 px-3 outline-none focus:border-[#C6A15B]"
                                                        />

                                                    </div>

                                                    <button
                                                        disabled={busy}
                                                        onClick={() =>
                                                            setExactStock(
                                                                product
                                                            )
                                                        }
                                                        className="h-11 px-5 border border-[#C6A15B] text-[#C6A15B] text-[9px] uppercase tracking-[0.2em] hover:bg-[#C6A15B] hover:text-black disabled:opacity-40"
                                                    >
                                                        {busy
                                                            ? 'SAVING...'
                                                            : 'SET STOCK'}
                                                    </button>

                                                </div>

                                            </div>

                                        </div>

                                        {editing && (

                                            <div className="border-t border-[#C6A15B]/30 bg-[#090909] p-6">

                                                <div>

                                                    <p className="text-[9px] uppercase tracking-[0.2em] text-[#C6A15B]">
                                                        PRODUCT EDITOR
                                                    </p>

                                                    <h3 className="font-serif text-2xl mt-1">
                                                        Edit {product.name}
                                                    </h3>

                                                    <p className="text-xs text-[#777] mt-1">
                                                        Ref. {product.reference}
                                                    </p>

                                                </div>

                                                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mt-6">

                                                    <div>
                                                        <label className="block text-[9px] uppercase tracking-[0.2em] text-[#A5A5A5] mb-2">
                                                            Brand
                                                        </label>

                                                        <input
                                                            value={editForm.brand}
                                                            onChange={(e) =>
                                                                setEditForm(
                                                                    (
                                                                        previous
                                                                    ) => ({
                                                                        ...previous,
                                                                        brand:
                                                                            e.target.value
                                                                    })
                                                                )
                                                            }
                                                            className="w-full bg-[#111] border border-white/10 px-4 py-3 outline-none focus:border-[#C6A15B]"
                                                        />
                                                    </div>

                                                    <div>
                                                        <label className="block text-[9px] uppercase tracking-[0.2em] text-[#A5A5A5] mb-2">
                                                            Model Name
                                                        </label>

                                                        <input
                                                            value={editForm.name}
                                                            onChange={(e) =>
                                                                setEditForm(
                                                                    (
                                                                        previous
                                                                    ) => ({
                                                                        ...previous,
                                                                        name:
                                                                            e.target.value
                                                                    })
                                                                )
                                                            }
                                                            className="w-full bg-[#111] border border-white/10 px-4 py-3 outline-none focus:border-[#C6A15B]"
                                                        />
                                                    </div>

                                                    <div>
                                                        <label className="block text-[9px] uppercase tracking-[0.2em] text-[#A5A5A5] mb-2">
                                                            Reference
                                                        </label>

                                                        <input
                                                            value={
                                                                product.reference
                                                            }
                                                            disabled
                                                            className="w-full bg-[#080808] border border-white/10 px-4 py-3 text-[#777] cursor-not-allowed"
                                                        />
                                                    </div>

                                                    <div>
                                                        <label className="block text-[9px] uppercase tracking-[0.2em] text-[#A5A5A5] mb-2">
                                                            Price (EGP)
                                                        </label>

                                                        <input
                                                            type="number"
                                                            min="0"
                                                            value={
                                                                editForm.price
                                                            }
                                                            onChange={(e) =>
                                                                setEditForm(
                                                                    (
                                                                        previous
                                                                    ) => ({
                                                                        ...previous,
                                                                        price:
                                                                            e.target.value
                                                                    })
                                                                )
                                                            }
                                                            className="w-full bg-[#111] border border-white/10 px-4 py-3 outline-none focus:border-[#C6A15B]"
                                                        />
                                                    </div>

                                                    <div>
                                                        <label className="block text-[9px] uppercase tracking-[0.2em] text-[#A5A5A5] mb-2">
                                                            Year
                                                        </label>

                                                        <input
                                                            type="number"
                                                            value={
                                                                editForm.year
                                                            }
                                                            onChange={(e) =>
                                                                setEditForm(
                                                                    (
                                                                        previous
                                                                    ) => ({
                                                                        ...previous,
                                                                        year:
                                                                            e.target.value
                                                                    })
                                                                )
                                                            }
                                                            className="w-full bg-[#111] border border-white/10 px-4 py-3 outline-none focus:border-[#C6A15B]"
                                                        />
                                                    </div>

                                                    <div>
                                                        <label className="block text-[9px] uppercase tracking-[0.2em] text-[#A5A5A5] mb-2">
                                                            Condition
                                                        </label>

                                                        <select
                                                            value={
                                                                editForm.condition
                                                            }
                                                            onChange={(e) =>
                                                                setEditForm(
                                                                    (
                                                                        previous
                                                                    ) => ({
                                                                        ...previous,
                                                                        condition:
                                                                            e.target.value
                                                                    })
                                                                )
                                                            }
                                                            className="w-full bg-[#111] border border-white/10 px-4 py-3 outline-none focus:border-[#C6A15B]"
                                                        >
                                                            <option value="">
                                                                Select condition
                                                            </option>
                                                            <option value="New">
                                                                New
                                                            </option>
                                                            <option value="Unworn">
                                                                Unworn
                                                            </option>
                                                            <option value="Excellent">
                                                                Excellent
                                                            </option>
                                                            <option value="Very Good">
                                                                Very Good
                                                            </option>
                                                            <option value="Good">
                                                                Good
                                                            </option>
                                                        </select>
                                                    </div>

                                                    <div>
                                                        <label className="block text-[9px] uppercase tracking-[0.2em] text-[#A5A5A5] mb-2">
                                                            Movement
                                                        </label>

                                                        <select
                                                            value={
                                                                editForm.movement
                                                            }
                                                            onChange={(e) =>
                                                                setEditForm(
                                                                    (
                                                                        previous
                                                                    ) => ({
                                                                        ...previous,
                                                                        movement:
                                                                            e.target.value
                                                                    })
                                                                )
                                                            }
                                                            className="w-full bg-[#111] border border-white/10 px-4 py-3 outline-none focus:border-[#C6A15B]"
                                                        >
                                                            <option value="">
                                                                Select movement
                                                            </option>
                                                            <option value="Automatic">
                                                                Automatic
                                                            </option>
                                                            <option value="Mechanical">
                                                                Mechanical
                                                            </option>
                                                            <option value="Quartz">
                                                                Quartz
                                                            </option>
                                                            <option value="Solar">
                                                                Solar
                                                            </option>
                                                            <option value="Digital">
                                                                Digital
                                                            </option>
                                                            <option value="Smart">
                                                                Smart
                                                            </option>
                                                        </select>
                                                    </div>

                                                    <div>
                                                        <label className="block text-[9px] uppercase tracking-[0.2em] text-[#A5A5A5] mb-2">
                                                            Stock
                                                        </label>

                                                        <input
                                                            type="number"
                                                            min="0"
                                                            step="1"
                                                            value={
                                                                editForm.stock
                                                            }
                                                            onChange={(e) =>
                                                                setEditForm(
                                                                    (
                                                                        previous
                                                                    ) => ({
                                                                        ...previous,
                                                                        stock:
                                                                            e.target.value
                                                                    })
                                                                )
                                                            }
                                                            className="w-full bg-[#111] border border-white/10 px-4 py-3 outline-none focus:border-[#C6A15B]"
                                                        />
                                                    </div>

                                                </div>

                                                <div className="flex flex-wrap gap-3 mt-7">

                                                    <button
                                                        disabled={
                                                            savingProduct
                                                        }
                                                        onClick={() =>
                                                            saveProduct(
                                                                product
                                                            )
                                                        }
                                                        className="bg-[#C6A15B] text-[#080808] px-7 py-3 text-[10px] font-semibold uppercase tracking-[0.2em] hover:bg-[#F5F5F5] transition-colors disabled:opacity-40"
                                                    >
                                                        {savingProduct
                                                            ? 'SAVING...'
                                                            : 'SAVE PRODUCT'}
                                                    </button>

                                                    <button
                                                        disabled={
                                                            savingProduct
                                                        }
                                                        onClick={
                                                            cancelEditing
                                                        }
                                                        className="border border-white/20 px-7 py-3 text-[10px] uppercase tracking-[0.2em] text-[#A5A5A5] hover:text-white hover:border-white/40 transition-colors"
                                                    >
                                                        CANCEL
                                                    </button>

                                                </div>

                                            </div>
                                        )}

                                    </div>
                                );
                            }
                        )}

                    </div>

                )}

            </div>

        </div>
    );
};