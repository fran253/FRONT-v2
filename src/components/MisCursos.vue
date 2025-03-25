<script setup lang="ts">
// --------------------------- Imports ---------------------------
import { ref, onMounted } from "vue";
import CardCurso from "@/components/CardCurso.vue";

// --------------------------- Fetch de mis cursos ---------------------------
const fetchMisCursos = () => {
    const storedCursos = localStorage.getItem("misCursos");
    if (storedCursos) {
        misCursos.value = JSON.parse(storedCursos);
    }
};

// --------------------------- Almacenar mis cursos ---------------------------
const misCursos = ref([]);

// --------------------------- Llamar al fetch al montar el componente ---------------------------
onMounted(fetchMisCursos);
</script>

<template>
  <!-- --------------------------- Contenedor principal --------------------------- -->
  <v-container class="MisCursos__Contenedor">
    <v-row align="start" justify="start">
      <!-- --------------------------- Mostrar mis cursos --------------------------- -->
      <v-col v-for="curso in misCursos" :key="curso.id" cols="12" sm="6" md="4" lg="3">
        <CardCurso 
          :id="curso.id"
          :titulo="curso.titulo"
          :subtitulo="curso.subtitulo"
          :descripcion="curso.descripcion"
          :imagen="curso.imagen"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<style lang="scss" scoped>
  @import "@/assets/sass/components/Mis/MisCursos.scss";
</style>
