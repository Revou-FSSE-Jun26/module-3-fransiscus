"use client";
export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="text-center p-10 bg-red-50 rounded-lg mt-10 border border-red-200">
      <h2 className="text-red-600 text-2xl font-bold mb-4">Terjadi Kesalahan!</h2>
      <p className="text-gray-600 mb-4">Gagal mengambil data dari API Flask.</p>
      <button onClick={() => reset()} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Coba Lagi</button>
    </div>
  );
}