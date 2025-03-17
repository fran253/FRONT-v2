<script setup lang="ts">
import { ref, onMounted, computed, watch } from "vue";
import CardTemario from "@/components/CardTemario.vue";
import type { Temario } from "@/stores/dtos/TemarioDTO"; // Corrección de importación

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

// Almacenar los temarios correctamente tipados
const temarios = ref<Temario[]>([]);

// Fetch de la API
async function fetchTemarios() {
  if (!props.idAsignatura || props.idAsignatura === "undefined") return;
  try {
    const response = await fetch(`/api/Temario/asignatura/${props.idAsignatura}`);
    if (!response.ok) throw new Error("Error al obtener los temarios");

    const data: Temario[] = await response.json();

    // Asegurar que `id` existe en cada temario
    temarios.value = data.map((temario: Temario) => ({
      ...temario,
      id: temario.id ?? null
    }));

    emit("temariosCargados", temarios.value);
  } catch (error) {
    console.error("Error al obtener temarios:", error);
  }
}

// Filtrar los temarios por búsqueda
const temariosFiltrados = computed(() => {
  if (!props.searchQuery) return temarios.value;
  return temarios.value.filter((temario: Temario) =>
    temario.titulo.toLowerCase().includes(props.searchQuery.toLowerCase())
  );
});

onMounted(fetchTemarios);

watch(
  () => props.idAsignatura,
  (newVal) => {
    if (newVal && newVal !== "undefined") {
      fetchTemarios();
    }
  },
  { immediate: true }
);
</script>

<template>
  <v-container class="ListaTemarios__Contenedor">
    <div v-if="temarios.length === 0" class="text-center my-4">
      <p>No hay temarios disponibles para esta asignatura</p>
    </div>

    <v-row align="start" justify="start">
      <v-col v-for="(temario, index) in temariosFiltrados" :key="temario.id ?? index" cols="12" sm="6" md="4" lg="3">
        <CardTemario :temario="temario" />
      </v-col>
    </v-row>
  </v-container>
</template>
