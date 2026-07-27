import { Minus, Plus, Trash2 } from "lucide-react";
import { useDispatch } from "react-redux";
import { increaseQuantity, decreaseQuantity, removeItem } from "../features/cart/cartSlice";

export default function CartItem({item}) {
    const dispatch = useDispatch();
    return (
        <div className="flex gap-4">
            <img
                src={item.image}
                alt=""
                className="h-24 w-24 rounded-2xl object-cover"
            />

            <div className="flex flex-1 flex-col justify-between">
                <div>
                    <h3 className="font-semibold">{item.title}</h3>

                    <p className="text-sm text-gray-500">{item.description}</p>
                </div>

                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 rounded-xl border px-3 py-2">
                        <button onClick={() => {dispatch(decreaseQuantity(item.id))}}>
                            <Minus size={16} />
                        </button>

                        <span>{item.quantity}</span>

                        <button onClick={() => {dispatch(increaseQuantity(item.id))}}>
                            <Plus size={16} />
                        </button>
                    </div>

                    <button onClick={() => {dispatch(removeItem(item.id))}} className="text-red-500 transition hover:text-red-600">
                        <Trash2 size={20} />
                    </button>
                </div>
            </div>
        </div>
    );
}
