import {createRouter, createWebHashHistory, RouteRecordRaw} from "vue-router";
import AboutMe from "../pages/AboutMe.vue"

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        redirect: {name: 'AboutMe'}
    },
    {
        path: '/about-me',
        name: 'AboutMe',
        component: AboutMe
    },
    {
        path: '/my-projects',
        name: 'MyProjects',
        component: () => import("../pages/MyProjects.vue")
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