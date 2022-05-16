// style
import "primevue/resources/themes/saga-blue/theme.css"  //theme
import "primevue/resources/primevue.min.css"            //core css
import "primeicons/primeicons.css"                      //icons
import "@/styles/index.scss";

// core
import { createApp } from "vue";

// plugin
import { router } from "@/router";
import PrimeVue from "primevue/config";
import ToastService from "primevue/toastservice";

// view
import App from "./App.vue";

createApp(App)
    .use(router)
    .use(PrimeVue)
    .use(ToastService)
    .mount('#app')
