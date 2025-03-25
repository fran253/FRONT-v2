import { defineStore } from "pinia";
import { ref } from "vue";

export const useComentarioStore = defineStore("comentario", () => {
  const errorMessage = ref("");

  // Obtener comentarios por ID de archivo
  async function fetchComentariosByArchivoId(idArchivo) {
    try {
      const response = await fetch(`https://localhost:7278/api/Comentario/archivo/${idArchivo}`);
      if (!response.ok) return [];
      return await response.json();
    } catch (error) {
      console.error("Error:", error);
      return [];
    }
  }

  async function createComentario(nuevoComentario) {
    try {
      const comentarioData = {
        idComentario: 0, 
        contenido: nuevoComentario.contenido,
        fechaCreacion: nuevoComentario.fechaCreacion,
        idUsuario: nuevoComentario.idUsuario,
        idArchivo: nuevoComentario.idArchivo
      };
      
      console.log("Enviando comentario:", JSON.stringify(comentarioData));
    
      const response = await fetch("https://localhost:7278/api/Comentario/publicar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(comentarioData),
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
