import { createRouter, createWebHistory } from "vue-router";
// import HomeView from "@/views/HomePage.vue";
import AsignaturasPage from "@/views/AsignaturasPage.vue";
import TemariosPage from "@/views/TemariosPage.vue";
import CursosPage from "@/views/CursosPage.vue";
import PerfilPage from "@/views/PerfilPage.vue";
import MisCursosPage from "@/views/MisCursosPage.vue";
import ArchivosyTestPage from "@/views/ArchivosyTestPage.vue";
import InfoPage from "@/views/InfoPage.vue";
import HomePage from "@/views/HomePage.vue";

const routes = [
  { path: "/", component: HomePage },
  { path: "/asignaturas/:idCurso", component: AsignaturasPage, props: true },
  { path: "/temarios/:idAsignatura", component: TemariosPage, props: true },
  { path: "/temarios/:idTemario/archivos-test", component: ArchivosyTestPage, props: true },
  { path: "/cursos", component: CursosPage },
  { path: "/perfil", component: PerfilPage },
  { path: "/mis-cursos", component: MisCursosPage },
  { path: "/info", component: InfoPage }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
