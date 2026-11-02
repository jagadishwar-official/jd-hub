
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Star, ShoppingCart, Heart, ChevronLeft, ChevronRight, Crown } from "lucide-react";
import { useShop } from "../../context/ShopContext";

import iphone from "../../assets/products/iphone-14.png";
import dress from "../../assets/products/floral-dress.png";
import laptop from "../../assets/products/hp-laptop.png";
import sneakers from "../../assets/products/puma-sneakers.png";
import headphones from "../../assets/products/wireless-headphones.png";
import watch from "../../assets/products/wrist-watch.png";
import backpack from "../../assets/products/travel-backpack.png";
import lamp from "../../assets/products/table-lamp.png";
import skincare from "../../assets/products/skincare.png";
import controller from "../../assets/products/gaming-controller.png";

function FeaturedProducts() {
    const productsRef = useRef(null);
    const navigate = useNavigate();
    const { wishlist, addToWishlist, removeFromWishlist, addToCart } = useShop();

    const products = [
        { id: 1, brand: "APPLE", name: "iPhone 14 128GB", description: "Powerful performance with an amazing camera.", image: iphone, price: 69999, oldPrice: 99999, rating: 4.6, discount: "30% OFF", bg: "bg-blue-50" },
        { id: 2, brand: "FASHION", name: "Women Floral Dress", description: "A stylish outfit for every occasion.", image: dress, price: 999, oldPrice: 1999, rating: 4.3, discount: "50% OFF", bg: "bg-pink-50" },
        { id: 3, brand: "HP", name: "Everyday Laptop", description: "Great for work, study and entertainment.", image: laptop, price: 39999, oldPrice: 49999, rating: 4.5, discount: "20% OFF", bg: "bg-violet-50" },
        { id: 4, brand: "PUMA", name: "Casual Sneakers", description: "Comfortable footwear for everyday wear.", image: sneakers, price: 2399, oldPrice: 3999, rating: 4.4, discount: "40% OFF", bg: "bg-orange-50" },
        { id: 5, brand: "AUDIO", name: "Wireless Headphones", description: "Enjoy music with clear and rich sound.", image: headphones, price: 1499, oldPrice: 2499, rating: 4.5, discount: "40% OFF", bg: "bg-blue-50" },
        { id: 6, brand: "ACCESSORIES", name: "Classic Wrist Watch", description: "A timeless design for every occasion.", image: watch, price: 1999, oldPrice: 2999, rating: 4.2, discount: "33% OFF", bg: "bg-amber-50" },
        { id: 7, brand: "TRAVEL", name: "Travel Backpack", description: "Carry your everyday essentials in style.", image: backpack, price: 999, oldPrice: 1599, rating: 4.3, discount: "38% OFF", bg: "bg-teal-50" },
        { id: 8, brand: "HOME", name: "Modern Table Lamp", description: "Add a warm touch to your living space.", image: lamp, price: 1299, oldPrice: 1999, rating: 4.1, discount: "35% OFF", bg: "bg-yellow-50" },
        { id: 9, brand: "BEAUTY", name: "Skincare Essentials", description: "Simple essentials for your daily routine.", image: skincare, price: 799, oldPrice: 1199, rating: 4.4, discount: "33% OFF", bg: "bg-rose-50" },
        { id: 10, brand: "GAMING", name: "Gaming Controller", description: "Enjoy a better experience while gaming.", image: controller, price: 2499, oldPrice: 3499, rating: 4.6, discount: "28% OFF", bg: "bg-indigo-50" }
    ];

    function scrollProducts(direction) {
        if (productsRef.current) {
            productsRef.current.scrollBy({ left: direction * productsRef.current.clientWidth * 0.8, behavior: "smooth" });
        }
    }

    function openProduct(product) {
        navigate(`/products/featured-${product.id}`, { state: { product: { ...product, _id: `featured-${product.id}`, images: [product.image], originalPrice: product.oldPrice } } });
    }

    function handleWishlist(product) {
        const newProduct = { ...product, _id: `featured-${product.id}`, images: [product.image], originalPrice: product.oldPrice };
        const alreadyExists = wishlist.find((item) => item._id === newProduct._id);

        if (alreadyExists) {
            removeFromWishlist(newProduct._id);
        } else {
            addToWishlist(newProduct);
        }
    }

    function handleAddToCart(product) {
        addToCart({ ...product, _id: `featured-${product.id}`, images: [product.image], originalPrice: product.oldPrice });
    }

    return (
        <section className="mx-auto max-w-[1440px] px-4 py-8 lg:px-6">
            <div className="mb-6 flex items-center justify-between gap-3">
                <div>
                    <h2 className="text-2xl font-extrabold text-blue-950 sm:text-3xl">Featured Products</h2>
                    <div className="mt-2 h-1 w-16 rounded-full bg-yellow-400"></div>
                    <p className="mt-2 text-sm text-gray-500">Best deals on our popular products</p>
                </div>

                <div className="flex shrink-0 gap-2">
                    <button type="button" onClick={() => scrollProducts(-1)} aria-label="Previous products" className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white text-blue-950 shadow-sm transition hover:bg-blue-700 hover:text-white">
                        <ChevronLeft size={22} />
                    </button>
                    <button type="button" onClick={() => scrollProducts(1)} aria-label="Next products" className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white text-blue-950 shadow-sm transition hover:bg-blue-700 hover:text-white">
                        <ChevronRight size={22} />
                    </button>
                </div>
            </div>

            <div ref={productsRef} className="flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth pb-4" style={{ scrollbarWidth: "none" }}>
                {products.map((product) => {
                    const isWishlisted = wishlist.find((item) => item._id === `featured-${product.id}`);

                    return (
                        <div key={product.id} onClick={() => openProduct(product)} className="group w-[82%] shrink-0 snap-start cursor-pointer overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl sm:w-[320px] lg:w-[320px]">
                            <div className={`relative ${product.bg} p-2`}>
                                <div className="flex items-center justify-center overflow-hidden rounded-xl bg-white/70">
                                    <img src={product.image} alt={product.name} loading="lazy" className="h-56 w-full object-cover transition duration-300 group-hover:scale-105 sm:h-60" />
                                </div>

                                <span className="absolute left-4 top-4 rounded-full bg-red-500 px-3 py-1.5 text-xs font-bold text-white">{product.discount}</span>

                                <button type="button" aria-label={`Add ${product.name} to wishlist`} onClick={(e) => { e.stopPropagation(); handleWishlist(product); }} className="absolute right-4 top-4 rounded-full bg-white p-2 text-gray-600 shadow-sm transition hover:text-red-500">
                                    <Heart size={18} className={isWishlisted ? "fill-red-500 text-red-500" : ""} />
                                </button>

                                {product.brand === "HP" && <span className="absolute bottom-4 left-4 flex items-center gap-1 rounded-full bg-white px-3 py-1.5 text-xs font-bold text-blue-700 shadow-sm"><Crown size={14} />Best Seller</span>}
                            </div>

                            <div className="p-4">
                                <p className="text-xs font-bold tracking-wider text-gray-400">{product.brand}</p>
                                <h3 className="mt-1 text-base font-bold text-blue-950">{product.name}</h3>
                                <p className="mt-1 min-h-10 text-sm leading-5 text-gray-500">{product.description}</p>

                                <div className="mt-3 flex items-center gap-1.5">
                                    <Star size={17} className="fill-yellow-400 text-yellow-400" />
                                    <span className="text-sm font-bold text-gray-800">{product.rating}</span>
                                    <span className="text-xs text-gray-400">Rating</span>
                                </div>

                                <div className="mt-3 flex flex-wrap items-center gap-2">
                                    <span className="text-xl font-extrabold text-blue-950">₹{product.price.toLocaleString("en-IN")}</span>
                                    <span className="text-sm text-gray-400 line-through">₹{product.oldPrice.toLocaleString("en-IN")}</span>
                                </div>

                                {product.brand === "FASHION" && <div className="mt-3 flex gap-2">
                                    <span className="h-5 w-5 rounded-full border-2 border-pink-500 bg-pink-400"></span>
                                    <span className="h-5 w-5 rounded-full bg-blue-600"></span>
                                    <span className="h-5 w-5 rounded-full bg-yellow-400"></span>
                                    <span className="h-5 w-5 rounded-full bg-gray-800"></span>
                                </div>}

                                {product.brand === "HP" && <p className="mt-3 rounded-lg bg-violet-50 px-3 py-2 text-xs font-semibold text-violet-800">8GB RAM · 512GB SSD · Full HD</p>}

                                {product.brand === "PUMA" && <p className="mt-3 text-xs font-medium text-gray-500">Sizes: 7, 8, 9, 10</p>}

                                <button type="button" onClick={(e) => { e.stopPropagation(); handleAddToCart(product); }} className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-blue-700 px-3 py-2.5 font-bold text-white transition hover:bg-blue-800">
                                    <ShoppingCart size={18} />Add to Cart
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}

export default FeaturedProducts;
