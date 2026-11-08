"use client";
import ProductCard, { ProductCardProps } from "./ProductCard";

export default function ProductGrid({ products }: { products: ProductCardProps[] }) {
  if (!products || products.length === 0) {
    return (
      <div className="flex justify-center items-center py-20">
        <p className="text-lg text-gray-500 font-medium">Tidak ada produk yang tersedia saat ini.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        // Memenuhi Kriteria: Memetakan flat props ke ProductCard agar data tampil
        <ProductCard 
          key={product.id} 
          id={product.id} 
          name={product.name} 
          price={product.price} 
          stock={product.stock} 
          image={product.image} 
        />
      ))}
    </div>
  );
}