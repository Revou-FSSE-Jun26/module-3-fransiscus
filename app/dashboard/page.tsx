"use client";
import { useEffect, useState } from 'react';
import { API_BASE_URL } from '../../lib/api';
import toast from 'react-hot-toast';

export default function AdminDashboard() {
  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  
  // Form Product State
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('10');
  const [image, setImage] = useState('');
  const [categoryId, setCategoryId] = useState('');

  // Form Category State
  const [catName, setCatName] = useState('');

  const loadData = () => {
    fetch(`${API_BASE_URL}/products`).then(res => res.json()).then(data => setProducts(Array.isArray(data) ? data : data.products));
    fetch(`${API_BASE_URL}/categories`).then(res => res.json()).then(data => setCategories(data));
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch(`${API_BASE_URL}/products`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, price: Number(price), stock: Number(stock), image, category_id: Number(categoryId || categories[0]?.id) })
    });
    if (res.ok) {
      toast.success('Produk berhasil ditambahkan!');
      setName(''); setPrice(''); setImage('');
      loadData();
    } else {
      const data = await res.json();
      toast.error(data.error || 'Gagal menambah produk');
    }
  };

  const handleDeleteProduct = async (id: number) => {
    const res = await fetch(`${API_BASE_URL}/products/${id}`, { method: 'DELETE' });
    const data = await res.json();
    if (res.ok) {
      toast.success('Produk berhasil dihapus!');
      loadData();
    } else {
      toast.error(data.error || 'Gagal menghapus produk');
    }
  };

  const handleAddCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch(`${API_BASE_URL}/categories`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: catName })
    });
    if (res.ok) {
      toast.success('Kategori berhasil dibuat!');
      setCatName('');
      loadData();
    } else {
      const data = await res.json();
      toast.error(data.error || 'Gagal membuat kategori');
    }
  };

  const handleDeleteCategory = async (id: number) => {
    const res = await fetch(`${API_BASE_URL}/categories/${id}`, { method: 'DELETE' });
    const data = await res.json();
    if (res.ok) {
      toast.success('Kategori berhasil dihapus!');
      loadData();
    } else {
      toast.error(data.error || 'Gagal menghapus kategori');
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-10">
      <h1 className="text-3xl font-extrabold text-yellow-400">Dasbor Administrator</h1>

      {/* Grid Forms */}
      <div className="grid md:grid-cols-2 gap-8">
        {/* Form Tambah Produk */}
        <div className="bg-gray-900 border border-gray-800 p-6 rounded-lg shadow-xl">
          <h2 className="text-xl font-bold mb-4">Tambah Produk Baru</h2>
          <form onSubmit={handleAddProduct} className="space-y-4">
            <input type="text" placeholder="Nama Produk" value={name} onChange={e => setName(e.target.value)} className="w-full p-2.5 bg-gray-800 border border-gray-700 rounded text-white" required />
            <input type="number" placeholder="Harga (Rp)" value={price} onChange={e => setPrice(e.target.value)} className="w-full p-2.5 bg-gray-800 border border-gray-700 rounded text-white" required />
            <input type="number" placeholder="Stok" value={stock} onChange={e => setStock(e.target.value)} className="w-full p-2.5 bg-gray-800 border border-gray-700 rounded text-white" required />
            <input type="text" placeholder="URL Gambar" value={image} onChange={e => setImage(e.target.value)} className="w-full p-2.5 bg-gray-800 border border-gray-700 rounded text-white" />
            <select value={categoryId} onChange={e => setCategoryId(e.target.value)} className="w-full p-2.5 bg-gray-800 border border-gray-700 rounded text-white">
              {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
            <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded">Simpan Produk</button>
          </form>
        </div>

        {/* Form Tambah Kategori */}
        <div className="bg-gray-900 border border-gray-800 p-6 rounded-lg shadow-xl">
          <h2 className="text-xl font-bold mb-4">Tambah Kategori Baru</h2>
          <form onSubmit={handleAddCategory} className="space-y-4">
            <input type="text" placeholder="Nama Kategori" value={catName} onChange={e => setCatName(e.target.value)} className="w-full p-2.5 bg-gray-800 border border-gray-700 rounded text-white" required />
            <button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 rounded">Simpan Kategori</button>
          </form>

          <div className="mt-6">
            <h3 className="font-bold mb-2 text-sm text-gray-400">Daftar Kategori:</h3>
            <div className="space-y-2 max-h-40 overflow-y-auto">
              {categories.map(cat => (
                <div key={cat.id} className="flex justify-between items-center bg-gray-800 p-2.5 rounded">
                  <span>{cat.name} ({cat.product_count} produk)</span>
                  <button onClick={() => handleDeleteCategory(cat.id)} className="text-red-400 text-sm font-bold hover:underline">Hapus</button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Tabel Produk untuk CRUD */}
      <div className="bg-gray-900 border border-gray-800 p-6 rounded-lg shadow-xl">
        <h2 className="text-xl font-bold mb-4">Daftar Produk & Pengelolaan</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-800 text-gray-400">
                <th className="pb-3">Produk</th>
                <th className="pb-3">Harga</th>
                <th className="pb-3">Stok</th>
                <th className="pb-3 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {products.map(p => (
                <tr key={p.id}>
                  <td className="py-3 flex items-center gap-3">
                    <img src={p.image} alt={p.name} className="w-10 h-10 object-cover rounded" />
                    <span className="font-semibold">{p.name}</span>
                  </td>
                  <td className="py-3">Rp {p.price.toLocaleString()}</td>
                  <td className="py-3">{p.stock}</td>
                  <td className="py-3 text-center">
                    <button onClick={() => handleDeleteProduct(p.id)} className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm font-bold">Hapus</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}