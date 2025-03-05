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

        const data = await response.json();

        // Convertir URL relativa en absoluta, manejando posibles valores nulos
        archivos.value = data.map((archivo: ArchivoDTO) => {
            return {
                ...archivo,
                url: archivo.url ? 
                    (archivo.url.startsWith("/") ? `http://localhost:5167${archivo.url}` : archivo.url) 
                    : null 
            };
        });

        console.log("Archivos cargados correctamente:", archivos.value);
    } catch (error: any) {
        errorMessage.value = error.message;
        console.error("Error al obtener los archivos del temario:", error);
    }
  }

  // Obtener archivos por ID de usuario
  async function fetchArchivosByUsuario(idUsuario: number) {
    try {
      const response = await fetch(`/api/Archivo/usuario/${idUsuario}`);
      if (!response.ok) throw new Error("Error al obtener los archivos del usuario");

      const data = await response.json();

      // Convertimos la URL en absoluta y manejamos valores nulos
      archivos.value = data.map((archivo: ArchivoDTO) => {
        return {
          ...archivo,
          url: archivo.url 
            ? (archivo.url.startsWith("/") ? `http://localhost:5167${archivo.url}` : archivo.url) 
            : null
        };
      });

      console.log("Archivos del usuario cargados correctamente:", archivos.value);
    } catch (error: any) {
      errorMessage.value = error.message;
      console.error("Error al obtener los archivos del usuario:", error);
    }
  }


  // Subir archivo físico
  async function uploadArchivoFile(file: File | null, titulo: string, tipo: string, temarioId: number | null, userId: number | null) {
    if (!file || !titulo || !tipo || !temarioId || !userId) {
        console.error("Faltan datos para la subida del archivo", { file, titulo, tipo, temarioId, userId });
        return null;
    }

    console.log("Subiendo archivo:", file.name, "para el temario ID:", temarioId, "y usuario ID:", userId);

    try {
        const formData = new FormData();
        formData.append("archivo", file);
        formData.append("titulo", titulo);
        formData.append("tipo", tipo);
        formData.append("idUsuario", userId.toString());
        formData.append("idTemario", temarioId.toString());

        const response = await fetch("/api/Archivo/upload", {
            method: "POST",
            body: formData
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error("Error en la respuesta del servidor:", errorText);
            throw new Error(errorText || "Error al subir el archivo");
        }

        const data = await response.json();
        console.log("Archivo subido correctamente:", data);

        // 🔥 Actualizar automáticamente la lista de archivos sin reiniciar el backend
        await fetchArchivosByTemario(temarioId);

        return data;
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
    fetchArchivosByUsuario,
    uploadArchivoFile, 
    createArchivo,
    errorMessage
  };
});
