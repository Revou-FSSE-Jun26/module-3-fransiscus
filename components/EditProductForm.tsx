"use client";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { API_BASE_URL } from "@/lib/api";

// Memastikan onCancel dimasukkan sebagai props
export default function EditProductForm({ productId, onSuccess, onCancel }: { productId: number; onSuccess?: () => void; onCancel?: () => void }) {
  const [formData, setFormData] = useState({ name: "", price: "", stock: "", category_id: "", image: "" });

  // Mengambil data produk saat ini (Pre-populate data)
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/products/${productId}`);
        if (res.ok) {
          const data = await res.json();
          setFormData({ name: data.name, price: data.price, stock: data.stock, category_id: data.category_id, image: data.image || "" });
        }
      } catch (err) {
        console.error("Gagal mengambil data produk:", err);
      }
    };
    fetchProduct();
  }, [productId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_BASE_URL}/products/${productId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          // Mengirimkan token admin sesuai permintaan rubrik
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

      if (!res.ok) throw new Error("Gagal mengupdate produk");
      toast.success("Produk berhasil diperbarui!");
      onSuccess?.();
    } catch (err) {
      toast.error("Terjadi kesalahan server");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3 rounded-lg border border-gray-700 bg-gray-800 p-6">
      <h2 className="text-xl font-bold text-white mb-4">Edit Produk</h2>
      
      <input placeholder="Nama Produk" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full rounded border-gray-600 bg-gray-900 p-2 text-white" />
      <input type="number" placeholder="Harga" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} className="w-full rounded border-gray-600 bg-gray-900 p-2 text-white" />
      <input type="number" placeholder="Stok" value={formData.stock} onChange={e => setFormData({...formData, stock: e.target.value})} className="w-full rounded border-gray-600 bg-gray-900 p-2 text-white" />
      <input type="number" placeholder="ID Kategori" value={formData.category_id} onChange={e => setFormData({...formData, category_id: e.target.value})} className="w-full rounded border-gray-600 bg-gray-900 p-2 text-white" />
      <input placeholder="URL Gambar" value={formData.image} onChange={e => setFormData({...formData, image: e.target.value})} className="w-full rounded border-gray-600 bg-gray-900 p-2 text-white" />
      
      <div className="flex gap-4 mt-4">
        <button type="submit" className="flex-1 rounded bg-blue-600 py-2 font-bold text-white hover:bg-blue-700">Update</button>
        {/* Tombol batal memanggil onCancel untuk menutup modal */}
        <button type="button" onClick={onCancel} className="flex-1 rounded bg-gray-600 py-2 font-bold text-white hover:bg-gray-500">Batal</button>
      </div>
    </form>
  );
}