import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";

import Index from "@/views/Three.vue";

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        name: 'Root',
        component: Index
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export {
    router
}
