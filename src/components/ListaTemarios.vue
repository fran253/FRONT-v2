<script setup>
import { ref, onMounted, computed } from "vue";

//  props para recibir el ID de la asignatura y la búsqueda
defineProps({
  searchQuery: String
});

const emit = defineEmits(["temariosCargados"]);

// Estado para almacenar los temarios
const temarios = ref([]);

// Método para obtener los temarios desde la API
async function fetchTemarios() {
  if (!props.idAsignatura) return; 
  try {
    const response = await fetch(`/api/Temario/asignatura/${props.idAsignatura}`);
    if (!response.ok) throw new Error("Error al obtener los temarios");

    temarios.value = await response.json();

    emit("temariosCargados", temarios.value);
  } catch (error) {
    console.error("Error al obtener temarios:", error);
  }
}

// Filtrar los temarios dinámicamente según la búsqueda
const temariosFiltrados = computed(() => {
  if (!props.searchQuery) return temarios.value;
  return temarios.value.filter(temario =>
    temario.titulo.toLowerCase().includes(props.searchQuery.toLowerCase())
  );
});

// Llamamos a la API cuando se monte el componente
onMounted(fetchTemarios);
</script>

<template>
  <v-container class="temarios-container">
    <v-row align="start" justify="start">
      <v-col v-for="temario in temariosFiltrados" :key="temario.idTemario" cols="12" sm="6" md="4" lg="3">
        <CardTemario 
          :id="temario.idTemario"
          :titulo="temario.titulo"
          :descripcion="temario.descripcion"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.temarios-container {
  padding: 20px;
}

</style>
