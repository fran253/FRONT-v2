<template>
  <v-navigation-drawer
    v-model="drawer"
    :permanent="!isMobile"
    expand-on-hover
    rail
    app
    class="sidebar"
  >
    <!-- Avatar y usuario -->
    <v-list>
      <v-list-item
        prepend-avatar="https://randomuser.me/api/portraits/women/85.jpg"
        subtitle="sandra_a88@gmail.com"
        title="Sandra Adams"
      ></v-list-item>
    </v-list>

    <v-divider></v-divider>

    <!-- Menú de navegación -->
    <v-list density="compact" nav>
      <v-list-item
        v-for="item in menuItems"
        :key="item.text"
        link
        :to="item.route"
        :prepend-icon="item.icon"
      >
        <v-list-item-title>{{ item.text }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>

  <v-btn v-if="isMobile" icon @click="drawer = !drawer" class="menu-btn">
    <v-icon>mdi-menu</v-icon>
  </v-btn>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useDisplay } from 'vuetify';

const { mobile } = useDisplay();
const drawer = ref(!mobile.value);
const isMobile = computed(() => mobile.value);

const menuItems = [
  { text: "Cursos", route: "/cursos", icon: "mdi-school" },
  { text: "Mis Cursos", route: "/mis-cursos", icon: "mdi-book-open-variant" },
  { text: "Configuración", route: "/configuracion", icon: "mdi-cog" }
];
</script>

<style lang="scss" scoped>
.sidebar {
  background: #ffae6c;
  color: white;
  min-height: 100vh;
  position: fixed;
  left: 0;
  top:0;
  bottom: 0;
  z-index: 1000;
  border-right: 3px solid #FF5500;
}
.v-list-item{
  margin-top: 10%;

}
.v-list-item-title {
  color: white;
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
