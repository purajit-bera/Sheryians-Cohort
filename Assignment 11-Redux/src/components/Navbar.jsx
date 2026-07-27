import { ShoppingCart } from "lucide-react";
import { useSelector } from "react-redux";

export default function Navbar({setIsCartOpen}) {
    const cartItems = useSelector((state) => state.cart.items);
    const noOfCartItems = cartItems.reduce((total, item) => total += item.quantity, 0);
    return (
        <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/80 backdrop-blur-lg">
            <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
                <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-600 text-2xl text-white shadow-lg">
                        🛒
                    </div>

                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">
                            ShopCart
                        </h1>

                        <p className="text-sm text-gray-500">
                            Shopping made simple
                        </p>
                    </div>
                </div>

                <button onClick={() => {setIsCartOpen((prev)=> !prev)}} className=" cursor-pointer relative rounded-xl border border-gray-200 bg-white p-3 shadow-sm transition hover:border-indigo-500 hover:shadow-md">
                    <ShoppingCart size={24} />

                    <span className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-indigo-600 text-xs font-semibold text-white">
                        {noOfCartItems}
                    </span>
                </button>
            </div>
        </header>
    );
}
