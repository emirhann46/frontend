"use client";

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { format } from 'date-fns'
import { tr } from 'date-fns/locale'
import { CalendarIcon, Plus, Trash2, ImagePlus, Clock } from 'lucide-react'
import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const AdminDashboard = () => {
  const [date, setDate] = useState<Date>()
  const [time, setTime] = useState<string>('')
  const [imageLinks, setImageLinks] = useState<string[]>([''])

  const addImageLink = () => {
    setImageLinks([...imageLinks, ''])
  }

  const removeImageLink = (index: number) => {
    const newLinks = imageLinks.filter((_, i) => i !== index)
    setImageLinks(newLinks)
  }

  const handleImageLinkChange = (index: number, value: string) => {
    const newLinks = [...imageLinks]
    newLinks[index] = value
    setImageLinks(newLinks)
  }

  const handleDateSelect = (selectedDate: Date | undefined) => {
    if (selectedDate) {
      const currentDate = date || new Date()
      selectedDate.setHours(currentDate.getHours())
      selectedDate.setMinutes(currentDate.getMinutes())
      setDate(selectedDate)
    } else {
      setDate(undefined)
    }
  }

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = e.target.value
    setTime(newTime)

    if (date) {
      const [hours, minutes] = newTime.split(':')
      const newDate = new Date(date)
      newDate.setHours(parseInt(hours), parseInt(minutes))
      setDate(newDate)
    }
  }

  return (
    <div className="container mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Yeni Etkinlik Ekle</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Başlık */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Etkinlik Başlığı</label>
            <Input placeholder="Etkinlik başlığını giriniz" />
          </div>

          {/* Açıklama */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Etkinlik Açıklaması</label>
            <Textarea
              placeholder="Etkinlik açıklamasını giriniz"
              className="min-h-[120px]"
            />
          </div>

          {/* Tarih ve Saat */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Etkinlik Tarihi ve Saati</label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <div className="sm:col-span-2">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, 'PPP', { locale: tr }) : "Tarih seçiniz"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={handleDateSelect}
                      locale={tr}
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="relative">
                <Input
                  type="time"
                  value={time}
                  onChange={handleTimeChange}
                  className="w-full"
                  step="300"
                />
                <Clock className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
              </div>
            </div>
          </div>

          {/* Lokasyon */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Etkinlik Lokasyonu</label>
            <Input placeholder="Etkinlik lokasyonunu giriniz" />
          </div>

          {/* Resim Linkleri */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Etkinlik Görselleri</label>
            <div className="space-y-3">
              {imageLinks.map((link, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    placeholder="Görsel linkini giriniz"
                    value={link}
                    onChange={(e) => handleImageLinkChange(index, e.target.value)}
                  />
                  {imageLinks.length > 1 && (
                    <Button
                      variant="destructive"
                      size="icon"
                      onClick={() => removeImageLink(index)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={addImageLink}
              >
                <Plus className="mr-2 h-4 w-4" />
                Yeni Görsel Ekle
              </Button>
            </div>
          </div>

          {/* Fiyat */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Etkinlik Fiyatı</label>
            <Input type="number" placeholder="Fiyat giriniz" />
          </div>

          {/* Kapasite */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Etkinlik Kapasitesi</label>
            <Input type="number" placeholder="Kapasite giriniz" />
          </div>

          {/* Kategori Seçimi */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Etkinlik Kategorisi</label>
            <select className="w-full rounded-md border border-input bg-background px-3 py-2">
              <option value="">Kategori seçiniz</option>
              {/* Kategoriler veritabanından gelecek */}
            </select>
          </div>

          {/* Kaydet Butonu */}
          <Button className="w-full">
            Etkinlik Oluştur
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

export default AdminDashboard
