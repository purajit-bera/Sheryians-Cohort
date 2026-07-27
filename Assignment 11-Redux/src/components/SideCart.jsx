import { X } from "lucide-react";
import CartItem from "./CartItem";
import CartSummary from "./CartSummary";
import { useSelector } from "react-redux";
import EmptyCart from "./EmptyCart";
export default function SideCart({ setIsCartOpen }) {
    const cartItems = useSelector((state) => state.cart.items);
    const noOfCartItems = cartItems.reduce(
        (total, item) => (total += item.quantity),
        0,
    );
    return (
        <>
            {/* Overlay */}
            <div className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm" />

            {/* Drawer */}
            <aside className="fixed right-0 top-0 z-50 flex h-screen w-full max-w-md flex-col bg-white shadow-2xl">
                {/* Header */}
                <div className="flex items-center justify-between border-b px-6 py-5">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900">
                            Shopping Cart
                        </h2>

                        <p className="text-sm text-gray-500">
                            {noOfCartItems + " items"}
                        </p>
                    </div>

                    <button
                        className="rounded-lg p-2 transition hover:bg-gray-100 cursor-pointer"
                        onClick={() => {
                            setIsCartOpen((prev) => !prev);
                        }}
                    >
                        <X size={24} />
                    </button>
                </div>

                {cartItems.length === 0 ? (
                    <div className="flex-1 flex items-center justify-center p-6">
                        <EmptyCart />
                    </div>
                ) : (
                    <>
                        <div className="flex-1 space-y-5 overflow-y-auto p-6">
                            {cartItems.map((item) => (
                                <CartItem key={item.id} item={item} />
                            ))}
                        </div>
                        {/* Summary */}
                        <div className="border-t p-6">
                            <CartSummary />
                        </div>
                    </>
                )}
            </aside>
        </>
    );
}
