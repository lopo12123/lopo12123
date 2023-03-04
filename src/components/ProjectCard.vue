<script lang="ts" setup>
import {IconLogo} from "../constants/IconLogo";

export type ProjectDetail = {
    name: string
    desc: string
    link: string
    overview: string
    languages: IconLogo[],
}

const props = defineProps<{
    detail: ProjectDetail
}>()

const jump = () => {
    window.open(props.detail.link, '_blank')
}
</script>

<template>
    <div class="ProjectCard" @click="jump" :title="detail.desc">
        <div class="pic">
            <img :src="detail.overview" alt="">
        </div>
        <div class="title">
            {{ detail.name }}
        </div>
        <div class="tags">
            <svg
                v-for="(iconName, idx) in detail.languages.sort()"
                class="symbol-icon" aria-hidden="true" :key="idx">
                <use :xlink:href="`#icon-${iconName}`"/>
            </svg>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.ProjectCard {
    position: relative;
    width: 220px;
    height: 250px;
    border: solid 1px #c8c8c8;
    border-radius: 4px;
    background-color: #c8c8c833;
    cursor: pointer;
    transition: box-shadow .3s;
    display: inline-flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;

    &:hover {
        box-shadow: 0 10px 15px 5px rgba(255, 255, 255, .2),
        0 4px 6px -5px rgba(255, 255, 255, .2);
    }

    .pic {
        width: 100%;
        height: 160px;
        padding: 10px;

        > img {
            width: 100%;
            height: 100%;
            border: none;
            outline: none;
            object-fit: contain;
        }
    }

    .title {
        width: 100%;
        height: 40px;
        border-style: solid none;
        border-width: 1px;
        border-color: #c8c8c8;
        text-align: center;
        line-height: 40px;
        font-size: 18px;
        font-family: Consolas;
    }

    .tags {
        width: 100%;
        height: 50px;
        display: flex;
        align-items: center;
        justify-content: center;

        svg {
            margin: 0 5px;
        }
    }
}
</style>