// style
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "@/styles/index.scss";

// core
import { lazy, StrictMode, Suspense } from "react";
import { render } from "react-dom";
import { HashRouter, Navigate, Route, Routes } from "react-router-dom";
import { LoadingElement } from "@/components/Misc/LoadingElement";

// view
const ProjectList = lazy(() => import("@/views/ProjectList"))

// render
render(
    <StrictMode>
        <HashRouter>
            <Suspense fallback={
                <div style={ {
                    position: 'relative',
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                } }>
                    <LoadingElement/>
                </div>
            }>
                <Routes>
                    <Route path="/" element={ <Navigate to="/project-list"/> }/>
                    <Route path="/project-list" element={ <ProjectList/> }/>
                </Routes>
            </Suspense>
        </HashRouter>
    </StrictMode>,
    document.getElementById('root')
)
