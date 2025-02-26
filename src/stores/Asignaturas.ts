import { defineStore } from "pinia";
import { ref, computed } from "vue";
import type { AsignaturaDTO } from "@/stores/dtos/AsignaturasDTO";

export const useAsignaturaStore = defineStore("asignatura", () => {
  const asignaturas = ref<AsignaturaDTO[]>([]);
  const errorMessage = ref<string>("");

  //find all classiccooo
  async function fetchAllAsignaturas() {
    try {
      const response = await fetch("https://localhost:7278/api/Asignatura");
      if (!response.ok) throw new Error("Error al obtener todas las asignaturas");

      asignaturas.value = await response.json();
    } catch (error: any) {
      errorMessage.value = error.message;
      console.error("Error al obtener todas las asignaturas:", error);
    }
  }

  // filtrado viniendo de curso "id curso"
  async function fetchAsignaturasByCurso(idCurso: number) {
    try {
      const response = await fetch(`https://localhost:7278/api/Asignatura/curso/${idCurso}`);
      if (!response.ok) throw new Error("Error al obtener las asignaturas del curso");

      asignaturas.value = await response.json();
    } catch (error: any) {
      errorMessage.value = error.message;
      console.error("Error al obtener asignaturas del curso:", error);
    }
  }

  //filtro por nombre
  const asignaturasFiltradas = computed(() => (searchQuery: string) => {
    if (!searchQuery) return asignaturas.value;
    return asignaturas.value.filter(asignatura =>
      asignatura.nombre.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  return { asignaturas, fetchAllAsignaturas, fetchAsignaturasByCurso, asignaturasFiltradas, errorMessage };
});
