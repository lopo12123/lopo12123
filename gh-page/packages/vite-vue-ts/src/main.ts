import { createApp } from 'vue'
import App from './App.vue'
import { defineSpaApp } from "../../utils/ReactSpaConverter";

export default defineSpaApp((container) => {
    const app = createApp(App)
    return {
        mount() {
            app.mount(container)
            console.log('vue mount')
        },
        unmount() {
            app.unmount()
            console.log('vue unmount')
        }
    }
})