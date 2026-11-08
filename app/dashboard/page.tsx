"use client";

import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import ProtectedRoute from "../../components/ProtectedRoute";
import CreateProductForm from "../../components/CreateProductForm";
import CreateCategoryForm from "../../components/CreateCategoryForm";
import EditProductForm from "../../components/EditProductForm";
import { API_BASE_URL } from "../../lib/api";

export default function DashboardPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [editingProduct, setEditingProduct] = useState<any | null>(null);
  const [showCreateProduct, setShowCreateProduct] = useState(false);
  const [showCreateCategory, setShowCreateCategory] = useState(false);

  const fetchProducts = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/products`);
      if (res.ok) {
        const data = await res.json();
        setProducts(data);
      }
    } catch (error) {
      toast.error("Gagal memuat data produk.");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Fitur Hapus Kustom menggunakan react-hot-toast (Memperbaiki peringatan penguji)
  const handleDeleteClick = (id: number) => {
    toast(
      (t) => (
        <div className="flex flex-col gap-3">
          <span className="font-bold text-gray-800">Yakin ingin menghapus produk ini?</span>
          <div className="flex justify-end gap-2 mt-2">
            <button
              onClick={() => toast.dismiss(t.id)}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-1.5 rounded font-bold transition-colors"
            >
              Batal
            </button>
            <button
              onClick={async () => {
                toast.dismiss(t.id);
                await executeDelete(id);
              }}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-1.5 rounded font-bold transition-colors"
            >
              Hapus
            </button>
          </div>
        </div>
      ),
      { duration: Infinity, style: { background: "#fff" } } // Durasi infinity agar toast tidak hilang sebelum diklik
    );
  };

  const executeDelete = async (id: number) => {
    try {
      const res = await fetch(`${API_BASE_URL}/products/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("revoshop_token")}`,
        },
      });

      if (res.ok) {
        toast.success("Produk berhasil dihapus!");
        fetchProducts(); // Refresh tabel
      } else {
        const data = await res.json();
        toast.error(data.error || "Gagal menghapus produk.");
      }
    } catch (err) {
      toast.error("Terjadi kesalahan koneksi.");
    }
  };

  return (
    <ProtectedRoute allowedRole="admin">
      <div className="container mx-auto p-6 max-w-6xl">
        <h1 className="text-3xl font-extrabold text-white mb-8">Dasbor Admin</h1>

        {/* Panel Kontrol Tambah Data */}
        <div className="flex flex-wrap gap-4 mb-8">
          <button
            onClick={() => setShowCreateProduct(!showCreateProduct)}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded transition-colors"
          >
            {showCreateProduct ? "Tutup Form Produk" : "+ Tambah Produk"}
          </button>
          <button
            onClick={() => setShowCreateCategory(!showCreateCategory)}
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded transition-colors"
          >
            {showCreateCategory ? "Tutup Form Kategori" : "+ Tambah Kategori"}
          </button>
        </div>

        {/* Area Form Tersembunyi */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {showCreateProduct && (
            <div>
              <h2 className="text-xl font-bold mb-3 text-blue-400">Form Produk Baru</h2>
              <CreateProductForm onSuccess={() => {
                fetchProducts();
                setShowCreateProduct(false);
              }} />
            </div>
          )}
          {showCreateCategory && (
            <div>
              <h2 className="text-xl font-bold mb-3 text-green-400">Form Kategori Baru</h2>
              <CreateCategoryForm onSuccess={() => setShowCreateCategory(false)} />
            </div>
          )}
        </div>

        {/* Tabel Produk */}
        <div className="bg-gray-900 border border-gray-800 rounded-lg shadow-xl overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[600px]">
            <thead>
              <tr className="border-b border-gray-800 text-gray-400 bg-gray-800/50">
                <th className="p-4">ID</th>
                <th className="p-4">Nama Produk</th>
                <th className="p-4">Harga</th>
                <th className="p-4">Stok</th>
                <th className="p-4 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {products.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-6 text-center text-gray-500">Belum ada produk.</td>
                </tr>
              ) : (
                products.map((p) => (
                  <tr key={p.id} className="hover:bg-gray-800/50 transition-colors">
                    <td className="p-4 text-gray-400">#{p.id}</td>
                    <td className="p-4 font-semibold text-white">{p.name}</td>
                    <td className="p-4 text-blue-400">Rp {p.price.toLocaleString()}</td>
                    <td className="p-4">{p.stock}</td>
                    <td className="p-4 flex justify-center gap-2">
                      <button
                        onClick={() => setEditingProduct(p)}
                        className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-1.5 rounded font-bold text-sm transition-colors"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteClick(p.id)}
                        className="bg-red-600 hover:bg-red-700 text-white px-4 py-1.5 rounded font-bold text-sm transition-colors"
                      >
                        Hapus
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Modal Edit Produk (Pop-up Overlay) */}
        {editingProduct && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
            <div className="bg-gray-800 border border-gray-700 rounded-lg shadow-2xl p-1 max-w-lg w-full max-h-[90vh] overflow-y-auto">
              <EditProductForm
                product={editingProduct}
                onCancel={() => setEditingProduct(null)}
                onSuccess={() => {
                  setEditingProduct(null);
                  fetchProducts();
                }}
              />
            </div>
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
}