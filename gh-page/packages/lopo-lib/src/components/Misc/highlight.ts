import type {App} from "vue";
import hljs from "highlight.js";

export const VHighlight = {
    install(app: App) {
        app.directive('highlight', (el) => {
            hljs.highlightElement(el)
        })
    }
}