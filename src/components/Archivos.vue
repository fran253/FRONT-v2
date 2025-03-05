<script setup lang="ts">
import { ref, computed, onMounted, watch } from "vue";
import ModalArchivoComentario from "@/components/ModalArchivoComentarios.vue";
import SubirArchivoModal from "@/components/SubirArchivoModal.vue";
import CardArchivo from "@/components/CardArchivo.vue";
import { useArchivoStore } from "@/stores/Archivo";

const props = defineProps<{ temarioId: number | null; terminoBusqueda: string }>();

const modalSubidaVisible = ref(false);
const visorAbierto = ref(false);
const archivoSeleccionado = ref<Archivo | null>(null);
const cargando = ref(false);
const error = ref("");

const archivoStore = useArchivoStore();

const cargarArchivos = async (temarioId: number | null) => {
  if (!temarioId) {
    error.value = "No se ha proporcionado un temario válido.";
    return;
  }

  cargando.value = true;
  error.value = "";

  try {
    await archivoStore.fetchArchivosByTemario(temarioId);
  } catch (e) {
    error.value = "Error al cargar los archivos";
    console.error(e);
  } finally {
    cargando.value = false;
  }
};

const archivosFiltrados = computed(() => {
  if (!props.terminoBusqueda) return archivoStore.archivos;
  return archivoStore.archivos.filter((archivo) =>
    archivo.titulo.toLowerCase().includes(props.terminoBusqueda.toLowerCase())
  );
});

onMounted(async () => {
  await cargarArchivos(props.temarioId);
});

watch(
  () => props.temarioId,
  async (nuevoId) => {
    await cargarArchivos(nuevoId);
  },
  { immediate: true }
);

const verArchivo = (archivo: Archivo) => {
  archivoSeleccionado.value = archivo;
  visorAbierto.value = true;
};

const cerrarModal = () => {
  visorAbierto.value = false;
};
</script>


<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12" md="10">
        <v-btn color="orange-darken-2" class="mb-3" @click="modalSubidaVisible = true">
          Subir Archivo
        </v-btn>

        <v-card v-if="cargando" class="pa-5 d-flex justify-center align-center">
          <v-progress-circular indeterminate color="orange-darken-2"></v-progress-circular>
        </v-card>

        <v-card v-else-if="error" class="pa-5 text-center">
          <v-icon color="error" size="large">mdi-alert-circle</v-icon>
          <p class="text-h6 mt-2">{{ error }}</p>
          <v-btn color="orange-darken-2" @click="cargarArchivos(props.temarioId!)">
            Reintentar
          </v-btn>
        </v-card>

        <v-card v-else class="pa-5">
          <v-row>
            <CardArchivo
              v-for="archivo in archivosFiltrados"
              :key="archivo.id"
              :archivo="archivo"
              @ver="verArchivo(archivo)"
            />
          </v-row>
        </v-card>
      </v-col>
    </v-row>

    <SubirArchivoModal 
      :visible="modalSubidaVisible" 
      :temarioId="props.temarioId!" 
      @update:visible="modalSubidaVisible = false"
      @archivo-subido="cargarArchivos(props.temarioId!)"
    />

    <ModalArchivoComentario
      :archivo="archivoSeleccionado"
      :abierto="visorAbierto"
      @cerrar="cerrarModal"
    />
  </v-container>
</template>