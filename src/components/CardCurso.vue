<script setup>
// --------------------------- Imports ---------------------------
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';

// --------------------------- Router ---------------------------
const router = useRouter();

// --------------------------- Propiedades ---------------------------
const curso = defineProps({
  id: Number, 
  titulo: String,
  subtitulo: String,
  descripcion: String,
  imagen: String
});

// --------------------------- Variables reactivas ---------------------------
const show = ref(false);
const misCursos = ref(JSON.parse(localStorage.getItem('misCursos') || '[]'));

// --------------------------- Computed ---------------------------
const estaEnMisCursos = computed(() => misCursos.value.some(c => c.id === curso.id));

// --------------------------- Métodos ---------------------------
const seleccionarCurso = () => {
  if (curso.id) {
    router.push(`/asignaturas/${curso.id}`);
  }
};

const añadirAMisCursos = () => {
  if (estaEnMisCursos.value) {
    misCursos.value = misCursos.value.filter(c => c.id !== curso.id);
  } else {
    misCursos.value.push(curso);
  }
  localStorage.setItem('misCursos', JSON.stringify(misCursos.value));
};
</script>

<template>
  <!-- --------------------------- Card de Curso --------------------------- -->
  <v-card class="curso-card" @click="seleccionarCurso">
    <v-img :src="imagen" height="200px" cover></v-img>

    <v-card-title>
      {{ titulo }}
    </v-card-title>

    <v-card-subtitle>
      {{ subtitulo }}
    </v-card-subtitle>

    <!-- --------------------------- Botón para añadir a Mis Cursos --------------------------- -->
    <v-card-actions>
      <v-btn variant="flat" :color="estaEnMisCursos ? 'orange' : 'white'" class="CardCurso__BotonLike" @click.stop="añadirAMisCursos">
        <v-icon :color="estaEnMisCursos ? 'white' : 'orange'">
          {{ estaEnMisCursos ? 'mdi-heart' : 'mdi-heart-outline' }}
        </v-icon>
      </v-btn>
    </v-card-actions>

    <!-- --------------------------- Descripción Expansible --------------------------- -->
    <v-expand-transition>
      <div v-show="show">
        <v-divider></v-divider>
        <v-card-text>{{ descripcion }}</v-card-text>
      </div>
    </v-expand-transition>
  </v-card>
</template>

<style scoped>
  @import "@/assets/sass/components/Cards/Ccurso.scss";
</style>
