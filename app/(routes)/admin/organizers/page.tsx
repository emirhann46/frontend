"use client"
import React, { useEffect, useState } from 'react'
import { getOrganizers } from '@/app/actions/userRoleList'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Mail, User, Search, UserPlus, Filter } from "lucide-react"
import { Input } from "@/components/ui/input"

// Organizatör için tip tanımı
interface Organizer {
  id: string;
  username: string;
  email: string;
  // Gerekliyse diğer alanları da ekleyin
}

function OrganizerPage() {
  // any yerine Organizer tipini kullanıyoruz
  const [organizers, setOrganizers] = useState<Organizer[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchOrganizers = async () => {
      setIsLoading(true);
      try {
        const organizers = await getOrganizers();
        setOrganizers(organizers);
      } catch (error) {
        console.error("Organizatörler getirilirken hata oluştu:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchOrganizers();
  }, []);

  // Arama filtrelemesi
  const filteredOrganizers = organizers.filter(
    organizer => 
      organizer.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      organizer.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8">
        <h1 className="text-3xl font-bold mb-4 md:mb-0">Organizatörler</h1>
        
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Organizatör ara..."
              className="pl-9 w-full sm:w-64"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <Button>
            <UserPlus className="h-4 w-4 mr-2" />
            Yeni Organizatör
          </Button>
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      ) : filteredOrganizers.length === 0 ? (
        <div className="text-center py-12 bg-muted/30 rounded-lg">
          <User className="h-12 w-12 mx-auto text-muted-foreground" />
          <h2 className="mt-4 text-xl font-semibold">Organizatör Bulunamadı</h2>
          <p className="mt-2 text-muted-foreground">
            Arama kriterlerinize uygun organizatör bulunmamaktadır.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredOrganizers.map((organizer) => (
            <Card key={organizer.id} className="overflow-hidden transition-all hover:shadow-md">
              <CardHeader className="pb-2">
                <div className="flex items-center gap-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={`https://ui-avatars.com/api/?name=${organizer.username}&background=random`} />
                    <AvatarFallback>{organizer.username.substring(0, 2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-lg">{organizer.username}</CardTitle>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Mail className="h-3.5 w-3.5" />
                      <span>{organizer.email}</span>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex justify-end gap-2 mt-4">
                  <Button variant="outline" size="sm">Detaylar</Button>
                  <Button variant="default" size="sm">Düzenle</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}

export default OrganizerPage;