import { ShoppingCart } from "lucide-react";

export default function EmptyCart() {
    return (
        <div className="flex flex-col items-center justify-center rounded-3xl border-2 border-dashed border-gray-200 bg-slate-50 px-6 py-16 text-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-indigo-100">
                <ShoppingCart size={38} className="text-indigo-600" />
            </div>

            <h2 className="mt-6 text-2xl font-bold text-gray-900">
                Your cart is empty
            </h2>

            <p className="mt-3 max-w-xs text-gray-500">
                Looks like you haven't added anything yet. Browse our premium
                collection and start shopping.
            </p>

            <button className="mt-8 rounded-xl bg-indigo-600 px-6 py-3 font-semibold text-white transition hover:bg-indigo-700">
                Continue Shopping
            </button>
        </div>
    );
}
