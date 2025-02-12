<script setup lang="ts">
import { defineProps } from "vue";
import { ref } from "vue";

        defineProps<{
            curso: { 
                nombre: string;
                imagen: string;
                descripcion: string;
            }        
        }>();
    const show = ref(false);
</script>

<template>
    <v-card class="mx-auto" max-width="344">
      <v-img height="200px" :src="curso.imagen" cover></v-img>
  
      <v-card-title>
        {{ curso.nombre }}
      </v-card-title>
  
      <v-card-subtitle>
        {{ curso.descripcion }}
      </v-card-subtitle>
  
      <v-card-actions>
        <v-btn color="orange-lighten-2" text="Explorar"></v-btn>
  
        <v-spacer></v-spacer>
  
        <v-btn :icon="show ? 'mdi-chevron-up' : 'mdi-chevron-down'" @click="show = !show"></v-btn>
      </v-card-actions>
  
      <v-expand-transition>
        <div v-show="show">
          <v-divider></v-divider>
  
          <v-card-text>
            Más información sobre el curso aquí.
          </v-card-text>
        </div>
      </v-expand-transition>
    </v-card>
</template>
