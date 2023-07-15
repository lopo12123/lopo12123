import {createHashRouter, RouteObject, useNavigate} from "react-router-dom";
import {lazy} from "react";
import {App} from "@/App";
import PageHome from "@/pages/home/home";
import PageError from "@/pages/_error/error";

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
                path: 'tool',
                // TODO
            },
            {
                path: 'note',
                // TODO
            },
            {
                path: 'study',
                // TODO
            },
            {
                path: 'rss',
                // TODO
            },
        ]
    }
]

const router = createHashRouter(routes, {})

// FIXME: implement
const useDeduplicateNavigate = () => {
    return useNavigate()
}

export {
    router,
    useDeduplicateNavigate
}
