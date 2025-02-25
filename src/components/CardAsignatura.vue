<script setup lang="ts">
  //Imports
  import CursosPage from "@/views/CursosPage.vue";
  import { useRouter } from "vue-router";

  //router
  const router = useRouter();
  //props
  const props = defineProps<{ 
    asignatura: { 
      id: number;
      nombre: string;
      imagen: string;
    } 
  }>();

  //metodo seleccionarAsignatura
  const seleccionarAsignatura = () => {
      router.push(`/temarios/${props.asignatura.id}`);
  };
</script>

<template>
  <v-card class="mx-auto" max-width="400" @click="seleccionarAsignatura">
    <v-img class="align-end text-white" height="200" :src="asignatura.imagen" cover>
      <v-card-title>{{ asignatura.nombre }}</v-card-title>
    </v-img>

    <v-card-subtitle class="pt-4">
      {{ asignatura.nombre }}
    </v-card-subtitle>

    <v-card-actions>

    </v-card-actions>
  </v-card>
</template>