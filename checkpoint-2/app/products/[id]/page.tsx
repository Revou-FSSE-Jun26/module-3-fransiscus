import { Metadata } from 'next';

const mockProducts: Record<string, any> = {
  "1": { id: 1, name: "Sepatu Sneakers Nike", price: 750000, stock: 5, image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff" },
  "2": { id: 2, name: "Kemeja Flanel Casual", price: 185000, stock: 12, image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c" },
  "3": { id: 3, name: "Tas Ransel Laptop", price: 320000, stock: 8, image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62" },
  "4": { id: 4, name: "Jam Tangan Minimalis", price: 450000, stock: 3, image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30" },
  "5": { id: 5, name: "Topi Baseball Polos", price: 85000, stock: 20, image: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b" },
};

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const resolvedParams = await params;
  return { title: `Detail Produk ${resolvedParams.id} - RevoShop` };
}

export default async function ProductDetail({ params }: { params: { id: string } }) {
  const resolvedParams = await params;
  let product = mockProducts[resolvedParams.id] || {
    id: resolvedParams.id,
    name: `Produk Pilihan #${resolvedParams.id}`,
    price: 250000,
    stock: 10,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30"
  };
  
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/products/${resolvedParams.id}`, { cache: 'no-store' });
    if (res.ok) {
      const data = await res.json();
      if (data && data.name) product = data;
    }
  } catch (e) {}

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow border border-gray-100">
      <h1 className="text-3xl font-bold mb-4 text-gray-800">{product.name}</h1>
      <img src={product.image || "https://images.unsplash.com/photo-1523275335684-37898b6baf30"} alt={product.name} className="w-full h-64 object-cover mb-6 rounded-md" />
      <p className="text-2xl text-blue-600 font-bold mb-4">Rp {product.price?.toLocaleString('id-ID')}</p>
      <p className="text-gray-600 mb-6">Stok tersisa: {product.stock}</p>
      <button className="w-full bg-blue-600 text-white py-3 rounded-md font-bold hover:bg-blue-700 transition-colors">
        Tambah ke Keranjang
      </button>
    </div>
  );
}