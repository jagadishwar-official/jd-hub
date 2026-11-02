
import { Truck, ShieldCheck, RefreshCw, Headset } from "lucide-react";

function BenefitsSection() {
    const benefits = [
        { id: 1, title: "Free Delivery", description: "On eligible orders", icon: Truck, color: "bg-blue-100 text-blue-700" },
        { id: 2, title: "Secure Payments", description: "Safe and secure checkout", icon: ShieldCheck, color: "bg-green-100 text-green-700" },
        { id: 3, title: "Easy Returns", description: "Simple return process", icon: RefreshCw, color: "bg-purple-100 text-purple-700" },
        { id: 4, title: "Customer Support", description: "We're here to help", icon: Headset, color: "bg-orange-100 text-orange-700" }
    ];

    return (
        <section className="mx-auto max-w-[1440px] px-4 py-8 lg:px-6">
            <div className="overflow-hidden rounded-2xl bg-gradient-to-r from-blue-50 via-white to-indigo-50 px-4 py-6 sm:px-6 lg:py-8">
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0">
                    {benefits.map((benefit, index) => (
                        <div key={benefit.id} className={`flex items-center gap-4 rounded-xl px-3 py-3 transition duration-200 hover:bg-white/80 sm:px-4 lg:rounded-none lg:px-5 ${index !== benefits.length - 1 ? "lg:border-r lg:border-blue-100" : ""}`}>
                            <div className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl ${benefit.color}`}><benefit.icon size={27} strokeWidth={1.8} /></div>
                            <div>
                                <h3 className="text-sm font-bold text-blue-950 sm:text-base">{benefit.title}</h3>
                                <p className="mt-1 text-xs leading-5 text-gray-500 sm:text-sm">{benefit.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default BenefitsSection;
