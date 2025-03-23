<script setup lang="ts">
import { computed } from "vue";
import type { Archivo } from "@/stores/Archivo"; 

const props = defineProps<{ archivo: Archivo }>();
const emit = defineEmits(["ver"]);

const verArchivo = () => {
  emit("ver", props.archivo);
};

// Computed para definir la clase de color según el tipo de archivo
const tipoClase = computed(() => {
  switch (props.archivo.tipo.toLowerCase()) {
    case "pdf": return "Archivo___PDF";
    case "word": return "Archivo___Word";
    case "imagen": return "Archivo___Imagen";
    case "video": return "Archivo___Video";
    default: return "Archivo___Otro";
  }
});
</script>

<template>
  <v-col cols="12" md="6" lg="4">
    <v-card class="pa-3">
      <div class="d-flex align-center justify-space-between Archivos__TituloContenedor">
        <v-card-title class="Archivo__Titulo">{{ props.archivo.titulo }}</v-card-title>
        <!-- Aplicar clase dinámica SOLO a este div -->
        <div class="Archivo__Tipo" :class="tipoClase">{{ props.archivo.tipo }}</div>
      </div>
      <v-divider></v-divider>

            <v-divider></v-divider>


      <v-card-actions class="Archivos__Botones">
        <v-btn color="blue-grey-lighten-2" icon class="Archivos__Boton" @click="verArchivo" aria-label="Ver archivo">
          <v-icon color="white">mdi-eye</v-icon>
        </v-btn>
        <v-btn
          color="orange-darken-2"
          icon
          :href="props.archivo.url"
          target="_blank"
          download
          aria-label="Descargar archivo"
        >
          <v-icon color="orange">mdi-download</v-icon>
        </v-btn>

      </v-card-actions>
    </v-card>
  </v-col>
</template>

<style lang="scss" scoped>
@import "@/assets/sass/components/Cards/Carchivo.scss";
</style>
