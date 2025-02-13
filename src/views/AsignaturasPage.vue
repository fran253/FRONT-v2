<script setup lang="ts">
    import { ref } from "vue";
    import CardAsignatura from "@/components/CardAsignatura.vue";



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
    <Header />
    <v-container>
      <h1 class="text-center mb-4">Asignaturas</h1>
      <v-row>
        <v-col v-for="asignatura in asignaturas" :key="asignatura.id" cols="12" md="6">
          <CardAsignatura :asignatura="asignatura" />
        </v-col>
      </v-row>
    </v-container>
    <Footer />
</template>
  

  