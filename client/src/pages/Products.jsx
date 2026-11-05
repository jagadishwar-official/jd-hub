
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Search, SlidersHorizontal, Star, Heart, ShoppingCart, X, Grid2X2, List } from "lucide-react";
import { useShop } from "../context/ShopContext";
import API_URL from "../config/api";

function Products() {
    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("All");
    const [selectedBrands, setSelectedBrands] = useState([]);
    const [minRating, setMinRating] = useState(0);
    const [minPrice, setMinPrice] = useState("");
    const [maxPrice, setMaxPrice] = useState("");
    const [sortBy, setSortBy] = useState("featured");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [showFilters, setShowFilters] = useState(false);
    const [viewMode, setViewMode] = useState("grid");
    const [message, setMessage] = useState("");
    const { wishlist, addToWishlist, removeFromWishlist, addToCart } = useShop();
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();

    // Get category from URL
    useEffect(() => {
        setCategory(searchParams.get("category") || "All");
    }, [searchParams]);

    // Fetch products
    useEffect(() => {
        const getProducts = async () => {
            try {
                const response = await fetch(`${API_URL}/api/products`);
                const data = await response.json();
                if (!response.ok) throw new Error(data.message || "Unable to load products");
                setProducts(data.products || []);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };
        getProducts();
    }, []);

    const brands = [...new Set(products.map((product) => product.brand).filter(Boolean))];

    // Change category
    const handleCategoryChange = (value) => {
        setCategory(value);
        if (value === "All") {
            setSearchParams({});
        } else {
            setSearchParams({ category: value });
        }
    };

    // Check category
    const matchesCategory = (product) => {
        if (category === "All") return true;
        if (category === "Offers") {
            return Number(product.originalPrice) > Number(product.price);
        }
        return product.category?.toLowerCase() === category.toLowerCase();
    };

    // Brand filter
    const handleBrandChange = (brand) => {
        if (selectedBrands.includes(brand)) {
            setSelectedBrands(selectedBrands.filter((item) => item !== brand));
        } else {
            setSelectedBrands([...selectedBrands, brand]);
        }
    };

    // Wishlist
    const handleWishlist = (product) => {
        const alreadyExists = wishlist.some((item) => item._id === product._id);
        if (alreadyExists) {
            removeFromWishlist(product._id);
        } else {
            addToWishlist(product);
        }
    };

    // Add to cart
    const handleAddToCart = (product) => {
        addToCart(product);
        setMessage(product.name + " added to cart");
        setTimeout(() => setMessage(""), 2000);
    };

    // Filter products
    let filteredProducts = products.filter((product) => {
        const searchText = search.toLowerCase();
        const matchesSearch = product.name?.toLowerCase().includes(searchText) || product.brand?.toLowerCase().includes(searchText);
        const matchesBrand = selectedBrands.length === 0 || selectedBrands.includes(product.brand);
        const matchesRating = Number(product.rating || 0) >= minRating;
        const matchesMinPrice = minPrice === "" || product.price >= Number(minPrice);
        const matchesMaxPrice = maxPrice === "" || product.price <= Number(maxPrice);
        return matchesSearch && matchesCategory(product) && matchesBrand && matchesRating && matchesMinPrice && matchesMaxPrice;
    });

    // Sort products
    if (sortBy === "lowToHigh") {
        filteredProducts.sort((a, b) => a.price - b.price);
    } else if (sortBy === "highToLow") {
        filteredProducts.sort((a, b) => b.price - a.price);
    } else if (sortBy === "rating") {
        filteredProducts.sort((a, b) => b.rating - a.rating);
    }

    const clearFilters = () => {
        setSearch("");
        setSelectedBrands([]);
        setMinRating(0);
        setMinPrice("");
        setMaxPrice("");
        handleCategoryChange("All");
    };

    if (loading) {
        return <div className="min-h-screen flex items-center justify-center text-xl font-semibold text-blue-950">Loading products...</div>;
    }

    if (error) {
        return <div className="min-h-screen flex items-center justify-center text-red-500">{error}</div>;
    }

    return (
        <div className="min-h-screen bg-white">
            <div className="mx-auto max-w-[1500px] px-4 py-8 sm:px-6">
                <div className="mb-4 text-sm text-gray-500">Home <span className="mx-2">›</span> <span className="font-semibold text-blue-950">Products</span></div>

                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-blue-950 md:text-4xl">{category === "All" ? "All Products" : category}</h1>
                    <div className="mt-3 h-1.5 w-24 rounded-full bg-yellow-400"></div>
                    <p className="mt-3 text-base text-gray-500 md:text-lg">Explore our latest products and best deals</p>
                </div>

                {category === "Offers" && (
                    <div className="mb-8 flex min-h-48 items-center justify-between overflow-hidden rounded-2xl bg-gradient-to-r from-sky-100 to-blue-200 p-6 md:p-10">
                        <div>
                            <p className="mb-2 text-xs font-bold tracking-widest text-blue-950">JD HUB EXCLUSIVE</p>
                            <h2 className="text-3xl font-extrabold text-blue-950 md:text-4xl">Special Offers</h2>
                            <p className="mt-3 text-blue-900">Shop your favourite products at discounted prices.</p>
                        </div>
                        <div className="hidden text-7xl md:block">🛍️</div>
                    </div>
                )}

                <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
                    <div className="flex flex-wrap items-center gap-3">
                        <div className="flex items-center rounded-xl border px-4 py-3">
                            <Search size={19} className="text-gray-400" />
                            <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search products..." className="ml-3 outline-none" />
                        </div>
                        <button onClick={() => setShowFilters(true)} className="flex items-center gap-2 rounded-xl border-2 border-blue-700 px-5 py-3 font-semibold text-blue-800 hover:bg-blue-50">
                            <SlidersHorizontal size={19} /> Filters
                        </button>
                        <p className="font-bold text-blue-950">{filteredProducts.length} Products Found</p>
                    </div>

                    <div className="flex items-center gap-3">
                        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="rounded-xl border px-4 py-3 outline-none">
                            <option value="featured">Featured</option>
                            <option value="lowToHigh">Price: Low to High</option>
                            <option value="highToLow">Price: High to Low</option>
                            <option value="rating">Customer Rating</option>
                        </select>
                        <button onClick={() => setViewMode("grid")} className={`rounded-lg p-3 ${viewMode === "grid" ? "bg-blue-700 text-white" : "border"}`}><Grid2X2 size={20} /></button>
                        <button onClick={() => setViewMode("list")} className={`rounded-lg p-3 ${viewMode === "list" ? "bg-blue-700 text-white" : "border"}`}><List size={20} /></button>
                    </div>
                </div>

                {filteredProducts.length === 0 ? (
                    <div className="rounded-2xl border py-20 text-center">
                        <h2 className="text-2xl font-bold text-blue-950">No Products Found</h2>
                        <p className="mt-2 text-gray-500">Try changing your search or filters.</p>
                        <button onClick={clearFilters} className="mt-5 rounded-lg bg-blue-700 px-6 py-3 text-white">Clear Filters</button>
                    </div>
                ) : (
                    <div className={viewMode === "grid" ? "grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" : "flex flex-col gap-5"}>
                        {filteredProducts.map((product) => {
                            const discount = Number(product.originalPrice) > Number(product.price) ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : 0;
                            const isWishlisted = wishlist.some((item) => item._id === product._id);

                            return (
                                <div key={product._id} className={`group overflow-hidden rounded-2xl border bg-white shadow-sm transition hover:shadow-lg ${viewMode === "list" ? "flex flex-col sm:flex-row" : "flex flex-col"}`}>
                                    <div onClick={() => navigate(`/products/${product._id}`)} className={`relative cursor-pointer overflow-hidden bg-gray-50 ${viewMode === "list" ? "h-64 sm:w-64" : "h-72"}`}>
                                        <img src={product.images?.[0] || "https://placehold.co/500x500?text=Product"} alt={product.name} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                                        {discount > 0 && <span className="absolute left-3 top-3 rounded-full bg-red-500 px-4 py-2 text-sm font-bold text-white">{discount}% OFF</span>}
                                        <button onClick={(e) => { e.stopPropagation(); handleWishlist(product); }} className="absolute right-3 top-3 flex h-11 w-11 items-center justify-center rounded-full bg-white shadow-md">
                                            <Heart size={22} className={isWishlisted ? "fill-red-500 text-red-500" : "text-gray-600"} />
                                        </button>
                                    </div>

                                    <div className="flex flex-1 flex-col p-5">
                                        <p className="text-sm font-bold uppercase tracking-wide text-gray-400">{product.brand}</p>
                                        <h3 onClick={() => navigate(`/products/${product._id}`)} className="mt-1 cursor-pointer text-lg font-bold text-blue-950 hover:text-blue-700">{product.name}</h3>
                                        <p className="mt-2 line-clamp-2 min-h-12 text-base text-gray-500">{product.description}</p>
                                        <div className="mt-4 flex items-center gap-2">
                                            <Star size={19} className="fill-yellow-400 text-yellow-400" />
                                            <span className="font-bold text-gray-800">{product.rating || "New"}</span>
                                            <span className="text-sm text-gray-400">Rating</span>
                                        </div>
                                        <div className="mt-4 flex flex-wrap items-center gap-3">
                                            <span className="text-2xl font-extrabold text-blue-950">₹{product.price?.toLocaleString("en-IN")}</span>
                                            {discount > 0 && <span className="text-base text-gray-400 line-through">₹{product.originalPrice?.toLocaleString("en-IN")}</span>}
                                        </div>
                                        <button onClick={() => handleAddToCart(product)} disabled={product.stock <= 0} className="mt-auto flex items-center justify-center gap-3 rounded-xl bg-blue-700 py-4 pt-4 text-lg font-bold text-white transition hover:bg-blue-800 disabled:bg-gray-400">
                                            <ShoppingCart size={21} /> {product.stock <= 0 ? "Out of Stock" : "Add to Cart"}
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>

            {showFilters && (
                <div className="fixed inset-0 z-50 bg-black/40" onClick={() => setShowFilters(false)}>
                    <aside onClick={(e) => e.stopPropagation()} className="fixed left-0 top-0 flex h-full w-full max-w-sm flex-col overflow-y-auto bg-white shadow-2xl">
                        <div className="sticky top-0 z-10 flex items-center justify-between border-b bg-white p-5">
                            <h2 className="text-xl font-bold text-blue-950">Filters</h2>
                            <button onClick={() => setShowFilters(false)}><X size={23} /></button>
                        </div>

                        <div className="flex-1 p-5">
                            <h3 className="mb-4 font-bold text-blue-950">Category</h3>
                            {["All", "Mobiles", "Electronics", "Fashion", "Home & Living", "Beauty", "Toys & Games", "Sports", "Books", "Grocery", "Offers"].map((item) => (
                                <label key={item} className="mb-3 flex cursor-pointer items-center gap-3">
                                    <input type="radio" name="category" checked={category === item} onChange={() => handleCategoryChange(item)} className="accent-blue-700" />
                                    <span>{item === "All" ? "All Categories" : item}</span>
                                    <span className="ml-auto text-sm text-gray-400">{item === "All" ? products.length : products.filter((product) => item === "Offers" ? Number(product.originalPrice) > Number(product.price) : product.category?.toLowerCase() === item.toLowerCase()).length}</span>
                                </label>
                            ))}

                            <div className="mb-6 mt-6 border-t pt-5">
                                <h3 className="mb-4 font-bold text-blue-950">Brand</h3>
                                {brands.map((brand) => (
                                    <label key={brand} className="mb-3 flex cursor-pointer items-center gap-3">
                                        <input type="checkbox" checked={selectedBrands.includes(brand)} onChange={() => handleBrandChange(brand)} className="accent-blue-700" />
                                        {brand}
                                    </label>
                                ))}
                            </div>

                            <div className="mb-6 border-t pt-5">
                                <h3 className="mb-4 font-bold text-blue-950">Price Range</h3>
                                <input type="number" value={minPrice} onChange={(e) => setMinPrice(e.target.value)} placeholder="Minimum price" className="mb-3 w-full rounded-lg border p-3" />
                                <input type="number" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} placeholder="Maximum price" className="w-full rounded-lg border p-3" />
                            </div>

                            <div className="border-t pt-5">
                                <h3 className="mb-4 font-bold text-blue-950">Customer Rating</h3>
                                {[4, 3, 2, 1].map((rating) => (
                                    <button key={rating} onClick={() => setMinRating(minRating === rating ? 0 : rating)} className={`mb-3 flex items-center gap-2 ${minRating === rating ? "font-bold text-blue-700" : "text-gray-600"}`}>
                                        <Star size={17} className="fill-yellow-400 text-yellow-400" /> {rating} & Up
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="sticky bottom-0 flex gap-3 border-t bg-white p-5">
                            <button onClick={clearFilters} className="flex-1 rounded-lg border border-blue-700 py-3 font-bold text-blue-700">Clear All</button>
                            <button onClick={() => setShowFilters(false)} className="flex-1 rounded-lg bg-blue-700 py-3 font-bold text-white">Show {filteredProducts.length} Products</button>
                        </div>
                    </aside>
                </div>
            )}

            {message && <div className="fixed bottom-6 right-6 z-[60] rounded-xl bg-blue-950 px-6 py-4 text-white shadow-lg">{message}</div>}
        </div>
    );
}

export default Products;
