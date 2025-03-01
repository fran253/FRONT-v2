import { defineStore } from "pinia";
import { ref } from "vue";
import type { ComentarioDTO } from "@/stores/dtos/ComentarioDTO";

export const useComentarioStore = defineStore("comentario", () => {
  const comentarios = ref<ComentarioDTO[]>([]);
  const comentario = ref<ComentarioDTO | null>(null);
  const errorMessage = ref<string>("");

  // Obtener todos los comentarios
  async function fetchAllComentarios() {
    try {
      const response = await fetch("/api/Comentario");
      if (!response.ok) throw new Error("Error al obtener los comentarios");

      comentarios.value = await response.json();
    } catch (error: any) {
      errorMessage.value = error.message;
      console.error("Error al obtener los comentarios:", error);
    }
  }

  // Obtener comentario por ID
  async function fetchComentarioById(idComentario: number) {
    try {
      const response = await fetch(`/api/Comentario/${idComentario}`);
      if (!response.ok) throw new Error("Error al obtener el comentario");

      comentario.value = await response.json();
    } catch (error: any) {
      errorMessage.value = error.message;
      console.error("Error al obtener el comentario:", error);
    }
  }

  //comentarios depende el archivo
  async function fetchComentariosByArchivoId(idArchivo: number) {
    if (!idArchivo || idArchivo <= 0) {
      console.error("ID de archivo inválido:", idArchivo);
      return [];
    }
    
    try {
      // Usar la URL completa
      const url = `/api/Comentario/archivo/${idArchivo}`;
      console.log(`Realizando petición a ${url}`);
      
      const response = await fetch(url);
      
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error al obtener los comentarios del archivo: ${response.status} - ${errorText}`);
      }
  
      const data = await response.json();
      console.log("Datos obtenidos de la API:", data);
      return data;
    } catch (error: any) {
      errorMessage.value = error.message;
      console.error("Error al obtener los comentarios del archivo:", error);
      return [];
    }
  }
  // Crear comentario
  async function createComentario(newComentario: ComentarioDTO) {
    try {
      // Versión para pruebas - simula una respuesta exitosa
      console.log("Simulando creación de comentario:", newComentario);
      
      // Descomentar esta sección cuando el backend esté listo
      /*
      const response = await fetch("/api/Comentario/publicar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newComentario),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error al publicar el comentario: ${response.status} - ${errorText}`);
      }

      return await response.json();
      */
      
      // Para pruebas, devolvemos un objeto simulado
      return {
        ...newComentario,
        idComentario: Math.floor(Math.random() * 1000) + 2000 // ID aleatorio para pruebas
      };
    } catch (error: any) {
      errorMessage.value = error.message;
      console.error("Error al publicar el comentario:", error);
      return null;
    }
  }

  // Actualizar comentario
  async function updateComentario(updatedComentario: ComentarioDTO) {
    try {
      const response = await fetch(`/api/Comentario/${updatedComentario.idComentario}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedComentario),
      });

      if (!response.ok) throw new Error("Error al actualizar el comentario");

      comentario.value = await response.json();
    } catch (error: any) {
      errorMessage.value = error.message;
      console.error("Error al actualizar el comentario:", error);
    }
  }

  // Eliminar comentario
  async function deleteComentario(idComentario: number) {
    try {
      const response = await fetch(`/api/Comentario/${idComentario}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Error al eliminar el comentario");

      comentarios.value = comentarios.value.filter(c => c.idComentario !== idComentario);
    } catch (error: any) {
      errorMessage.value = error.message;
      console.error("Error al eliminar el comentario:", error);
    }
  }

  return { 
    comentarios, 
    comentario, 
    fetchAllComentarios, 
    fetchComentarioById, 
    fetchComentariosByArchivoId, 
    createComentario, 
    updateComentario, 
    deleteComentario, 
    errorMessage 
  };
});