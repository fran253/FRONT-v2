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
            <v-breadcrumbs class="MisCursos__Breadcrumb" :items="items">
            <template v-slot:prepend>
                <v-icon icon="$vuetify" size="small"></v-icon>
                </template>
            </v-breadcrumbs>
        <!-- fin breadcrumb -->
        <v-container class="MisCursos__Contenedor">
            <Sidebar v-model="drawer" />
            <div class="MisCursos__Contenido">
                <MisCursos />
            </div>
        </v-container>
        <Footer />
    </v-app>
</template>

<style lang="scss" scoped>
.MisCursos__Breadcrumb {
  margin-left: 15px;
  margin-top: 50px;
}

.MisCursos__Contenedor {
  display: flex;
  flex-direction: column;
  gap: 15px;
  min-height: 100vh;
  padding-top: 56px;
}

.MisCursos__Contenido {
  margin-top: 0;
  flex: 1;
  padding: 15px;
  margin-left: 0;
}

/* ipad*/
@media (min-width: 576px) {
  .MisCursos__Breadcrumb {
    margin-left: 3%;
    margin-top: 5%;
  }

  .MisCursos__Contenedor {
    gap: 18px;
    padding-top: 60px;
  }

  .MisCursos__Contenido {
    padding: 18px;
  }
}

/* Ordenador */
@media (min-width: 768px) {
  .MisCursos__Breadcrumb {
    margin-left: 5%;
    margin-top: 6%;
  }

  .MisCursos__Contenedor {
    flex-direction: row;
    gap: 20px;
    padding-top: 64px;
  }

  .MisCursos__Contenido {
    margin-top: -4%;
    padding: 20px;
    margin-left: 1%;
  }
}
</style>
