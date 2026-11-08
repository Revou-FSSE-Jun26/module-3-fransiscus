"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error ke sistem pelaporan (bisa dilihat di console browser)
    console.error("Produk Error:", error);
  }, [error]);

  return (
    <div className="container mx-auto p-6 flex flex-col items-center justify-center min-h-[50vh]">
      <div className="bg-gray-900 border border-red-900/50 p-8 rounded-lg text-center max-w-md w-full shadow-lg">
        <h2 className="text-2xl font-bold text-red-400 mb-4">Terjadi Kesalahan!</h2>
        <p className="text-gray-300 mb-6">
          {error.message || "Gagal memuat data dari server. Pastikan backend API sudah berjalan."}
        </p>
        <button
          onClick={() => reset()}
          className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-6 rounded transition-colors"
        >
          Coba Lagi
        </button>
      </div>
    </div>
  );
}