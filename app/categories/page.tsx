"use client";

import { useEffect, useState } from "react";

interface Category {
  id: number;
  name: string;
}

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/categories")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setCategories(data);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Gagal memuat kategori:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="container mx-auto px-4 py-8 text-white">
      <h1 className="text-3xl font-bold mb-6">Kategori Produk</h1>
      
      {loading ? (
        <p>Memuat kategori...</p>
      ) : categories.length === 0 ? (
        <p>Belum ada kategori tersedia.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {categories.map((cat) => (
            <div key={cat.id} className="bg-gray-800 p-6 rounded-lg shadow-md border border-gray-700">
              <h2 className="text-xl font-semibold">{cat.name}</h2>
              <p className="text-sm text-gray-400 mt-2">ID Kategori: {cat.id}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}