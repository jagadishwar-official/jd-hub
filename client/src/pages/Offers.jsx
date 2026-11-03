import { useEffect, useState } from "react";
import { useShop } from "../context/ShopContext";
import API_URL from "../config/api";

function Offers() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const { addToCart, wishlist, addToWishlist, removeFromWishlist } = useShop();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch(`${API_URL}/api/products`);

                if (!response.ok) {
                    throw new Error("Failed to fetch products");
                }

                const data = await response.json();
                setProducts(data.products || []);
            } catch (error) {
                setError("Failed to load offer products");
                console.log(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const offerProducts = products.filter((product) => product.originalPrice > product.price);

    const handleWishlist = (product) => {
        const alreadyExists = wishlist.find((item) => item._id === product._id);

        if (alreadyExists) {
            removeFromWishlist(product._id);
        } else {
            addToWishlist(product);
        }
    };

    if (loading) {
        return <p>Loading offers...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div>
            <h1>Special Offers</h1>
            <p>Discover products at discounted prices.</p>

            {offerProducts.length === 0 ? (
                <p>No offer products available.</p>
            ) : (
                <p>{offerProducts.length} offer products available.</p>
            )}
        </div>
    );
}

export default Offers;
