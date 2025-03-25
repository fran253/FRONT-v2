<script setup lang="ts">
// Imports
import { ref, onMounted, computed, watch } from "vue";
import CardTemario from "@/components/CardTemario.vue";


// fetch a la API
async function fetchTemarios() {
  if (!props.idAsignatura || props.idAsignatura === "undefined") return;
  try {
    const response = await fetch(`https://localhost:7278/api/Temario/asignatura/${props.idAsignatura}`);
    if (!response.ok) throw new Error("Error al obtener los temarios");

    const data = await response.json();
    
    // verificar id temario
    temarios.value = data.map(temario => ({
      ...temario,
      id: temario.id || temario.idTemario || temario.temarioId || null
    }));

    emit("temariosCargados", temarios.value);
  } catch (error) {
    console.error("Error al obtener temarios:", error);
  }
}

// filtrar los temarios al buscar
const temariosFiltrados = computed(() => {
  if (!props.searchQuery) return temarios.value;
  return temarios.value.filter(temario =>
    temario.titulo.toLowerCase().includes(props.searchQuery.toLowerCase())
  );
});



// Propiedades para filtrar los datos
const props = defineProps({
  searchQuery: {
    type: String,
    default: ""
  },
  idAsignatura: {
    type: String,
    required: true
  }
});



const emit = defineEmits(["temariosCargados"]);

// almacenar los temarios
const temarios = ref([]);

// LLamamos al metodo
onMounted(fetchTemarios);

// Llamamos a la API cuando cambie el ID de la asignatura
watch(() => props.idAsignatura, (newVal) => {
  if (newVal && newVal !== "undefined") {
    fetchTemarios();
  }
}, { immediate: true });

</script>

<template>
  <v-container class="ListaTemarios__Contenedor">
    <!-- cuando no hayan temarios aparece mensaje de error -->
    <div v-if="temarios.length === 0" class="text-center my-4">
      <p>No hay temarios disponibles para esta asignatura</p>
    </div>
  

    <v-row align="start" justify="start">
      <v-col v-for="temario in temariosFiltrados" :key="temario.id || index" cols="12" sm="6" md="4" lg="3">
        <CardTemario :temario="temario" />
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
  @import "@/assets/sass/components/Lists/Ltemarios.scss";
</style>