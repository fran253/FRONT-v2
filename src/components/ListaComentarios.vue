<script setup lang="ts">
import { ref, onMounted } from "vue";
import CardComentario from "@/components/CardComentario.vue";
import { useComentarioStore } from "@/stores/Comentario";

// Propiedades del componente extraidas de Modal
const props = defineProps<{archivoId: number;}>();

// Emisiones
const emit = defineEmits(["comentarioCargado"]);

// Variables
const comentarios = ref([]);
const nuevoComentario = ref("");
const cargando = ref(false);
const comentarioStore = useComentarioStore();

// mostrtar comentarios del archivo
async function mostrarComentarios() {
  cargando.value = true;
  
  try {
    const datos = await comentarioStore.fetchComentariosByArchivoId(props.archivoId);
    
    comentarios.value = datos.map(c => ({
      id: c.idComentario,
      usuario: `Usuario ${c.idUsuario}`,
      avatar: `https://i.pravatar.cc/40?u=${c.idUsuario}`,
      texto: c.contenido,
      fecha: new Date(c.fechaCreacion).toLocaleDateString()
    }));
    
    emit("comentarioCargado", comentarios.value.length);
  } catch (error) {
    console.error("Error:", error);
    comentarios.value = [];
  }
  
  cargando.value = false;
}

// Añadir comentario
async function añadirComentario() {
  if (!nuevoComentario.value.trim()) return;
  
  try {
    const comentario = {
      idComentario: 0,
      contenido: nuevoComentario.value.trim(),
      fechaCreacion: new Date(),
      idUsuario: 1,
      idArchivo: props.archivoId
    };
    
    await comentarioStore.createComentario(comentario);
    nuevoComentario.value = "";
    mostrarComentarios();
  } catch (error) {
    console.error("Error:", error);
  }
}

// cuando abres el modal salen los comentarios
onMounted(() => {
  mostrarComentarios();
});
</script>

<template>
  <div class="comentarios">
    <h3>Comentarios</h3>
    <v-divider></v-divider>

    <div class="lista">
      <v-progress-circular v-if="cargando" indeterminate color="orange"></v-progress-circular>
      <template v-else>
        <CardComentario v-for="comentario in comentarios" :key="comentario.id" :comentario="comentario" />
        <p v-if="comentarios.length === 0">No hay comentarios aún. Sé el primero en comentar.</p>
      </template>
    </div>

    <div class="nueva-entrada">
      <v-text-field
        v-model="nuevoComentario"
        label="Escribe un comentario..."
        @keyup.enter="añadirComentario"
      ></v-text-field>

      <v-btn color="orange" icon @click="añadirComentario">
        <v-icon>mdi-send</v-icon>
      </v-btn>
    </div>
  </div>
</template>

<style scoped>
.comentarios {
  background: #f9f9f9;
  padding: 15px;
  border-radius: 8px;
  margin-top: 20px;
}

.lista {
  max-height: 250px;
  overflow-y: auto;
  padding: 10px;
}

.nueva-entrada {
  display: flex;
  gap: 10px;
  margin-top: 10px;
}
</style>