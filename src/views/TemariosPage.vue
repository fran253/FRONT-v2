<script setup lang="ts">
import { ref, watchEffect } from "vue";
import { useRoute } from "vue-router";
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import Sidebar from "@/components/Sidebar.vue";
import CardTemario from "@/components/CardTemario.vue";

const route = useRoute();
const drawer = ref(false);
const idAsignatura = ref("");

const items = ref([
  { title: 'Cursos', disabled: false, href: '/cursos' },
  { title: 'Asignaturas', disabled: false },
  { title: 'Temarios', disabled: true },
]);


watchEffect(() => {
    idAsignatura.value = route.params.idAsignatura as string;
});

const temarios = ref([
  { id: 1, asignaturaId: 1, titulo: "Álgebra", subtitulo: "Unidad 1", descripcion: "Ecuaciones y polinomios", imagen: "https://cdn.vuetifyjs.com/images/cards/docks.jpg" },
  { id: 2, asignaturaId: 1, titulo: "Historia Antigua", subtitulo: "Unidad 2", descripcion: "Egipto y Mesopotamia", imagen: "https://cdn.vuetifyjs.com/images/cards/sunshine.jpg" },
  { id: 3, asignaturaId: 2, titulo: "Cinemática", subtitulo: "Unidad 3", descripcion: "Movimiento y velocidad", imagen: "https://cdn.vuetifyjs.com/images/cards/road.jpg" }
]);

const temariosFiltrados = ref([]);

watchEffect(() => {
    console.log("🔎 Filtrando temarios para asignatura ID:", idAsignatura.value);
    temariosFiltrados.value = temarios.value.filter(t => t.asignaturaId === Number(idAsignatura.value));
});
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
                <v-container class="temarios-container">
                    <v-row align="start" justify="start">
                        <v-col v-for="temario in temariosFiltrados" :key="temario.id" cols="12" sm="6" md="4" lg="3">
                            <CardTemario :temario="temario" />
                        </v-col>
                    </v-row>
                </v-container>
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

.content {
  margin-top: -4%;
  flex: 1;
  padding: 20px;
  margin-left: 1%;
}

.main-container {
    display: flex;
    gap: 20px;
    min-height: 100vh;
    padding-top: 64px;
}


.temarios-container {
    padding: 20px;
}

@media (max-width: 768px) {
    .content {
        margin-left: 0;
    }
}
</style>
