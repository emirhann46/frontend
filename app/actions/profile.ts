import axios from "axios";
import useAuthStore from "@/app/hooks/useAuth";

interface ProfileUpdateData {
  username?: string;
  email?: string;
  phone?: string;
  address?: string;
}

export const updateProfile = async (data: ProfileUpdateData) => {
  try {
    const { jwt } = useAuthStore.getState();

    const response = await axios.put(
      "http://localhost:1337/api/users/me?populate=*",
      data,
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      }
    );

    console.log("Profil güncelleme başarılı:", response.data);
    return response.data;
  } catch (error) {
    console.error("Profil güncelleme hatası:", error);
    throw error;
  }
};

export const changePassword = async (currentPassword: string, newPassword: string) => {
  try {
    const { jwt } = useAuthStore.getState();

    const response = await axios.post(
      "http://localhost:1337/api/auth/change-password",
      {
        currentPassword,
        password: newPassword,
        passwordConfirmation: newPassword,
      },
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      }
    );

    console.log("Şifre değiştirme başarılı:", response.data);
    return response.data;
  } catch (error) {
    console.error("Şifre değiştirme hatası:", error);
    throw error;
  }
};

export const uploadProfileImage = async (file: File) => {
  try {
    const { jwt } = useAuthStore.getState();

    const formData = new FormData();
    formData.append('files', file);

    // Önce dosyayı yükle
    const uploadResponse = await axios.post(
      "http://localhost:1337/api/upload",
      formData,
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
          'Content-Type': 'multipart/form-data',
        },
      }
    );

    // Yüklenen dosyanın ID'sini al
    const fileId = uploadResponse.data[0].id;

    // Kullanıcı profilini güncelle
    const updateResponse = await axios.put(
      "http://localhost:1337/api/users/me",
      {
        profileImage: fileId
      },
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      }
    );

    console.log("Profil resmi güncelleme başarılı:", updateResponse.data);
    return updateResponse.data;
  } catch (error) {
    console.error("Profil resmi güncelleme hatası:", error);
    throw error;
  }
}; 