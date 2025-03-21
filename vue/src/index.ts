import { createApp } from 'vue';
import App from './App.vue';
import PrimeVue from 'primevue/config';
import Aura from '@primeuix/themes/aura';

import('primeicons/primeicons.css')
import('primeflex/primeflex.css')
import './less/index.css';

import Button from "primevue/button"


createApp(App)
    .use(PrimeVue, {
        theme: {
            preset: Aura
        }
    })
    .component('Button', Button)
    .mount('#root');
