import { StrictMode } from "react";
import ReactDOM from "react-dom";
import { HashRouter, Route, Routes } from "react-router-dom";

import App from './App'

import { ReactSpaConverter } from "../../utils/ReactSpaConverter";

const SubAppEntry = import.meta.env.DEV
    ? import.meta.env.VITE_APP_SUB_SPA_ENTRY__DEV
    : import.meta.env.VITE_APP_SUB_SPA_ENTRY__PROD

console.log(SubAppEntry)

ReactDOM.render(
    <StrictMode>
        <HashRouter>
            <Routes>
                <Route path="/" element={ <App/> }>
                    <Route path="vite-react-ts" element={<ReactSpaConverter key="vite-react-ts" entryPath="/packages/vite-react-ts/src/main.tsx"/>}/>
                    <Route path="vite-vue-ts" element={<ReactSpaConverter key="vite-vue-ts" entryPath="/packages/vite-vue-ts/src/main.ts"/>}/>
                </Route>
            </Routes>
        </HashRouter>
    </StrictMode>,
    document.getElementById('root')
)
