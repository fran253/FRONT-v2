<script setup lang="ts">
// Propiedades del comentario
defineProps<{
  comentario: {
    id: number;
    usuario: string;
    avatar: string;
    texto: string;
    fecha: string;
  };
}>();
</script>

<template>
  <v-card class="comment-card">
    <v-row no-gutters>
      <!-- Avatar -->
      <v-col cols="2">
        <v-avatar size="40">
          <img :src="comentario.avatar" alt="Avatar" />
        </v-avatar>
      </v-col>

      <!-- Información del usuario -->
      <v-col cols="3">
        <div class="user-info">
          <v-card-title class="username">{{ comentario.usuario }}</v-card-title>
          <v-card-subtitle class="comment-date">{{ comentario.fecha }}</v-card-subtitle>
        </div>
      </v-col>

      <!-- Texto del comentario -->
      <v-col cols="7">
        <v-card-text class="comment-text">{{ comentario.texto }}</v-card-text>
      </v-col>
    </v-row>
  </v-card>
</template>

<style lang="scss" scoped>
.comment-card {
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 5px 2px 6px rgba(0, 0, 0, 0.1);
  margin-bottom: 10px;
  border: 2px solid orange; 
}

.user-info {
  display: flex;
  flex-direction: column;
}

.username {
  font-weight: bold;
  font-size: 14px;
  color: orange;
  padding: 0;
  margin-bottom: 0;
  line-height: 1.2;
}

.comment-date {
  font-size: 12px;
  color: rgb(247, 140, 0);
  padding: 0;
  margin-top: 0;
}

.comment-text {
  font-size: 14px;
  color: #333;
  padding: 10px;
  display: flex;
  align-items: center;
  height: 100%;
}
</style>