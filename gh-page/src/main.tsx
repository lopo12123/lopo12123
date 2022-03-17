// style
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "@szhsin/react-menu/dist/index.css";
import "@/fonts/fonts.scss";
import "@/styles/index.scss";

// core
import { StrictMode } from "react";
import ReactDOM from "react-dom";
import { HashRouter, Route, Routes } from "react-router-dom";
import { ReactSpaConverter } from "spa-converter/lib/ReactSpaConverter";

// view
import App from "./App";
import { SubAppNameList } from "@/router";
import { ElegantNeverDie } from "@/views/ElegantNeverDie";
import { ImageParser } from "@/views/ImageParser";

const SpaEntry: string = import.meta.env.DEV
    ? import.meta.env.VITE_APP_SUB_SPA_ENTRY__DEV
    : import.meta.env.VITE_APP_SUB_SPA_ENTRY__PROD

ReactDOM.render(
    <StrictMode>
        <HashRouter>
            <Routes>
                <Route path="/" element={ <App/> }>
                    <Route path="" element={
                        <ElegantNeverDie/>
                    }/>

                    {/* region tools */ }
                    <Route path="tool">
                        <Route path="image-parser" element={ <ImageParser/> }/>
                    </Route>
                    {/* endregion */ }

                    {/* region sub-app */ }
                    <Route path="sub-app">
                        {
                            SubAppNameList.map((name, index) => {
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
                    {/* endregion */ }
                </Route>
            </Routes>
        </HashRouter>
    </StrictMode>,
    document.getElementById('root')
)
