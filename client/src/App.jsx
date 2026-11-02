
import { useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/navbar/Navbar'
import HeroSection from './components/home/HeroSection'
import AdBanner from './components/home/AdBanner'
import CategoryNav from './components/home/CategoryNav'
import Products from './pages/Products'
import ProductDetails from './pages/ProductDetails'
import FeaturedProducts from './components/home/FeaturedProducts'
import BenefitsSection from './components/home/BenefitsSection'
import PopularProducts from './components/home/PopularProducts'
import Footer from './components/footer/Footer'
import SignUp from './pages/auth/SignUp'
import Login from './pages/auth/Login'
import ForgotPassword from './pages/auth/ForgotPassword'
import Wishlist from './pages/Wishlist'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import Profile from './pages/account/Profile'
import Orders from './pages/account/Orders'
import OrderDetails from './pages/account/OrderDetails'
import Notifications from './pages/account/Notifications'
import HelpSupport from './pages/account/HelpSupport'
import AdminDashboard from './pages/admin/AdminDashboard'
import AdminRoute from "./pages/admin/AdminRoute";
import Unauthorized from './pages/Unauthorized'
import { useAuth } from './context/AuthContext'

function ProtectedRoute({ children }) {
    const { user, loading } = useAuth()

    if (loading) return <p className="p-8 text-center">Loading...</p>

    return user ? children : <Navigate to="/login" replace />
}

function GuestRoute({ children }) {
    const { user, loading } = useAuth()

    if (loading) return <p className="p-8 text-center">Loading...</p>

    return user ? <Navigate to="/" replace /> : children
}

function App() {
    const [searchText, setSearchText] = useState('')

    return (
        <BrowserRouter>
            <Routes>
                {/* Authentication Pages */}
                <Route path="/Signup" element={<GuestRoute><SignUp /></GuestRoute>} />
                <Route path="/login" element={<GuestRoute><Login /></GuestRoute>} />
                <Route path="/forgot-password" element={<GuestRoute><ForgotPassword /></GuestRoute>} />

                {/* Home Page */}
                <Route path="/" element={
                    <>
                        <Navbar searchText={searchText} setSearchText={setSearchText} />
                        <HeroSection />
                        <AdBanner />
                        <CategoryNav />
                        <FeaturedProducts />
                        <BenefitsSection />
                        <PopularProducts searchText={searchText} />
                        <Footer />
                    </>
                } />

                {/* Products Page */}
                <Route path="/products" element={
                    <ProtectedRoute>
                        <>
                            <Navbar searchText={searchText} setSearchText={setSearchText} />
                            <Products />
                            <Footer />
                        </>
                    </ProtectedRoute>
                } />

                {/* Product Details */}
                <Route path="/products/:id" element={
                    <ProtectedRoute>
                        <>
                            <Navbar searchText={searchText} setSearchText={setSearchText} />
                            <ProductDetails />
                            <Footer />
                        </>
                    </ProtectedRoute>
                } />

                {/* Wishlist */}
                <Route path="/wishlist" element={
                    <ProtectedRoute>
                        <>
                            <Navbar searchText={searchText} setSearchText={setSearchText} />
                            <Wishlist />
                            <Footer />
                        </>
                    </ProtectedRoute>
                } />

                {/* Cart */}
                <Route path="/cart" element={
                    <ProtectedRoute>
                        <>
                            <Navbar searchText={searchText} setSearchText={setSearchText} />
                            <Cart />
                            <Footer />
                        </>
                    </ProtectedRoute>
                } />

                {/* Checkout */}
                <Route path="/checkout" element={
                    <ProtectedRoute>
                        <>
                            <Navbar searchText={searchText} setSearchText={setSearchText} />
                            <Checkout />
                            <Footer />
                        </>
                    </ProtectedRoute>
                } />

                {/* My Profile */}
                <Route path="/profile" element={
                    <ProtectedRoute>
                        <>
                            <Navbar searchText={searchText} setSearchText={setSearchText} />
                            <Profile />
                            <Footer />
                        </>
                    </ProtectedRoute>
                } />

                {/* My Orders */}
                <Route path="/orders" element={
                    <ProtectedRoute>
                        <>
                            <Navbar searchText={searchText} setSearchText={setSearchText} />
                            <Orders />
                            <Footer />
                        </>
                    </ProtectedRoute>
                } />

                {/* Order Details */}
                <Route path="/orders/:id" element={
                    <ProtectedRoute>
                        <>
                            <Navbar searchText={searchText} setSearchText={setSearchText} />
                            <OrderDetails />
                            <Footer />
                        </>
                    </ProtectedRoute>
                } />

                {/* Notifications */}
                <Route path="/notifications" element={
                    <ProtectedRoute>
                        <>
                            <Navbar searchText={searchText} setSearchText={setSearchText} />
                            <Notifications />
                            <Footer />
                        </>
                    </ProtectedRoute>
                } />

                {/* Help & Support */}
                <Route path="/help" element={
                    <ProtectedRoute>
                        <>
                            <Navbar searchText={searchText} setSearchText={setSearchText} />
                            <HelpSupport />
                            <Footer />
                        </>
                    </ProtectedRoute>
                } />

                {/* Admin Dashboard */}
                <Route path="/admin" element={
                    <AdminRoute>
                        <AdminDashboard />
                    </AdminRoute>
                } />

                {/* Unauthorized */}
                <Route path="/unauthorized" element={<Unauthorized />} />

                {/* Page Not Found */}
                <Route path="*" element={<h1 className="p-8 text-2xl font-bold">Page not found</h1>} />
            </Routes>
        </BrowserRouter>
    )
}

export default App
