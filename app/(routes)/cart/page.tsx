"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Trash2, Plus, Minus, CreditCard, Calendar, Clock } from "lucide-react";

interface CartItem {
  id: string;
  eventId: string;
  eventTitle: string;
  eventImage: string;
  eventDate: string;
  eventTime: string;
  ticketType: string;
  price: number;
  quantity: number;
}

export default function CartPage() {
  // Gerçek uygulamada bu veri API'den gelecektir
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: "1",
      eventId: "1",
      eventTitle: "Duman Konseri",
      eventImage: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      eventDate: "15 Aralık 2023",
      eventTime: "20:00",
      ticketType: "VIP",
      price: 1500,
      quantity: 2
    },
    {
      id: "2",
      eventId: "2",
      eventTitle: "Fenerbahçe vs Galatasaray",
      eventImage: "https://images.unsplash.com/photo-1508098682722-e99c643e7f0b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      eventDate: "22 Aralık 2023",
      eventTime: "19:00",
      ticketType: "Premium",
      price: 1200,
      quantity: 1
    }
  ]);

  const handleRemoveItem = (id: string) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const handleQuantityChange = (id: string, change: number) => {
    setCartItems(cartItems.map(item => {
      if (item.id === id) {
        const newQuantity = Math.max(1, item.quantity + change);
        return { ...item, quantity: newQuantity };
      }
      return item;
    }));
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const calculateServiceFee = () => {
    return Math.round(calculateSubtotal() * 0.05); // - %5 
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateServiceFee();
  };

  return (
    <div className="bg-background min-h-screen py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8 text-foreground">Sepetim</h1>

        {cartItems.length === 0 ? (
          <div className="bg-card p-8 rounded-lg border border-border shadow-sm text-center">
            <h2 className="text-xl font-medium mb-4 text-foreground">Sepetiniz boş</h2>
            <p className="text-muted-foreground mb-6">Sepetinizde hiç ürün bulunmamaktadır.</p>
            <Link href="/events">
              <Button>Etkinliklere Göz At</Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-card rounded-lg border border-border shadow-sm overflow-hidden">
                <div className="p-6 border-b border-border">
                  <h2 className="text-xl font-bold text-foreground">Sepet Öğeleri ({cartItems.length})</h2>
                </div>

                {cartItems.map((item) => (
                  <div key={item.id} className="p-6 border-b border-border">
                    <div className="flex flex-col sm:flex-row gap-4">
                      <div className="relative w-full sm:w-32 h-24 rounded-md overflow-hidden">
                        <Image
                          src={item.eventImage}
                          alt={item.eventTitle}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <Link href={`/events/${item.eventId}`}>
                            <h3 className="font-medium text-foreground hover:text-primary">{item.eventTitle}</h3>
                          </Link>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleRemoveItem(item.id)}
                            className="text-muted-foreground hover:text-destructive"
                          >
                            <Trash2 className="h-5 w-5" />
                          </Button>
                        </div>
                        <div className="flex items-center mt-1 text-sm text-muted-foreground">
                          <Calendar className="h-4 w-4 mr-1" />
                          <span className="mr-3">{item.eventDate}</span>
                          <Clock className="h-4 w-4 mr-1" />
                          <span>{item.eventTime}</span>
                        </div>
                        <div className="mt-2 text-sm text-muted-foreground">
                          <span>Bilet Tipi: {item.ticketType}</span>
                        </div>
                        <div className="mt-4 flex justify-between items-center">
                          <div className="flex items-center space-x-2">
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => handleQuantityChange(item.id, -1)}
                              disabled={item.quantity <= 1}
                            >
                              <Minus className="h-4 w-4" />
                            </Button>
                            <span className="w-8 text-center">{item.quantity}</span>
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => handleQuantityChange(item.id, 1)}
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>
                          <div className="font-medium text-foreground">
                            {item.price}₺ x {item.quantity} = {item.price * item.quantity}₺
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="bg-card p-6 rounded-lg border border-border shadow-sm sticky top-24">
                <h2 className="text-xl font-bold mb-6 text-foreground">Sipariş Özeti</h2>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-muted-foreground">
                    <span>Ara Toplam</span>
                    <span>{calculateSubtotal()}₺</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Hizmet Bedeli</span>
                    <span>{calculateServiceFee()}₺</span>
                  </div>
                  <div className="border-t border-border pt-4 flex justify-between font-medium text-foreground">
                    <span>Toplam</span>
                    <span>{calculateTotal()}₺</span>
                  </div>
                </div>

                <Button className="w-full mb-4">
                  <CreditCard className="mr-2 h-4 w-4" />
                  Ödemeye Geç
                </Button>

                <p className="text-xs text-muted-foreground text-center">
                  Ödemeye geçerek, <Link href="/terms" className="text-primary hover:underline">Kullanım Şartları</Link> ve <Link href="/privacy" className="text-primary hover:underline">Gizlilik Politikası</Link>'nı kabul etmiş olursunuz.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 