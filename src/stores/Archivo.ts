import { defineStore } from "pinia";
import { ref, computed } from "vue";
import type { ArchivoDTO } from "@/stores/dtos/ArchivoDTO";

export const useArchivoStore = defineStore("archivo", () => {
  const archivos = ref<ArchivoDTO[]>([]);
  const errorMessage = ref<string>("");

  // Obtener todos los archivos
  async function fetchAllArchivos() {
    try {
      const response = await fetch("/api/Archivo");
      if (!response.ok) throw new Error("Error al obtener todos los archivos");

      archivos.value = await response.json();
    } catch (error: any) {
      errorMessage.value = error.message;
      console.error("Error al obtener todos los archivos:", error);
    }
  }

  // Obtener archivo por ID
  async function fetchArchivoById(idArchivo: number) {
    try {
      const response = await fetch(`/api/Archivo/${idArchivo}`);
      if (!response.ok) throw new Error("Error al obtener el archivo");

      return await response.json();
    } catch (error: any) {
      errorMessage.value = error.message;
      console.error("Error al obtener el archivo:", error);
      return null;
    }
  }

  // Obtener archivos por ID de temario
  async function fetchArchivosByTemario(idTemario: number) {
    try {
      const response = await fetch(`/api/Archivo/temario/${idTemario}`);
      if (!response.ok) throw new Error("Error al obtener los archivos del temario");

      archivos.value = await response.json();
    } catch (error: any) {
      errorMessage.value = error.message;
      console.error("Error al obtener los archivos del temario:", error);
    }
  }

  // Subir archivo físico
  async function uploadArchivoFile(file: File, temarioId: number, userId: number) {
    if (!file || !temarioId || !userId) {
      console.error("Faltan datos para la subida del archivo");
      return null;
    }
  
    console.log("Subiendo archivo:", file.name, "para el temario ID:", temarioId, "y usuario ID:", userId);
  
    try {
      const formData = new FormData();
      formData.append("archivo", file);  // <-- Asegura que coincida con el backend
      formData.append("temarioId", temarioId.toString());
      formData.append("usuarioId", userId.toString());
  
      const response = await fetch("/api/Archivo", {
        method: "POST",
        body: formData // No agregar headers aquí
      });

      if (!response.ok) {
        const errorText = await response.text(); // Intenta leer el error como texto
        console.error("Error en la respuesta del servidor:", errorText);
        throw new Error(errorText || "Error al subir el archivo");
      }
  
      return await response.json();
    } catch (error: any) {
      console.error("Error al subir el archivo:", error);
      return null;
    }
}

  
  // Crear archivo en la base de datos
  async function createArchivo(archivo: Partial<ArchivoDTO>, userId: number) {
    try {
      const response = await fetch("/api/Archivo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ ...archivo, usuarioId: userId })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error al crear el archivo");
      }

      const createdArchivo = await response.json();
      archivos.value.push(createdArchivo);

      return createdArchivo;
    } catch (error: any) {
      errorMessage.value = error.message;
      console.error("Error al crear el archivo:", error);
      return null;
    }
  }

  return { 
    archivos, 
    fetchAllArchivos, 
    fetchArchivoById, 
    fetchArchivosByTemario, 
    uploadArchivoFile, 
    createArchivo,
    errorMessage
  };
});
