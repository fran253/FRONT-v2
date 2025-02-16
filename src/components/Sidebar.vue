<template>
  <v-navigation-drawer 
    v-model="drawer"
    :permanent="!isMobile"
    app
    class="sidebar"
  >
    <v-list>
      <v-list-item v-for="item in menuItems" :key="item.text" link :to="item.route">
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
{ text: "Cursos", route: "/cursos" },
{ text: "Mis Cursos", route: "/mis-cursos" },
{ text: "Configuración", route: "/configuracion" }
];
</script>

<style lang="scss" scoped>
.sidebar {
  width: 250px;
  background: #ffae6c;
  color: rgb(255, 255, 255);
  padding: 20px;
  min-height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  z-index: 1000;
  border-right: 3px solid #FF5500;
}

.v-list-item-title {
  color: rgb(255, 255, 255);
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