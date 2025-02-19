<template>
  <v-app>
    <Header @update-search="filtrarTests" />
    
    <v-main class="content">
      <v-container fluid>
        <v-row>
          <Sidebar />
          <v-col cols="12" md="10">
            <v-card class="pa-5">
              <h2 class="text-h5">📝 Tests Disponibles</h2>
              <v-divider class="mb-4"></v-divider>

              <v-row>
                <v-col
                  v-for="test in testsFiltrados"
                  :key="test.id"
                  cols="12"
                  md="6"
                  lg="4"
                >
                  <CardTest :test="test" @ver="verTest" />
                </v-col>
              </v-row>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>

    <v-footer app class="footer">
      <Footer />
    </v-footer>

    <v-dialog v-model="visorAbierto" max-width="800px">
      <v-card>
        <v-card-title>Visualizando: {{ testSeleccionado?.nombre }}</v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <iframe
            v-if="testSeleccionado"
            :src="testSeleccionado.url"
            width="100%"
            height="500px"
          ></iframe>
        </v-card-text>
        <v-card-actions>
          <v-btn color="red" @click="visorAbierto = false">Cerrar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import Header from '@/components/Header.vue';
import Sidebar from '@/components/Sidebar.vue';
import Footer from '@/components/Footer.vue';
import CardTest from '@/components/CardTest.vue';

const tests = ref([
  { id: 1, nombre: "Test de Vue", url: "https://www.orimi.com/pdf-test.pdf" },
  { id: 2, nombre: "Test de Vuetify", url: "https://www.orimi.com/pdf-test.pdf" },
  { id: 3, nombre: "Test de TypeScript", url: "https://www.orimi.com/pdf-test.pdf" }
]);

const visorAbierto = ref(false);
const testSeleccionado = ref<{ id: number; nombre: string; url: string } | null>(null);
const terminoBusqueda = ref("");

const verTest = (test: any) => {
  testSeleccionado.value = test;
  visorAbierto.value = true;
};

const testsFiltrados = computed(() => {
  return tests.value.filter(test =>
    test.nombre.toLowerCase().includes(terminoBusqueda.value.toLowerCase())
  );
});

const filtrarTests = (busqueda: string) => {
  terminoBusqueda.value = busqueda;
};
</script>

<style scoped>
.content {
  display: flex;
  flex-direction: column;
  min-height: calc(100vh - 80px);
}

.footer {
  width: 100%;
}
</style>
