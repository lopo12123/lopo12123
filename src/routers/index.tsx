import {createHashRouter, RouteObject} from "react-router-dom";
import {lazy} from "react";
import {App} from "@/App";
import PageHome from "@/pages/home/home";
import PageError from "@/pages/_error/error";

const LazyOverview = lazy(() => import("@/pages/overview/overview"))
const LazyPrecept = lazy(() => import("@/pages/precept/precept"))

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
                path: 'precept',
                element: <LazyPrecept/>
            },
        ]
    }
]

const router = createHashRouter(routes, {})

export {
    router
}
