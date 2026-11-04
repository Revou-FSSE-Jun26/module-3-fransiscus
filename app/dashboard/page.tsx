"use client";
import { useEffect, useState } from 'react';
import Link from 'next/link';
import ProtectedRoute from '../../components/ProtectedRoute';
import CreateProductForm from '../../components/CreateProductForm';
import EditProductForm from '../../components/EditProductForm';

export default function AdminDashboardProducts() {
  const [products, setProducts] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any>(null);

  const fetchProducts = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:5000'}/products`);
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      console.error('Gagal memuat daftar produk.', err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id: number) => {
    // 1. Konfirmasi Hapus
    if (!window.confirm('Apakah Anda yakin ingin menghapus produk ini?')) return;

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:5000'}/products/${id}`, {
        method: 'DELETE',
      });

      // 2. Penanganan khusus error 400
      if (res.status === 400) {
        const data = await res.json();
        alert(`Gagal: ${data.message || 'Produk tidak bisa dihapus karena masih ada pesanan aktif.'}`);
        return;
      }

      if (res.ok) {
        alert('Produk berhasil dihapus!');
        fetchProducts();
      } else {
        alert('Gagal menghapus produk.');
      }
    } catch (err) {
      alert('Terjadi kesalahan koneksi server.');
    }
  };

  return (
    <ProtectedRoute allowedRole="admin">
      <div className="max-w-6xl mx-auto p-6 my-8">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Dasbor Administrator</h1>
        
        {/* Navigasi Dasbor Admin (Tab Produk Aktif) */}
        <div className="flex gap-4 mb-8 border-b pb-4">
          <Link href="/dashboard" className="px-4 py-2 bg-blue-600 text-white rounded font-bold">Produk</Link>
          <Link href="/dashboard/categories" className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 font-bold">Kategori</Link>
          <Link href="/dashboard/orders" className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 font-bold">Pesanan</Link>
        </div>

        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-700">Manajemen Produk</h2>
          <button 
            onClick={() => setShowCreateModal(true)}
            className="bg-green-600 text-white px-4 py-2 rounded font-bold hover:bg-green-700 transition-colors"
          >
            + Tambah Produk
          </button>
        </div>

        {/* Tabel Manajemen Produk */}
        <div className="overflow-x-auto bg-white rounded-lg shadow border">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="p-4 text-gray-700 font-semibold">ID</th>
                <th className="p-4 text-gray-700 font-semibold">Gambar</th>
                <th className="p-4 text-gray-700 font-semibold">Nama Produk</th>
                <th className="p-4 text-gray-700 font-semibold">Harga</th>
                <th className="p-4 text-gray-700 font-semibold text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {products.map((product: any) => (
                <tr key={product.id} className="hover:bg-gray-50">
                  <td className="p-4 text-gray-800 font-medium">{product.id}</td>
                  <td className="p-4">
                    <img src={product.image} alt={product.name} className="w-12 h-12 object-cover rounded border" />
                  </td>
                  <td className="p-4 text-gray-800">{product.name}</td>
                  <td className="p-4 text-gray-800">Rp {product.price?.toLocaleString()}</td>
                  <td className="p-4 text-center space-x-2">
                    <button 
                      onClick={() => setEditingProduct(product)}
                      className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 text-sm font-bold transition-colors"
                    >
                      Edit
                    </button>
                    <button 
                      onClick={() => handleDelete(product.id)}
                      className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 text-sm font-bold transition-colors"
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Modal Tambah Produk */}
        {showCreateModal && (
          <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
            <div className="relative w-full max-w-md">
              <button 
                onClick={() => setShowCreateModal(false)} 
                className="absolute -top-10 right-0 text-white hover:text-gray-300 text-3xl font-bold z-10"
              >
                &times;
              </button>
              <CreateProductForm onSuccess={() => { setShowCreateModal(false); fetchProducts(); }} />
            </div>
          </div>
        )}

        {/* Modal Edit Produk */}
        {editingProduct && (
          <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
            <div className="relative w-full max-w-md">
              <EditProductForm 
                product={editingProduct} 
                onSuccess={() => { setEditingProduct(null); fetchProducts(); }} 
                onCancel={() => setEditingProduct(null)} 
              />
            </div>
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
}