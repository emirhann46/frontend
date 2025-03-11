"use client"
import React, { useEffect, useState } from 'react'
import { getOrganizers } from '@/app/actions/userRoleList'
function OrganizerPage() {
  const [organizers, setOrganizers] = useState<any[]>([]);
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
      <h1>Organizer Page</h1>

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
