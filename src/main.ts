import './index.scss'
import 'highlight.js/styles/stackoverflow-dark.css'

import hljs from 'highlight.js/lib/core'
import javascript from 'highlight.js/lib/languages/javascript'
import typescript from 'highlight.js/lib/languages/typescript'
import rust from 'highlight.js/lib/languages/rust'
import dart from 'highlight.js/lib/languages/dart'
import json from 'highlight.js/lib/languages/json'
import ini from 'highlight.js/lib/languages/ini'

import {createApp} from 'vue'
import {router} from "./routers";
import App from './App.vue'

hljs.registerLanguage('javascript', javascript)
hljs.registerLanguage('typescript', typescript)
hljs.registerLanguage('rust', rust)
hljs.registerLanguage('dart', dart)
hljs.registerLanguage('json', json)
hljs.registerLanguage('ini', ini)

createApp(App)
    .use(router)
    .mount('#app')
