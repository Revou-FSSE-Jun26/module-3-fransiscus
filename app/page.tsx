import ProductGrid from "../components/ProductGrid";
import SearchBar from "../components/SearchBar";
import { API_BASE_URL } from "../lib/api"; 

export default async function HomePage({ 
  searchParams 
}: { 
  searchParams: Promise<{ query?: string }> 
}) {
  const resolvedParams = await searchParams;
  const query = resolvedParams?.query || "";
  
  let url = `${API_BASE_URL}/products`;
  if (query) {
    url += `?search=${encodeURIComponent(query)}`;
  }

  let products = [];
  try {
    const res = await fetch(url, { cache: "no-store" });
    if (res.ok) {
      products = await res.json();
    }
  } catch (error) {
    console.error("Gagal mengambil data produk:", error);
  }

  return (
    <div className="container mx-auto p-6 min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <h1 className="text-3xl font-extrabold text-white">Selamat Datang di RevoShop</h1>
        <div className="w-full md:w-1/3">
          <SearchBar />
        </div>
      </div>

      {/* Menggunakan ProductGrid agar sesuai kriteria komponen */}
      <ProductGrid products={products} />
    </div>
  );
}