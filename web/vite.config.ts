import { resolve } from "path";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [ vue() ],
    resolve: {
        alias: {
            '@': resolve('src')
        }
    },
    css: {
        preprocessorOptions: {
            scss: {
                charset: false
            }
        }
    }
})
