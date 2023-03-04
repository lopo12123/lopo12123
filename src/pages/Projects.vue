<script lang="ts" setup>
import ProjectCard, {ProjectDetail} from "../components/ProjectCard.vue";

import QR from "../assets/overview/qr.png"
import FlowChart from "../assets/overview/flow_chart.png"
import Digest from "../assets/overview/hush.png"
import DeviceRecorder from "../assets/overview/toca.png"
import DeviceRecorderApp from "../assets/overview/toca_tauri.png"
import ServerHere from "../assets/overview/server_here.png"
import OlController from "../assets/overview/ol_controller.png"
import DartClassGenerator from "../assets/overview/dart_class_generator.png"
import RustyCrypto from "../assets/overview/rusty_crypto.png"
import RustyJs from "../assets/overview/rusty_js.png"
import Vue3Clock from "../assets/overview/vue3clock.png"
import PhotoResize from "../assets/overview/photo_resize.png"

const projects: ProjectDetail[] = [
    {
        name: 'QR',
        desc: 'create QR-code for text, URL and image.',
        link: 'https://lopo12123.github.io/QR-it/#/desktop',
        overview: QR,
        languages: ['ts', 'vue']
    },
    {
        name: 'Flow Chart',
        desc: 'Flowchart drawing software, supports both h5 and desktop.',
        link: 'https://lopo12123.github.io/flow-chart/',
        overview: FlowChart,
        languages: ['ts', 'react']
    },
    {
        name: 'Message Digest',
        desc: 'Provides online conversion of many hash algorithms. (String and file types are accepted)',
        link: 'https://lopo12123.github.io/hush/',
        overview: Digest,
        languages: ['ts', 'react']
    },
    {
        name: 'Device Recorder',
        desc: 'A recording and playback library for mouse/keyboard events.',
        link: 'https://github.com/lopo12123/toca/',
        overview: DeviceRecorder,
        languages: ['rust', 'crates']
    },
    {
        name: 'Device Recorder App',
        desc: 'This app is used to record keyboard or mouse events, during which the keyboard or mouse events can be exported as a file with a toca suffix. And read this file through the playback function of this app for playback and reproduction.',
        link: 'https://unmasku.github.io/toca-tauri/',
        overview: DeviceRecorderApp,
        languages: ['vue', 'ts', 'rust', 'nodejs']
    },
    {
        name: 'Server Here',
        desc: 'Local fast static server.',
        link: 'https://github.com/lopo12123/server-here/',
        overview: ServerHere,
        languages: ['rust', 'crates']
    },
    {
        name: 'Ol Controller',
        desc: 'A control layer wrapper for the open-layer library, which can be used in vue react or vanilla.',
        link: 'https://github.com/lopo12123/ol-controller/',
        overview: OlController,
        languages: ['js', 'ts', 'react', 'vue', 'npm']
    },
    {
        name: 'Dart Class Generator',
        desc: 'Automatically generate DART class based on the description of JSON value/TS definition/line',
        link: 'https://lopo12123.github.io/dart_class_generator/',
        overview: DartClassGenerator,
        languages: ['flutter', 'dart', 'ts', 'vue']
    },
    {
        name: 'Rusty Crypto',
        desc: 'AES symmetrically encrypted with Rust, compiled into wasm.',
        link: 'https://github.com/lopo12123/rusty_crypto/',
        overview: RustyCrypto,
        languages: ['rust', 'js', 'ts', 'nodejs']
    },
    {
        name: 'Rusty Js',
        desc: 'Use JS to implement the characteristics of "result", "option" in Rust.',
        link: 'https://lopo12123.github.io/rustyjs/',
        overview: RustyJs,
        languages: ['rust', 'js', 'ts', 'nodejs', 'npm']
    },
    {
        name: 'Vue3 Clock',
        desc: 'Clock Component in Vue3.',
        link: 'https://lopo12123.github.io/vue3clock/',
        overview: Vue3Clock,
        languages: ['vue', 'ts', 'npm']
    },
    {
        name: 'Photo Resize',
        desc: 'Resize photo in a dir.',
        link: 'https://lopo12123.github.io/photo-resize/',
        overview: PhotoResize,
        languages: ['nodejs', 'ts']
    },
]
</script>

<template>
    <div class="projects">
<!--        <div class="banner">-->
<!--            <svg-->
<!--                v-for="(iconName, idx) in ['android', 'nodejs', 'npm', 'crates', 'vue', 'react', 'flutter', 'js', 'ts', 'rust', 'dart', 'java', 'markdown', 'json', 'toml']"-->
<!--                class="symbol-icon" aria-hidden="true">-->
<!--                <use :xlink:href="`#icon-${iconName}`"></use>-->
<!--            </svg>-->
<!--        </div>-->
        <div class="container">
            <ProjectCard v-for="project in projects" :detail="project"/>
        </div>

    </div>
</template>

<style lang="scss" scoped>
.projects {
    position: relative;
    width: 100%;
    height: 100%;
    padding: 32px;
    font-family: cursive;
    overflow: hidden auto;

    .container {
        position: relative;
        width: 100%;
        display: grid;
        grid-template-columns: repeat(auto-fill, 220px);
        grid-template-rows: repeat(auto-fill, 250px);
        gap: 16px;
        grid-auto-flow: dense;
        justify-content: center;
    }
}
</style>