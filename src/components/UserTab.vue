<template>
    <v-card class="tabs-card">
      <v-tabs v-model="tab" bg-color="primary">
        <v-tab value="one">Cursos</v-tab>
        <v-tab value="two">Comentarios</v-tab>
        <v-tab value="three">Lo que sea</v-tab>
      </v-tabs>
  
      <v-card-text>
        <v-tabs-window v-model="tab">
          <v-tabs-window-item value="one">
            <p>Tus Cursos</p>
          </v-tabs-window-item>
  
          <v-tabs-window-item value="two">
            <p>Tus Comentarios</p>
          </v-tabs-window-item>
  
          <v-tabs-window-item value="three">
            <p>Algo</p>
          </v-tabs-window-item>
        </v-tabs-window>
      </v-card-text>
    </v-card>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const tab = ref("one");
  </script>
  
  <style lang="scss" scoped>
  .tabs-card {
    margin-top: 20px;
    min-height: 200px;
  }
  </style>
  