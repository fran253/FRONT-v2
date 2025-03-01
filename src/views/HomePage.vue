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

    <v-container class="main-container">
      <v-container class="content">
        <section class="home-section">
          <Carrusel />

          <div class="divider-container" min-height="400">
            <!-- Stepper vuetify -->
            <v-stepper :items="['Paso 1', 'Paso 2', 'Paso 3', 'Paso 4']" class="stepper___home">
              <template v-slot:item.1>
                <v-card title="¡Elige tu CURSO!" flat class="step-card">
                  <div class="card-content">
                    <v-icon icon="mdi-emoticon" size="x-large" color="orange-darken-3" class="centered-icon"></v-icon>
                  </div>
                </v-card>
              </template>

              <template v-slot:item.2>
                <v-card title="¡Accede a sus ASIGNATURAS!" flat class="step-card">
                  <div class="card-content">
                    <v-icon icon="mdi-book-multiple" size="x-large" color="orange-darken-3" class="centered-icon"></v-icon>
                  </div>
                </v-card>
              </template>

              <template v-slot:item.3>
                <v-card title="¡Descubre todas sus UNIDADES!" flat class="step-card">
                  <div class="card-content">
                    <v-icon icon="mdi-food-apple" size="x-large" color="orange-darken-3" class="centered-icon"></v-icon>
                  </div>
                </v-card>
              </template>

              <template v-slot:item.4>
                <v-card title="Realiza TEST y explora ARCHIVOS" flat class="step-card">
                  <div class="card-content">
                    <v-icon icon="mdi-clipboard-check" size="x-large" color="orange-darken-3" class="centered-icon"></v-icon>
                  </div>
                </v-card>
              </template>
            </v-stepper>

            <v-divider class="border-opacity-100" color="warning" vertical></v-divider>

            <v-btn prepend-icon="$vuetify" variant="outlined" color="orange-darken-3" class="custom-button" size="x-large" to="/cursos">Entra a Cursos</v-btn>  

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
  .main-container {
    display: flex;
    flex-direction: column;
    gap: 15px;
    min-height: 100vh;
    padding-top: 60px;
  }

  .content {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100%;
    padding: 0 15px;
  }

  .divider-container {
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

  .stepper___home {
    max-width: 100%;
    min-height: 200px;
    flex-grow: 1;
  }

  .step-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: 0 10px;
  }

  .card-content {
    display: flex;
    justify-content: center;
    width: 100%;
    margin-top: 8px;
  }

  .centered-icon {
    margin: 0 auto;
    transform: scale(0.9);
  }

  .custom-button {
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
  .main-container {
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

  .stepper___home {
    min-height: 220px;
  }

  .custom-button {
    font-size: 1.1rem;
    padding: 13px 35px;
  }

  .large-image-section {
    margin-top: 50px;
  }
}

/* Ordenador */
@media (min-width: 768px) {
  .main-container {
    flex-direction: row;
    gap: 20px;
    padding-top: 5%;
  }

  .content {
    padding: 0;
  }

  .divider-container {
    flex-direction: row;
    gap: 50px;
    margin-top: 7%;
    margin-left: 5%;
    margin-right: 5%;
    width: 100%;
  }

  .stepper___home {
    max-width: 600px;
    min-height: 250px;
  }

  .centered-icon {
    transform: scale(1);
  }

  .custom-button {
    font-size: 1.2rem;
    padding: 15px 40px;
    width: auto;
  }

  .card-content {
    margin-top: 10px;
  }

  .large-image-section {
    margin-top: 60px;
    padding: 0;
  }
}
</style>