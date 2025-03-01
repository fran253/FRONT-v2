<script setup lang="ts">
// Imports
import { ref, defineProps, defineEmits, watch, onMounted } from "vue";
import ListaComentarios from "@/components/ListaComentarios.vue";

// Propiedades
const props = defineProps<{ 
  archivo: { id: number; nombre: string; url: string } | null; 
  abierto: boolean 
}>();

// Emisiones
const emit = defineEmits(["cerrar"]);

// Variables
const cantidadComentarios = ref(0);
const archivoIdActual = ref<number | null>(null);

// Log para depuración
onMounted(() => {
  console.log("ModalArchivoComentarios montado");
});

// Observar cambios en props para depuración
watch(() => props.abierto, (newVal) => {
  console.log("Modal abierto:", newVal);
}, { immediate: true });

// Observar el objeto archivo
watch(() => props.archivo, (newArchivo) => {
  console.log("Archivo en modal:", newArchivo);
  if (newArchivo) {
    console.log("Propiedades del archivo:", Object.keys(newArchivo));
    console.log("ID del archivo:", newArchivo.id);
    
    // Actualizar el ID del archivo actual
    archivoIdActual.value = newArchivo.id;
  } else {
    archivoIdActual.value = null;
  }
}, { immediate: true, deep: true });

// Manejar evento de comentarios cargados
const onComentariosCargados = (cantidad: number) => {
  console.log("Comentarios cargados:", cantidad);
  cantidadComentarios.value = cantidad;
};
</script>

<template>
  <v-dialog v-model="props.abierto" max-width="1000px" @update:model-value="value => console.log('Estado del diálogo cambiado:', value)">
    <v-card class="dialog-container">
      <v-card-title>
        {{ props.archivo ? props.archivo.nombre : 'Sin archivo seleccionado' }}
        <span v-if="cantidadComentarios > 0" class="comment-count">({{ cantidadComentarios }} comentarios)</span>
      </v-card-title>
      <v-divider></v-divider>
    
      <v-card-text class="dialog-content">
        <div class="file-view">
          <iframe
            v-if="props.archivo?.url"
            :src="props.archivo.url"
            width="100%"
            height="400px"
          ></iframe>
          <div v-else class="no-file-message">
            <p>No hay archivo seleccionado o la URL no es válida</p>
            <p v-if="props.archivo">Debug info: ID={{ props.archivo?.id }}</p>
          </div>
        </div>

        <!-- Componente de comentarios usando el ID real del archivo -->
        <ListaComentarios 
  :archivoId="archivoIdForceado || 1" 
  @comentarioCargado="onComentariosCargados"
/>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="red" @click="emit('cerrar')">Cerrar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style lang="scss" scoped>
.dialog-container {
  display: flex;
  flex-direction: column;
  height: 80vh;
}

.dialog-content {
  display: flex;
  flex-direction: column;
  gap: 20px;
  overflow-y: auto;
  max-height: 600px;
  padding: 20px;
}

.file-view {
  width: 100%;
  min-height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.no-file-message {
  text-align: center;
  color: #888;
  font-style: italic;
}

.comment-count {
  font-size: 0.8em;
  margin-left: 10px;
  color: #666;
}
</style>