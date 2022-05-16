import Home from "@/views/Home.vue";
import { createRouter, createWebHashHistory, RouteRecordRaw, RouterOptions } from "vue-router";

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        redirect: {
            name: 'Home'
        }
    },
    {
        path: '/home',
        name: 'Home',
        component: Home
    }
]

const routerOptions: RouterOptions = {
    history: createWebHashHistory(),
    routes,
}

export const router = createRouter(routerOptions)