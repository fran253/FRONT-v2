<script setup lang="ts">
//imports
import { ref, computed, defineEmits } from "vue";
import { useDisplay } from "vuetify";
import { useUsuarioLogeadoStore } from "@/stores/UsuarioLogeado";


//MENU PUBLICO (Usuarios no logeados)
const menuPublico = [
  { text: "Inicio", route: "/", icon: "mdi-home" },
  { text: "Cursos", route: "/cursos", icon: "mdi-school" },
  { text: "Login", action: () => mostrarLogin(), icon: "mdi-login" }
];
//MENU PRIVADO (Usuarios logeados)
const menuPrivado = [
  { text: "Mis Cursos", route: "/mis-cursos", icon: "mdi-heart" },
  { text: "Perfil", route: "/perfil", icon: "mdi-account" }
];


//abrir y cerrar sidebar
const toggleSidebar = () => (isExpanded.value = false);
const expandSidebar = () => (isExpanded.value = true);

// llamar al login
const mostrarLogin = () => {
  localStorage.setItem('yaMostroLogin', 'true');
  emit("mostrar-login");
};


//variables
const emit = defineEmits(["mostrar-login"]);
const usuarioLogeadoStore = useUsuarioLogeadoStore();
const drawer = ref(true);
const isExpanded = ref(false);
const { mobile } = useDisplay();
const isMobile = computed(() => mobile.value);
const usuarioActual = computed(() => usuarioLogeadoStore.usuarioActual);
const estaAutenticado = computed(() => usuarioLogeadoStore.estaAutenticado);

</script>

<template>
  <v-navigation-drawer v-model="drawer" :width="isExpanded ? 250 : 80" :rail="!isExpanded" app class="sidebar">
    <v-list>
      <v-list-item
        :prepend-avatar="usuarioActual?.avatar || 'https://randomuser.me/api/portraits/women/85.jpg'"
        :subtitle="usuarioActual?.email || 'Invitado'"
        :title="usuarioActual?.nombre || 'Usuario'"
        @click="expandSidebar">
        
        <template v-slot:append>
          <v-btn
            v-if="isExpanded"
            icon
            variant="text"
            @click.stop="toggleSidebar">
            <v-icon>mdi-chevron-left</v-icon>
          </v-btn>
        </template>
      </v-list-item>
    </v-list>

    <v-divider class="border-opacity-100"></v-divider>

    <v-list density="compact" nav>
      <template v-for="(item, index) in menuPublico" :key="item.text">
        <v-list-item v-if="item.route" link :to="item.route" :prepend-icon="item.icon">
          <v-list-item-title v-if="isExpanded">{{ item.text }}</v-list-item-title>
        </v-list-item>
        
        <v-list-item v-else @click="item.action" :prepend-icon="item.icon">
          <v-list-item-title v-if="isExpanded">{{ item.text }}</v-list-item-title>
        </v-list-item>

        <v-divider class="border-opacity-100" :thickness="1" v-if="index < menuPublico.length - 1"></v-divider>
      </template>
    </v-list>

    <v-list v-if="estaAutenticado" density="compact" nav>
      <template v-for="(item, index) in menuPrivado" :key="item.text">
        <v-list-item link :to="item.route" :prepend-icon="item.icon">
          <v-list-item-title v-if="isExpanded">{{ item.text }}</v-list-item-title>
        </v-list-item>

        <v-divider class="border-opacity-100" :thickness="1" v-if="index < menuPrivado.length - 1"></v-divider>
      </template>
    </v-list>
  </v-navigation-drawer>

  <v-btn v-if="isMobile" icon @click="drawer = !drawer" class="menu-btn">
    <v-icon>mdi-menu</v-icon>
  </v-btn>
</template>

<style lang="scss" scoped>
  .sidebar {
    background: #ffffff;
    color: #ff7424;
    min-height: 100vh;
    border-right: 1.5px solid #ff7424;
    transition: width 0.3s ease;
    position: fixed;
  }

  .v-list-item {
    margin-top: 0.2%;
  }

  .v-list-item-title {
    color: #ff7424;
    font-weight: bold;
  }

  .menu-btn {
    position: fixed;
    top: 15px;
    left: 15px;
    z-index: 2000;
    background: white;
  }
</style>
