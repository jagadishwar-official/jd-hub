import { createContext, useContext, useState, useEffect } from "react";

const ShopContext = createContext();

export function ShopProvider({ children }) {
    const [wishlist, setWishlist] = useState(() => {
        return JSON.parse(localStorage.getItem("wishlist")) || [];
    });

    const [cart, setCart] = useState(() => {
        const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
        return savedCart.filter((item) => item._id && /^[0-9a-fA-F]{24}$/.test(item._id));
    });

    useEffect(() => {
        localStorage.setItem("wishlist", JSON.stringify(wishlist));
    }, [wishlist]);

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);

    const addToWishlist = (product) => {
        const exists = wishlist.some((item) => item._id === product._id);
        if (!exists) {
            setWishlist([...wishlist, product]);
        }
    };

    const removeFromWishlist = (id) => {
        setWishlist(wishlist.filter((item) => item._id !== id));
    };

    const addToCart = (product, quantity = 1) => {
        if (!product._id || !/^[0-9a-fA-F]{24}$/.test(product._id)) return;

        const exists = cart.find((item) => item._id === product._id);

        if (exists) {
            setCart(cart.map((item) =>
                item._id === product._id
                    ? { ...item, quantity: item.quantity + quantity }
                    : item
            ));
        } else {
            setCart([...cart, { ...product, quantity }]);
        }
    };

    const removeFromCart = (id) => {
        setCart(cart.filter((item) => item._id !== id));
    };

    const updateQuantity = (id, quantity) => {
        if (quantity < 1) return;

        setCart(cart.map((item) =>
            item._id === id ? { ...item, quantity } : item
        ));
    };

    // Remove only the products that were ordered
    const removeOrderedItems = (ids) => {
        setCart(cart.filter((item) => !ids.includes(item._id)));
    };

    const clearCart = () => {
        setCart([]);
    };

    return (
        <ShopContext.Provider value={{
            wishlist,
            cart,
            addToWishlist,
            removeFromWishlist,
            addToCart,
            removeFromCart,
            updateQuantity,
            removeOrderedItems,
            clearCart
        }}>
            {children}
        </ShopContext.Provider>
    );
}

export function useShop() {
    return useContext(ShopContext);
}