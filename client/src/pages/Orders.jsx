import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Package, ShoppingBag } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import API_URL from "../config/api";

function Orders() {
    const { user } = useAuth();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState("");

    useEffect(() => {
        async function getOrders() {
            try {
                if (!user) {
                    setMessage("Please login first");
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
        }

        getOrders();
    }, [user]);

    return (
        <div className="min-h-screen bg-gray-50 px-5 py-10">
            <div className="mx-auto max-w-5xl">
                <h1 className="text-3xl font-bold text-blue-950">My Orders</h1>
                <p className="mt-2 text-gray-500">View and track your recent orders.</p>

                {loading ? (
                    <p className="mt-10 text-center text-gray-500">Loading orders...</p>
                ) : message ? (
                    <p className="mt-10 rounded-lg bg-blue-50 p-4 text-blue-700">{message}</p>
                ) : orders.length === 0 ? (
                    <div className="mt-10 rounded-xl border bg-white p-10 text-center shadow-sm">
                        <Package size={60} className="mx-auto text-gray-300" />
                        <h2 className="mt-5 text-2xl font-bold text-blue-950">No Orders Yet</h2>
                        <p className="mt-2 text-gray-500">You haven't placed any orders yet.</p>
                        <Link to="/products" className="mt-6 inline-flex items-center gap-2 rounded-lg bg-blue-700 px-6 py-3 font-semibold text-white hover:bg-blue-800">
                            <ShoppingBag size={18} /> Start Shopping
                        </Link>
                    </div>
                ) : (
                    <div className="mt-8 space-y-4">
                        {orders.map((order) => (
                            <div key={order._id} className="rounded-xl border bg-white p-5 shadow-sm">
                                <h2 className="font-bold text-blue-950">Order #{order._id}</h2>
                                <p className="mt-2 text-gray-600">Total: ₹{order.totalAmount?.toLocaleString("en-IN")}</p>
                                <p className="mt-1 text-gray-600">Payment: {order.paymentMethod}</p>
                                <p className="mt-1 text-gray-600">Payment Status: {order.paymentStatus}</p>
                                <p className="mt-1 text-gray-600">Order Status: {order.status}</p>

                                <div className="mt-3 space-y-2">
                                    {order.items?.map((item) => (
                                        <p key={item._id || item.productId} className="text-sm text-gray-500">
                                            {item.productId?.name || "Product"} × {item.quantity}
                                        </p>
                                    ))}
                                </div>

                                <p className="mt-3 text-sm text-gray-500">
                                    Ordered on: {new Date(order.createdAt).toLocaleString("en-IN")}
                                </p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Orders;