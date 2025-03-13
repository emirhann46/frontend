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
  const { user, isAuthenticated } = useAuthStore();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Client tarafında çalıştığından emin ol
    if (typeof window !== "undefined") {
      // Kullanıcı giriş yapmamışsa login sayfasına yönlendir
      if (!isAuthenticated) {
        toast.error("Bu sayfaya erişmek için giriş yapmalısınız.");
        router.push("/auth/login");
        return;
      }

      // Kullanıcı admin değilse ana sayfaya yönlendir
      if (user?.rol !== "admin") {
        toast.error("Bu sayfaya erişim yetkiniz bulunmamaktadır.");
        router.push("/");
        return;
      }

      // Kullanıcı admin ise erişime izin ver
      setIsAuthorized(true);
      setIsLoading(false);
    }
  }, [isAuthenticated, user, router]);

  // Yükleme durumunda basit bir yükleniyor göstergesi
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-2">Yetki kontrol ediliyor...</h2>
          <p className="text-muted-foreground">Lütfen bekleyin</p>
        </div>
      </div>
    );
  }

  // Yetkisiz erişim durumunda hiçbir şey gösterme (zaten yönlendirme yapılacak)
  if (!isAuthorized) {
    return null;
  }

  // Yetkili kullanıcı için içeriği göster
  return (
    <div className="admin-layout">
      {children}
    </div>
  );
}
