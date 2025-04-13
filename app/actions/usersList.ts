// Client-side API işlemleri

import axios from "axios";
import useAuthStore from "../hooks/useAuth";
import useUsers from "../hooks/useUsers";

// Kullanıcı listesini getir
export async function getUsersList() {
  try {
    // JWT token'ı al
    const { getJwt } = useAuthStore.getState();
    const token = getJwt();

    if (!token) {
      console.error("Yetkilendirme token'ı bulunamadı");
      throw new Error("Yetkilendirme hatası! Giriş yapmalısın.");
    }

    // Kullanıcı listesini al
    const response = await axios.get("http://localhost:1337/api/users/", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    // Kullanıcı verilerini işle ve rol bilgisini düzgün formatta döndür
    const users = response.data.map((user: any) => {
      // Eğer rol null ise "Rol atanmamış" olarak ayarla
      if (user.rol === null) {
        user.rol = "";
      }
      return user;
    });

    const { setUsers } = useUsers.getState();
    setUsers(users);

    console.log("İşlenmiş kullanıcı listesi:", users);
    return users;
  } catch (error: any) {
    console.error("Kullanıcı listesi alınırken hata:", error);
    throw new Error(error.message || "Kullanıcı listesi alınamadı.");
  }
}

// Kullanıcı bilgilerini getir
export async function getUserById(id: string) {
  try {
    // JWT token'ı al
    const { getJwt } = useAuthStore.getState();
    const token = getJwt();

    if (!token) {
      throw new Error("Yetkilendirme hatası! Giriş yapmalısın.");
    }

    // Kullanıcı bilgilerini al
    const response = await axios.get(`http://localhost:1337/api/users/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    return response.data;
  } catch (error: any) {
    console.error("Kullanıcı bilgileri alınırken hata:", error);
    throw new Error(error.message || "Kullanıcı bilgileri alınamadı.");
  }
}

// Kullanıcı rolünü güncelle
export async function updateUserRole(userId: number, newRole: string) {
  try {
    // JWT token'ı al
    const { getJwt } = useAuthStore.getState();
    const token = getJwt();

    if (!token) {
      console.error("Yetkilendirme token'ı bulunamadı");
      throw new Error("Yetkilendirme hatası! Giriş yapmalısın.");
    }

    console.log(`Kullanıcı ID: ${userId} için rol güncelleniyor: ${newRole}`);

    // Kullanıcı rolünü güncelle
    const response = await axios.put(
      `http://localhost:1337/api/users/${userId}`,
      { rol: newRole },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("Rol güncelleme başarılı:", response.data);
    return response.data;
  } catch (error: any) {
    console.error("Kullanıcı rolü güncellenirken hata:", error);

    // Detaylı hata bilgisi
    if (error.response) {
      console.error("Hata detayları:", {
        status: error.response.status,
        data: error.response.data
      });
    }

    throw new Error(error.message || "Kullanıcı rolü güncellenemedi.");
  }
}

