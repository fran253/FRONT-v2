<script setup lang="ts">
// Imports
import { ref, onMounted, computed, watch } from "vue";
import { useArchivoStore } from "@/stores/Archivo";
import type { ArchivoDTO } from "@/stores/dtos/ArchivoDTO";
import { useUsuarioLogeadoStore } from "@/stores/UsuarioLogeado";
import CardArchivo from "@/components/CardArchivo.vue";
import ModalArchivoComentario from '@/components/ModalArchivoComentarios.vue';

// Interfaz para el modal, que espera otra estructura
interface ArchivoModal {
  id: number;
  nombre: string;
  url: string;
}

// Estado del usuario logueado
const usuarioLogeadoStore = useUsuarioLogeadoStore();
const archivoStore = useArchivoStore();

// Manejo de errores y carga
const loading = ref(false);
const error = ref("");

// Estado para el modal
const visorAbierto = ref(false);
const archivoSeleccionado = ref<ArchivoModal | null>(null);

// obtener el ID del usuario actual
const usuarioId = computed(() => {
  const usuario = usuarioLogeadoStore.usuarioActual;
  const id = usuario?.id || usuario?.idUsuario || null;
  console.log("ID de usuario encontrado:", id);
  return id;
});
 
// Computada para tener acceso a los archivos desde el store
const misArchivos = computed(() => {
  console.log("Archivos en el store:", archivoStore.archivos);
  return archivoStore.archivos;
});

// Método para ver un archivo (abrir el modal)
const verArchivo = (item: ArchivoDTO) => {
  console.log("Ver archivo:", item);
  // Transformar ArchivoDTO al formato esperado por el modal
  archivoSeleccionado.value = {
    id: item.idArchivo,
    nombre: item.titulo,
    url: item.url
  };
  visorAbierto.value = true;
};

// Método para cerrar el modal
const cerrarModal = () => {
  visorAbierto.value = false;
};

// Cargar los archivos cuando cambie el usuario
watch(() => usuarioId.value, async (newId) => {
  if (newId) {
    await cargarArchivosUsuario(newId);
  }
}, { immediate: true });

// Método para cargar archivos
async function cargarArchivosUsuario(userId: number) {
  loading.value = true;
  error.value = "";
  
  try {
    console.log("Cargando archivos para el usuario ID:", userId);
    await archivoStore.fetchArchivosByUsuario(userId);
    console.log("Archivos cargados:", archivoStore.archivos);
  } catch (e: unknown) {
    const errorMessage = e instanceof Error ? e.message : 'Error desconocido';
    error.value = `Error al cargar los archivos: ${errorMessage}`;
    console.error("Error en cargarArchivosUsuario:", e);
  } finally {
    loading.value = false;
  }
}

// Cargar archivos al montar el componente
onMounted(async () => {
  if (usuarioId.value) {
    await cargarArchivosUsuario(usuarioId.value);
  } else {
    console.log("No hay usuario logueado con ID válido");
  }
});
</script>

<template>
  <v-container class="MisArchivos__Contenedor">
    <!-- Estado de carga -->
    <v-card v-if="loading" class="pa-5 d-flex justify-center align-center">
      <v-progress-circular indeterminate color="orange-darken-2"></v-progress-circular>
    </v-card>
    
    <!-- Mensaje de error -->
    <v-card v-else-if="error" class="pa-5 text-center">
      <v-icon color="error" size="large">mdi-alert-circle</v-icon>
      <p class="text-h6 mt-2">{{ error }}</p>
    </v-card>
    
    <!-- Sin archivos -->
    <v-card v-else-if="misArchivos.length === 0" class="pa-5 text-center">
      <v-icon size="large">mdi-file-search</v-icon>
      <p class="text-h6 mt-2">No tienes archivos disponibles</p>
    </v-card>
    
    <!-- Lista de archivos -->
    <v-row v-else align="start" justify="start">
      <CardArchivo 
        v-for="item in misArchivos"
        :key="item.idArchivo"
        :archivo="item"
        @ver="verArchivo"
      />
    </v-row>
    
    <!-- Modal para ver el archivo -->
    <ModalArchivoComentario
      :archivo="archivoSeleccionado"
      :abierto="visorAbierto"
      @cerrar="cerrarModal"
    />
  </v-container>
</template>

<style lang="scss" scoped>
@import "@/assets/sass/components/Mis/MisArchivos.scss";
</style>