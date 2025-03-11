"use client";

import React, { useEffect, useState } from 'react';
import useAuthStore from "@/app/hooks/useAuth";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const { user, isAuthenticated, refreshUserData, getJwt } = useAuthStore();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isClient, setIsClient] = useState(false);

  // Sadece istemci tarafında çalıştığından emin olsdsadsa
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Kullanıcının admin olup olmadığını kontrol et
  const isAdmin = user?.rol === "admin";
  console.log("Admin Layout - Kullanıcı:", user);
  console.log("Admin Layout - Rol:", user?.rol);

  // Sayfa yüklendiğinde veya yenilendiğinde kullanıcı bilgilerini güncelle
  useEffect(() => {
    const checkAuth = async () => {
      setIsLoading(true);

      // JWT token'ı kontrol et
      const token = getJwt();
      console.log("Admin Layout - Token:", token);

      if (!token) {
        // Token yoksa login sayfasına yönlendir
        toast.error("Oturum süreniz dolmuş. Lütfen tekrar giriş yapın.");
        router.push("/auth/login");
        setIsLoading(false);
        return;
      }

      try {
        // Kullanıcı bilgilerini güncelle
        await refreshUserData();
        setIsLoading(false);
      } catch (error) {
        console.error("Kullanıcı bilgileri güncellenirken hata:", error);
        toast.error("Kullanıcı bilgileri alınamadı. Lütfen tekrar giriş yapın.");
        router.push("/auth/login");
        setIsLoading(false);
      }
    };

    if (isClient) {
      checkAuth();
    }
  }, [isClient, refreshUserData, router, getJwt]);

  // Kullanıcı yetkilerini kontrol et
  useEffect(() => {
    if (!isLoading && isClient) {
      // Kullanıcı giriş yapmamışsa login sayfasına yönlendir
      if (!isAuthenticated) {
        toast.error("Bu sayfaya erişmek için giriş yapmalısınız.");
        router.push("/auth/login");
        return;
      }

      // Kullanıcı admin değilse ana sayfaya yönlendir
      if (isAuthenticated && !isAdmin) {
        toast.error("Bu sayfaya erişmek için admin yetkisine sahip olmalısınız.");
        router.push("/");
      }
    }
  }, [isAuthenticated, isAdmin, router, isLoading, isClient]);

  // Yükleniyor durumu
  if (isLoading || !isClient) {
    return <div className="container py-10">Yetkilendirme kontrol ediliyor...</div>;
  }

  // Yetkisiz kullanıcılar için içerik gösterme
  if (!isAuthenticated || !isAdmin) {
    return null;
  }

  return (
    <div className="container py-10">
      <div>{children}</div>
    </div>
  );
};

export default AdminLayout;
