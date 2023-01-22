import {createRouter, createWebHashHistory, RouteRecordRaw} from "vue-router";
import AboutMe from "../pages/AboutMe.vue"


const routes: RouteRecordRaw[] = [
    // {path: '/'},
    {
        path: '/about-me',
        component: AboutMe
    },
    {
        path: '/my-projects',
        component: AboutMe
    },
    {
        path: '/:any',
        component: () => import("../pages/NotFound.vue")
    }
]

const router = createRouter({
    routes, history: createWebHashHistory(),
})

export {
    router
}