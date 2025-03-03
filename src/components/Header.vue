<script setup>
//imports
import { ref } from 'vue';
import emote from '@/assets/emote.svg';

//buscador
const search = ref('');
</script>

<template>
  <v-app-bar app class="Header__Seccion" height="80">
    <v-btn icon @click="$emit('toggle-sidebar')" class="Header__BotonMovil">
      <v-icon>mdi-menu</v-icon>
    </v-btn>

    <!-- Logo -->
    <v-img :src="emote" class="Header__Logo" contain></v-img>

    <v-toolbar-title class="Header__Titulo">Plataforma de Aprendizaje</v-toolbar-title>

    <v-spacer></v-spacer>

    <!-- Buscador universal -->
    <v-text-field
      v-model="search"
      label="Buscar..."
      append-icon="mdi-magnify"
      single-line
      hide-details
      class="Header__Buscador"
      @input="$emit('update-search', search)"
    ></v-text-field>
  </v-app-bar>
</template>

<style lang="scss" scoped>
  .Header__Seccion {
    background-color: #ff7424 !important;
    padding: 0.1%;
    position: fixed;
    z-index: 1100;
    width: 100%;
  }

  .Header__Logo {
    height: 40px;
    width: auto;
    margin-right: 1px;
  }

  .Header__Titulo {
    color: white;
    font-size: 1.2rem;
  }

  .Header__Buscador {
    width: 100%;
    min-width: auto;
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

  .Header__BotonMovil {
    display: block; 
  }

  /* Tablet (768px y superior) */
  @media (min-width: 768px) {
    .Header__Logo {
      height: 45px; 
    }

    .Header__Titulo {
      font-size: 1.5rem;
    }

    .Header__Buscador {
      width: auto;
      min-width: 300px;
    }
  }

  /* Desktop (992px y superior) */
  @media (min-width: 992px) {
    .Header__Logo {
      height: 50px;
    }

    .Header__Buscador {
      max-width: 400px;
    }

    .Header__BotonMovil {
      display: none; 
    }
  }
</style>