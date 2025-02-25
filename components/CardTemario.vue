<script setup lang="ts">
  //imports
  import { useRouter } from "vue-router";
  import type { Temario } from "@/types/temario"; // Importamos el tipo

  //router
  const router = useRouter();

  // propiedades temario
  const props = defineProps<{ temario: Temario }>();

  //metodo seleccionar temario
  const seleccionarTemario = () => {
    router.push(`/temarios/${props.temario.id}/archivos-test`);
  };
</script>


<template>
    <v-card class="mx-auto" max-width="400" @click="seleccionarTemario">
      <v-img
        class="align-end text-white"
        height="200"
        :src="temario.imagen"
        cover
      >
        <v-card-title>{{ temario.titulo }}</v-card-title>
      </v-img>

      <v-card-subtitle class="pt-4">
        {{ temario.titulo }}
      </v-card-subtitle>

      <v-card-actions>
      
      </v-card-actions>
    </v-card>
</template>
