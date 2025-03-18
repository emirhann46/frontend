"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import useAuthStore from "@/app/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const profileFormSchema = z.object({
  username: z.string().min(2, { message: "Kullanıcı adı en az 2 karakter olmalıdır." }),
  email: z.string().email({ message: "Geçerli bir e-posta adresi giriniz." }),
});

export default function ProfilePage() {
  const router = useRouter();
  const { user, isAuthenticated, isLoading } = useAuthStore();
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/auth/login");
    }
  }, [isAuthenticated, router]);

  const { register, handleSubmit, reset } = useForm({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      username: "",
      email: "",
    },
  });

  useEffect(() => {
    if (user) {
      reset({
        username: user.attributes?.username || user.username || "",
        email: user.attributes?.email || user.email || "",
      });
    }
  }, [user, reset]);

  if (!user) {
    return <div className="container py-10">Yükleniyor...</div>;
  }
  console.log("user", user);

  return (
    <div className="container py-10">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Profil Ayarları</h1>

        <form>
          <div className="mb-4">
            <label className="block text-sm font-medium">Kullanıcı Adı</label>
            {!isEditing ? (
              <div>{user.attributes?.username || user.username || "Kullanıcı adı yok"}</div>
            ) : (
              <Input {...register("username")} disabled={!isEditing} />
            )}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium">E-Posta</label>
            {!isEditing ? (
              <div>{user.attributes?.email || user.email || "E-posta yok"}</div>
            ) : (
              <Input {...register("email")} disabled={!isEditing} />
            )}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium">Rol</label>
            <div>{user.rol || "Rol bilgisi yok"}</div>
          </div>

          {!isEditing ? (
            <Button type="button" onClick={() => setIsEditing(true)}>
              Düzenle
            </Button>
          ) : (
            <div className="flex gap-2">
              <Button type="button" disabled={isLoading}>
                Kaydet
              </Button>
              <Button type="button" variant="outline" onClick={() => setIsEditing(false)}>
                İptal
              </Button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
