/// <reference types="vite/client" />
interface ImportMetaEnv {
    readonly VITE_APP_SUB_SPA_ENTRY__DEV: string
    readonly VITE_APP_SUB_SPA_ENTRY__PROD: string
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}