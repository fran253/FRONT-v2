<script setup lang="ts">
// Imports
import { ref, defineProps, defineEmits, watch } from "vue";
import ListaComentarios from "@/components/ListaComentarios.vue";

// Propiedades
const props = defineProps<{ 
  archivo: { 
    id: number;
    nombre: string;
    url: string 
  } 
  | null; 
  abierto: boolean 
}>();

//cerrar modal
const emit = defineEmits(["cerrar"]);

// Variables
const cantidadComentarios = ref(0);

// Manejar evento de comentarios cargados
const onComentariosCargados = (cantidad: number) => {
  cantidadComentarios.value = cantidad;
};
</script>

<template>
  <v-dialog v-model="props.abierto" max-width="1000px">
    <v-card class="dialog-container">
      <v-card-title>
        {{ props.archivo ? props.archivo.nombre : 'Sin archivo seleccionado' }}
        <span v-if="cantidadComentarios > 0" class="comment-count">({{ cantidadComentarios }} comentarios)</span>
      </v-card-title>
      <v-divider></v-divider>
    
      <v-card-text class="dialog-content">
        <!-- Ver Archivo -->
        <div class="file-view">
          <iframe
            v-if="props.archivo?.url"
            :src="props.archivo.url"
            width="100%"
            height="400px"
          ></iframe>
          <div v-else class="no-file-message">
            <p>No hay archivo seleccionado o la URL no es válida</p>
          </div>
        </div>

        <!-- Listado de los comentarios -->
        <ListaComentarios 
          v-if="props.archivo && (props.archivo.id || props.archivo.idArchivo)"
          :archivoId="props.archivo.id || props.archivo.idArchivo" 
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