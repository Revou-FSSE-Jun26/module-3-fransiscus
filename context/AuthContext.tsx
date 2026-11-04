"use client";
import React, { createContext, useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export interface User {
  id: number;
  username: string;
  email: string;
  role: 'admin' | 'pelanggan';
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  loginUser: (userData: User, token: string) => void;
  logoutUser: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  loginUser: () => {},
  logoutUser: () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const savedUser = localStorage.getItem('revoshop_user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (e) {
        localStorage.removeItem('revoshop_user');
      }
    }
    setLoading(false);
  }, []);

  const loginUser = (userData: User, token: string) => {
    localStorage.setItem('revoshop_user', JSON.stringify(userData));
    localStorage.setItem('revoshop_token', token);
    setUser(userData);
    toast.success(`Selamat datang, ${userData.username}!`);
    if (userData.role === 'admin') {
      router.push('/dashboard');
    } else {
      router.push('/');
    }
  };

  const logoutUser = () => {
    localStorage.removeItem('revoshop_user');
    localStorage.removeItem('revoshop_token');
    setUser(null);
    toast.success('Berhasil keluar!');
    router.push('/login');
  };

  return (
    <AuthContext.Provider value={{ user, loading, loginUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
}

// Tambahkan export useAuth di sini agar langsung terbaca
export function useAuth() {
  return useContext(AuthContext);
}