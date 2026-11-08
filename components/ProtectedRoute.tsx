"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function ProtectedRoute({ children, allowedRole }: { children: React.ReactNode; allowedRole?: "admin" | "pelanggan" }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;
    if (!user) router.replace("/login");
    else if (allowedRole && user.role !== allowedRole) router.replace("/");
  }, [user, loading, allowedRole, router]);

  if (loading || !user || (allowedRole && user.role !== allowedRole)) return null;
  return <>{children}</>;
}