<script setup>
import { ref, computed } from 'vue';
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';
import Sidebar from '@/components/Sidebar.vue';
import CardCurso from '@/components/CardCurso.vue';
import Login from '@/components/Login.vue';


const drawer = ref(false);
const searchQuery = ref('');
const items = ref([
  { title: 'Cursos', disabled: false, href: '/cursos' },
]);

const cursos = [
  { 
    id: 1,
    titulo: 'Bachillerato', 
    subtitulo: 'Educación secundaria superior', 
    descripcion: 'Cursos de 1º y 2º de bachillerato con distintas modalidades.', 
    imagen: 'https://cdn.vuetifyjs.com/images/cards/sunshine.jpg' 
  },
  { 
    id: 2,
    titulo: 'Secundaria', 
    subtitulo: 'Educación básica', 
    descripcion: '4 años de educación obligatoria para adolescentes.', 
    imagen: 'https://cdn.vuetifyjs.com/images/cards/road.jpg' 
  },
  { 
    id: 3,
    titulo: 'Primaria', 
    subtitulo: 'Educación infantil', 
    descripcion: 'Educación para niños de 6 a 12 años.', 
    imagen: 'https://cdn.vuetifyjs.com/images/cards/house.jpg' 
  },
  { 
    id: 4,
    titulo: 'Grado Universitario', 
    subtitulo: 'Carreras universitarias', 
    descripcion: 'Programas académicos de nivel superior.', 
    imagen: 'https://cdn.vuetifyjs.com/images/cards/mountain.jpg' 
  }

  
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


<template>
  <v-app>
    <Header @toggle-sidebar="drawer = !drawer" @update-search="filtrarCursos" />

    <!-- Inicio Breadcrumb -->
    <v-breadcrumbs class="breadcrumbs" :items="items">
      <template v-slot:prepend>
        <v-icon icon="$vuetify" size="small"></v-icon>
      </template>
    </v-breadcrumbs>
    <!-- Fin Breadcrumb -->

    <v-container class="main-container">
      <Sidebar v-model="drawer" />

      <div class="content">
        <v-container class="cursos-container">
          <v-row align="start" justify="start">
            <v-col v-for="curso in cursosFiltrados" :key="curso.id" cols="12" sm="6" md="4" lg="3">
              <CardCurso 
                :id="curso.id"
                :titulo="curso.titulo"
                :subtitulo="curso.subtitulo"
                :descripcion="curso.descripcion"
                :imagen="curso.imagen"
                @click="intentarAgregarCurso(curso.id)"
              />
            </v-col>
          </v-row>
        </v-container>
      </div>
    </v-container>

    <Footer />

    <!-- Modal de Login -->
    <Login v-if="mostrarLogin" :mostrar="mostrarLogin" @cerrar="mostrarLogin = false" />
  </v-app>
</template>



<style lang="scss" scoped>

.breadcrumbs{
  margin-left:5% ;
  margin-top: 6%;
}

.content {
  margin-top: -4%;
  flex: 1;
  padding: 20px;
  margin-left: 1%;
}

.main-container {
  display: flex;
  gap: 20px;
  min-height: 100vh;
  padding-top: 64px;
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
