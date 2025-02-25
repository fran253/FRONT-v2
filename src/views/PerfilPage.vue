<script setup>
  //imports
  import { ref, watch } from 'vue';
  import Header from '@/components/Header.vue';
  import Footer from '@/components/Footer.vue';
  import Sidebar from '@/components/Sidebar.vue';
  import UserTab from '@/components/UserTab.vue';
  import Login from '@/components/Login.vue';

  // Variables
  const drawer = ref(false);
  const nombre = ref("Sandra Adams");
  const items = ref([{ title: 'Perfil', disabled: false }]);

  // frases celebres
  const estados = [
    "Me encanta Estudiar",
    "Soy una persona aplicada",
    "Vivan las Mates!",
    "La historia mola",
    "Fan de literatura",
    "Alumno sin igual"
  ];

  const usuarioAutenticado = ref(false);
  const mostrarLogin = ref(!usuarioAutenticado.value);

  // Observar cambios en autenticación
  watch(usuarioAutenticado, (nuevoValor) => {
    if (nuevoValor) mostrarLogin.value = false;
  });
</script>

<template>
  <v-app>
    <Header @toggle-sidebar="drawer = !drawer" />
    
    <!-- Breadcrumb -->
    <v-breadcrumbs class="breadcrumbs" :items="items">
      <template v-slot:prepend>
        <v-icon icon="$vuetify" size="small"></v-icon>
      </template>
    </v-breadcrumbs>

    <v-container class="main-container">
      <Sidebar v-model="drawer" />

      <v-row class="perfil__container">
        <!-- Avatar, Nombre y Frase -->
        <v-col cols="12" md="6" class="left__panel">
          <div class="avatar-container">
            <v-avatar image="../src/images/user.png" size="120"></v-avatar>
          </div>

          <v-text-field class="nombre__perfil" label="Nombre" v-model="nombre" outlined dense></v-text-field>

          <v-autocomplete class="frase__perfil" label="¿Cuál es tu frase?" :items="estados" outlined dense></v-autocomplete>
        </v-col>

        <v-col cols="12" md="6" class="right__panel">
          <UserTab />
        </v-col>
      </v-row>
    </v-container>

    <Footer />

    <!--  Modal de Login Obligatorio -->
    <Login v-if="mostrarLogin" :mostrar="mostrarLogin" @cerrar="mostrarLogin = false" />
  </v-app>
</template>

<style lang="scss" scoped>
  .breadcrumbs {
    margin-left: 5%;
    margin-top: 6%;
  }

  .main-container {
    display: flex;
    gap: 20px;
    min-height: 100vh;
  }

  .perfil__container {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    width: 100%;
  }

  .left__panel {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 15px;
    width: 100%;

    .avatar-container {
      display: flex;
      align-items: center;
      margin-bottom: 10px;
    }

    .nombre__perfil {
      width: 40%;
    }

    .frase__perfil {
      width: 80%;
    }
  }

  .right__panel {
    display: flex;
    justify-content: center;
    width: 100%;
  }

  v-col.md-9 {
    min-height: 300px;
  }
</style>
