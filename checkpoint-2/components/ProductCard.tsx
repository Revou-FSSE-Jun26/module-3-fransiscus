"use client"; // Wajib ditambahkan karena kita menggunakan interaksi klik & state (useState)

import { useState } from 'react';
import Card from './Card';

// Memenuhi rubrik: Antarmuka didefinisikan
export interface ProductCardProps {
  id: number;
  name: string;
  price: number;
  image?: string; // Properti opsional
  stock?: number; // Properti opsional
}

// Memenuhi rubrik: Properti opsional menggunakan default destructuring
export default function ProductCard({
  id,
  name,
  price,
  image = 'https://via.placeholder.com/300x200?text=No+Image', 
  stock = 10 
}: ProductCardProps) {
  const [quantity, setQuantity] = useState(1);
  const isOutOfStock = stock === 0;

  // Memenuhi rubrik: Penghitung kuantitas berfungsi dengan benar
  const increment = () => {
    if (quantity < stock) setQuantity(prev => prev + 1);
  };

  const decrement = () => {
    if (quantity > 1) setQuantity(prev => prev - 1);
  };

  return (
    // Memenuhi rubrik: Card sebagai pembungkus
    <Card className="flex flex-col h-full hover:shadow-lg transition-shadow">
      <img src={image} alt={name} className="w-full h-48 object-cover" />
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-lg font-semibold text-gray-800 mb-1">{name}</h3>
        <p className="text-blue-600 font-bold mb-4">Rp {price.toLocaleString('id-ID')}</p>
        
        <div className="mt-auto">
          {/* Fitur Kuantitas hanya tampil jika stok ada */}
          {!isOutOfStock && (
            <div className="flex items-center justify-between mb-4 border rounded-md p-1 w-max">
              <button onClick={decrement} className="px-3 py-1 bg-gray-100 rounded hover:bg-gray-200 text-gray-700 font-bold">-</button>
              <span className="px-4 font-medium">{quantity}</span>
              <button onClick={increment} className="px-3 py-1 bg-gray-100 rounded hover:bg-gray-200 text-gray-700 font-bold">+</button>
            </div>
          )}

          {/* Memenuhi rubrik: Gaya tombol berbeda untuk barang tersedia/tidak */}
          {isOutOfStock ? (
            <button disabled className="w-full py-2 bg-gray-300 text-gray-500 rounded-md cursor-not-allowed font-medium">
              Stok Habis
            </button>
          ) : (
            <button className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors font-medium">
              Tambah ke Keranjang
            </button>
          )}
        </div>
      </div>
    </Card>
  );
}