"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, MapPin, Share2, Heart, Users } from "lucide-react";

interface EventPageProps {
  params: {
    id: string;
  };
}

export default function EventPage({ params }: EventPageProps) {
  const eventId = params.id;
  const [isLiked, setIsLiked] = useState(false);

  // Uygulamada bu veri API'den gelecektir
  const event = {
    eventId,
    title: "Duman Konseri",
    description: "Duman grubu, en sevilen şarkılarıyla İstanbul'da hayranlarıyla buluşuyor. Bu muhteşem geceyi kaçırmayın!",
    longDescription: "Türk rock müziğinin sevilen grubu Duman, yeni albümlerinin tanıtım turnesi kapsamında İstanbul'da sahne alacak. 2000'li yılların başından beri müzik dünyasında önemli bir yere sahip olan grup, 'Seni Kendime Sakladım', 'Bu Akşam', 'Melankoli' gibi hit şarkılarının yanı sıra, yeni albümlerinden parçaları da seslendirecek. Konser öncesinde imza etkinliği de gerçekleştirilecek olup, VIP bilet sahipleri bu etkinliğe katılma hakkına sahip olacaklar. Konser alanında yiyecek ve içecek standları bulunacak olup, kapılar etkinlik başlamadan 2 saat önce açılacaktır.",
    date: "15 Aralık 2023",
    time: "20:00",
    location: "Volkswagen Arena, İstanbul",
    price: "750₺ - 1500₺",
    category: "Konser",
    image: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    organizer: "Concert Events",
    ticketTypes: [
      { id: 1, name: "Standart", price: 750, available: 150 },
      { id: 2, name: "Premium", price: 1000, available: 75 },
      { id: 3, name: "VIP", price: 1500, available: 25 }
    ],
    relatedEvents: [
      { id: "2", title: "MFÖ Konseri", date: "22 Aralık 2023", image: "https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80" },
      { id: "3", title: "Manga Konseri", date: "5 Ocak 2024", image: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" },
      { id: "4", title: "Teoman Konseri", date: "12 Ocak 2024", image: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" }
    ]
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
  };

  const handleShare = () => {
    // Paylaşım fonksiyonu
    alert("Paylaşım özelliği yakında eklenecek!");
  };

  return (
    <div className="bg-background min-h-screen py-12">
      <div className="container mx-auto px-4">
        {/* Etkinlik Başlık ve Resim */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <div className="lg:col-span-2">
            <div className="relative w-full h-[400px] rounded-lg overflow-hidden">
              <Image
                src={event.image}
                alt={event.title}
                fill
                className="object-cover"
              />
            </div>
          </div>
          <div className="bg-card p-6 rounded-lg border border-border shadow-sm flex flex-col">
            <h1 className="text-2xl font-bold mb-4 text-foreground">{event.title}</h1>

            <div className="flex items-center mb-3 text-muted-foreground">
              <Calendar className="h-5 w-5 mr-2" />
              <span>{event.date}</span>
            </div>

            <div className="flex items-center mb-3 text-muted-foreground">
              <Clock className="h-5 w-5 mr-2" />
              <span>{event.time}</span>
            </div>

            <div className="flex items-center mb-3 text-muted-foreground">
              <MapPin className="h-5 w-5 mr-2" />
              <span>{event.location}</span>
            </div>

            <div className="flex items-center mb-3 text-muted-foreground">
              <Users className="h-5 w-5 mr-2" />
              <span>Organizatör: {event.organizer}</span>
            </div>

            <div className="mt-2 mb-6">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
                {event.category}
              </span>
            </div>

            <div className="mt-auto">
              <div className="flex justify-between items-center mb-4">
                <div className="text-foreground">
                  <span className="text-sm">Bilet Fiyatı</span>
                  <p className="text-xl font-bold">{event.price}</p>
                </div>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={handleLike}
                    className={isLiked ? "text-red-500" : ""}
                  >
                    <Heart className="h-5 w-5" fill={isLiked ? "currentColor" : "none"} />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={handleShare}
                  >
                    <Share2 className="h-5 w-5" />
                  </Button>
                </div>
              </div>
              <Button className="w-full">Bilet Al</Button>
            </div>
          </div>
        </div>

        {/* Etkinlik Detayları ve Bilet Seçenekleri */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <div className="lg:col-span-2">
            <div className="bg-card p-6 rounded-lg border border-border shadow-sm mb-8">
              <h2 className="text-xl font-bold mb-4 text-foreground">Etkinlik Detayları</h2>
              <p className="text-muted-foreground mb-4">{event.description}</p>
              <p className="text-muted-foreground">{event.longDescription}</p>
            </div>

            <div className="bg-card p-6 rounded-lg border border-border shadow-sm">
              <h2 className="text-xl font-bold mb-4 text-foreground">Konum</h2>
              <div className="relative w-full h-[300px] rounded-lg overflow-hidden bg-muted">
                {/* Burada gerçek bir harita komponenti olacak */}
                
                <div className="absolute inset-0 flex items-center justify-center">
                  <p className="text-muted-foreground">Harita yükleniyor...</p>
                </div>
              </div>
              <p className="mt-4 text-muted-foreground">{event.location}</p>
            </div>
          </div>

          <div>
            <div className="bg-card p-6 rounded-lg border border-border shadow-sm sticky top-24">
              <h2 className="text-xl font-bold mb-4 text-foreground">Bilet Seçenekleri</h2>
              <div className="space-y-4">
                {event.ticketTypes.map((ticket) => (
                  <div key={ticket.id} className="p-4 border border-border rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-medium text-foreground">{ticket.name}</h3>
                      <span className="font-bold text-foreground">{ticket.price}₺</span>
                    </div>
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-sm text-muted-foreground">
                        {ticket.available} adet kaldı
                      </span>
                    </div>
                    <Button className="w-full" variant={ticket.id === 3 ? "default" : "outline"}>
                      {ticket.id === 3 ? "VIP Bilet Al" : "Seç"}
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Benzer Etkinlikler */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-foreground">Benzer Etkinlikler</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {event.relatedEvents.map((relatedEvent) => (
              <Link href={`/events/${relatedEvent.id}`} key={relatedEvent.id}>
                <div className="bg-card rounded-lg border border-border overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                  <div className="relative w-full h-48">
                    <Image
                      src={relatedEvent.image}
                      alt={relatedEvent.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-foreground">{relatedEvent.title}</h3>
                    <p className="text-sm text-muted-foreground">{relatedEvent.date}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 