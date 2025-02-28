<script setup lang="ts">
  // Imports
  import { ref, watch, onMounted } from 'vue';
  import { useRoute } from 'vue-router';
  import Header from '@/components/Header.vue';
  import Sidebar from '@/components/Sidebar.vue';
  import Footer from '@/components/Footer.vue';
  import Archivos from '@/components/Archivos.vue';
  import ListaTest from '@/components/ListaTest.vue';

  // Variables
  const route = useRoute();
  const drawer = ref(false);
  const tab = ref(1);
  const terminoBusqueda = ref("");
  const temarioId = ref<number | null>(null);

  // Datos para el breadcrumb
  const items = ref([
    { title: 'Cursos', disabled: false, href: '/cursos' },
    { title: 'Asignaturas', disabled: false },
    { title: 'Temarios', disabled: true },
    { title: "Archivos & Tests", disabled: false }
  ]);

  // Actualizar ID del temario cuando cambia la ruta
  watch(() => route.params.idTemario, (nuevoId) => {
    if (nuevoId) {
      console.log('Nuevo ID del temario:', nuevoId);
      temarioId.value = Number(nuevoId);
    }
  }, { immediate: true });

  // Obtener el ID del temario al montar el componente
  onMounted(() => {
    if (route.params.idTemario) {
      temarioId.value = Number(route.params.idTemario);
      console.log('ID del temario al montar:', temarioId.value);
    }
  });

  // Función para actualizar el término de búsqueda
  const updateSearch = (query: string) => {
    terminoBusqueda.value = query;
  };
</script>

<template>
  <v-app>
    <Header @toggle-sidebar="drawer = !drawer" @update-search="updateSearch" />

    <!-- Breadcrumb -->
    <v-breadcrumbs class="breadcrumbs" :items="items">
      <template v-slot:prepend>
        <v-icon icon="$vuetify" size="small"></v-icon>
      </template>
    </v-breadcrumbs>

    <v-container class="main-container">
      <Sidebar v-model="drawer" />

      <div class="content" v-if="temarioId !== null">
        <v-card class="tab-container">
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
  .breadcrumbs {
    margin-left: 5%;
    margin-top: 6%;
  }

  .content {
    flex: 1;
    padding: 20px;
    margin-left: 1%;
    margin-top: -4%;
  }

  .main-container {
    display: flex;
    gap: 20px;
    min-height: 100vh;  
    padding-top: 64px;
  }

  .tab-container {
    width: 100%;
    min-height: 80vh;
    padding: 20px;
  }

  @media (max-width: 768px) {
    .content {
      margin-left: 0;
    }
  }
</style>