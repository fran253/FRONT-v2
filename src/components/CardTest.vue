<script setup lang="ts">
// Imports
import { useRouter } from 'vue-router';
import { computed } from 'vue';


//Evento de clickar en test para ver la ventana del test
const verTest = () => {
  if (props.test && props.test.id) {
    router.push(`/test/${props.test.id}`);
  }
};


// Router
const router = useRouter();
// Definir las propiedades de test
const props = defineProps({
  test: {
    type: Object,
    required: true
  }
});

// Obtener el título
const testTitle = computed(() => {
  return props.test?.titulo || props.test?.nombre || 'Test sin título';
});
</script>

<template>
  <v-card class="pa-3">
    <v-card-title>{{ testTitle }}</v-card-title>
    <v-divider></v-divider>
    <v-card-actions class="CardTest__Botones">
      <v-btn color="orange-darken-2" icon class="CardTest__Botones__Verbtn" @click="verTest">
        <v-icon color="white">mdi-eye</v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<style lang="scss" scoped>
  @import "@/assets/sass/components/Cards/Ctest.scss";
</style>