import ProductCard from "../components/ProductCard";
import SearchBar from "../components/SearchBar";
import AddProductForm from "../components/AddProductForm";

async function getProducts() {
  try {
    // Menggunakan URL statis 127.0.0.1 agar koneksi Next.js ke Flask lebih stabil
    const res = await fetch("http://127.0.0.1:5000/products", { cache: 'no-store' });
    if (!res.ok) throw new Error("Gagal mengambil data API");
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

export default async function Home() {
  const products = await getProducts();
  // Menampilkan maksimal 5 produk di halaman depan
  const displayProducts = products.slice(0, 5);

  return (
    <div>
      <div className="flex justify-between items-end mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Katalog Utama</h1>
      </div>
      
      <SearchBar />
      
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {displayProducts.length > 0 ? (
          displayProducts.map((p: any) => (
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
          <p className="text-gray-500 col-span-full">Belum ada produk di database. Tambahkan produk baru!</p>
        )}
      </div>

      <hr className="my-10" />
      <AddProductForm />
    </div>
  );
}