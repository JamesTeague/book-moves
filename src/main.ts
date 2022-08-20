import { createApp } from 'vue';
import App from './App.vue';
import './index.css';
import {
  createHttpClient,
  createPgnService,
  createUploadService,
} from './services';
import { createStudyRepoThin } from './repositories';

// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import router from './router';
import { createFirebaseAuth } from './services/authentication-service';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMEN_ID,
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);

router.beforeEach(async (to) => {
  const publicPages = ['/login', '/register'];
  const authRequired = !publicPages.includes(to.path);

  if (authRequired && !auth.currentUser) {
    return '/login';
  }
});

const httpClient = createHttpClient();
const studyRepository = createStudyRepoThin();
const pgnService = createPgnService(httpClient);
const uploadService = createUploadService({ studyRepo: studyRepository });
const authService = createFirebaseAuth(auth, router);

const app = createApp(App);

app.use(router);
app.provide('repositories', { studyRepository });
app.provide('services', { pgnService, uploadService, authService });
app.provide('authentication', { auth });
app.mount('#app');
