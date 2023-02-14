<script lang="ts" setup>
import ProjectCard, {ProjectDetail} from "../components/ProjectCard.vue";

const projects: ProjectDetail[] = []
</script>

<template>
    <div class="projects">
        <ProjectCard v-for="(idx) in 10"/>
    </div>
</template>

<style lang="scss" scoped>
.projects {
    position: relative;
    width: 100%;
    height: 100%;
    padding: 32px;
    font-family: cursive;
    font-size: 32px;
    display: grid;
    grid-template-columns: repeat(auto-fill, 320px);
    grid-template-rows: repeat(auto-fill, 240px);
    gap: 32px;
    grid-auto-flow: dense;
    justify-content: center;
    overflow: hidden auto;
}
</style>