// style
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "@/styles/animations.scss";
import "@/styles/index.scss";

// core
import { StrictMode } from "react";
import ReactDOM from "react-dom";
import { HashRouter, Route, Routes } from "react-router-dom";

// view
import App from "./App";

// adaptor
import { ReactSpaConverter } from "spa-converter/lib/ReactSpaConverter";
import { ZotterPrincipal } from "@/views/ZotterPrincipal";

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
                    <Route path="" element={
                        <ZotterPrincipal/>
                    }/>
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
