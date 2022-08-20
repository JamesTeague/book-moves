import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'AiBoard',
    component: () => import('../components/boards/AiBoard/AiBoard.vue'),
  },
  {
    path: '/create',
    name: 'CreateStudyPage',
    component: () => import('../pages/studies/create/CreateStudyPage.vue'),
  },
  {
    path: '/study',
    name: 'StudyListPage',
    component: () => import('../pages/studies/list/StudiesListPage.vue'),
  },
  {
    path: '/study/:studyId',
    name: 'StudyPage',
    component: () => import('../pages/studies/StudyPage.vue'),
    props: true,
  },
  {
    path: '/login',
    name: 'LoginPage',
    component: () => import('../pages/auth/LoginPage.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
