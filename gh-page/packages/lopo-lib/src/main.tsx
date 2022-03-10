import "element-plus/dist/index.css";
import "highlight.js/styles/atom-one-light.css"
import "@/styles/iconfont.scss";
import "@/styles/index.scss";

import { createApp } from "vue";
import { createRouter } from "vue-router";
import { router } from "./router";

import {ElMessage, MessageProps} from "element-plus";
import {VHighlight} from "@/components/Misc/highlight";

const _router = createRouter(router)
const app = createApp(() => <router-view/>)

app.use(_router)
    .use(VHighlight)
    .mount('#app')

app.config.globalProperties.$message = (config: Partial<MessageProps>) => {
    ElMessage.closeAll()
    ElMessage(config)
}