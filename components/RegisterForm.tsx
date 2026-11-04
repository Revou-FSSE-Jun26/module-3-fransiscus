"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function RegisterForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        alert('Registrasi berhasil! Silakan masuk menggunakan akun Anda.');
        router.push('/login');
      } else {
        setError(data.message || 'Gagal melakukan registrasi. Silakan coba lagi.');
      }
    } catch (err) {
      setError('Terjadi kesalahan koneksi ke server.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md max-w-md mx-auto border">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Daftar Akun Baru</h2>

      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded text-sm font-medium">
          {error}
        </div>
      )}

      <div className="mb-4">
        <label className="block text-gray-700 mb-2 font-medium">Nama Lengkap</label>
        <input 
          type="text" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          className="w-full p-2 border rounded text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500" 
          required 
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 mb-2 font-medium">Email</label>
        <input 
          type="email" 
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
        className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 font-bold transition-colors"
      >
        Daftar
      </button>
    </form>
  );
}