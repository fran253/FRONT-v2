<script setup lang="ts">
//imports
import { ref, computed, watchEffect } from "vue";
import { useRoute } from "vue-router";
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import Sidebar from "@/components/Sidebar.vue";
import ListaTemarios from "@/components/ListaTemarios.vue";

const route = useRoute();
const drawer = ref(false);

//buscador
const searchQuery = ref(""); 

const idAsignatura = computed(() => route.params.idAsignatura ? String(route.params.idAsignatura) : "");

//  breadcrumb
const items = ref([
  { title: "Cursos", disabled: false, href: "/cursos" },
  { title: "Asignaturas", disabled: false },
  { title: "Temarios", disabled: true },
]);

const handleTemariosCargados = (temariosData) => {
  console.log("Temarios cargados:", temariosData);
};
</script>

<template>
  <v-app>
    <Header @toggle-sidebar="drawer = !drawer" />

    <!-- Breadcrumb -->
    <v-breadcrumbs class="breadcrumbs" :items="items">
      <template v-slot:prepend>
        <v-icon icon="$vuetify" size="small"></v-icon>
      </template>
    </v-breadcrumbs>

    <v-container class="main-container">
      <Sidebar v-model="drawer" />

      <div class="content">
        <!-- Opcional: Barra de búsqueda -->
        <v-text-field
          v-model="searchQuery"
          prepend-inner-icon="mdi-magnify"
          label="Buscar temarios"
          single-line
          hide-details
          class="mb-4"
        ></v-text-field>
        
        <!-- Lista de temarios -->
        <ListaTemarios 
          :idAsignatura="idAsignatura" 
          :searchQuery="searchQuery"
          @temariosCargados="handleTemariosCargados"
        />
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
  margin-top: -4%;
  flex: 1;
  padding: 20px;
  margin-left: 1%;
}

.main-container {
  display: flex;
  gap: 20px;
  min-height: 100vh;
  padding-top: 64px;
}

@media (max-width: 768px) {
  .content {
    margin-left: 0;
  }
}
</style>