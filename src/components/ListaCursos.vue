<script setup>
//imports
import { ref, onMounted, computed } from 'vue';


// fetch a la API
async function fetchCursos() {
  try {
    const response = await fetch("/api/Curso");
    if (!response.ok) throw new Error("Error al obtener los cursos");

    cursos.value = await response.json();

    emit("cursosCargados", cursos.value);
  } catch (error) {
    console.error("Error al obtener cursos:", error);
  }
}

// filtrar los cursos dinámicamente
const cursosFiltrados = computed(() => {
  if (!props.searchQuery) return cursos.value;
  return cursos.value.filter(curso =>
    curso.nombre.toLowerCase().includes(props.searchQuery.toLowerCase())
  );
});

// Prop para recibir la búsqueda desde el padre
defineProps({
  searchQuery: String
});


const emit = defineEmits(["cursosCargados"]);

// almacenar los cursos
const cursos = ref([]);

// Llamamos a la API
onMounted(fetchCursos);
</script>

<template>
  <v-container class="cursos-container">
    <v-row align="start" justify="start">
      <v-col v-for="curso in cursosFiltrados" :key="curso.idCurso" cols="12" sm="6" md="4" lg="3">
        <CardCurso 
          :id="curso.idCurso"
          :titulo="curso.nombre"
          :descripcion="curso.descripcion"
          :imagen="curso.imagen"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.cursos-container {
  padding: 20px;
}
</style>
