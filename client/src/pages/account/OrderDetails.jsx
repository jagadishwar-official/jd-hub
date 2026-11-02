
import { Link, useParams } from "react-router-dom";
import { Package, ArrowLeft } from "lucide-react";

function OrderDetails() {
    const { id } = useParams();

    return (
        <div className="min-h-screen bg-gray-50 px-5 py-10">
            <div className="mx-auto max-w-4xl">
                <Link to="/account/orders" className="inline-flex items-center gap-2 font-semibold text-blue-700 hover:text-blue-900">
                    <ArrowLeft size={18} /> Back to My Orders
                </Link>

                <h1 className="mt-6 text-3xl font-bold text-blue-950">Order Details</h1>
                <p className="mt-2 text-gray-500">Order ID: {id}</p>

                <div className="mt-8 rounded-xl border bg-white p-10 text-center shadow-sm">
                    <Package size={55} className="mx-auto text-gray-300" />
                    <h2 className="mt-5 text-xl font-bold text-blue-950">Order Details Not Available</h2>
                    <p className="mt-2 text-gray-500">Your order information will appear here once the order history API is connected.</p>
                    <Link to="/account/orders" className="mt-6 inline-block rounded-lg bg-blue-700 px-6 py-3 font-semibold text-white hover:bg-blue-800">Back to My Orders</Link>
                </div>
            </div>
        </div>
    );
}

export default OrderDetails;
