"use client";
import { useEffect, useState } from 'react';
import Link from 'next/link';
import ProtectedRoute from '../../../components/ProtectedRoute';
import CreateCategoryForm from '../../../components/CreateCategoryForm';
import EditCategoryForm from '../../../components/EditCategoryForm';

export default function AdminDashboardCategories() {
  const [categories, setCategories] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState<any>(null);

  const fetchCategories = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:5000'}/categories`);
      const data = await res.json();
      setCategories(data);
    } catch (err) {
      console.error('Gagal memuat daftar kategori.', err);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleDelete = async (id: number) => {
    // 1. Konfirmasi Hapus sesuai rubrik
    if (!window.confirm('Apakah Anda yakin ingin menghapus kategori ini?')) return;

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:5000'}/categories/${id}`, {
        method: 'DELETE',
      });

      // 2. Penanganan khusus error 400 sesuai rubrik
      if (res.status === 400) {
        const data = await res.json();
        alert(`Gagal: ${data.message || 'Kategori tidak bisa dihapus karena masih memiliki produk tertaut.'}`);
        return;
      }

      if (res.ok) {
        alert('Kategori berhasil dihapus!');
        fetchCategories();
      } else {
        alert('Gagal menghapus kategori.');
      }
    } catch (err) {
      alert('Terjadi kesalahan koneksi server.');
    }
  };

  return (
    <ProtectedRoute allowedRole="admin">
      <div className="max-w-6xl mx-auto p-6 my-8">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Dasbor Administrator</h1>
        
        {/* Navigasi Dasbor Admin */}
        <div className="flex gap-4 mb-8 border-b pb-4">
          <Link href="/dashboard" className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 font-bold">Produk</Link>
          <Link href="/dashboard/categories" className="px-4 py-2 bg-blue-600 text-white rounded font-bold">Kategori</Link>
          <Link href="/dashboard/orders" className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 font-bold">Pesanan</Link>
        </div>

        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-700">Manajemen Kategori</h2>
          <button 
            onClick={() => setShowCreateModal(true)}
            className="bg-green-600 text-white px-4 py-2 rounded font-bold hover:bg-green-700"
          >
            + Tambah Kategori
          </button>
        </div>

        {/* Tabel Manajemen Kategori */}
        <div className="overflow-x-auto bg-white rounded-lg shadow border">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="p-4 text-gray-700 font-semibold">ID</th>
                <th className="p-4 text-gray-700 font-semibold">Nama Kategori</th>
                <th className="p-4 text-gray-700 font-semibold text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {categories.map((category: any) => (
                <tr key={category.id} className="hover:bg-gray-50">
                  <td className="p-4 text-gray-800 font-medium">{category.id}</td>
                  <td className="p-4 text-gray-800">{category.name}</td>
                  <td className="p-4 text-center space-x-2">
                    <button 
                      onClick={() => setEditingCategory(category)}
                      className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 text-sm font-bold"
                    >
                      Edit
                    </button>
                    <button 
                      onClick={() => handleDelete(category.id)}
                      className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 text-sm font-bold"
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Modal Tambah Kategori */}
        {showCreateModal && (
          <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
            <div className="relative w-full max-w-md">
              <button onClick={() => setShowCreateModal(false)} className="absolute -top-10 right-0 text-white hover:text-gray-300 text-3xl font-bold z-10">&times;</button>
              <CreateCategoryForm onSuccess={() => { setShowCreateModal(false); fetchCategories(); }} />
            </div>
          </div>
        )}

        {/* Modal Edit Kategori */}
        {editingCategory && (
          <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
            <div className="relative w-full max-w-md">
              <EditCategoryForm 
                category={editingCategory} 
                onSuccess={() => { setEditingCategory(null); fetchCategories(); }} 
                onCancel={() => setEditingCategory(null)} 
              />
            </div>
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
}