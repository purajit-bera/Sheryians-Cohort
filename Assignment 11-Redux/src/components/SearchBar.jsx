import { Search } from "lucide-react";

export default function SearchBar({searchTerm, setSearchTerm}) {

    return (
        <div className="relative w-full max-w-md">
            <Search
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                size={20}
            />

            <input
                onChange={(event) => {setSearchTerm(event.target.value)}}
                type="text"
                placeholder="Search products..."
                className="w-full rounded-2xl border border-gray-200 bg-white py-4 pl-12 pr-5 text-gray-700 shadow-sm outline-none transition-all duration-300 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
            />
        </div>
    );
}
