<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const curso = defineProps({
  id: Number, 
  titulo: String,
  subtitulo: String,
  descripcion: String,
  imagen: String
});

const show = ref(false);
const misCursos = ref(JSON.parse(localStorage.getItem('misCursos') || '[]'));

const seleccionarCurso = () => {
  if (curso.id) {
    router.push(`/asignaturas/${curso.id}`);
  } else {
    console.error(" falta id", curso);
  }
};

const añadirAMisCursos = () => {
  if (!misCursos.value.some(c => c.id === curso.id)) {
    misCursos.value.push(curso);
    localStorage.setItem('misCursos', JSON.stringify(misCursos.value));
  }
};
</script>

<template>
  <v-card class="curso-card" @click="seleccionarCurso">
    <v-img :src="imagen" height="200px" cover></v-img>

    <v-card-title>
      {{ titulo }}
    </v-card-title>

    <v-card-subtitle>
      {{ subtitulo }}
    </v-card-subtitle>

    <v-card-actions>
      <v-btn icon="mdi-plus" variant="flat" color="orange" class="text-white" @click.stop="añadirAMisCursos">+</v-btn>

    </v-card-actions>

    <v-expand-transition>
      <div v-show="show">
        <v-divider></v-divider>
        <v-card-text>{{ descripcion }}</v-card-text>
      </div>
    </v-expand-transition>
  </v-card>
</template>

<style scoped>
.text-white {
  color: white;
  font-size: 150%;
}
</style>
