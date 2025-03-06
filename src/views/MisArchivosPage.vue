<script setup lang="ts">
    //imports
    import { ref } from "vue";
    import Header from "@/components/Header.vue";
    import Footer from "@/components/Footer.vue";
    import Sidebar from "@/components/Sidebar.vue";
    import MisArchivos from "@/components/MisArchivos.vue";

    // Variables
    const drawer = ref(false);
    const searchQuery = ref('');
    const items = ref([{ title: 'Mis Archivos', disabled: false },]);
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
                <MisArchivos />
            </div>
        </v-container>
        <Footer />
    </v-app>
</template>

<style lang="scss" scoped>
@import "@/assets/sass/pages/MisCursos.scss";
</style>
