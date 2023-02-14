<script lang="ts" setup>
import {useRouter} from "vue-router";

const router = useRouter()

const allMyProjects = () => {
    router.push({name: 'Projects'})
}

const viewOnGithub = () => {
    window.open('https://github.com/lopo12123', '_blank')
}
</script>

<template>
    <div class="link-box">
        <div class="my-projects"
             @click="allMyProjects">
            All My Projects
        </div>

        <div class="view-on-github"
             @click="viewOnGithub">
            View on GitHub
        </div>
    </div>
</template>

<style lang="scss" scoped>
.link-box {
    position: relative;
    width: 288px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;

    .my-projects {
        width: 240px;
        padding: 16px 0;
        border: solid 1px;
        border-color: #555 #222 #222 #555;
        border-radius: 4px;
        background: linear-gradient(to bottom, #444, #333);
        font-size: 18px;
        font-family: Consolas, sans-serif;
        text-align: center;
        cursor: pointer;
    }

    .view-on-github {
        margin-top: 16px;
        font-style: italic;
        text-decoration: underline;
        cursor: pointer;
    }
}
</style>