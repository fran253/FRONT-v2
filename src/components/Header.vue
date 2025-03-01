<script setup>
//imports
import { ref } from 'vue';
import emote from '@/assets/emote.svg';

//buscador
const search = ref('');
</script>

<template>
  <v-app-bar app class="header" height="80">
    <v-btn icon @click="$emit('toggle-sidebar')" class="mobile-menu-btn">
      <v-icon>mdi-menu</v-icon>
    </v-btn>

    <!-- Logo -->
    <v-img :src="emote" class="logo" contain></v-img>

    <v-toolbar-title class="title">Plataforma de Aprendizaje</v-toolbar-title>

    <v-spacer></v-spacer>

    <!-- Buscador universal -->
    <v-text-field
      v-model="search"
      label="Buscar..."
      append-icon="mdi-magnify"
      single-line
      hide-details
      class="search-bar"
      @input="$emit('update-search', search)"
    ></v-text-field>
  </v-app-bar>
</template>

/* Mobile First Approach */
<style lang="scss" scoped>
  .header {
    background-color: #ff7424 !important;
    padding: 0.1%;
    position: fixed;
    z-index: 1100;
    width: 100%; /* Asegura que ocupe todo el ancho en móviles */
  }

  .logo {
    height: 40px; /* Ligeramente más pequeño en móviles */
    width: auto;
    margin-right: 1px;
  }

  .title {
    color: white;
    font-size: 1.2rem; /* Tamaño de fuente para móviles */
  }

  .search-bar {
    width: 100%; /* En móviles ocupa todo el ancho disponible */
    min-width: auto; /* Eliminamos min-width para pantallas pequeñas */
    background: transparent !important;
    border-radius: 8px;
    color: #ff7424 !important;

    ::v-deep(.v-field) {
      background: white !important;
    }

    ::v-deep(input) {
      color: #ff7424 !important;
    }
  }

  .mobile-menu-btn {
    display: block; /* Visible por defecto en móviles */
  }

  /* Tablet (768px y superior) */
  @media (min-width: 768px) {
    .logo {
      height: 45px; /* Tamaño intermedio para tablets */
    }

    .title {
      font-size: 1.5rem;
    }

    .search-bar {
      width: auto;
      min-width: 300px;
    }
  }

  /* Desktop (992px y superior) */
  @media (min-width: 992px) {
    .logo {
      height: 50px; /* Tamaño original para desktop */
    }

    .search-bar {
      max-width: 400px;
    }

    .mobile-menu-btn {
      display: none; /* Oculto en desktop */
    }
  }
</style>