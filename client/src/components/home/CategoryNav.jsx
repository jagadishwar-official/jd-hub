
import { Link } from "react-router-dom";
import { Smartphone, Shirt, Laptop, Sofa, Sparkles, Gamepad2, Dumbbell, BookOpen, ShoppingBasket } from "lucide-react";

function CategorySection() {
    const categories = [
        { name: "Mobiles", icon: Smartphone, color: "bg-blue-50" },
        { name: "Fashion", icon: Shirt, color: "bg-pink-50" },
        { name: "Electronics", icon: Laptop, color: "bg-sky-50" },
        { name: "Home & Living", icon: Sofa, color: "bg-amber-50" },
        { name: "Beauty", icon: Sparkles, color: "bg-rose-50" },
        { name: "Toys & Games", icon: Gamepad2, color: "bg-orange-50" },
        { name: "Sports", icon: Dumbbell, color: "bg-red-50" },
        { name: "Books", icon: BookOpen, color: "bg-indigo-50" },
        { name: "Grocery", icon: ShoppingBasket, color: "bg-green-50" }
    ];

    return (
        <section className="mx-auto max-w-[1440px] px-4 py-5 lg:px-6">
            <div className="mb-4 flex items-center justify-between">
                <h2 className="text-xl font-bold text-blue-950">Top Categories</h2>
                <Link to="/products" className="text-sm font-semibold text-blue-600">View All →</Link>
            </div>

            <div className="grid grid-cols-3 gap-4 sm:grid-cols-5 md:grid-cols-9">
                {categories.map((category) => (
                    <Link to={`/products?category=${encodeURIComponent(category.name)}`} key={category.name} className="flex flex-col items-center gap-2">
                        <div className={`flex h-20 w-20 items-center justify-center rounded-full ${category.color} sm:h-24 sm:w-24`}>
                            <category.icon size={38} className="text-blue-950" />
                        </div>
                        <p className="text-center text-xs font-medium text-blue-950 sm:text-sm">{category.name}</p>
                    </Link> 
                ))}
            </div>
        </section>
    );
}

export default CategorySection;
