<script setup lang="ts">
import { defineProps } from "vue";
  
    defineProps<{ 
        temario: { 
            titulo: string;
            subtitulo: string;
            descripcion: string;
            imagen: string;
        } 
    }>();
</script>

<template>
    <v-card class="mx-auto" max-width="400">
      <v-img
        class="align-end text-white"
        height="200"
        :src="temario.imagen"
        cover>
        <v-card-title>{{ temario.titulo }}</v-card-title>
      </v-img>
  
      <v-card-subtitle class="pt-4">
        {{ temario.subtitulo }}
      </v-card-subtitle>
  
      <v-card-text>
        <div>{{ temario.descripcion }}</div>
      </v-card-text>
  
      <v-card-actions>
        <v-btn color="orange" text="Compartir"></v-btn>
        <v-btn color="orange" text="Explorar"></v-btn>
      </v-card-actions>
    </v-card>
</template>
  