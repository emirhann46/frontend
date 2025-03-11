"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";

export function EventFilters() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category === selectedCategory ? null : category);
  };

  const handleDateChange = (date: string) => {
    setSelectedDate(date === selectedDate ? null : date);
  };

  const clearFilters = () => {
    setSelectedCategory(null);
    setSelectedDate(null);
  };
  const categories = [
    { label: "Tüm Kategoriler", value: "all" },
    { label: "Konserler", value: "concert" },
    { label: "Spor", value: "sports" },
    { label: "Tiyatro", value: "theater" },
    { label: "Festivaller", value: "festival" },
  ];
  
  const dates = [
    { label: "Bugün", value: "today" },
    { label: "Bu Hafta", value: "this-week" },
    { label: "Bu Ay", value: "this-month" },
    { label: "Gelecek Ay", value: "next-month" },
  ]; 

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-foreground mb-4">Kategoriler</h3>
        <div className="space-y-2">
          {categories.map((category) => (
            <button
              key={category.value}
              onClick={() => handleCategoryChange(category.value)}
              className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${selectedCategory === category.value
                ? "bg-primary text-primary-foreground"
                : "text-foreground hover:bg-accent"
                }`}
            >
              {category.label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium text-foreground mb-4">Tarih</h3>
        <div className="space-y-2">
          {dates.map((date) => (
            <button
              key={date.value}
              onClick={() => handleDateChange(date.value)}
              className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors flex items-center ${selectedDate === date.value
                ? "bg-primary text-primary-foreground"
                : "text-foreground hover:bg-accent"
                }`}
            >
              <Calendar className="mr-2 h-4 w-4" />
              {date.label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium text-foreground mb-4">Fiyat Aralığı</h3>
        <div className="px-3">
          <div className="flex items-center space-x-4">
            <div className="relative rounded-md shadow-sm flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-muted-foreground sm:text-sm">₺</span>
              </div>
              <input
                type="number"
                name="min"
                id="min"
                className="block w-full pl-7 pr-3 py-2 rounded-md border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary sm:text-sm"
                placeholder="Min"
              />
            </div>
            <span className="text-muted-foreground">-</span>
            <div className="relative rounded-md shadow-sm flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-muted-foreground sm:text-sm">₺</span>
              </div>
              <input
                type="number"
                name="max"
                id="max"
                className="block w-full pl-7 pr-3 py-2 rounded-md border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary sm:text-sm"
                placeholder="Max"
              />
            </div>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium text-foreground mb-4">Konum</h3>
        <div className="px-3">
          <select
            id="location"
            name="location"
            className="block w-full py-2 px-3 border border-border bg-background rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm text-foreground"
          >
            <option value="">Tüm Konumlar</option>
            <option value="istanbul">İstanbul</option>
            <option value="ankara">Ankara</option>
            <option value="izmir">İzmir</option>
            <option value="antalya">Antalya</option>
          </select>
        </div>
      </div>

      <div className="pt-4">
        <Button
          onClick={clearFilters}
          variant="outline"
          className="w-full"
          disabled={!selectedCategory && !selectedDate}
        >
          Filtreleri Temizle
        </Button>
      </div>
    </div>
  );
}

