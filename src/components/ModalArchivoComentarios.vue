<script setup lang="ts">
    import { ref, defineProps } from 'vue';
    import CardComentario from '@/components/CardComentario.vue';


    const props = defineProps<{ archivo: { id: number; nombre: string; url: string } | null; abierto: boolean }>();
    const emit = defineEmits(["cerrar"]);


    // Comentarios
    const nuevoComentario = ref("");
    const comentarios = ref<{ id: number; usuario: string; avatar: string; texto: string; fecha: string }[]>([]);
    const agregarComentario = () => {
    const comentarioSanitizado = nuevoComentario.value.trim().replace(/</g, "&lt;").replace(/>/g, "&gt;");
    if (comentarioSanitizado === "") return;
    comentarios.value.push({
        id: Date.now(),
        usuario: "Usuario Anónimo",
        avatar: `https://i.pravatar.cc/40?u=${Date.now()}`,
        texto: comentarioSanitizado,
        fecha: new Date().toISOString().split("T")[0],
    });

    nuevoComentario.value = "";
    };
</script>

<template>
    <v-dialog v-model="props.abierto" max-width="1000px">
        <v-card class="dialog-container">
            <v-card-title>{{ props.archivo?.nombre }}</v-card-title>
            <v-divider></v-divider>
        
            <v-card-text class="dialog-content">
                    <div class="file-view">
                        <iframe
                            v-if="props.archivo?.url"
                            :src="props.archivo.url"
                            width="100%"
                            height="400px"
                        ></iframe>
                    </div>

                <div class="comments-section">

                        <v-divider></v-divider>

                        <div class="comments-list">
                            <CardComentario v-for="comentario in comentarios" :key="comentario.id" :comentario="comentario" />
                            <p v-if="comentarios.length === 0">No hay comentarios aún. Sé el primero en comentar.</p>
                        </div>

                        <div class="comment-input">
                            <v-text-field
                                v-model="nuevoComentario"
                                label="Escribe un comentario..."
                                variant="outlined"
                            ></v-text-field>

                            <v-btn color="orange-darken-2" icon class="circular-btn" @click="agregarComentario">
                                <v-icon color="white">mdi-send</v-icon>
                            </v-btn>
                        </div>
                </div>
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
}

.comments-section {
  background: #f9f9f9;
  padding: 15px;
  border-radius: 8px;
}

.comments-list {
  max-height: 150px;
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
