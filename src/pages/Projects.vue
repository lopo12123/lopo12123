<script lang="ts" setup>
import ProjectCard, {ProjectDetail} from "../components/ProjectCard.vue";

const projects: ProjectDetail[] = []

const icons = [
    "android", "nodejs", "npm", "crates", "vue", "react", "flutter", "js", "ts", "rust", "dart", "java", "markdown", "json", "toml"
]
</script>

<template>
    <div class="projects">
        <div class="banner">
            <p>class icon</p>
            <i v-for="(iconName, idx) in icons"
               :class="`iconfont icon-${iconName}`"></i>
            <p>symbol icon</p>
            <svg v-for="(iconName, idx) in icons"
                 class="symbol-icon" aria-hidden="true">
                <use :xlink:href="`#icon-${iconName}`"></use>
            </svg>
        </div>
        <div class="container">
            <ProjectCard v-for="(idx) in 10"/>
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
        grid-template-columns: repeat(auto-fill, 320px);
        grid-template-rows: repeat(auto-fill, 240px);
        gap: 32px;
        grid-auto-flow: dense;
        justify-content: center;
    }
}
</style>