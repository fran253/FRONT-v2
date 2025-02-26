<script setup lang="ts">
  //imports
  import { ref, computed, defineProps } from 'vue';

  //propiedades
  const props = defineProps<{ temarioId: number | null; terminoBusqueda: string }>();

  //datos hardcodeados
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
          <v-row>
            <v-col v-for="test in testsFiltrados" :key="test.id" cols="12" md="6" lg="4">
              <v-card class="pa-3">
                <v-card-title>{{ test.nombre }}</v-card-title>
                <v-divider></v-divider>
                <v-card-actions class="button-group">
                  <v-btn color="orange-darken-2" icon class="circular-btn" :href="test.url" target="_blank">
                    <v-icon color="white">mdi-eye</v-icon>
                  </v-btn>

                  <v-btn color="orange-darken-2" icon class="circular-btn" :href="test.url" target="_blank" download>
                    <v-icon color="white">mdi-download</v-icon>
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
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