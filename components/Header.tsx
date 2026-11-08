"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";

export default function Header() {
  const pathname = usePathname();
  const { user, logout, userRole } = useAuth() as any; 
  const [mounted, setMounted] = useState(false);

  // Memastikan komponen hanya merender bagian user setelah terpasang di browser (mencegah Hydration Error)
  useEffect(() => {
    setMounted(true);
  }, []);

  const isActive = (path: string) => 
    pathname === path ? "text-blue-400 font-bold border-b-2 border-blue-400 pb-1" : "text-gray-300 hover:text-white transition-colors";

  const role = user?.role || userRole;
  const userName = user?.name || user?.email || "Admin";

  return (
    <header className="bg-gray-900 p-4 sticky top-0 z-50 shadow-md">
      <nav className="container mx-auto flex flex-wrap justify-between items-center gap-4">
        <Link href="/" className="text-2xl font-bold text-white tracking-wide">RevoShop</Link>
        
        <div className="flex gap-6 items-center font-medium">
          <Link href="/products" className={isActive("/products")}>Katalog</Link>
          <Link href="/categories" className={isActive("/categories")}>Kategori</Link>
          <Link href="/cart" className={isActive("/cart")}>Keranjang</Link>
          
          {/* Bagian dinamis yang dilindungi status mounted */}
          {mounted && (
            <>
              {user ? (
                <>
                  {role === "admin" && (
                    <Link href="/dashboard" className={isActive("/dashboard")}>Dashboard</Link>
                  )}
                  <Link href="/orders" className={isActive("/orders")}>Pesanan</Link>
                  <div className="flex items-center gap-3 ml-4 pl-4 border-l border-gray-700">
                    <span className="text-sm text-gray-400">Halo, {userName}</span>
                    <button onClick={() => {
                      if (typeof logout === 'function') logout();
                      else {
                        localStorage.removeItem("revoshop_token");
                        window.location.href = "/login";
                      }
                    }} className="bg-red-600 hover:bg-red-700 px-4 py-1.5 rounded-md text-white text-sm font-bold transition-colors">
                      Keluar
                    </button>
                  </div>
                </>
              ) : (
                <div className="flex items-center gap-3 ml-4 pl-4 border-l border-gray-700">
                  <Link href="/login" className={isActive("/login")}>Masuk</Link>
                  <Link href="/register" className={`px-4 py-1.5 rounded-md text-white text-sm font-bold transition-colors ${pathname === '/register' ? 'bg-blue-700' : 'bg-blue-600 hover:bg-blue-700'}`}>Daftar</Link>
                </div>
              )}
            </>
          )}
        </div>
      </nav>
    </header>
  );
}