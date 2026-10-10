export default function ProductsLayout({ children }: { children: React.ReactNode }) {
  return (
    <section>
      <div className="bg-blue-50 p-4 rounded-md mb-6 border border-blue-100">
        <p className="text-blue-800 font-medium">✨ Promo Spesial: Gratis Ongkir untuk semua produk di bawah ini!</p>
      </div>
      {children}
    </section>
  );
}