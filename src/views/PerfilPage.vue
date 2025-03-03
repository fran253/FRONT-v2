<script setup>
  //imports
  import { ref, watch, computed } from 'vue';
  import Header from '@/components/Header.vue';
  import Footer from '@/components/Footer.vue';
  import Sidebar from '@/components/Sidebar.vue';
  import UserTab from '@/components/UserTab.vue';
  import Login from '@/components/Login.vue';
  import { useUsuarioLogeadoStore } from "@/stores/UsuarioLogeado";

  // Store de usuario
  const usuarioLogeadoStore = useUsuarioLogeadoStore();

  // Variables
  const drawer = ref(false);
  const items = ref([{ title: 'Perfil', disabled: false }]);

  // Obtener el usuario actual del store
  const usuarioActual = computed(() => usuarioLogeadoStore.usuarioActual);
  
  // Utilizar el nombre del usuario logueado o un valor por defecto
  const nombre = computed({
    get: () => usuarioActual.value?.nombre || "Usuario",
    set: (value) => {
    }
  });
  
  // Verificar si hay un usuario en el localStorage al cargar la página
  const checkUsuarioLocal = () => {
    const usuarioGuardado = localStorage.getItem('usuario');
    if (usuarioGuardado && !usuarioActual.value) {
      try {
        usuarioLogeadoStore.usuarioActual = JSON.parse(usuarioGuardado);
        usuarioLogeadoStore.estaAutenticado = true;
      } catch (error) {
        console.error(error);
      }
    }
  };
  
  // Ejecutar al cargar el componente
  checkUsuarioLocal();

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
    <v-breadcrumbs class="PerfilPage__Breadcrumb" :items="items">
      <template v-slot:prepend>
        <v-icon icon="$vuetify" size="small"></v-icon>
      </template>
    </v-breadcrumbs>

    <v-container class="PerfilPage__Contenedor">
      <Sidebar v-model="drawer" />

      <v-row class="perfil__container">
        <!-- Avatar, Nombre y Frase -->
        <v-col cols="12" md="6" class="PerfilPage__ZonaIzquierda">
          <div class="PerfilPage__ZonaIzquierda__Avatar">
            <v-avatar :image="usuarioActual?.avatar || '../src/images/user.png'" size="120"></v-avatar>
          </div>

          <v-text-field 
            class="PerfilPage__ZonaIzquierda__Nombre" 
            label="Nombre" 
            v-model="nombre" 
            outlined 
            dense
            :readonly="true"
          ></v-text-field>
          
          <v-text-field
            v-if="usuarioActual"
            class="PerfilPage__ZonaIzquierda__Email"
            label="Email"
            :model-value="usuarioActual.email"
            outlined
            dense
            readonly
          ></v-text-field>

          <v-autocomplete class="PerfilPage__ZonaIzquierda__Frase" label="¿Cuál es tu frase?" :items="estados" outlined dense></v-autocomplete>
        </v-col>

        <v-col cols="12" md="6" class="PerfilPage__ZonaDerecha">
          <UserTab />
        </v-col>
      </v-row>
    </v-container>

    <Footer />

  </v-app>
</template>

<style lang="scss" scoped>
  .PerfilPage__Breadcrumb {
    margin-left: 15px;
    margin-top: 50px;
  }

  .PerfilPage__Contenedor {
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

  .PerfilPage__ZonaIzquierda {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 15px;
    width: 100%;

    .PerfilPage__ZonaIzquierda__Avatar {
      display: flex;
      align-items: center;
      margin-bottom: 10px;
    }

    .PerfilPage__ZonaIzquierda__Nombre {
      width: 80%;
      text-align: center;
    }

    .PerfilPage__ZonaIzquierda__Frase {
      width: 100%;
      text-align: center;
    }
  }

  .PerfilPage__ZonaDerecha {
    display: flex;
    justify-content: center;
    width: 100%;
  }

  v-col.md-9 {
    min-height: 200px;
  }

/* ipad */
@media (min-width: 576px) {
  .PerfilPage__Breadcrumb {
    margin-left: 3%;
    margin-top: 5%;
  }

  .PerfilPage__Contenedor {
    gap: 18px;
    padding: 0 20px;
  }

  .PerfilPage__ZonaIzquierda {
    .PerfilPage__ZonaIzquierda__Nombre {
      width: 60%;
    }

    .PerfilPage__ZonaIzquierda__Frase {
      width: 90%;
    }
  }

  v-col.md-9 {
    min-height: 250px;
  }
}

/* Ordenador */
@media (min-width: 768px) {
  .PerfilPage__Breadcrumb {
    margin-left: 5%;
    margin-top: 6%;
  }

  .PerfilPage__Contenedor {
    flex-direction: row;
    gap: 20px;
    padding: 0;
  }

  .perfil__container {
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
  }

  .PerfilPage__ZonaIzquierda {
    .PerfilPage__ZonaIzquierda__Nombre {
      width: 40%;
      text-align: left;
    }

    .PerfilPage__ZonaIzquierda__Frase {
      width: 80%;
      text-align: left;
    }
  }

  v-col.md-9 {
    min-height: 300px;
  }
}
</style>