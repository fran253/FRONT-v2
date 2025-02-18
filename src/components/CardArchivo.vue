<template>
  <v-card class="pa-3">
    <v-card-title>{{ archivo.nombre }}</v-card-title>
    <v-divider></v-divider>
    <v-card-actions>
      <v-btn color="blue" @click="$emit('ver', archivo)">👀 Ver</v-btn>
      <v-btn color="green" :href="archivo.url" target="_blank" download>⬇️ Descargar</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup lang="ts">
defineProps<{ archivo: { id: number; nombre: string; url: string } }>();
</script>
