"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Clock } from "lucide-react";

export function FeaturedEvents() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {featuredEvents.map((event) => (
        <div
          key={event.id}
          className="flex flex-col rounded-lg overflow-hidden border border-border bg-card transition-all duration-200 hover:border-primary hover:shadow-md"
        >
          <div className="relative h-48 bg-muted">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${event.image})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-0 left-0 p-4">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary text-primary-foreground">
                {event.category}
              </span>
            </div>
          </div>
          <div className="flex-1 p-6 flex flex-col">
            <h3 className="text-lg font-medium text-foreground">{event.title}</h3>
            <div className="mt-2 text-sm text-muted-foreground line-clamp-2">
              {event.description}
            </div>
            <div className="mt-4 space-y-2 text-sm text-muted-foreground">
              <div className="flex items-center">
                <Calendar className="mr-2 h-4 w-4" />
                {new Date(event.date).toLocaleDateString("tr-TR", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </div>
              <div className="flex items-center">
                <Clock className="mr-2 h-4 w-4" />
                {event.time}
              </div>
              <div className="flex items-center">
                <MapPin className="mr-2 h-4 w-4" />
                {event.location}
              </div>
            </div>
            <div className="mt-6 flex items-center justify-between">
              <div className="text-lg font-semibold text-foreground">
                {event.price} ₺
              </div>
              <Link href={`/events/${event.id}`}>
                <Button size="sm">Bilet Al</Button>
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// Dummy data for featured events
const featuredEvents = [
  {
    id: "1",
    title: "Duman Konseri",
    description: "Duman grubu ile unutulmaz bir gece yaşayın. En sevilen şarkılar ve daha fazlası.",
    date: "2025-03-15",
    time: "20:00",
    location: "Volkswagen Arena, İstanbul",
    price: 350,
    category: "Konser",
    image: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
  },
  {
    id: "2",
    title: "Fenerbahçe vs Galatasaray",
    description: "Süper Lig'in en küçük derbisi. Bu heyecanı kaçırmayın!",
    date: "2025-04-02",
    time: "19:00",
    location: "Ülker Stadyumu, İstanbul",
    price: 500,
    category: "Spor",
    image: "https://images.unsplash.com/photo-1508098682722-e99c643e7f0b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
  },
  {
    id: "3",
    title: "Hamlet",
    description: "Shakespeare'in ölümsüz eseri, usta oyuncularla sahnede.",
    date: "2025-03-20",
    time: "20:30",
    location: "Harbiye Muhsin Ertuğrul Sahnesi, İstanbul",
    price: 200,
    category: "Tiyatro",
    image: "https://images.unsplash.com/photo-1503095396549-807759245b35?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1171&q=80",
  },
  {
    id: "4",
    title: "İstanbul Coffee Festival",
    description: "Kahve tutkunları için en büyük festival. Tadımlar, workshoplar ve daha fazlası.",
    date: "2025-05-10",
    time: "10:00 - 20:00",
    location: "KüçükÇiftlik Park, İstanbul",
    price: 150,
    category: "Festival",
    image: "https://images.unsplash.com/photo-1511081692775-05d0f180a065?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1171&q=80",
  },
]; 