<template>
  <v-card class="mx-auto" max-width="400">
    <v-img
      class="align-end text-white"
      height="200"
      :src="asignatura.imagen"
      cover
    >
      <v-card-title>{{ asignatura.nombre }}</v-card-title>
    </v-img>

    <v-card-subtitle class="pt-4">
      Asignatura {{ asignatura.id }}
    </v-card-subtitle>

    <v-card-actions>
      <v-btn color="orange" text>Compartir</v-btn>
      <v-btn color="orange" text>Explorar</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup lang="ts">
import { ref, defineProps } from "vue";

const asignaturas = ref([
  { id: 1, nombre: "Matemáticas", imagen: "https://cdn.vuetifyjs.com/images/cards/docks.jpg" },
  { id: 2, nombre: "Historia", imagen: "https://cdn.vuetifyjs.com/images/cards/docks.jpg" },
  { id: 3, nombre: "Física", imagen: "https://cdn.vuetifyjs.com/images/cards/docks.jpg" },
]);

defineProps<{ 
  asignatura: { 
    id: number;
    nombre: string;
    imagen: string;
  } 
}>();
</script>
