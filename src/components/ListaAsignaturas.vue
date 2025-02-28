<script setup>
//imports
import { ref, onMounted, computed } from "vue";


// fetch a la API
async function fetchAsignaturas() {
  if (!props.idCurso) return; 
  try {
    const response = await fetch(`/api/Asignatura/curso/${props.idCurso}`);
    if (!response.ok) throw new Error("Error al obtener las asignaturas");

    asignaturas.value = await response.json();

    emit("asignaturasCargadas", asignaturas.value);
  } catch (error) {
    console.error("Error al obtener asignaturas:", error);
  }
}

// filtrar las asignaturas dinámicamente 
const asignaturasFiltradas = computed(() => {
  if (!props.searchQuery) return asignaturas.value;
  return asignaturas.value.filter(asignatura =>
    asignatura.nombre.toLowerCase().includes(props.searchQuery.toLowerCase())
  );
});

// Propiedades para filtrar los datos
defineProps({
  searchQuery: String
});


const emit = defineEmits(["asignaturasCargadas"]);

// almacenar las asignaturas
const asignaturas = ref([]);

// Llamamos a la API
onMounted(fetchAsignaturas);
</script>

<template>
  <v-container class="asignaturas-container">
    <v-row align="start" justify="start">
      <v-col v-for="asignatura in asignaturasFiltradas" :key="asignatura.idAsignatura" cols="12" sm="6" md="4" lg="3">
        <CardAsignatura 
          :id="asignatura.idAsignatura"
          :nombre="asignatura.nombre"
          :descripcion="asignatura.descripcion"
          :imagen="asignatura.imagen"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.asignaturas-container {
  padding: 20px;
}
</style>
