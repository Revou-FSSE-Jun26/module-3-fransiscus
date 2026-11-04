"use client";
import Link from 'next/link';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

export default function Header() {
  const { user, logoutUser } = useAuth();
  const { cart } = useCart();

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <header className="bg-blue-600 text-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex flex-wrap justify-between items-center gap-4">
        <Link href="/" className="text-2xl font-extrabold tracking-wide">
          RevoShop
        </Link>

        <nav className="flex items-center gap-6 font-medium">
          <Link href="/" className="hover:text-gray-200">Produk</Link>
          <Link href="/categories" className="hover:text-gray-200">Kategori</Link>
          <Link href="/orders" className="hover:text-gray-200">Pesanan</Link>

          <Link href="/cart" className="relative hover:text-gray-200 flex items-center gap-1">
            <span>🛒 Keranjang</span>
            {totalItems > 0 && (
              <span className="bg-yellow-400 text-gray-900 text-xs font-bold px-2 py-0.5 rounded-full">
                {totalItems}
              </span>
            )}
          </Link>

          {user?.role === 'admin' && (
            <Link href="/dashboard" className="bg-yellow-500 text-gray-900 px-3 py-1 rounded font-bold hover:bg-yellow-400">
              Dasbor Admin
            </Link>
          )}

          {user ? (
            <div className="flex items-center gap-3 border-l border-blue-400 pl-4">
              <span data-testid="header-username" className="font-bold text-sm bg-blue-700 px-3 py-1 rounded">
                👤 {user.username} ({user.role})
              </span>
              <button
                onClick={logoutUser}
                className="bg-red-500 hover:bg-red-600 text-white text-sm px-3 py-1 rounded font-bold transition-colors"
              >
                Keluar
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2 border-l border-blue-400 pl-4">
              <Link href="/login" className="bg-white text-blue-600 px-3 py-1 rounded font-bold hover:bg-gray-100 text-sm">
                Masuk
              </Link>
              <Link href="/register" className="bg-blue-800 text-white px-3 py-1 rounded font-bold hover:bg-blue-900 text-sm">
                Daftar
              </Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}