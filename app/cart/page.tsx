"use client";
import { useCart } from '../../context/CartContext';
import Link from 'next/link';

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, totalPrice } = useCart();

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-extrabold mb-6">Keranjang Belanja</h1>
      {cart.length === 0 ? (
        <div className="bg-gray-900 border border-gray-800 p-8 rounded-lg text-center">
          <p className="text-gray-400 mb-4">Keranjang belanja Anda kosong.</p>
          <Link href="/" className="bg-blue-600 text-white px-6 py-2 rounded font-bold hover:bg-blue-500">
            Mulai Belanja
          </Link>
        </div>
      ) : (
        <div className="bg-gray-900 border border-gray-800 rounded-lg p-6 shadow-xl">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-800 text-gray-400">
                <th className="pb-3">Produk</th>
                <th className="pb-3">Harga</th>
                <th className="pb-3">Jumlah</th>
                <th className="pb-3">Subtotal</th>
                <th className="pb-3 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {cart.map((item) => (
                <tr key={item.id}>
                  <td className="py-4 flex items-center gap-3">
                    <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded" />
                    <span className="font-semibold">{item.name}</span>
                  </td>
                  <td className="py-4">Rp {item.price.toLocaleString()}</td>
                  <td className="py-4">
                    <div className="flex items-center gap-2">
                      <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="px-2 bg-gray-800 border border-gray-700 rounded">-</button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="px-2 bg-gray-800 border border-gray-700 rounded">+</button>
                    </div>
                  </td>
                  <td className="py-4 font-semibold text-blue-400">Rp {(item.price * item.quantity).toLocaleString()}</td>
                  <td className="py-4 text-center">
                    <button onClick={() => removeFromCart(item.id)} className="text-red-400 hover:text-red-300 font-bold">Hapus</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="mt-6 flex justify-between items-center border-t border-gray-800 pt-4">
            <h2 className="text-xl font-bold">Total: Rp {totalPrice.toLocaleString()}</h2>
            <Link
              href="/checkout"
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-2.5 rounded font-bold transition-colors"
            >
              Lanjut ke Pembayaran
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}