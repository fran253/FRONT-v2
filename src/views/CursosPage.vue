<script setup lang="ts">
  import { ref } from "vue";
  import TarjetaCurso from "@/components/CardCurso.vue";
  import Header from "@/components/Header.vue";
  import Footer from "@/components/Footer.vue";

  
  interface Curso {
        id: number;
        nombre: string;
        imagen: string;
        descripcion: string;
    }
  
  const cursos = ref<Curso[]>([
        { id: 1, nombre: "Matemáticas", imagen: "https://cdn.vuetifyjs.com/images/cards/sunshine.jpg", descripcion: "Aprende sobre números y ecuaciones." },
        { id: 2, nombre: "Historia", imagen: "https://cdn.vuetifyjs.com/images/cards/sunshine.jpg", descripcion: "Explora los acontecimientos pasados." },
        { id: 3, nombre: "Física", imagen: "https://cdn.vuetifyjs.com/images/cards/sunshine.jpg", descripcion: "Descubre las leyes del universo." }
    ]);
</script>

<template>
    <Header />
    <v-container>
        <Header />
      <v-row>
        <v-col
          v-for="curso in cursos"
          :key="curso.id"
          cols="12" md="4"
        >
          <TarjetaCurso :curso="curso" />
        </v-col>
      </v-row>
    </v-container>
    <Footer />
</template>
  