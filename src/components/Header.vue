<template>
    <v-app-bar app class="header" height="80">
      <v-btn icon @click="$emit('toggle-sidebar')" class="mobile-menu-btn">
        <v-icon>mdi-menu</v-icon>
      </v-btn>
  
      <v-toolbar-title>Plataforma de Aprendizaje</v-toolbar-title>
  
      <v-spacer></v-spacer>
  
      <!-- Buscador -->
      <v-text-field
        v-model="search"
        label="Buscar cursos..."
        append-icon="mdi-magnify"
        single-line
        hide-details
        class="search-bar"
        @input="$emit('update-search', search)"
      ></v-text-field>
  
      <router-link to="/perfil" class="perfil-link">
        Perfil
      </router-link>
    </v-app-bar>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const search = ref('');
  </script>
  
  <style lang="scss" scoped>
  .header {
    background: #B0B0B0; /* Gris */
    color: white;
    padding: 10px;
  }
  
  .search-bar {
    max-width: 400px;
    min-width: 300px;
    background: white;
    border-radius: 8px;
  }
  
  .perfil-link {
    margin-left: 15px;
    color: rgb(0, 0, 0);
    text-decoration: none;
    font-weight: bold;
    transition: opacity 0.2s;
  
    &:hover {
      opacity: 0.7;
    }
  }
  
  .mobile-menu-btn {
    @media (min-width: 769px) {
      display: none;
    }
  }
  </style>
  