// style
import "primevue/resources/themes/saga-blue/theme.css"; //theme
import "primevue/resources/primevue.min.css";           //core css
import "primeicons/primeicons.css";                     //icons
import "@/fonts/iconfont.css";
import "@/styles/index.scss";

// core
import { createApp } from "vue";

// plugin
import { router } from "@/router";
import PrimeVue from "primevue/config";
import ToastService from "primevue/toastservice";

// directive
import { drag } from "@/scripts/v-drag";

// view
import App from "./App.vue";

createApp(App)
    .use(router)
    .use(PrimeVue)
    .use(ToastService)
    .directive('drag', drag)
    .mount('#app')
