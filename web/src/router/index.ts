import Home from "@/views/Home.vue";
import { createRouter, createWebHashHistory, RouteRecordRaw, RouterOptions } from "vue-router";

declare module 'vue-router' {
    interface RouteMeta {
        bread: {
            label: string,
            icon?: string,
            to: string | { name: string }
        }[]
    }
}

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        name: 'Home',
        component: Home,
        meta: { bread: [] }
    },
    {
        path: '/test',
        name: 'Test',
        component: () => import("@/views/Test.vue"),
        meta: {
            bread: [
                {
                    label: 'test',
                    to: { name: 'Test' }
                }
            ]
        }
    }
]

const routerOptions: RouterOptions = {
    history: createWebHashHistory(),
    routes,
}

export const router = createRouter(routerOptions)