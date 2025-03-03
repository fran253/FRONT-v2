<script setup lang="ts">
// Imports
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import Carrusel from "@/components/Carrusel.vue";
import AvatarRiendo from '@/components/AvatarEmote.vue';
import HomeInfoSection from "@/components/HomeInfosection.vue";
</script>

<template>
  <v-app>
    <Header />

    <v-container class="HomePage__Contenedor">
      <v-container class="HomePage__Contenido">
        <section class="home-section">
          <Carrusel />

          <div class="HomePage__divider" min-height="400">
            <!-- Stepper vuetify -->
            <v-stepper :items="['Paso 1', 'Paso 2', 'Paso 3', 'Paso 4']" class="HomePage__Stepper">
              <template v-slot:item.1>
                <v-card title="¡Elige tu CURSO!" flat class="HomePage__CardStepper">
                  <div class="HomePage__ContenidoCard">
                    <v-icon icon="mdi-emoticon" size="x-large" color="orange-darken-3" class="HomePage__IconStepper"></v-icon>
                  </div>
                </v-card>
              </template>

              <template v-slot:item.2>
                <v-card title="¡Accede a sus ASIGNATURAS!" flat class="HomePage__CardStepper">
                  <div class="HomePage__ContenidoCard">
                    <v-icon icon="mdi-book-multiple" size="x-large" color="orange-darken-3" class="HomePage__IconStepper"></v-icon>
                  </div>
                </v-card>
              </template>

              <template v-slot:item.3>
                <v-card title="¡Descubre todas sus UNIDADES!" flat class="HomePage__CardStepper">
                  <div class="HomePage__ContenidoCard">
                    <v-icon icon="mdi-food-apple" size="x-large" color="orange-darken-3" class="HomePage__IconStepper"></v-icon>
                  </div>
                </v-card>
              </template>

              <template v-slot:item.4>
                <v-card title="Realiza TEST y explora ARCHIVOS" flat class="HomePage__CardStepper">
                  <div class="HomePage__ContenidoCard">
                    <v-icon icon="mdi-clipboard-check" size="x-large" color="orange-darken-3" class="HomePage__IconStepper"></v-icon>
                  </div>
                </v-card>
              </template>
            </v-stepper>

            <v-divider class="border-opacity-100" color="warning" vertical></v-divider>

            <v-btn prepend-icon="$vuetify" variant="outlined" color="orange-darken-3" class="HomePage__BotonCursos" size="x-large" to="/cursos">Entra a Cursos</v-btn>  

            <v-divider class="border-opacity-100" color="warning" vertical></v-divider>
            <AvatarRiendo />
          </div>
        </section>
      </v-container>
    </v-container>

    <!-- Incluir el nuevo componente aquí -->
    <HomeInfoSection />

    

    <Footer />
  </v-app>
</template>


<style lang="scss" scoped>
  .HomePage__Contenedor {
    display: flex;
    flex-direction: column;
    gap: 15px;
    min-height: 100vh;
    padding-top: 60px;
  }

  .HomePage__Contenido {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100%;
    padding: 0 15px;
  }

  .HomePage__divider {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 30px;
    margin-top: 40px;
    margin-left: 15px;
    margin-right: 15px;
    width: calc(100% - 30px);
  }

  .HomePage__Stepper {
    max-width: 100%;
    min-height: 200px;
    flex-grow: 1;
  }

  .HomePage__CardStepper {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: 0 10px;
  }

  .HomePage__ContenidoCard {
    display: flex;
    justify-content: center;
    width: 100%;
    margin-top: 8px;
  }

  .HomePage__IconStepper {
    margin: 0 auto;
    transform: scale(0.9);
  }

  .HomePage__BotonCursos {
    border-color: #FF5500;
    color: #FF5500;
    font-size: 1rem;
    padding: 12px 30px;
    width: 100%;
    max-width: 250px;
  }

  .large-image-section {
    margin-top: 40px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 15px;
  }

/* ipad*/
@media (min-width: 576px) {
  .HomePage__Contenedor {
    gap: 18px;
    padding-top: 70px;
  }

  .divider-container {
    gap: 40px;
    margin-top: 50px;
    margin-left: 30px;
    margin-right: 30px;
    width: calc(100% - 60px);
  }

  .HomePage__Stepper {
    min-height: 220px;
  }

  .HomePage__BotonCursos {
    font-size: 1.1rem;
    padding: 13px 35px;
  }

  .large-image-section {
    margin-top: 50px;
  }
}

/* Ordenador */
@media (min-width: 768px) {
  .HomePage__Contenedor {
    flex-direction: row;
    gap: 20px;
    padding-top: 5%;
  }

  .HomePage__Contenido {
    padding: 0;
  }

  .HomePage__divider {
    flex-direction: row;
    gap: 50px;
    margin-top: 7%;
    margin-left: 5%;
    margin-right: 5%;
    width: 100%;
  }

  .HomePage__Stepper {
    max-width: 600px;
    min-height: 250px;
  }

  .HomePage__IconStepper {
    transform: scale(1);
  }

  .HomePage__BotonCursos {
    font-size: 1.2rem;
    padding: 15px 40px;
    width: auto;
  }

  .HomePage__ContenidoCard {
    margin-top: 10px;
  }

  .large-image-section {
    margin-top: 60px;
    padding: 0;
  }
}
</style>