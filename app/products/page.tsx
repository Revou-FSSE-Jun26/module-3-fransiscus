import ProductCard from "../../components/ProductCard";
import SearchBar from "../../components/SearchBar";

export const metadata = { title: "Katalog Produk - RevoShop" };

async function getProducts() {
  try {
    const res = await fetch("http://127.0.0.1:5000/products", { cache: 'no-store' });
    if (!res.ok) throw new Error("Gagal mengambil data API");
    return await res.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}

export default async function ProductsPage({ searchParams }: { searchParams: { query?: string } }) {
  const resolvedParams = await searchParams;
  const query = resolvedParams.query || "";
  const products = await getProducts();

  const filteredProducts = query 
    ? products.filter((p: any) => p.name.toLowerCase().includes(query.toLowerCase()))
    : products;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Semua Produk</h1>
      <SearchBar />
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((p: any) => (
            <ProductCard 
              key={p.id} 
              id={p.id} 
              name={p.name} 
              price={p.price} 
              stock={p.stock} 
              image={p.image} 
            />
          ))
        ) : (
          <p className="text-gray-500 col-span-full">Tidak ada produk ditemukan.</p>
        )}
      </div>
    </div>
  );
}