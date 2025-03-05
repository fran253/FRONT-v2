<script setup lang="ts">
// Imports
import { ref } from "vue";
import { useUsuarioLogeadoStore } from "@/stores/UsuarioLogeado";
import { useRouter } from "vue-router";
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import HomeInfoSection from "@/components/HomeInfosection.vue";
import Login from "@/components/Login.vue";
import Carousel from "@/components/Carrusel.vue";
import logoImg from "@/assets/images/logo.png";

// Importar imágenes
import imgGradoMedio from "@/assets/images/Carrusel1.jpg";
import imgGradoSuperior from "@/assets/images/Carrusel2.jpg";
import imgGradoMedicina from "@/assets/images/Carrusel3.jpg";

// Logo
const logoSrc = logoImg;
const router = useRouter();
const usuarioLogeadoStore = useUsuarioLogeadoStore();
const mostrarLogin = ref(false);

// Datos para el carrusel
const slides = ref([
  {
    image: imgGradoMedio,
    title: "Encuentra tu Material de Estudio",
    text: "Descubre material de estudio ofrecido por otros estudiantes",
    showButton: false,
  },
  {
    image: imgGradoSuperior,
    title: "¡Empieza ya!",
    showButton: true,
  },
  {
    image: imgGradoMedicina,
    title: "Sube Archivos",
    text: "Comparte tus proyectos o descubrimientos con la comunidad",
    showButton: false,
  },
]);

// Función para manejar la entrada a cursos
const entrarACursos = () => {
  if (usuarioLogeadoStore.estaAutenticado) {
    router.push("/cursos");
  } else {
    mostrarLogin.value = true;
  }
};
</script>

<template>
  <v-app>
    <Header />

    <v-container class="HomePage__Contenedor">
      <!-- Logo  -->
      <div class="HomePage__LogoContenedor">
        <img :src="logoSrc" alt="Logo de AcademIQ" class="HomePage__Logo" />
      </div>

      <v-container class="HomePage__Contenido">
        <section class="HomePage__Seccion">
          <!-- carrusel -->
          <Carousel :slides="slides" @entrarCursos="entrarACursos" />

          <div class="HomePage__Divider">
            <!-- Stepper vuetify -->
            <v-stepper :items="['Paso 1', 'Paso 2', 'Paso 3', 'Paso 4']" class="HomePage__Stepper">
              <template v-slot:item.1>
                <v-card title="¡Elige tu CURSO!" flat class="HomePage__StepperCard">
                  <div class="HomePage__CardContent">
                    <v-icon icon="mdi-emoticon" size="x-large" color="orange-darken-3" class="HomePage__StepperIcon"></v-icon>
                  </div>
                </v-card>
              </template>

              <template v-slot:item.2>
                <v-card title="¡Accede a sus ASIGNATURAS!" flat class="HomePage__StepperCard">
                  <div class="HomePage__CardContent">
                    <v-icon icon="mdi-book-multiple" size="x-large" color="orange-darken-3" class="HomePage__StepperIcon"></v-icon>
                  </div>
                </v-card>
              </template>

              <template v-slot:item.3>
                <v-card title="¡Descubre todas sus UNIDADES!" flat class="HomePage__StepperCard">
                  <div class="HomePage__CardContent">
                    <v-icon icon="mdi-food-apple" size="x-large" color="orange-darken-3" class="HomePage__StepperIcon"></v-icon>
                  </div>
                </v-card>
              </template>

              <template v-slot:item.4>
                <v-card title="Realiza TEST y explora ARCHIVOS" flat class="HomePage__StepperCard">
                  <div class="HomePage__CardContent">
                    <v-icon icon="mdi-clipboard-check" size="x-large" color="orange-darken-3" class="HomePage__StepperIcon"></v-icon>
                  </div>
                </v-card>
              </template>
            </v-stepper>
          </div>
        </section>
      </v-container>
    </v-container>

    <HomeInfoSection />

    <Footer />

    <Login v-if="mostrarLogin" :mostrar="mostrarLogin" @cerrar="mostrarLogin = false" @login-exitoso="router.push('/cursos')" />
  </v-app>
</template>

<style lang="scss" scoped>
  /* Mobile first approach */
  .HomePage__Contenedor {
    display: flex;
    flex-direction: column;
    gap: 15px;
    min-height: 100vh;
    padding-top: 40px;
    padding-left: 0;
    padding-right: 0;
    max-width: 100%;
  }

  .HomePage__LogoContenedor {
    margin-top: 15%;
    display: flex;
    justify-content: center;
    padding: 10px 15px;
    margin-bottom: 15px;
  }

  .HomePage__Logo {
    max-width: 200px;
    height: auto;
  }

  .HomePage__Contenido {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100%;
    padding: 0;
    max-width: 100%;
  }

  .HomePage__Seccion {
    width: 100%;
  }

  .HomePage__Divider {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 30px;
    margin: 30px 15px;
    width: calc(100% - 30px);
  }

  .HomePage__Stepper {
    max-width: 100%;
    min-height: 200px;
    flex-grow: 1;
  }

  .HomePage__StepperCard {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: 0 10px;
  }

  .homepage__card-content {
    display: flex;
    justify-content: center;
    width: 100%;
    margin-top: 8px;
  }

  .HomePage__StepperIcon {
    margin: 0 auto;
    transform: scale(0.9);
  }

  /* Tablet (576px y superior) */
  @media (min-width: 576px) {
    .HomePage__Contenedor {
      gap: 18px;
      padding-top: 60px;
    }

    .HomePage__LogoContenedor {
      margin-top: 5%;
      margin-bottom: 20px;
    }

    .HomePage__Logo {
      max-width: 250px;
    }

    .HomePage__Divider {
      gap: 40px;
      margin: 40px 30px;
      width: calc(100% - 60px);
    }

    .HomePage__Stepper {
      min-height: 220px;
    }
  }

  /* Desktop (768px y superior) */
  @media (min-width: 768px) {
    .HomePage__Contenedor {
      padding-top: 70px;
    }

    .HomePage__LogoContenedor {
      margin-top: 1%;
      margin-bottom: 25px;
    }

    .HomePage__Logo {
      max-width: 300px;
    }

    .HomePage__Divider {
      flex-direction: row;
      gap: 50px;
      margin: 50px 5%;
      width: 90%;
    }

    .HomePage__Stepper {
      max-width: 600px;
      min-height: 250px;
    }

    .HomePage__StepperIcon {
      transform: scale(1);
    }

    .HomePage__CardContent {
      margin-top: 10px;
    }
  }

  /* Large Desktop (1200px y superior) */
  @media (min-width: 1200px) {
    .HomePage__Logo {
      margin-top: 2%;
      max-width: 350px;
    }
  }
</style>