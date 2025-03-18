"use client"
import React from 'react'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, BarChart3, Calendar, Settings, ShoppingBag, Ticket, Building2 } from "lucide-react"

function AdminPage() {
  const router = useRouter()

  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Admin Paneli</h1>
          <p className="text-muted-foreground mt-1">Uygulamanızı burassdan yönetin</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Kullanıcı Yönetimi Kartı */}
        <Card className="shadow-md hover:shadow-lg transition-shadow">
          <CardHeader className="pb-2">
            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-2">
              <Users className="h-6 w-6 text-blue-700" />
            </div>
            <CardTitle className="text-xl">Kullanıcı Yönetimi</CardTitle>
            <CardDescription>Kullanıcıları ve organizatörleri yönetin</CardDescription>
          </CardHeader>
          <CardContent className="text-sm text-gray-500">
            Kullanıcı hesaplarını görüntüleyin, düzenleyin ve yönetin. Rol atamaları yapın ve organizatör başvurularını onaylayın
          </CardContent>
          <CardFooter className="flex flex-col items-start gap-2">
            <Button
              className="w-full flex items-center justify-start gap-2"
              onClick={() => router.push('/admin/users')}
              variant="outline"
            >
              <Users className="h-4 w-4" />
              Kullanıcılar
            </Button>
            <Button
              className="w-full flex items-center justify-start gap-2"
              onClick={() => router.push('/admin/organizers')}
              variant="outline"
            >
              <Building2 className="h-4 w-4" />
              Organizatörler
            </Button>

          </CardFooter>
        </Card>

        {/* Etkinlik Yönetimi Kartı */}
        <Card className="shadow-md hover:shadow-lg transition-shadow">
          <CardHeader className="pb-2">
            <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-2">
              <Calendar className="h-6 w-6 text-green-700" />
            </div>
            <CardTitle className="text-xl">Etkinlik Yönetimi</CardTitle>
            <CardDescription>Etkinlikleri ve kategorileri yönetin</CardDescription>
          </CardHeader>
          <CardContent className="text-sm text-gray-500">
            Tüm etkinlikleri görüntüleyin, düzenleyin ve onaylayın. Kategori yönetimi ve öne çıkan etkinlikleri belirleyin.
          </CardContent>
          <CardFooter className="flex flex-col items-start gap-2">
            <Button
              className="w-full flex items-center justify-start gap-2"
              onClick={() => router.push('/admin/events')}
              variant="outline"
            >
              <Calendar className="h-4 w-4" />
              Etkinlikler
            </Button>
            <Button
              className="w-full flex items-center justify-start gap-2"
              onClick={() => router.push('/admin/categories')}
              variant="outline"
            >
              <BarChart3 className="h-4 w-4" />
              Kategoriler
            </Button>
          </CardFooter>
        </Card>

        {/* Bilet ve Satış Yönetimi Kartı */}
        <Card className="shadow-md hover:shadow-lg transition-shadow">
          <CardHeader className="pb-2">
            <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center mb-2">
              <Ticket className="h-6 w-6 text-purple-700" />
            </div>
            <CardTitle className="text-xl">Bilet ve Satışlar</CardTitle>
            <CardDescription>Bilet satışlarını ve ödemeleri yönetin</CardDescription>
          </CardHeader>
          <CardContent className="text-sm text-gray-500">
            Bilet satışlarını takip edin, ödeme işlemlerini görüntüleyin ve raporlar oluşturun.
          </CardContent>
          <CardFooter className="flex flex-col items-start gap-2">
            <Button
              className="w-full flex items-center justify-start gap-2"
              onClick={() => router.push('/admin/tickets')}
              variant="outline"
            >
              <Ticket className="h-4 w-4" />
              Biletler
            </Button>
            <Button
              className="w-full flex items-center justify-start gap-2"
              onClick={() => router.push('/admin/sales')}
              variant="outline"
            >
              <ShoppingBag className="h-4 w-4" />
              Satışlar
            </Button>
          </CardFooter>
        </Card>

        {/* Sistem Ayarları Kartı */}
        <Card className="shadow-md hover:shadow-lg transition-shadow">
          <CardHeader className="pb-2">
            <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center mb-2">
              <Settings className="h-6 w-6 text-amber-700" />
            </div>
            <CardTitle className="text-xl">Sistem Ayarları</CardTitle>
            <CardDescription>Uygulama ayarlarını yapılandırın</CardDescription>
          </CardHeader>
          <CardContent className="text-sm text-gray-500">
            Sistem ayarlarını yapılandırın, site içeriğini düzenleyin ve genel ayarları yönetin.
          </CardContent>
          <CardFooter className="flex flex-col items-start gap-2">
            <Button
              className="w-full flex items-center justify-start gap-2"
              onClick={() => router.push('/admin/settings')}
              variant="outline"
            >
              <Settings className="h-4 w-4" />
              Genel Ayarlar
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

export default AdminPage
