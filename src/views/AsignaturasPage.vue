<script setup lang="ts">
// Imports
import { ref, computed, watchEffect } from "vue";
import { useRoute } from "vue-router";
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import Sidebar from "@/components/Sidebar.vue";
import CardAsignatura from "@/components/CardAsignatura.vue";


//breadcrumb
const items = ref([
  { title: "Cursos", disabled: false, href: "/cursos" },
  { title: "Asignaturas", disabled: true },
]);


// Fetch a la API
async function fetchAsignaturasByCurso(idCurso: string) {
  if (!idCurso) return; // Evitar llamadas con ID vacío

  try {
    const response = await fetch(`https://localhost:7278/api/Asignatura/curso/${idCurso}`);
    if (!response.ok) throw new Error("Error al obtener las asignaturas del curso");

    asignaturas.value = await response.json();
  } catch (error: any) {
    errorMessage.value = error.message;
  }
}


// Buscador
const searchQuery = ref("");
const asignaturasFiltradas = computed(() => {
  if (!searchQuery.value) return asignaturas.value;
  return asignaturas.value.filter(asignatura =>
    asignatura.nombre.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

//almacenar datos de la asignatura
const asignaturas = ref([]);

//variables
const drawer = ref(false);
// Ruta actual
const route = useRoute();
// ID del curso
const idCurso = computed(() => route.params.idCurso ?? "");
//mensaje error
const errorMessage = ref<string>("");


//cambio asignaturas depende el idCurso
watchEffect(() => {
  if (idCurso.value) {
    fetchAsignaturasByCurso(idCurso.value);
  }
});

</script>

<template>
  <v-app>
    <Header @toggle-sidebar="drawer = !drawer" @update-search="searchQuery = $event" /> <!-- Recibir búsqueda -->

    <!-- Breadcrumb -->
    <v-breadcrumbs class="AsignaturasPage__Breadcrumb" :items="items">
      <template v-slot:prepend>
        <v-icon icon="$vuetify" size="small"></v-icon>
      </template>
    </v-breadcrumbs>

    <v-container class="AsignaturasPage__Contenedor">
      <Sidebar v-model="drawer" />

      <div class="AsignaturasPage__Contenido">
        <v-container class="AsignaturasPage__ContenedorAsignaturas">
          <v-row align="start" justify="start">
            <v-col v-for="asignatura in asignaturasFiltradas" :key="asignatura.id" cols="12" sm="6" md="4" lg="3">
              <CardAsignatura :asignatura="asignatura" />
            </v-col>
          </v-row>
        </v-container>
      </div>
    </v-container>

    <Footer />
  </v-app>
</template>

<style lang="scss" scoped>
@import "@/assets/sass/pages/Asignaturas.scss";
</style>