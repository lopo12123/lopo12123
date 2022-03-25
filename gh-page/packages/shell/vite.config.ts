import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import vue from "@vitejs/plugin-vue";
import * as path from "path";

// https://vitejs.dev/config/
export default defineConfig({
    base: './',
    root: path.resolve('../../'),
    resolve: {
        alias: {
            "@": path.resolve('./src'),
        }
    },
    envDir: path.resolve('./'),
    plugins: [ react(), vue() ],
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
        port: 8910
    },
    build: {
        outDir: "./dist",
        emptyOutDir: true
    }
})
