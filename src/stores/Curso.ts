import { defineStore } from "pinia";
import { ref, computed } from "vue";
import type { CursoDTO } from "@/stores/dtos/CursoDTO";

export const useCursoStore = defineStore("curso", () => {
  const cursos = ref<CursoDTO[]>([]);
  const errorMessage = ref<string>("");

  async function fetchCursos() {
    try {
      const response = await fetch("http://localhost:5167/api/Curso");
      if (!response.ok) throw new Error("Error al obtener los cursos");

      cursos.value = await response.json();
    } catch (error: any) {
      errorMessage.value = error.message;
      console.error("Error al obtener cursos:", error);
    }
  }

  const cursosFiltrados = computed(() => (searchQuery: string) => {
    if (!searchQuery) return cursos.value;
    return cursos.value.filter(curso =>
      curso.nombre.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  return { cursos, fetchCursos, cursosFiltrados, errorMessage };
});
