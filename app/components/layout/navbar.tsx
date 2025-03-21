"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ThemeSwitcher } from "@/app/components/theme/theme-switcher";
import { Button } from "@/components/ui/button";
import { UserCircle, ShoppingCart, Ticket, Gift, LogOut, User, Inbox, CalendarDays, Users, Building, PlusCircle, RefreshCw, Menu, X, Home } from "lucide-react";
import { useEffect, useState } from "react";
import useAuthStore from "@/app/hooks/useAuth";
import { toast } from "react-hot-toast";
import MobileMenu from "./mobile-menu";


export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isAuthenticated, user, logout, refreshUserData } = useAuthStore();
  const [isClient, setIsClient] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Sadece istemci tarafında çalıştığından emin ol
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Kullanıcı rolünü doğru şekilde al
  const userRole = user?.rol;

  // Sayfa değiştiğinde kullanıcı bilgilerini güncelle
  useEffect(() => {
    if (isClient && isAuthenticated) {
      refreshUserData().catch(console.error);
    }
  }, [pathname, isClient, isAuthenticated, refreshUserData]);


  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleLogout = () => {
    logout();
    // Çıkış yapıldıktan sonra ana sayfaya yönlendir
    window.location.href = "/";
  };

  // Kullanıcı bilgilerini manuel olarak yenile
  const handleRefreshUserData = async () => {
    if (!isAuthenticated) return;

    setIsRefreshing(true);
    toast.loading("Kullanıcı bilgileri güncelleniyor...", { id: "refreshUser" });

    try {
      await refreshUserData();
      toast.success("Kullanıcı bilgileri güncellendi.", { id: "refreshUser" });

      // Kullanıcı admin değilse ve admin sayfasındaysa ana sayfaya yönlendirrrr
      if (userRole !== "admin" && pathname.startsWith("/admin")) {
        toast.error("Admin yetkileriniz değiştirildi. Ana sayfaya yönlendiriliyorsunuz.");
        router.push("/");
      }
    } catch (error) {
      toast.error("Kullanıcı bilgileri güncellenemedi.", { id: "refreshUser" });
    } finally {
      setIsRefreshing(false);
    }
  };

  const navLinks = [
    { href: "/", label: "Ana Sayfa", icon: Home },
    { href: "/events", label: "Etkinlikler", icon: CalendarDays },
  ];

  // Admin için özel linkler
  const adminLinks = [
    { href: "/admin", label: "Admin Paneli", icon: UserCircle }, // Genel yönetim için
    { href: "/admin/users", label: "Kullanıcılar", icon: Users }, // Birden fazla kullanıcı için
    { href: "/admin/requests", label: "İstekler", icon: Inbox }, // Gelen istekleri temsil eden bir ikon
    { href: "/admin/create", label: "Etkinlik Ekle", icon: PlusCircle }, // Yeni bir şey eklemek için artı ikonu
    { href: "/profile", label: "Profil", icon: User }, // Kullanıcı profilini belirtmek için
  ];

  // Normal kullanıcı linkleri
  const userLinks = [
    { href: "/tickets", label: "Biletlerim", icon: Ticket },
    { href: "/cart", label: "Sepet", icon: ShoppingCart },
    { href: "/coupons", label: "Kuponlarım", icon: Gift },
    { href: "/profile", label: "Profil", icon: UserCircle },
  ];

  // Organizatör linkleri
  const organizerLinks = [
    { href: "/organizer", label: "Organizatör Paneli", icon: UserCircle },
    { href: "/organizer/events", label: "Etkinliklerim", icon: Ticket },
    { href: "/profile", label: "Profil", icon: UserCircle },
  ];

  // Kullanıcı rolüne göre aktif linkleri belirle
  let activeLinks: any[] = [];

  // İstemci tarafında ve kimlik doğrulaması yapılmışsa linkleri göster
  if (isClient && isAuthenticated) {
    if (userRole === "admin") {
      activeLinks = adminLinks;
    } else if (userRole === "organizer") {
      activeLinks = organizerLinks;
    } else {
      activeLinks = userLinks;
    }
  }

  // Sayfa sunucu tarafında render ediliyorsa veya kullanıcı bilgileri henüz yüklenmemişse
  // sadece temel içeriği göster
  if (!isClient) {
    return (
      <nav className="bg-background border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <span className="text-2xl font-bold text-primary">Bilet App</span>
              </div>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:items-center sm:space-x-4">
              <div className="h-5 w-5" /> {/* Tema değiştirici isdsadasçin yer tutucu */}
            </div>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav className="bg-background border-b border-border">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="text-2xl font-bold text-primary">
                BiletApp
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`inline-flex justify-center items-center px-3 pt-1 border-b-2 text-sm font-medium cursor-pointer ${pathname === link.href
                    ? "border-primary text-primary"
                    : "border-transparent text-foreground hover:border-border hover:text-primary"
                    }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center sm:space-x-4">
            <ThemeSwitcher />

            {isAuthenticated ? (
              <>
                {activeLinks.map((link: any) => (
                  <Link key={link.href} href={link.href}>
                    <div
                      className={`flex flex-col items-center px-3 cursor-pointer ${pathname === link.href ? "bg-accent" : ""
                        }`}
                    >
                      <link.icon className="h-5 w-5" />
                      <span className="text-xs mt-1">{link.label}</span>
                    </div>
                  </Link>
                ))}
                <Button
                  variant="link"
                  size="icon"
                  onClick={handleLogout}
                  className="flex px-2 flex-col items-center cursor-pointer"
                >
                  <LogOut className="h-5 w-5" />
                  <span className="text-xs">Çıkış Yap</span>
                </Button>
              </>
            ) : (
              <>
                <Link href="/auth/login">
                  <Button variant="ghost" className="cursor-pointer">Giriş Yap</Button>
                </Link>
                <Link href="/auth/register">
                  <Button className="cursor-pointer">Kayıt Ol</Button>
                </Link>
              </>
            )}
          </div>
          <div className="flex items-center sm:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMobileMenu}
              aria-expanded={mobileMenuOpen}
              className="relative z-20"
            >
              <span className="sr-only">Menüyü Aç</span>
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu - Using the MobileMenu component */}
      <MobileMenu
        isOpen={mobileMenuOpen}
        navLinks={navLinks}
        activeLinks={activeLinks}
        isAuthenticated={isAuthenticated}
        user={user}
        pathname={pathname}
        handleLogout={handleLogout}
        handleRefreshUserData={handleRefreshUserData}
        isRefreshing={isRefreshing}
      />
    </nav>
  );
}
