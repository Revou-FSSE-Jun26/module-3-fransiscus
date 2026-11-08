"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import toast from "react-hot-toast";

const CartContext = createContext<any>(null);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<any[]>([]);

  // Memuat keranjang dari localStorage saat pertama kali dimuat
  useEffect(() => {
    const savedCart = localStorage.getItem("revoshop_cart");
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (e) {
        console.error("Gagal memparsing keranjang:", e);
      }
    }
  }, []);

  // Menyimpan keranjang ke localStorage setiap kali ada perubahan
  useEffect(() => {
    localStorage.setItem("revoshop_cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product: any, quantity: number = 1) => {
    setCart((prevCart: any[]) => {
      const existingIndex = prevCart.findIndex((item) => item.id === product.id);
      if (existingIndex > -1) {
        const updated = [...prevCart];
        updated[existingIndex].quantity += quantity;
        return updated;
      }
      return [...prevCart, { 
        id: product.id, 
        name: product.name, 
        price: product.price, 
        image: product.image, 
        quantity 
      }];
    });

    // Toast ditaruh di luar setCart agar aman dari error rendering React
    toast.success(`${product.name} ditambahkan ke keranjang!`);
  };

  const removeFromCart = (id: number) => {
    setCart((prevCart: any[]) => prevCart.filter(item => item.id !== id));
    toast.success("Produk dihapus dari keranjang");
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);