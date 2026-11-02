
import { Link } from "react-router-dom";
import { Package, ShoppingBag } from "lucide-react";

function Orders() {
    const orders = [];

    return (
        <div className="min-h-screen bg-gray-50 px-5 py-10">
            <div className="mx-auto max-w-5xl">
                <h1 className="text-3xl font-bold text-blue-950">My Orders</h1>
                <p className="mt-2 text-gray-500">View and track your recent orders.</p>

                {orders.length === 0 ? (
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
                                <p className="mt-2 text-gray-500">Status: {order.status}</p>
                                <Link to={`/account/orders/${order._id}`} className="mt-4 inline-block font-semibold text-blue-700">View Details</Link>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Orders;
