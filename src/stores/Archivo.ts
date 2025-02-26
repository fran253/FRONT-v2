import { defineStore } from "pinia";
import { ref, computed } from "vue";
import type { ArchivoDTO } from "@/stores/dtos/ArchivoDTO";

export const useArchivoStore = defineStore("archivo", () => {
  const archivos = ref<ArchivoDTO[]>([]);
  const errorMessage = ref<string>("");

  //Imprimite todo 
  async function fetchAllArchivos() {
    try {
      const response = await fetch("https://localhost:7278/api/Archivo");
      if (!response.ok) throw new Error("Error al obtener todos los archivos");

      archivos.value = await response.json();
    } catch (error: any) {
      errorMessage.value = error.message;
      console.error("Error al obtener todos los archivos:", error);
    }
  }

  // Busqueda por ID
  async function fetchArchivoById(idArchivo: number) {
    try {
      const response = await fetch(`https://localhost:7278/api/Archivo/${idArchivo}`);
      if (!response.ok) throw new Error("Error al obtener el archivo");

      return await response.json();
    } catch (error: any) {
      errorMessage.value = error.message;
      console.error("Error al obtener el archivo:", error);
      return null;
    }
  }

  //Filtrado por ID de temario
  async function fetchArchivosByTemario(idTemario: number) {
    try {
      const response = await fetch(`https://localhost:7278/api/Archivo/temario/${idTemario}`);
      if (!response.ok) throw new Error("Error al obtener los archivos del temario");

      archivos.value = await response.json();
    } catch (error: any) {
      errorMessage.value = error.message;
      console.error("Error al obtener los archivos del temario:", error);
    }
  }

  // filtro por nombre 
  const archivosFiltrados = computed(() => (searchQuery: string) => {
    if (!searchQuery) return archivos.value;
    return archivos.value.filter(archivo =>
      archivo.titulo.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  return { archivos, fetchAllArchivos, fetchArchivoById, fetchArchivosByTemario, archivosFiltrados, errorMessage };
});
