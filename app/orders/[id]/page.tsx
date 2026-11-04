"use client";
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import ProtectedRoute from '../../../components/ProtectedRoute';

export default function OrderDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { id } = params;
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrderDetail = async () => {
      try {
        // Gunakan process.env.NEXT_PUBLIC_API_URL atau http://127.0.0.1:5000 sesuai pengaturan Anda
        const res = await fetch(`http://127.0.0.1:5000/orders/${id}`);
        const data = await res.json();
        
        if (res.ok) {
          setOrder(data);
        } else {
          alert('Pesanan tidak ditemukan.');
          router.push('/orders');
        }
      } catch (err) {
        alert('Terjadi kesalahan koneksi ke server.');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchOrderDetail();
    }
  }, [id, router]);

  if (loading) return <div className="text-center py-20 font-bold text-gray-600">Memuat detail pesanan...</div>;
  if (!order) return null;

  return (
    <ProtectedRoute>
      <div className="max-w-3xl mx-auto p-6 bg-white border rounded-lg shadow-md my-10">
        <h1 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-4">
          Detail Pesanan #{order.id || id}
        </h1>
        
        <div className="mb-6 bg-gray-50 p-4 rounded border">
          <p className="text-gray-700 mb-2"><span className="font-semibold">Nama Pelanggan:</span> {order.customer_name || 'Pelanggan'}</p>
          <p className="text-gray-700 mb-2"><span className="font-semibold">Alamat Pengiriman:</span> {order.address}</p>
          <p className="text-gray-700"><span className="font-semibold">Status:</span> 
            <span className="ml-2 px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-bold">
              {order.status || 'Diproses'}
            </span>
          </p>
        </div>

        <h2 className="text-xl font-bold mb-4 text-gray-800">Daftar Produk</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b bg-gray-50">
                <th className="p-3 text-gray-700">Nama Produk</th>
                <th className="p-3 text-gray-700 text-center">Jumlah</th>
                <th className="p-3 text-gray-700 text-right">Harga</th>
                <th className="p-3 text-gray-700 text-right">Subtotal</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {order.items && order.items.map((item: any, index: number) => (
                <tr key={index}>
                  <td className="p-3 text-gray-800 font-medium">{item.name}</td>
                  <td className="p-3 text-gray-800 text-center">{item.quantity}</td>
                  <td className="p-3 text-gray-800 text-right">Rp {item.price?.toLocaleString()}</td>
                  <td className="p-3 text-gray-800 text-right font-semibold">Rp {(item.price * item.quantity).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-6 flex justify-end items-center border-t pt-4">
          <h2 className="text-xl font-bold text-gray-800">
            Total Harga: <span className="text-blue-600">Rp {order.total_price?.toLocaleString()}</span>
          </h2>
        </div>
      </div>
    </ProtectedRoute>
  );
}