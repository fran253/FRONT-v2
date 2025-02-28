<script setup lang="ts">
// Imports
import { useRouter } from 'vue-router';
import { computed } from 'vue';


//Evento de clickar en test para ver la ventana del test
const verTest = () => {
  if (props.test && props.test.id) {
    router.push(`/test/${props.test.id}`);
  } else {
    console.error("Error: Test sin ID válido", props.test);
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
    <v-card-actions class="button-group">
      <v-btn color="orange-darken-2" icon class="circular-btn" @click="verTest">
        <v-icon color="white">mdi-eye</v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<style lang="scss" scoped>
.circular-btn {
  width: 50px;
  height: 50px;
  min-width: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: orange;
}

.button-group {
  display: flex;
  gap: 10px;
  justify-content: center;
}
</style>