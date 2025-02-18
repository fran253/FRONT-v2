<script setup lang="ts">
import { useRouter } from "vue-router";

const router = useRouter();

const props = defineProps<{ 
  asignatura: { 
    id: number;
    nombre: string;
    imagen: string;
  } 
}>();

const seleccionarAsignatura = () => {
  router.push(`/temarios/${props.asignatura.id}`);
};
</script>

<template>
  <v-card class="mx-auto" max-width="400" @click="seleccionarAsignatura">
    <v-img
      class="align-end text-white"
      height="200"
      :src="asignatura.imagen"
      cover
    >
      <v-card-title>{{ asignatura.nombre }}</v-card-title>
    </v-img>

    <v-card-subtitle class="pt-4">
      Asignatura {{ asignatura.id }}
    </v-card-subtitle>

    <v-card-actions>
      <v-btn color="orange" text>Compartir</v-btn>
      <v-btn color="orange" text>Explorar</v-btn>
    </v-card-actions>
  </v-card>
</template>