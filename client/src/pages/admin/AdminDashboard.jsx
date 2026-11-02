
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function AdminDashboard() {
    const { dbUser, logout } = useAuth();
    const navigate = useNavigate();

    async function handleLogout() {
        await logout();
        navigate("/login");
    }

    return (
        <div className="min-h-screen bg-slate-50">

            {/* Top Navbar */}
            <header className="sticky top-0 z-50 flex flex-wrap items-center justify-between gap-4 border-b bg-white px-5 py-3 shadow-sm md:px-8">
                <img src="/images/jd-hub-logo.png" alt="JD Hub" className="h-14 w-40 object-contain object-left" />

                <div className="hidden max-w-xl flex-1 items-center rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 md:flex">
                    <span className="mr-3 text-xl text-blue-900">⌕</span>
                    <input type="text" placeholder="Search products, orders, users..." className="w-full bg-transparent text-sm outline-none" />
                </div>

                <div className="flex items-center gap-4">
                    <button className="relative text-2xl text-blue-950">♧<span className="absolute right-0 top-0 h-2 w-2 rounded-full bg-red-500"></span></button>
                    <div className="flex items-center gap-2 border-l pl-4">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-700 font-bold text-white">
                            {dbUser?.name?.charAt(0).toUpperCase() || "A"}
                        </div>
                        <div>
                            <p className="text-sm font-bold text-blue-950">{dbUser?.name || "Admin"}</p>
                            <p className="text-xs text-gray-500">Administrator</p>
                        </div>
                        <button onClick={handleLogout} className="ml-2 text-sm font-semibold text-red-600 hover:text-red-700">Logout</button>
                    </div>
                </div>
            </header>

            <div className="flex">

                {/* Sidebar */}
                <aside className="hidden min-h-[calc(100vh-81px)] w-64 flex-col border-r border-blue-100 bg-white p-5 md:flex">
                    <p className="mb-4 px-3 text-xs font-bold uppercase tracking-widest text-gray-400">Main Menu</p>

                    <a href="#dashboard" className="mb-2 flex items-center gap-3 rounded-xl bg-blue-100 px-4 py-3 font-bold text-blue-800">
                        <span className="text-xl">⌂</span> Dashboard
                    </a>

                    <a href="#products" className="mb-2 flex items-center gap-3 rounded-xl px-4 py-3 font-semibold text-gray-700 transition hover:bg-blue-50 hover:text-blue-800">
                        <span className="text-xl">▣</span> Products
                    </a>

                    <a href="#orders" className="mb-2 flex items-center gap-3 rounded-xl px-4 py-3 font-semibold text-gray-700 transition hover:bg-blue-50 hover:text-blue-800">
                        <span className="text-xl">🛒</span> Orders
                    </a>

                    <a href="#users" className="mb-2 flex items-center gap-3 rounded-xl px-4 py-3 font-semibold text-gray-700 transition hover:bg-blue-50 hover:text-blue-800">
                        <span className="text-xl">♙</span> Users
                    </a>

                    <a href="#analytics" className="mb-2 flex items-center gap-3 rounded-xl px-4 py-3 font-semibold text-gray-700 transition hover:bg-blue-50 hover:text-blue-800">
                        <span className="text-xl">▥</span> Analytics
                    </a>

                    <a href="#settings" className="mb-2 flex items-center gap-3 rounded-xl px-4 py-3 font-semibold text-gray-700 transition hover:bg-blue-50 hover:text-blue-800">
                        <span className="text-xl">⚙</span> Settings
                    </a>

                    <div className="mt-auto">
                        <button onClick={() => navigate("/")} className="w-full rounded-xl border-2 border-blue-200 px-4 py-3 font-bold text-blue-900 transition hover:bg-blue-50">
                            ↗ Back to Store
                        </button>
                    </div>
                </aside>

                {/* Dashboard Content */}
                <main id="dashboard" className="min-w-0 flex-1 p-4 md:p-7 lg:p-8">

                    {/* Welcome Banner */}
                    <section className="relative mb-6 flex min-h-44 items-center justify-between overflow-hidden rounded-2xl bg-gradient-to-r from-blue-100 via-blue-50 to-yellow-100 p-6 md:p-9">
                        <div className="relative z-10">
                            <p className="mb-2 text-sm font-bold uppercase tracking-widest text-blue-700">JD Hub Admin Panel</p>
                            <h1 className="text-2xl font-extrabold text-blue-950 md:text-4xl">Welcome back, {dbUser?.name || "Admin"}!</h1>
                            <p className="mt-3 text-sm text-gray-600 md:text-base">Manage your store and keep everything running smoothly.</p>
                        </div>
                        <div className="hidden text-7xl md:block">🛍️</div>
                    </section>

                    {/* Summary Cards */}
                    <section className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

                        <div className="rounded-2xl border border-blue-100 bg-white p-5 shadow-sm">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-500">Total Products</p>
                                    <h2 className="mt-2 text-3xl font-extrabold text-blue-950">—</h2>
                                </div>
                                <div className="rounded-xl bg-blue-100 p-4 text-2xl">▣</div>
                            </div>
                            <p className="mt-4 text-xs text-gray-400">Waiting for product API</p>
                        </div>

                        <div className="rounded-2xl border border-yellow-100 bg-white p-5 shadow-sm">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-500">Total Orders</p>
                                    <h2 className="mt-2 text-3xl font-extrabold text-blue-950">—</h2>
                                </div>
                                <div className="rounded-xl bg-yellow-100 p-4 text-2xl">🛒</div>
                            </div>
                            <p className="mt-4 text-xs text-gray-400">Waiting for order API</p>
                        </div>

                        <div className="rounded-2xl border border-purple-100 bg-white p-5 shadow-sm">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-500">Total Users</p>
                                    <h2 className="mt-2 text-3xl font-extrabold text-blue-950">—</h2>
                                </div>
                                <div className="rounded-xl bg-purple-100 p-4 text-2xl">♙</div>
                            </div>
                            <p className="mt-4 text-xs text-gray-400">Waiting for user API</p>
                        </div>

                        <div className="rounded-2xl border border-green-100 bg-white p-5 shadow-sm">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-500">Total Revenue</p>
                                    <h2 className="mt-2 text-3xl font-extrabold text-blue-950">—</h2>
                                </div>
                                <div className="rounded-xl bg-green-100 p-4 text-2xl">₹</div>
                            </div>
                            <p className="mt-4 text-xs text-gray-400">Waiting for payment data</p>
                        </div>

                    </section>

                    {/* Sales and Order Status */}
                    <section className="mb-6 grid grid-cols-1 gap-5 xl:grid-cols-2">

                        <div id="analytics" className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
                            <div className="mb-6 flex items-center justify-between">
                                <h2 className="text-lg font-extrabold text-blue-950">▥ Sales Overview</h2>
                                <select className="rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none">
                                    <option>Last 7 Days</option>
                                    <option>Last 30 Days</option>
                                    <option>Last 12 Months</option>
                                </select>
                            </div>
                            <div className="flex min-h-52 flex-col items-center justify-center rounded-xl bg-blue-50/60 p-5 text-center">
                                <span className="text-4xl text-blue-400">▥</span>
                                <p className="mt-3 font-semibold text-gray-600">Sales analytics will appear here</p>
                                <p className="mt-1 text-sm text-gray-400">Connect order and payment data to view your sales.</p>
                            </div>
                        </div>

                        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
                            <h2 className="mb-6 text-lg font-extrabold text-blue-950">▣ Order Status</h2>
                            <div className="flex min-h-52 flex-col items-center justify-center rounded-xl bg-yellow-50/50 p-5 text-center">
                                <span className="text-4xl text-yellow-500">◷</span>
                                <p className="mt-3 font-semibold text-gray-600">No order statistics available</p>
                                <p className="mt-1 text-sm text-gray-400">Order status information will appear here.</p>
                            </div>
                        </div>

                    </section>

                    {/* Products and Recent Orders */}
                    <section className="grid grid-cols-1 gap-5 xl:grid-cols-2">

                        <div id="products" className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
                            <div className="mb-5 flex items-center justify-between">
                                <h2 className="text-lg font-extrabold text-blue-950">⭐ Top Selling Products</h2>
                                <button onClick={() => navigate("/admin/products")} className="text-sm font-bold text-blue-700 hover:underline">View All →</button>
                            </div>
                            <div className="flex min-h-40 flex-col items-center justify-center rounded-xl bg-gray-50 p-5 text-center">
                                <span className="text-4xl">📦</span>
                                <p className="mt-3 font-semibold text-gray-600">Product sales will appear here</p>
                                <p className="mt-1 text-sm text-gray-400">Connect product and order data to see best sellers.</p>
                            </div>
                        </div>

                        <div id="orders" className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
                            <div className="mb-5 flex items-center justify-between">
                                <h2 className="text-lg font-extrabold text-blue-950">▤ Recent Orders</h2>
                                <button onClick={() => navigate("/admin/orders")} className="text-sm font-bold text-blue-700 hover:underline">View All →</button>
                            </div>
                            <div className="flex min-h-40 flex-col items-center justify-center rounded-xl bg-gray-50 p-5 text-center">
                                <span className="text-4xl">🛒</span>
                                <p className="mt-3 font-semibold text-gray-600">Recent orders will appear here</p>
                                <p className="mt-1 text-sm text-gray-400">Connect the order API to view customer orders.</p>
                            </div>
                        </div>

                    </section>

                    <p className="mt-8 text-center text-xs text-gray-400">© {new Date().getFullYear()} JD Hub. Admin Dashboard.</p>

                </main>
            </div>
        </div>
    );
}

export default AdminDashboard;
