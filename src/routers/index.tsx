import {createHashRouter, RouteObject} from "react-router-dom";
import {lazy} from "react";
import {App} from "@/App";
import PageHome from "@/pages/home/home";
import PageError from "@/pages/_error/error";

const LazyOverview = lazy(() => import("@/pages/overview/overview"))
const LazyZote = lazy(() => import("@/pages/zote/zote"))

const routes: RouteObject[] = [
    {
        path: '/',
        element: <App/>,
        errorElement: <PageError/>,
        children: [
            {
                path: '',
                element: <PageHome/>
            },
            {
                path: 'overview',
                element: <LazyOverview/>
            },
            {
                path: 'zote',
                element: <LazyZote/>
            },
        ]
    }
]

const router = createHashRouter(routes, {})

export {
    router
}