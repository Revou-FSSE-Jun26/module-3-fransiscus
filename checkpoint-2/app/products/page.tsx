import ProductCard from "../../components/ProductCard";
import SearchBar from "../../components/SearchBar";

const mockProducts = [
  { id: 1, name: "Sepatu Sneakers Nike", price: 750000, stock: 5, image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff" },
  { id: 2, name: "Kemeja Flanel Casual", price: 185000, stock: 12, image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c" },
  { id: 3, name: "Tas Ransel Laptop", price: 320000, stock: 8, image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62" },
  { id: 4, name: "Jam Tangan Minimalis", price: 450000, stock: 3, image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30" },
  { id: 5, name: "Topi Baseball Polos", price: 85000, stock: 20, image: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b" },
];

export const metadata = { title: "Katalog Produk - RevoShop" };

export default async function ProductsPage({ searchParams }: { searchParams: { query?: string } }) {
  const resolvedParams = await searchParams;
  const query = resolvedParams.query || "";
  let products = mockProducts;
  
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/products`, { cache: 'no-store' });
    if (res.ok) {
      const data = await res.json();
      let items = [];
      if (Array.isArray(data)) items = data;
      else if (data.products && Array.isArray(data.products)) items = data.products;
      else if (data.data && Array.isArray(data.data)) items = data.data;
      if (items.length > 0) products = items;
    }
  } catch (e) {}

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
            <ProductCard key={p.id} id={p.id} name={p.name} price={p.price} stock={p.stock} image={p.image} />
          ))
        ) : (
          <p className="text-gray-500">Tidak ada produk ditemukan.</p>
        )}
      </div>
    </div>
  );
}