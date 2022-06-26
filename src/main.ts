import { createRouter, createWebHashHistory } from 'vue-router';
import { createApp } from 'vue';
import CreateStudyPage from './pages/create-study-page/CreateStudyPage.vue';
import AiBoard from './components/boards/AiBoard/AiBoard.vue';
import App from './App.vue';
import './index.css';

const routes = [
  { path: '/', name: 'AiBoard', component: AiBoard },
  { path: '/study', name: 'CreateStudy', component: CreateStudyPage },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

const app = createApp(App);

app.use(router);
app.mount('#app');
