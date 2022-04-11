import { resolve } from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [ react() ],
    base: './',
    resolve: {
        alias: {
            '@': resolve('./src')
        }
    },
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
    server: {
        port: 7788
    }
})
