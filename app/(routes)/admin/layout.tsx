"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useAuthStore from "@/app/hooks/useAuth";
import { toast } from "react-hot-toast";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { user, isAuthenticated, isLoading: authLoading, refreshUserData } = useAuthStore();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Kullanıcı bilgilerini yenile
        await refreshUserData();

        if (!isAuthenticated) {
          toast.error("Bu sayfaya erişmek için giriş yapmalısınız.");
          router.push("/auth/login");
          return;
        }

        if (user?.rol !== "admin") {
          toast.error("Bu sayfaya erişim yetkiniz bulunmamaktadır.");
          router.push("/");
          return;
        }

        setIsAuthorized(true);
      } catch (error) {
        console.error("Yetkilendirme hatası:", error);
        toast.error("Yetkilendirme hatası oluştu.");
        router.push("/auth/login");
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [isAuthenticated, user, router, refreshUserData]);

  if (isLoading || authLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-2">Yetki kontrol ediliyor...</h2>
          <p className="text-muted-foreground">Lütfen bekleyin</p>
        </div>
      </div>
    );
  }

  if (!isAuthorized) {
    return null;
  }

  return (
    <div className="admin-layout">
      {children}
    </div>
  );
}
