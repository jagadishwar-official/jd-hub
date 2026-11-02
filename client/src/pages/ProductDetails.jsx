
import { useEffect, useState } from 'react'
import { useParams, useLocation, Link } from 'react-router-dom'
import API_URL from "../config/api";

function ProductDetails() {
    const { id } = useParams()
    const location = useLocation()
    const homeProduct = location.state?.product

    const [product, setProduct] = useState(homeProduct ? {
        ...homeProduct,
        images: homeProduct.images || [homeProduct.image],
        originalPrice: homeProduct.originalPrice || homeProduct.oldPrice,
        description: homeProduct.description || `${homeProduct.name} from ${homeProduct.brand}.`
    } : null)

    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [quantity, setQuantity] = useState(1)
    const [selectedColor, setSelectedColor] = useState('')
    const [selectedSize, setSelectedSize] = useState('')
    const [selectedImage, setSelectedImage] = useState(0)

    useEffect(() => {
        if (homeProduct) {
            setLoading(false)
            return
        }

        const fetchProduct = async () => {
            try {
                const response = await fetch(`${API_URL}/api/products/${id}`)
                const data = await response.json()

                if (!response.ok) {
                    throw new Error(data.message || 'Product not found')
                }

                setProduct(data.product || data)
            } catch (error) {
                setError(error.message)
            } finally {
                setLoading(false)
            }
        }

        fetchProduct()
    }, [id, homeProduct])

    if (loading) {
        return <h2 className="py-20 text-center text-xl font-semibold">Loading product...</h2>
    }

    if (error || !product) {
        return <div className="py-20 text-center">
            <h2 className="text-2xl font-bold text-red-600">{error || 'Product not found'}</h2>
            <Link to="/products" className="mt-5 inline-block text-blue-700 underline">Back to Products</Link>
        </div>
    }

    const productImages = (product.images?.length ? product.images : [product.image]).filter(Boolean)

    return (
        <div className="min-h-screen bg-gray-50 px-5 py-10">
            <div className="mx-auto max-w-6xl">
                <Link to="/" className="mb-8 inline-block font-medium text-blue-700 hover:underline">← Back to Home</Link>

                <div className="grid gap-10 rounded-2xl bg-white p-6 shadow-sm md:grid-cols-2 md:p-10">
                    {/* Product Image Gallery */}
                    <div>
                        <div className="flex items-center justify-center rounded-xl bg-gray-100 p-5">
                            {productImages.length > 0 ? (
                                <img src={productImages[selectedImage] || productImages[0]} alt={product.name} className="h-80 w-full object-contain" />
                            ) : (
                                <p className="text-gray-500">No image available</p>
                            )}
                        </div>

                        {productImages.length > 1 && (
                            <div className="mt-4 flex flex-wrap gap-3">
                                {productImages.map((image, index) => (
                                    <button key={index} onClick={() => setSelectedImage(index)} className={`h-20 w-20 overflow-hidden rounded-lg border-2 ${selectedImage === index ? 'border-blue-700' : 'border-gray-200'}`}>
                                        <img src={image} alt={`${product.name} ${index + 1}`} className="h-full w-full object-contain" />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Product Information */}
                    <div>
                        <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-gray-500">{product.brand}</p>
                        <h1 className="text-3xl font-bold text-blue-950">{product.name}</h1>

                        <div className="mt-4 flex items-center gap-2">
                            <span className="text-lg text-yellow-500">★</span>
                            <span className="font-semibold">{product.rating}</span>
                            <span className="text-sm text-gray-500">Customer Rating</span>
                        </div>

                        <p className="mt-5 leading-7 text-gray-600">{product.description}</p>

                        {/* Price */}
                        <div className="mt-6 flex items-center gap-3">
                            <span className="text-3xl font-bold text-blue-950">₹{product.price?.toLocaleString('en-IN')}</span>
                            {product.originalPrice > product.price && <>
                                <span className="text-lg text-gray-400 line-through">₹{product.originalPrice?.toLocaleString('en-IN')}</span>
                                <span className="rounded bg-red-100 px-2 py-1 text-sm font-semibold text-red-600">{Math.round((product.originalPrice - product.price) / product.originalPrice * 100)}% OFF</span>
                            </>}
                        </div>

                        {/* Colors */}
                        {product.colors?.length > 0 && <div className="mt-6">
                            <h3 className="mb-3 font-semibold text-blue-950">Available Colors</h3>
                            <div className="flex flex-wrap gap-2">
                                {product.colors.map((color, index) => <button key={index} onClick={() => setSelectedColor(color)} className={`rounded-lg border px-4 py-2 text-sm ${selectedColor === color ? 'border-blue-700 bg-blue-50 text-blue-700' : 'border-gray-300'}`}>{color}</button>)}
                            </div>
                        </div>}

                        {/* Sizes */}
                        {product.sizes?.length > 0 && <div className="mt-6">
                            <h3 className="mb-3 font-semibold text-blue-950">Available Sizes</h3>
                            <div className="flex flex-wrap gap-2">
                                {product.sizes.map((size, index) => <button key={index} onClick={() => setSelectedSize(size)} className={`rounded-lg border px-4 py-2 text-sm ${selectedSize === size ? 'border-blue-700 bg-blue-50 text-blue-700' : 'border-gray-300'}`}>{size}</button>)}
                            </div>
                        </div>}

                        {/* Quantity */}
                        <div className="mt-6">
                            <h3 className="mb-3 font-semibold text-blue-950">Quantity</h3>
                            <div className="flex items-center gap-4">
                                <button onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)} className="rounded border px-4 py-2">-</button>
                                <span className="font-semibold">{quantity}</span>
                                <button onClick={() => setQuantity(quantity < (product.stock || 25) ? quantity + 1 : quantity)} disabled={quantity >= (product.stock || 25)} className="rounded border px-4 py-2 disabled:opacity-40">+</button>
                            </div>
                        </div>

                        <p className={`mt-5 font-medium ${(product.stock ?? 25) > 0 ? 'text-green-600' : 'text-red-600'}`}>{(product.stock ?? 25) > 0 ? `${product.stock ?? 25} items available` : 'Out of Stock'}</p>

                        <button disabled={(product.stock ?? 25) <= 0} onClick={() => alert(`${product.name} added to cart!`)} className="mt-6 w-full rounded-lg bg-blue-700 py-3 font-semibold text-white transition hover:bg-blue-800 disabled:cursor-not-allowed disabled:bg-gray-400">Add to Cart</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductDetails
