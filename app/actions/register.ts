import axios from "axios";

const Urls = `http://localhost:1337/api/auth/local/register`;
export const register = async (username: string, email: string, password: string) => {
  try {
    console.log("Kayıt URL'si:", Urls);
    console.log("Gönderilen veriler:", { username, email, password });

    // Varsayılan olarak user rolü atanacak
    const response = await axios.post(Urls, {
      username,
      email,
      password
    });

    console.log("Kayıt başarılı:", response.data);
    return response.data;
  } catch (error: any) {
    console.error("Kayıt hatası:", error);
    console.error("Hata detayları:", error.response?.data);
    console.error("Hata durumu:", error.response?.status);
    console.error("Hata mesajı:", error.response?.data?.error?.message);
    console.error("Hata detayları:", error.response?.data?.error?.details);
    throw error;
  }
};

