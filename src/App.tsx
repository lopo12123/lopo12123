import {Suspense} from 'react'
import {Outlet} from 'react-router-dom'
import {PageLoading} from '@/pages/_loading/loading'
import DockBar from '@/layouts/dock/dock'

function App() {
    return (
        <>
            <div style={{width: '100%', height: '100%'}}>
                <Suspense fallback={<PageLoading/>} children={<Outlet/>}/>
            </div>
            <DockBar/>
        </>
    )
}

export {
    App
}
