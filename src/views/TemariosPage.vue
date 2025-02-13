<script setup lang="ts">
    import { ref } from "vue";
    import CardTemario from "@/components/CardTemario.vue";



    interface Temario {
        id: number;
        titulo: string;
        subtitulo: string;
        descripcion: string;
        imagen: string;
    }

    const temarios = ref<Temario[]>([
        { id: 1, titulo: "Álgebra", subtitulo: "Unidad 1", descripcion: "Ecuaciones y polinomios", imagen: "https://cdn.vuetifyjs.com/images/cards/docks.jpg" },
        { id: 2, titulo: "Historia Antigua", subtitulo: "Unidad 2", descripcion: "Egipto y Mesopotamia", imagen: "https://cdn.vuetifyjs.com/images/cards/sunshine.jpg" },
        { id: 3, titulo: "Cinemática", subtitulo: "Unidad 3", descripcion: "Movimiento y velocidad", imagen: "https://cdn.vuetifyjs.com/images/cards/road.jpg" },
    ]);
</script>

  
<template>
    <Header />
    <v-container>
        <h1 class="text-center mb-4">Temarios</h1>
        <v-row>
            <v-col v-for="temario in temarios" :key="temario.id" cols="12" md="4">
                <CardTemario :temario="temario" />
            </v-col>
        </v-row>
    </v-container>
    <Footer />
</template>