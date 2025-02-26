// FiltrarTest.vue es el archivo que selecciona los datos y los filtra dependiendo del temario al que pertenecen

<script setup lang="ts">
  import { ref, computed, defineProps } from "vue";
  import TestCard from "@/components/CardTest.vue";

  // Propiedades recibidas del padre (temarioId y búsqueda)
  const props = defineProps<{ temarioId: number | null; terminoBusqueda: string }>();

  // Datos hardcodeados de tests (temporal, luego se conectará a la API)
  const testsHardcoded = [
    { id: 1, temarioId: 1, nombre: "Test de Vue", url: "https://www.orimi.com/pdf-test.pdf" },
    { id: 2, temarioId: 1, nombre: "Test de Vuetify", url: "https://www.orimi.com/pdf-test.pdf" },
    { id: 3, temarioId: 2, nombre: "Test de TypeScript", url: "https://www.orimi.com/pdf-test.pdf" },
    { id: 4, temarioId: 2, nombre: "Test de JavaScript", url: "https://www.orimi.com/pdf-test.pdf" },
    { id: 5, temarioId: 3, nombre: "Test de HTML & CSS", url: "https://www.orimi.com/pdf-test.pdf" }
  ];

  // Filtrar tests según el temario y búsqueda
  const testsFiltrados = computed(() => {
    return testsHardcoded.filter(
      (test) =>
        test.temarioId === props.temarioId &&
        test.nombre.toLowerCase().includes(props.terminoBusqueda.toLowerCase())
    );
  });
</script>

<template>
  <v-container fluid>
    <v-row>
      <v-col v-for="test in testsFiltrados" :key="test.id" cols="12" md="6" lg="4">
        <TestCard :idTest="test.id" :nombre="test.nombre" :url="test.url" />
      </v-col>
    </v-row>
  </v-container>
</template>
