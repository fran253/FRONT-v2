import { defineStore } from "pinia";
import { ref } from "vue";
import type { ComentarioDTO } from "@/stores/dtos/ComentarioDTO";

export const useComentarioStore = defineStore("comentario", () => {
  const comentarios = ref<ComentarioDTO[]>([]);
  const comentario = ref<ComentarioDTO | null>(null);
  const errorMessage = ref<string>("");

  // ahhh find all , la clasica!
  async function fetchAllComentarios() {
    try {
      const response = await fetch("https://localhost:7278/api/Comentario");
      if (!response.ok) throw new Error("Error al obtener los comentarios");

      comentarios.value = await response.json();
    } catch (error: any) {
      errorMessage.value = error.message;
      console.error("Error al obtener los comentarios:", error);
    }
  }

  // find by el id 
  async function fetchComentarioById(idComentario: number) {
    try {
      const response = await fetch(`https://localhost:7278/api/Comentario/${idComentario}`);
      if (!response.ok) throw new Error("Error al obtener el comentario");

      comentario.value = await response.json();
    } catch (error: any) {
      errorMessage.value = error.message;
      console.error("Error al obtener el comentario:", error);
    }
  }

  // crear un comentario
  async function createComentario(newComentario: ComentarioDTO) {
    try {
      const response = await fetch("https://localhost:7278/api/Comentario/publicar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newComentario),
      });

      if (!response.ok) throw new Error("Error al publicar el comentario");

      return await response.json();
    } catch (error: any) {
      errorMessage.value = error.message;
      console.error("Error al publicar el comentario:", error);
      return null;
    }
  }

  // updatea el comentario para que nadie vea lo racista que eras en twitter hace años
  async function updateComentario(updatedComentario: ComentarioDTO) {
    try {
      const response = await fetch(`https://localhost:7278/api/Comentario/${updatedComentario.idComentario}`, {
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

  // o borralo no te judgo 
  async function deleteComentario(idComentario: number) {
    try {
      const response = await fetch(`https://localhost:7278/api/Comentario/${idComentario}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Error al eliminar el comentario");

      // actualizado para que no se vea en front 
      comentarios.value = comentarios.value.filter(c => c.idComentario !== idComentario);
    } catch (error: any) {
      errorMessage.value = error.message;
      console.error("Error al eliminar el comentario:", error);
    }
  }

  return { comentarios, comentario, fetchAllComentarios, fetchComentarioById, createComentario, updateComentario, deleteComentario, errorMessage };
});
