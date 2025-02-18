<script setup lang="ts">
import { defineProps } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const props = defineProps<{ 
    temario: { 
        id: number;
        titulo: string;
        subtitulo: string;
        descripcion: string;
        imagen: string;
    } 
}>();

const seleccionarTemario = () => {
    router.push(`/temarios/${props.temario.id}`);
};
</script>

<template>
  <v-card class="mx-auto" max-width="500" @click="seleccionarTemario">
    <v-container fluid>
      <v-row dense>
        <v-col cols="12">
          <v-card>
            <v-img
              :src="temario.imagen"
              class="align-end"
              gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
              height="200px"
              cover
            >
              <v-card-title class="text-white">{{ temario.titulo }}</v-card-title>
            </v-img>

            <v-card-actions>
              <v-spacer></v-spacer>

              <v-btn color="medium-emphasis" icon="mdi-heart" size="small"></v-btn>
              <v-btn color="medium-emphasis" icon="mdi-bookmark" size="small"></v-btn>
              <v-btn color="medium-emphasis" icon="mdi-share-variant" size="small"></v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>