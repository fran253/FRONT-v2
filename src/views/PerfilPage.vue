<template>
  <v-app>
    <!-- Encabezado -->
    <Header @toggle-sidebar="drawer = !drawer" />

    <v-container class="main-container">
      <!-- Sidebar -->
      <Sidebar v-model="drawer" />

      <div class="content">
        <v-container>
          <v-row>
            <!-- Avatar, Nombre y Frase Celebre -->
            <v-col cols="12" md="6" class="left-panel">
              <div class="avatar-container">
                <v-avatar image="smirk.png" size="120"></v-avatar>
              </div>

              <v-text-field label="Nombre" size="20" v-model="nombre" outlined dense></v-text-field>

              <v-autocomplete label="¿Cuál es tu frase?" :items="estados" size="50" outlined dense></v-autocomplete>
            </v-col>

            <!-- UserTab -->
            <v-col cols="20" md="4">
              <UserTab />
            </v-col>
          </v-row>
        </v-container>
      </div>
    </v-container>

    <!-- Pie de Página -->
    <Footer />
  </v-app>
</template>

<script setup>
import { ref } from 'vue';
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';
import Sidebar from '@/components/Sidebar.vue';
import UserTab from '@/components/UserTab.vue';

const drawer = ref(false);
const nombre = ref("Sandra Adams");
const estados = [
  "Me encanta Estudiar",
  "Soy una persona aplicada",
  "Vivan las Mates!",
  "La historia mola",
  "Fan de literatura",
  "Alumno sin igual"
];
</script>

<style lang="scss" scoped>
.main-container {
  display: flex;
  gap: 20px;
  min-height: 100vh;
  padding-top: 64px;
}

.content {
  flex: 1;
  padding: 20px;
}

.left-panel {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
}

.avatar-container {
  display: flex;
  width: 100%;
  margin-bottom: 10px;
}

v-col.md-9 {
  min-height: 300px;
}
</style>
