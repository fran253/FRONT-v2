<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue';
import ModalArchivoComentario from '@/components/ModalArchivoComentarios.vue';
import SubirArchivoModal from '@/components/SubirArchivoModal.vue';
import { useArchivoStore } from "@/stores/Archivo";

const props = defineProps<{ 
  temarioId: number | null;
  terminoBusqueda: string 
}>();

// Estado del modal de subida
const modalSubidaVisible = ref(false);

// Estado del modal de visualización de archivo
const visorAbierto = ref(false);
const archivoSeleccionado = ref<Archivo | null>(null);

// Estado de carga inicializado antes de su uso
const cargando = ref(false);
const error = ref('');

// Instancia del store
const archivoStore = useArchivoStore();

// Mostrar archivos según el temario
const cargarArchivos = async (temarioId: number | null) => {
  if (!temarioId) {
    error.value = "No se ha proporcionado un temario válido.";
    return;
  }
  
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
};

// Filtrar archivos al buscar
const archivosFiltrados = computed(() => {
  if (!props.terminoBusqueda) return archivoStore.archivos;
  return archivoStore.archivos.filter(archivo =>
    archivo.titulo.toLowerCase().includes(props.terminoBusqueda.toLowerCase())
  );
});

// Cargar archivos al montar
onMounted(async () => {
  await cargarArchivos(props.temarioId);
});

// Cambio archivos cuando cambie el ID del temario
watch(() => props.temarioId, async (nuevoId) => {
  await cargarArchivos(nuevoId);
}, { immediate: true });

// Abrir modal de archivo para ver el contenido
const verArchivo = (archivo: Archivo) => {
  archivoSeleccionado.value = archivo;
  visorAbierto.value = true;
};

// Cerrar modal de archivo
const cerrarModal = () => {
  visorAbierto.value = false;
};
</script>

<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12" md="10">
        <!-- Botón para subir archivo -->
        <v-btn color="orange-darken-2" class="mb-3" @click="modalSubidaVisible = true">
          Subir Archivo
        </v-btn>

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

    <!-- Modal para subir archivos -->
    <SubirArchivoModal 
      :visible="modalSubidaVisible" 
      :temarioId="props.temarioId!" 
      @update:visible="modalSubidaVisible = false"
      @archivo-subido="cargarArchivos(props.temarioId!)"
    />

    <!-- Modal para ver archivos -->
    <v-dialog v-model="visorAbierto" max-width="800px">
      <v-card>
        <v-card-title>
          <span class="headline">Visualización de Archivo</span>
        </v-card-title>
        <v-divider></v-divider>

        <v-card-text class="pa-5">
          <template v-if="archivoSeleccionado">
            <!-- Mostrar imagen -->
            <img v-if="archivoSeleccionado.tipo.toLowerCase().includes('imagen')" 
                 :src="archivoSeleccionado.url" 
                 alt="Vista previa de imagen" 
                 width="100%" />

            <!-- Mostrar PDF -->
            <iframe v-else-if="archivoSeleccionado.tipo.toLowerCase().includes('pdf')" 
                    :src="archivoSeleccionado.url" 
                    width="100%" 
                    height="400px">
            </iframe>

            <!-- Mensaje si no se puede previsualizar -->
            <p v-else>No se puede mostrar una vista previa de este archivo.</p>
          </template>
        </v-card-text>

        <v-card-actions class="d-flex justify-end">
          <v-btn color="red-darken-2" text @click="cerrarModal">Cerrar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Modal para ver comentarios del archivo -->
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
