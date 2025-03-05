<script setup lang="ts">
// Importar Vue
import { defineProps, defineEmits } from 'vue';

// Definir propiedades
const props = defineProps({
  slides: {
    type: Array,
    required: true
  }
});

// Definir eventos que emitiremos
const emit = defineEmits(['entrarCursos']);

// Función para manejar el clic en el botón
const handleEntrarCursos = () => {
  emit('entrarCursos');
};
</script>

<template>
  <div class="Carrusel__Home">
    <v-carousel class="Carrusel__Componente" height="600" progress="primary" hide-delimiters>
      <v-carousel-item v-for="(slide, i) in slides" :key="i">
        <v-sheet height="100%">
          <div class="d-flex fill-height justify-center align-center">
            <v-img :src="slide.image" height="100%" cover>
              <div class="Carrusel__Contenido">
                <h2 class="Carrusel__Titulo">{{ slide.title }}</h2>
                <p v-if="slide.text" class="Carrusel__Texto">{{ slide.text }}</p>
                <v-btn 
                  v-if="slide.showButton" 
                  variant="outlined" 
                  color="white" 
                  class="Boton__Cursos" 
                  size="x-large" 
                  @click="handleEntrarCursos"
                >
                  Entra a Cursos
                </v-btn>
              </div>
            </v-img>
          </div>
        </v-sheet>
      </v-carousel-item>
    </v-carousel>
  </div>
</template>

<style lang="scss" scoped>
.Carrusel__Home {
  width: 100%;
  margin-bottom: 20px;
}

.Carrusel__Componente {
  width: 100%;
}

.Carrusel__Contenido {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 20px;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.Carrusel__Titulo {
  font-size: 1.5rem;
  margin-bottom: 8px;
  text-align: center;
}

.Carrusel__Texto {
  font-size: 1rem;
  margin-bottom: 16px;
  text-align: center;
}

.Boton__Cursos {
  border-color: #FFFFFF;
  color: #FFFFFF;
  font-size: 1rem;
  width: 100%;
  max-width: 250px;
  margin-top: 10px;
}

/* Tablet (576px y superior) */
@media (min-width: 576px) {
  .Carrusel__Titulo {
    font-size: 1.8rem;
  }

  .Carrusel__Texto {
    font-size: 1.2rem;
  }

  .Boton__Cursos {
    font-size: 1.1rem;
    padding: 13px 35px;
  }
}

/* Desktop (768px y superior) */
@media (min-width: 768px) {
  .Boton__Cursos {
    font-size: 1.2rem;
    width: auto;
  }

  .Carrusel__Contenido {
    padding: 30px;
  }

  .Carrusel__Titulo {
    font-size: 2rem;
  }

  .Carrusel__Texto {
    font-size: 1.4rem;
    max-width: 70%;
    margin-bottom: 20px;
  }
}

/* Large Desktop (1200px y superior) */
@media (min-width: 1200px) {
  .Carrusel__Componente {
    max-height: 700px;
  }

  .Carrusel__Contenido {
    padding: 40px;
  }

  .Carrusel__Titulo {
    font-size: 2.5rem;
  }

  .Carrusel__Texto {
    font-size: 1.6rem;
    max-width: 60%;
  }

  .Boton__Cursos {
    font-size: 1.3rem;
  }
}
</style>