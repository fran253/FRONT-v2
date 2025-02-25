<script setup lang="ts">
    //imports
    import { ref, onMounted } from "vue";
    import CardCurso from "@/components/CardCurso.vue";

    const misCursos = ref([]);

    //fetch mis cursos
    const fetchMisCursos = () => {
        const storedCursos = localStorage.getItem("misCursos");
        if (storedCursos) {
            misCursos.value = JSON.parse(storedCursos);
        }
    };

    onMounted(fetchMisCursos);
</script>

<template>
    <v-container class="cursos-container">
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
</template>

<style lang="scss" scoped>
    .cursos-container {
        padding: 20px;
    }
</style>
