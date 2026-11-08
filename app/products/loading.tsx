export default function Loading() {
  return (
    <div className="container mx-auto p-6 animate-pulse">
      {/* Skeleton untuk Header & Search */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <div className="h-10 bg-gray-800 rounded w-48"></div>
        <div className="h-10 bg-gray-800 rounded w-full md:w-1/3"></div>
      </div>

      {/* Skeleton untuk Kartu Produk (ProductGrid) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="bg-gray-800 border border-gray-700 rounded-lg overflow-hidden shadow-md flex flex-col h-[400px]">
            {/* Skeleton Gambar */}
            <div className="w-full h-48 bg-gray-700"></div>
            <div className="p-4 flex flex-col flex-grow gap-3">
              {/* Skeleton Teks */}
              <div className="h-6 bg-gray-700 rounded w-3/4"></div>
              <div className="h-5 bg-gray-700 rounded w-1/2"></div>
              <div className="h-4 bg-gray-700 rounded w-1/4 mb-4"></div>
              
              {/* Skeleton Tombol */}
              <div className="h-10 bg-gray-700 rounded w-full mt-auto"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}