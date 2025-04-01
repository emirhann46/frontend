"use client"
import React, { useEffect, useState } from 'react'
import { getOrganizers } from '@/app/actions/userRoleList'

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

  useEffect(() => {
    const fetchOrganizers = async () => {
      try {
        const organizers = await getOrganizers();
        setOrganizers(organizers);
      } catch (error) {
        console.error("Organizatörler getirilirken hata oluştu:", error);
      }
    };
    fetchOrganizers();
  }, []);

  return (
    <div>
      <h1>Organizer Sayfası</h1>

      <div className="flex flex-col gap-4">

        {organizers.map((organizer) => (
          <div key={organizer.id}>
            <h2>{organizer.username}</h2>
            <p>{organizer.email}</p>
          </div>
        ))}

      </div>

    </div>
  )
}

export default OrganizerPage;
