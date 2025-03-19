import { defineStore } from "pinia";
import { ref } from "vue";

// Definir interfaz para un comentario
interface Comentario {
  idComentario: number;
  contenido: string;
  fechaCreacion: string | Date;
  idUsuario: number;
  idArchivo: number;
}

// Definir interfaz para un nuevo comentario (puede ser parcial)
interface NuevoComentario {
  contenido: string;
  fechaCreacion: string | Date;
  idUsuario: number;
  idArchivo: number;
}

export const useComentarioStore = defineStore("comentario", () => {
  const errorMessage = ref("");

  // Obtener comentarios por ID de archivo
  async function fetchComentariosByArchivoId(idArchivo: number): Promise<Comentario[]> {
    try {
      const response = await fetch(`https://academiqapi.retocsv.es/api/Comentario/archivo/${idArchivo}`);
      if (!response.ok) return [];
      return await response.json();
    } catch (error) {
      console.error("Error:", error);
      return [];
    }
  }

  async function createComentario(nuevoComentario: NuevoComentario): Promise<Comentario | null> {
    try {
      const comentarioData: Comentario = {
        idComentario: 0,
        contenido: nuevoComentario.contenido,
        fechaCreacion: nuevoComentario.fechaCreacion,
        idUsuario: nuevoComentario.idUsuario,
        idArchivo: nuevoComentario.idArchivo
      };
      
      console.log("Enviando comentario:", JSON.stringify(comentarioData));
      
      const response = await fetch("https://academiqapi.retocsv.es/api/Comentario/publicar", {
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