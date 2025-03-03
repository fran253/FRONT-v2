<script setup lang="ts">
// Imports
import { ref, computed, watchEffect } from "vue";
import { useRoute } from "vue-router";
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import Sidebar from "@/components/Sidebar.vue";
import ListaTemarios from "@/components/ListaTemarios.vue";

// Breadcrumb
const items = ref([
  { title: "Cursos", disabled: false, href: "/cursos" },
  { title: "Asignaturas", disabled: false },
  { title: "Temarios", disabled: true },
]);


// Buscador
const searchQuery = ref("");

// Variables
const drawer = ref(false);
// Ruta actual
const route = useRoute();
// ID de la asignatura
const idAsignatura = computed(() => route.params.idAsignatura ? String(route.params.idAsignatura) : "");



// // verificar que se cargan temarios
// const handleTemariosCargados = (temariosData) => {
//   console.log("Temarios cargados:", temariosData);
// };

</script>

<template>
  <v-app>
    <Header @toggle-sidebar="drawer = !drawer" @update-search="searchQuery = $event" /> <!-- Se agrega el evento de búsqueda -->

    <!-- Breadcrumb -->
    <v-breadcrumbs class="TemariosPage__Breadcrumb" :items="items">
      <template v-slot:prepend>
        <v-icon icon="$vuetify" size="small"></v-icon>
      </template>
    </v-breadcrumbs>

    <v-container class="TemariosPage__Contenedor">
      <Sidebar v-model="drawer" />

      <div class="TemariosPage__Contenido">
        <!-- Lista de temarios con búsqueda -->
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
.TemariosPage__Breadcrumb {
  margin-left: 5%;
  margin-top: 25%;
}

.TemariosPage__Contenido {
  margin-top: 0;
  flex: 1;
  padding: 15px;
  margin-left: 0;
}

.TemariosPage__Contenedor {
  display: flex;
  flex-direction: column;
  gap: 15px;
  min-height: 100vh;
  padding-top: 56px;
}

/* Ipad */
@media (min-width: 576px) {
  .TemariosPage__Breadcrumb {
    margin-left: 3%;
    margin-top: 5%;
  }

  .TemariosPage__Contenido {
    padding: 18px;
  }

  .TemariosPage__Contenedor {
    gap: 18px;
    padding-top: 60px;
  }
}

/* Ordenador */
@media (min-width: 768px) {
  .TemariosPage__Breadcrumb {
    margin-left: 5%;
    margin-top: 6%;
  }

  .TemariosPage__Contenido {
    margin-top: -4%;
    padding: 20px;
    margin-left: 1%;
  }

  .TemariosPage__Contenedor {
    flex-direction: row;
    gap: 20px;
    padding-top: 64px;
  }
}
</style>