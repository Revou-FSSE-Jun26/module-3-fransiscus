"use client";
import { useState } from "react";
import toast from "react-hot-toast";
import { API_BASE_URL } from "@/lib/api";

export default function CreateCategoryForm({ onSuccess }: { onSuccess?: () => void }) {
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return setError("Nama kategori wajib diisi.");
    setError("");
    
    try {
      const res = await fetch(`${API_BASE_URL}/categories`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("revoshop_token")}`,
        },
        body: JSON.stringify({ name: name.trim() }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        return toast.error(data.error || "Gagal membuat kategori");
      }
      
      toast.success("Kategori berhasil dibuat!");
      setName("");
      onSuccess?.();
    } catch (err) {
      toast.error("Terjadi kesalahan server");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3 rounded-lg border border-gray-700 bg-gray-800 p-6">
      <label htmlFor="cat-name" className="block text-sm text-gray-300">Nama Kategori</label>
      <input id="cat-name" value={name} onChange={(e) => setName(e.target.value)}
        className="w-full rounded border border-gray-600 bg-gray-900 p-2 text-white" />
      {error && <p className="text-sm text-red-400">{error}</p>}
      <button type="submit" className="w-full rounded bg-green-600 py-2 font-bold text-white">Simpan Kategori</button>
    </form>
  );
}