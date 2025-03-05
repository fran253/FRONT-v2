<script setup>
//imports
import { ref, computed, onMounted } from 'vue';
import { useUsuarioLogeadoStore } from '@/stores/UsuarioLogeado';
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';
import Sidebar from '@/components/Sidebar.vue';
import CardCurso from '@/components/CardCurso.vue';
import Login from '@/components/Login.vue';


//breadcrumb
const items = ref([{ title: 'Cursos', disabled: false, href: '/cursos' }]);

// Fetch a la API
const fetchCursos = async () => {
  try {
    const response = await fetch("/api/Curso", {
      headers: usuarioLogeadoStore.usuarioActual 
        ? { 'Authorization': `Bearer ${usuarioLogeadoStore.usuarioActual.token}` }
        : {}
    });
    
    if (!response.ok) throw new Error("Error al obtener los cursos");

    cursos.value = await response.json();
  } catch (error) {
    console.error(error);
  }
};


//Buscador
const searchQuery = ref('');
const cursosFiltrados = computed(() => {
  if (!searchQuery.value) return cursos.value;
  return cursos.value.filter(curso =>
    curso.nombre.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

//almacenar datos del curso
const cursos = ref([]);

//variables
const drawer = ref(false);
const mostrarLogin = ref(false); 
// llamada al metodo de Usuario.ts
const usuarioLogeadoStore = useUsuarioLogeadoStore();


//llamada ametodo de mostrar los cursos
onMounted(fetchCursos);



</script>

<template>
  <v-app>
    <Header @toggle-sidebar="drawer = !drawer" @update-search="searchQuery = $event" />

    <v-breadcrumbs class="CursosPage___Breadcrumb" :items="items">
      <template v-slot:prepend>
        <v-icon icon="$vuetify" size="small"></v-icon>
      </template>
    </v-breadcrumbs>

    <v-container class="CursosPage__Contenedor">
      <Sidebar v-model="drawer" @mostrar-login="mostrarLogin = true" />

      <div class="CursosPage___contenido">
        <v-container class="CursosPage___ContenedorCursos">
          <v-row align="start" justify="start">
            <v-col v-for="curso in cursosFiltrados" :key="curso.idCurso" cols="12" sm="6" md="4" lg="3">
              <CardCurso 
                :id="curso.idCurso"
                :titulo="curso.nombre"
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

    <Login 
      v-if="mostrarLogin" 
      :mostrar="mostrarLogin" 
      @cerrar="mostrarLogin = false" 
    />
  </v-app>
</template>

<style lang="scss" scoped>


.CursosPage___Breadcrumb {
  margin-left: 5%;
  margin-top: 25%;
}

.CursosPage___contenido {
  margin-top: 0;
  flex: 1;
  padding: 15px;
  margin-left: 0;
}

.CursosPage__Contenedor {
  display: flex;
  flex-direction: column;
  gap: 15px;
  min-height: 100vh;
  padding-top: 56px;
}

.titulo {
  text-align: center;
  margin-bottom: 15px;
  margin-top: 30px;
  color: #FF5500;
  font-size: 1.5rem;
}

.CursosPage___ContenedorCursos {
  padding: 15px;
}

/* ipad */
@media (min-width: 576px) {
  .CursosPage___Breadcrumb {
    margin-left: 3%;
    margin-top: 5%;
  }

  .CursosPage___contenido {
    padding: 18px;
  }

  .CursosPage__Contenedor {
    gap: 18px;
    padding-top: 60px;
  }

  .titulo {
    margin-bottom: 18px;
    margin-top: 35px;
    font-size: 1.75rem;
  }

  .CursosPage___ContenedorCursos {
    padding: 18px;
  }
}

/* Ordenador */
@media (min-width: 768px) {
  .CursosPage___Breadcrumb {
    margin-left: 5%;
    margin-top: 6%;
  }

  .CursosPage___contenido {
    margin-top: -4%;
    padding: 20px;
    margin-left: 1%;
  }

  .CursosPage__Contenedor {
    flex-direction: row;
    gap: 20px;
    padding-top: 64px;
  }

  .titulo {
    margin-bottom: 20px;
    margin-top: 40px;
    font-size: 2rem;
  }

  .CursosPage___ContenedorCursos {
    padding: 20px;
  }
}
</style>