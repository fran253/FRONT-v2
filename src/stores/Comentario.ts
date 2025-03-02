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

  async function createComentario(comentarioData) {
    try {
      const nuevoComentario = {
        contenido: comentarioData.contenido,
        fechaCreacion: new Date().toISOString(),
        usuario: { id: comentarioData.idUsuario }, // 🔥 Asegurar que el campo sea "id"
        archivo: { id: comentarioData.idArchivo } // 🔥 Asegurar que el campo sea "id"
      };
      
      console.log("Enviando comentario (nuevo formato):", JSON.stringify(nuevoComentario));
  
      const response = await fetch("/api/Comentario/publicar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nuevoComentario),
      });
  
      if (!response.ok) {
        const errorText = await response.text();
        console.error(`Error del servidor (${response.status}): ${errorText}`);
        return null;
      }
      
      return await response.json();
    } catch (error) {
      console.error("Error en createComentario:", error);
      return null;
    }
  }
  
  

  return { 
    fetchComentariosByArchivoId, 
    createComentario 
  };
});
