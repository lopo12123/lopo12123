import { StrictMode } from "react";
import ReactDOM from "react-dom";
import { HashRouter, Route, Routes } from "react-router-dom";

import App from "./App";

import { ReactSpaConverter } from "spa-converter/lib/ReactSpaConverter";

const SpaEntry: string = import.meta.env.DEV
    ? import.meta.env.VITE_APP_SUB_SPA_ENTRY__DEV
    : import.meta.env.VITE_APP_SUB_SPA_ENTRY__PROD

const subAppNameList = [
    "vite-react-ts",
    "vite-vue-ts"
]

ReactDOM.render(
    <StrictMode>
        <HashRouter>
            <Routes>
                <Route path="/" element={ <App/> }>
                    {
                        subAppNameList.map((name, index) => {
                            return (
                                <Route path={ name } key={ index }
                                       element={
                                           <ReactSpaConverter key={ name } entryPath={
                                               SpaEntry.replace('{SPA_NAME}', name)
                                           }/>
                                       }/>
                            )
                        })
                    }
                </Route>
            </Routes>
        </HashRouter>
    </StrictMode>,
    document.getElementById('root')
)