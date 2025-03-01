<script setup lang="ts">
import { ref, defineProps, defineEmits, watch, onMounted } from "vue";
import CardComentario from "@/components/CardComentario.vue";
import { useComentarioStore } from "@/stores/Comentario";
import type { ComentarioDTO } from "@/stores/dtos/ComentarioDTO";

// Propiedades
const props = defineProps<{
  archivoId: number | null;
}>();

// Emisiones para notificar al componente padre
const emit = defineEmits(["comentarioCargado"]);

// Stores
const comentarioStore = useComentarioStore();

// Variables
const nuevoComentario = ref("");
const comentarios = ref<any[]>([]);
const cargando = ref(false);
const usuario = ref({
  id: 1, // ID del usuario actualmente autenticado (ajustar según tu sistema de autenticación)
  nombre: "Usuario Actual",
  avatar: `https://i.pravatar.cc/40?u=${Date.now()}`
});

// Log de montaje
onMounted(() => {
  console.log("ListaComentarios montado con archivoId:", props.archivoId);
});

// Cargar comentarios cuando cambia el archivoId
watch(() => props.archivoId, async (newId, oldId) => {
  console.log(`archivoId cambiado de: ${oldId} a: ${newId}`, typeof newId);
  if (newId && newId > 0) {  // Asegúrate de que el ID es un número positivo
    await cargarComentarios();
  } else {
    console.warn(`ID inválido (${newId}), no se cargarán comentarios`);
    comentarios.value = [];
  }
}, { immediate: true });

// Cargar comentarios del archivo
async function cargarComentarios() {
  if (!props.archivoId || props.archivoId <= 0) {
    console.error("No hay ID de archivo válido para cargar comentarios");
    return;
  }
  
  cargando.value = true;
  console.log("Cargando comentarios para archivo ID:", props.archivoId);
  
  try {
    const comentariosData = await comentarioStore.fetchComentariosByArchivoId(props.archivoId);
    console.log("Comentarios recibidos:", comentariosData);
    
    // Transformar los datos del backend al formato que espera el componente CardComentario
    comentarios.value = Array.isArray(comentariosData) ? comentariosData.map((c: ComentarioDTO) => ({
      id: c.idComentario,
      usuario: `Usuario ${c.idUsuario}`,
      avatar: `https://i.pravatar.cc/40?u=${c.idUsuario}`,
      texto: c.contenido,
      fecha: new Date(c.fechaCreacion).toLocaleDateString()
    })) : [];
    
    console.log("Comentarios transformados:", comentarios.value);
    
    // Notificar al componente padre que se han cargado los comentarios
    emit("comentarioCargado", comentarios.value.length);
  } catch (error) {
    console.error("Error al cargar comentarios:", error);
    comentarios.value = [];
  } finally {
    cargando.value = false;
  }
}

// Método añadir comentario
const agregarComentario = async () => {
  if (!props.archivoId || props.archivoId <= 0) {
    console.error("No se puede agregar comentario sin un ID de archivo válido");
    return;
  }
  
  const comentarioSanitizado = nuevoComentario.value.trim().replace(/</g, "&lt;").replace(/>/g, "&gt;");
  
  if (comentarioSanitizado === "") return;

  try {
    console.log("Enviando nuevo comentario para archivo ID:", props.archivoId);
    
    // Crear el objeto de comentario para enviar al backend
    const nuevoComentarioObj: ComentarioDTO = {
      idComentario: 0, // El backend asignará el ID real
      contenido: comentarioSanitizado,
      fechaCreacion: new Date(),
      idUsuario: usuario.value.id,
      idArchivo: props.archivoId
    };

    console.log("Enviando comentario:", nuevoComentarioObj);
    
    // Enviar al backend
    const comentarioCreado = await comentarioStore.createComentario(nuevoComentarioObj);
    console.log("Comentario creado:", comentarioCreado);

    if (comentarioCreado) {
      // Recargar comentarios para mostrar el nuevo
      await cargarComentarios();
      
      // Limpiar el campo
      nuevoComentario.value = "";
    }
  } catch (error) {
    console.error("Error al agregar comentario:", error);
  }
};
</script>

<template>
  <div class="comments-section">
    <h3>Comentarios</h3>
    <v-divider></v-divider>

    <div class="comments-list">
      <v-progress-circular v-if="cargando" indeterminate color="orange"></v-progress-circular>
      <template v-else>
        <CardComentario v-for="comentario in comentarios" :key="comentario.id" :comentario="comentario" />
        <p v-if="comentarios.length === 0">No hay comentarios aún. Sé el primero en comentar.</p>
      </template>
    </div>

    <div class="comment-input">
      <v-text-field
        v-model="nuevoComentario"
        label="Escribe un comentario..."
        variant="outlined"
        @keyup.enter="agregarComentario"
      ></v-text-field>

      <v-btn color="orange-darken-2" icon class="circular-btn" @click="agregarComentario">
        <v-icon color="white">mdi-send</v-icon>
      </v-btn>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.comments-section {
  background: #f9f9f9;
  padding: 15px;
  border-radius: 8px;
}

.comments-list {
  max-height: 250px;
  overflow-y: auto;
  padding: 10px;
}

.comment-input {
  display: flex;
  gap: 10px;
  align-items: center;
  margin-top: 10px;
}
</style>