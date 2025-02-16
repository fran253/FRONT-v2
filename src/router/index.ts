import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomePage.vue";
import AsignaturasPage from "@/views/AsignaturasPage.vue";
import TemariosPage from "@/views/TemariosPage.vue";
import CursosPage from "@/views/CursosPage.vue";
import PerfilPage from "@/views/PerfilPage.vue";

const routes = [
  { path: "/", component: HomeView },
  { path: "/asignaturas/:idCurso", component: AsignaturasPage, props: true }, // ruta para mostrar asignaturas de un curso
  { path: "/temarios", component: TemariosPage },
  { path: "/cursos", component: CursosPage },
  { path: "/perfil", component: PerfilPage }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
