
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Package, ShoppingBag } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import API_URL from "../../config/api";

function Orders() {
    const { user } = useAuth();

    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState("");

    useEffect(() => {
        const getOrders = async () => {
            try {
                if (!user) {
                    setMessage("Please login to view your orders.");
                    setLoading(false);
                    return;
                }

                const token = await user.getIdToken();

                const response = await fetch(`${API_URL}/api/orders`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(data.message || "Unable to get orders");
                }

                setOrders(data.orders || []);

            } catch (error) {
                setMessage(error.message);
            } finally {
                setLoading(false);
            }
        };

        getOrders();
    }, [user]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-lg text-gray-500">Loading your orders...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 px-5 py-10">
            <div className="mx-auto max-w-5xl">
                <h1 className="text-3xl font-bold text-blue-950">My Orders</h1>
                <p className="mt-2 text-gray-500">View and track your recent orders.</p>

                {message && (
                    <p className="mt-6 rounded-lg bg-red-50 p-4 text-red-600">
                        {message}
                    </p>
                )}

                {!message && orders.length === 0 ? (
                    <div className="mt-10 rounded-xl border bg-white p-10 text-center shadow-sm">
                        <Package size={60} className="mx-auto text-gray-300" />
                        <h2 className="mt-5 text-2xl font-bold text-blue-950">
                            No Orders Yet
                        </h2>
                        <p className="mt-2 text-gray-500">
                            You haven't placed any orders yet.
                        </p>
                        <Link to="/products" className="mt-6 inline-flex items-center gap-2 rounded-lg bg-blue-700 px-6 py-3 font-semibold text-white hover:bg-blue-800">
                            <ShoppingBag size={18} /> Start Shopping
                        </Link>
                    </div>
                ) : (
                    <div className="mt-8 space-y-5">
                        {orders.map((order) => (
                            <div key={order._id} className="rounded-xl border bg-white p-6 shadow-sm">
                                <div className="flex flex-wrap items-center justify-between gap-3">
                                    <div>
                                        <h2 className="font-bold text-blue-950">
                                            Order #{order._id}
                                        </h2>
                                        <p className="mt-1 text-sm text-gray-500">
                                            {new Date(order.createdAt).toLocaleString("en-IN")}
                                        </p>
                                    </div>

                                    <span className="rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700">
                                        {order.status}
                                    </span>
                                </div>

                                <div className="mt-5 space-y-3">
                                    {order.items.map((item, index) => (
                                        <div key={item._id || index} className="flex items-center gap-4">
                                            <img
                                                src={item.productId?.images?.[0] || "https://placehold.co/100x100?text=Product"}
                                                alt={item.productId?.name || "Product"}
                                                className="h-16 w-16 rounded-lg object-cover"
                                            />

                                            <div className="flex-1">
                                                <p className="font-semibold text-blue-950">
                                                    {item.productId?.name || "Product"}
                                                </p>
                                                <p className="text-sm text-gray-500">
                                                    Quantity: {item.quantity}
                                                </p>
                                            </div>

                                            <p className="font-semibold text-blue-950">
                                                ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                                            </p>
                                        </div>
                                    ))}
                                </div>

                                <div className="mt-5 flex flex-wrap justify-between gap-3 border-t pt-4">
                                    <div>
                                        <p className="text-sm text-gray-500">
                                            Payment: {order.paymentMethod}
                                        </p>
                                        <p className="text-sm text-gray-500">
                                            Payment Status: {order.paymentStatus}
                                        </p>
                                    </div>

                                    <p className="text-lg font-bold text-blue-950">
                                        Total: ₹{order.totalAmount?.toLocaleString("en-IN")}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Orders;
