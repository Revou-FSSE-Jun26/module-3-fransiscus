"use client";
import { useEffect, useState } from 'react';
import Link from 'next/link';
import ProtectedRoute from '../../../components/ProtectedRoute';

export default function AdminDashboardOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:5000'}/orders`);
      const data = await res.json();
      
      // Memastikan data yang disimpan adalah array
      setOrders(Array.isArray(data) ? data : data.orders || []);
    } catch (err) {
      console.error('Gagal memuat daftar pesanan.', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <ProtectedRoute allowedRole="admin">
      <div className="max-w-6xl mx-auto p-6 my-8">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Dasbor Administrator</h1>
        
        {/* Navigasi Dasbor Admin (Tab Pesanan Aktif) */}
        <div className="flex gap-4 mb-8 border-b pb-4">
          <Link href="/dashboard" className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 font-bold">Produk</Link>
          <Link href="/dashboard/categories" className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 font-bold">Kategori</Link>
          <Link href="/dashboard/orders" className="px-4 py-2 bg-blue-600 text-white rounded font-bold">Pesanan</Link>
        </div>

        <div className="mb-4">
          <h2 className="text-xl font-bold text-gray-700">Daftar Pesanan Masuk</h2>
          <p className="text-sm text-gray-500">Halaman ini bersifat read-only (hanya baca).</p>
        </div>

        {/* Tabel Manajemen Pesanan (Read-Only) */}
        <div className="overflow-x-auto bg-white rounded-lg shadow border">
          {loading ? (
            <div className="p-10 text-center text-gray-500 font-bold">Memuat data pesanan...</div>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="p-4 text-gray-700 font-semibold">ID Pesanan</th>
                  <th className="p-4 text-gray-700 font-semibold">Nama Pelanggan</th>
                  <th className="p-4 text-gray-700 font-semibold">Alamat Pengiriman</th>
                  <th className="p-4 text-gray-700 font-semibold">Total Harga</th>
                  <th className="p-4 text-gray-700 font-semibold">Status</th>
                  <th className="p-4 text-gray-700 font-semibold text-center">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {orders.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="p-6 text-center text-gray-500 font-medium">Belum ada pesanan yang masuk.</td>
                  </tr>
                ) : (
                  orders.map((order: any) => (
                    <tr key={order.id} className="hover:bg-gray-50">
                      <td className="p-4 text-gray-800 font-medium">#{order.id}</td>
                      <td className="p-4 text-gray-800">{order.customer_name || 'Pelanggan'}</td>
                      <td className="p-4 text-gray-800 truncate max-w-xs">{order.address}</td>
                      <td className="p-4 text-gray-800 font-semibold">Rp {order.total_price?.toLocaleString()}</td>
                      <td className="p-4">
                        <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-bold uppercase tracking-wider">
                          {order.status || 'Diproses'}
                        </span>
                      </td>
                      <td className="p-4 text-center">
                        <Link 
                          href={`/orders/${order.id}`}
                          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm font-bold inline-block transition-colors"
                        >
                          Lihat Detail
                        </Link>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
}