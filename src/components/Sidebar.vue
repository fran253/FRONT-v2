<template>
  <v-navigation-drawer
    v-model="drawer"
    :width="isExpanded ? 250 : 80"
    :rail="!isExpanded"
    app
    class="sidebar"
  >
    <!-- Avatar y usuario -->
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
    <!-- end Avatar y usuario -->

    <v-divider></v-divider>

    <!-- Opciones -->
    <v-list density="compact" nav>
      <v-list-item
        v-for="item in menuItems"
        :key="item.text"
        link
        :to="item.route"
        :prepend-icon="item.icon">

        <v-list-item-title v-if="isExpanded">{{ item.text }}</v-list-item-title>
      </v-list-item>
    </v-list>
    <!-- end Opciones -->

  </v-navigation-drawer>

  <v-btn v-if="isMobile" icon @click="drawer = !drawer" class="menu-btn">
    <v-icon>mdi-menu</v-icon>
  </v-btn>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useDisplay } from 'vuetify';

const { mobile } = useDisplay();
const drawer = ref(true);
const isExpanded = ref(false);
const isMobile = computed(() => mobile.value);

const menuItems = [
  { text: "Cursos", route: "/cursos", icon: "md:home" },
  { text: "Mis Cursos", route: "/mis-cursos", icon: "md:folder_open" },
  { text: "Configuración", route: "/configuracion", icon: "md:home" }
];

const toggleSidebar = () => {
  isExpanded.value = !isExpanded.value;
};

const expandSidebar = () => {
  isExpanded.value = true; // Solo expande el sidebar, no lo cierra si ya está abierto
};
</script>

<style lang="scss" scoped>
.sidebar {
  background: #FF5500;
  color: white;
  min-height: 100vh;
  border-right: 3px solid #ffae6c;
  transition: width 0.3s ease;
}

.v-list-item {
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
