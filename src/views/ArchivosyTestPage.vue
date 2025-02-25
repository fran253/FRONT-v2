<script setup lang="ts">
  //imports
  import { ref, watch, onMounted } from 'vue';
  import { useRoute } from 'vue-router';
  import Header from '@/components/Header.vue';
  import Sidebar from '@/components/Sidebar.vue';
  import Footer from '@/components/Footer.vue';
  import Archivos from '@/components/Archivos.vue';
  import Test from '@/components/Test.vue';

  //variables
  const route = useRoute();
  const drawer = ref(false);
  const tab = ref(1);
  const terminoBusqueda = ref("");
  const temarioId = ref<number | null>(null);

  //datos para el breadcrumb
  const items = ref([
    { title: 'Cursos', disabled: false, href: '/cursos' },
    { title: 'Asignaturas', disabled: false },
    { title: 'Temarios', disabled: true },
    { title: "Archivos & Tests", disabled: false }
  ]);

  //ver archivo o test
  watch(() => route.params.id, (nuevoId) => {
    temarioId.value = Number(nuevoId);
  });
  //obtener el id del temario
  onMounted(() => {
    temarioId.value = Number(route.params.id);
  });
</script>

<template>
  <v-app>
    <Header @toggle-sidebar="drawer = !drawer" @update-search="terminoBusqueda = $event" />

    <!-- Breadcrumb -->
    <v-breadcrumbs class="breadcrumbs" :items="items">
      <template v-slot:prepend>
        <v-icon icon="$vuetify" size="small"></v-icon>
      </template>
    </v-breadcrumbs>

    <v-container class="main-container">
      <Sidebar v-model="drawer" />

      <div class="content">
        <v-card class="tab-container">
          <v-tabs v-model="tab" align-tabs="left" color="orange-darken-3">
            <v-tab :value="1">
              <v-icon class="mr-2">mdi-folder</v-icon> Archivos
            </v-tab>
            <v-tab :value="2">
              <v-icon class="mr-2">mdi-file-document-edit</v-icon> Tests
            </v-tab>
          </v-tabs>

          <v-tabs-window v-model="tab">
            <v-tabs-window-item :value="1">
              <Archivos :terminoBusqueda="terminoBusqueda" :temarioId="temarioId" />
            </v-tabs-window-item>

            <v-tabs-window-item :value="2">
              <Test :terminoBusqueda="terminoBusqueda" :temarioId="temarioId" />
            </v-tabs-window-item>
          </v-tabs-window>
        </v-card>
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
