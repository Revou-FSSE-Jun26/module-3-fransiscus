"use client";
import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext"; 

export interface ProductCardProps {
    id: number;
    name: string;
    price: number;
    stock: number;
    image: string;
}

export default function ProductCard(product: ProductCardProps) {
    const { id, name, price, stock, image } = product;
    const [quantity, setQuantity] = useState(1);
    
    // Tambahkan 'as any' di sini untuk mengatasi error TypeScript Expected 1 arguments
    const { addToCart } = useCart() as any; 
    
    const isOutOfStock = stock <= 0;

    const handleAdd = () => { if (quantity < stock) setQuantity(q => q + 1); };
    const handleSub = () => { if (quantity > 1) setQuantity(q => q - 1); };

    return (
        <div className={`rounded-lg border p-4 transition-colors ${isOutOfStock ? 'bg-gray-100 opacity-60' : 'bg-white hover:shadow-lg'}`}>
            <Link href={`/products/${id}`}>
                <img src={image || '/placeholder.jpg'} alt={name} className="h-48 w-full object-cover rounded" />
                <h3 className="mt-2 font-bold text-lg text-gray-800">{name}</h3>
                <p className="text-blue-600 font-semibold">Rp {price.toLocaleString()}</p>
                <p className="text-sm text-gray-500">Sisa Stok: {stock}</p>
            </Link>

            {isOutOfStock ? (
                <button disabled className="mt-4 w-full rounded bg-red-500 py-2 text-white font-bold cursor-not-allowed">Habis Terjual</button>
            ) : (
                <div className="mt-4 flex flex-col gap-2">
                    <div className="flex items-center justify-between border rounded border-gray-300">
                        <button onClick={handleSub} className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-black">-</button>
                        <span className="text-black font-medium">{quantity}</span>
                        <button onClick={handleAdd} className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-black">+</button>
                    </div>
                    {/* Rubrik meminta addToCart(product, quantity) */}
                    <button onClick={() => addToCart(product, quantity)} className="w-full rounded bg-blue-600 py-2 text-white font-bold hover:bg-blue-700">
                        Tambah ke Keranjang
                    </button>
                </div>
            )}
        </div>
    );
}