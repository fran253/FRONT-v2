<script setup lang="ts">
  import { ref } from "vue";
  
  interface Asignatura {
    id: number;
    nombre: string;
    imagen: string;
  }
  
  const asignaturas = ref<Asignatura[]>([
    { id: 1, nombre: "Matemáticas", imagen: "https://cdn.vuetifyjs.com/images/cards/house.jpg" },
    { id: 2, nombre: "Historia", imagen: "https://cdn.vuetifyjs.com/images/cards/road.jpg" },
    { id: 3, nombre: "Física", imagen: "https://cdn.vuetifyjs.com/images/cards/plane.jpg" },
  ]);
</script>

<template>
    <v-container>
      <v-row dense>
        <v-col
          v-for="asignatura in asignaturas"
          :key="asignatura.id"
          cols="12" md="6"
        >
          <v-card>
            <v-img
              :src="asignatura.imagen"
              class="align-end"
              gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
              height="200px"
              cover
            >
              <v-card-title class="text-white">{{ asignatura.nombre }}</v-card-title>
            </v-img>
  
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="medium-emphasis" icon="mdi-heart" size="small"></v-btn>
              <v-btn color="medium-emphasis" icon="mdi-bookmark" size="small"></v-btn>
              <v-btn color="medium-emphasis" icon="mdi-share-variant" size="small"></v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
</template>
  