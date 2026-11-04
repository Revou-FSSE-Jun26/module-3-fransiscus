"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../hooks/useAuth'; // Sesuaikan path hook auth Anda

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
  const { login } = useAuth() as any; // Fungsi login dari context auth (jika ada)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        // Jika backend menyediakan fungsi login di context, panggil di sini
        if (login) {
          login(data.user); // Menyimpan state user
        }
        
        // Simpan data ke localStorage sebagai cadangan
        localStorage.setItem('user', JSON.stringify(data.user || data));

        alert('Login berhasil!');
        router.push('/'); // Arahkan ke halaman utama/katalog
      } else {
        setError(data.message || 'Email atau password salah.');
      }
    } catch (err) {
      setError('Terjadi kesalahan koneksi ke server.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md max-w-md mx-auto border">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Masuk ke Akun</h2>

      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded text-sm font-medium">
          {error}
        </div>
      )}

      <div className="mb-4">
        <label className="block text-gray-700 mb-2 font-medium">Email / Username</label>
        <input 
          type="text" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          className="w-full p-2 border rounded text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500" 
          required 
        />
      </div>

      <div className="mb-6">
        <label className="block text-gray-700 mb-2 font-medium">Password</label>
        <input 
          type="password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          className="w-full p-2 border rounded text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500" 
          required 
        />
      </div>

      <button 
        type="submit" 
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 font-bold transition-colors"
      >
        Masuk
      </button>
    </form>
  );
}