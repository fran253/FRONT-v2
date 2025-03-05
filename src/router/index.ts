import { createRouter, createWebHistory } from "vue-router";
// import HomeView from "@/views/HomePage.vue";
import AsignaturasPage from "@/views/AsignaturasPage.vue";
import TemariosPage from "@/views/TemariosPage.vue";
import CursosPage from "@/views/CursosPage.vue";
import PerfilPage from "@/views/PerfilPage.vue";
import MisCursosPage from "@/views/MisCursosPage.vue";
import MisArchivosPage from "@/views/MisArchivosPage.vue";
import ArchivosyTestPage from "@/views/ArchivosyTestPage.vue";
import HomePage from "@/views/HomePage.vue";

const routes = [
  { path: "/", component: HomePage },
  { path: "/asignaturas/:idCurso", component: AsignaturasPage, props: true },
  { path: "/temarios/:idAsignatura", component: TemariosPage, props: true },
  { path: "/temarios/:idTemario/archivos-test", component: ArchivosyTestPage, props: true },
  { path: "/cursos", component: CursosPage },
  { path: "/perfil", component: PerfilPage },
  { path: "/mis-cursos", component: MisCursosPage },
  { path: "/mis-archivos", component: MisArchivosPage },

];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
