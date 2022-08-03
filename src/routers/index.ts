import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";

import Index from "@/views/Index.vue";

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        name: 'Root',
        component: Index
    },
    {
        path: '/solar',
        name: 'Solar',
        component: () => import("@/views/Solar.vue")
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export {
    router
}
