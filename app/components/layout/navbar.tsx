"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ThemeSwitcher } from "@/app/components/theme/theme-switcher";
import { Button } from "@/components/ui/button";
import { UserCircle, ShoppingCart, Ticket, Gift, LogOut, User, Inbox, CalendarDays, Users, Building, PlusCircle, RefreshCw } from "lucide-react";
import { useEffect, useState } from "react";
import useAuthStore from "@/app/hooks/useAuth";
import { toast } from "react-hot-toast";

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
  console.log("Navbar - Kullanıcı:", user);
  const userRole = user?.rol;


  // Sayfa değiştiğinde kullanıcı bilgilerini güncelle
  useEffect(() => {
    if (isClient && isAuthenticated) {
      refreshUserData().catch(console.error);
    }
  }, [pathname, isClient, isAuthenticated]);

  // Debug için
  useEffect(() => {
    if (isClient) {
      console.log("Navbar - Kullanıcı:", user);
      console.log("Navbar - Kullanıcı rolü:", userRole);
      console.log("Navbar - Kimlik doğrulama durumu:", isAuthenticated);
    }
  }, [user, userRole, isAuthenticated, isClient]);

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

      // Kullanıcı admin değilse ve admin sayfasındaysa ana sayfaya yönlendir
      console.log("Navbar - Kullanıcı rolüymüş:", userRole);
      if (userRole !== "admin" && !pathname.startsWith("/admin")) {
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
    { href: "/", label: "Ana Sayfa" },
    { href: "/events", label: "Etkinlikler" },
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
                <span className="text-2xl font-bold text-primary">BiletApp</span>
              </div>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:items-center sm:space-x-4">
              <div className="h-5 w-5" /> {/* Tema değiştirici için yer tutucu */}
            </div>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav className="bg-background border-b border-border overflow-x-scroll">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
                      className={`flex flex-col items-center px-3 cursor-pointer ${pathname === link.href ? "bg-accent" : ""}`}
                    >
                      <link.icon className="h-5 w-5" />
                      <span className="text-xs mt-1">{link.label}</span>
                    </div>
                  </Link>
                ))}
                <Button variant="link" size="icon" onClick={handleLogout} className="flex px-2 flex-col items-center cursor-pointer">
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
          <div className="-mr-2 flex items-center sm:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMobileMenu}
              aria-expanded={mobileMenuOpen}
            >
              <span className="sr-only">Menüyü Aç</span>
              <svg
                className="block h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={
                    mobileMenuOpen
                      ? "M6 18L18 6M6 6l12 12"
                      : "M4 6h16M4 12h16M4 18h16"
                  }
                />
              </svg>
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="sm:hidden">
          <div className="pt-2 pb-3 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium cursor-pointer ${pathname === link.href
                  ? "border-primary text-primary bg-primary/10"
                  : "border-transparent text-foreground hover:bg-accent hover:border-border"
                  }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {isAuthenticated && (
            <div className="pt-4 pb-3 border-t border-border">
              {/* Mobil kullanıcı bilgileri */}
              <div className="flex items-center px-4 mb-3">
                <div className="ml-3">
                  <div className="text-base font-medium">{user?.username || user?.attributes?.username || "Kullanıcı"}</div>
                  <div className="text-sm text-muted-foreground">{user?.email || user?.attributes?.email || "E-posta yok"}</div>
                </div>
              </div>

              <div className="space-y-1">
                {/* Mobil yenileme butonu */}
                <button
                  onClick={handleRefreshUserData}
                  disabled={isRefreshing}
                  className="w-full text-left block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-foreground hover:bg-accent hover:border-border cursor-pointer"
                >
                  <div className="flex items-center">
                    <RefreshCw className={`mr-3 h-5 w-5 ${isRefreshing ? 'animate-spin' : ''}`} />
                    Kullanıcı Bilgilerini Güncelle
                  </div>
                </button>

                {activeLinks.map((link: any) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium cursor-pointer ${pathname === link.href
                      ? "border-primary text-primary bg-primary/10"
                      : "border-transparent text-foreground hover:bg-accent hover:border-border"
                      }`}
                  >
                    <div className="flex items-center">
                      <link.icon className="mr-3 h-5 w-5" />
                      {link.label}
                    </div>
                  </Link>
                ))}

                <button
                  onClick={handleLogout}
                  className="w-full text-left block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-foreground hover:bg-accent hover:border-border cursor-pointer"
                >
                  <div className="flex items-center">
                    <LogOut className="mr-3 h-5 w-5" />
                    Çıkış Yap
                  </div>
                </button>
              </div>
            </div>
          )}

          {!isAuthenticated && (
            <div className="pt-4 pb-3 border-t border-border">
              <div className="space-y-1">
                <Link
                  href="/auth/login"
                  className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-foreground hover:bg-accent hover:border-border cursor-pointer"
                >
                  Giriş Yap
                </Link>
                <Link
                  href="/auth/register"
                  className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-foreground hover:bg-accent hover:border-border cursor-pointer"
                >
                  Kayıt Ol
                </Link>
              </div>
            </div>
          )}

          <div className="pt-4 pb-3 border-t border-border">
            <div className="flex items-center px-4">
              <div className="flex-shrink-0">
                <ThemeSwitcher />
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
} 