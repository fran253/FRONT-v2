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

    .breadcrumbs{
        margin-left:5% ;
        margin-top: 6%;
    }
    .main-container {
        display: flex;
        gap: 20px;
        min-height: 100vh;
        padding-top: 64px;
    }

    .content {
    margin-top: -4%;
    flex: 1;
    padding: 20px;
    margin-left: 1%;
    }

    @media (max-width: 768px) {
        .content {
            margin-left: 0;
        }
    }
</style>
