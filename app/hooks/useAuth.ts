import { create } from "zustand";
import { persist } from "zustand/middleware";
import { User } from "../constans/type";
import axios from "axios";
import Cookies from 'js-cookie';

interface AuthState {
  jwt: string;
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  setJwt: (jwt: string) => void;
  setUser: (userData: any) => void;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  setIsLoading: (isLoading: boolean) => void;
  logout: () => void;
  error: string | null;
  getJwt: () => string | null;
  refreshUserData: () => Promise<void>;
}

const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      jwt: "",
      user: null,
      isAuthenticated: false,
      isLoading: false,

      setJwt: (jwt: string) => {
        // JWT'yi hem store'da hem de cookie'de sakla
        if (typeof window !== 'undefined') {
          // localStorage'da sakla
          localStorage.setItem("jwt", jwt);

          // Cookie'de sakla (7 gün geçerli)
          Cookies.set('jwt', jwt, { expires: 7, path: '/' });
        }
        set({ jwt });
      },

      setUser: (userData: any) => {
        if (!userData) {
          set({ user: null });
          return;
        }

        console.log("Gelen kullanıcı verisi:", userData);

        set({ user: userData, isAuthenticated: true });
      },

      setIsAuthenticated: (isAuthenticated: boolean) => set({ isAuthenticated }),
      setIsLoading: (isLoading: boolean) => set({ isLoading }),

      logout: () => {
        // Çıkış yaparken localStorage ve cookie'den JWT'yi temizle
        if (typeof window !== 'undefined') {
          localStorage.removeItem("jwt");
          Cookies.remove('jwt', { path: '/' });
        }
        set({ jwt: "", user: null, isAuthenticated: false });
      },

      error: null,

      // JWT'yi almak için yardımcı fonksiyon
      getJwt: () => {
        // Önce store'dan kontrol et
        const storeJwt = get().jwt;
        if (storeJwt) return storeJwt;

        // Store'da yoksa cookie'den kontrol et
        if (typeof window !== 'undefined') {
          const cookieJwt = Cookies.get('jwt');
          if (cookieJwt) return cookieJwt;

          // Cookie'de yoksa localStorage'dan kontrol et
          return localStorage.getItem("jwt");
        }
        return null;
      },

      // Kullanıcı bilgilerini sunucudan yeniden yükle
      refreshUserData: async () => {
        try {
          const { getJwt, setUser } = get();
          const token = getJwt();

          if (!token) {
            console.error("Yetkilendirme token'ı bulunamadı");
            return;
          }

          // Kullanıcı bilgilerini API'den al
          const response = await axios.get("http://localhost:1337/api/users/me", {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });

          if (response.data) {
            console.log("Kullanıcı bilgileri güncellendi:", response.data);
            setUser(response.data);
          }
        } catch (error) {
          console.error("Kullanıcı bilgileri güncellenirken hata oluştu:", error);
        }
      }
    }),
    {
      name: "auth-storage",
    }
  )
);

export default useAuthStore;
