
import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useShop } from "../context/ShopContext";
import { useAuth } from "../context/AuthContext";
import { MapPin, CreditCard, ShoppingBag, Truck, CheckCircle } from "lucide-react";
import API_URL from "../config/api";

function Checkout() {
    const { cart, removeOrderedItems } = useShop();
    const { user } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const selectedItems = location.state?.selectedItems || [];
    const selectedIds = selectedItems.map((item) => item._id);

    const [paymentMethod, setPaymentMethod] = useState("COD");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [orderPlaced, setOrderPlaced] = useState(false);

    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        email: "",
        address: "",
        city: "",
        state: "",
        pincode: ""
    });

    const subtotal = selectedItems.reduce((total, item) => {
        return total + item.price * item.quantity;
    }, 0);

    const deliveryCharge = subtotal > 0 ? 50 : 0;
    const total = subtotal + deliveryCharge;

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    async function loadRazorpay() {
        if (window.Razorpay) return true;

        return new Promise((resolve) => {
            const script = document.createElement("script");
            script.src = "https://checkout.razorpay.com/v1/checkout.js";
            script.onload = () => resolve(true);
            script.onerror = () => resolve(false);
            document.body.appendChild(script);
        });
    }

    function orderSuccess() {
        removeOrderedItems(selectedIds);
        setOrderPlaced(true);
        setLoading(false);
    }

    async function handleCOD() {
        try {
            const token = await user.getIdToken();

            const response = await fetch(`${API_URL}/api/orders`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({
                    customer: formData,
                    items: selectedItems.map((item) => ({
                        productId: item._id,
                        quantity: item.quantity
                    }))
                })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Unable to place order");
            }

            orderSuccess();
        } catch (error) {
            setMessage(error.message);
            setLoading(false);
        }
    }

    async function handleRazorpay() {
        try {
            const loaded = await loadRazorpay();

            if (!loaded) {
                throw new Error("Razorpay could not be loaded");
            }

            const token = await user.getIdToken();

            const response = await fetch(`${API_URL}/api/payment/create-order`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({
                    customer: formData,
                    items: selectedItems.map((item) => ({
                        productId: item._id,
                        quantity: item.quantity
                    }))
                })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Unable to create payment");
            }

            const options = {
                key: import.meta.env.VITE_RAZORPAY_KEY_ID,
                amount: data.order.amount,
                currency: data.order.currency,
                name: "JD Hub",
                description: "Order Payment",
                order_id: data.order.id,
                prefill: {
                    name: formData.name,
                    email: formData.email,
                    contact: formData.phone
                },
                theme: {
                    color: "#2563eb"
                },
                handler: async function (payment) {
                    try {
                        const verifyResponse = await fetch(`${API_URL}/api/payment/verify-payment`, {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                                Authorization: `Bearer ${token}`
                            },
                            body: JSON.stringify({
                                razorpay_order_id: payment.razorpay_order_id,
                                razorpay_payment_id: payment.razorpay_payment_id,
                                razorpay_signature: payment.razorpay_signature
                            })
                        });

                        const verifyData = await verifyResponse.json();

                        if (!verifyResponse.ok) {
                            throw new Error(verifyData.message || "Payment verification failed");
                        }

                        orderSuccess();
                    } catch (error) {
                        setMessage(error.message);
                        setLoading(false);
                    }
                },
                modal: {
                    ondismiss: () => setLoading(false)
                }
            };

            const razorpay = new window.Razorpay(options);
            razorpay.open();
        } catch (error) {
            setMessage(error.message);
            setLoading(false);
        }
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setMessage("");

        if (selectedItems.length === 0) {
            setMessage("Please select products from your cart.");
            return;
        }

        if (!user) {
            setMessage("Please login first");
            return;
        }

        setLoading(true);

        if (paymentMethod === "COD") {
            await handleCOD();
        } else {
            await handleRazorpay();
        }
    }

    const validItems = selectedItems.length > 0 && selectedItems.every((item) =>
        cart.some((cartItem) => cartItem._id === item._id)
    );

    if (!validItems) {
        return (
            <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-5 text-center">
                <ShoppingBag size={65} className="text-gray-300" />
                <h2 className="mt-5 text-2xl font-bold text-blue-950">No Products Selected</h2>
                <p className="mt-2 text-gray-500">Please select products from your cart.</p>
                <Link to="/cart" className="mt-6 rounded-lg bg-blue-700 px-6 py-3 font-semibold text-white hover:bg-blue-800">
                    Back to Cart
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 px-4 py-10 sm:px-8 lg:px-16">
            <div className="mx-auto max-w-7xl">
                <h1 className="text-3xl font-extrabold text-blue-950">Checkout</h1>
                <p className="mt-2 text-gray-500">Complete your details and place your order.</p>

                <form onSubmit={handleSubmit} className="mt-8 grid grid-cols-1 items-start gap-8 lg:grid-cols-3">
                    <div className="space-y-6 lg:col-span-2">
                        <div className="rounded-2xl border bg-white p-6 shadow-sm">
                            <div className="mb-6 flex items-center gap-3">
                                <MapPin className="text-blue-700" size={24} />
                                <h2 className="text-xl font-bold text-blue-950">Delivery Address</h2>
                            </div>

                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                <input name="name" value={formData.name} onChange={handleChange} placeholder="Full Name" required className="rounded-lg border p-3 outline-none focus:border-blue-600" />
                                <input name="phone" type="tel" value={formData.phone} onChange={handleChange} placeholder="Phone Number" pattern="[0-9]{10}" required className="rounded-lg border p-3 outline-none focus:border-blue-600" />
                                <input name="email" type="email" value={formData.email} onChange={handleChange} placeholder="Email Address" required className="rounded-lg border p-3 outline-none focus:border-blue-600 sm:col-span-2" />
                                <textarea name="address" value={formData.address} onChange={handleChange} placeholder="House No, Street, Area" required rows="3" className="rounded-lg border p-3 outline-none focus:border-blue-600 sm:col-span-2"></textarea>
                                <input name="city" value={formData.city} onChange={handleChange} placeholder="City" required className="rounded-lg border p-3 outline-none focus:border-blue-600" />
                                <input name="state" value={formData.state} onChange={handleChange} placeholder="State" required className="rounded-lg border p-3 outline-none focus:border-blue-600" />
                                <input name="pincode" value={formData.pincode} onChange={handleChange} placeholder="PIN Code" pattern="[0-9]{6}" required className="rounded-lg border p-3 outline-none focus:border-blue-600" />
                            </div>
                        </div>

                        <div className="rounded-2xl border bg-white p-6 shadow-sm">
                            <div className="mb-6 flex items-center gap-3">
                                <CreditCard className="text-blue-700" size={24} />
                                <h2 className="text-xl font-bold text-blue-950">Payment Method</h2>
                            </div>

                            <div className="space-y-4">
                                <label className="flex cursor-pointer items-center gap-4 rounded-xl border p-4">
                                    <input type="radio" name="payment" value="COD" checked={paymentMethod === "COD"} onChange={(e) => setPaymentMethod(e.target.value)} />
                                    <Truck className="text-blue-700" size={25} />
                                    <div>
                                        <h3 className="font-bold text-blue-950">Cash on Delivery</h3>
                                        <p className="text-sm text-gray-500">Pay when your order arrives.</p>
                                    </div>
                                </label>

                                <label className="flex cursor-pointer items-center gap-4 rounded-xl border p-4">
                                    <input type="radio" name="payment" value="Razorpay" checked={paymentMethod === "Razorpay"} onChange={(e) => setPaymentMethod(e.target.value)} />
                                    <CreditCard className="text-blue-700" size={25} />
                                    <div>
                                        <h3 className="font-bold text-blue-950">Razorpay</h3>
                                        <p className="text-sm text-gray-500">Pay online using supported payment methods.</p>
                                    </div>
                                </label>
                            </div>
                        </div>
                    </div>

                    <div className="rounded-2xl border bg-white p-6 shadow-sm lg:sticky lg:top-6">
                        <h2 className="mb-6 text-xl font-bold text-blue-950">Order Summary</h2>

                        <div className="max-h-72 space-y-4 overflow-y-auto">
                            {selectedItems.map((item) => (
                                <div key={item._id} className="flex gap-3">
                                    <img src={item.images?.[0] || item.image || "https://placehold.co/100x100?text=Product"} alt={item.name} className="h-16 w-16 rounded-lg object-cover" />
                                    <div className="flex-1">
                                        <h3 className="font-semibold text-blue-950">{item.name}</h3>
                                        <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                                        <p className="font-bold text-blue-950">₹{(item.price * item.quantity).toLocaleString("en-IN")}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="my-5 border-t"></div>

                        <div className="space-y-3 text-sm">
                            <div className="flex justify-between text-gray-600">
                                <span>Subtotal</span>
                                <span>₹{subtotal.toLocaleString("en-IN")}</span>
                            </div>
                            <div className="flex justify-between text-gray-600">
                                <span>Delivery Charges</span>
                                <span>₹{deliveryCharge}</span>
                            </div>
                            <div className="flex justify-between border-t pt-4 text-lg font-extrabold text-blue-950">
                                <span>Total Amount</span>
                                <span>₹{total.toLocaleString("en-IN")}</span>
                            </div>
                        </div>

                        {message && (
                            <p className="mt-4 rounded-lg bg-blue-50 p-3 text-sm text-blue-700">{message}</p>
                        )}

                        <button type="submit" disabled={loading} className="mt-6 w-full rounded-lg bg-blue-700 py-3 font-bold text-white hover:bg-blue-800 disabled:opacity-60">
                            {loading ? "Please wait..." : paymentMethod === "COD" ? "Place Order" : "Pay Now"}
                        </button>

                        <p className="mt-4 text-center text-xs text-gray-400">Your order details are protected.</p>
                    </div>
                </form>
            </div>

            {orderPlaced && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
                    <div className="w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-xl">
                        <CheckCircle size={65} className="mx-auto text-green-600" />
                        <h2 className="mt-4 text-2xl font-bold text-blue-950">Order Placed Successfully!</h2>
                        <p className="mt-2 text-gray-500">Thank you for shopping with JD Hub.</p>
                        <button type="button" onClick={() => navigate("/orders")} className="mt-6 w-full rounded-lg bg-blue-700 py-3 font-bold text-white hover:bg-blue-800">
                            View My Orders
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Checkout;
