<template>
  <v-app>
    <Header @toggle-sidebar="drawer = !drawer" @update-search="filtrarCursos" />

    <v-container class="main-container">
      <Sidebar v-model="drawer" />

      <div class="content">
        <h1 class="titulo">Listado de Cursos</h1>

        <v-container class="cursos-container">
          <v-row align="start" justify="start">
            <v-col v-for="curso in cursosFiltrados" :key="curso.titulo" cols="12" sm="6" md="4" lg="3">
              <CardCurso 
                :titulo="curso.titulo"
                :subtitulo="curso.subtitulo"
                :descripcion="curso.descripcion"
                :imagen="curso.imagen"
              />
            </v-col>
          </v-row>
        </v-container>
      </div>
    </v-container>

    <Footer />
  </v-app>
</template>

<script setup>
import { ref, computed } from 'vue';
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';
import Sidebar from '@/components/Sidebar.vue';
import CardCurso from '@/components/CardCurso.vue';

const drawer = ref(false);
const searchQuery = ref('');

const cursos = [
  { 
    titulo: 'Bachillerato', 
    subtitulo: 'Educación secundaria superior', 
    descripcion: 'Cursos de 1º y 2º de bachillerato con distintas modalidades.', 
    imagen: 'https://cdn.vuetifyjs.com/images/cards/sunshine.jpg' 
  },
  { 
    titulo: 'Secundaria', 
    subtitulo: 'Educación básica', 
    descripcion: '4 años de educación obligatoria para adolescentes.', 
    imagen: 'https://cdn.vuetifyjs.com/images/cards/road.jpg' 
  },
  { 
    titulo: 'Primaria', 
    subtitulo: 'Educación infantil', 
    descripcion: 'Educación para niños de 6 a 12 años.', 
    imagen: 'https://cdn.vuetifyjs.com/images/cards/house.jpg' 
  },
  { 
    titulo: 'Grado Universitario', 
    subtitulo: 'Carreras universitarias', 
    descripcion: 'Programas académicos de nivel superior.', 
    imagen: 'https://cdn.vuetifyjs.com/images/cards/mountain.jpg' 
  },
];

const cursosFiltrados = computed(() => {
  if (!searchQuery.value) return cursos;
  return cursos.filter(curso =>
    curso.titulo.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

const filtrarCursos = (query) => {
  searchQuery.value = query;
};
</script>

<style lang="scss" scoped>
.main-container {
  display: flex;
  gap: 20px;
  min-height: 100vh;
  padding-top: 64px;
}

.content {
  flex: 1;
  padding: 20px;
  margin-left: 250px;
}

.titulo {
  text-align: center;
  margin-bottom: 20px;
  margin-top: 40px;
  color: #FF5500;
}


.cursos-container {
  padding: 20px;
}


@media (max-width: 768px) {
  .content {
    margin-left: 0;
  }
}
</style>
