import axios from "axios";

export const getOrganizers = async () => {
  const jwt = localStorage.getItem("jwt");
  if (!jwt) {
    throw new Error("Token bulunamadı");
  }

  try {
    const response = await axios.get("http://localhost:1337/api/users?filters[rol][$eq]=organizer", { 
      headers: {
        Authorization: `Bearer ${jwt}`,
        "Content-Type": "application/json", 
      } 
    });

    return response.data;
  } catch (error) {
    console.error("Organizatörler getirilirken hata oluştu:", error);
    throw error;
  }
};
