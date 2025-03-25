import { createApp } from 'vue';
import App from './App.vue';
import PrimeVue from 'primevue/config';
import Aura from '@primeuix/themes/aura';

import 'primeicons/primeicons.css'
import 'primeflex/primeflex.css'
import './less/index.css';

import Button from "primevue/button"
import ConfirmDialog from 'primevue/confirmdialog';
import ConfirmationService from 'primevue/confirmationservice';
import Tooltip from 'primevue/tooltip';

createApp(App)
    .use(PrimeVue, {
        theme: {
            preset: Aura
        }
    })
    .use(ConfirmationService)
    .directive('tooltip', Tooltip)
    .component('Button', Button)
    .component('ConfirmDialog', ConfirmDialog)
    .mount('#root');
