<script setup lang="ts">
//imports
import { ref } from "vue";
import img1 from "@/assets/images/GradoMedioInformatica.jpg";
import img2 from "@/assets/images/GradoSuperiorInformatica.jpg";
import img3 from "@/assets/images/GradoMedicina.jpg";

//imagenes en el carrusel
const slides = ref([img1, img2, img3]);
</script>

<template>
    <v-container class="Carrusel__Contenedor">

      <v-carousel class="Carrusel__Contenedor__FullWidth" height="600" progress="primary" hide-delimiters>

            <v-carousel-item v-for="(slide, i) in slides" :key="i">

                <v-sheet height="100%">

                    <div class="d-flex fill-height justify-center align-center">
                    <v-img :src="slide" height="100%" cover></v-img>
                    </div>
                    
                </v-sheet>

            </v-carousel-item>

      </v-carousel>

    </v-container>
  </template>
  

  
  <style lang="scss" scoped>
    .Carrusel__Contenedor {
      width: 100%;
      margin: 0 auto;
      min-width: 100%;
    }
    
    .Carrusel__Contenedor__FullWidth {
      width: 100%;
      max-width: 100%;
    }
  
    /* ipad */
    @media only screen and (min-width: 768px) {
      .Carrusel__Contenedor {
        min-width: 100%;
      }
    }
  
    /* ordenador */
    @media only screen and (min-width: 1024px) {
      .Carrusel__Contenedor {
        min-width: 100%;
      }
    }
  
  </style>
  