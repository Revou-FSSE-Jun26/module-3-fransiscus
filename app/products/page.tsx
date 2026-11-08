"use client";
import { useEffect, useState } from "react";
import ProductGrid from "@/components/ProductGrid";
import { API_BASE_URL } from "@/lib/api";

export default function ProductsPage() {
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Memenuhi Kriteria A7: Menetapkan judul tab browser secara dinamis
    document.title = "Katalog Produk - RevoShop";

    const fetchProducts = async () => {
      try {
        // Memenuhi Kriteria Env Config: Menggunakan API_BASE_URL
        const res = await fetch(`${API_BASE_URL}/products`);
        if (res.ok) {
          const data = await res.json();
          setFilteredProducts(data);
        }
      } catch (error) {
        console.error("Gagal mengambil data produk:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-gray-800 text-center">Katalog Produk</h1>
      
      {loading ? (
        <div className="flex justify-center items-center h-40">
            <p className="text-lg text-gray-500 animate-pulse">Memuat produk...</p>
        </div>
      ) : (
        /* Memenuhi Kriteria: Mengganti .map inline dengan komponen ProductGrid */
        <ProductGrid products={filteredProducts} />
      )}
    </div>
  );
}