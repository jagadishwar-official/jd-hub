
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ShoppingCart, Star, Heart, ArrowUpRight } from "lucide-react";
import { useShop } from "../../context/ShopContext";

const products = [
    { id: 1, name: "Smartphone", brand: "TechPro", category: "Electronics", price: 24999, oldPrice: 29999, rating: 4.8, image: "https://images.pexels.com/photos/699122/pexels-photo-699122.jpeg?auto=compress&cs=tinysrgb&w=900" },
    { id: 2, name: "Laptop", brand: "NovaTech", category: "Electronics", price: 54999, oldPrice: 64999, rating: 4.7, image: "https://images.pexels.com/photos/18105/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=900" },
    { id: 3, name: "Wireless Headphones", brand: "SoundMax", category: "Electronics", price: 2999, oldPrice: 3999, rating: 4.6, image: "https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=900" },
    { id: 4, name: "Smart Watch", brand: "TimeX", category: "Electronics", price: 4999, oldPrice: 6499, rating: 4.5, image: "https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=900" },
    { id: 5, name: "Digital Camera", brand: "PixelPro", category: "Electronics", price: 32999, oldPrice: 37999, rating: 4.8, image: "https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&w=900" },
    { id: 6, name: "Classic T-Shirt", brand: "UrbanWear", category: "Fashion", price: 699, oldPrice: 999, rating: 4.4, image: "https://images.pexels.com/photos/428338/pexels-photo-428338.jpeg?auto=compress&cs=tinysrgb&w=900" },
    { id: 7, name: "Running Sneakers", brand: "FastStep", category: "Fashion", price: 2499, oldPrice: 3299, rating: 4.7, image: "https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=900" },
    { id: 8, name: "Leather Handbag", brand: "LuxeCarry", category: "Fashion", price: 3499, oldPrice: 4499, rating: 4.6, image: "https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=900" },
    { id: 9, name: "Denim Jacket", brand: "BlueStreet", category: "Fashion", price: 2199, oldPrice: 2999, rating: 4.5, image: "https://images.pexels.com/photos/1124465/pexels-photo-1124465.jpeg?auto=compress&cs=tinysrgb&w=900" },
    { id: 10, name: "Sunglasses", brand: "SunStyle", category: "Fashion", price: 1299, oldPrice: 1799, rating: 4.3, image: "https://images.pexels.com/photos/701877/pexels-photo-701877.jpeg?auto=compress&cs=tinysrgb&w=900" },
    { id: 11, name: "Table Lamp", brand: "HomeGlow", category: "Home & Living", price: 1599, oldPrice: 2199, rating: 4.5, image: "https://images.pexels.com/photos/1112598/pexels-photo-1112598.jpeg?auto=compress&cs=tinysrgb&w=900" },
    { id: 12, name: "Modern Sofa", brand: "ComfortNest", category: "Home & Living", price: 24999, oldPrice: 29999, rating: 4.8, image: "https://images.pexels.com/photos/1866149/pexels-photo-1866149.jpeg?auto=compress&cs=tinysrgb&w=900" },
    { id: 13, name: "Accent Chair", brand: "CasaLiving", category: "Home & Living", price: 8999, oldPrice: 10999, rating: 4.6, image: "https://images.pexels.com/photos/276583/pexels-photo-276583.jpeg?auto=compress&cs=tinysrgb&w=900" },
    { id: 14, name: "Indoor Plant", brand: "GreenSpace", category: "Home & Living", price: 599, oldPrice: 899, rating: 4.4, image: "https://images.pexels.com/photos/1084199/pexels-photo-1084199.jpeg?auto=compress&cs=tinysrgb&w=900" },
    { id: 15, name: "Coffee Table", brand: "WoodCraft", category: "Home & Living", price: 4999, oldPrice: 6499, rating: 4.7, image: "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=900" },
    { id: 16, name: "Skincare Set", brand: "GlowCare", category: "Beauty", price: 1499, oldPrice: 1999, rating: 4.7, image: "https://images.pexels.com/photos/3735218/pexels-photo-3735218.jpeg?auto=compress&cs=tinysrgb&w=900" },
    { id: 17, name: "Luxury Perfume", brand: "AromaLux", category: "Beauty", price: 2799, oldPrice: 3499, rating: 4.8, image: "https://images.pexels.com/photos/965989/pexels-photo-965989.jpeg?auto=compress&cs=tinysrgb&w=900" },
    { id: 18, name: "Face Cream", brand: "PureSkin", category: "Beauty", price: 799, oldPrice: 1099, rating: 4.4, image: "https://images.pexels.com/photos/3735149/pexels-photo-3735149.jpeg?auto=compress&cs=tinysrgb&w=900" },
    { id: 19, name: "Makeup Collection", brand: "ColorMuse", category: "Beauty", price: 1899, oldPrice: 2499, rating: 4.6, image: "https://images.pexels.com/photos/2533266/pexels-photo-2533266.jpeg?auto=compress&cs=tinysrgb&w=900" },
    { id: 20, name: "Beauty Essentials", brand: "DailyGlow", category: "Beauty", price: 999, oldPrice: 1399, rating: 4.5, image: "https://images.pexels.com/photos/3762879/pexels-photo-3762879.jpeg?auto=compress&cs=tinysrgb&w=900" },
    { id: 21, name: "Football", brand: "PlayZone", category: "Sports", price: 899, oldPrice: 1199, rating: 4.5, image: "https://images.pexels.com/photos/47730/the-ball-stadion-football-the-pitch-47730.jpeg?auto=compress&cs=tinysrgb&w=900" },
    { id: 22, name: "Dumbbell Set", brand: "FitForce", category: "Sports", price: 1999, oldPrice: 2699, rating: 4.7, image: "https://images.pexels.com/photos/949131/pexels-photo-949131.jpeg?auto=compress&cs=tinysrgb&w=900" },
    { id: 23, name: "Sports Shoes", brand: "RunFlex", category: "Sports", price: 2999, oldPrice: 3999, rating: 4.6, image: "https://images.pexels.com/photos/1464625/pexels-photo-1464625.jpeg?auto=compress&cs=tinysrgb&w=900" },
    { id: 24, name: "Yoga Mat", brand: "ZenFit", category: "Sports", price: 799, oldPrice: 1099, rating: 4.4, image: "https://images.pexels.com/photos/4056723/pexels-photo-4056723.jpeg?auto=compress&cs=tinysrgb&w=900" },
    { id: 25, name: "Travel Backpack", brand: "TrailPack", category: "Sports", price: 1799, oldPrice: 2399, rating: 4.6, image: "https://images.pexels.com/photos/2905238/pexels-photo-2905238.jpeg?auto=compress&cs=tinysrgb&w=900" }
];

const categories = ["All Products", "Electronics", "Fashion", "Home & Living", "Beauty", "Sports"];

function PopularProducts({ searchText = "" }) {
    const [activeCategory, setActiveCategory] = useState("All Products");
    const navigate = useNavigate();
    const { wishlist, addToWishlist, removeFromWishlist, addToCart } = useShop();

    const filteredProducts = products.filter((product) => {
        const matchesCategory = activeCategory === "All Products" || product.category === activeCategory;
        const matchesSearch = `${product.name} ${product.brand} ${product.category}`.toLowerCase().includes(searchText.trim().toLowerCase());
        return matchesCategory && matchesSearch;
    });

    function toggleWishlist(product) {
        const newProduct = { ...product, _id: `popular-${product.id}`, images: [product.image], originalPrice: product.oldPrice };
        const alreadyExists = wishlist.find((item) => item._id === newProduct._id);

        if (alreadyExists) {
            removeFromWishlist(newProduct._id);
        } else {
            addToWishlist(newProduct);
        }
    }

    function openProduct(product) {
        navigate(`/products/popular-${product.id}`, { state: { product: { ...product, _id: `popular-${product.id}`, images: [product.image], originalPrice: product.oldPrice } } });
    }

    function handleAddToCart(product) {
        addToCart({ ...product, _id: `popular-${product.id}`, images: [product.image], originalPrice: product.oldPrice });
    }

    return (
        <section className="bg-white px-4 py-14 sm:px-8 lg:px-16">
            <div className="mx-auto max-w-7xl">
                <div className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
                    <div>
                        <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-blue-600">Our Collection</p>
                        <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">Popular Products<span className="text-blue-600">.</span></h2>
                        <p className="mt-3 text-gray-500">Find your next favorite from our top picks.</p>
                    </div>
                    <button onClick={() => navigate("/products")} className="flex items-center gap-2 self-start text-sm font-semibold text-blue-700 hover:text-blue-900 sm:self-auto">Explore all <ArrowUpRight size={18} /></button>
                </div>

                <div className="mb-8 flex gap-2 overflow-x-auto pb-2">
                    {categories.map((category) => <button key={category} onClick={() => setActiveCategory(category)} className={`shrink-0 rounded-full px-5 py-2.5 text-sm font-medium transition ${activeCategory === category ? "bg-blue-600 text-white" : "border border-gray-200 bg-white text-gray-600 hover:border-blue-400 hover:text-blue-700"}`}>{category}</button>)}
                </div>

                {filteredProducts.length === 0 ? (
                    <p className="py-12 text-center text-gray-500">No products found. Try another search.</p>
                ) : (
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                        {filteredProducts.map((product) => {
                            const isWishlisted = wishlist.find((item) => item._id === `popular-${product.id}`);

                            return (
                                <div key={product.id} onClick={() => openProduct(product)} className="group cursor-pointer overflow-hidden rounded-2xl border border-gray-100 bg-white transition hover:-translate-y-1 hover:shadow-xl">
                                    <div className="relative h-72 overflow-hidden bg-blue-50 sm:h-80">
                                        <img src={product.image} alt={product.name} loading="lazy" onError={(event) => { event.currentTarget.onerror = null; event.currentTarget.src = "https://placehold.co/800x800/eff6ff/2563eb?text=Product+Image"; }} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                                        <span className="absolute left-4 top-4 rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-blue-700 shadow">{Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)}% OFF</span>
                                        <button onClick={(e) => { e.stopPropagation(); toggleWishlist(product); }} aria-label="Toggle wishlist" className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow">
                                            <Heart size={19} className={isWishlisted ? "fill-red-500 text-red-500" : "text-gray-700"} />
                                        </button>
                                    </div>

                                    <div className="p-5">
                                        <p className="mb-1 text-xs font-medium uppercase tracking-wider text-gray-400">{product.brand}</p>
                                        <div className="flex items-start justify-between gap-3">
                                            <h3 className="text-lg font-semibold text-gray-900">{product.name}</h3>
                                            <div className="flex shrink-0 items-center gap-1 text-sm text-gray-600"><Star size={15} className="fill-amber-400 text-amber-400" />{product.rating}</div>
                                        </div>
                                        <div className="mt-4 flex items-center justify-between gap-3">
                                            <div className="flex flex-wrap items-baseline gap-2"><span className="text-xl font-bold text-gray-900">₹{product.price.toLocaleString("en-IN")}</span><span className="text-sm text-gray-400 line-through">₹{product.oldPrice.toLocaleString("en-IN")}</span></div>
                                            <button onClick={(e) => { e.stopPropagation(); handleAddToCart(product); }} aria-label={`Add ${product.name} to cart`} className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-blue-600 text-white hover:bg-blue-700"><ShoppingCart size={19} /></button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </section>
    );
}

export default PopularProducts;
