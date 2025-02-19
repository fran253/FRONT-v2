import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomePage.vue";
import AsignaturasPage from "@/views/AsignaturasPage.vue";
import TemariosPage from "@/views/TemariosPage.vue";
import CursosPage from "@/views/CursosPage.vue";
import PerfilPage from "@/views/PerfilPage.vue";
import MisCursosPage from "@/views/MisCursosPage.vue";
import ArchivosPage from "@/views/ArchivosPage.vue";
import TestsPage from "@/views/TestsPage.vue";

const routes = [
  { path: "/", component: HomeView },
  { path: "/asignaturas/:idCurso", component: AsignaturasPage, props: true },
  { path: "/temarios/:idAsignatura", component: TemariosPage, props: true },
  { path: "/cursos", component: CursosPage },
  { path: "/perfil", component: PerfilPage },
  { path: "/mis-cursos", component: MisCursosPage },
  { path: "/archivos", component: ArchivosPage},
  { path: "/test", component: TestsPage}
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
