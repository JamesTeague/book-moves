import { createRouter, createWebHistory } from 'vue-router';
import { createApp } from 'vue';
import CreateStudyPage from './pages/studies/create/CreateStudyPage.vue';
import StudyListPage from './pages/studies/list/StudiesListPage.vue';
import StudyPage from './pages/studies/StudyPage.vue';
import AiBoard from './components/boards/AiBoard/AiBoard.vue';
import App from './App.vue';
import './index.css';
import {
  createHttpClient,
  createPgnService,
  createUploadService,
} from './services';
import { createStudyRepoThin } from './repositories';
import { inspect } from '@xstate/inspect';
const httpClient = createHttpClient();
const studyRepository = createStudyRepoThin();
const pgnService = createPgnService(httpClient);
const uploadService = createUploadService({ studyRepo: studyRepository });

const routes = [
  { path: '/', name: 'AiBoard', component: AiBoard },
  { path: '/create', name: 'CreateStudyPage', component: CreateStudyPage },
  { path: '/study', name: 'StudyListPage', component: StudyListPage },
  {
    path: '/study/:studyId',
    name: 'StudyPage',
    component: StudyPage,
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// inspect({ iframe: false });

const app = createApp(App);

app.use(router);
app.provide('repositories', { studyRepository });
app.provide('services', { pgnService, uploadService });
app.mount('#app');
