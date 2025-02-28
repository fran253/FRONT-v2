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
    console.error("Error al obtener cursos:", error);
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

// Verificar login usuario
onMounted(async () => {
  const usuarioGuardado = localStorage.getItem('usuario');
  const yaMostroLogin = localStorage.getItem('yaMostroLogin');

  if (usuarioGuardado) {
    const usuario = JSON.parse(usuarioGuardado);
    const existe = await usuarioLogeadoStore.verificarUsuario(usuario.email);
    
    if (existe) {
      usuarioLogeadoStore.usuarioActual = usuario;
      usuarioLogeadoStore.estaAutenticado = true;
      await fetchCursos();
    } else {
      mostrarLogin.value = true;
      localStorage.removeItem('usuario');
    }
  } else if (!yaMostroLogin) {
    mostrarLogin.value = true;
    localStorage.setItem('yaMostroLogin', 'true');
  }
});

</script>

<template>
  <v-app>
    <Header @toggle-sidebar="drawer = !drawer" @update-search="searchQuery = $event" />

    <v-breadcrumbs class="breadcrumbs" :items="items">
      <template v-slot:prepend>
        <v-icon icon="$vuetify" size="small"></v-icon>
      </template>
    </v-breadcrumbs>

    <v-container class="main-container">
      <Sidebar v-model="drawer" @mostrar-login="mostrarLogin = true" />

      <div class="content">
        <v-container class="cursos-container">
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
.breadcrumbs {
  margin-left: 5%;
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
