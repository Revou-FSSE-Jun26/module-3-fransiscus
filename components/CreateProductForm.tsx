"use client";
import { useState } from "react";
import toast from "react-hot-toast";
import { API_BASE_URL } from "@/lib/api";

export default function CreateProductForm({ onSuccess }: { onSuccess?: () => void }) {
  const [formData, setFormData] = useState({ name: "", price: "", stock: "", category_id: "", image: "" });
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.price || !formData.stock || !formData.category_id) {
      return setError("Nama, Harga, Stok, dan Kategori wajib diisi.");
    }
    setError("");

    try {
      // Menggunakan API_BASE_URL alih-alih hardcoded localhost
      const res = await fetch(`${API_BASE_URL}/products`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("revoshop_token")}`,
        },
        body: JSON.stringify({
          name: formData.name,
          price: parseInt(formData.price),
          stock: parseInt(formData.stock),
          category_id: parseInt(formData.category_id),
          image: formData.image
        }),
      });

      if (!res.ok) throw new Error("Gagal membuat produk");
      
      toast.success("Produk berhasil ditambahkan!");
      setFormData({ name: "", price: "", stock: "", category_id: "", image: "" });
      onSuccess?.();
    } catch (err) {
      toast.error("Terjadi kesalahan server");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3 rounded-lg border border-gray-700 bg-gray-800 p-6">
      <h2 className="text-xl font-bold text-white mb-4">Tambah Produk Baru</h2>
      
      <input placeholder="Nama Produk" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full rounded border-gray-600 bg-gray-900 p-2 text-white" />
      <input type="number" placeholder="Harga" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} className="w-full rounded border-gray-600 bg-gray-900 p-2 text-white" />
      <input type="number" placeholder="Stok" value={formData.stock} onChange={e => setFormData({...formData, stock: e.target.value})} className="w-full rounded border-gray-600 bg-gray-900 p-2 text-white" />
      <input type="number" placeholder="ID Kategori" value={formData.category_id} onChange={e => setFormData({...formData, category_id: e.target.value})} className="w-full rounded border-gray-600 bg-gray-900 p-2 text-white" />
      <input placeholder="URL Gambar (Opsional)" value={formData.image} onChange={e => setFormData({...formData, image: e.target.value})} className="w-full rounded border-gray-600 bg-gray-900 p-2 text-white" />
      
      {error && <p className="text-sm text-red-400">{error}</p>}
      <button type="submit" className="w-full rounded bg-blue-600 py-2 font-bold text-white hover:bg-blue-700">Simpan Produk</button>
    </form>
  );
}