"use client";
import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { API_BASE_URL } from '../../lib/api';
import Link from 'next/link';
import toast from 'react-hot-toast';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { loginUser } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_BASE_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (res.ok) {
        loginUser(data.user, data.token);
      } else {
        toast.error(data.error || 'Email atau password salah!');
      }
    } catch (err) {
      toast.error('Gagal terhubung ke server.');
    }
  };

  return (
    <div className="max-w-md mx-auto bg-gray-900 border border-gray-800 p-8 rounded-lg shadow-xl mt-10">
      <h1 className="text-2xl font-bold mb-6 text-white text-center">Masuk ke RevoShop</h1>
      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <label className="block text-gray-300 mb-1 text-sm">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2.5 bg-gray-800 border border-gray-700 rounded text-white"
            required
          />
        </div>
        <div>
          <label className="block text-gray-300 mb-1 text-sm">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2.5 bg-gray-800 border border-gray-700 rounded text-white"
            required
          />
        </div>
        <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 rounded transition-colors">
          Masuk
        </button>
      </form>
      <p className="text-center text-gray-400 text-sm mt-4">
        Belum punya akun? <Link href="/register" className="text-blue-400 hover:underline">Daftar di sini</Link>
      </p>
    </div>
  );
}