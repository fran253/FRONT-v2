<template>
    <v-app-bar app class="header" height="80">
      <v-btn icon @click="$emit('toggle-sidebar')" class="mobile-menu-btn">
        <v-icon>mdi-menu</v-icon>
      </v-btn>
  
      <v-toolbar-title class="title">Plataforma de Aprendizaje</v-toolbar-title>
  
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

    </v-app-bar>
</template>
  
<script setup>
import { ref } from 'vue';
  
const search = ref('');
</script>
  
<style lang="scss" scoped>
.header {
    background-color: #ff7424 !important; 
    padding: 0.1%;
}

.title {
    color: white; 
}

.search-bar {
    max-width: 400px;
    min-width: 300px;
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
