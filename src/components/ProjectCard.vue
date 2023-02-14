<script lang="ts" setup>
import {IconLogo} from "../constants/IconLogo";

export type ProjectDetail = {
    name: string
    repository: string
    homepage?: string
    languages: IconLogo[],

}
</script>

<template>
    <div class="ProjectCard">
        temp
    </div>
</template>

<style lang="scss" scoped>
.ProjectCard {
    position: relative;
    width: 320px;
    height: 240px;
    border: solid 1px #c8c8c8;
    border-radius: 4px;
    background-color: #c8c8c833;
    //backdrop-filter: blur(5px);
    cursor: pointer;
    transition: box-shadow .3s;
    display: inline-block;

    &:hover {
        box-shadow: 0 10px 15px 5px rgba(255, 255, 255, .2),
        0 4px 6px -5px rgba(255, 255, 255, .2);
    }
}
</style>