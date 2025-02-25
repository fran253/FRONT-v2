<script setup lang="ts">
  import { ref } from "vue";
  import TestModal from "@/components/ModalTest.vue";
  import type { Pregunta } from "@/types/test";

  // Propiedades
  const props = defineProps<{ idTest: number; nombre: string; url: string }>();

  // Estado del modal de test
  const modalAbierto = ref(false);

  // Preguntas hardcodeadas (temporal)
  const preguntas: Pregunta[] = [
    {
      idPregunta: 1,
      enunciado: "¿Cuál es el color de Vue?",
      idTest: props.idTest,
      opciones: [
        { idOpcion: 1, texto: "Rojo", esCorrecta: false },
        { idOpcion: 2, texto: "Verde", esCorrecta: true },
        { idOpcion: 3, texto: "Azul", esCorrecta: false },
        { idOpcion: 4, texto: "Amarillo", esCorrecta: false },
      ],
    },
    {
      idPregunta: 1,
      enunciado: "¿Cuál es el color de platano?",
      idTest: props.idTest,
      opciones: [
        { idOpcion: 1, texto: "Rojo", esCorrecta: false },
        { idOpcion: 2, texto: "Verde", esCorrecta: false },
        { idOpcion: 3, texto: "Azul", esCorrecta: false },
        { idOpcion: 4, texto: "Amarillo", esCorrecta: true },
      ],
    }
  ];
</script>

<template>
  <v-card class="pa-3">
    <v-card-title>{{ props.nombre }}</v-card-title>
    <v-divider></v-divider>
    <v-card-actions class="button-group">
      <!-- Botón para ver el test en PDF -->
      <v-btn color="orange-darken-2" icon class="circular-btn" :href="props.url" target="_blank">
        <v-icon color="white">mdi-eye</v-icon>
      </v-btn>

      <!-- Botón para realizar el test -->
      <v-btn color="green-darken-2" icon class="circular-btn" @click="modalAbierto = true">
        <v-icon color="white">mdi-pencil</v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>

  <!-- Modal del Test -->
  <TestModal v-if="modalAbierto" :abierto="modalAbierto" :preguntas="preguntas" @cerrar="modalAbierto = false" />
</template>

<style lang="scss" scoped>
  .circular-btn {
    width: 50px;
    height: 50px;
    min-width: 50px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: orange;
  }
</style>
