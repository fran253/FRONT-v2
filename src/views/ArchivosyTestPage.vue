<script setup lang="ts">
// Imports
import { ref, watch, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import Header from '@/components/Header.vue';
import Sidebar from '@/components/Sidebar.vue';
import Footer from '@/components/Footer.vue';
import Archivos from '@/components/Archivos.vue';
import ListaTest from '@/components/ListaTest.vue';


//breadcrumb
const items = ref([
  { title: 'Cursos', disabled: false, href: '/cursos' },
  { title: 'Asignaturas', disabled: false },
  { title: 'Temarios', disabled: true },
  { title: "Archivos & Tests", disabled: false }
]);

// Variables
const drawer = ref(false);
const tab = ref(1);
const terminoBusqueda = ref("");
// Ruta actual
const route = useRoute();
// ID del temario
const temarioId = ref<number | null>(null);


//cambio archivos depende el idTemario
watch(() => route.params.idTemario, (nuevoId) => {
  if (nuevoId) {
    temarioId.value = Number(nuevoId);
  }
}, { immediate: true });


// Actualizar buscador ruta
const updateSearch = (query: string) => {
  terminoBusqueda.value = query;
};


// Obtener el ID del temario
onMounted(() => {
  if (route.params.idTemario) {
    temarioId.value = Number(route.params.idTemario);
  }
});

</script>

<template>
  <v-app>
    <Header @toggle-sidebar="drawer = !drawer" @update-search="updateSearch" />

    <!-- Breadcrumb -->
    <v-breadcrumbs class="ArchivosyTestPage__Breadcrumb" :items="items">
      <template v-slot:prepend>
        <v-icon icon="$vuetify" size="small"></v-icon>
      </template>
    </v-breadcrumbs>

    <v-container class="ArchivosyTestPage__Contenedor">
      <Sidebar v-model="drawer" />

      <div class="ArchivosyTestPage__Contenido" v-if="temarioId !== null">
        <v-card class="ArchivosyTestPage__Tab">
          <v-tabs v-model="tab" align-tabs="left" color="orange-darken-3">
            <v-tab :value="1">
              <v-icon class="mr-2">mdi-folder</v-icon> Archivos
            </v-tab>
            <v-tab :value="2">
              <v-icon class="mr-2">mdi-file-document-edit</v-icon> Tests
            </v-tab>
          </v-tabs>

          <v-window v-model="tab">
            <v-window-item :value="1">
              <Archivos :terminoBusqueda="terminoBusqueda" :temarioId="temarioId" />
            </v-window-item>

            <v-window-item :value="2">
              <ListaTest :searchQuery="terminoBusqueda" :temarioId="temarioId" />
            </v-window-item>
          </v-window>
        </v-card>
      </div>
      <div v-else class="content text-center">
        <v-alert type="warning" icon="mdi-alert-circle">
          No se ha seleccionado ningún temario. Por favor, seleccione un temario para ver sus archivos y tests.
        </v-alert>
      </div>
    </v-container>

    <Footer />
  </v-app>
</template>


<style lang="scss" scoped>
  .ArchivosyTestPage__Breadcrumb {
    margin-left: 15px;
    margin-top: 60px;
  }

  .ArchivosyTestPage__Contenido {
    flex: 1;
    padding: 15px;
    margin-left: 0;
    margin-top: 0;
  }

  .ArchivosyTestPage__Contenedor {
    display: flex;
    flex-direction: column;
    gap: 15px;
    min-height: 100vh;  
    padding-top: 56px;
  }

  .ArchivosyTestPage__Tab {
    width: 100%;
    min-height: auto;
    padding: 15px;
  }

  /* ipad*/
  @media (min-width: 576px) {
    .ArchivosyTestPage__Breadcrumb {
      margin-left: 3%;
      margin-top: 5%;
    }

    .ArchivosyTestPage__Contenido {
      padding: 18px;
    }

    .ArchivosyTestPage__Contenedor {
      gap: 18px;
      padding-top: 60px;
    }

    .ArchivosyTestPage__Tab {
      padding: 18px;
      min-height: 60vh;
    }
  }

  /* Ordenadores */
  @media (min-width: 768px) {
    .ArchivosyTestPage__Breadcrumb {
      margin-left: 5%;
      margin-top: 6%;
    }

    .ArchivosyTestPage__Contenido {
      padding: 20px;
      margin-left: 1%;
      margin-top: -4%; 
    }

    .ArchivosyTestPage__Contenedor {
      flex-direction: row; 
      gap: 20px;
      padding-top: 64px;
    }

    .ArchivosyTestPage__Tab {
      min-height: 80vh;
      padding: 20px;
    }
  }
</style>