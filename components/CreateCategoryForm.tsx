"use client";

import React, { useState, useEffect } from "react";

interface Category {
  id: number;
  name: string;
}

export default function CreateProductForm({ onSuccess }: { onSuccess?: () => void }) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [image, setImage] = useState("");
  const [categoryId, setCategoryId] = useState("1");
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);

  // Ambil daftar kategori dari Flask saat form dimuat
  useEffect(() => {
    fetch("http://127.0.0.1:5000/categories")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setCategories(data);
          if (data.length > 0) {
            setCategoryId(String(data[0].id));
          }
        }
      })
      .catch((err) => console.error("Gagal mengambil kategori:", err));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("http://127.0.0.1:5000/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          price: Number(price),
          stock: Number(stock),
          image,
          category_id: Number(categoryId),
        }),
      });

      if (res.ok) {
        alert("Produk berhasil ditambahkan!");
        setName("");
        setPrice("");
        setStock("");
        setImage("");
        if (onSuccess) onSuccess();
      } else {
        const errData = await res.json();
        alert(`Gagal menambahkan produk: ${errData.error || "Terjadi kesalahan"}`);
      }
    } catch (err) {
      console.error(err);
      alert("Terjadi kesalahan koneksi ke server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-900 p-6 rounded-lg text-white space-y-4">
      <h2 className="text-xl font-bold mb-4">Tambah Produk Baru</h2>

      <div>
        <label className="block text-sm font-medium text-gray-300">Nama Produk</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full p-2 bg-gray-800 rounded border border-gray-700 mt-1"
          placeholder="Contoh: Playstation 5"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300">Harga (Rp)</label>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
          className="w-full p-2 bg-gray-800 rounded border border-gray-700 mt-1"
          placeholder="Contoh: 10000000"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300">Stok</label>
        <input
          type="number"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
          className="w-full p-2 bg-gray-800 rounded border border-gray-700 mt-1"
          placeholder="Contoh: 10"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300">Pilih Kategori</label>
        <select
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
          className="w-full p-2 bg-gray-800 rounded border border-gray-700 mt-1 text-white"
        >
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300">URL Gambar</label>
        <input
          type="text"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          className="w-full p-2 bg-gray-800 rounded border border-gray-700 mt-1"
          placeholder="https://..."
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full py-2 bg-green-600 hover:bg-green-700 font-semibold rounded transition"
      >
        {loading ? "Menyimpan..." : "Simpan Produk"}
      </button>
    </form>
  );
}