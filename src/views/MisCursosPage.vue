<script setup lang="ts">
import { ref, onMounted } from "vue";
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import Sidebar from "@/components/Sidebar.vue";
import CardCurso from "@/components/CardCurso.vue";

const drawer = ref(false);
const misCursos = ref([]);

const fetchMisCursos = () => {
    const storedCursos = localStorage.getItem("misCursos");
    if (storedCursos) {
        misCursos.value = JSON.parse(storedCursos);
    }
};

onMounted(fetchMisCursos);
</script>

<template>
    <v-app>
        <Header @toggle-sidebar="drawer = !drawer" />
        <v-container class="main-container">
            <Sidebar v-model="drawer" />
            <div class="content">
                <v-container class="cursos-container">
                    <h1 class="text-center mb-4">Mis Cursos</h1>
                    <v-row align="start" justify="start">
                        <v-col v-for="curso in misCursos" :key="curso.id" cols="12" sm="6" md="4" lg="3">
                            <CardCurso 
                                :id="curso.id"
                                :titulo="curso.titulo"
                                :subtitulo="curso.subtitulo"
                                :descripcion="curso.descripcion"
                                :imagen="curso.imagen"
                            />
                        </v-col>
                    </v-row>
                </v-container>
            </div>
        </v-container>
        <Footer />
    </v-app>
</template>

<style lang="scss" scoped>
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

.cursos-container {
    padding: 20px;
}

@media (max-width: 768px) {
    .content {
        margin-left: 0;
    }
}
</style>