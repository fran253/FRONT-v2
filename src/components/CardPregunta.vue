<script setup lang="ts">
  // Imports
  import type { Pregunta } from "@/types/test";

  // Propiedades
  defineProps<{ pregunta: Pregunta }>();

  // Emitir la opción seleccionada
  const emitirRespuesta = defineEmits<{
    (e: "seleccionarOpcion", idOpcion: number): void;
  }>();
</script>

<template>
  <v-card class="pa-4">
    <v-card-title class="font-weight-bold">
      {{ pregunta.enunciado }}
    </v-card-title>
    <v-card-text>
      <v-radio-group @update:modelValue="(idOpcion) => emitirRespuesta('seleccionarOpcion', idOpcion)">
        <v-radio v-for="opcion in pregunta.opciones" :key="opcion.idOpcion" :label="opcion.texto" :value="opcion.idOpcion" />
      </v-radio-group>
    </v-card-text>
  </v-card>
</template>
