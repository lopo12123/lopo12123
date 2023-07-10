import {Suspense} from 'react'
import {Outlet} from 'react-router-dom'
import {PageLoading} from '@/pages/_loading/loading'
import DockBar from '@/layouts/dock/dock'
import GlobalMenu from "@/layouts/global_menu/global_menu";

function App() {
    return (
        <>
            <div style={{width: '100%', height: '100%'}}>
                <Suspense fallback={<PageLoading/>} children={<Outlet/>}/>
            </div>

            <DockBar/>
            <GlobalMenu/>
        </>
    )
}

export {
    App
}
