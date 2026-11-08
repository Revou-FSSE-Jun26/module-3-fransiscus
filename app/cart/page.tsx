"use client";

import ProtectedRoute from "../../components/ProtectedRoute";
import { useCart } from "../../context/CartContext";
import Link from "next/link";

export default function CartPage() {
  const { cart, removeFromCart } = useCart();

  // Menghitung total harga di keranjang
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <ProtectedRoute>
      <div className="max-w-4xl mx-auto p-6 min-h-screen">
        <h1 className="text-3xl font-extrabold mb-6 text-white">Keranjang Belanja</h1>
        
        {cart.length === 0 ? (
          <div className="bg-gray-900 border border-gray-800 p-8 rounded-lg text-center shadow-xl">
            <p className="text-gray-400 mb-6 text-lg">Keranjang belanja Anda kosong.</p>
            <div className="flex flex-col items-center gap-4">
              <Link 
                href="/products" 
                className="bg-blue-600 text-white px-8 py-2.5 rounded font-bold hover:bg-blue-700 transition-colors"
              >
                Mulai Belanja
              </Link>
              {/* Memenuhi F2: Tombol checkout disabled saat keranjang kosong */}
              <button 
                disabled 
                className="bg-gray-800 text-gray-500 px-8 py-2.5 rounded font-bold cursor-not-allowed"
              >
                Lanjut ke Pembayaran
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-gray-900 border border-gray-800 rounded-lg p-6 shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[600px]">
                <thead>
                  <tr className="border-b border-gray-800 text-gray-400">
                    <th className="pb-3 p-2">Produk</th>
                    <th className="pb-3 p-2">Harga</th>
                    <th className="pb-3 p-2">Jumlah</th>
                    <th className="pb-3 p-2">Subtotal</th>
                    <th className="pb-3 p-2 text-center">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800">
                  {cart.map((item) => (
                    <tr key={item.id} className="text-white hover:bg-gray-800/50 transition-colors">
                      <td className="py-4 p-2 flex items-center gap-4">
                        <img 
                          src={item.image} 
                          alt={item.name} 
                          className="w-16 h-16 object-cover rounded bg-gray-700" 
                        />
                        <span className="font-semibold line-clamp-2">{item.name}</span>
                      </td>
                      <td className="py-4 p-2 text-blue-400">Rp {item.price.toLocaleString()}</td>
                      <td className="py-4 p-2 font-bold">{item.quantity}</td>
                      <td className="py-4 p-2 font-bold text-blue-400">
                        Rp {(item.price * item.quantity).toLocaleString()}
                      </td>
                      <td className="py-4 p-2 text-center">
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="bg-red-600 hover:bg-red-700 text-white px-4 py-1.5 rounded font-bold text-sm transition-colors"
                        >
                          Hapus
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="mt-6 border-t border-gray-800 pt-6 flex flex-col items-end gap-4">
              <p className="text-xl text-white">
                Total Pembayaran: <span className="font-extrabold text-blue-400 text-2xl ml-2">Rp {total.toLocaleString()}</span>
              </p>
              <Link 
                href="/checkout" 
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded font-bold text-lg transition-colors"
              >
                Lanjut ke Pembayaran
              </Link>
            </div>
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
}