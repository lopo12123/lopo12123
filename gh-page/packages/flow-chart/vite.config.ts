import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
    base: './',
    plugins: [ react() ],
    css: {
        modules: {
            localsConvention: 'camelCaseOnly'
        },
        preprocessorOptions: {
            scss: {
                javascriptEnabled: true
            }
        }
    },
    resolve: {
        alias: {
            "@": "/src"
        }
    },
    server: {
        port: 8899
    },
    build: {
        outDir: "./dist",
        emptyOutDir: true
    }
})
