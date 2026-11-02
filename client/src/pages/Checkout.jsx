
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useShop } from "../context/ShopContext";
import { MapPin, CreditCard, ShoppingBag, Truck } from "lucide-react";
import API_URL from "../config/api";

function Checkout() {
    const { cart } = useShop();
    const navigate = useNavigate();

    const [paymentMethod, setPaymentMethod] = useState("COD");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        email: "",
        address: "",
        city: "",
        state: "",
        pincode: ""
    });

    const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
    const deliveryCharge = subtotal > 0 ? 50 : 0;
    const total = subtotal + deliveryCharge;

    function handleChange(e) {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    async function loadRazorpay() {
        return new Promise((resolve) => {
            const script = document.createElement("script");
            script.src = "https://checkout.razorpay.com/v1/checkout.js";
            script.onload = () => resolve(true);
            script.onerror = () => resolve(false);
            document.body.appendChild(script);
        });
    }

    async function handleCOD() {
        try {
            const response = await fetch(`${API_URL}/api/orders`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    customer: formData,
                    products: cart,
                    subtotal,
                    deliveryCharge,
                    total,
                    paymentMethod: "COD",
                    paymentStatus: "Pending"
                })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Order failed");
            }

            setMessage("Your order has been placed successfully!");
            navigate("/");
        } catch (error) {
            setMessage(error.message);
        }
    }

    async function handleRazorpay() {
        try {
            const loaded = await loadRazorpay();

            if (!loaded) {
                setMessage("Razorpay could not be loaded. Please try again.");
                return;
            }

            const response = await fetch(`${API_URL}/api/payment/create-order`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ amount: total * 100 })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Unable to create payment");
            }

            const options = {
                key: import.meta.env.VITE_RAZORPAY_KEY_ID,
                amount: data.amount,
                currency: data.currency || "INR",
                name: "JD Hub",
                description: "Order Payment",
                order_id: data.id,
                handler: async function (payment) {
                    try {
                        const verifyResponse = await fetch(`${API_URL}/api/payment/verify`, {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({
                                razorpay_order_id: payment.razorpay_order_id,
                                razorpay_payment_id: payment.razorpay_payment_id,
                                razorpay_signature: payment.razorpay_signature,
                                customer: formData,
                                products: cart
                            })
                        });

                        const verifyData = await verifyResponse.json();

                        if (!verifyResponse.ok) {
                            throw new Error(verifyData.message || "Payment verification failed");
                        }

                        setMessage("Payment successful! Your order is confirmed.");
                        navigate("/");
                    } catch (error) {
                        setMessage(error.message);
                    }
                },
                prefill: {
                    name: formData.name,
                    email: formData.email,
                    contact: formData.phone
                },
                theme: { color: "#2563eb" }
            };

            const razorpay = new window.Razorpay(options);
            razorpay.open();
        } catch (error) {
            setMessage(error.message);
        }
    }

    async function handleSubmit(e) {
        e.preventDefault();

        if (cart.length === 0) {
            setMessage("Your cart is empty.");
            return;
        }

        setLoading(true);
        setMessage("");

        if (paymentMethod === "COD") {
            await handleCOD();
        } else {
            await handleRazorpay();
        }

        setLoading(false);
    }

    if (cart.length === 0) {
        return (
            <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-5 text-center">
                <ShoppingBag size={65} className="text-gray-300" />
                <h2 className="mt-5 text-2xl font-bold text-blue-950">Your Cart is Empty</h2>
                <p className="mt-2 text-gray-500">Add some products before checkout.</p>
                <Link to="/products" className="mt-6 rounded-lg bg-blue-700 px-6 py-3 font-semibold text-white hover:bg-blue-800">Explore Products</Link>
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
                                <input name="phone" type="tel" value={formData.phone} onChange={handleChange} placeholder="Phone Number" pattern="[0-9]{10}" title="Enter a 10-digit phone number" required className="rounded-lg border p-3 outline-none focus:border-blue-600" />
                                <input name="email" type="email" value={formData.email} onChange={handleChange} placeholder="Email Address" required className="rounded-lg border p-3 outline-none focus:border-blue-600 sm:col-span-2" />
                                <textarea name="address" value={formData.address} onChange={handleChange} placeholder="House No, Street, Area" required rows="3" className="rounded-lg border p-3 outline-none focus:border-blue-600 sm:col-span-2"></textarea>
                                <input name="city" value={formData.city} onChange={handleChange} placeholder="City" required className="rounded-lg border p-3 outline-none focus:border-blue-600" />
                                <input name="state" value={formData.state} onChange={handleChange} placeholder="State" required className="rounded-lg border p-3 outline-none focus:border-blue-600" />
                                <input name="pincode" value={formData.pincode} onChange={handleChange} placeholder="PIN Code" pattern="[0-9]{6}" title="Enter a 6-digit PIN code" required className="rounded-lg border p-3 outline-none focus:border-blue-600" />
                            </div>
                        </div>

                        <div className="rounded-2xl border bg-white p-6 shadow-sm">
                            <div className="mb-6 flex items-center gap-3">
                                <CreditCard className="text-blue-700" size={24} />
                                <h2 className="text-xl font-bold text-blue-950">Payment Method</h2>
                            </div>

                            <div className="space-y-4">
                                <label className={`flex cursor-pointer items-center gap-4 rounded-xl border p-4 ${paymentMethod === "COD" ? "border-blue-600 bg-blue-50" : "border-gray-200"}`}>
                                    <input type="radio" name="payment" value="COD" checked={paymentMethod === "COD"} onChange={(e) => setPaymentMethod(e.target.value)} />
                                    <Truck className="text-blue-700" size={25} />
                                    <div>
                                        <h3 className="font-bold text-blue-950">Cash on Delivery</h3>
                                        <p className="text-sm text-gray-500">Pay when your order arrives.</p>
                                    </div>
                                </label>

                                <label className={`flex cursor-pointer items-center gap-4 rounded-xl border p-4 ${paymentMethod === "Razorpay" ? "border-blue-600 bg-blue-50" : "border-gray-200"}`}>
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
                            {cart.map((item) => (
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

                        {message && <p className="mt-4 rounded-lg bg-blue-50 p-3 text-sm text-blue-700">{message}</p>}

                        <button type="submit" disabled={loading} className="mt-6 w-full rounded-lg bg-blue-700 py-3 font-bold text-white transition hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-60">
                            {loading ? "Please wait..." : paymentMethod === "COD" ? "Place Order" : "Pay Now"}
                        </button>

                        <p className="mt-4 text-center text-xs text-gray-400">Your order details are protected.</p>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Checkout;
