"use client";
import { useState } from 'react';
import toast from 'react-hot-toast';

export default function EditCategoryForm({ category, onSuccess, onCancel }: { category: any, onSuccess: () => void, onCancel: () => void }) {
  const [name, setName] = useState(category.name);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories/${category.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name })
      });
      if (res.ok) {
        toast.success('Kategori berhasil diperbarui!');
        onSuccess();
      } else {
        toast.error('Gagal memperbarui kategori.');
      }
    } catch (err) {
      toast.error('Terjadi kesalahan koneksi.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded-lg border border-gray-700 w-full max-w-md">
      <h3 className="text-lg font-bold text-white mb-4">Edit Data Kategori</h3>
      <div className="space-y-4">
        <div>
          <label className="block text-sm text-gray-400 mb-1">Nama Kategori</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required className="w-full p-2 rounded bg-gray-900 border border-gray-700 text-white" />
        </div>
        <div className="flex gap-3 pt-2">
          <button type="button" onClick={onCancel} className="flex-1 bg-gray-600 hover:bg-gray-500 text-white font-bold py-2 rounded">
            Batal
          </button>
          <button type="submit" className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 rounded">
            Simpan
          </button>
        </div>
      </div>
    </form>
  );
}