import {createHashRouter, RouteObject, Navigate} from "react-router-dom";
import {lazy} from "react";
import {App} from "@/App";
import {PageError} from "@/pages/_error/error";

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
                element: <Navigate to="overview" replace/>
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