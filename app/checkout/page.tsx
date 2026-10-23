"use client";
import { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../hooks/useAuth';
import { API_BASE_URL } from '../../lib/api';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export default function CheckoutPage() {
  const { cart, totalPrice, clearCart } = useCart();
  const { user } = useAuth();
  const router = useRouter();
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(false);

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) {
      toast.error('Keranjang kosong!');
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: user ? user.id : null,
          customer_name: user ? user.username : 'Tamu',
          address,
          items: cart,
        }),
      });
      if (res.ok) {
        toast.success('Pesanan berhasil dikonfirmasi!');
        clearCart();
        router.push('/orders');
      } else {
        toast.error('Gagal memproses pesanan.');
      }
    } catch (err) {
      toast.error('Terjadi kesalahan koneksi.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-gray-900 border border-gray-800 p-8 rounded-lg shadow-xl">
      <h1 className="text-2xl font-bold mb-6">Konfirmasi Pembayaran</h1>
      <div className="mb-6 bg-gray-800 p-4 rounded">
        <p className="text-gray-400 text-sm mb-1">Total Belanja:</p>
        <p className="text-2xl font-extrabold text-blue-400">Rp {totalPrice.toLocaleString()}</p>
      </div>
      <form onSubmit={handleCheckout} className="space-y-4">
        <div>
          <label className="block text-gray-300 mb-1 text-sm">Alamat Pengiriman Lengkap</label>
          <textarea
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full p-2.5 bg-gray-800 border border-gray-700 rounded text-white h-24"
            required
            placeholder="Contoh: Jl. Kebon Jeruk Raya No. 27, Jakarta Barat"
          />
        </div>
        <button
          type="submit"
          disabled={loading || cart.length === 0}
          className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded transition-colors disabled:opacity-50"
        >
          {loading ? 'Memproses...' : 'Bayar Sekarang'}
        </button>
      </form>
    </div>
  );
}