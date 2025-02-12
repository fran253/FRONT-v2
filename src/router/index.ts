import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../views/HomePage.vue';
import CursosPage from '../views/CursosPage.vue';
import AsignaturasPage from '../views/AsignaturasPage.vue';
import TemariosPage from '../views/TemariosPage.vue';


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage,
    },
    {
      path: '/cursos',
      name: 'cursos',
      component: CursosPage,
    },
    {
      path: '/asignaturas',
      name: 'asignaturas',
      component: AsignaturasPage,
    },
    {
      path: '/temarios',
      name: 'temarios',
      component: TemariosPage,
    },
  ],
});

export default router;
