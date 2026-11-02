
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Search, SlidersHorizontal, Star, Heart, ShoppingCart, X, Grid2X2, List, Check } from "lucide-react";
import { useShop } from "../context/ShopContext";

function Products() {
    const [products, setProducts] = useState([]);
    const [searchText, setSearchText] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [selectedBrands, setSelectedBrands] = useState([]);
    const [minRating, setMinRating] = useState(0);
    const [priceRange, setPriceRange] = useState("All");
    const [sortBy, setSortBy] = useState("featured");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [filtersOpen, setFiltersOpen] = useState(false);
    const [brandSearch, setBrandSearch] = useState("");
    const [viewMode, setViewMode] = useState("grid");
    const [message, setMessage] = useState("");

    const { wishlist, addToWishlist, removeFromWishlist, addToCart } = useShop();
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();

    // Read Category From URL
    useEffect(() => {
        const category = searchParams.get("category") || "All";
        setSelectedCategory(category);
    }, [searchParams]);

    // Fetch Products
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/products");
                setProducts(response.data.products || []);
            } catch (error) {
                setError("Failed to load products");
                console.log(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    // Categories and Brands
    const brands = [...new Set(products.map((product) => product.brand))];

    // Category Filter
    const handleCategoryChange = (category) => {
        setSelectedCategory(category);

        if (category === "All") {
            setSearchParams({});
        } else {
            setSearchParams({ category: category });
        }
    };

    // Check Product Category
    const matchesCategory = (product, categoryName = selectedCategory) => {
        if (categoryName === "All") return true;

        const category = product.category?.toLowerCase() || "";
        const name = product.name?.toLowerCase() || "";

        if (categoryName === "Mobiles") {
            return category.includes("mobile") || category.includes("phone") ||
                (category.includes("electronic") && /mobile|phone|iphone|smartphone|samsung|oneplus|redmi|realme|vivo|oppo/.test(name));
        }

        if (categoryName === "Electronics") {
            return category.includes("electronic") && !/mobile|phone|iphone|smartphone|samsung|oneplus|redmi|realme|vivo|oppo/.test(name);
        }

        if (categoryName === "Home & Living") {
            return category.includes("home") || category.includes("living");
        }

        if (categoryName === "Toys & Games") {
            return category.includes("toy") || category.includes("game");
        }

        return category === categoryName.toLowerCase();
    };

    // Brand Filter
    const handleBrandChange = (brand) => {
        if (selectedBrands.includes(brand)) {
            setSelectedBrands(selectedBrands.filter((item) => item !== brand));
        } else {
            setSelectedBrands([...selectedBrands, brand]);
        }
    };

    // Wishlist
    const handleWishlist = (product) => {
        const alreadyExists = wishlist.find((item) => item._id === product._id);

        if (alreadyExists) {
            removeFromWishlist(product._id);
        } else {
            addToWishlist(product);
        }
    };

    // Add to Cart
    const handleAddToCart = (product) => {
        addToCart(product);
        setMessage(product.name + " added to cart");
        setTimeout(() => {
            setMessage("");
        }, 2000);
    };

    // Filter Products
    let filteredProducts = products.filter((product) => {
        const search = searchText.toLowerCase();

        const matchesSearch = product.name.toLowerCase().includes(search) ||
            product.brand.toLowerCase().includes(search);

        const categoryMatch = matchesCategory(product);
        const matchesBrand = selectedBrands.length === 0 || selectedBrands.includes(product.brand);
        const matchesRating = product.rating >= minRating;

        let matchesPrice = true;

        if (priceRange === "under5000") {
            matchesPrice = product.price < 5000;
        } else if (priceRange === "5000to20000") {
            matchesPrice = product.price >= 5000 && product.price <= 20000;
        } else if (priceRange === "20000to50000") {
            matchesPrice = product.price > 20000 && product.price <= 50000;
        } else if (priceRange === "above50000") {
            matchesPrice = product.price > 50000;
        }

        return matchesSearch && categoryMatch && matchesBrand && matchesRating && matchesPrice;
    });

    // Sort Products
    if (sortBy === "lowToHigh") {
        filteredProducts.sort((a, b) => a.price - b.price);
    } else if (sortBy === "highToLow") {
        filteredProducts.sort((a, b) => b.price - a.price);
    } else if (sortBy === "rating") {
        filteredProducts.sort((a, b) => b.rating - a.rating);
    }

    // Clear Filters
    const clearFilters = () => {
        setSelectedCategory("All");
        setSelectedBrands([]);
        setMinRating(0);
        setPriceRange("All");
        setSearchText("");
        setBrandSearch("");
        setSearchParams({});
    };

    if (loading) {
        return <div className="min-h-screen flex items-center justify-center text-xl font-semibold text-blue-950">Loading products...</div>;
    }

    if (error) {
        return <div className="min-h-screen flex items-center justify-center text-red-500">{error}</div>;
    }

    return (
        <div className="min-h-screen bg-white">
            <div className="max-w-[1500px] mx-auto px-4 sm:px-6 py-8">

                {/* Page Heading */}
                <div className="text-sm text-gray-500 mb-4">
                    Home <span className="mx-2">›</span>
                    <span className="text-blue-950 font-semibold">Products</span>
                </div>

                <div className="mb-8">
                    <h1 className="text-3xl md:text-4xl font-bold text-blue-950">
                        {selectedCategory === "All" ? "All Products" : selectedCategory}
                    </h1>
                    <div className="w-24 h-1.5 bg-yellow-400 rounded-full mt-3"></div>
                    <p className="text-gray-500 mt-3 text-base md:text-lg">Explore our latest products and best deals</p>
                </div>

                {/* Promotional Banner */}
                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-sky-100 via-blue-100 to-blue-200 mb-8 min-h-48 flex items-center">
                    <div className="relative z-10 p-6 md:p-10 max-w-xl">
                        <p className="text-xs font-bold tracking-[3px] text-blue-950 mb-2">JD HUB EXCLUSIVE</p>
                        <h2 className="text-3xl md:text-4xl font-extrabold text-blue-950 leading-tight">
                            Upgrade Your
                            <span className="block text-blue-600">Digital Lifestyle</span>
                        </h2>
                        <p className="text-blue-950 mt-2">Top Brands. Best Prices. Latest Technology.</p>
                        <button onClick={() => handleCategoryChange("Electronics")} className="mt-4 bg-yellow-400 hover:bg-yellow-500 text-blue-950 font-bold px-6 py-3 rounded-lg transition">
                            Shop Now →
                        </button>
                    </div>

                    <div className="absolute right-0 top-0 h-full w-1/2 hidden md:flex items-center justify-center">
                        <div className="absolute w-64 h-64 bg-yellow-300 rounded-full opacity-80"></div>
                        <div className="relative flex items-center gap-4 text-7xl">
                            <span>📱</span>
                            <span>💻</span>
                            <span>🎧</span>
                        </div>
                    </div>
                </div>

                {/* Products Toolbar */}
                <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                    <div className="flex items-center gap-4">
                        <button onClick={() => setFiltersOpen(true)} className="flex items-center gap-2 border-2 border-blue-700 text-blue-800 font-semibold px-5 py-3 rounded-xl hover:bg-blue-50 transition">
                            <SlidersHorizontal size={19} /> Filters
                        </button>

                        <span className="hidden sm:block h-8 border-l border-gray-300"></span>
                        <p className="font-bold text-blue-950">{filteredProducts.length} Products Found</p>
                    </div>

                    <div className="flex items-center gap-3">
                        <label className="hidden sm:block text-sm font-medium text-gray-600">Sort By:</label>

                        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="border border-gray-300 rounded-xl px-4 py-3 bg-white text-blue-950 outline-none focus:border-blue-600">
                            <option value="featured">Featured</option>
                            <option value="lowToHigh">Price: Low to High</option>
                            <option value="highToLow">Price: High to Low</option>
                            <option value="rating">Customer Rating</option>
                        </select>

                        <div className="hidden sm:flex items-center border border-gray-200 rounded-xl overflow-hidden">
                            <button onClick={() => setViewMode("grid")} className={`p-3 ${viewMode === "grid" ? "bg-blue-700 text-white" : "bg-white text-blue-950"}`}>
                                <Grid2X2 size={20} />
                            </button>
                            <button onClick={() => setViewMode("list")} className={`p-3 ${viewMode === "list" ? "bg-blue-700 text-white" : "bg-white text-blue-950"}`}>
                                <List size={20} />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Product Cards */}
                {filteredProducts.length === 0 ? (
                    <div className="text-center py-20 border rounded-2xl">
                        <h2 className="text-2xl font-bold text-blue-950">No Products Found</h2>
                        <p className="text-gray-500 mt-2">Try changing your search or filters.</p>
                        <button onClick={clearFilters} className="mt-5 bg-blue-700 text-white px-6 py-3 rounded-lg">Clear Filters</button>
                    </div>
                ) : (
                    <div className={viewMode === "grid" ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5" : "flex flex-col gap-5"}>
                        {filteredProducts.map((product) => {
                            let discount = 0;

                            if (product.originalPrice > product.price) {
                                discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
                            }

                            const isWishlisted = wishlist.find((item) => item._id === product._id);

                            return (
                                <div key={product._id} className={`group bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-lg transition overflow-hidden ${viewMode === "list" ? "flex flex-col sm:flex-row" : "flex flex-col"}`}>

                                    {/* Product Image */}
                                    <div onClick={() => navigate(`/products/${product._id}`)} className={`relative overflow-hidden cursor-pointer ${viewMode === "list" ? "sm:w-64 h-64 shrink-0" : "h-72"}`}>
                                        <div className="absolute inset-0 bg-blue-50"></div>
                                        <img src={product.images?.[0] || "https://placehold.co/500x500?text=Product"} alt={product.name} className="relative w-full h-full object-cover group-hover:scale-105 transition duration-500" />

                                        {discount > 0 && (
                                            <span className="absolute top-3 left-3 bg-red-500 text-white text-sm font-bold px-4 py-2 rounded-full">{discount}% OFF</span>
                                        )}

                                        <button onClick={(e) => { e.stopPropagation(); handleWishlist(product); }} className="absolute top-3 right-3 bg-white w-11 h-11 rounded-full flex items-center justify-center shadow-md hover:scale-110 transition">
                                            <Heart size={22} className={isWishlisted ? "text-red-500 fill-red-500" : "text-gray-600"} />
                                        </button>
                                    </div>

                                    {/* Product Information */}
                                    <div className="p-5 flex flex-col flex-1">
                                        <p className="text-sm font-bold text-gray-400 uppercase tracking-wide">{product.brand}</p>

                                        <h3 onClick={() => navigate(`/products/${product._id}`)} className="text-lg font-bold text-blue-950 mt-1 cursor-pointer hover:text-blue-700">
                                            {product.name}
                                        </h3>

                                        <p className="text-gray-500 text-base mt-2 line-clamp-2 min-h-12">{product.description}</p>

                                        {/* Rating */}
                                        <div className="flex items-center gap-2 mt-4">
                                            <Star size={21} className="text-yellow-400 fill-yellow-400" />
                                            <span className="font-bold text-gray-800">{product.rating || "New"}</span>
                                            <span className="text-sm text-gray-400">Rating</span>
                                        </div>

                                        {/* Price */}
                                        <div className="flex items-center flex-wrap gap-3 mt-4">
                                            <span className="text-2xl font-extrabold text-blue-950">₹{product.price?.toLocaleString("en-IN")}</span>
                                            {discount > 0 && (
                                                <span className="text-base text-gray-400 line-through">₹{product.originalPrice?.toLocaleString("en-IN")}</span>
                                            )}
                                        </div>

                                        {/* Extra Details */}
                                        {product.sizes?.length > 0 && (
                                            <p className="text-sm text-gray-500 mt-3">Sizes: {product.sizes.join(", ")}</p>
                                        )}

                                        {product.colors?.length > 0 && (
                                            <div className="flex items-center gap-2 mt-3">
                                                {product.colors.slice(0, 5).map((color, index) => (
                                                    <span key={index} title={color} className="w-5 h-5 rounded-full border border-gray-300" style={{ backgroundColor: color }}></span>
                                                ))}
                                            </div>
                                        )}

                                        {/* Add to Cart */}
                                        <button onClick={() => handleAddToCart(product)} className="flex items-center justify-center gap-3 bg-blue-700 hover:bg-blue-800 text-white font-bold text-lg py-4 rounded-xl mt-auto pt-4 transition">
                                            <ShoppingCart size={21} /> Add to Cart
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>

            {/* Filter Panel */}
            {filtersOpen && (
                <div className="fixed inset-0 z-50 bg-black/40" onClick={() => setFiltersOpen(false)}>
                    <aside onClick={(e) => e.stopPropagation()} className="fixed left-0 top-0 h-full w-full max-w-sm bg-white shadow-2xl overflow-y-auto flex flex-col">

                        {/* Filter Header */}
                        <div className="flex items-center justify-between p-5 border-b sticky top-0 bg-white z-10">
                            <div className="flex items-center gap-3">
                                <SlidersHorizontal className="text-blue-700" size={22} />
                                <h2 className="text-xl font-bold text-blue-950">Filters</h2>
                            </div>
                            <button onClick={() => setFiltersOpen(false)} className="p-2 rounded-full hover:bg-gray-100">
                                <X size={23} />
                            </button>
                        </div>

                        <div className="p-5 flex-1">

                            {/* Category Filter */}
                            <div className="mb-6">
                                <h3 className="font-bold text-blue-950 mb-4">Category</h3>
                                {["All", "Mobiles", "Electronics", "Fashion", "Home & Living", "Beauty", "Toys & Games", "Sports", "Books", "Grocery"].map((category) => (
                                    <label key={category} className="flex items-center gap-3 mb-3 cursor-pointer text-gray-700">
                                        <input type="radio" name="category" checked={selectedCategory === category} onChange={() => handleCategoryChange(category)} className="w-4 h-4 accent-blue-700" />
                                        <span>{category === "All" ? "All Categories" : category}</span>
                                        <span className="ml-auto text-gray-400 text-sm">{category === "All" ? products.length : products.filter((product) => matchesCategory(product, category)).length}</span>
                                    </label>
                                ))}
                            </div>

                            {/* Brand Filter */}
                            <div className="border-t pt-5 mb-6">
                                <h3 className="font-bold text-blue-950 mb-4">Brand</h3>

                                <div className="relative mb-4">
                                    <Search size={18} className="absolute left-3 top-3 text-gray-400" />
                                    <input type="text" value={brandSearch} onChange={(e) => setBrandSearch(e.target.value)} placeholder="Search brand..." className="w-full border rounded-lg py-2 pl-10 pr-3 outline-none focus:border-blue-600" />
                                </div>

                                {brands.filter((brand) => brand.toLowerCase().includes(brandSearch.toLowerCase())).map((brand) => (
                                    <label key={brand} className="flex items-center gap-3 mb-3 cursor-pointer text-gray-700">
                                        <input type="checkbox" checked={selectedBrands.includes(brand)} onChange={() => handleBrandChange(brand)} className="w-4 h-4 accent-blue-700" />
                                        {brand}
                                        <span className="ml-auto text-gray-400 text-sm">{products.filter((product) => product.brand === brand).length}</span>
                                    </label>
                                ))}
                            </div>

                            {/* Price Filter */}
                            <div className="border-t pt-5 mb-6">
                                <h3 className="font-bold text-blue-950 mb-4">Price Range</h3>
                                {[
                                    { label: "All Prices", value: "All" },
                                    { label: "Under ₹5,000", value: "under5000" },
                                    { label: "₹5,000 - ₹20,000", value: "5000to20000" },
                                    { label: "₹20,000 - ₹50,000", value: "20000to50000" },
                                    { label: "Above ₹50,000", value: "above50000" }
                                ].map((price) => (
                                    <label key={price.value} className="flex items-center gap-3 mb-3 cursor-pointer text-gray-700">
                                        <input type="radio" name="price" checked={priceRange === price.value} onChange={() => setPriceRange(price.value)} className="w-4 h-4 accent-blue-700" />
                                        {price.label}
                                    </label>
                                ))}
                            </div>

                            {/* Rating Filter */}
                            <div className="border-t pt-5">
                                <h3 className="font-bold text-blue-950 mb-4">Customer Rating</h3>
                                {[4, 3, 2, 1].map((rating) => (
                                    <button key={rating} onClick={() => setMinRating(minRating === rating ? 0 : rating)} className={`flex items-center gap-2 mb-3 ${minRating === rating ? "text-blue-700 font-bold" : "text-gray-600"}`}>
                                        <Star size={17} className="text-yellow-400 fill-yellow-400" />
                                        {rating} & Up
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Filter Buttons */}
                        <div className="sticky bottom-0 bg-white border-t p-5 flex gap-3">
                            <button onClick={clearFilters} className="flex-1 border border-blue-700 text-blue-700 font-bold py-3 rounded-lg hover:bg-blue-50">
                                Clear All
                            </button>
                            <button onClick={() => setFiltersOpen(false)} className="flex-1 bg-blue-700 hover:bg-blue-800 text-white font-bold py-3 rounded-lg">
                                Show {filteredProducts.length} Products
                            </button>
                        </div>
                    </aside>
                </div>
            )}

            {/* Cart Message */}
            {message && (
                <div className="fixed bottom-6 right-6 z-[60] bg-blue-950 text-white px-6 py-4 rounded-xl shadow-lg flex items-center gap-3">
                    <Check size={20} className="text-yellow-400" /> {message}
                </div>
            )}
        </div>
    );
}

export default Products;
