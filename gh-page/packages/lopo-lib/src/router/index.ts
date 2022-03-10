import {createWebHashHistory, RouteRecordRaw, RouterOptions} from "vue-router";

import Root from "@/views/Root.vue";

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        name: 'Root',
        component: Root,
        children: [
            { path: '', redirect: { name: 'Docs' } },
            {
                path: 'docs',
                name: 'Docs',
                component: () => import("@/views/Docs.vue")
            }
        ]
    },
]

export const router: RouterOptions = {
    history: createWebHashHistory(),
    routes
}