"use client";
import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { API_BASE_URL } from '../../lib/api';

export default function OrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    const url = user ? `${API_BASE_URL}/orders?user_id=${user.id}` : `${API_BASE_URL}/orders`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => setOrders(data))
      .catch((err) => console.error(err));
  }, [user]);

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-extrabold mb-6">Daftar Pesanan Anda</h1>
      {orders.length === 0 ? (
        <p className="text-gray-400">Belum ada riwayat pesanan.</p>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order.id} className="bg-gray-900 border border-gray-800 p-6 rounded-lg shadow">
              <div className="flex justify-between items-center mb-4 border-b border-gray-800 pb-2">
                <span className="font-bold text-blue-400">Pesanan #{order.id}</span>
                <span className="text-sm text-gray-400">{order.created_at}</span>
              </div>
              <p className="text-sm text-gray-300 mb-2"><strong>Alamat:</strong> {order.address}</p>
              <p className="text-sm text-gray-300 mb-4"><strong>Status:</strong> <span className="text-green-400 font-semibold">{order.status}</span></p>
              <div className="border-t border-gray-800 pt-3">
                <p className="font-bold mb-2 text-sm text-gray-400">Item Produk:</p>
                <ul className="list-disc list-inside text-sm space-y-1">
                  {order.items.map((item: any, idx: number) => (
                    <li key={idx}>
                      {item.product_name} ({item.quantity}x) - Rp {(item.price * item.quantity).toLocaleString()}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-4 pt-3 border-t border-gray-800 flex justify-between font-bold">
                <span>Total Pembayaran:</span>
                <span className="text-blue-400">Rp {order.total_price.toLocaleString()}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}