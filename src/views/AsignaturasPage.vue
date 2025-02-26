<script setup lang="ts">

//imports
import { ref, onMounted, computed, watchEffect } from "vue";
import { useRoute } from "vue-router";
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import Sidebar from "@/components/Sidebar.vue";
import CardAsignatura from "@/components/CardAsignatura.vue";

//variables
const route = useRoute();
const drawer = ref(false);
const errorMessage = ref<string>("");
const asignaturas = ref([]);

// idCurso
const idCurso = computed(() => route.params.idCurso ?? "");

// Datos para el breadcrumb
const items = ref([
  { title: "Cursos", disabled: false, href: "/cursos" },
  { title: "Asignaturas", disabled: false },
]);

// Fetch a la API
async function fetchAsignaturasByCurso(idCurso: string) {
  if (!idCurso) return; // Evitar llamadas con ID vacío

  try {
    const response = await fetch(`/api/Asignatura/curso/${idCurso}`);
    if (!response.ok) throw new Error("Error al obtener las asignaturas del curso");

    asignaturas.value = await response.json();
  } catch (error: any) {
    errorMessage.value = error.message;
    console.error("Error al obtener asignaturas del curso:", error);
  }
}

watchEffect(() => {
  if (idCurso.value) {
    fetchAsignaturasByCurso(idCurso.value);
  }
});

// Filtrar asignaturas 
const asignaturasFiltradas = computed(() => asignaturas.value ?? []);

</script>



<template>
  <v-app>
    <Header @toggle-sidebar="drawer = !drawer" />

    <!-- inicio breadcrumb -->
    <v-breadcrumbs class="breadcrumbs" :items="items">
      <template v-slot:prepend>
          <v-icon icon="$vuetify" size="small"></v-icon>
        </template>
      </v-breadcrumbs>
      <!-- fin breadcrumb -->
    <v-container class="main-container">
      <Sidebar v-model="drawer" />

      <div class="content">
        <v-container class="asignaturas-container">
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
  .breadcrumbs{
    margin-left:5% ;
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


  .asignaturas-container {
    padding: 20px;
  }

  @media (max-width: 768px) {
    .content {
      margin-left: 0;
    }
  }
</style>
