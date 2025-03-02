<script setup lang="ts">
//imports
import { ref, onMounted, computed } from "vue";
import CardComentario from "@/components/CardComentario.vue";
import { useComentarioStore } from "@/stores/Comentario";
import { useUsuarioLogeadoStore } from "@/stores/UsuarioLogeado";


// fetch a la API
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

// Propiedades del componente
const props = defineProps<{ 
  archivoId: number; 
}>();


const emit = defineEmits(["comentarioCargado"]);

//Almacenar los comentarios
const comentarios = ref([]);



//  Obtener usuario logeado
const usuarioLogeadoStore = useUsuarioLogeadoStore();
const usuarioActual = computed(() => usuarioLogeadoStore.usuarioActual);

// comprobaciones
console.log("Usuario actual en ListaComentarios:", usuarioActual.value);

// Cuando abres el modal, llama al metodo
onMounted(() => {
  usuarioLogeadoStore.cargarUsuarioDesdeStorage(); // ✅ Forzar la carga del usuario
  mostrarComentarios();
});


// Variables
const nuevoComentario = ref("");
const cargando = ref(false);
const comentarioStore = useComentarioStore();
const errorMensaje = ref("");



// fetch a la API (añadir comentario)
async function añadirComentario() {
  console.log("Intentando enviar comentario con usuario:", usuarioActual.value);

  if (!nuevoComentario.value.trim()) return;

  //verificar usuario logeado
  if (!usuarioActual.value || !usuarioActual.value.id) {
    errorMensaje.value = "Debes iniciar sesión para comentar.";
    return;
  }

  try {
    const comentarioObj = {
      contenido: nuevoComentario.value.trim(),
      idUsuario: usuarioActual.value.id, 
      idArchivo: props.archivoId,
      fechaCreacion: new Date().toISOString()
    };

    console.log("Enviando comentario:", comentarioObj);
    
    const resultado = await comentarioStore.createComentario(comentarioObj);
    
    if (resultado) {
      nuevoComentario.value = "";
      errorMensaje.value = "";
      await mostrarComentarios();
    } else {
      errorMensaje.value = "No se pudo publicar el comentario.";
      console.error("No se pudo crear el comentario");
    }
  } catch (error) {
    console.error("Error al publicar comentario:", error);
    errorMensaje.value = "Ocurrió un error al publicar el comentario.";
  }
}


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

    <p v-if="errorMensaje" class="error-text">{{ errorMensaje }}</p>

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
.error-text {
  color: red;
  font-size: 14px;
  margin-top: 5px;
}
</style>
