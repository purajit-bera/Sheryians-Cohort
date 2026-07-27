import {useDispatch, useSelector } from "react-redux";
import {clearCart} from "../features/cart/cartSlice"
import toast from "react-hot-toast"
export default function CartSummary() {
    const dispatch = useDispatch();
    const cartItems = useSelector((state) => state.cart.items);
    const subTotal = cartItems.reduce((total, item) => total+= item.quantity * item.price, 0);
    return (
        <div className="mt-6 rounded-2xl border border-gray-200 bg-slate-50 p-5">
            <h3 className="mb-5 text-lg font-semibold text-gray-900">
                Order Summary
            </h3>

            <div className="space-y-4">
                <div className="flex items-center justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span className="font-medium">${subTotal}</span>
                </div>

                <div className="flex items-center justify-between text-gray-600">
                    <span>Shipping</span>
                    <span className="font-medium text-green-600">FREE</span>
                </div>

                <div className="flex items-center justify-between text-gray-600">
                    <span>Tax</span>
                    <span className="font-medium">$0</span>
                </div>

                <hr />

                <div className="flex items-center justify-between text-xl font-bold text-gray-900">
                    <span>Total</span>
                    <span className="text-indigo-600">${subTotal}</span>
                </div>
            </div>

            <button onClick={()=> {dispatch(clearCart()); toast.success("Ordered Placed!")}} className="mt-6 w-full rounded-xl bg-indigo-600 py-3 font-semibold text-white transition hover:bg-indigo-700">
                Proceed to Checkout
            </button>
        </div>
    );
}
