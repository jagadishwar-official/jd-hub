
import { Link } from 'react-router-dom'
import { useShop } from '../context/ShopContext'
import { Heart, Trash2, ShoppingCart } from 'lucide-react'

function Wishlist() {
    const { wishlist, removeFromWishlist, addToCart } = useShop()

    return (
        <div className="min-h-screen bg-gray-50 px-5 py-10">
            <div className="mx-auto max-w-6xl">
                <h1 className="text-3xl font-bold text-blue-950">My Wishlist</h1>
                <p className="mt-2 text-gray-500">Your favourite products are saved here.</p>

                {wishlist.length === 0 ? (
                    <div className="mt-12 rounded-2xl bg-white p-10 text-center shadow-sm">
                        <Heart size={55} className="mx-auto text-gray-300" />
                        <h2 className="mt-5 text-2xl font-bold text-blue-950">Your Wishlist is Empty</h2>
                        <p className="mt-2 text-gray-500">You haven't added any products yet.</p>
                        <Link to="/products" className="mt-6 inline-block rounded-lg bg-blue-700 px-6 py-3 font-semibold text-white hover:bg-blue-800">Explore Products</Link>
                    </div>
                ) : (
                    <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                        {wishlist.map((product) => (
                            <div key={product._id} className="overflow-hidden rounded-2xl border bg-white shadow-sm">
                                <Link to={`/products/${product._id}`} state={{ product }}>
                                    <img src={product.images?.[0] || product.image || "https://placehold.co/500x500?text=Product"} alt={product.name} className="h-56 w-full object-cover" />
                                </Link>

                                <div className="p-5">
                                    <p className="text-sm font-semibold uppercase text-gray-400">{product.brand}</p>
                                    <h2 className="mt-1 text-lg font-bold text-blue-950">{product.name}</h2>
                                    <p className="mt-3 text-2xl font-bold text-blue-950">₹{product.price?.toLocaleString('en-IN')}</p>

                                    <div className="mt-5 flex gap-3">
                                        <button onClick={() => addToCart(product)} className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-blue-700 py-3 font-semibold text-white hover:bg-blue-800">
                                            <ShoppingCart size={18} /> Add to Cart
                                        </button>
                                        <button onClick={() => removeFromWishlist(product._id)} className="rounded-lg border border-red-200 px-4 text-red-600 hover:bg-red-50">
                                            <Trash2 size={19} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default Wishlist
