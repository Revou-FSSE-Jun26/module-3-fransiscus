"use client";
import { useState } from 'react';
import toast from 'react-hot-toast';

export default function CreateProductForm({ onSuccess }: { onSuccess: () => void }) {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://127.0.0.1:5000/products`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, price: Number(price), image })
      });
      if (res.ok) {
        toast.success('Produk berhasil ditambahkan!');
        setName(''); setPrice(''); setImage('');
        onSuccess(); // Memanggil fungsi untuk me-refresh data di tabel
      } else {
        toast.error('Gagal menambahkan produk.');
      }
    } catch (err) {
      toast.error('Terjadi kesalahan koneksi.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded-lg border border-gray-700">
      <h3 className="text-lg font-bold text-white mb-4">Tambah Produk Baru</h3>
      <div className="space-y-4">
        <div>
          <label className="block text-sm text-gray-400 mb-1">Nama Produk</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required className="w-full p-2 rounded bg-gray-900 border border-gray-700 text-white" />
        </div>
        <div>
          <label className="block text-sm text-gray-400 mb-1">Harga (Rp)</label>
          <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} required className="w-full p-2 rounded bg-gray-900 border border-gray-700 text-white" />
        </div>
        <div>
          <label className="block text-sm text-gray-400 mb-1">URL Gambar</label>
          <input type="text" value={image} onChange={(e) => setImage(e.target.value)} required className="w-full p-2 rounded bg-gray-900 border border-gray-700 text-white" />
        </div>
        <button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 rounded">
          Simpan Produk
        </button>
      </div>
    </form>
  );
}