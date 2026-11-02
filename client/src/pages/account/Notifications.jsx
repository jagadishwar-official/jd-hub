
import { Bell, Package, CreditCard, Tag } from "lucide-react";

function Notifications() {
    const notifications = [
        {
            id: 1,
            title: "Order Confirmed",
            message: "Your order has been successfully placed.",
            time: "Just now",
            icon: Package
        },
        {
            id: 2,
            title: "Payment Update",
            message: "Your payment information is ready.",
            time: "2 hours ago",
            icon: CreditCard
        },
        {
            id: 3,
            title: "Special Offer",
            message: "Check out our latest exclusive offers.",
            time: "Yesterday",
            icon: Tag
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50 px-5 py-10">
            <div className="mx-auto max-w-4xl">
                <h1 className="text-3xl font-bold text-blue-950">Notifications</h1>
                <p className="mt-2 text-gray-500">Stay updated with your latest activities.</p>

                <div className="mt-8 space-y-4">
                    {notifications.map((item) => {
                        const Icon = item.icon;

                        return (
                            <div key={item.id} className="flex gap-4 rounded-xl border bg-white p-5 shadow-sm">
                                <div className="rounded-full bg-blue-100 p-3 text-blue-700">
                                    <Icon size={22} />
                                </div>

                                <div className="flex-1">
                                    <h2 className="font-bold text-blue-950">{item.title}</h2>
                                    <p className="mt-1 text-gray-600">{item.message}</p>
                                    <p className="mt-2 text-sm text-gray-400">{item.time}</p>
                                </div>

                                <span className="mt-2 h-2 w-2 rounded-full bg-blue-600"></span>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default Notifications;
