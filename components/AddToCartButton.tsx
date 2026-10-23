"use client";
import { useCart } from '../context/CartContext';

export default function AddToCartButton({ product }: { product: any }) {
  const { addToCart } = useCart();

  return (
    <button
      onClick={() => addToCart(product)}
      className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 font-bold transition-colors"
    >
      Tambah ke Keranjang
    </button>
  );
}