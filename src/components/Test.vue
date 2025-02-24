<script setup lang="ts">
import { ref, computed, defineProps } from 'vue';

const props = defineProps<{ temarioId: number | null; terminoBusqueda: string }>();

const testsHardcoded = [
  { id: 1, temarioId: 1, nombre: "Test de Vue", url: "https://www.orimi.com/pdf-test.pdf" },
  { id: 2, temarioId: 1, nombre: "Test de Vuetify", url: "https://www.orimi.com/pdf-test.pdf" },
  { id: 3, temarioId: 2, nombre: "Test de TypeScript", url: "https://www.orimi.com/pdf-test.pdf" }
];

// Filtra tests por temario y búsqueda
const testsFiltrados = computed(() => {
  return testsHardcoded.filter(test =>
    test.temarioId === props.temarioId &&
    test.nombre.toLowerCase().includes(props.terminoBusqueda.toLowerCase())
  );
});
</script>

<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12" md="10">
        <v-card class="pa-5">
          <h2 class="text-h5">📝 Tests Disponibles</h2>
          <v-divider class="mb-4"></v-divider>

          <v-row>
            <v-col v-for="test in testsFiltrados" :key="test.id" cols="12" md="6" lg="4">
              <v-card class="pa-3">
                <v-card-title>{{ test.nombre }}</v-card-title>
                <v-divider></v-divider>
                <v-card-actions>
                  <v-btn color="blue" :href="test.url" target="_blank">👀 Ver</v-btn>
                  <v-btn color="green" :href="test.url" target="_blank" download>⬇️ Descargar</v-btn>
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
