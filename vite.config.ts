import {resolve} from 'path'
import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
    base: './',
    plugins: [react()],
    resolve: {
        alias: {
            "@": resolve("src")
        }
    },
    build: {
        outDir: 'docs'
    }
})
