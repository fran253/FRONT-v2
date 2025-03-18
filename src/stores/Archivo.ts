import { defineStore } from "pinia";
import { ref, computed } from "vue";
import type { ArchivoDTO } from "@/stores/dtos/ArchivoDTO";

export const useArchivoStore = defineStore("archivo", () => {
  const archivos = ref<ArchivoDTO[]>([]);
  const errorMessage = ref<string>("");
  const isUploading = ref<boolean>(false);
  const uploadProgress = ref<number>(0);

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

  // Obtener archivos por Tipo
  async function fetchArchivosByTipoAndTemario(tipo: string, idTemario: number) {
    try {
      const response = await fetch(`/api/Archivo/tipo/${tipo}/temario/${idTemario}`);
      if (!response.ok) throw new Error("Error al obtener los archivos del tipo y temario seleccionados");

      const data = await response.json();

      archivos.value = data.map((archivo: ArchivoDTO) => {
        return {
          ...archivo,
          url: archivo.url 
            ? (archivo.url.startsWith("/") ? `http://localhost:5167${archivo.url}` : archivo.url) 
            : null
        };
      });

      console.log("Archivos filtrados por tipo y temario cargados correctamente:", archivos.value);
    } catch (error: any) {
      errorMessage.value = error.message;
      console.error("Error al obtener los archivos filtrados:", error);
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

  // Subir archivo físico con manejo mejorado para archivos grandes
  // Modifica la función uploadArchivoFile en Archivo.ts
async function uploadArchivoFile(file: File | null, titulo: string, tipo: string, temarioId: number | null, userId: number | null) {
  if (!file || !titulo || !tipo || !temarioId || !userId) {
      console.error("Faltan datos para la subida del archivo", { file, titulo, tipo, temarioId, userId });
      return null;
  }

  const fileSize = (file.size / (1024 * 1024)).toFixed(2);
  console.log(`Subiendo archivo: ${file.name}, Tamaño: ${fileSize} MB para el temario ID: ${temarioId} y usuario ID: ${userId}`);
  
  isUploading.value = true;
  uploadProgress.value = 0;
  errorMessage.value = "";

  try {
      const formData = new FormData();
      formData.append("archivo", file);
      formData.append("titulo", titulo);
      formData.append("tipo", tipo);
      formData.append("idUsuario", userId.toString());
      formData.append("idTemario", temarioId.toString());

      // Usar el proxy de Vite en lugar de la URL directa
      return new Promise((resolve, reject) => {
          const xhr = new XMLHttpRequest();
          
          // Usar la ruta relativa para aprovechar el proxy de Vite
          xhr.open("POST", "/api/Archivo/upload", true);
          
          // Configurar tiempo de espera muy largo (30 minutos)
          xhr.timeout = 100000; 
          
          xhr.onload = function() {
              isUploading.value = false;
              uploadProgress.value = 100;
              
              if (xhr.status >= 200 && xhr.status < 300) {
                  try {
                      const data = JSON.parse(xhr.responseText);
                      console.log("Archivo subido correctamente:", data);
                      // Actualizar automáticamente la lista de archivos
                      fetchArchivosByTemario(temarioId);
                      resolve(data);
                  } catch (e) {
                      console.error("Error al parsear respuesta:", e);
                      reject(new Error("Error en el formato de respuesta del servidor"));
                  }
              } else {
                  console.error("Error en la respuesta del servidor:", xhr.status, xhr.statusText, xhr.responseText);
                  reject(new Error(xhr.responseText || "Error al subir el archivo"));
              }
          };
          
          xhr.onerror = function() {
              isUploading.value = false;
              console.error("Error de red al subir el archivo");
              errorMessage.value = "Error de conexión. Verifique su red e intente nuevamente.";
              reject(new Error("Error de red al intentar subir el archivo"));
          };
          
          xhr.ontimeout = function() {
              isUploading.value = false;
              console.error("Tiempo de espera agotado al subir el archivo");
              errorMessage.value = "La subida ha tardado demasiado. Intente con un archivo más pequeño o compruebe su conexión.";
              reject(new Error("Tiempo de espera agotado"));
          };
          
          // Monitorear el progreso y actualizar el estado
          xhr.upload.onprogress = function(event) {
              if (event.lengthComputable) {
                  const percentComplete = (event.loaded / event.total) * 100;
                  uploadProgress.value = percentComplete;
                  console.log(`Progreso: ${percentComplete.toFixed(2)}%`);
              }
          };
          
          // No necesitamos withCredentials cuando usamos el proxy de Vite
          xhr.withCredentials = false;
          
          xhr.send(formData);
      });
  } catch (error: any) {
      isUploading.value = false;
      errorMessage.value = error.message || "Error al subir el archivo";
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
    isUploading,
    uploadProgress,
    fetchAllArchivos, 
    fetchArchivoById, 
    fetchArchivosByTipoAndTemario,
    fetchArchivosByTemario, 
    fetchArchivosByUsuario,
    uploadArchivoFile, 
    createArchivo,
    errorMessage
  };
});