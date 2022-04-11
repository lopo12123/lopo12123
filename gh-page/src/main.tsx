// style
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "@/styles/index.scss";

// core
import { StrictMode } from "react";
import { render } from "react-dom";

// view
import App from "./App";

// render
render(
    <StrictMode>
        <App/>
    </StrictMode>,
    document.getElementById('root')
)
