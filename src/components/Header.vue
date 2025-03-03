<script setup>
//imports
import { ref } from 'vue';

//buscador
const search = ref('');
</script>

<template>
  <v-app-bar app class="Header__Seccion" height="80">
    <v-btn icon @click="$emit('toggle-sidebar')" class="Header__BotonMovil">
      <v-icon>mdi-menu</v-icon>
    </v-btn>

    <!-- Logo SVG inline -->
    <div class="Header__Logo">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
        <!-- Sombra -->
        <rect x="40" y="60" width="120" height="140" rx="10" ry="10" fill="#A0522D" opacity="0.5"/>
        
        <!-- Base del bloc de notas -->
        <rect x="30" y="50" width="120" height="140" rx="10" ry="10" fill="#FF5500"/>
        
        <!-- Papel -->
        <rect x="35" y="55" width="110" height="110" rx="5" ry="5" fill="#EEEEEE" stroke="#FB7C3C" stroke-width="3"/>
        
        <!-- Anillas -->
        <circle cx="50" cy="45" r="7" fill="#F7A277"/>
        <circle cx="80" cy="45" r="7" fill="#F7A277"/>
        <circle cx="110" cy="45" r="7" fill="#F7A277"/>
        <circle cx="140" cy="45" r="7" fill="#F7A277"/>
        
        <!-- Líneas del texto con animación -->
        <rect class="text-line line1" x="50" y="80" height="8" rx="3" ry="3" fill="#333"/>
        <rect class="text-line line2" x="50" y="100" height="8" rx="3" ry="3" fill="#333"/>
        <rect class="text-line line3" x="50" y="120" height="8" rx="3" ry="3" fill="#333"/>
      </svg>
    </div>

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
    width: 40px;
    margin-right: 10px;
    transition: transform 0.3s ease;
    
    &:hover {
      transform: scale(1.1);
    }
    
    svg {
      height: 100%;
      width: 100%;
    }
    
    /* Estilos para las líneas de texto animadas */
    .text-line {
      width: 0;
      opacity: 0;
      transition: none;
    }
    
    &:hover {
      .line1 {
        animation: writeLine 0.7s ease-out 0s forwards;
      }
      
      .line2 {
        animation: writeLine 0.7s ease-out 0.2s forwards;
      }
      
      .line3 {
        animation: writeLine 0.7s ease-out 0.4s forwards;
      }
    }
  }
  
  @keyframes writeLine {
    0% {
      width: 0;
      opacity: 0;
    }
    100% {
      width: 80px;
      opacity: 1;
    }
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
      width: 45px;
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
      width: 50px;
    }

    .Header__Buscador {
      max-width: 400px;
    }

    .Header__BotonMovil {
      display: none; 
    }
  }
</style>