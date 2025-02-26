<script setup lang="ts">
import { ref, computed, watchEffect } from "vue";
import { useRoute } from "vue-router";
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import Sidebar from "@/components/Sidebar.vue";
import ListaTemarios from "@/components/ListaTemarios.vue";

const route = useRoute();
const drawer = ref(false);

const idAsignatura = computed(() => route.params.idAsignatura ? String(route.params.idAsignatura) : "");

// almacenar los temarios de la API
const temarios = ref([]);

// Datos para el breadcrumb
const items = ref([
  { title: "Cursos", disabled: false, href: "/cursos" },
  { title: "Asignaturas", disabled: false },
  { title: "Temarios", disabled: true },
]);

// Función para obtener los temarios desde la API
async function fetchTemariosByAsignatura(idAsignatura: string) {
  if (!idAsignatura || idAsignatura === "undefined") return; // Evitar llamadas incorrectas

  try {
    const response = await fetch(`/api/Temario/asignatura/${idAsignatura}`);
    if (!response.ok) throw new Error("Error al obtener los temarios");

    temarios.value = await response.json();
  } catch (error) {
    console.error("Error al obtener temarios:", error);
  }
}


watchEffect(() => {
  if (idAsignatura.value) {
    fetchTemariosByAsignatura(idAsignatura.value);
  }
});
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
        <!-- Lista de temarios -->
        <ListaTemarios :temarios="temarios" />
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
