<script setup lang="ts">
  // Imports
  import { ref, computed } from "vue";
  import { useDisplay } from "vuetify";

  // estado del usuario 
  const usuarioAutenticado = ref(true);

  // sidebar abierto cerrado
  const drawer = ref(true);
  const isExpanded = ref(false);

  // Pantalla movil
  const { mobile } = useDisplay();
  const isMobile = computed(() => mobile.value);

  // menu para usuarios no logeados
  const menuPublico = [
    { text: "Cursos", route: "/cursos", icon: "mdi-home" },
    { text: "Info", route: "/info", icon: "mdi-information" }
  ];

  // menu para usuarios logeados
  const menuPrivado = [
    { text: "Mis Cursos", route: "/mis-cursos", icon: "mdi-heart" },
    { text: "Perfil", route: "/perfil", icon: "mdi-account" }
  ];

  // metodos para abrir o cerrar sidebar
  const toggleSidebar = () => (isExpanded.value = false);
  const expandSidebar = () => (isExpanded.value = true);
</script>


<template>
  <v-navigation-drawer v-model="drawer" :width="isExpanded ? 250 : 80" :rail="!isExpanded" app class="sidebar">
    <v-list>
      <v-list-item
        prepend-avatar="https://randomuser.me/api/portraits/women/85.jpg"
        subtitle="sandra_a88@gmail.com"
        title="Sandra Adams"
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

    <!-- menu sin sesion iniciada -->
    <v-list density="compact" nav>
      <template v-for="(item, index) in menuPublico" :key="item.text">
        <v-list-item link :to="item.route" :prepend-icon="item.icon">
          <v-list-item-title v-if="isExpanded">{{ item.text }}</v-list-item-title>
        </v-list-item>

        <v-divider class="border-opacity-100" :thickness="1" v-if="index < menuPublico.length - 1"></v-divider>
      </template>
    </v-list>

    <!-- menu con sesion inciadann -->
    <v-list density="compact" nav v-if="usuarioAutenticado">
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
