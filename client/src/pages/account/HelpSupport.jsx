
import { useState } from "react";
import { Headset, Mail, Phone, ChevronDown } from "lucide-react";

function HelpSupport() {
    const [openQuestion, setOpenQuestion] = useState(null);

    const questions = [
        {
            question: "How can I track my order?",
            answer: "Visit My Orders to check your order status and details."
        },
        {
            question: "How can I cancel my order?",
            answer: "Contact our support team with your order details to request cancellation."
        },
        {
            question: "What payment methods are available?",
            answer: "JD Hub supports Cash on Delivery and Razorpay online payments."
        },
        {
            question: "How can I update my profile?",
            answer: "Visit My Profile to update your personal information."
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50 px-5 py-10">
            <div className="mx-auto max-w-4xl">
                <h1 className="text-3xl font-bold text-blue-950">Help & Support</h1>
                <p className="mt-2 text-gray-500">We're here to help you.</p>

                <div className="mt-8 grid gap-5 sm:grid-cols-2">
                    <div className="rounded-xl border bg-white p-6 shadow-sm">
                        <Mail className="text-blue-700" size={28} />
                        <h2 className="mt-4 font-bold text-blue-950">Email Support</h2>
                        <p className="mt-2 text-gray-500">Get help through email.</p>
                    </div>

                    <div className="rounded-xl border bg-white p-6 shadow-sm">
                        <Phone className="text-blue-700" size={28} />
                        <h2 className="mt-4 font-bold text-blue-950">Phone Support</h2>
                        <p className="mt-2 text-gray-500">Contact our support team.</p>
                    </div>
                </div>

                <div className="mt-10 rounded-xl border bg-white p-6 shadow-sm">
                    <h2 className="flex items-center gap-2 text-xl font-bold text-blue-950">
                        <Headset size={23} /> Frequently Asked Questions
                    </h2>

                    <div className="mt-5 divide-y">
                        {questions.map((item, index) => (
                            <div key={index} className="py-4">
                                <button
                                    onClick={() => setOpenQuestion(openQuestion === index ? null : index)}
                                    className="flex w-full items-center justify-between gap-3 text-left font-semibold text-blue-950"
                                >
                                    {item.question}
                                    <ChevronDown size={20} />
                                </button>

                                {openQuestion === index && (
                                    <p className="mt-3 text-gray-600">{item.answer}</p>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HelpSupport;
