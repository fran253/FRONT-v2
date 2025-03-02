import { defineStore } from "pinia";
import { ref } from "vue";

export const useComentarioStore = defineStore("comentario", () => {
  const errorMessage = ref("");

  // Obtener comentarios por ID de archivo
  async function fetchComentariosByArchivoId(idArchivo) {
    try {
      const response = await fetch(`/api/Comentario/archivo/${idArchivo}`);
      if (!response.ok) return [];
      return await response.json();
    } catch (error) {
      console.error("Error:", error);
      return [];
    }
  }

  // Crear comentario
  async function createComentario(nuevoComentario) {
    try {
      const response = await fetch("/api/Comentario/publicar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nuevoComentario),
      });

      if (!response.ok) return null;
      return await response.json();
    } catch (error) {
      console.error("Error:", error);
      return null;
    }
  }

  return { 
    fetchComentariosByArchivoId, 
    createComentario 
  };
});