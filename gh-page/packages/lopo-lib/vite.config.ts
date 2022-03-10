import {resolve} from "path";
import {defineConfig} from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";

// https://vitejs.dev/config/
export default defineConfig({
    base: './',
    plugins: [vue(), vueJsx()],
    resolve: {
        alias: {
            '@': resolve('./src')
        }
    },
    server: {
        port: 8081
    },
    build: {
        outDir: '../docs',
        emptyOutDir: true,
        rollupOptions: {
            // external: [''],
            output: {
                manualChunks: (id) => {
                    if(id.includes('node_modules')) {
                        return id.toString().split('node_modules/')[1].split('/')[0].toString()
                    }
                }
            }
        }
    }
})
