import { createApp } from 'vue';
import App from './App.vue';

import router from './router';
import { createPinia } from 'pinia';

import 'virtual:uno.css';
import './assets/scss/main.scss';

const app = createApp(App);

app.use(router).use(createPinia()).mount('#app');
