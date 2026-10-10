import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-blue-600 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">RevoShop</Link>
        <nav className="space-x-4">
          <Link href="/products" className="hover:underline">Produk</Link>
          <Link href="/categories" className="hover:underline">Kategori</Link>
          <Link href="/orders" className="hover:underline">Pesanan</Link>
        </nav>
      </div>
    </header>
  );
}