import { useState } from "react";
import SearchBar from "./SearchBar";
import ProductGrid from "./ProductGrid";

export default function ProductSection() {
    const [searchTerm, setSearchTerm] = useState("");
    return (
        <section className="space-y-10">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                <div>
                    <p className="font-semibold uppercase tracking-widest text-indigo-600">
                        Premium Collection
                    </p>

                    <h1 className="mt-3 text-3xl font-bold leading-tight text-gray-900">
                        Discover Amazing
                        <br />
                        Tech Products
                    </h1>

                </div>

                <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            </div>

            <ProductGrid searchTerm={searchTerm} />
        </section>
    );
}
