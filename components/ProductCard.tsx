"use client";
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { useCart } from '@/hooks/useCart';
import toast from 'react-hot-toast';

export default function ProductCard({ id, name, price, stock, image }: any) {
  const { user } = useAuth() as any;
  const { addToCart } = useCart() as any;
  const router = useRouter();

  const handleAddToCart = () => {
    // Membungkus kembali data menjadi satu objek untuk dimasukkan ke keranjang
    const productItem = { id, name, price, stock, image };
    addToCart(productItem);
    toast.success(`${name} ditambahkan ke keranjang!`);
  };

  return (
    <div className="bg-gray-900 border border-gray-800 p-4 rounded-lg shadow-xl flex flex-col justify-between">
      <div>
        <img src={image} alt={name} className="w-full h-48 object-cover rounded-md mb-4" />
        <h3 className="text-lg font-bold text-white mb-1">{name}</h3>
        <p className="text-yellow-400 font-semibold mb-4">Rp {price?.toLocaleString()}</p>
      </div>

      {/* Logika Tombol Dinamis Sesuai Rubrik */}
      {!user ? (
        <button
          onClick={() => router.push('/login')}
          className="w-full bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 rounded transition-colors"
        >
          Masuk untuk membeli
        </button>
      ) : (
        <button
          onClick={handleAddToCart}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded transition-colors"
        >
          Tambah ke Keranjang
        </button>
      )}
    </div>
  );
}