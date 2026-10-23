"use client";
import { useState } from 'react';

export default function AddProductForm() {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('10');
  const [image, setImage] = useState(''); // <--- State baru untuk gambar

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("http://127.0.0.1:5000/products", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          name, 
          price: Number(price), 
          stock: Number(stock),
          image // <--- Kirim data gambar ke Flask
        }),
      });

      if (res.ok) {
        alert('Berhasil! Produk baru ditambahkan ke database.');
        setName('');
        setPrice('');
        setImage('');
        window.location.reload(); 
      } else {
        alert('Gagal menambahkan produk.');
      }
    } catch (error) {
      alert('Terjadi kesalahan koneksi ke server.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md border border-gray-100 max-w-md mt-8">
      <h2 className="text-xl font-bold mb-4 text-gray-800">Tambah Produk Baru ke Database</h2>
      
      <div className="mb-4">
        <label className="block text-gray-700 mb-2 font-medium">Nama Produk</label>
        <input type="text" required value={name} onChange={e => setName(e.target.value)} className="w-full p-2 border rounded focus:ring-blue-500 text-gray-800" placeholder="Contoh: Sepatu Sneakers" />
      </div>
      
      <div className="mb-4">
        <label className="block text-gray-700 mb-2 font-medium">Harga (Rp)</label>
        <input type="number" required value={price} onChange={e => setPrice(e.target.value)} className="w-full p-2 border rounded focus:ring-blue-500 text-gray-800" placeholder="Contoh: 150000" />
      </div>

      {/* Kotak Input Baru Untuk Link Gambar */}
      <div className="mb-4">
        <label className="block text-gray-700 mb-2 font-medium">URL Gambar (Link Internet)</label>
        <input type="text" value={image} onChange={e => setImage(e.target.value)} className="w-full p-2 border rounded focus:ring-blue-500 text-gray-800" placeholder="Contoh: https://link-gambar.com/foto.jpg" />
        <p className="text-xs text-gray-500 mt-1">Kosongkan jika ingin pakai gambar default</p>
      </div>

      <button type="submit" className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700 font-bold transition-colors">
        Simpan ke Database
      </button>
    </form>
  );
}