<script setup>
//Imports
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';

//Evento de clickar en el curso para ir a la página de asignaturas
const seleccionarCurso = () => {
  if (curso.id) {
    router.push(`/asignaturas/${curso.id}`);
  }
};

//router
const router = useRouter();
//propiedades del curso
const curso = defineProps({
  id: Number, 
  titulo: String,
  subtitulo: String,
  descripcion: String,
  imagen: String
});

const show = ref(false);

//Funcionalidad Mis cursos
const misCursos = ref(JSON.parse(localStorage.getItem('misCursos') || '[]'));

//verificar si el curso ya está en la lista
const estaEnMisCursos = computed(() => misCursos.value.some(c => c.id === curso.id));


//Metodo para añadir o quitar un curso de la lista de mis cursos
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
  <v-card class="curso-card" @click="seleccionarCurso">
    <v-img :src="imagen" height="200px" cover></v-img>

    <v-card-title>
      {{ titulo }}
    </v-card-title>

    <v-card-subtitle>
      {{ subtitulo }}
    </v-card-subtitle>

    <v-card-actions>
      <v-btn variant="flat" :color="estaEnMisCursos ? 'orange' : 'white'" class="CardCurso__BotonLike" @click.stop="añadirAMisCursos">
        <v-icon :color="estaEnMisCursos ? 'white' : 'orange'">
          {{ estaEnMisCursos ? 'mdi-heart' : 'mdi-heart-outline' }}
        </v-icon>
      </v-btn>
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
.CardCurso__BotonLike {
  font-size: 150%;
  border: 2px solid orange;
}
</style>
