<script setup lang="ts">
    //imports
    import { ref } from "vue";
    import Header from "@/components/Header.vue";
    import Footer from "@/components/Footer.vue";
    import Sidebar from "@/components/Sidebar.vue";
    import MisCursos from "@/components/MisCursos.vue";

    // Variables
    const drawer = ref(false);
    const searchQuery = ref('');
    const items = ref([{ title: 'Mis Cursos', disabled: false },]);
</script>

<template>
    <v-app>
        <Header @toggle-sidebar="drawer = !drawer" />
        <!-- inicio breadcrumb -->
            <v-breadcrumbs class="breadcrumbs" :items="items">
            <template v-slot:prepend>
                <v-icon icon="$vuetify" size="small"></v-icon>
                </template>
            </v-breadcrumbs>
        <!-- fin breadcrumb -->
        <v-container class="main-container">
            <Sidebar v-model="drawer" />
            <div class="content">
                <MisCursos />
            </div>
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
  padding-top: 56px;
}

.content {
  margin-top: 0;
  flex: 1;
  padding: 15px;
  margin-left: 0;
}

/* ipad*/
@media (min-width: 576px) {
  .breadcrumbs {
    margin-left: 3%;
    margin-top: 5%;
  }

  .main-container {
    gap: 18px;
    padding-top: 60px;
  }

  .content {
    padding: 18px;
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
    padding-top: 64px;
  }

  .content {
    margin-top: -4%;
    padding: 20px;
    margin-left: 1%;
  }
}
</style>
