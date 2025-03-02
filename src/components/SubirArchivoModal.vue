<script setup lang="ts">
import { ref, computed, onMounted, watchEffect } from 'vue';
import { useUsuarioLogeadoStore } from '@/stores/UsuarioLogeado';
import { useArchivoStore } from '@/stores/Archivo';

// Props
const props = defineProps<{ 
  visible: boolean;
  temarioId: number;
}>();

const emit = defineEmits(['update:visible', 'archivo-subido']);

// Estado del formulario
const archivoSeleccionado = ref<File | null>(null);
const tituloArchivo = ref("");
const tipoArchivo = ref("");
const cargandoSubida = ref(false);
const errorSubida = ref("");

// Instancias de stores
const usuarioLogeadoStore = useUsuarioLogeadoStore();
const archivoStore = useArchivoStore();

// Asegurar que el usuario se cargue desde localStorage
onMounted(() => {
  usuarioLogeadoStore.cargarUsuarioDesdeStorage();
  console.log("Usuario cargado desde localStorage:", usuarioLogeadoStore.usuarioActual);
});

// Obtener ID del usuario autenticado desde `localStorage`
const idUsuario = computed(() => usuarioLogeadoStore.usuarioActual?.idUsuario || null);

// Verificar cambios en usuarioStore
watchEffect(() => {
  console.log("Usuario actualizado:", usuarioLogeadoStore.usuarioActual);
});

// Capturar archivo seleccionado
const onFileSelected = (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (target.files && target.files.length > 0) {
    archivoSeleccionado.value = target.files[0];
  }
};

// Subir archivo
const subirArchivo = async () => {
  console.log("Título:", tituloArchivo.value);
  console.log("Tipo de archivo:", tipoArchivo.value);
  console.log("Archivo seleccionado:", archivoSeleccionado.value);
  console.log("ID Usuario:", idUsuario.value);
  console.log("ID Temario:", props.temarioId);

  if (!archivoSeleccionado.value || !tituloArchivo.value || !tipoArchivo.value) {
    errorSubida.value = "Debes completar todos los campos.";
    return;
  }

  if (!props.temarioId || !idUsuario.value) {
    errorSubida.value = "Faltan datos obligatorios.";
    return;
  }

  cargandoSubida.value = true;
  errorSubida.value = "";

  try {
    const response = await archivoStore.uploadArchivoFile(
      archivoSeleccionado.value,
      props.temarioId,
      idUsuario.value
    );

    if (!response) throw new Error("Error en la subida del archivo");

    emit('archivo-subido');
    emit('update:visible', false);
  } catch (e) {
    errorSubida.value = "Error al subir el archivo.";
  } finally {
    cargandoSubida.value = false;
  }
};
</script>




<template>
  <v-dialog v-model="props.visible" max-width="500px">
    <v-card>
      <v-card-title>Subir nuevo archivo</v-card-title>
      <v-divider></v-divider>

      <v-form @submit.prevent="subirArchivo" class="pa-5">
        <!-- Título -->
        <v-text-field
          v-model="tituloArchivo"
          label="Título del archivo"
          required
        ></v-text-field>

        <!-- Tipo de archivo -->
        <v-select
          v-model="tipoArchivo"
          label="Tipo de archivo"
          :items="['PDF', 'Word', 'Imagen', 'Vídeo', 'Otro']"
          required
        ></v-select>

        <!-- Seleccionar archivo -->
        <v-file-input
          label="Seleccionar archivo"
          @change="onFileSelected"
          required
        ></v-file-input>

        <!-- Mensaje de error -->
        <v-alert v-if="errorSubida" type="error" class="mt-2">{{ errorSubida }}</v-alert>

        <v-card-actions class="d-flex justify-end">
          <v-btn text @click="emit('update:visible', false)">Cancelar</v-btn>
          <v-btn type="submit" color="orange-darken-2" :loading="cargandoSubida">
            Subir
          </v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-dialog>
</template>
