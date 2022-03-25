// style
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "@/fonts/fonts.scss";
import "@/styles/index.scss";

// core
import { StrictMode, Suspense, lazy } from "react";
import ReactDOM from "react-dom";
import { HashRouter, Route, Routes } from "react-router-dom";
import { ReactSpaConverter } from "spa-converter/lib/ReactSpaConverter";

// view
import { SubAppNameList } from "@/router";
import App from "./App";

const ImageParser = lazy(() => import("@/views/ImageParser"));
const FlowChart = lazy(() => import("@/views/FlowChart"));

import { TestView } from "@/views/TestView";

const SpaEntry: string = import.meta.env.DEV
    ? import.meta.env.VITE_APP_SUB_SPA_ENTRY__DEV
    : import.meta.env.VITE_APP_SUB_SPA_ENTRY__PROD

ReactDOM.render(
    <StrictMode>
        <HashRouter>
            <Suspense
                fallback={
                    <div style={ {
                        position: 'relative',
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    } }>
                        loading
                    </div>
                }>
                <Routes>
                    <Route path="/" element={ <App/> }>
                        <Route path="" element={
                            <TestView/>
                        }/>

                        {/* region tools */ }
                        <Route path="tool">
                            <Route path="image-parser" element={ <ImageParser/> }/>
                            <Route path="flow-chart" element={ <FlowChart/> }/>
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
            </Suspense>
        </HashRouter>
    </StrictMode>,
    document.getElementById('root')
)
