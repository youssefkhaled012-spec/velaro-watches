import { useEffect, useState } from "react";
import { getProducts } from "../firebase/products";

export function useFirebaseProducts() {
    const [products, setProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        async function loadProducts() {
            try {
                const data = await getProducts();
                setProducts(data);
            } catch (err) {
                console.error(err);
                setError("Failed to load products");
            } finally {
                setLoading(false);
            }
        }

        loadProducts();
    }, []);

    return { products, loading, error };
}