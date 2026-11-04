"use client";
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function ProtectedRoute({ children, allowedRole }: { children: React.ReactNode, allowedRole?: string }) {
  const router = useRouter();

  useEffect(() => {
    const userStr = localStorage.getItem('user');
    if (!userStr) {
      router.push('/login');
      return;
    }

    if (allowedRole) {
      const user = JSON.parse(userStr);
      if (user.role !== allowedRole) {
        router.push('/');
      }
    }
  }, [router, allowedRole]);

  return <>{children}</>;
}