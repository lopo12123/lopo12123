import './styles/font.scss'
import './styles/index.scss'

import {createRoot} from 'react-dom/client'
import {RouterProvider} from "react-router-dom";

import {router} from "./routers/index";
import {PageLoading} from "./pages/_loading/loading";

createRoot(document.getElementById('root') as HTMLElement)
    .render(<RouterProvider router={router} fallbackElement={<PageLoading/>}/>)
