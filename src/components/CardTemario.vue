<script setup lang="ts">
// Imports
import { onMounted, computed } from "vue";
import { useRouter } from "vue-router";


//Evento de clickar en temario para ir a la página de archivos-test
const seleccionarTemario = () => {
  console.log('ID del temario:', props.temario.id);
  if (props.temario && props.temario.id) {
    router.push(`/temarios/${props.temario.id}/archivos-test`);
  } else {
    console.error('Error: el temario o su ID no están definidos');
  }
};


// Router
const router = useRouter();
// Propiedades temario
const props = defineProps({
  temario: {
    type: Object,
    required: true
  }
});


// ID del temario
const temarioId = computed(() => {
  if (!props.temario) return null;
  return props.temario.id || props.temario.idTemario || props.temario.temarioId;
});

//mensajes por consola para verificar que funcionan las pruebas
onMounted(() => {
  console.log('Temario en CardTemario:', props.temario);
  console.log('ID calculado:', temarioId.value);
});



</script>

<template>
  <v-card class="mx-auto" max-width="400">
    <v-img
      class="align-end text-white"
      height="200"
      :src="temario.imagen || '/placeholder.jpg'"
      cover
    >
      <v-card-title>{{ temario.titulo }}</v-card-title>
    </v-img>

    <v-card-subtitle class="pt-4">
      {{ temario.titulo }}
    </v-card-subtitle>

    <v-card-actions>
      <v-btn color="orange-darken-2" @click="seleccionarTemario">
        Ver contenido
      </v-btn>
    </v-card-actions>
  </v-card>
</template>