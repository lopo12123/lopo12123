import {Suspense} from 'react'
import {Outlet} from 'react-router-dom'
import Banner from "@/layouts/banner/banner";
import {PageLoading} from "@/pages/_loading/loading";

function App() {
    return (
        <>
            <Banner/>
            <div style={{width: '100%', height: 'calc(100% - 52px)'}}>
                <Suspense fallback={<PageLoading/>} children={<Outlet/>}/>
            </div>
        </>
    )
}

export {
    App
}
