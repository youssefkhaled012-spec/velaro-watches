import { getProducts } from "./products";

getProducts()
    .then((products) => {
        console.log("FIREBASE PRODUCTS:", products);
    })
    .catch((error) => {
        console.error("FIREBASE ERROR:", error);
    });