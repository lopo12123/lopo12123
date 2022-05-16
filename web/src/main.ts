// style
import "@/styles/index.scss";

// core
import { createApp } from "vue";

// plugin
import { router } from "@/router";

// view
import App from "./App.vue";

createApp(App)
    .use(router)
    .mount('#app')
