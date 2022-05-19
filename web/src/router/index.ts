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

    // region game
    {
        path: '/games',
        name: 'Games',
        component: () => import("@/views/Games/Games.vue"),
        meta: {
            bread: [
                {
                    label: 'games',
                    to: { name: 'Games' }
                }
            ]
        }
    },
    {
        path: '/games/two-zero-four-eight',
        name: 'TwoZeroFourEight',
        component: () => import("@/views/Games/TwoZeroFourEight.vue"),
        meta: {
            bread: [
                {
                    label: 'games',
                    to: { name: 'Games' }
                },
                {
                    label: '2048',
                    to: { name: 'TwoZeroFourEight' }
                }
            ]
        }
    },
    {
        path: '/games/mine-sweeper',
        name: 'MineSweeper',
        component: () => import("@/views/Games/MineSweeper.vue"),
        meta: {
            bread: [
                {
                    label: 'games',
                    to: { name: 'Games' }
                },
                {
                    label: 'mine-sweeper',
                    to: { name: 'MineSweeper' }
                }
            ]
        }
    },
    // endregion
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
