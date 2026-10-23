import { Metadata } from 'next';

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const resolvedParams = await params;
  return { title: `Detail Produk ${resolvedParams.id} - RevoShop` };
}

async function getProductDetail(id: string) {
  try {
    const res = await fetch("http://127.0.0.1:5000/products", { cache: 'no-store' });
    if (!res.ok) throw new Error("Gagal memuat data");
    const products = await res.json();
    return products.find((p: any) => p.id.toString() === id);
  } catch (error) {
    return null;
  }
}

export default async function ProductDetail({ params }: { params: { id: string } }) {
  const resolvedParams = await params;
  const product = await getProductDetail(resolvedParams.id);

  if (!product) {
    return <div className="text-center py-20 text-xl text-red-500">Produk tidak ditemukan.</div>;
  }

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