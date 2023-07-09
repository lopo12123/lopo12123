import './error.scss'

import {useNavigate, useRouteError} from 'react-router-dom'
import {useEffect} from "react";

export default function PageError() {
    const navigate = useNavigate()
    const routeError = useRouteError()

    useEffect(() => {
        document.title = 'An error occurred!'

        return () => {
            document.title = 'lopo12123'
        }
    }, [])

    return (
        <div className="page-error">
            <pre className="jbmono">
                {JSON.stringify(routeError, null, 4)}
            </pre>

            <div className="back-to-home"
                 onClick={() => navigate('/', {replace: true})}>
                Back to <u>Home</u>
            </div>
        </div>
    )
}

export {
    PageError
}