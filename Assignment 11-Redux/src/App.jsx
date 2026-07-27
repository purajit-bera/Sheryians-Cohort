import { useState } from "react";
import Navbar from "./components/Navbar";
import ProductSection from "./components/ProductSection";
import SideCart from "./components/SideCart";
import { Toaster } from "react-hot-toast";

function App() {
    const [isCartOpen, setIsCartOpen] = useState(false);
    return (
        <div className="min-h-screen bg-slate-100">
            <Toaster position="bottom-right" />
            <Navbar setIsCartOpen={setIsCartOpen} />

            <main className="mx-auto max-w-7xl px-6 py-10">
                <ProductSection />
            </main>

            {isCartOpen && <SideCart setIsCartOpen={setIsCartOpen} />}
        </div>
    );
}

export default App;
