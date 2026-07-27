import ProductCard from "./ProductCard";
import products from "../data/products";
export default function ProductGrid({searchTerm}) {
    const allProducts = searchTerm.trim() !== "" ? products.filter((product) => product.title.toLowerCase().includes(searchTerm.toLowerCase())) : products;
    return (
        <section className="grid gap-6 grid-cols-[repeat(auto-fit,minmax(260px,1fr))]">
            {allProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
            ))}
        </section>
    );
}
