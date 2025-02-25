<script setup lang="ts">
  //imports
  import { ref } from "vue";
  import Header from "@/components/Header.vue";
  import Sidebar from "@/components/Sidebar.vue";
  import Footer from "@/components/Footer.vue";

  // Variables
  const sheet = ref(false);
  const dialog = ref(false);

  const likes = ref<{ id: number; top: string; left: string }[]>([]);

  //cosa aniamcion
  const generarLikes = () => {
    likes.value = Array.from({ length: 6 }, (_, i) => ({
      id: i,
      top: `${Math.random() * 80 + 10}%`,
      left: `${Math.random() * 80 + 10}%`,
    }));

    setTimeout(generarLikes, 2000);
  };

  generarLikes();
</script>

<template>
  <v-app>
    <Header />

    <v-container class="main-container">
      <Sidebar />

      <v-container class="content">
        <section class="info-section">
          <div class="info-card">
            <h3>Plataforma de aprendizaje</h3>
            <p>Facilitamos el acceso a cursos tanto básicos como complejos.</p>
          </div>

          <div class="info-group">
            <div class="info-card">
              <h3>Inicia sesión en AcademIQ</h3>
              <p>Inicia sesión y accede a muchas ventajas, como guardar cursos y seguir maestros...</p>
            </div>
            <v-dialog v-model="dialog" max-width="500">
              <template v-slot:activator="{ props: activatorProps }">
                <div class="btn-container">
                  <v-btn v-bind="activatorProps" color="orange-darken-3" size="x-large" class="circular-btn" icon>
                    <v-icon>mdi-information</v-icon>
                  </v-btn>
                </div>
              </template>

              <v-card title="Más información">
                <v-card-text>
                  Aquí puedes encontrar y compartir apuntes, resúmenes y ejercicios con otros estudiantes.
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn text="Cerrar" @click="dialog = false"></v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </div>

          <!-- Imagen del usuario con los likes animados -->
          <div class="user-container">
            <img src="../images/user_icono.png" class="user-image" alt="Usuario" />

            <transition-group name="fade">
              <img
                v-for="like in likes"
                :key="like.id"
                src="../images/like_naranja.png"
                class="like-icon"
                :style="{ top: like.top, left: like.left }"
                alt="Like"
              />
            </transition-group>
          </div>

          <!-- Tercer recuadro con redes sociales -->
          <div class="info-group">
            <div class="info-card">
              <h3>Síguenos en nuestras redes sociales</h3>
              <p>Puedes encontrarnos en internet, comparte nuestra página e invita a tus amigos.</p>
            </div>
            <v-bottom-sheet v-model="sheet">
              <template v-slot:activator="{ props }">
                <div class="btn-container">
                  <v-btn v-bind="props" color="orange-darken-3" size="x-large" class="circular-btn" icon>
                    <v-icon>mdi-plus</v-icon>
                  </v-btn>
                </div>
              </template>

              <v-list>
                <v-list-subheader>Nuestras redes sociales</v-list-subheader>
                <v-list-item v-for="(tile, index) in ['Instagram', 'Facebook', 'Youtube']" :key="index" :title="tile" />
              </v-list>
            </v-bottom-sheet>
          </div>
        </section>
      </v-container>
    </v-container>

    <Footer />
  </v-app>
</template>

<style lang="scss" scoped>
  .main-container {
    display: flex;
    gap: 20px;
    min-height: 100vh;
    padding-top: 64px;
  }

  .content {
    flex: 1;
    display: flex;
    justify-content: center;
  }

  .info-section {
    display: flex;
    flex-direction: column;
    gap: 50px;
    margin-top: 70px;
    align-items: center;
  }

  .info-group {
    display: flex;
    align-items: center;
    gap: 20px;
  }

  .info-card {
    background: white;
    padding: 25px;
    border-radius: 10px;
    box-shadow: 0 3px 8px rgba(0, 0, 0, 0.1);
    color: #333;
    text-align: center;
    width: 900px;
  }

  .info-card:nth-child(1) {
    background-color: #FF5500;
    color: white;
  }

  .info-card:nth-child(2) {
    background-color: #FB7C3C;
    color: white;
  }

  .info-card:nth-child(3) {
    background-color: #F7A277;
    color: white;
  }

  .user-container {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 200px;
    height: 200px;
    margin: 40px 0;
  }

  .user-image {
    width: 100%;
    height: auto;
  }

  .like-icon {
    position: absolute;
    width: 30px;
    opacity: 0;
    animation: fade-in-out 2s infinite;
  }

  @keyframes fade-in-out {
    0% { opacity: 0; transform: scale(0.8); }
    50% { opacity: 1; transform: scale(1); }
    100% { opacity: 0; transform: scale(1.2); }
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity 0.5s;
  }

  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
</style>
