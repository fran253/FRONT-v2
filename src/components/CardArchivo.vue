<script setup lang="ts">
import { type PropType } from 'vue';
import type { ArchivoDTO } from "@/stores/dtos/ArchivoDTO"; // Corregido el path de importación

// Usar el nombre correcto de la propiedad para acceder a ella en la función
const props = defineProps<{ archivo: ArchivoDTO }>();
const emit = defineEmits(["ver"]);

const verArchivo = () => {
  emit("ver", props.archivo);
};
</script>

<template>
  <v-col cols="12" md="6" lg="4">
    <v-card class="pa-3">
      <div class="d-flex align-center justify-space-between Archivos__TituloContenedor">
        <v-card-title class="Archivo__Titulo">{{ props.archivo.titulo }}</v-card-title>
        <div class="Archivo__Tipo">{{ props.archivo.tipo }}</div>
      </div>
      <v-divider></v-divider>

      <v-card-actions class="Archivos__Botones">
        <v-btn color="blue-grey-lighten-2" icon class="Archivos__Boton" @click="verArchivo" aria-label="Ver archivo">
          <v-icon color="white">mdi-eye</v-icon>
        </v-btn>
        <v-btn color="blue-grey-lighten-2" icon class="Archivos__Boton" :href="props.archivo.url" target="_blank" download aria-label="Descargar archivo">
          <v-icon color="white">mdi-download</v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-col>
</template>


<style lang="scss" scoped>
  @import "@/assets/sass/components/Cards/Carchivo.scss";
</style>