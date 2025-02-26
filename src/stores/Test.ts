import { defineStore } from "pinia";
import { ref, computed } from "vue";
import type { TestDTO } from "@/stores/dtos/TestDTO";

export const useTestStore = defineStore("test", () => {
  const tests = ref<TestDTO[]>([]);
  const errorMessage = ref<string>("");

  // findeao todo
  async function fetchAllTests() {
    try {
      const response = await fetch("https://localhost:7278/api/Test");
      if (!response.ok) throw new Error("Error al obtener todos los tests");

      tests.value = await response.json();
    } catch (error: any) {
      errorMessage.value = error.message;
      console.error("Error al obtener todos los tests:", error);
    }
  }

  // findea por id
  async function fetchTestById(idTest: number) {
    try {
      const response = await fetch(`https://localhost:7278/api/Test/${idTest}`);
      if (!response.ok) throw new Error("Error al obtener el test");

      return await response.json();
    } catch (error: any) {
      errorMessage.value = error.message;
      console.error("Error al obtener el test:", error);
      return null;
    }
  }

  // findea por id del temario
  async function fetchTestsByTemario(idTemario: number) {
    try {
      const response = await fetch(`https://localhost:7278/api/Test/temario/${idTemario}`);
      if (!response.ok) throw new Error("Error al obtener los tests del temario");

      tests.value = await response.json();
    } catch (error: any) {
      errorMessage.value = error.message;
      console.error("Error al obtener los tests del temario:", error);
    }
  }

  //findeo por nombre
  const testsFiltrados = computed(() => (searchQuery: string) => {
    if (!searchQuery) return tests.value;
    return tests.value.filter(test =>
      test.titulo.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  return { tests, fetchAllTests, fetchTestById, fetchTestsByTemario, testsFiltrados, errorMessage };
});
