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

     </v-app>
</template>

<style lang="scss" scoped>
  .breadcrumbs {
    margin-left: 15px;
    margin-top: 50px;
  }

  .main-container {
    display: flex;
    flex-direction: column;
    gap: 15px;
    min-height: 100vh;
    padding: 0 15px;
  }

  .perfil__container {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    gap: 30px;
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
      width: 80%;
      text-align: center;
    }

    .frase__perfil {
      width: 100%;
      text-align: center;
    }
  }

  .right__panel {
    display: flex;
    justify-content: center;
    width: 100%;
  }

  v-col.md-9 {
    min-height: 200px;
  }

/* ipad */
@media (min-width: 576px) {
  .breadcrumbs {
    margin-left: 3%;
    margin-top: 5%;
  }

  .main-container {
    gap: 18px;
    padding: 0 20px;
  }

  .left__panel {
    .nombre__perfil {
      width: 60%;
    }

    .frase__perfil {
      width: 90%;
    }
  }

  v-col.md-9 {
    min-height: 250px;
  }
}

/* Ordenador */
@media (min-width: 768px) {
  .breadcrumbs {
    margin-left: 5%;
    margin-top: 6%;
  }

  .main-container {
    flex-direction: row;
    gap: 20px;
    padding: 0;
  }

  .perfil__container {
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
  }

  .left__panel {
    .nombre__perfil {
      width: 40%;
      text-align: left;
    }

    .frase__perfil {
      width: 80%;
      text-align: left;
    }
  }

  v-col.md-9 {
    min-height: 300px;
  }
}
</style>