import { Heart, ShoppingCart, Star } from "lucide-react";
import { useDispatch } from "react-redux";
import { addToCart } from "../features/cart/cartSlice";
import toast from "react-hot-toast";

export default function ProductCard({ product }) {
    const dispatch = useDispatch();

    return (
        <div className="group overflow-hidden rounded-3xl bg-white shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
            {/* Image */}

            <div className="relative overflow-hidden">
                <img
                    src={product.image}
                    alt={product.title}
                    className="h-48 w-full object-cover transition duration-500 group-hover:scale-110"
                />

                <button className="absolute right-4 top-4 rounded-full bg-white p-2 shadow-md transition hover:bg-red-50">
                    <Heart size={18} />
                </button>

                <span className="absolute left-4 top-4 rounded-full bg-indigo-600 px-3 py-1 text-xs font-semibold text-white">
                    New
                </span>
            </div>

            {/* Content */}

            <div className="space-y-3 p-4">
                <div className="flex items-center gap-1 text-yellow-500">
                    <Star fill="currentColor" size={16} />
                    <Star fill="currentColor" size={16} />
                    <Star fill="currentColor" size={16} />
                    <Star fill="currentColor" size={16} />
                    <Star fill="currentColor" size={16} />

                    <span className="ml-2 text-sm text-gray-500">(4.9)</span>
                </div>

                <div>
                    <h2 className="text-xl font-bold text-gray-900">
                        {product.title}
                    </h2>

                    <p className="mt-2 text-sm leading-6 text-gray-500">
                        {product.description}
                    </p>
                </div>

                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-3xl font-bold text-indigo-600">
                            ${product.price}
                        </p>

                        <p className="text-sm text-green-600">Free Shipping</p>
                    </div>

                    <button onClick={() => {dispatch(addToCart(product)); toast.success(`${product.title} added to cart!`);}} className="flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 font-medium text-white transition hover:bg-indigo-700">
                        <ShoppingCart size={18} />
                        Add
                    </button>
                </div>
            </div>
        </div>
    );
}
