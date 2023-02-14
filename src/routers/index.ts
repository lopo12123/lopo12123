import {createRouter, createWebHashHistory, RouteRecordRaw} from "vue-router";
import Guide from "../pages/Guide.vue"

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        name: 'Guide',
        component: Guide
    },
    {
        path: '/projects',
        name: 'Projects',
        component: () => import("../pages/Projects.vue")
    },
    {
        path: '/:any',
        name: 'NotFound',
        component: () => import("../pages/NotFound.vue")
    }
]

const router = createRouter({
    routes, history: createWebHashHistory(),
})

export {
    router
}