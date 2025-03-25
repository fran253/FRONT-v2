import { defineStore } from "pinia";
import { ref } from "vue";
import type { PreguntaDTO } from "@/stores/dtos/PreguntaDTO";

export const usePreguntaStore = defineStore("pregunta", () => {
  const preguntas = ref<PreguntaDTO[]>([]);
  const errorMessage = ref<string>("");
  
  // Obtener preguntas por ID de test
  async function fetchPreguntasByTestId(testId: number) {
    try {
      const response = await fetch(`https://localhost:7278/api/Pregunta/test/${testId}`);
      if (!response.ok) throw new Error("Error al obtener las preguntas del test");
      
      preguntas.value = await response.json();
    } catch (error: any) {
      errorMessage.value = error.message;
      console.error("Error al obtener las preguntas:", error);
      preguntas.value = [];
    }
  }
  
  // Obtener una pregunta específica por ID
  async function fetchPreguntaById(preguntaId: number) {
    try {
      const response = await fetch(`https://localhost:7278/api/Pregunta/${preguntaId}`);
      if (!response.ok) throw new Error("Error al obtener la pregunta");
      
      return await response.json();
    } catch (error: any) {
      errorMessage.value = error.message;
      console.error("Error al obtener la pregunta:", error);
      return null;
    }
  }
  
  return { 
    preguntas, 
    fetchPreguntasByTestId, 
    fetchPreguntaById, 
    errorMessage 
  };
});