
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../config/firebase";
import axios from "axios";
import { Search, UserRound, Heart, ShoppingCart, Menu, ChevronDown, Smartphone, Shirt, Laptop, House, Sparkles, Gamepad2, Dumbbell, BookOpen, ShoppingBasket, Tag, Package, Bell, Headset, LogOut } from "lucide-react";

function Navbar({ searchText = "", setSearchText = () => {} }) {
    const [open, setOpen] = useState(false);
    const [accountOpen, setAccountOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setIsLoggedIn(!!user);
        });

        return () => unsubscribe();
    }, []);

    const categories = [
        { name: "Mobiles", icon: Smartphone },
        { name: "Fashion", icon: Shirt },
        { name: "Electronics", icon: Laptop },
        { name: "Home & Living", icon: House },
        { name: "Beauty", icon: Sparkles },
        { name: "Toys & Games", icon: Gamepad2 },
        { name: "Sports", icon: Dumbbell },
        { name: "Books", icon: BookOpen },
        { name: "Grocery", icon: ShoppingBasket },
        { name: "Offers", icon: Tag }
    ];

    const handleLogout = async () => {
        try {
            const user = auth.currentUser;

            if (user) {
                const token = await user.getIdToken();

                await axios.post("http://localhost:5000/api/users/logout", {}, {
                    headers: {
                        Authorization: "Bearer " + token
                    }
                });
            }
        } catch (error) {
            console.log("Logout history error:", error.message);
        }

        try {
            await signOut(auth);
            setAccountOpen(false);
            navigate("/");
        } catch (error) {
            console.log("Firebase logout error:", error.message);
        }
    };

    return (
        <header className="w-full bg-white">
            {/* Main Navbar */}
            <nav className="mx-auto flex max-w-[1440px] items-center gap-4 px-4 py-3 sm:px-6 lg:gap-8 lg:px-10">
                <Link to="/" className="shrink-0">
                    <img src="/images/jd-hub-logo.png" alt="JD Hub" className="h-auto w-[125px] object-contain sm:w-[160px]" />
                </Link>

                {/* Desktop Search */}
                <form onSubmit={(e) => e.preventDefault()} className="hidden h-11 min-w-0 flex-1 items-center overflow-hidden rounded-lg border border-slate-200 bg-slate-50 md:flex">
                    <Search size={20} className="ml-3 shrink-0 text-blue-950" />
                    <input type="text" value={searchText} onChange={(e) => setSearchText(e.target.value)} placeholder="Search for products, brands and more..." className="w-full bg-transparent px-3 text-sm outline-none" />
                    <button type="submit" className="flex h-full w-14 shrink-0 items-center justify-center bg-yellow-400 text-blue-950 hover:bg-yellow-300"><Search size={21} /></button>
                </form>

                {/* Navbar Actions */}
                <div className="ml-auto flex shrink-0 items-center gap-3 text-blue-950 sm:gap-5 lg:gap-6">

                    {/* Account Dropdown */}
                    <div className="relative">
                        <button type="button" onClick={() => setAccountOpen(!accountOpen)} className="flex items-center gap-2 text-sm hover:text-blue-600">
                            <UserRound size={23} />
                            <span className="hidden sm:inline">Account</span>
                            <ChevronDown size={14} className="hidden sm:block" />
                        </button>

                        {accountOpen && (
                            <div className="absolute right-0 top-full z-40 mt-3 w-[300px] rounded-xl border border-slate-100 bg-white p-3 text-blue-950 shadow-xl sm:w-[340px]">

                                {!isLoggedIn ? (
                                    <div className="rounded-xl bg-blue-50 p-4 text-blue-950">
                                        <div className="flex items-center gap-3">
                                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-blue-700 shadow-sm">
                                                <UserRound size={27} />
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-[#10245A]">Welcome to JD Hub!</h3>
                                                <p className="mt-1 text-xs text-slate-600">Login to access your account</p>
                                            </div>
                                        </div>

                                        <div className="mt-4 grid grid-cols-2 gap-2">
                                            <Link to="/login" onClick={() => setAccountOpen(false)} className="rounded-lg bg-[#FFC800] py-2.5 text-center text-sm font-semibold text-[#10245A] hover:bg-yellow-300">Login</Link>
                                            <Link to="/signup" onClick={() => setAccountOpen(false)} className="rounded-lg border border-blue-100 bg-white py-2.5 text-center text-sm font-semibold text-[#10245A] hover:bg-blue-100">Sign Up</Link>
                                        </div>
                                    </div>
                                ) : (
                                    <>
                                        <div className="rounded-xl bg-blue-50 p-4 text-blue-950">
                                            <div className="flex items-center gap-3">
                                                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-blue-700 shadow-sm">
                                                    <UserRound size={27} />
                                                </div>
                                                <div>
                                                    <h3 className="font-bold text-[#10245A]">Welcome Back!</h3>
                                                    <p className="mt-1 text-xs text-slate-600">Manage your JD Hub account</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="px-1 py-3">
                                            <h3 className="px-2 pb-2 text-sm font-bold text-[#10245A]">Your Account</h3>

                                            <div className="grid grid-cols-2 gap-2">
                                                <Link to="/profile" onClick={() => setAccountOpen(false)} className="flex flex-col gap-2 rounded-lg border border-slate-100 bg-white p-3 text-sm text-[#10245A] hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"><UserRound size={21} /> My Profile</Link>
                                                <Link to="/orders" onClick={() => setAccountOpen(false)} className="flex flex-col gap-2 rounded-lg border border-slate-100 bg-white p-3 text-sm text-[#10245A] hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"><Package size={21} /> My Orders</Link>
                                                <Link to="/wishlist" onClick={() => setAccountOpen(false)} className="flex flex-col gap-2 rounded-lg border border-slate-100 bg-white p-3 text-sm text-[#10245A] hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"><Heart size={21} /> Wishlist</Link>
                                                <Link to="/notifications" onClick={() => setAccountOpen(false)} className="flex flex-col gap-2 rounded-lg border border-slate-100 bg-white p-3 text-sm text-[#10245A] hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"><Bell size={21} /> Notifications</Link>
                                            </div>
                                        </div>

                                        <div className="border-t border-slate-100 pt-2">
                                            <Link to="/help" onClick={() => setAccountOpen(false)} className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm text-[#10245A] hover:bg-blue-50 hover:text-blue-700"><Headset size={20} /> Help & Support</Link>
                                            <button type="button" onClick={handleLogout} className="flex w-full items-center gap-3 rounded-lg px-3 py-3 text-left text-sm text-red-600 hover:bg-red-50"><LogOut size={20} /> Logout</button>
                                        </div>
                                    </>
                                )}
                            </div>
                        )}
                    </div>

                    <Link to="/wishlist" className="flex items-center gap-2 text-sm hover:text-blue-600"><Heart size={24} /><span className="hidden lg:inline">Wishlist</span></Link>
                    <Link to="/cart" className="flex items-center gap-2 text-sm hover:text-blue-600"><ShoppingCart size={24} /><span className="hidden sm:inline">Cart</span></Link>
                </div>
            </nav>

            {/* Mobile Search */}
            <div className="px-4 pb-3 sm:px-6 md:hidden">
                <form onSubmit={(e) => e.preventDefault()} className="flex h-11 w-full items-center overflow-hidden rounded-lg border border-slate-200 bg-slate-50">
                    <Search size={20} className="ml-3 shrink-0 text-blue-950" />
                    <input type="text" value={searchText} onChange={(e) => setSearchText(e.target.value)} placeholder="Search for products, brands and more..." className="w-full bg-transparent px-3 text-sm outline-none" />
                    <button type="submit" className="flex h-full w-12 shrink-0 items-center justify-center bg-yellow-400 text-blue-950 hover:bg-yellow-300"><Search size={20} /></button>
                </form>
            </div>

            {/* Category Navbar */}
            <div className="relative bg-blue-700 text-white">
                <div className="category-scroll mx-auto flex max-w-[1440px] items-center gap-5 overflow-x-auto whitespace-nowrap px-4 sm:gap-7 sm:px-6 lg:justify-between lg:gap-6 lg:px-10">
                    <button type="button" onClick={() => setOpen(!open)} className="flex shrink-0 items-center gap-2 py-3 text-sm font-semibold hover:text-yellow-300">
                        <Menu size={19} /> All Categories <ChevronDown size={14} />
                    </button>

                    {categories.map((category) => (
                        <Link key={category.name} to={`/products?category=${encodeURIComponent(category.name)}`} className="shrink-0 py-3 text-sm hover:text-yellow-300">{category.name}</Link>
                    ))}
                </div>

                {/* All Categories Dropdown */}
                {open && (
                    <div className="absolute left-2 top-full z-30 w-[calc(100%-16px)] max-w-[420px] rounded-xl border border-slate-100 bg-white p-3 text-blue-950 shadow-xl sm:left-6 lg:left-10">
                        <div className="mb-3 px-2 py-2">
                            <h3 className="text-base font-bold text-[#10245A]">Shop by Category</h3>
                            <p className="mt-1 text-xs text-slate-500">Explore our product categories</p>
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                            {categories.map((category) => {
                                const CategoryIcon = category.icon;

                                return (
                                    <Link key={category.name} to={`/products?category=${encodeURIComponent(category.name)}`} onClick={() => setOpen(false)} className="flex items-center gap-2 rounded-lg border-b-2 border-transparent px-3 py-3 text-sm text-[#10245A] transition-all duration-200 hover:border-blue-700 hover:bg-blue-50 hover:text-blue-700 focus:border-blue-700 focus:bg-blue-50 focus:outline-none">
                                        <CategoryIcon size={19} className="shrink-0" />
                                        <span>{category.name}</span>
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                )}
            </div>
        </header>
    );
}

export default Navbar;
