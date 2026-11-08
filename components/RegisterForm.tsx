"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { API_BASE_URL } from "@/lib/api";

export default function RegisterForm() {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validasi Manual: Pastikan tidak ada yang kosong
    if (!formData.name.trim() || !formData.email.trim() || !formData.password.trim()) {
      return setError("Semua kolom (Nama, Email, Password) wajib diisi!");
    }
    // Validasi panjang password
    if (formData.password.length < 6) {
      return setError("Password minimal harus 6 karakter.");
    }
    
    setError("");

    try {
      const res = await fetch(`${API_BASE_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Gagal mendaftar");
      }

      toast.success("Registrasi berhasil! Silakan login.");
      router.push("/login");
    } catch (err: any) {
      setError(err.message);
      toast.error("Terjadi kesalahan saat registrasi");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 bg-white p-8 rounded-xl shadow-lg w-full max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 text-center mb-4">Daftar Akun Baru</h2>
      
      {error && <div className="bg-red-100 text-red-600 p-3 rounded text-sm text-center font-medium">{error}</div>}
      
      <input type="text" placeholder="Nama Lengkap" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" />
      <input type="email" placeholder="Email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" />
      <input type="password" placeholder="Password" value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" />
      
      <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition-colors mt-2">
        Daftar Sekarang
      </button>
    </form>
  );
}