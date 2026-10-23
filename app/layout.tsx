import type { Metadata } from "next";
import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { AuthProvider } from "../context/AuthContext";
import { CartProvider } from "../context/CartContext";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "RevoShop - Full-Stack E-Commerce",
  description: "Aplikasi E-Commerce RevoShop Checkpoint 3",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body className="bg-gray-950 text-white min-h-screen flex flex-col">
        <AuthProvider>
          <CartProvider>
            <Toaster position="top-right" />
            <Header />
            <main className="flex-grow container mx-auto px-4 py-8">
              {children}
            </main>
            <Footer />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}