<script setup lang="ts">
//Imports
import { useRouter } from "vue-router";


//Evento de clickar en la asignatura para ir a la página de temarios
const seleccionarAsignatura = () => {
  if (props.asignatura && props.asignatura.idAsignatura) {
      router.push(`/temarios/${props.asignatura.idAsignatura}`);
  } else {
      console.error('Error: la asignatura o su ID no están definidos');
  }
};

//router
const router = useRouter();

//Propiedades de la asignatura
const props = defineProps<{ 
  asignatura: { 
    idAsignatura: number;
    nombre: string;
    imagen: string;
  } 
}>();
</script>

<template>
  <v-card class="mx-auto" max-width="400" @click="seleccionarAsignatura">
    <v-img class="align-end text-white" height="150" :src="asignatura.imagen" cover>
      <v-card-title>{{ asignatura.nombre }}</v-card-title>
    </v-img>

    <v-card-subtitle class="pt-4 text-orange-darken-2 text-h6">
      {{ asignatura.nombre }}
    </v-card-subtitle>



    <v-card-actions>

    </v-card-actions>
  </v-card>
</template>
