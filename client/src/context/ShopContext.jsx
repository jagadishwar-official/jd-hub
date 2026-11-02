
import { createContext, useContext, useState, useEffect } from "react";

const ShopContext = createContext();

export function ShopProvider({ children }) {
    const [wishlist, setWishlist] = useState(() => {
        return JSON.parse(localStorage.getItem("wishlist")) || [];
    });

    const [cart, setCart] = useState(() => {
        return JSON.parse(localStorage.getItem("cart")) || [];
    });

    useEffect(() => {
        localStorage.setItem("wishlist", JSON.stringify(wishlist));
    }, [wishlist]);

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);

    const addToWishlist = (product) => {
        const alreadyExists = wishlist.some((item) => item._id === product._id);

        if (!alreadyExists) {
            setWishlist([...wishlist, product]);
        }
    };

    const removeFromWishlist = (id) => {
        setWishlist(wishlist.filter((item) => item._id !== id));
    };

    const addToCart = (product, quantity = 1) => {
        const existingProduct = cart.find((item) => item._id === product._id);

        if (existingProduct) {
            setCart(cart.map((item) => item._id === product._id ? { ...item, quantity: item.quantity + quantity } : item));
        } else {
            setCart([...cart, { ...product, quantity }]);
        }
    };

    const removeFromCart = (id) => {
        setCart(cart.filter((item) => item._id !== id));
    };

    const updateQuantity = (id, quantity) => {
        if (quantity < 1) return;

        setCart(cart.map((item) => item._id === id ? { ...item, quantity } : item));
    };

    return (
        <ShopContext.Provider value={{ wishlist, cart, addToWishlist, removeFromWishlist, addToCart, removeFromCart, updateQuantity }}>
            {children}
        </ShopContext.Provider>
    );
}

export function useShop() {
    return useContext(ShopContext);
}
