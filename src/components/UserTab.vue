<script setup>
  //imports
  import { ref } from 'vue';
  import MisCursos from '@/components/MisCursos.vue';

  const tab = ref("one");
</script>

<template>
    <v-card class="Usuario__Tab">
      <v-tabs v-model="tab" bg-color="primary">
        <v-tab value="one">Cursos</v-tab>
        <v-tab value="two">Comentarios</v-tab>
        <v-tab value="three">Lo que sea</v-tab>
      </v-tabs>
  
      <v-card-text>
        <v-tabs-window v-model="tab">
          <v-tabs-window-item value="one">
            <p>Tus Cursos</p>
            <MisCursos />
          </v-tabs-window-item>
  
          <v-tabs-window-item value="two">
            <p>Tus Comentarios</p>
          </v-tabs-window-item>
  
          <v-tabs-window-item value="three">
            <p>Algo</p>
          </v-tabs-window-item>
        </v-tabs-window>
      </v-card-text>
    </v-card>
</template>
  

  
<style lang="scss" scoped>
  .Usuario__Tab {
    margin-top: 20px;
    min-height: 80%;
    min-width: 100%;
  }
</style>
  