import './styles/font.scss'
import './styles/index.scss'

import {createRoot} from 'react-dom/client'
import {RouterProvider} from "react-router-dom";
import {fairyDustCursor} from 'cursor-effects'

import {router} from "@/routers";
import {PageLoading} from "./pages/_loading/loading";

// cursor effect
new fairyDustCursor()

createRoot(document.getElementById('root') as HTMLElement)
    .render(<RouterProvider router={router} fallbackElement={<PageLoading/>}/>)
