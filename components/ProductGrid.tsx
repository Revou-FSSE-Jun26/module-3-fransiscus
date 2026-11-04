"use client";
import ProductCard from './ProductCard';

export default function ProductGrid({ products }: { products: any[] }) {
  if (!products || products.length === 0) {
    return <div className="text-center text-gray-400 py-10">Tidak ada produk tersedia.</div>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}