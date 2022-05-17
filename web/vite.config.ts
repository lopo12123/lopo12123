import { resolve } from "path";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
    base: './',
    build: {
        outDir: '../docs'
        // rollupOptions: {
        //     output: {
        //         manualChunks: (id) => {
        //             if(id.includes('node_modules')) {
        //                 return (id.toString().split('node_modules/')[1].split('/')[0])
        //             }
        //         }
        //     }
        // }
    },
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
