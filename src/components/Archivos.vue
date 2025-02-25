<script setup lang="ts">
import { ref, computed, defineProps } from 'vue';

const props = defineProps<{ temarioId: number | null; terminoBusqueda: string }>();

const archivosHardcoded = [
  { id: 1, temarioId: 1, nombre: "Guía de Vue", url: "https://www.orimi.com/pdf-test.pdf" },
  { id: 2, temarioId: 1, nombre: "Manual de Vuetify", url: "https://www.orimi.com/pdf-test.pdf" },
  { id: 3, temarioId: 2, nombre: "Documentación TypeScript", url: "https://www.orimi.com/pdf-test.pdf" }
];

// Filtra archivos por temario y búsqueda
const archivosFiltrados = computed(() => {
  return archivosHardcoded.filter(archivo =>
    archivo.temarioId === props.temarioId &&
    archivo.nombre.toLowerCase().includes(props.terminoBusqueda.toLowerCase())
  );
});
</script>

<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12" md="10">
        <v-card class="pa-5">
          <h2 class="text-h5">📂 Archivos Disponibles</h2>
          <v-divider class="mb-4"></v-divider>

          <v-row>
            <v-col v-for="archivo in archivosFiltrados" :key="archivo.id" cols="12" md="6" lg="4">
              <CardArchivo :archivo="archivo" />
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
