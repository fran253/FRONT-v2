<script setup lang="ts">
// IMPORTS
import { ref, computed, onMounted, watch } from 'vue';
import ModalArchivoComentario from '@/components/ModalArchivoComentarios.vue';
import { Archivo } from "@/types/archivo";
import { useArchivoStore } from "@/stores/Archivo";

// Propiedades
const props = defineProps<{ temarioId: number | null; terminoBusqueda: string }>();

// llamada a Archivo.ts
const archivoStore = useArchivoStore();


// Estado local
const visorAbierto = ref(false);
const archivoSeleccionado = ref<Archivo | null>(null);
const cargando = ref(false);
const error = ref('');

// Filtrar archivos
const archivosFiltrados = computed(() => {
  // Si no hay temario seleccionado, mostrar todos los archivos
  if (!props.terminoBusqueda) return archivoStore.archivos;
  
  // Filtrar por término de búsqueda
  return archivoStore.archivos.filter(archivo =>
    archivo.titulo.toLowerCase().includes(props.terminoBusqueda.toLowerCase())
  );
});

// cambio archivos cuando cambie el id del temario
watch(() => props.temarioId, async (nuevoId) => {
  if (nuevoId) {
    await cargarArchivos(nuevoId);
  }
}, { immediate: true });

// Método  cargar los archivos del temario
async function cargarArchivos(temarioId: number) {
  cargando.value = true;
  error.value = '';
  
  try {
    await archivoStore.fetchArchivosByTemario(temarioId);
  } catch (e) {
    error.value = 'Error al cargar los archivos';
    console.error(e);
  } finally {
    cargando.value = false;
  }
}

// Abrir ventana de archivo
const verArchivo = (archivo: Archivo) => {
  archivoSeleccionado.value = archivo;
  visorAbierto.value = true;
};

//cerrar
const cerrarModal = () => {
  visorAbierto.value = false;
};

// Cargar archivos al montar
onMounted(async () => {
  if (props.temarioId) {
    await cargarArchivos(props.temarioId);
  }
});
</script>

<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12" md="10">
        <!-- Estado de carga -->
        <v-card v-if="cargando" class="pa-5 d-flex justify-center align-center">
          <v-progress-circular indeterminate color="orange-darken-2"></v-progress-circular>
        </v-card>
        
        <!-- Mensaje de error -->
        <v-card v-else-if="error" class="pa-5 text-center">
          <v-icon color="error" size="large">mdi-alert-circle</v-icon>
          <p class="text-h6 mt-2">{{ error }}</p>
          <v-btn color="orange-darken-2" @click="cargarArchivos(props.temarioId!)">
            Reintentar
          </v-btn>
        </v-card>
        
        <!-- Sin archivos -->
        <v-card v-else-if="archivosFiltrados.length === 0" class="pa-5 text-center">
          <v-icon size="large">mdi-file-search</v-icon>
          <p class="text-h6 mt-2">No se encontraron archivos para este temario</p>
        </v-card>
        
        <!-- Lista de archivos -->
        <v-card v-else class="pa-5">
          <v-row>
            <v-col v-for="archivo in archivosFiltrados" :key="archivo.id" cols="12" md="6" lg="4">
              <v-card class="pa-3">
                <v-card-title>{{ archivo.titulo }}</v-card-title>
                <v-divider></v-divider>

                <v-card-actions class="button-group">
                  <v-btn color="orange-darken-2" icon class="circular-btn" @click="verArchivo(archivo)" aria-label="Ver archivo">
                    <v-icon color="white">mdi-eye</v-icon>
                  </v-btn>
                  <v-btn color="orange-darken-2" icon class="circular-btn" :href="archivo.url" target="_blank" download aria-label="Descargar archivo">
                    <v-icon color="white">mdi-download</v-icon>
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>

    <ModalArchivoComentario
      :archivo="archivoSeleccionado"
      :abierto="visorAbierto"
      @cerrar="cerrarModal"
    />
  </v-container>
</template>

<style lang="scss" scoped>
  .button-group {
    display: flex;
    gap: 10px;
    justify-content: center;
  }

  .circular-btn {
    width: 50px;
    height: 50px;
    min-width: 50px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: orange;
  }
</style>