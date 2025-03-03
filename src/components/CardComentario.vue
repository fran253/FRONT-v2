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
  <v-card class="Comentario__Card">
    <v-row no-gutters>
      <!-- Avatar -->
      <v-col cols="2">
        <v-avatar size="40">
          <img :src="comentario.avatar" alt="Avatar" />
        </v-avatar>
      </v-col>

      <!-- Información del usuario -->
      <v-col cols="3">
        <div class="Comentario__InfoUsuario">
          <v-card-title class="Comentario__InfoUsuario__Nombre">{{ comentario.usuario }}</v-card-title>
          <v-card-subtitle class="Comentario__InfoUsuario__Fecha">{{ comentario.fecha }}</v-card-subtitle>
        </div>
      </v-col>

      <!-- Texto del comentario -->
      <v-col cols="7">
        <v-card-text class="Comentario__InfoUsuario__Comentario">{{ comentario.texto }}</v-card-text>
      </v-col>
    </v-row>
  </v-card>
</template>

<style lang="scss" scoped>
.Comentario__Card {
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 5px 2px 6px rgba(0, 0, 0, 0.1);
  margin-bottom: 10px;
  border: 2px solid orange; 
}

.Comentario__InfoUsuario {
  display: flex;
  flex-direction: column;
}

.Comentario__InfoUsuario__Nombre {
  font-weight: bold;
  font-size: 14px;
  color: orange;
  padding: 0;
  margin-bottom: 0;
  line-height: 1.2;
}

.Comentario__InfoUsuario__Fecha {
  font-size: 12px;
  color: rgb(247, 140, 0);
  padding: 0;
  margin-top: 0;
}

.Comentario__InfoUsuario__Comentario {
  font-size: 14px;
  color: #333;
  padding: 10px;
  display: flex;
  align-items: center;
  height: 100%;
}
</style>