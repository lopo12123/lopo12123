import {useState} from 'react'
import {Outlet} from 'react-router-dom'

function App() {
    return (
        <div className="app-root">
            hello
            <Outlet/>
        </div>
    )
}

export {
    App
}
