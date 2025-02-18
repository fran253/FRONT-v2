<template>
  <v-card class="pa-3">
    <v-card-title>{{ test.nombre }}</v-card-title>
    <v-divider></v-divider>
    <v-card-text>
      <p>{{ test.descripcion }}</p>
    </v-card-text>
    <v-card-actions>
      <v-btn color="blue" @click="$emit('ver', test)">👀 Ver</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup lang="ts">
defineProps<{ test: { id: number; nombre: string; descripcion: string } }>();
</script>
