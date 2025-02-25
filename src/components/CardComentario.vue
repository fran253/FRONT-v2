<script setup lang="ts">

  //props
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
    <v-row no-gutters align="center">
      <!-- Avatar -->
      <v-col cols="2">
        <v-avatar size="40">
          <img :src="comentario.avatar" alt="Avatar" />
        </v-avatar>
      </v-col>

      <v-col cols="10">
        <v-card-title class="username">{{ comentario.usuario }}</v-card-title>
        <v-card-subtitle class="comment-date">{{ comentario.fecha }}</v-card-subtitle>
        <v-card-text class="comment-text">{{ comentario.texto }}</v-card-text>
      </v-col>
    </v-row>
  </v-card>
</template>

<style lang="scss" scoped>
    .comment-card {
        background: #fff;
        padding: 10px;
        border-radius: 8px;
        box-shadow: 5px 2px 6px rgba(0, 0, 0, 0.1);
        margin-bottom: 10px;
        border: 2px solid orange; 
    }

    .username {
        font-weight: bold;
        font-size: 14px;
        color: orange;
    }

    .comment-date {
        font-size: 12px;
        color: rgb(247, 140, 0);
    }

    .comment-text {
        font-size: 14px;
        color: #333;
        margin-top: 5px;
    }
</style>
