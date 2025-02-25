<script setup lang="ts">
  // Imports
  import { ref, computed } from 'vue';
  import { useRouter } from 'vue-router';
  import type { Curso } from '@/types/curso'; // IMPORTAMOS con `type`

  // router
  const router = useRouter();

  // props
  const props = defineProps<{ id: number; titulo: string; subtitulo: string; descripcion: string; imagen: string }>();

  // variables 
  const show = ref(false);
  const misCursos = ref<Curso[]>(JSON.parse(localStorage.getItem('misCursos') || '[]'));

  // verificar la existencia del curso en "Mis Cursos"
  const estaEnMisCursos = computed(() => misCursos.value.some(c => c.id === props.id));

  // metodo seleccionar curso
  const seleccionarCurso = () => {
    if (props.id) {
      router.push(`/asignaturas/${props.id}`);
    } else {
      console.error("Falta id", props);
    }
  };

  // metodo añadir / quitar de miscursos
  const añadirAMisCursos = () => {
    if (estaEnMisCursos.value) {
      misCursos.value = misCursos.value.filter(c => c.id !== props.id);
    } else {
      const nuevoCurso: Curso = { ...props };
      misCursos.value.push(nuevoCurso);
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
      <v-btn variant="flat" :color="estaEnMisCursos ? 'orange' : 'white'" class="boton__like" @click.stop="añadirAMisCursos">
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
.boton__like {
  font-size: 150%;
  border: 2px solid orange;
}
</style>
