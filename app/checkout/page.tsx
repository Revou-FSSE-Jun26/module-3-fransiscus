"use client";

import { useState } from "react";
import { useCart } from "../../context/CartContext";
import { useRouter } from "next/navigation";
import ProtectedRoute from "../../components/ProtectedRoute";
import toast from "react-hot-toast";

export default function CheckoutPage() {
  const { cart, clearCart } = useCart();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) return;
    
    setLoading(true);
    // Simulasi proses checkout
    setTimeout(() => {
      toast.success("Pesanan berhasil dibuat!");
      clearCart();
      router.push("/orders"); // Mengarahkan ke halaman pesanan
    }, 1500);
  };

  return (
    <ProtectedRoute>
      <div className="container mx-auto p-6 max-w-2xl min-h-screen">
        <h1 className="text-3xl font-extrabold text-white mb-8">Checkout Pembayaran</h1>
        
        <div className="bg-gray-900 border border-gray-800 rounded-lg p-6 shadow-xl mb-6">
          <h2 className="text-xl font-bold text-white mb-4">Ringkasan Pesanan</h2>
          <div className="space-y-3 mb-6">
            {cart.map((item) => (
              <div key={item.id} className="flex justify-between text-gray-300">
                <span>{item.quantity}x {item.name}</span>
                <span className="font-semibold text-white">Rp {(item.price * item.quantity).toLocaleString()}</span>
              </div>
            ))}
          </div>
          <div className="border-t border-gray-700 pt-4 flex justify-between items-center">
            <span className="text-lg font-bold text-white">Total Keseluruhan</span>
            <span className="text-2xl font-extrabold text-blue-400">Rp {total.toLocaleString()}</span>
          </div>
        </div>

        <form onSubmit={handleCheckout} className="bg-gray-900 border border-gray-800 rounded-lg p-6 shadow-xl space-y-4">
          <h2 className="text-xl font-bold text-white mb-2">Data Pengiriman</h2>
          <div>
            <label className="block text-sm text-gray-400 mb-1">Alamat Lengkap</label>
            <textarea 
              required
              className="w-full bg-gray-800 border border-gray-700 rounded p-3 text-white outline-none focus:border-blue-500"
              rows={3}
              placeholder="Masukkan alamat pengiriman..."
            ></textarea>
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">Metode Pembayaran</label>
            <select className="w-full bg-gray-800 border border-gray-700 rounded p-3 text-white outline-none focus:border-blue-500">
              <option value="transfer">Transfer Bank (BCA/Mandiri)</option>
              <option value="cod">Bayar di Tempat (COD)</option>
              <option value="ewallet">GoPay / OVO / Dana</option>
            </select>
          </div>
          
          <button 
            type="submit" 
            disabled={loading || cart.length === 0}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded mt-4 transition-colors disabled:opacity-50"
          >
            {loading ? "Memproses..." : "Konfirmasi & Bayar"}
          </button>
        </form>
      </div>
    </ProtectedRoute>
  );
}