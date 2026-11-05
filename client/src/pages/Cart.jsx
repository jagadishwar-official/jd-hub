
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingCart, Trash2 } from "lucide-react";
import { useShop } from "../context/ShopContext";

function Cart() {
    const { cart, removeFromCart, updateQuantity } = useShop();
    const navigate = useNavigate();

    const [selectedIds, setSelectedIds] = useState([]);

    // Get only selected products
    const selectedItems = cart.filter((product) =>
        selectedIds.includes(product._id)
    );

    // Calculate selected quantity and price
    const totalItems = selectedItems.reduce((total, product) => {
        return total + product.quantity;
    }, 0);

    const totalPrice = selectedItems.reduce((total, product) => {
        return total + product.price * product.quantity;
    }, 0);

    // Select or unselect a product
    const handleSelect = (id) => {
        setSelectedIds((currentIds) => {
            if (currentIds.includes(id)) {
                return currentIds.filter((itemId) => itemId !== id);
            }

            return [...currentIds, id];
        });
    };

    // Select or unselect all products
    const handleSelectAll = () => {
        if (selectedIds.length === cart.length) {
            setSelectedIds([]);
        } else {
            setSelectedIds(cart.map((product) => product._id));
        }
    };

    const handleRemove = (id) => {
        removeFromCart(id);
        setSelectedIds((currentIds) =>
            currentIds.filter((itemId) => itemId !== id)
        );
    };

    // Continue with selected products only
    const goToCheckout = () => {
        if (selectedItems.length === 0) return;

        navigate("/checkout", {
            state: {
                selectedItems: selectedItems
            }
        });
    };

    return (
        <div className="min-h-screen bg-gray-50 px-5 py-10">
            <div className="mx-auto max-w-6xl">
                <h1 className="text-3xl font-bold text-blue-950">My Cart</h1>
                <p className="mt-2 text-gray-500">Select the products you want to order.</p>

                {cart.length === 0 ? (
                    <div className="mt-12 rounded-2xl bg-white p-10 text-center shadow-sm">
                        <ShoppingCart size={55} className="mx-auto text-gray-300" />
                        <h2 className="mt-5 text-2xl font-bold text-blue-950">Your Cart is Empty</h2>
                        <p className="mt-2 text-gray-500">You haven't added any products yet.</p>
                        <Link to="/products" className="mt-6 inline-block rounded-lg bg-blue-700 px-6 py-3 font-semibold text-white hover:bg-blue-800">
                            Explore Products
                        </Link>
                    </div>
                ) : (
                    <>
                        <div className="mt-8 flex items-center gap-3">
                            <input
                                type="checkbox"
                                checked={cart.length > 0 && selectedIds.length === cart.length}
                                onChange={handleSelectAll}
                                className="h-5 w-5 cursor-pointer"
                            />
                            <span className="font-semibold text-blue-950">Select All Products</span>
                        </div>

                        <div className="mt-6 grid gap-8 lg:grid-cols-3">
                            <div className="space-y-4 lg:col-span-2">
                                {cart.map((product) => (
                                    <div key={product._id} className="flex flex-col gap-5 rounded-xl border bg-white p-5 shadow-sm sm:flex-row sm:items-center">
                                        <input
                                            type="checkbox"
                                            checked={selectedIds.includes(product._id)}
                                            onChange={() => handleSelect(product._id)}
                                            className="h-5 w-5 cursor-pointer"
                                        />

                                        <img
                                            src={product.images?.[0] || product.image || "https://placehold.co/300x300?text=Product"}
                                            alt={product.name}
                                            className="h-32 w-full rounded-lg object-cover sm:w-32"
                                        />

                                        <div className="flex-1">
                                            <p className="text-sm font-semibold uppercase text-gray-400">{product.brand}</p>
                                            <h2 className="mt-1 text-lg font-bold text-blue-950">{product.name}</h2>
                                            <p className="mt-2 text-xl font-bold text-blue-950">
                                                ₹{product.price?.toLocaleString("en-IN")}
                                            </p>

                                            <div className="mt-4 flex items-center gap-3">
                                                <button
                                                    type="button"
                                                    onClick={() => updateQuantity(product._id, product.quantity - 1)}
                                                    disabled={product.quantity <= 1}
                                                    className="rounded border px-3 py-1 disabled:opacity-40"
                                                >
                                                    -
                                                </button>
                                                <span className="font-semibold">{product.quantity}</span>
                                                <button
                                                    type="button"
                                                    onClick={() => updateQuantity(product._id, product.quantity + 1)}
                                                    className="rounded border px-3 py-1"
                                                >
                                                    +
                                                </button>
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-between gap-4 sm:flex-col">
                                            <p className="font-bold text-blue-950">
                                                ₹{(product.price * product.quantity).toLocaleString("en-IN")}
                                            </p>
                                            <button
                                                type="button"
                                                onClick={() => handleRemove(product._id)}
                                                className="flex items-center gap-2 text-red-600 hover:text-red-800"
                                            >
                                                <Trash2 size={18} /> Remove
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="h-fit rounded-xl border bg-white p-6 shadow-sm">
                                <h2 className="text-xl font-bold text-blue-950">Order Summary</h2>

                                <div className="mt-5 flex justify-between text-gray-600">
                                    <span>Selected Items</span>
                                    <span>{totalItems}</span>
                                </div>

                                <div className="mt-4 flex justify-between border-t pt-4">
                                    <span className="font-semibold text-blue-950">Selected Total</span>
                                    <span className="text-xl font-bold text-blue-950">
                                        ₹{totalPrice.toLocaleString("en-IN")}
                                    </span>
                                </div>

                                <button
                                    type="button"
                                    onClick={goToCheckout}
                                    disabled={selectedItems.length === 0}
                                    className="mt-6 w-full rounded-lg bg-blue-700 py-3 font-bold text-white hover:bg-blue-800 disabled:cursor-not-allowed disabled:bg-blue-300"
                                >
                                    Proceed to Checkout
                                </button>

                                {selectedItems.length === 0 && (
                                    <p className="mt-3 text-center text-sm text-gray-500">
                                        Select at least one product to continue.
                                    </p>
                                )}
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default Cart;
