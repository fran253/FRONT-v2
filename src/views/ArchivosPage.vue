<script setup lang="ts">
  //imports
  import { ref, computed } from 'vue';
  import Header from '@/components/Header.vue';
  import Sidebar from '@/components/Sidebar.vue';
  import Footer from '@/components/Footer.vue';
  import CardArchivo from '@/components/CardArchivo.vue';

  //datos hardcodeados
  const archivos = ref([
    { id: 1, nombre: "Guía de Vue", url: "https://www.orimi.com/pdf-test.pdf" },
    { id: 2, nombre: "Manual de Vuetify", url: "https://www.orimi.com/pdf-test.pdf" },
    { id: 3, nombre: "Documentación TypeScript", url: "https://www.orimi.com/pdf-test.pdf" }
  ]);

  //variables reactivas
  const visorAbierto = ref(false);
  const archivoSeleccionado = ref<{ id: number; nombre: string; url: string } | null>(null);
  const terminoBusqueda = ref("");

  //funcion ver archivo
  const verArchivo = (archivo: any) => {
    archivoSeleccionado.value = archivo;
    visorAbierto.value = true;
  };

  //funcion filtrar archivos
  const archivosFiltrados = computed(() => {
    return archivos.value.filter(archivo =>
      archivo.nombre.toLowerCase().includes(terminoBusqueda.value.toLowerCase())
    );
  });
  const filtrarArchivos = (busqueda: string) => {
    terminoBusqueda.value = busqueda;
  };
</script>

<template>
  <v-app>
    <Header @update-search="filtrarArchivos" />
    
    <v-main class="content">
      <v-container fluid>
        <v-row>
          <Sidebar />
          <v-col cols="12" md="10">
            <v-card class="pa-5">
              <h2 class="text-h5">📂 Archivos Disponibles</h2>
              <v-divider class="mb-4"></v-divider>

              <v-row>
                <v-col
                  v-for="archivo in archivosFiltrados"
                  :key="archivo.id"
                  cols="12"
                  md="6"
                  lg="4"
                >
                  <CardArchivo :archivo="archivo" @ver="verArchivo" />
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
        <v-card-title>Visualizando: {{ archivoSeleccionado?.nombre }}</v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <iframe
            v-if="archivoSeleccionado"
            :src="archivoSeleccionado.url"
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

<style scoped>
  .content {
    display: flex;
    flex-direction: column;
    min-height: calc(100vh - 80px); /* Ajusta según la altura del header */
  }

  .footer {
    width: 100%;
  }
</style>
