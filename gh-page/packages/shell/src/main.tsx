// style
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "@shell/fonts/fonts.scss";
import "@shell/styles/index.scss";

// core
import { StrictMode, Suspense, lazy } from "react";
import ReactDOM from "react-dom";
import { HashRouter, Route, Routes } from "react-router-dom";
import { ReactSpaConverter } from "spa-converter/lib/ReactSpaConverter";

// view
import { useSpaMenu } from "./router/spaNavigate";
import App from "./App";

// todo refactor to spa
const ImageParser = lazy(() => import("./views/ImageParser"));

import { TestView } from "./views/TestView";

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
                            <TestView label="label" icon="icon"/>
                        }/>

                        {
                            useSpaMenu().map((group, groupIndex) => {
                                return (
                                    <Route path={ group.path } key={ `group-${ groupIndex }` }>
                                        {
                                            group.items?.map((spa, spaIndex) => {
                                                return (
                                                    <Route path={ spa.path } key={ `spa-${ spaIndex }` }
                                                           element={
                                                               <ReactSpaConverter key={ spa.path } entryPath={
                                                                   SpaEntry.replace('{SPA_NAME}', spa.path)
                                                               }/>
                                                           }/>
                                                )
                                            })
                                        }
                                    </Route>
                                )
                            })
                        }
                    </Route>
                </Routes>
            </Suspense>
        </HashRouter>
    </StrictMode>,
    document.getElementById('root')
)
